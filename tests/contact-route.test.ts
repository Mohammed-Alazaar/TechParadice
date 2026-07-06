import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = vi.hoisted(() => ({
  transport: false,
  send: vi.fn(),
  dbConnect: vi.fn(),
  create: vi.fn(),
}))

vi.mock('@/lib/email', () => ({
  get resend() {
    return state.transport ? { emails: { send: state.send } } : null
  },
  hasEmailTransport: () => state.transport,
}))
vi.mock('@/lib/mongodb', () => ({ default: (...a: unknown[]) => state.dbConnect(...a) }))
vi.mock('@/lib/models/Inquiry', () => ({
  default: { create: (...a: unknown[]) => state.create(...a) },
}))

import { POST } from '@/app/api/contact/route'

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  interest: 'Web Development',
  message: 'We need a new marketing site for our launch.',
}

function contactRequest(body: unknown) {
  return new Request('https://techparadice.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  state.transport = false
  state.send = vi.fn().mockResolvedValue({ id: 'email_1' })
  state.dbConnect = vi.fn().mockResolvedValue(undefined)
  state.create = vi.fn().mockResolvedValue({})
  vi.spyOn(console, 'info').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('POST /api/contact — validation', () => {
  it('rejects malformed JSON with 400', async () => {
    const res = await POST(
      new Request('https://x.test/api/contact', { method: 'POST', body: '{oops' }),
    )
    expect(res.status).toBe(400)
  })

  it.each([
    ['short name', { ...validBody, name: 'J' }],
    ['invalid email', { ...validBody, email: 'not-an-email' }],
    ['missing interest', { ...validBody, interest: '' }],
    ['short message', { ...validBody, message: 'too short' }],
  ])('rejects %s with 422 and field details', async (_label, body) => {
    const res = await POST(contactRequest(body))
    expect(res.status).toBe(422)
    const json = await res.json()
    expect(json.error).toBe('Invalid input')
    expect(json.details).toBeDefined()
  })
})

describe('POST /api/contact — persistence and email', () => {
  it('stores the inquiry and succeeds without an email transport', async () => {
    const res = await POST(contactRequest(validBody))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(state.create).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'contact', name: 'Jane Doe' }),
    )
    expect(state.send).not.toHaveBeenCalled()
  })

  it('still succeeds when the DB save fails (email path unaffected)', async () => {
    state.create.mockRejectedValue(new Error('db down'))
    const res = await POST(contactRequest(validBody))
    expect(res.status).toBe(200)
  })

  it('sends the notification email when a transport is configured', async () => {
    state.transport = true
    const res = await POST(contactRequest(validBody))
    expect(res.status).toBe(200)
    expect(state.send).toHaveBeenCalledOnce()
    const arg = state.send.mock.calls[0][0]
    expect(arg.replyTo).toBe('jane@example.com')
    expect(arg.subject).toContain('Jane Doe')
  })

  it('returns 500 when the email send fails', async () => {
    state.transport = true
    state.send.mockRejectedValue(new Error('resend down'))
    const res = await POST(contactRequest(validBody))
    expect(res.status).toBe(500)
  })
})
