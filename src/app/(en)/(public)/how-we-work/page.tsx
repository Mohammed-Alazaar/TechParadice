import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Faq } from '@/components/sections/Faq'
import { buildMetadata } from '@/lib/seo'
import { ldJson } from '@/lib/utils'

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: 'How We Work',
  description:
    'See how TechParadice scopes, delivers, and supports digital projects, from the first review to ongoing improvement.',
  path: '/how-we-work',
})

const steps = [
  {
    n: '01',
    title: 'Initial review',
    description:
      'We review your current website, SEO, competitors, goals, and constraints to identify the right starting point.',
  },
  {
    n: '02',
    title: 'Scope and proposal',
    description:
      'We recommend a practical scope with defined deliverables, responsibilities, fees, and an indicative timeline.',
  },
  {
    n: '03',
    title: 'Delivery and launch',
    description:
      'The team works through agreed milestones, shares regular updates, and gives you review points before launch.',
  },
  {
    n: '04',
    title: 'Measure and improve',
    description:
      'After launch, we can monitor performance, prioritise improvements, and continue through an agreed support or retainer plan.',
  },
]

const engagementModels = [
  {
    title: 'Project',
    description:
      'A defined scope, set of milestones, and agreed fee for work such as a website, product launch, or campaign.',
  },
  {
    title: 'Retainer',
    description:
      'Ongoing access to the team through a monthly scope, shared priorities, regular reporting, and planned review points.',
  },
]

const stats = [
  { value: 'Written', label: 'scope, responsibilities, and fees' },
  { value: 'Regular', label: 'progress updates and review points' },
  { value: 'Agreed', label: 'change process before extra work begins' },
]

const faqs = [
  {
    q: 'What does the free audit actually include?',
    a: "A focused review of your site's Core Web Vitals, technical SEO health, competitor positioning, and priority improvements. We aim to deliver a written summary within two business days.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timing depends on scope, content readiness, integrations, and review cycles. A focused website may take 4–8 weeks, while broader brand, website, and SEO engagements may take 8–12 weeks. Your proposal will include an indicative schedule.',
  },
  {
    q: 'Do you work with small budgets?',
    a: 'We can often adjust the scope, sequence, or delivery model to fit a defined budget. Share your ceiling and priorities, and we will tell you what is realistic before you commit.',
  },
  {
    q: 'Can I pause or cancel a retainer?',
    a: "Yes, with 30 days' written notice unless your agreement states otherwise. We use the notice period to close or hand over active work and confirm any remaining commitments.",
  },
  {
    q: 'Do you work outside the GCC?',
    a: 'Yes. We work remotely with clients in the GCC and other international markets, with meeting times agreed around the project team.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function HowWeWorkPage() {
  return (
    <>
      {faqs.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(faqJsonLd) }}
        />
      ) : null}
      <PageHero
        eyebrow="How We Work"
        title={
          <>
            Clear from the outset,
            <span className="text-teal"> accountable throughout.</span>
          </>
        }
        description="Understand how we define the work, manage decisions, communicate progress, and support your team after launch."
      />

      {/* 4-step process */}
      <Section tone="void" className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative overflow-hidden rounded-2xl border border-border-dark bg-surface p-8 transition-all"
            >
              <span className="font-display text-[64px] font-extrabold leading-none text-teal/20">
                {step.n}
              </span>
              <h2 className="mt-4 font-display text-h3 font-semibold text-white">
                {step.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Engagement Models"
            title="Choose the model that fits the work."
            description="Use a defined project for a specific outcome, or a retainer when you need ongoing capacity and continuous improvement."
          />
          <div className="flex flex-col gap-6">
            {engagementModels.map((model) => (
              <div
                key={model.title}
                className="rounded-2xl border border-border-light bg-white p-8 dark:border-border-dark dark:bg-void"
              >
                <h3 className="font-display text-h3 font-semibold text-void dark:text-white">
                  {model.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-void/70 dark:text-white/70">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing philosophy */}
      <Section tone="void">
        <div className="max-w-3xl">
          <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-teal">
            Pricing
          </p>
          <h2 className="heading-h2 text-balance text-void dark:text-white">
            Scope-first, with transparent fees.
          </h2>
          <p className="mt-6 text-body-lg text-void/70 dark:text-white/70">
            You share the goal, priorities, constraints, and budget range. We then recommend the
            most useful scope within those limits. Deliverables, assumptions, fees, and the change
            process are documented before work starts.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[40px] font-extrabold leading-none text-teal">
                {stat.value}
              </p>
              <p className="mt-2 text-[15px] text-void/70 dark:text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        heading="Ready to identify the right next step?"
        body="Send us your website and goals. We will review the current position and share a focused set of priorities."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/about"
        secondaryLabel="About us"
      />
    </>
  )
}
