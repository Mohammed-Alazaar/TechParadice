import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Law Firms',
  description:
    'Authority websites, legal content SEO, Google Ads, intake automation, and client acquisition funnels for law firms and legal practices in the GCC.',
  path: '/industries/law-firms',
})

const services = [
  { title: 'Authority Legal Website', detail: 'Professional, trust-first sites that position your firm as the credible choice before a prospect even calls.' },
  { title: 'Legal Content & SEO', detail: 'Practice-area pages, FAQ content, and technical SEO that ranks for the searches your ideal clients make.' },
  { title: 'Google Search Ads', detail: 'High-intent campaigns targeting people actively searching for your practice areas in your city.' },
  { title: 'Intake Automation', detail: 'Automated follow-up sequences that nurture enquiries into booked consultations while you focus on cases.' },
  { title: 'Client Testimonial System', detail: 'Structured review collection across Google and legal directories to build social proof at scale.' },
  { title: 'Analytics & Attribution', detail: 'Full-funnel reporting that shows which channels bring signed clients, not just clicks.' },
]

const results = [
  { value: '3.1x', label: 'avg. consultation uplift' },
  { value: '–29%', label: 'cost per intake' },
  { value: '8 wks', label: 'typical full launch' },
]

export default function LawFirmsPage() {
  return (
    <>
      <PageHero
        eyebrow="Law Firms"
        title={
          <>
            Turn searches into{' '}
            <span className="text-teal">signed clients.</span>
          </>
        }
        description="Legal clients search for trust before they search for price. We build the authority sites, SEO, and intake flows that turn those searches into consultations."
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
          eyebrow="What we do for law firms"
          title="From search to signed retainer"
          description="Every step of the client acquisition journey, optimised for trust and conversion."
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
        heading="Ready to grow your practice online?"
        body="Share your firm's URL and goals — we'll audit your digital presence for free."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
