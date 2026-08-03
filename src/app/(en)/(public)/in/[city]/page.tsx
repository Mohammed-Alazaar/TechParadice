import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'
import { ldJson } from '@/lib/utils'
import { pageGraph, serviceNode, breadcrumbNode } from '@/lib/schema'

export const revalidate = 86400

type CityMeta = {
  label: string
  country: string
  countryCode: string
  description: string
  industries: string[]
}

const CITIES: Record<string, CityMeta> = {
  dubai: {
    label: 'Dubai',
    country: 'UAE',
    countryCode: 'AE',
    description: 'We help Dubai businesses improve how customers find, understand, and engage with them online through clear strategy, strong design, and dependable technology.',
    industries: ['restaurants', 'real-estate', 'clinics', 'professional-services', 'b2b-businesses'],
  },
  'abu-dhabi': {
    label: 'Abu Dhabi',
    country: 'UAE',
    countryCode: 'AE',
    description: 'We help Abu Dhabi organisations present their services clearly, build trust online, and create easier paths from interest to enquiry.',
    industries: ['professional-services', 'clinics', 'manufacturing-industrial', 'b2b-businesses', 'restaurants'],
  },
  riyadh: {
    label: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    description: 'We help Riyadh businesses build clear, bilingual digital experiences designed for local audiences and measurable business priorities.',
    industries: ['restaurants', 'real-estate', 'clinics', 'b2b-businesses', 'professional-services'],
  },
  jeddah: {
    label: 'Jeddah',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    description: 'We help Jeddah businesses connect websites, content, SEO, and campaigns around a consistent customer journey.',
    industries: ['restaurants', 'real-estate', 'salons-beauty', 'clinics', 'b2b-businesses'],
  },
  kuwait: {
    label: 'Kuwait City',
    country: 'Kuwait',
    countryCode: 'KW',
    description: 'We help Kuwait City businesses create professional digital experiences that make their offer easier to find, evaluate, and act on.',
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  doha: {
    label: 'Doha',
    country: 'Qatar',
    countryCode: 'QA',
    description: 'We help Doha businesses improve their digital presence across websites, search, content, and campaigns, with a plan shaped around their goals.',
    industries: ['restaurants', 'real-estate', 'professional-services', 'b2b-businesses', 'clinics'],
  },
  muscat: {
    label: 'Muscat',
    country: 'Oman',
    countryCode: 'OM',
    description: 'We help Muscat businesses turn digital investment into a clearer customer journey, from discovery and evaluation to enquiry or booking.',
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  manama: {
    label: 'Manama',
    country: 'Bahrain',
    countryCode: 'BH',
    description: 'We help Manama businesses clarify their offer, strengthen online visibility, and make it easier for the right customers to take the next step.',
    industries: ['professional-services', 'restaurants', 'b2b-businesses', 'clinics', 'real-estate'],
  },
}

const INDUSTRY_LABELS: Record<string, string> = {
  restaurants: 'Restaurants',
  'real-estate': 'Real Estate',
  clinics: 'Clinics & Healthcare',
  'professional-services': 'Professional Services',
  'manufacturing-industrial': 'Manufacturing',
  'b2b-businesses': 'B2B Businesses',
  'law-firms': 'Law Firms',
  'salons-beauty': 'Salons & Beauty',
  'auto-repair': 'Auto Repair',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const meta = CITIES[city]
  if (!meta) return {}

  return buildMetadata({
    title: `Digital Agency in ${meta.label}, ${meta.country}`,
    description: `TechParadice provides web development, mobile apps, UI/UX, SEO, content, social media, and paid campaigns for businesses in ${meta.label}.`,
    path: `/in/${city}`,
  })
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }))
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const meta = CITIES[city]
  if (!meta) notFound()

  const services = await getServices()

  // City landing pages previously shipped no page-level structured data. The
  // Service node with an explicit areaServed is what makes these pages legible
  // for "digital agency in {city}" queries.
  const jsonLd = pageGraph(
    serviceNode({
      locale: 'en',
      pagePath: `/in/${city}`,
      name: `Digital Agency Services in ${meta.label}`,
      description: meta.description,
      serviceType: 'Digital agency services',
      areaServed: { name: meta.label, type: 'City', containedIn: meta.country },
    }),
    breadcrumbNode('en', `/in/${city}`, [[`${meta.label}, ${meta.country}`, `/in/${city}`]]),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <PageHero
        eyebrow={`${meta.label}, ${meta.country}`}
        title={
          <>
            Digital growth for{' '}
            <span className="text-teal">{meta.label} businesses.</span>
          </>
        }
        description={meta.description}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Request a free audit <ArrowRight size={16} />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            See our work
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="Services"
          title={`Digital services for ${meta.label} businesses`}
          description="Choose a focused service or combine capabilities around one coordinated plan, shaped for your audience, goals, and operating context."
        />
        {services.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-start gap-4 rounded-xl border border-border-dark bg-surface p-5 transition-all hover:border-teal/50"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-display text-[15px] font-semibold text-white">{service.name}</p>
                      <p className="mt-0.5 text-[13px] text-white/50">{service.short}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="mt-8 rounded-xl border border-border-dark bg-surface p-6 text-white/70">
            Service details are being updated. Contact us to discuss the right
            capabilities for your goals in {meta.label}.
          </p>
        )}
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Industries"
          title={`Relevant sectors in ${meta.label}`}
          description="Explore examples of how our capabilities can be adapted to different customer journeys and business models."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {meta.industries.map((ind) => (
            <li key={ind}>
              <Link
                href={`/industries/${ind}`}
                className="group flex items-center justify-between rounded-xl border border-border-light bg-white p-5 transition-all hover:border-teal/40 dark:border-border-dark dark:bg-void"
              >
                <span className="font-display text-[15px] font-semibold text-void group-hover:text-teal dark:text-white">
                  {INDUSTRY_LABELS[ind] ?? ind}
                </span>
                <ArrowRight size={15} className="text-muted transition-colors group-hover:text-teal" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading={`Planning your next digital initiative in ${meta.label}?`}
        body="Share your website, goals, and current constraints. We will review the opportunity and recommend a practical starting point."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/about"
        secondaryLabel="About us"
      />
    </>
  )
}
