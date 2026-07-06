import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const session = vi.hoisted(() => ({
  current: { isLoggedIn: false, save: vi.fn() } as {
    isLoggedIn: boolean
    save: ReturnType<typeof vi.fn>
  },
}))

vi.mock('@/lib/admin/session', () => ({
  getSession: vi.fn(async () => session.current),
}))

import { POST } from '@/app/api/admin/auth/login/route'

function loginRequest(body: unknown) {
  return new Request('https://techparadice.com/api/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  session.current = { isLoggedIn: false, save: vi.fn() }
  vi.stubEnv('ADMIN_PASSWORD', 'correct-horse')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('POST /api/admin/auth/login', () => {
  it('rejects malformed JSON with 400', async () => {
    const res = await POST(
      new Request('https://x.test/login', { method: 'POST', body: 'not json' }),
    )
    expect(res.status).toBe(400)
  })

  it('returns 500 when ADMIN_PASSWORD is not configured', async () => {
    vi.stubEnv('ADMIN_PASSWORD', '')
    const res = await POST(loginRequest({ password: 'anything' }))
    expect(res.status).toBe(500)
    expect(session.current.save).not.toHaveBeenCalled()
  })

  it('rejects a wrong password with 401', async () => {
    const res = await POST(loginRequest({ password: 'wrong' }))
    expect(res.status).toBe(401)
    expect(session.current.save).not.toHaveBeenCalled()
  })

  it('rejects a non-string password with 401', async () => {
    const res = await POST(loginRequest({ password: { $ne: '' } }))
    expect(res.status).toBe(401)
  })

  it('logs in with the correct password', async () => {
    const res = await POST(loginRequest({ password: 'correct-horse' }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(session.current.isLoggedIn).toBe(true)
    expect(session.current.save).toHaveBeenCalledOnce()
  })

  it('returns 500 when the session cannot be saved', async () => {
    session.current.save.mockRejectedValue(new Error('bad secret'))
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await POST(loginRequest({ password: 'correct-horse' }))
    expect(res.status).toBe(500)
    spy.mockRestore()
  })
})
