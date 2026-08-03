import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Review typical TechParadice budget ranges and learn how we define scope, fees, milestones, and invoicing before work begins.',
  path: '/pricing',
})

const ranges = [
  {
    tier: 'Starter',
    price: '$0 – $500',
    body: 'No-cost audits, small fixes, focused content updates, or clearly defined design tasks.',
  },
  {
    tier: 'Basic',
    price: '$500 – $1,000',
    body: 'Focused marketing pages, targeted design improvements, or small feature additions.',
  },
  {
    tier: 'Standard',
    price: '$1,000 – $2,000',
    body: 'Campaign websites, essential brand packages, or a defined set of website or application features.',
  },
  {
    tier: 'Growth',
    price: '$2,000 – $5,000',
    body: 'Multi-page websites, product-launch support, focused retainers, or validated product prototypes.',
  },
  {
    tier: 'Scale',
    price: 'Above $5,000',
    body: 'Complex digital products, multilingual platforms, or coordinated programmes spanning content, campaigns, and analytics.',
  },
]

const steps = [
  { n: '01', t: 'Share the context', b: 'Tell us your goals, priorities, constraints, timing, and budget range.' },
  { n: '02', t: 'Review the proposed scope', b: 'We document the deliverables, sequence, responsibilities, assumptions, and team.' },
  { n: '03', t: 'Approve the quote', b: 'Fees, milestones, invoicing, and the change process are agreed before work starts.' },
]

const pricingFaqs = [
  {
    q: 'Why don’t you publish fixed package prices?',
    a: 'The effort depends on content, integrations, review cycles, technical constraints, and the level of support required. The ranges above help with planning; your proposal reflects the actual scope.',
  },
  {
    q: 'How do you invoice?',
    a: 'Project work is usually invoiced by milestone, often beginning with 30% at kickoff and staged payments against agreed deliverables. Retainers are normally billed monthly. Your proposal confirms the exact schedule.',
  },
  {
    q: 'Can I reduce budget mid-project?',
    a: 'We can review the remaining scope and agree which deliverables, features, or phases should change. Any effect on timing, fees, or dependencies is documented before the revised plan proceeds.',
  },
  {
    q: 'Do you offer equity or performance deals?',
    a: 'Our standard engagements are fee-based. Alternative commercial arrangements are considered selectively and only when expectations, measurement, and risk are clear to both parties.',
  },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            A clear scope for your{' '}
            <span className="text-teal">goals and budget.</span>
          </>
        }
        description="Use the ranges below for initial planning. We confirm deliverables, assumptions, fees, and milestones in a written proposal before work begins."
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
          description="These figures are planning guides, not fixed packages. Your quote will reflect the agreed scope and delivery requirements."
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
            description="Share enough context for us to assess fit and identify the next questions. We aim to reply within one business day."
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
