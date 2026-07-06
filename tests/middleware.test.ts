import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const getIronSession = vi.fn()
vi.mock('iron-session', () => ({
  getIronSession: (...args: unknown[]) => getIronSession(...args),
}))
// session.ts imports next/headers, which requires a request scope at call
// time only — importing is safe, but we stub it to keep the test hermetic.
vi.mock('next/headers', () => ({ cookies: vi.fn() }))

import { middleware } from '@/middleware'

function req(path: string) {
  return new NextRequest(`https://techparadice.com${path}`)
}

beforeEach(() => {
  getIronSession.mockReset()
})

describe('middleware — admin protection', () => {
  it('redirects unauthenticated admin page requests to /admin/login', async () => {
    getIronSession.mockResolvedValue({ isLoggedIn: false })
    const res = await middleware(req('/admin'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('https://techparadice.com/admin/login')
  })

  it('returns 401 JSON for unauthenticated admin API requests', async () => {
    getIronSession.mockResolvedValue({ isLoggedIn: false })
    const res = await middleware(req('/api/admin/blog'))
    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('lets authenticated admin requests through', async () => {
    getIronSession.mockResolvedValue({ isLoggedIn: true })
    const res = await middleware(req('/admin/blog'))
    expect(res.status).toBe(200)
    expect(res.headers.get('x-locale')).toBe('en')
  })

  it('does not guard the login page', async () => {
    const res = await middleware(req('/admin/login'))
    expect(res.status).toBe(200)
    expect(getIronSession).not.toHaveBeenCalled()
  })

  it('does not guard the auth API endpoints', async () => {
    const res = await middleware(req('/api/admin/auth/login'))
    expect(res.status).toBe(200)
    expect(getIronSession).not.toHaveBeenCalled()
  })
})

describe('middleware — locale header', () => {
  it('sets x-locale=en for default routes', async () => {
    const res = await middleware(req('/portfolio'))
    expect(res.headers.get('x-locale')).toBe('en')
  })

  it('sets x-locale=ar for /ar routes', async () => {
    const res = await middleware(req('/ar/portfolio'))
    expect(res.headers.get('x-locale')).toBe('ar')
  })
})
