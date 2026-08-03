import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'
import { IndustrySchema } from '@/components/seo/PageSchema'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Salons & Beauty',
  description:
    'Booking integrations, social content, local SEO, websites, and paid campaigns for salons, spas, studios, and beauty businesses in the GCC.',
  path: '/industries/salons-beauty',
})

const services = [
  { title: 'Online Booking Integration', detail: 'Booking tools that let clients check availability and request or schedule appointments from key channels.' },
  { title: 'Instagram & TikTok Content', detail: 'Content planning, creative direction, captions, and publishing support built around your services and audience.' },
  { title: 'Local SEO & Google Business Profile', detail: 'Accurate profiles, locally relevant content, and search improvements for nearby service discovery.' },
  { title: 'Paid Social Campaigns', detail: 'Meta and TikTok campaigns structured around location, audience, offer, and measurable booking actions.' },
  { title: 'Loyalty & Referral Journeys', detail: 'Approved follow-up, rebooking, and referral messages designed to support repeat relationships.' },
  { title: 'Website Development', detail: 'Fast, polished websites that present your services, work, pricing guidance, locations, and booking options.' },
]

const priorities = [
  { value: 'Discover', label: 'coherent presence across search and social' },
  { value: 'Book', label: 'clear services, availability, and next steps' },
  { value: 'Return', label: 'thoughtful rebooking and referral journeys' },
]

export default function SalonsBeautyPage() {
  return (
    <>
      <IndustrySchema
        locale="en"
        path="/industries/salons-beauty"
        name="Digital Marketing for Salons & Beauty"
        description="Booking integrations, social content, local SEO, websites, and paid campaigns for salons, spas, studios, and beauty businesses in the GCC."
        audience="Salons & Beauty"
        crumb="Salons & Beauty"
      />
      <PageHero
        eyebrow="Salons & Beauty"
        title={
          <>
            Turn digital discovery into{' '}
            <span className="text-teal">confident bookings.</span>
          </>
        }
        description="Create a consistent journey across social media, local search, your website, and booking tools so clients can choose and schedule with confidence."
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

      {/* Client journey priorities */}
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

      {/* Services */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="What we do for salons & beauty"
          title="Connect discovery, booking, and rebooking"
          description="Present your work consistently, reduce booking friction, and support an ongoing client relationship."
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
        heading="Want a smoother path from discovery to booking?"
        body="Share your website and priorities. We will review the current experience and identify practical opportunities to improve it."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
