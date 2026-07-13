import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'
import { getAllServiceSlugs } from '@/lib/services'
import { getAllCaseStudySlugs, getAllArCaseStudySlugs } from '@/lib/portfolio'
import { getAllPostSlugs, getAllArPostSlugs } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [serviceSlugs, workSlugs, blogSlugs, arBlogSlugs, arWorkSlugs] =
    await Promise.all([
      getAllServiceSlugs(),
      getAllCaseStudySlugs(),
      getAllPostSlugs(),
      getAllArPostSlugs(),
      getAllArCaseStudySlugs(),
    ])

  const gccCities = ['dubai', 'abu-dhabi', 'riyadh', 'jeddah', 'kuwait', 'doha', 'muscat', 'manama']

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/services`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/work`, priority: 0.8, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/industries`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/restaurants`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/real-estate`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/clinics`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/professional-services`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/manufacturing-industrial`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/b2b-businesses`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/law-firms`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/salons-beauty`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/industries/auto-repair`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/free-audit`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/how-we-work`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/blog`, priority: 0.6, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/contact`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
  ]

  const arStaticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/ar`, priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/ar/about`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/services`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/work`, priority: 0.8, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/ar/industries`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/restaurants`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/real-estate`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/clinics`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/professional-services`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/manufacturing-industrial`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/b2b-businesses`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/law-firms`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/salons-beauty`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/industries/auto-repair`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/free-audit`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/how-we-work`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/ar/blog`, priority: 0.6, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/ar/contact`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const arServiceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/ar/services/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const workRoutes: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const arWorkRoutes: MetadataRoute.Sitemap = arWorkSlugs.map((slug) => ({
    url: `${SITE_URL}/ar/work/${slug}`,
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

  const arBlogRoutes: MetadataRoute.Sitemap = arBlogSlugs.map((slug) => ({
    url: `${SITE_URL}/ar/blog/${slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const cityRoutes: MetadataRoute.Sitemap = gccCities.map((city) => ({
    url: `${SITE_URL}/in/${city}`,
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  const arCityRoutes: MetadataRoute.Sitemap = gccCities.map((city) => ({
    url: `${SITE_URL}/ar/in/${city}`,
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: now,
  }))

  return [
    ...staticRoutes,
    ...arStaticRoutes,
    ...serviceRoutes,
    ...arServiceRoutes,
    ...workRoutes,
    ...arWorkRoutes,
    ...blogRoutes,
    ...arBlogRoutes,
    ...cityRoutes,
    ...arCityRoutes,
  ]
}
