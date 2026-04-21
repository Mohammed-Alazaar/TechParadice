import { NextResponse } from 'next/server'
import { getSession } from '@/lib/admin/session'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  let password: unknown
  try {
    const body = await req.json()
    password = body?.password
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json(
      { error: 'Admin password is not configured. Set ADMIN_PASSWORD in your environment.' },
      { status: 500 }
    )
  }

  if (typeof password !== 'string' || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  try {
    const session = await getSession()
    session.isLoggedIn = true
    await session.save()
  } catch (err) {
    console.error('[admin/login] session save failed', err)
    return NextResponse.json(
      { error: 'Failed to create session. Check ADMIN_SESSION_SECRET (must be 32+ chars).' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
