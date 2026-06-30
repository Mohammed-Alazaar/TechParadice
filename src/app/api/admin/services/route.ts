import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import dbConnect from '@/lib/mongodb'
import ServiceModel from '@/lib/models/Service'

export const runtime = 'nodejs'

export async function GET() {
  await dbConnect()
  const services = await ServiceModel.find({}).sort({ order: 1 }).lean()
  return NextResponse.json(services)
}

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const service = await ServiceModel.create(body)
  revalidateTag('services')
  return NextResponse.json(service, { status: 201 })
}
