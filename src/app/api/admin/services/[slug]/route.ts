import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ServiceModel from '@/lib/models/Service'

export const runtime = 'nodejs'

type Params = { params: { slug: string } }

export async function GET(_req: Request, { params }: Params) {
  await dbConnect()
  const service = await ServiceModel.findOne({ slug: params.slug }).lean()
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(service)
}

export async function PUT(req: Request, { params }: Params) {
  await dbConnect()
  const body = await req.json()
  const service = await ServiceModel.findOneAndUpdate(
    { slug: params.slug },
    body,
    { new: true, runValidators: true },
  )
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(service)
}
