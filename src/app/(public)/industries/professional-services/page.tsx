import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital for Professional Services Firms',
  description:
    'Authority websites, lead generation, SEO, and content marketing for law firms, accounting practices, consultancies, and other professional services.',
  path: '/industries/professional-services',
})

const services = [
  { title: 'Authority Website Development', detail: 'Polished, fast sites that signal expertise and convert sceptical visitors into enquiries.' },
  { title: 'Thought Leadership Content & SEO', detail: 'Articles, guides, and case studies that rank for your target keywords and build credibility.' },
  { title: 'Google & LinkedIn Ads', detail: 'Precision campaigns that reach decision-makers actively searching for your services.' },
  { title: 'Lead Capture Funnels', detail: 'Gated resources, consultation booking flows, and nurture sequences that capture intent.' },
  { title: 'Reputation Management', detail: 'Review strategy, case study production, and award nomination support.' },
  { title: 'AI-Assisted Intake', detail: 'Smart intake forms and chatbots that qualify leads before they reach your team.' },
]

const results = [
  { value: '+89%', label: 'organic traffic increase' },
  { value: '–34%', label: 'cost per qualified lead' },
  { value: '6 wks', label: 'typical time to launch' },
]

export default function ProfessionalServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Professional Services"
        title={
          <>
            Win clients with{' '}
            <span className="text-teal">digital authority.</span>
          </>
        }
        description="Professional services clients buy expertise before they buy services. We build the digital presence that makes your authority undeniable."
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
          eyebrow="What we do for professional services"
          title="From first click to signed retainer"
          description="We map the full client acquisition journey — search, site, intake, and nurture — and optimise every step."
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
        heading="Ready to build a client pipeline on autopilot?"
        body="Tell us your goals — we'll audit your current digital presence and identify your quickest wins."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
