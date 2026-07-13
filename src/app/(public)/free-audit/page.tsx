import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Clock, Mail, Zap } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { BRAND } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Free Digital Audit',
  description:
    'Get a no-cost audit of your website, SEO, and digital presence. Actionable findings, no upsell.',
  path: '/free-audit',
})

const auditItems = [
  'Core Web Vitals & page speed analysis',
  'Technical SEO crawl (indexing, schema, internal links)',
  'Competitor positioning snapshot',
  'Conversion funnel review',
  'Quick-win priority list (3–5 items you can act on this week)',
]

const steps = [
  {
    n: '01',
    title: 'Fill the form',
    detail: 'Share your URL and what you want to improve. Takes two minutes.',
  },
  {
    n: '02',
    title: 'We run the audit',
    detail: 'Our team reviews your site within 48 hours and prepares a focused report.',
  },
  {
    n: '03',
    title: 'You get the findings',
    detail: 'A clear PDF with prioritised actions — no jargon, no pitch deck.',
  },
]

export default function FreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Audit"
        title={
          <>
            Know exactly what&apos;s holding{' '}
            <span className="text-teal">your site back.</span>
          </>
        }
        description="We'll audit your digital presence and hand you a prioritised action list — free, no strings attached."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="#audit-form"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            <Zap size={16} />
            Request my free audit
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            See our work first
          </Link>
        </div>
      </PageHero>

      {/* What's included */}
      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">What you get</p>
            <h2 className="mt-4 heading-h2 text-white">
              A real audit, not a sales pitch.
            </h2>
            <p className="mt-4 text-body-lg text-white/70">
              Most agencies use "free audits" as a hook for a canned deck. Ours is an actual
              technical review of your site, delivered by the same team that would build for you.
            </p>
            <ul className="mt-8 space-y-3">
              {auditItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                    <Check size={14} />
                  </span>
                  <span className="text-[15px] text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex gap-5 rounded-xl border border-border-dark bg-surface p-6"
              >
                <span className="font-display text-[28px] font-extrabold leading-none text-teal/30">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-h4 font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-[14px] text-white/60">{s.detail}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-xl border border-teal/20 bg-teal/5 p-5">
              <Clock size={18} className="shrink-0 text-teal" />
              <p className="text-[14px] text-white/70">
                Turnaround: <span className="font-semibold text-white">within 48 hours</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Form */}
      <Section tone="surface" id="audit-form">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Request your audit"
            title="Tell us where you want to grow"
            description="Drop your URL and the challenge you're facing. We'll handle the rest."
          />
          <div className="mt-10 rounded-2xl border border-border-dark bg-void p-6 sm:p-8">
            <ContactForm />
          </div>
          <p className="mt-6 text-center text-[13px] text-muted">
            Prefer email?{' '}
            <Link href={`mailto:${BRAND.email}`} className="text-teal hover:underline">
              {BRAND.email}
            </Link>
            {' '}— we reply within 24 hours.
          </p>
        </div>
      </Section>

      {/* Social proof strip */}
      <Section tone="void">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { value: '+38%', label: 'avg. conversion uplift after audit' },
            { value: '48h', label: 'turnaround on every audit' },
            { value: '100%', label: 'free — no card, no obligation' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border-dark bg-surface p-8 text-center"
            >
              <p className="font-display text-[48px] font-extrabold leading-none text-teal">
                {stat.value}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[1.5px] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
