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

import { POST } from '@/app/api/quote/route'

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  projectType: 'Website',
  budget: '$2,000 – $5,000',
  timeline: '2 months',
  services: ['Web Development', 'SEO'],
  message: 'We want a full site relaunch with SEO baked in.',
}

function quoteRequest(body: unknown) {
  return new Request('https://techparadice.com/api/quote', {
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

describe('POST /api/quote — validation', () => {
  it('rejects malformed JSON with 400', async () => {
    const res = await POST(
      new Request('https://x.test/api/quote', { method: 'POST', body: '' }),
    )
    expect(res.status).toBe(400)
  })

  it.each([
    ['empty services', { ...validBody, services: [] }],
    ['missing budget', { ...validBody, budget: '' }],
    ['missing timeline', { ...validBody, timeline: '' }],
    ['short message', { ...validBody, message: 'short' }],
  ])('rejects %s with 422', async (_label, body) => {
    const res = await POST(quoteRequest(body))
    expect(res.status).toBe(422)
  })
})

describe('POST /api/quote — persistence and email', () => {
  it('stores the inquiry with type=quote', async () => {
    const res = await POST(quoteRequest(validBody))
    expect(res.status).toBe(200)
    expect(state.create).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'quote', services: ['Web Development', 'SEO'] }),
    )
  })

  it('lists the selected services in the notification email', async () => {
    state.transport = true
    const res = await POST(quoteRequest(validBody))
    expect(res.status).toBe(200)
    const arg = state.send.mock.calls[0][0]
    expect(arg.text).toContain('Web Development, SEO')
    expect(arg.subject).toContain('quote')
  })

  it('returns 500 when the email send fails', async () => {
    state.transport = true
    state.send.mockRejectedValue(new Error('down'))
    const res = await POST(quoteRequest(validBody))
    expect(res.status).toBe(500)
  })
})
