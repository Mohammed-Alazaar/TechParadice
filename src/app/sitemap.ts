import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'
import { getAllServiceSlugs } from '@/lib/services'
import { getAllCaseStudySlugs, getAllArCaseStudySlugs } from '@/lib/portfolio'
import { getAllPostSlugs, getAllArPostSlugs } from '@/lib/blog'

type Entry = MetadataRoute.Sitemap[number]
type ChangeFreq = NonNullable<Entry['changeFrequency']>

/**
 * A page that exists in both English and Arabic. Emits one sitemap entry per
 * language, and each entry advertises the full set of hreflang alternates
 * (en, ar, x-default) so Google and AI crawlers can pair the two versions.
 */
function pair(
  enPath: string,
  arPath: string,
  opts: { priority: number; changeFrequency: ChangeFreq; lastModified: Date },
): Entry[] {
  const enUrl = `${SITE_URL}${enPath}`
  const arUrl = `${SITE_URL}${arPath}`
  const languages = { en: enUrl, ar: arUrl, 'x-default': enUrl }
  const base = {
    priority: opts.priority,
    changeFrequency: opts.changeFrequency,
    lastModified: opts.lastModified,
  }
  return [
    { url: enUrl, ...base, alternates: { languages } },
    { url: arUrl, ...base, alternates: { languages } },
  ]
}

/** A page that exists in only one language — no hreflang alternates. */
function single(
  path: string,
  opts: { priority: number; changeFrequency: ChangeFreq; lastModified: Date },
): Entry {
  return {
    url: `${SITE_URL}${path}`,
    priority: opts.priority,
    changeFrequency: opts.changeFrequency,
    lastModified: opts.lastModified,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [serviceSlugs, portfolioSlugs, arPortfolioSlugs, blogSlugs, arBlogSlugs] =
    await Promise.all([
      getAllServiceSlugs(),
      getAllCaseStudySlugs(),
      getAllArCaseStudySlugs(),
      getAllPostSlugs(),
      getAllArPostSlugs(),
    ])

  // Blog posts and case studies are single documents with independent
  // publish flags per language, so a slug may be live in one language only.
  const arPortfolioSet = new Set(arPortfolioSlugs)
  const arBlogSet = new Set(arBlogSlugs)

  const entries: MetadataRoute.Sitemap = []

  // Static pages that exist in both languages.
  const bilingualStatic: { path: string; priority: number; changeFrequency: ChangeFreq }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/process', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  ]
  for (const { path, priority, changeFrequency } of bilingualStatic) {
    entries.push(...pair(path || '/', `/ar${path}`, { priority, changeFrequency, lastModified: now }))
  }

  // English-only static pages.
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
  for (const slug of portfolioSlugs) {
    if (arPortfolioSet.has(slug)) {
      entries.push(
        ...pair(`/portfolio/${slug}`, `/ar/portfolio/${slug}`, {
          priority: 0.7,
          changeFrequency: 'monthly',
          lastModified: now,
        }),
      )
    } else {
      entries.push(single(`/portfolio/${slug}`, { priority: 0.7, changeFrequency: 'monthly', lastModified: now }))
    }
  }
  for (const slug of arPortfolioSlugs) {
    if (!portfolioSlugs.includes(slug)) {
      entries.push(single(`/ar/portfolio/${slug}`, { priority: 0.7, changeFrequency: 'monthly', lastModified: now }))
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
