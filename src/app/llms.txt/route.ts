import { SITE_URL, BRAND } from '@/lib/utils'
import { getServices } from '@/lib/services'
import { getPortfolio } from '@/lib/portfolio'
import { getPosts } from '@/lib/blog'

export const revalidate = 3600

/**
 * llms.txt — a plain-text site guide for AI crawlers and answer engines
 * (ChatGPT, Claude, Perplexity, Google AI Overviews). https://llmstxt.org
 */
export async function GET() {
  const [services, portfolio, posts] = await Promise.all([
    getServices().catch(() => []),
    getPortfolio().catch(() => []),
    getPosts().catch(() => []),
  ])

  const lines: string[] = [
    `# ${BRAND.name}`,
    '',
    `> ${BRAND.name} is a founder-led, full-stack B2B digital agency headquartered in ${BRAND.location}. One senior team delivering websites, mobile apps, UI/UX design, SEO, social media, content, community management, analytics, and paid advertising. Budget-based transparent pricing. Site available in English and Arabic (${SITE_URL}/ar).`,
    '',
    `Contact: ${BRAND.email}`,
    '',
    '## Key pages',
    '',
    `- [About](${SITE_URL}/about): Who we are, values, and how the team works`,
    `- [Services](${SITE_URL}/services): All nine service lines`,
    `- [Portfolio](${SITE_URL}/portfolio): Case studies with measurable results`,
    `- [Process](${SITE_URL}/process): Seven-phase engagement framework`,
    `- [Pricing](${SITE_URL}/pricing): Budget-based pricing ranges and FAQ`,
    `- [Contact](${SITE_URL}/contact): Start a project (reply within 24 hours)`,
    `- [Blog](${SITE_URL}/blog): Essays on engineering, design, and growth`,
  ]

  if (services.length > 0) {
    lines.push('', '## Services', '')
    for (const s of services) {
      lines.push(`- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.short}`)
    }
  }

  if (portfolio.length > 0) {
    lines.push('', '## Case studies', '')
    for (const c of portfolio) {
      lines.push(
        `- [${c.client} — ${c.title}](${SITE_URL}/portfolio/${c.slug}): ${c.industry}, ${c.year}. Outcome: ${c.outcome}`,
      )
    }
  }

  if (posts.length > 0) {
    lines.push('', '## Blog posts', '')
    for (const p of posts) {
      lines.push(`- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`)
    }
  }

  lines.push(
    '',
    '## Optional',
    '',
    `- [Arabic site](${SITE_URL}/ar): Full Arabic version of the site`,
    `- [Privacy policy](${SITE_URL}/privacy-policy)`,
    `- [Terms of service](${SITE_URL}/terms)`,
    '',
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
