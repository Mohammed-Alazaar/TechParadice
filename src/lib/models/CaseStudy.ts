import mongoose, { Schema, type Document } from 'mongoose'

export interface ICaseStudy extends Document {
  slug: string
  client: string
  title: string
  industry: string
  services: string[]
  timeline: string
  year: string
  outcome: string
  cover?: string
  challenge: string
  approach: string[]
  solution: string[]
  results: { value: string; label: string }[]
  testimonial?: { quote: string; author: string; role: string }
  published: boolean
  titleAr?: string
  outcomeAr?: string
  challengeAr?: string
  approachAr?: string[]
  solutionAr?: string[]
  resultsAr?: { value: string; label: string }[]
  testimonialAr?: { quote: string; author: string; role: string }
  publishedAr: boolean
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    slug: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    title: { type: String, required: true },
    industry: { type: String, required: true },
    services: [{ type: String }],
    timeline: { type: String, required: true },
    year: { type: String, required: true },
    outcome: { type: String, required: true },
    cover: { type: String },
    challenge: { type: String, required: true },
    approach: [{ type: String }],
    solution: [{ type: String }],
    results: [{ value: String, label: String }],
    testimonial: { quote: String, author: String, role: String },
    published: { type: Boolean, default: true },
    titleAr: { type: String },
    outcomeAr: { type: String },
    challengeAr: { type: String },
    approachAr: [{ type: String }],
    solutionAr: [{ type: String }],
    resultsAr: [{ value: String, label: String }],
    testimonialAr: { quote: String, author: String, role: String },
    publishedAr: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.models.CaseStudy ||
  mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema)
