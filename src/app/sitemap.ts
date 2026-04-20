import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'
import { getAllServiceSlugs } from '@/lib/services'
import { getAllCaseStudySlugs } from '@/lib/portfolio'
import { getAllPostSlugs } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [serviceSlugs, portfolioSlugs, blogSlugs] = await Promise.all([
    getAllServiceSlugs(),
    getAllCaseStudySlugs(),
    getAllPostSlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/services`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/portfolio`, priority: 0.8, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/process`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/pricing`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/blog`, priority: 0.6, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/contact`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${SITE_URL}/portfolio/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes]
}
