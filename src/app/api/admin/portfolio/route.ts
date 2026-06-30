import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import dbConnect from '@/lib/mongodb'
import CaseStudyModel from '@/lib/models/CaseStudy'

export const runtime = 'nodejs'

export async function GET() {
  await dbConnect()
  const studies = await CaseStudyModel.find({}).sort({ year: -1 }).lean()
  return NextResponse.json(studies)
}

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  if (!body.slug && body.title) {
    body.slug = body.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
  if (!body.slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }
  const study = await CaseStudyModel.create(body)
  revalidateTag('portfolio')
  return NextResponse.json(study, { status: 201 })
}
