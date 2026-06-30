import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import dbConnect from '@/lib/mongodb'
import BlogPostModel from '@/lib/models/BlogPost'

export const runtime = 'nodejs'

export async function GET() {
  await dbConnect()
  const posts = await BlogPostModel.find({}).sort({ date: -1 }).lean()
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const post = await BlogPostModel.create(body)
  revalidateTag('blog')
  return NextResponse.json(post, { status: 201 })
}
