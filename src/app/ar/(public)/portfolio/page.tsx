import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { PortfolioGrid, type PortfolioCardData } from '@/components/sections/PortfolioGrid'
import { getArPortfolio } from '@/lib/portfolio'
import { buildMetadata, breadcrumbJsonLd, firstSentence } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'أعمالنا ودراسات الحالة',
  description:
    'نتائج حقيقية لعملاء تك باراديس — مواقع وتطبيقات وبرامج نمو متكاملة، كل مشروع مع التحدي والنهج والنتائج القابلة للقياس.',
  path: '/ar/portfolio',
  alternatePath: '/portfolio',
  locale: 'ar',
})

export default async function ArPortfolioPage() {
  const portfolio = await getArPortfolio()

  const cards: PortfolioCardData[] = portfolio.map((c) => ({
    slug: c.slug,
    href: `/ar/portfolio/${c.slug}`,
    client: c.client,
    title: c.titleAr ?? c.title,
    industry: c.industry,
    year: c.year,
    services: c.services,
    outcome: c.outcomeAr ?? c.outcome,
    cover: c.cover,
    excerpt: c.challengeAr ? firstSentence(c.challengeAr) : '',
    keyResult: c.resultsAr?.[0],
  }))

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'الرئيسية', path: '/ar' },
      { name: 'أعمالنا', path: '/ar/portfolio' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'أعمال تك باراديس ودراسات الحالة',
      url: `${SITE_URL}/ar/portfolio`,
      inLanguage: 'ar',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: portfolio.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${c.client} — ${c.titleAr ?? c.title}`,
          url: `${SITE_URL}/ar/portfolio/${c.slug}`,
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
        eyebrow="أعمال مختارة"
        title={
          <>
            مشاريع{' '}
            <span className="text-teal">أطلقناها.</span>
          </>
        }
        description="كل دراسة حالة تتضمن التحدي والنهج والأرقام التي خرجت من الجانب الآخر."
      />

      <Section tone="void" className="pt-0">
        {cards.length === 0 ? (
          <p className="text-muted">لا توجد دراسات حالة بعد.</p>
        ) : (
          <PortfolioGrid
            items={cards}
            labels={{
              filterAria: 'تصفية دراسات الحالة',
              filters: {
                All: 'الكل',
                Web: 'ويب',
                Mobile: 'موبايل',
                Design: 'تصميم',
                Marketing: 'تسويق',
              },
              empty: 'لا توجد دراسات حالة ضمن هذا التصنيف بعد.',
              showing: (n) => (n === 1 ? 'مشروع واحد' : `${n} مشاريع`),
            }}
          />
        )}
      </Section>

      <CtaBanner
        heading="هل أنت مستعد للبدء؟"
        body="أخبرنا بأهدافك. سنتكفل بالباقي."
        ctaLabel="تواصل معنا"
        ctaHref="/ar/contact"
      />
    </>
  )
}
