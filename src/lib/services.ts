import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BarChart3,
  Code2,
  FileText,
  Megaphone,
  Palette,
  Search,
  Smartphone,
  Users,
} from 'lucide-react'
import dbConnect from './mongodb'
import ServiceModel from './models/Service'

export const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Code2,
  FileText,
  Megaphone,
  Palette,
  Search,
  Smartphone,
  Users,
}

export type Service = {
  _id: string
  slug: string
  name: string
  short: string
  value: string
  icon: LucideIcon
  iconName: string
  deliverables: string[]
  process: { step: string; detail: string }[]
  tools: string[]
  faqs: { q: string; a: string }[]
  pairsWith: string[]
  order: number
}

function toService(doc: any): Service {
  return {
    ...doc,
    _id: doc._id?.toString(),
    icon: ICON_MAP[doc.iconName] ?? Code2,
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    await dbConnect()
    const docs = await ServiceModel.find({}).sort({ order: 1 }).lean()
    return docs.map(toService)
  } catch {
    return []
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    await dbConnect()
    const doc = await ServiceModel.findOne({ slug }).lean()
    return doc ? toService(doc) : null
  } catch {
    return null
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    await dbConnect()
    const docs = await ServiceModel.find({}, { slug: 1 }).lean()
    return docs.map((d) => d.slug)
  } catch {
    return []
  }
}
