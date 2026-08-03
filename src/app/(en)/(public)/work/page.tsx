import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getPortfolio } from '@/lib/portfolio'
import { buildMetadata } from '@/lib/seo'
import { BasicPageSchema } from '@/components/seo/PageSchema'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Our Work',
  description:
    'Explore selected TechParadice work across websites, mobile products, design, SEO, content, and digital campaigns.',
  path: '/work',
})

const filters = ['All', 'Web', 'Mobile', 'Design', 'Marketing']

export default async function WorkPage() {
  const portfolio = await getPortfolio()

  return (
    <>
      <BasicPageSchema
        locale="en"
        path="/work"
        type="CollectionPage"
        name="Our Work"
        description="Explore selected TechParadice work across websites, mobile products, design, SEO, content, and digital campaigns."
        crumb="Our Work"
      />
      <PageHero
        eyebrow="Client work"
        title={
          <>
            Selected projects and{' '}
            <span className="text-teal">the thinking behind them.</span>
          </>
        }
        description="Explore the business context, our approach, the work delivered, and the available outcomes for each engagement."
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
        {portfolio.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/work/${c.slug}`}
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
        ) : (
          <div className="rounded-2xl border border-border-dark bg-surface p-8 sm:p-10">
            <h2 className="font-display text-h3 font-semibold text-white">
              Case studies are being prepared
            </h2>
            <p className="mt-3 max-w-2xl text-white/65">
              We are documenting selected engagements in more detail. Contact us
              to discuss relevant experience for your project in the meantime.
            </p>
          </div>
        )}
      </Section>

      <CtaBanner
        heading="Have a similar challenge?"
        body="Share your goals and current setup. We will help you define a practical scope for the next step."
        ctaHref="/contact"
        ctaLabel="Discuss your project"
      />
    </>
  )
}
