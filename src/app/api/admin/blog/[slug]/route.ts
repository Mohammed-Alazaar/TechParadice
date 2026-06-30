import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import dbConnect from '@/lib/mongodb'
import BlogPostModel from '@/lib/models/BlogPost'

export const runtime = 'nodejs'

type Params = { params: { slug: string } }

export async function GET(_req: Request, { params }: Params) {
  await dbConnect()
  const post = await BlogPostModel.findOne({ slug: params.slug }).lean()
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: Params) {
  await dbConnect()
  const body = await req.json()
  const post = await BlogPostModel.findOneAndUpdate(
    { slug: params.slug },
    body,
    { new: true, runValidators: true },
  )
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  revalidateTag('blog')
  return NextResponse.json(post)
}

export async function DELETE(_req: Request, { params }: Params) {
  await dbConnect()
  await BlogPostModel.findOneAndDelete({ slug: params.slug })
  revalidateTag('blog')
  return NextResponse.json({ ok: true })
}
