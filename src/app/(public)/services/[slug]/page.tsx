import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getService, getAllServiceSlugs } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'
import { getPortfolio } from '@/lib/portfolio'

export const dynamicParams = true

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = await getService(params.slug)
  if (!service) return {}
  return buildMetadata({
    title: service.name,
    description: service.value,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: Params) {
  const [service, portfolio] = await Promise.all([getService(params.slug), getPortfolio()])
  if (!service) notFound()

  const Icon = service.icon

  const related = (
    await Promise.all(service.pairsWith.map((s) => getService(s)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s))

  const sampleWork = portfolio.filter((p) =>
    p.services.some((s) =>
      s.toLowerCase().includes(service.name.split(' ')[0].toLowerCase()),
    ),
  )

  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.value,
      provider: {
        '@type': 'Organization',
        name: 'TechParadice',
        url: 'https://techparadice.com',
      },
      url: `https://techparadice.com/services/${service.slug}`,
      serviceType: service.name,
      areaServed: 'Worldwide',
    },
  ]

  if (service.faqs?.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq: { q: string; a: string }) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero eyebrow={service.name} title={service.value} description={service.short}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" size="lg">Start a project</ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">All services</ButtonLink>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
              <Icon size={24} />
            </span>
            <h2 className="mt-6 heading-h2 text-void dark:text-white">What&apos;s included</h2>
            <p className="mt-3 max-w-md text-void/70 dark:text-white/70">
              A scoped, transparent set of deliverables — adjusted to your goals during kickoff.
            </p>
          </div>
          <ul className="space-y-3">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3 rounded-lg border border-border-light bg-neutral-50 p-5 dark:border-border-dark dark:bg-surface">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                  <Check size={14} />
                </span>
                <span className="text-[15px] text-void/85 dark:text-white/85">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Process" title={`How a ${service.name.toLowerCase()} engagement runs`} />
        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((p, i) => (
            <li key={p.step} className="rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
              <span className="font-display text-[28px] font-extrabold text-teal">0{i + 1}</span>
              <h3 className="mt-3 font-display text-h4 font-semibold text-void dark:text-white">{p.step}</h3>
              <p className="mt-2 text-[14px] text-void/60 dark:text-white/60">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="void">
        <SectionHeading eyebrow="Tooling" title="What we use to deliver" />
        <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {service.tools.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-border-light bg-neutral-50 px-4 py-3 text-center font-display text-[15px] font-semibold text-void/60 transition-colors hover:text-void dark:border-border-dark dark:bg-surface dark:text-white/60 dark:hover:text-white"
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {sampleWork.length > 0 ? (
        <Section tone="surface">
          <SectionHeading eyebrow="Sample work" title={`${service.name} in action`} />
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {sampleWork.slice(0, 2).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border-light bg-white transition-all hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-void"
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-teal/20 via-neutral-100 to-white dark:via-surface dark:to-void">
                    <div className="absolute inset-0 flex items-center justify-center font-display text-[56px] font-extrabold text-void/10 dark:text-white/10">
                      {c.client}
                    </div>
                    <div className="absolute right-4 top-4">
                      <Badge tone="teal">{c.outcome}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-h4 font-semibold text-void dark:text-white">{c.title}</h3>
                    <p className="mt-2 text-[14px] text-muted">{c.industry} · {c.timeline}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title={`About ${service.name.toLowerCase()}`} />
          <Faq items={service.faqs} />
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="surface">
          <SectionHeading
            eyebrow="Pair with"
            title="Services that work well together"
            description={`Clients running ${service.name.toLowerCase()} often add:`}
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon
              return (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full flex-col justify-between rounded-xl border border-border-light bg-white p-6 transition-all hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-void"
                  >
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
                        <RIcon size={18} />
                      </span>
                      <h3 className="mt-5 font-display text-h4 font-semibold text-void dark:text-white">{r.name}</h3>
                      <p className="mt-2 text-[14px] text-void/60 dark:text-white/60">{r.short}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-semibold text-teal">
                      Explore <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Section>
      ) : null}

      <CtaBanner heading={`Ready to scope your ${service.name.toLowerCase()}?`} />
    </>
  )
}
