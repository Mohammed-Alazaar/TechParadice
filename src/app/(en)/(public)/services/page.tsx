import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices, type Service } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL, ldJson } from '@/lib/utils'
import { ORG_REF } from '@/lib/schema'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Explore TechParadice services across web development, mobile apps, UI/UX, SEO, content, paid advertising, and custom AI assistants.',
  path: '/services',
})

const BUILD_SLUGS = ['web-development', 'mobile-app-development', 'ui-ux-design']
const GROW_SLUGS = ['seo', 'content-creation', 'paid-advertising']
const AI_ASSISTANT_SLUGS = [
  'voice-ai-receptionist',
  'customer-support-ai',
  'sales-lead-qualification-ai',
  'business-analytics-ai',
  'internal-knowledge-ai',
  'meeting-executive-ai',
]

const overviewFaqs = [
  {
    q: 'Can I work with you on just one service?',
    a: 'Yes. We can deliver a focused engagement for one service or coordinate several capabilities when the work depends on them.',
  },
  {
    q: 'Do I need to know what I want before contacting you?',
    a: "No. Share the goal, current situation, constraints, and budget range. We will help define the most useful scope and explain the trade-offs.",
  },
  {
    q: 'How do you price engagements?',
    a: 'Pricing reflects the agreed scope, complexity, team, and delivery requirements. We document deliverables, assumptions, fees, and milestones before work starts.',
  },
  {
    q: 'Where is your team?',
    a: 'TechParadice is based in Ankara, Turkey, and brings in specialist support according to the needs of each engagement.',
  },
]

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border-dark bg-surface p-6 transition-all hover:-translate-y-1 hover:border-teal/50"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
          <Icon size={20} />
        </span>
        <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-teal" />
      </div>
      <h2 className="mt-6 font-display text-h4 font-semibold text-white">{service.name}</h2>
      <p className="mt-2 text-[14px] text-white/60">{service.short}</p>
    </Link>
  )
}

function ClusterRow({
  label,
  services,
}: {
  label: string
  services: Service[]
}) {
  if (services.length === 0) return null
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px w-8 bg-teal" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-teal">{label}</p>
        <span className="h-px flex-1 bg-border-dark" />
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="flex">
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ServicesPage() {
  const services = await getServices()

  const build = services.filter((s) => BUILD_SLUGS.includes(s.slug))
  const grow = services.filter((s) => GROW_SLUGS.includes(s.slug))
  const aiAssistants = services.filter((s) => AI_ASSISTANT_SLUGS.includes(s.slug))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: service.name,
          description: service.short,
          url: `${SITE_URL}/services/${service.slug}`,
          // Reference the layout's Organization by @id — an inline copy here
          // resolved as a separate business entity.
          provider: ORG_REF,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/services#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: overviewFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Build, improve, and{' '}
            <span className="text-teal">connect your digital presence.</span>
          </>
        }
        description="Choose a focused capability or combine services around one coherent plan, with clear ownership and shared priorities."
      />

      <Section tone="void" className="space-y-16 pt-0">
        {services.length > 0 ? (
          <>
            <ClusterRow label="Build" services={build} />
            <ClusterRow label="Grow" services={grow} />
            <ClusterRow label="AI Assistants" services={aiAssistants} />
          </>
        ) : (
          <div className="rounded-2xl border border-border-dark bg-surface p-8 sm:p-10">
            <h2 className="font-display text-h3 font-semibold text-white">
              Service details are being updated
            </h2>
            <p className="mt-3 max-w-2xl text-white/65">
              Contact us to discuss your goals and we will outline the relevant
              capabilities, scope, and next steps directly.
            </p>
          </div>
        )}
      </Section>

      <Section tone="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">Coordinated delivery</p>
            <h2 className="mt-4 heading-h2 text-balance text-white">
              Combine only the capabilities{' '}
              <span className="text-teal">your goals require.</span>
            </h2>
            <p className="mt-4 text-body-lg text-white/70">
              When design, technology, content, campaigns, and measurement share the same
              priorities, decisions are easier to coordinate and results are easier to assess.
              We define one roadmap and make ownership clear across the engagement.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              'Web + SEO + Content',
              'Web + UI/UX + Paid Advertising',
              'Web + Customer Support AI',
              'SEO + Content + Paid Advertising',
              'Voice AI + Sales AI',
              'Web + Mobile + UI/UX',
            ].map((combo) => (
              <li
                key={combo}
                className="rounded-xl border border-border-dark bg-void p-5 font-display text-[16px] font-semibold text-white"
              >
                <span className="mb-2 inline-block h-px w-6 bg-teal" />
                <div>{combo}</div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="void">
        <SectionHeading
          eyebrow="Questions"
          title="Common service questions"
          description="Each service page explains its typical deliverables, process, tools, and related questions in more detail."
        />
        <div className="mt-10 max-w-3xl">
          <Faq items={overviewFaqs} />
        </div>
      </Section>

      <CtaBanner
        heading="Not sure which service to start with?"
        body="Tell us what you want to improve and what is getting in the way. We will recommend a practical starting point."
        ctaHref="/contact"
        ctaLabel="Discuss your needs"
      />
    </>
  )
}
