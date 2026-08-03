import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type SessionData } from '@/lib/admin/session'

/**
 * Admin auth only.
 *
 * This used to also stamp an `x-locale` header on every request for the root
 * layout to read. That made the layout call `headers()`, which is a dynamic API
 * and opted the entire app out of static rendering. Locale is now a literal in
 * each of the two root layouts (`app/(en)` and `app/(ar)`), so the header is
 * gone and public routes prerender.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminApi =
    pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')

  if (!isAdminPage && !isAdminApi) return NextResponse.next()

  const res = NextResponse.next()
  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  if (!session.isLoggedIn) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return res
}

// Scoped to the routes that actually need a session check, so public requests
// are not delayed by middleware at all and can be served straight from cache.
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
