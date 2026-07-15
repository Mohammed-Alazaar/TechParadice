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
    'Local SEO, search campaigns, reputation support, websites, and booking journeys for garages and automotive service centres in the GCC.',
  path: '/industries/auto-repair',
})

const services = [
  { title: 'Local SEO & Maps', detail: 'Google Business Profile improvements, accurate listings, and locally relevant service content.' },
  { title: 'Google Search Campaigns', detail: 'Campaigns organised around service type, location, search intent, and trackable calls or enquiries.' },
  { title: 'Reputation Support', detail: 'Post-service review requests and response guidance that help customers assess your business.' },
  { title: 'Online Booking & Quotes', detail: 'Practical booking and estimate-request forms that collect the details your team needs.' },
  { title: 'Website Development', detail: 'Fast, mobile-friendly sites with prominent service, location, call, and booking information.' },
  { title: 'Social Media', detail: 'Service examples, maintenance guidance, workshop updates, and promotions organised into a useful content plan.' },
]

const priorities = [
  { value: 'Find', label: 'accurate local visibility for relevant services' },
  { value: 'Choose', label: 'clear evidence, reviews, and workshop details' },
  { value: 'Book', label: 'simple call, quote, and appointment options' },
]

export default function AutoRepairPage() {
  return (
    <>
      <PageHero
        eyebrow="Auto Repair"
        title={
          <>
            Make it easier for local drivers to{' '}
            <span className="text-teal">find and contact your workshop.</span>
          </>
        }
        description="Bring your local search presence, service information, reviews, campaigns, and booking options into one clear customer journey."
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
          eyebrow="What we do for auto repair shops"
          title="Support the journey from search to service"
          description="Give drivers the information and contact options they need while helping your team capture useful booking details."
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
        heading="Want to improve your local customer journey?"
        body="Share your workshop website and priorities. We will review your digital presence and identify practical improvements."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
