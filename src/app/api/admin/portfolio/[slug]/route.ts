import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import CaseStudyModel from '@/lib/models/CaseStudy'

export const runtime = 'nodejs'

type Params = { params: { slug: string } }

export async function GET(_req: Request, { params }: Params) {
  await dbConnect()
  const study = await CaseStudyModel.findOne({ slug: params.slug }).lean()
  if (!study) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(study)
}

export async function PUT(req: Request, { params }: Params) {
  await dbConnect()
  const body = await req.json()
  const study = await CaseStudyModel.findOneAndUpdate(
    { slug: params.slug },
    body,
    { new: true, runValidators: true },
  )
  if (!study) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(study)
}

export async function DELETE(_req: Request, { params }: Params) {
  await dbConnect()
  await CaseStudyModel.findOneAndDelete({ slug: params.slug })
  return NextResponse.json({ ok: true })
}
