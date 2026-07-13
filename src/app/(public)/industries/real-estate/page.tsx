import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Real Estate',
  description:
    'Property listing portals, lead capture funnels, CRM integration, and paid ads for real estate agents and agencies.',
  path: '/industries/real-estate',
})

const services = [
  { title: 'Property Listing Portals', detail: 'Searchable listing sites with filters, map views, and inquiry forms.' },
  { title: 'Lead Capture Funnels', detail: 'Landing pages and forms engineered to convert visitors into qualified leads.' },
  { title: 'CRM Integration', detail: 'Leads pushed directly to your CRM — HubSpot, Salesforce, or bespoke.' },
  { title: 'Paid Advertising', detail: 'Facebook, Instagram, and Google ads targeting buyers by location and intent.' },
  { title: 'SEO & Content', detail: 'Neighbourhood guides, market reports, and structured data for rich results.' },
  { title: 'UI/UX Design', detail: 'Property detail pages designed to hold attention and drive enquiries.' },
]

const results = [
  { value: '2.4x', label: 'avg. lead volume increase' },
  { value: '–31%', label: 'avg. cost per qualified lead' },
  { value: '8 wks', label: 'typical time to full launch' },
]

export default function RealEstatePage() {
  return (
    <>
      <PageHero
        eyebrow="Real Estate"
        title={
          <>
            More qualified leads,{' '}
            <span className="text-teal">less wasted spend.</span>
          </>
        }
        description="Property portals, lead funnels, and paid campaigns built to bring serious buyers — not tyre-kickers."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Get a free audit
          </Link>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            All industries
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {results.map((r) => (
            <li key={r.label} className="rounded-2xl border border-border-dark bg-surface p-8">
              <p className="font-display text-[48px] font-extrabold leading-none text-teal">{r.value}</p>
              <p className="mt-3 text-[13px] uppercase tracking-[1.5px] text-muted">{r.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="What we do for real estate"
          title="From listing to signed contract"
          description="Every step of the buyer and renter journey — optimised to reduce friction and increase enquiries."
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="flex gap-3 rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                <Check size={14} />
              </span>
              <div>
                <h3 className="font-display text-[16px] font-semibold text-void dark:text-white">{s.title}</h3>
                <p className="mt-1 text-[13px] text-void/60 dark:text-white/60">{s.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading="Ready to close more deals?"
        body="Share your website and goals — we'll audit your digital funnel and identify the biggest opportunities."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
