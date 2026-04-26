import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type SessionData } from '@/lib/admin/session'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminApi =
    pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')

  if (isAdminPage || isAdminApi) {
    const res = NextResponse.next()
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    if (!session.isLoggedIn) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    res.headers.set('x-locale', 'en')
    return res
  }

  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const res = NextResponse.next()
  res.headers.set('x-locale', locale)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.svg).*)'],
}
