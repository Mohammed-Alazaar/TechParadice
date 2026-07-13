import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve',
  description:
    'TechParadice builds digital products for restaurants, real estate, manufacturing, and B2B businesses. Industry-specific expertise, proven results.',
  path: '/industries',
})

const localBusiness = [
  {
    href: '/industries/restaurants',
    title: 'Restaurants',
    description: 'Online menus, reservation systems, local SEO, and social media — everything a modern restaurant needs to fill tables.',
    tags: ['Local SEO', 'Online Ordering', 'Social Media'],
  },
  {
    href: '/industries/real-estate',
    title: 'Real Estate',
    description: 'Property listing sites, CRM integration, lead capture funnels, and paid ads that bring serious buyers and renters.',
    tags: ['Listing Portals', 'Lead Capture', 'Paid Ads'],
  },
]

const b2bIndustrial = [
  {
    href: '/industries/manufacturing-industrial',
    title: 'Manufacturing & Industrial',
    description: 'Product catalogs, dealer portals, multilingual B2B sites, and lead pipelines built for long sales cycles.',
    tags: ['Product Catalogs', 'Multilingual', 'B2B Portals'],
  },
  {
    href: '/industries/b2b-businesses',
    title: 'B2B Businesses',
    description: 'Account-based marketing, lead generation systems, AI-assisted outreach, and analytics dashboards that tie to pipeline.',
    tags: ['Account-Based', 'Lead Gen', 'AI Automation'],
  },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built for your{' '}
            <span className="text-teal">business type.</span>
          </>
        }
        description="We've shipped digital products across industries that have different buying cycles, compliance needs, and customer expectations. We know what works — and what wastes budget."
      />

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="Local Business"
          title="Serving your community online"
          description="Local presence, national polish. We help brick-and-mortar businesses win online."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {localBusiness.map((ind) => (
            <li key={ind.href}>
              <Link
                href={ind.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:-translate-y-1 hover:border-teal/40"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h2 className="font-display text-h3 font-semibold text-white">{ind.title}</h2>
                    <ArrowUpRight size={20} className="text-muted transition-colors group-hover:text-teal" />
                  </div>
                  <p className="mt-4 text-[15px] text-white/70">{ind.description}</p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {ind.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border-dark px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="B2B & Industrial"
          title="Complex products, clear digital presence"
          description="Longer sales cycles, technical buyers, and global reach — we've shipped it all."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {b2bIndustrial.map((ind) => (
            <li key={ind.href}>
              <Link
                href={ind.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border-light bg-white p-8 transition-all hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-void"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h2 className="font-display text-h3 font-semibold text-void dark:text-white">{ind.title}</h2>
                    <ArrowUpRight size={20} className="text-muted transition-colors group-hover:text-teal" />
                  </div>
                  <p className="mt-4 text-[15px] text-void/70 dark:text-white/70">{ind.description}</p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {ind.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border-light px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted dark:border-border-dark"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading="Not sure which category fits?"
        body="Tell us what you do. We'll map the right services to your business in our free audit."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
