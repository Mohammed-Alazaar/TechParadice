import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Auto Repair Shops',
  description:
    'Local SEO, Google Ads, review management, and booking systems for auto repair shops, garages, and automotive service centres in the GCC.',
  path: '/industries/auto-repair',
})

const services = [
  { title: 'Local SEO & Maps Optimisation', detail: 'Google Business Profile optimisation and local keyword targeting that puts your garage at the top of Maps results.' },
  { title: 'Google Search Ads', detail: 'High-intent campaigns capturing drivers searching for repairs right now, in your area.' },
  { title: 'Review Management', detail: 'Automated post-service review requests that build your star rating and build trust with new customers.' },
  { title: 'Online Booking & Quotes', detail: 'Self-serve booking and instant quote forms that convert website visitors into confirmed appointments.' },
  { title: 'Website Development', detail: 'Fast, mobile-first sites with click-to-call and booking integration built for customers in urgent need.' },
  { title: 'Social Media', detail: 'Before/after content, tips, and promotions that keep your shop top-of-mind between services.' },
]

const results = [
  { value: '4.1x', label: 'avg. call volume increase' },
  { value: '< 6 wks', label: 'time to top 3 Google' },
  { value: '–22%', label: 'cost per booked job' },
]

export default function AutoRepairPage() {
  return (
    <>
      <PageHero
        eyebrow="Auto Repair"
        title={
          <>
            Get found when{' '}
            <span className="text-teal">someone needs you most.</span>
          </>
        }
        description="Car trouble is urgent. When someone searches 'garage near me', your business needs to be first. We handle the local SEO, paid ads, and booking that makes that happen."
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

      {/* Results strip */}
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

      {/* Services */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="What we do for auto repair shops"
          title="From first search to booked in"
          description="We cover every step between 'my car broke down' and your bay being booked."
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
        heading="Ready to get more cars through your door?"
        body="Share your garage URL — we'll audit your local digital presence for free."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
