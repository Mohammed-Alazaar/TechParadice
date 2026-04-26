import mongoose, { Schema, type Document } from 'mongoose'

export interface IService extends Document {
  slug: string
  name: string
  short: string
  value: string
  iconName: string
  deliverables: string[]
  process: { step: string; detail: string }[]
  tools: string[]
  faqs: { q: string; a: string }[]
  pairsWith: string[]
  order: number
  nameAr?: string
  shortAr?: string
  valueAr?: string
  deliverablesAr?: string[]
  processAr?: { step: string; detail: string }[]
  faqsAr?: { q: string; a: string }[]
}

const ServiceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    short: { type: String, required: true },
    value: { type: String, required: true },
    iconName: { type: String, required: true },
    deliverables: [{ type: String }],
    process: [{ step: String, detail: String }],
    tools: [{ type: String }],
    faqs: [{ q: String, a: String }],
    pairsWith: [{ type: String }],
    order: { type: Number, default: 0 },
    nameAr: { type: String },
    shortAr: { type: String },
    valueAr: { type: String },
    deliverablesAr: [{ type: String }],
    processAr: [{ step: String, detail: String }],
    faqsAr: [{ q: String, a: String }],
  },
  { timestamps: true },
)

export default mongoose.models.Service ||
  mongoose.model<IService>('Service', ServiceSchema)
