import dbConnect from './mongodb'
import BlogPostModel from './models/BlogPost'

export type BlogPost = {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: 'Web' | 'Design' | 'Growth' | 'Engineering'
  author: string
  date: string
  readingTime: string
  body: string[]
  cover?: string
  published: boolean
}

export type BlogPostAr = {
  _id: string
  slug: string
  titleAr: string
  excerptAr: string
  category: 'Web' | 'Design' | 'Growth' | 'Engineering'
  author: string
  date: string
  readingTime: string
  bodyAr: string[]
  cover?: string
  publishedAr: boolean
}

function toPost(doc: any): BlogPost {
  return { ...doc, _id: doc._id?.toString() }
}

function toArPost(doc: any): BlogPostAr {
  return { ...doc, _id: doc._id?.toString() }
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    await dbConnect()
    const docs = await BlogPostModel.find({ published: true }).sort({ date: -1 }).lean()
    return docs.map(toPost)
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    await dbConnect()
    const doc = await BlogPostModel.findOne({ slug }).lean()
    return doc ? toPost(doc) : null
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    await dbConnect()
    const docs = await BlogPostModel.find({ published: true }, { slug: 1 }).lean()
    return docs.map((d) => d.slug)
  } catch {
    return []
  }
}

export async function getArPosts(): Promise<BlogPostAr[]> {
  try {
    await dbConnect()
    const docs = await BlogPostModel.find({ publishedAr: true }).sort({ date: -1 }).lean()
    return docs.map(toArPost)
  } catch {
    return []
  }
}

export async function getArPost(slug: string): Promise<BlogPostAr | null> {
  try {
    await dbConnect()
    const doc = await BlogPostModel.findOne({ slug, publishedAr: true }).lean()
    return doc ? toArPost(doc) : null
  } catch {
    return null
  }
}

export async function getAllArPostSlugs(): Promise<string[]> {
  try {
    await dbConnect()
    const docs = await BlogPostModel.find({ publishedAr: true }, { slug: 1 }).lean()
    return docs.map((d) => d.slug)
  } catch {
    return []
  }
}
