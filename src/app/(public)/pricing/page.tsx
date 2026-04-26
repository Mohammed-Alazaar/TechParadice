import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Budget-based pricing. Share your goals, we scope the path. Transparent quotes, no rigid tiers.',
  path: '/pricing',
})

const ranges = [
  {
    tier: 'Starter',
    price: '$0 – $500',
    body: 'Simple landing pages, small fixes, one-off content updates, or basic design tasks.',
  },
  {
    tier: 'Basic',
    price: '$500 – $1,000',
    body: 'Small marketing pages, minor redesigns, or focused feature additions.',
  },
  {
    tier: 'Standard',
    price: '$1,000 – $2,000',
    body: 'Full landing sites, campaign builds, branding packages, or small web apps.',
  },
  {
    tier: 'Growth',
    price: '$2,000 – $5,000',
    body: 'Multi-page sites, product launches, ongoing retainers, or MVP mobile builds.',
  },
  {
    tier: 'Scale',
    price: 'Above $5,000',
    body: 'Complex product work, multi-surface launches, full-funnel programs with paid + content + analytics.',
  },
]

const steps = [
  { n: '01', t: 'You share your goals', b: 'Timeline, budget range, outcomes you’re after.' },
  { n: '02', t: 'We propose a scope', b: 'Scope, sequence, team, and fees — in writing.' },
  { n: '03', t: 'Transparent quote', b: 'Milestone-based invoicing. No hidden percentages.' },
]

const pricingFaqs = [
  {
    q: 'Why don’t you publish fixed package prices?',
    a: 'Because no two engagements are the same. A fixed package forces you to buy scope you don’t need or skip scope you do. Budget-based pricing is faster and more honest.',
  },
  {
    q: 'How do you invoice?',
    a: 'Milestones. Typically 30% on kickoff, then staged payments against deliverables. Retainers are billed monthly.',
  },
  {
    q: 'Can I reduce budget mid-project?',
    a: 'Yes. We re-scope collaboratively. Transparent trade-offs, not surprise change orders.',
  },
  {
    q: 'Do you offer equity or performance deals?',
    a: 'Rarely, and only for a handful of partners each year. Default is cash-based.',
  },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Pricing tailored to your{' '}
            <span className="text-teal">goals and budget.</span>
          </>
        }
        description="No rigid tiers. We propose scope that fits your target and deliver transparently against it."
      />

      <Section tone="void" className="pt-0">
        <ol className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-border-light bg-neutral-50 p-8 dark:border-border-dark dark:bg-surface"
            >
              <span className="font-display text-[40px] font-extrabold text-teal">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-h4 font-semibold text-void dark:text-white">
                {s.t}
              </h3>
              <p className="mt-2 text-[15px] text-void/70 dark:text-white/70">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="For reference"
          title="Typical budget ranges"
          description="Ballpark figures to help you plan. Actual quotes reflect your scope — not a template."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {ranges.map((r) => (
            <li
              key={r.tier}
              className="rounded-2xl border border-border-light bg-white p-8 dark:border-border-dark dark:bg-void"
            >
              <p className="text-caption uppercase text-teal">{r.tier}</p>
              <p className="mt-3 font-display text-h2 font-extrabold text-void dark:text-white">
                {r.price}
              </p>
              <p className="mt-3 text-[15px] text-void/70 dark:text-white/70">{r.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            eyebrow="Request a quote"
            title="Tell us about your project"
            description="We read every submission. You’ll hear back within 24 hours with next steps."
          />
          <div className="rounded-2xl border border-border-light bg-neutral-50 p-6 dark:border-border-dark dark:bg-surface sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Pricing questions" />
          <Faq items={pricingFaqs} />
        </div>
      </Section>
    </>
  )
}
