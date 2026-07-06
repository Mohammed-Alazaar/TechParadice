import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { PortfolioGrid, type PortfolioCardData } from '@/components/sections/PortfolioGrid'
import { getPortfolio } from '@/lib/portfolio'
import { buildMetadata, breadcrumbJsonLd, firstSentence } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio & Case Studies',
  description:
    'Real client results from TechParadice — websites, mobile apps, and full-funnel growth programs, each with the challenge, approach, and measurable outcomes.',
  path: '/portfolio',
})

export default async function PortfolioPage() {
  const portfolio = await getPortfolio()

  const cards: PortfolioCardData[] = portfolio.map((c) => ({
    slug: c.slug,
    href: `/portfolio/${c.slug}`,
    client: c.client,
    title: c.title,
    industry: c.industry,
    year: c.year,
    services: c.services,
    outcome: c.outcome,
    cover: c.cover,
    excerpt: firstSentence(c.challenge),
    keyResult: c.results?.[0],
  }))

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'TechParadice Portfolio & Case Studies',
      url: `${SITE_URL}/portfolio`,
      description:
        'Case studies from TechParadice client engagements — each with the challenge, approach, and measurable results.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: portfolio.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${c.client} — ${c.title}`,
          url: `${SITE_URL}/portfolio/${c.slug}`,
        })),
      },
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Projects we&apos;ve{' '}
            <span className="text-teal">shipped.</span>
          </>
        }
        description="Each case study includes the challenge, the approach, and the numbers that came out the other side."
      />

      <Section tone="void" className="pt-0">
        {cards.length === 0 ? (
          <p className="text-muted">Case studies are on the way. Check back soon.</p>
        ) : (
          <PortfolioGrid
            items={cards}
            labels={{
              filterAria: 'Filter case studies',
              filters: {
                All: 'All',
                Web: 'Web',
                Mobile: 'Mobile',
                Design: 'Design',
                Marketing: 'Marketing',
              },
              empty: 'No case studies match this filter yet.',
              showing: (n) => (n === 1 ? '1 project' : `${n} projects`),
            }}
          />
        )}
      </Section>

      <CtaBanner />
    </>
  )
}
