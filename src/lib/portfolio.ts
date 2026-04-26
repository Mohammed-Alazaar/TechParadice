import dbConnect from './mongodb'
import CaseStudyModel from './models/CaseStudy'

export type CaseStudy = {
  _id: string
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
}

export type CaseStudyAr = {
  _id: string
  slug: string
  client: string
  title: string
  titleAr: string
  industry: string
  services: string[]
  timeline: string
  year: string
  outcome: string
  outcomeAr?: string
  cover?: string
  challengeAr: string
  approachAr: string[]
  solutionAr: string[]
  resultsAr: { value: string; label: string }[]
  testimonialAr?: { quote: string; author: string; role: string }
  publishedAr: boolean
}

function toStudy(doc: any): CaseStudy {
  return { ...doc, _id: doc._id?.toString() }
}

function toArStudy(doc: any): CaseStudyAr {
  return { ...doc, _id: doc._id?.toString() }
}

export async function getPortfolio(): Promise<CaseStudy[]> {
  try {
    await dbConnect()
    const docs = await CaseStudyModel.find({ published: true }).sort({ year: -1 }).lean()
    return docs.map(toStudy)
  } catch {
    return []
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    await dbConnect()
    const doc = await CaseStudyModel.findOne({ slug }).lean()
    return doc ? toStudy(doc) : null
  } catch {
    return null
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    await dbConnect()
    const docs = await CaseStudyModel.find({ published: true }, { slug: 1 }).lean()
    return docs.map((d) => d.slug)
  } catch {
    return []
  }
}

export async function getArPortfolio(): Promise<CaseStudyAr[]> {
  try {
    await dbConnect()
    const docs = await CaseStudyModel.find({ publishedAr: true }).sort({ year: -1 }).lean()
    return docs.map(toArStudy)
  } catch {
    return []
  }
}

export async function getArCaseStudy(slug: string): Promise<CaseStudyAr | null> {
  try {
    await dbConnect()
    const doc = await CaseStudyModel.findOne({ slug, publishedAr: true }).lean()
    return doc ? toArStudy(doc) : null
  } catch {
    return null
  }
}

export async function getAllArCaseStudySlugs(): Promise<string[]> {
  try {
    await dbConnect()
    const docs = await CaseStudyModel.find({ publishedAr: true }, { slug: 1 }).lean()
    return docs.map((d) => d.slug)
  } catch {
    return []
  }
}
