import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  isLoggedIn: boolean
}

export const sessionOptions = {
  password: process.env.ADMIN_SESSION_SECRET ?? 'fallback-secret-32-chars-minimum!!',
  cookieName: 'tp-admin',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
}

export async function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions)
}
