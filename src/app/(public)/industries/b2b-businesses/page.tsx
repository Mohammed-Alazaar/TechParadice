import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital for B2B Businesses',
  description:
    'Lead generation, account-based marketing, AI-assisted outreach, and analytics dashboards that tie directly to pipeline for B2B companies.',
  path: '/industries/b2b-businesses',
})

const services = [
  { title: 'Lead Generation Systems', detail: 'Inbound funnels, gated content, and outbound sequences that fill your pipeline.' },
  { title: 'Account-Based Marketing', detail: 'Personalised landing pages and campaigns targeting specific accounts and roles.' },
  { title: 'AI Assistants', detail: 'Qualification bots that score and route inbound leads before your team touches them.' },
  { title: 'Website Development', detail: 'Authority sites with ROI calculators, case studies, and demo booking flows.' },
  { title: 'SEO & Content', detail: 'Thought leadership content and technical SEO targeting buying intent keywords.' },
  { title: 'Analytics & Pipeline Dashboards', detail: 'Attribution reporting that connects marketing spend to closed revenue.' },
]

const results = [
  { value: '+112%', label: 'avg. organic traffic increase' },
  { value: '–28%', label: 'avg. cost per acquisition' },
  { value: '3.2x', label: 'blended ROAS achieved' },
]

export default function B2BBusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="B2B Businesses"
        title={
          <>
            Pipeline, not{' '}
            <span className="text-teal">vanity metrics.</span>
          </>
        }
        description="B2B buyers take time. We build systems — content, SEO, outreach, and automation — that work across long sales cycles and come with clear attribution."
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
          eyebrow="What we do for B2B companies"
          title="From first click to closed deal"
          description="We build the systems that make your marketing attributable to revenue, not just traffic."
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
        heading="Ready to build a pipeline that doesn't rely on referrals?"
        body="Share your growth targets and we'll audit your current setup — free, with a clear action plan."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
