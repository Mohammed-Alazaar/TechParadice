import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import InquiryModel from '@/lib/models/Inquiry'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const filter = type ? { type } : {}
  const inquiries = await InquiryModel.find(filter).sort({ createdAt: -1 }).lean()
  return NextResponse.json(inquiries)
}
