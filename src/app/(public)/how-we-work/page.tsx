import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Faq } from '@/components/sections/Faq'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: 'How We Work',
  description:
    'Our process, engagement models, and pricing philosophy — transparent from day one.',
  path: '/how-we-work',
})

const steps = [
  {
    n: '01',
    title: 'Free Audit',
    description:
      'We analyse your current site, SEO, and competitors. You get findings — no strings attached.',
  },
  {
    n: '02',
    title: 'Proposal',
    description:
      'We scope the work that matches your goals and budget. Fixed price, defined deliverables, clear timeline.',
  },
  {
    n: '03',
    title: 'Build & Launch',
    description:
      'Senior-only execution. You get weekly updates, a staging review, and you approve before we ship.',
  },
  {
    n: '04',
    title: 'Grow & Iterate',
    description:
      'Post-launch, we track, report, and optimise. Retainer clients get monthly strategy calls and a shared backlog.',
  },
]

const engagementModels = [
  {
    title: 'Project',
    description:
      'One fixed scope. One invoice. One deadline. Perfect for a new site, a product launch, or a specific campaign.',
  },
  {
    title: 'Retainer',
    description:
      'An ongoing relationship. Monthly scope, monthly reporting, shared backlog, and a team that knows your business.',
  },
]

const stats = [
  { value: '0', label: 'hidden fees' },
  { value: '100%', label: 'scope-matched invoices' },
  { value: '24h', label: 'response SLA' },
]

const faqs = [
  {
    q: 'What does the free audit actually include?',
    a: "A review of your site's Core Web Vitals, technical SEO health, competitor snapshot, and top 3 quick-win recommendations. Delivered within 48 hours as a written summary.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'A website: 4–8 weeks. A full brand + site + SEO: 8–12 weeks. Retainer engagements are open-ended. We give timeline estimates in every proposal.',
  },
  {
    q: 'Do you work with small budgets?',
    a: 'Yes. We have projects from $500 upward. The constraint shapes the scope, not the quality. Senior execution, right-sized deliverables.',
  },
  {
    q: 'Can I pause or cancel a retainer?',
    a: "Yes, with 30 days' written notice. We don't lock you in. We'd rather earn the relationship month to month.",
  },
  {
    q: 'Do you work outside the GCC?',
    a: 'Yes. We work with clients globally. The team is in Ankara; the output is timezone-flexible.',
  },
]

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How We Work"
        title={
          <>
            Transparent by design,
            <span className="text-teal"> results by delivery.</span>
          </>
        }
        description="No retainer surprises, no scope fog. Here's exactly how we work — from first call to ongoing growth."
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
              <h3 className="mt-4 font-display text-h3 font-semibold text-white">
                {step.title}
              </h3>
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
            title="Project or retainer — your call."
            description="We work both ways. Most clients start with a project, then move to a retainer once they see what coordinated execution looks like."
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
            Budget-based. No surprises.
          </h2>
          <p className="mt-6 text-body-lg text-void/70 dark:text-white/70">
            We don&apos;t have a price list. We have a conversation. You share your goal and your
            budget ceiling; we propose the scope that delivers the most value within it. Scope is
            fixed. Timeline is fixed. The invoice matches the proposal.
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
        heading="Ready to start? So are we."
        body="Book the free audit — no commitment, no sales call required. Just send your URL and goals."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/about"
        secondaryLabel="About us"
      />
    </>
  )
}
