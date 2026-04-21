import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  isLoggedIn: boolean
}

const FALLBACK_SECRET = 'fallback-secret-32-chars-minimum!!'
const rawSecret = process.env.ADMIN_SESSION_SECRET
const sessionPassword =
  rawSecret && rawSecret.length >= 32 ? rawSecret : FALLBACK_SECRET

if (process.env.NODE_ENV === 'production' && sessionPassword === FALLBACK_SECRET) {
  // Surface a clear server log so a missing/short secret is obvious.
  console.warn(
    '[admin] ADMIN_SESSION_SECRET is missing or shorter than 32 characters — using insecure fallback. Set a 32+ char secret in your environment.'
  )
}

export const sessionOptions = {
  password: sessionPassword,
  cookieName: 'tp-admin',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
  },
}

export async function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions)
}
