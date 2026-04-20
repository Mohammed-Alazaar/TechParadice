import { NextResponse } from 'next/server'
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
  const study = await CaseStudyModel.create(body)
  return NextResponse.json(study, { status: 201 })
}
