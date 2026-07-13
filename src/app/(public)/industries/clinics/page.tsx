import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Clinics & Healthcare',
  description:
    'Appointment booking systems, local SEO, social media, and patient trust content for medical clinics, dental practices, and healthcare providers.',
  path: '/industries/clinics',
})

const services = [
  { title: 'Online Booking Systems', detail: 'Fast, mobile-first booking flows with SMS and email reminders to cut no-shows.' },
  { title: 'Local & Medical SEO', detail: 'Google Business Profile optimisation and medical keyword targeting to capture nearby patients.' },
  { title: 'Social Media Management', detail: 'Consistent health content, patient stories, and seasonal campaigns across Instagram and Facebook.' },
  { title: 'Review & Reputation Management', detail: 'Automated review requests and professional response management to build lasting patient trust.' },
  { title: 'Website Development', detail: 'Fast-loading clinic websites with clear CTAs designed to convert visitors into booked patients.' },
  { title: 'Paid Ads', detail: 'Hyper-local Meta and Google campaigns that reach patients actively searching for your specialty.' },
]

const results = [
  { value: '2.1x', label: 'avg. appointment increase' },
  { value: '< 4 wks', label: 'first results' },
  { value: '4.9★', label: 'avg. review improvement' },
]

export default function ClinicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clinics & Healthcare"
        title={
          <>
            More appointments,{' '}
            <span className="text-teal">less no-shows.</span>
          </>
        }
        description="From appointment-booking flows to patient reviews and local SEO — we help clinics in the GCC fill their schedule and build lasting trust."
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
          eyebrow="What we do for clinics"
          title="Every stage of the patient journey"
          description="From the first Google search to the follow-up message — we cover every digital touchpoint."
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
        heading="Ready to fill your appointment book?"
        body="Share your clinic URL — we'll audit your digital presence free of charge."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
