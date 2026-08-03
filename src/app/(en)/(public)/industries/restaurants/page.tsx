import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'
import { IndustrySchema } from '@/components/seo/PageSchema'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Restaurants',
  description:
    'Mobile-friendly menus, reservation journeys, local SEO, social media, and paid campaigns for restaurants in the GCC.',
  path: '/industries/restaurants',
})

const services = [
  { title: 'Online Menus & Ordering', detail: 'Fast, mobile-friendly menus with optional ordering and delivery integrations.' },
  { title: 'Local SEO', detail: 'Google Business Profile improvements, accurate listings, and locally relevant search content.' },
  { title: 'Social Media Management', detail: 'Content planning, creative direction, publishing support, and community guidelines.' },
  { title: 'Reservation Journeys', detail: 'Integrated booking tools with clear availability, confirmations, and reminder options.' },
  { title: 'Paid Campaigns', detail: 'Meta and Google campaigns structured around location, intent, timing, and measurable actions.' },
  { title: 'Website Development', detail: 'Fast, accessible websites that make menus, locations, hours, and reservations easy to use.' },
]

const priorities = [
  { value: 'Find', label: 'accurate information in search and maps' },
  { value: 'Choose', label: 'clear menus, locations, and guest information' },
  { value: 'Book', label: 'simple reservation and ordering journeys' },
]

export default function RestaurantsPage() {
  return (
    <>
      <IndustrySchema
        locale="en"
        path="/industries/restaurants"
        name="Digital Marketing for Restaurants"
        description="Mobile-friendly menus, reservation journeys, local SEO, social media, and paid campaigns for restaurants in the GCC."
        audience="Restaurants"
        crumb="Restaurants"
      />
      <PageHero
        eyebrow="Restaurants"
        title={
          <>
            Turn local discovery into{' '}
            <span className="text-teal">reservations and orders.</span>
          </>
        }
        description="Bring your menu, location details, reservations, content, and campaigns into one clear digital journey for guests."
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

      {/* Customer journey priorities */}
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
          eyebrow="What we do for restaurants"
          title="Support the journey from search to table"
          description="Make it easy for guests to find you, confirm the details that matter, and reserve or order from any device."
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
        heading="Want a clearer path from discovery to booking?"
        body="Share your restaurant website and goals. We will review the current journey and prioritise practical improvements."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
