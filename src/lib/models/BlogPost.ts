import mongoose, { Schema, type Document } from 'mongoose'

export interface IBlogPost extends Document {
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
  titleAr?: string
  excerptAr?: string
  bodyAr?: string[]
  /** optional Arabic-specific cover; when empty the Arabic pages fall back to `cover` */
  coverAr?: string
  publishedAr: boolean
  // SEO meta — English (fall back to title/excerpt when empty)
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  // SEO meta — Arabic (fall back to titleAr/excerptAr when empty)
  metaTitleAr?: string
  metaDescriptionAr?: string
  metaKeywordsAr?: string[]
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, enum: ['Web', 'Design', 'Growth', 'Engineering'], required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    readingTime: { type: String, required: true },
    body: [{ type: String }],
    cover: { type: String },
    published: { type: Boolean, default: true },
    titleAr: { type: String },
    excerptAr: { type: String },
    bodyAr: [{ type: String }],
    coverAr: { type: String },
    publishedAr: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: [{ type: String }],
    metaTitleAr: { type: String },
    metaDescriptionAr: { type: String },
    metaKeywordsAr: [{ type: String }],
  },
  { timestamps: true },
)

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
