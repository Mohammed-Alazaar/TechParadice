import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'
import { services } from '@/lib/services'
import { portfolio } from '@/lib/portfolio'
import { posts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

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

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const portfolioRoutes: MetadataRoute.Sitemap = portfolio.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
    lastModified: new Date(p.date),
  }))

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes]
}
