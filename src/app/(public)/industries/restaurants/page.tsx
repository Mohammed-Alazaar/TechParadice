import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Restaurants',
  description:
    'Online menus, reservation funnels, local SEO, and social media management built for restaurants that want to fill tables consistently.',
  path: '/industries/restaurants',
})

const services = [
  { title: 'Online Menu & Ordering', detail: 'Fast, mobile-first menus with optional online ordering integration.' },
  { title: 'Local SEO', detail: 'Google Business Profile optimisation and local keyword targeting.' },
  { title: 'Social Media Management', detail: 'Weekly content calendars, food photography direction, and community management.' },
  { title: 'Reservation Funnels', detail: 'Integrated booking widgets with SMS and email confirmation flows.' },
  { title: 'Paid Ads', detail: 'Hyper-local Meta and Google campaigns targeted by radius, time, and occasion.' },
  { title: 'Website Development', detail: 'Lightning-fast sites built to convert hungry visitors into booked tables.' },
]

const results = [
  { value: '3.2x', label: 'avg. reservation uplift' },
  { value: '< 6 wks', label: 'typical time to first results' },
  { value: '4.8★', label: 'avg. Google rating improvement' },
]

export default function RestaurantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Restaurants"
        title={
          <>
            Fill more tables with{' '}
            <span className="text-teal">digital that works.</span>
          </>
        }
        description="From a fast online menu to local SEO that puts you first on Google Maps — we handle the digital so you can focus on the kitchen."
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
          eyebrow="What we do for restaurants"
          title="Every touchpoint covered"
          description="A customer finds you on Google, checks your menu, books a table. We make every step frictionless."
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
        heading="Ready to fill more tables?"
        body="Share your restaurant URL and we'll audit your digital presence — free, no obligation."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
