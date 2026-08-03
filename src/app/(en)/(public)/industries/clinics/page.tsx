import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'
import { IndustrySchema } from '@/components/seo/PageSchema'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Clinics & Healthcare',
  description:
    'Appointment journeys, local SEO, clear patient information, reputation support, and campaigns for clinics and healthcare providers.',
  path: '/industries/clinics',
})

const services = [
  { title: 'Online Booking Systems', detail: 'Mobile-friendly booking journeys with optional email and SMS confirmations or reminders.' },
  { title: 'Local & Medical SEO', detail: 'Accurate local listings, technical SEO, and useful service content aligned with patient searches.' },
  { title: 'Social Media Management', detail: 'Responsible content planning and publishing support for education, updates, and clinic news.' },
  { title: 'Reputation Support', detail: 'Review-request workflows and response guidance designed to support informed patient decisions.' },
  { title: 'Website Development', detail: 'Fast, accessible clinic websites with clear services, practitioner details, locations, and next steps.' },
  { title: 'Paid Campaigns', detail: 'Geographically focused Meta and Google campaigns aligned with your services and advertising requirements.' },
]

const priorities = [
  { value: 'Find', label: 'accurate local and service information' },
  { value: 'Trust', label: 'clear credentials, guidance, and expectations' },
  { value: 'Book', label: 'accessible appointment and contact journeys' },
]

export default function ClinicsPage() {
  return (
    <>
      <IndustrySchema
        locale="en"
        path="/industries/clinics"
        name="Digital Marketing for Clinics & Healthcare"
        description="Appointment journeys, local SEO, clear patient information, reputation support, and campaigns for clinics and healthcare providers."
        audience="Clinics & Healthcare"
        crumb="Clinics & Healthcare"
      />
      <PageHero
        eyebrow="Clinics & Healthcare"
        title={
          <>
            Help patients find the right information{' '}
            <span className="text-teal">and next step.</span>
          </>
        }
        description="Bring services, practitioner information, local visibility, reputation, and booking into a clear, accessible patient journey."
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

      {/* Results strip */}
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
          eyebrow="What we do for clinics"
          title="Support an informed patient journey"
          description="Make important information easy to find and understand, then provide a clear route to booking or contact."
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
        heading="Want a clearer digital patient journey?"
        body="Share your clinic website and priorities. We will review the experience and highlight practical opportunities to improve it."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
