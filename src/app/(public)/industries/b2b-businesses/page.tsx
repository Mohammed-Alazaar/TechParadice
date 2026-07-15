import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Strategy for B2B Businesses',
  description:
    'B2B websites, lead-generation journeys, account-focused campaigns, responsible automation, SEO, and pipeline analytics.',
  path: '/industries/b2b-businesses',
})

const services = [
  { title: 'Lead-Generation Systems', detail: 'Inbound journeys, useful resources, forms, and nurture sequences aligned with your sales process.' },
  { title: 'Account-Based Marketing', detail: 'Focused landing pages, content, and campaigns for priority accounts and decision-making roles.' },
  { title: 'AI Assistants', detail: 'Carefully scoped tools that can capture context, answer approved questions, and route enquiries.' },
  { title: 'Website Development', detail: 'Credible B2B websites with case studies, useful tools, and clear demo or consultation journeys.' },
  { title: 'SEO & Content', detail: 'Technical SEO and expert content organised around real research and buying questions.' },
  { title: 'Analytics & Pipeline Dashboards', detail: 'Reporting that combines available marketing and CRM data to support pipeline decisions.' },
]

const priorities = [
  { value: 'Attract', label: 'relevant audiences around defined needs' },
  { value: 'Qualify', label: 'enquiries with useful context for sales' },
  { value: 'Measure', label: 'marketing activity alongside pipeline data' },
]

export default function B2BBusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="B2B Businesses"
        title={
          <>
            Build a clearer route from{' '}
            <span className="text-teal">interest to opportunity.</span>
          </>
        }
        description="Align your website, content, campaigns, automation, and reporting with a longer, multi-stakeholder buying journey."
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
          eyebrow="What we do for B2B companies"
          title="Connect marketing activity with sales priorities"
          description="Design useful journeys for buyers while giving your team better context for qualification, follow-up, and measurement."
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
        heading="Want a more consistent B2B growth system?"
        body="Share your goals, sales process, and current digital setup. We will identify practical ways to strengthen the journey."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
