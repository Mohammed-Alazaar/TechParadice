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
import { buildMetadata, composeDescription } from '@/lib/seo'
import { getPortfolio } from '@/lib/portfolio'
import { SITE_URL, ldJson } from '@/lib/utils'
import { ORG_REF } from '@/lib/schema'

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
    // `short` alone is 56-65 chars — under half the rendered budget. `value`
    // carries the benefit statement and is otherwise only used in the schema.
    description: composeDescription(service.short, service.value),
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
      provider: ORG_REF,
      url: `${SITE_URL}/services/${service.slug}`,
      serviceType: service.name,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
      ],
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
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <PageHero eyebrow={service.name} title={service.value} description={service.short}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/free-audit" size="lg">Request a free audit</ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">Explore all services</ButtonLink>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
              <Icon size={24} />
            </span>
            <h2 className="mt-6 heading-h2 text-void dark:text-white">What an engagement can include</h2>
            <p className="mt-3 max-w-md text-void/70 dark:text-white/70">
              We confirm the final deliverables after reviewing your goals,
              current setup, dependencies, and priorities.
            </p>
          </div>
          {service.deliverables.length > 0 ? (
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
          ) : (
            <p className="rounded-xl border border-border-dark bg-surface p-6 text-white/70">
              Deliverables are defined around the project requirements. Contact
              us for a scope tailored to your goals.
            </p>
          )}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Process"
          title={`How we deliver ${service.name.toLowerCase()}`}
          description="The exact sequence is adjusted to the scope, but responsibilities and review points are agreed before delivery begins."
        />
        {service.process.length > 0 ? (
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <li key={p.step} className="rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
                <span className="font-display text-[28px] font-extrabold text-teal">0{i + 1}</span>
                <h3 className="mt-3 font-display text-h4 font-semibold text-void dark:text-white">{p.step}</h3>
                <p className="mt-2 text-[14px] text-void/60 dark:text-white/60">{p.detail}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 text-void/70 dark:text-white/70">
            We will document the delivery stages and review points in your proposal.
          </p>
        )}
      </Section>

      <Section tone="void">
        <SectionHeading
          eyebrow="Tools"
          title="Tools selected for the work"
          description="We choose tools based on the project requirements, your existing systems, and the needs of the people who will maintain the work."
        />
        {service.tools.length > 0 ? (
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
        ) : (
          <p className="mt-8 text-white/70">
            Recommended tools will be included in the proposed technical approach.
          </p>
        )}
      </Section>

      {sampleWork.length > 0 ? (
        <Section tone="surface">
          <SectionHeading eyebrow="Relevant work" title={`${service.name} examples`} />
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {sampleWork.slice(0, 2).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/work/${c.slug}`}
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

      {service.faqs?.length ? (
        <Section tone="void">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeading eyebrow="FAQ" title={`Questions about ${service.name.toLowerCase()}`} />
            <Faq items={service.faqs} />
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section tone="surface">
          <SectionHeading
            eyebrow="Pair with"
            title="Related capabilities"
            description={`Depending on your goals, ${service.name.toLowerCase()} may also benefit from:`}
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
                      View service <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Section>
      ) : null}

      <CtaBanner
        heading={`Planning a ${service.name.toLowerCase()} project?`}
        body="Share your goals, current setup, and constraints. We will help you define a practical scope and next step."
        ctaHref="/contact"
        ctaLabel="Discuss your project"
      />
    </>
  )
}
