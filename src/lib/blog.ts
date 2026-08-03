import { unstable_cache } from 'next/cache'
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
  coverAr?: string
  published: boolean
  /** same document also carries the Arabic publish flag */
  publishedAr?: boolean
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  /** Mongoose `{ timestamps: true }` writes this; spread through by the mapper. */
  updatedAt?: string
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
  /** optional Arabic-specific cover; Arabic pages use this when set, else `cover` */
  coverAr?: string
  publishedAr: boolean
  /** same document also carries the English publish flag */
  published?: boolean
  metaTitleAr?: string
  metaDescriptionAr?: string
  metaKeywordsAr?: string[]
  /** Mongoose `{ timestamps: true }` writes this; spread through by the mapper. */
  updatedAt?: string
}

function toPost(doc: any): BlogPost {
  return { ...doc, _id: doc._id?.toString() }
}

function toArPost(doc: any): BlogPostAr {
  return { ...doc, _id: doc._id?.toString() }
}

const completeArabicPostFilter = {
  publishedAr: true,
  titleAr: { $type: 'string', $ne: '' },
  excerptAr: { $type: 'string', $ne: '' },
  'bodyAr.0': { $exists: true },
}

export const getPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    try {
      await dbConnect()
      const docs = await BlogPostModel.find({ published: true }).sort({ date: -1 }).lean()
      return docs.map(toPost)
    } catch {
      return []
    }
  },
  ['posts'],
  { revalidate: 300, tags: ['blog'] },
)

export const getPost = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      await dbConnect()
      const doc = await BlogPostModel.findOne({ slug, published: true }).lean()
      return doc ? toPost(doc) : null
    } catch {
      return null
    }
  },
  ['post'],
  { revalidate: 300, tags: ['blog'] },
)

export const getAllPostSlugs = unstable_cache(
  async (): Promise<string[]> => {
    try {
      await dbConnect()
      const docs = await BlogPostModel.find({ published: true }, { slug: 1 }).lean()
      return docs.map((d) => d.slug)
    } catch {
      return []
    }
  },
  ['post-slugs'],
  { revalidate: 300, tags: ['blog'] },
)

export const getArPosts = unstable_cache(
  async (): Promise<BlogPostAr[]> => {
    try {
      await dbConnect()
      const docs = await BlogPostModel.find(completeArabicPostFilter).sort({ date: -1 }).lean()
      return docs.map(toArPost)
    } catch {
      return []
    }
  },
  ['posts-ar'],
  { revalidate: 300, tags: ['blog'] },
)

export const getArPost = unstable_cache(
  async (slug: string): Promise<BlogPostAr | null> => {
    try {
      await dbConnect()
      const doc = await BlogPostModel.findOne({ slug, ...completeArabicPostFilter }).lean()
      return doc ? toArPost(doc) : null
    } catch {
      return null
    }
  },
  ['post-ar'],
  { revalidate: 300, tags: ['blog'] },
)

export const getAllArPostSlugs = unstable_cache(
  async (): Promise<string[]> => {
    try {
      await dbConnect()
      const docs = await BlogPostModel.find(completeArabicPostFilter, { slug: 1 }).lean()
      return docs.map((d) => d.slug)
    } catch {
      return []
    }
  },
  ['post-slugs-ar'],
  { revalidate: 300, tags: ['blog'] },
)
