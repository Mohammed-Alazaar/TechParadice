import { unstable_cache } from 'next/cache'
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
  nameAr?: string
  shortAr?: string
  valueAr?: string
  deliverablesAr?: string[]
  processAr?: { step: string; detail: string }[]
  faqsAr?: { q: string; a: string }[]
}

// icon is a React component (non-serializable) — cache raw DB docs, add icon at call site
type RawService = Omit<Service, 'icon'>

const getRawServices = unstable_cache(
  async (): Promise<RawService[]> => {
    try {
      await dbConnect()
      const docs = await ServiceModel.find({}).sort({ order: 1 }).lean()
      return docs.map((doc: any) => ({ ...doc, _id: doc._id?.toString() }))
    } catch {
      return []
    }
  },
  ['services'],
  { revalidate: 300, tags: ['services'] },
)

const getRawService = unstable_cache(
  async (slug: string): Promise<RawService | null> => {
    try {
      await dbConnect()
      const doc = await ServiceModel.findOne({ slug }).lean()
      return doc ? { ...doc, _id: doc._id?.toString() } : null
    } catch {
      return null
    }
  },
  ['service'],
  { revalidate: 300, tags: ['services'] },
)

export const getAllServiceSlugs = unstable_cache(
  async (): Promise<string[]> => {
    try {
      await dbConnect()
      const docs = await ServiceModel.find({}, { slug: 1 }).lean()
      return docs.map((d: any) => d.slug)
    } catch {
      return []
    }
  },
  ['service-slugs'],
  { revalidate: 300, tags: ['services'] },
)

function addIcon(raw: RawService): Service {
  return { ...raw, icon: ICON_MAP[raw.iconName] ?? Code2 }
}

export async function getServices(): Promise<Service[]> {
  return (await getRawServices()).map(addIcon)
}

export async function getService(slug: string): Promise<Service | null> {
  const raw = await getRawService(slug)
  return raw ? addIcon(raw) : null
}
