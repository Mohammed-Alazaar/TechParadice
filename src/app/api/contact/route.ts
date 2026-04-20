import { NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, hasEmailTransport } from '@/lib/email'
import { BRAND } from '@/lib/utils'

export const runtime = 'nodejs'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  interest: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 422 },
    )
  }

  const data = parsed.data
  const destination = process.env.CONTACT_EMAIL ?? BRAND.email

  if (!hasEmailTransport() || !resend) {
    console.info('[contact] received (email transport not configured)', {
      ...data,
      message: data.message.slice(0, 80),
    })
    return NextResponse.json({ ok: true })
  }

  try {
    await resend.emails.send({
      from: `TechParadice Website <no-reply@${new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://techparadice.com').hostname}>`,
      to: destination,
      replyTo: data.email,
      subject: `New contact: ${data.name}${data.company ? ` @ ${data.company}` : ''}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : null,
        `Service interest: ${data.interest}`,
        data.budget ? `Budget: ${data.budget}` : null,
        '',
        'Message:',
        data.message,
      ]
        .filter(Boolean)
        .join('\n'),
    })
  } catch (err) {
    console.error('[contact] resend error', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
