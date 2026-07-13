import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices, type Service } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL, BRAND } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Websites, mobile apps, UI/UX, SEO & content, social media, paid ads, and AI assistants — one senior team, one contract.',
  path: '/services',
})

const BUILD_SLUGS = ['web-development', 'mobile-apps', 'ui-ux-design']
const GROW_SLUGS = ['seo-content', 'social-media', 'paid-ads']
const AUTOMATE_SLUGS = ['ai-assistants']

const overviewFaqs = [
  {
    q: 'Can I work with you on just one service?',
    a: 'Absolutely. Start with what you need — most clients add services as the relationship grows.',
  },
  {
    q: 'Do I need to know what I want before contacting you?',
    a: "No. Share your goal and constraints. We'll scope the path and the deliverables together.",
  },
  {
    q: 'How do you price engagements?',
    a: "Budget-based. We propose scope that fits your target and deliver transparently against it.",
  },
  {
    q: 'Where is your team?',
    a: 'Headquartered in Ankara, Turkey. Vetted senior freelancers distributed across Europe and MENA.',
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
  const automate = services.filter((s) => AUTOMATE_SLUGS.includes(s.slug))

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
          provider: { '@type': 'Organization', name: BRAND.name, url: SITE_URL },
        },
      })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Build. Grow.{' '}
            <span className="text-teal">Automate.</span>
          </>
        }
        description="Seven specialist capabilities across three clusters. One contract, one point of accountability, one coherent plan."
      />

      <Section tone="void" className="space-y-16 pt-0">
        <ClusterRow label="Build" services={build} />
        <ClusterRow label="Grow" services={grow} />
        <ClusterRow label="Automate" services={automate} />
      </Section>

      <Section tone="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">Better together</p>
            <h2 className="mt-4 heading-h2 text-balance text-white">
              Most clients work with us across{' '}
              <span className="text-teal">two or more</span> clusters.
            </h2>
            <p className="mt-4 text-body-lg text-white/70">
              Coordinated execution across build, grow, and automate beats three disconnected
              vendors every time. One backlog, one roadmap, one team accountable to the outcome.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              'Web + SEO + Social',
              'Web + UI/UX + Paid Ads',
              'Mobile + UI/UX + AI',
              'SEO + Content + Paid Ads',
              'Web + AI Assistants',
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
          description="More specific questions? Each service page has its own FAQ section."
        />
        <div className="mt-10 max-w-3xl">
          <Faq items={overviewFaqs} />
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
