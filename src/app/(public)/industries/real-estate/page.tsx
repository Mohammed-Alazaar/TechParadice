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
    'Property websites, enquiry journeys, CRM integration, SEO, and paid campaigns for real estate agents, developers, and agencies.',
  path: '/industries/real-estate',
})

const services = [
  { title: 'Property Websites', detail: 'Searchable listings with useful filters, map views, clear details, and enquiry options.' },
  { title: 'Lead-Capture Journeys', detail: 'Focused landing pages and forms that collect the information your sales team needs.' },
  { title: 'CRM Integration', detail: 'Route enquiries to HubSpot, Salesforce, or another compatible CRM for timely follow-up.' },
  { title: 'Paid Campaigns', detail: 'Meta and Google campaigns organised around location, audience, intent, and property type.' },
  { title: 'SEO & Content', detail: 'Area guides, market insights, property content, and structured data for search visibility.' },
  { title: 'UI/UX Design', detail: 'Clear property and project journeys designed for comparison, shortlisting, and enquiry.' },
]

const priorities = [
  { value: 'Discover', label: 'searchable properties and useful market content' },
  { value: 'Qualify', label: 'enquiry forms aligned with sales requirements' },
  { value: 'Follow up', label: 'connected CRM and lead-routing workflows' },
]

export default function RealEstatePage() {
  return (
    <>
      <PageHero
        eyebrow="Real Estate"
        title={
          <>
            Make property discovery{' '}
            <span className="text-teal">easier to act on.</span>
          </>
        }
        description="Connect property search, content, campaigns, enquiries, and CRM workflows so your team can focus on relevant opportunities."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Request a free audit
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
          {priorities.map((r) => (
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
          title="Connect listings, enquiries, and follow-up"
          description="Create a coherent journey for buyers, renters, sellers, and your internal sales team."
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
        heading="Want to improve your property enquiry journey?"
        body="Share your website and commercial goals. We will review the current experience and identify the highest-priority improvements."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
