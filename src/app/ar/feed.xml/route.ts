import { getArPosts } from '@/lib/blog'
import { buildRssFeed } from '@/lib/rss'
import { SITE_URL, BRAND } from '@/lib/utils'

export const revalidate = 300

export async function GET() {
  const posts = await getArPosts()

  const xml = buildRssFeed({
    title: `${BRAND.name} — المدونة`,
    description: 'رؤى عملية حول التقنية والتصميم والنمو من فريق TechParadice.',
    feedUrl: `${SITE_URL}/ar/feed.xml`,
    siteUrl: `${SITE_URL}/ar/blog`,
    language: 'ar',
    items: posts.map((p) => ({
      title: p.titleAr,
      description: p.excerptAr,
      url: `${SITE_URL}/ar/blog/${p.slug}`,
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
