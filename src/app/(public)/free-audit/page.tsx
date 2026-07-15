import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Clock, Mail, Zap } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { BRAND } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Free Website & SEO Audit',
  description:
    'Request a focused review of your website, technical SEO, user journey, and competitive positioning, with prioritised recommendations.',
  path: '/free-audit',
})

const auditItems = [
  'Core Web Vitals and page-speed review',
  'Technical SEO review, including indexing, schema, and internal links',
  'Competitor positioning snapshot',
  'Key conversion-path review',
  'A prioritised list of practical improvements',
]

const steps = [
  {
    n: '01',
    title: 'Send your request',
    detail: 'Paste your website link into the message and tell us what you want to improve.',
  },
  {
    n: '02',
    title: 'We review the site',
    detail: 'We examine the priority areas and prepare a concise, focused assessment.',
  },
  {
    n: '03',
    title: 'Receive the findings',
    detail: 'You receive a clear summary with prioritised recommendations and suggested next steps.',
  },
]

export default function FreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Audit"
        title={
          <>
            Find the clearest opportunities to{' '}
            <span className="text-teal">improve your website.</span>
          </>
        }
        description="We will review your website and SEO, then share a prioritised action list at no cost and without an obligation to hire us."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="#audit-form"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            <Zap size={16} />
            Request a free audit
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            Review our work
          </Link>
        </div>
      </PageHero>

      {/* What's included */}
      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">What you get</p>
            <h2 className="mt-4 heading-h2 text-white">
              A focused review you can act on.
            </h2>
            <p className="mt-4 text-body-lg text-white/70">
              We assess the parts of your digital presence that matter most to
              visibility, usability, and conversion, then organise the findings
              by likely impact and effort.
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
                Target turnaround: <span className="font-semibold text-white">two business days</span>
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
            title="Tell us what you want to improve"
            description="Paste your website link into the message and describe the challenge you are facing. We will use that context to focus the review."
          />
          <div className="mt-10 rounded-2xl border border-border-dark bg-void p-6 sm:p-8">
            <ContactForm />
          </div>
          <p className="mt-6 text-center text-[13px] text-muted">
            Prefer email?{' '}
            <Link href={`mailto:${BRAND.email}`} className="text-teal hover:underline">
              {BRAND.email}
            </Link>
            {' '}— we usually reply within one business day.
          </p>
        </div>
      </Section>

      {/* Social proof strip */}
      <Section tone="void">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { value: 'Focused', label: 'review based on your stated goals' },
            { value: '2 days', label: 'target business-day turnaround' },
            { value: 'No cost', label: 'no payment or engagement required' },
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
