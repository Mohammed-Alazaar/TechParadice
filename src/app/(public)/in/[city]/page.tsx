import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'

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
    description: 'Dubai businesses compete in one of the most digitally advanced markets in the world. We help you stand out — with sites that load fast, rank high, and convert.',
    industries: ['restaurants', 'real-estate', 'clinics', 'professional-services', 'b2b-businesses'],
  },
  'abu-dhabi': {
    label: 'Abu Dhabi',
    country: 'UAE',
    countryCode: 'AE',
    description: "Abu Dhabi's economy is diversifying fast. Whether you're serving government, hospitality, or professional clients, we build the digital presence that earns trust.",
    industries: ['professional-services', 'clinics', 'manufacturing-industrial', 'b2b-businesses', 'restaurants'],
  },
  riyadh: {
    label: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    description: "Riyadh is at the center of Vision 2030's digital transformation. We help Saudi businesses claim their share of that growth with fast, bilingual, SEO-ready websites.",
    industries: ['restaurants', 'real-estate', 'clinics', 'b2b-businesses', 'professional-services'],
  },
  jeddah: {
    label: 'Jeddah',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    description: "Jeddah's port, tourism, and hospitality boom means fierce digital competition. We build the sites and campaigns that put your business in front of the right audience.",
    industries: ['restaurants', 'real-estate', 'salons-beauty', 'clinics', 'b2b-businesses'],
  },
  kuwait: {
    label: 'Kuwait City',
    country: 'Kuwait',
    countryCode: 'KW',
    description: "Kuwait City's SMB market is underserved online. We help local businesses build a digital presence that competes with the region's best.",
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  doha: {
    label: 'Doha',
    country: 'Qatar',
    countryCode: 'QA',
    description: "Post-2022 Doha is a global city on the rise. We help Qatari businesses match their ambition with a digital presence that performs at every touchpoint.",
    industries: ['restaurants', 'real-estate', 'professional-services', 'b2b-businesses', 'clinics'],
  },
  muscat: {
    label: 'Muscat',
    country: 'Oman',
    countryCode: 'OM',
    description: "Muscat's growing economy and tourism sector mean opportunity for businesses ready to invest in digital. We help you get there faster.",
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  manama: {
    label: 'Manama',
    country: 'Bahrain',
    countryCode: 'BH',
    description: "Bahrain's open economy and fintech hub make Manama one of the GCC's most dynamic markets. We help local businesses compete online with regional leaders.",
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
    description: `TechParadice builds websites, mobile apps, SEO, social media, and paid ads for businesses in ${meta.label}. One senior team. Fast results.`,
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

  return (
    <>
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
            Get a free audit <ArrowRight size={16} />
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
          title={`What we build for ${meta.label}`}
          description="Every service is available in this market. We know the local landscape and design for it."
        />
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
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Industries"
          title={`Sectors we serve in ${meta.label}`}
          description={`We've worked with ${meta.label} businesses across these verticals.`}
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
        heading={`Ready to grow in ${meta.label}?`}
        body={`We serve businesses across the GCC. Share your URL and goals — we'll audit your digital presence and identify your biggest opportunities.`}
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/about"
        secondaryLabel="About us"
      />
    </>
  )
}
