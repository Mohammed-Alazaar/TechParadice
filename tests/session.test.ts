import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('iron-session', () => ({ getIronSession: vi.fn() }))
vi.mock('next/headers', () => ({ cookies: vi.fn() }))

// session.ts reads env at module load, so re-import fresh per test.
async function loadSession() {
  vi.resetModules()
  return import('@/lib/admin/session')
}

const LONG_SECRET = 'x'.repeat(32)
const FALLBACK = 'fallback-secret-32-chars-minimum!!'

beforeEach(() => {
  vi.unstubAllEnvs()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('sessionOptions password', () => {
  it('uses ADMIN_SESSION_SECRET when it is 32+ chars', async () => {
    vi.stubEnv('ADMIN_SESSION_SECRET', LONG_SECRET)
    const { sessionOptions } = await loadSession()
    expect(sessionOptions.password).toBe(LONG_SECRET)
  })

  it('falls back when the secret is too short', async () => {
    vi.stubEnv('ADMIN_SESSION_SECRET', 'short')
    const { sessionOptions } = await loadSession()
    expect(sessionOptions.password).toBe(FALLBACK)
  })

  it('falls back when the secret is missing', async () => {
    vi.stubEnv('ADMIN_SESSION_SECRET', '')
    const { sessionOptions } = await loadSession()
    expect(sessionOptions.password).toBe(FALLBACK)
  })

  it('warns loudly in production when running on the fallback secret', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.stubEnv('ADMIN_SESSION_SECRET', '')
    vi.stubEnv('NODE_ENV', 'production')
    await loadSession()
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ADMIN_SESSION_SECRET'))
  })

  it('does not warn when a proper secret is set in production', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.stubEnv('ADMIN_SESSION_SECRET', LONG_SECRET)
    vi.stubEnv('NODE_ENV', 'production')
    await loadSession()
    expect(warn).not.toHaveBeenCalled()
  })
})

describe('sessionOptions cookie hardening', () => {
  it('is httpOnly, lax, and scoped to /', async () => {
    const { sessionOptions } = await loadSession()
    expect(sessionOptions.cookieOptions.httpOnly).toBe(true)
    expect(sessionOptions.cookieOptions.sameSite).toBe('lax')
    expect(sessionOptions.cookieOptions.path).toBe('/')
  })

  it('sets the secure flag in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('ADMIN_SESSION_SECRET', LONG_SECRET)
    const { sessionOptions } = await loadSession()
    expect(sessionOptions.cookieOptions.secure).toBe(true)
  })

  it('does not require secure outside production', async () => {
    const { sessionOptions } = await loadSession()
    expect(sessionOptions.cookieOptions.secure).toBe(false)
  })
})
