import { getPosts } from '@/lib/blog'
import { buildRssFeed } from '@/lib/rss'
import { SITE_URL, BRAND } from '@/lib/utils'

export const revalidate = 300

export async function GET() {
  const posts = await getPosts()

  const xml = buildRssFeed({
    title: `${BRAND.name} — Blog`,
    description:
      'Articles on engineering, design, and growth from the TechParadice team.',
    feedUrl: `${SITE_URL}/feed.xml`,
    siteUrl: `${SITE_URL}/blog`,
    language: 'en',
    items: posts.map((p) => ({
      title: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      date: p.date,
    })),
  })

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
