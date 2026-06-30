import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getPortfolio } from '@/lib/portfolio'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Recent TechParadice engagements — websites, mobile apps, and full-funnel growth programs.',
  path: '/portfolio',
})

const filters = ['All', 'Web', 'Mobile', 'Design', 'Marketing']

export default async function PortfolioPage() {
  const portfolio = await getPortfolio()

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Projects we&apos;ve{' '}
            <span className="text-teal">shipped.</span>
          </>
        }
        description="Each case study includes the challenge, the approach, and the numbers that came out the other side."
      >
        <ul className="flex flex-wrap gap-2" aria-label="Filter">
          {filters.map((f, i) => (
            <li key={f}>
              <button
                type="button"
                className={
                  i === 0
                    ? 'rounded-full border border-teal bg-teal/10 px-4 py-1.5 text-[13px] font-semibold text-teal'
                    : 'rounded-full border border-border-dark bg-surface px-4 py-1.5 text-[13px] font-semibold text-white/70 hover:border-teal/40 hover:text-white'
                }
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="void" className="pt-0">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/portfolio/${c.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border-dark bg-surface transition-all hover:-translate-y-1 hover:border-teal/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal/20 via-surface to-void">
                  {c.cover ? (
                    <Image src={c.cover} alt={c.client} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[48px] font-extrabold tracking-tight text-white/10">
                        {c.client}
                      </span>
                    </div>
                  )}
                  <div className="absolute right-4 top-4">
                    <Badge tone="teal">{c.outcome}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-caption uppercase text-muted">
                    {c.industry} · {c.year}
                  </p>
                  <h2 className="mt-2 font-display text-h4 font-semibold text-white">{c.title}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.services.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner />
    </>
  )
}
