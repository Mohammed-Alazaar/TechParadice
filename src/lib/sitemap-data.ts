import { SITE_URL } from './utils'
import { getAllServiceSlugs } from './services'
import { getAllCaseStudySlugs, getAllArCaseStudySlugs } from './portfolio'
import { getAllPostSlugs, getAllArPostSlugs } from './blog'

export type ChangeFreq = 'weekly' | 'monthly' | 'yearly'

export type SitemapEntry = {
  url: string
  lastModified: string
  changeFrequency: ChangeFreq
  priority: number
  alternates: { hreflang: string; href: string }[]
}

type Opts = { priority: number; changeFrequency: ChangeFreq; lastModified: string }

/**
 * A page that exists in both English and Arabic. Emits one entry per language,
 * each advertising the full set of hreflang alternates (en, ar, x-default) so
 * Google and AI crawlers can pair the two versions.
 */
function pair(enPath: string, arPath: string, opts: Opts): SitemapEntry[] {
  const enUrl = `${SITE_URL}${enPath}`
  const arUrl = `${SITE_URL}${arPath}`
  const alternates = [
    { hreflang: 'en', href: enUrl },
    { hreflang: 'ar', href: arUrl },
    { hreflang: 'x-default', href: enUrl },
  ]
  return [
    { url: enUrl, ...opts, alternates },
    { url: arUrl, ...opts, alternates },
  ]
}

/** A page that exists in only one language — no hreflang alternates. */
function single(path: string, opts: Opts): SitemapEntry {
  return { url: `${SITE_URL}${path}`, ...opts, alternates: [] }
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const now = new Date().toISOString()

  const [serviceSlugs, workSlugs, arWorkSlugs, blogSlugs, arBlogSlugs] =
    await Promise.all([
      getAllServiceSlugs(),
      getAllCaseStudySlugs(),
      getAllArCaseStudySlugs(),
      getAllPostSlugs(),
      getAllArPostSlugs(),
    ])

  // Blog posts and case studies are single documents with independent publish
  // flags per language, so a slug may be live in one language only.
  const arWorkSet = new Set(arWorkSlugs)
  const arBlogSet = new Set(arBlogSlugs)

  const entries: SitemapEntry[] = []

  const bilingualStatic: { path: string; priority: number; changeFrequency: ChangeFreq }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/industries/restaurants', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/industries/real-estate', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/industries/manufacturing-industrial', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/industries/b2b-businesses', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/free-audit', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  ]
  for (const { path, priority, changeFrequency } of bilingualStatic) {
    entries.push(...pair(path || '/', `/ar${path}`, { priority, changeFrequency, lastModified: now }))
  }

  // English-only static pages.
  entries.push(single('/process', { priority: 0.6, changeFrequency: 'monthly', lastModified: now }))
  entries.push(single('/privacy-policy', { priority: 0.3, changeFrequency: 'yearly', lastModified: now }))
  entries.push(single('/terms', { priority: 0.3, changeFrequency: 'yearly', lastModified: now }))

  // Services share one slug set across both languages.
  for (const slug of serviceSlugs) {
    entries.push(
      ...pair(`/services/${slug}`, `/ar/services/${slug}`, {
        priority: 0.8,
        changeFrequency: 'monthly',
        lastModified: now,
      }),
    )
  }

  // Case studies: pair where both languages are published, otherwise single.
  for (const slug of workSlugs) {
    if (arWorkSet.has(slug)) {
      entries.push(
        ...pair(`/work/${slug}`, `/ar/work/${slug}`, {
          priority: 0.7,
          changeFrequency: 'monthly',
          lastModified: now,
        }),
      )
    } else {
      entries.push(single(`/work/${slug}`, { priority: 0.7, changeFrequency: 'monthly', lastModified: now }))
    }
  }
  for (const slug of arWorkSlugs) {
    if (!workSlugs.includes(slug)) {
      entries.push(single(`/ar/work/${slug}`, { priority: 0.7, changeFrequency: 'monthly', lastModified: now }))
    }
  }

  // Blog posts: same pairing logic.
  for (const slug of blogSlugs) {
    if (arBlogSet.has(slug)) {
      entries.push(
        ...pair(`/blog/${slug}`, `/ar/blog/${slug}`, {
          priority: 0.5,
          changeFrequency: 'monthly',
          lastModified: now,
        }),
      )
    } else {
      entries.push(single(`/blog/${slug}`, { priority: 0.5, changeFrequency: 'monthly', lastModified: now }))
    }
  }
  for (const slug of arBlogSlugs) {
    if (!blogSlugs.includes(slug)) {
      entries.push(single(`/ar/blog/${slug}`, { priority: 0.5, changeFrequency: 'monthly', lastModified: now }))
    }
  }

  return entries
}
