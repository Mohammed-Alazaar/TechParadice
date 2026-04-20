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
  },
  { timestamps: true },
)

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
