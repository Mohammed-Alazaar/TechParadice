import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import InquiryModel from '@/lib/models/Inquiry'

export const runtime = 'nodejs'

type Params = { params: { id: string } }

export async function PATCH(req: Request, { params }: Params) {
  await dbConnect()
  const { status } = await req.json()
  const inquiry = await InquiryModel.findByIdAndUpdate(
    params.id,
    { status },
    { new: true },
  )
  if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(inquiry)
}

export async function DELETE(_req: Request, { params }: Params) {
  await dbConnect()
  await InquiryModel.findByIdAndDelete(params.id)
  return NextResponse.json({ ok: true })
}
