import mongoose, { Schema, type Document } from 'mongoose'

export interface IInquiry extends Document {
  type: 'contact' | 'quote'
  name: string
  email: string
  company?: string
  interest?: string
  projectType?: string
  budget?: string
  timeline?: string
  services?: string[]
  message: string
  status: 'new' | 'read' | 'replied'
}

const InquirySchema = new Schema<IInquiry>(
  {
    type: { type: String, enum: ['contact', 'quote'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    interest: { type: String },
    projectType: { type: String },
    budget: { type: String },
    timeline: { type: String },
    services: [{ type: String }],
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true },
)

export default mongoose.models.Inquiry ||
  mongoose.model<IInquiry>('Inquiry', InquirySchema)
