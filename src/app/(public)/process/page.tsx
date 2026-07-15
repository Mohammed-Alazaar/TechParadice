import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Our Process',
  description:
    'See how TechParadice moves from discovery and strategy through design, development, quality assurance, launch, and ongoing improvement.',
  path: '/process',
})

const phases = [
  {
    n: '01',
    name: 'Discovery',
    what: 'We review the current position, speak with key stakeholders, and agree on the business goals, audience needs, constraints, and evidence available.',
    deliverables: ['Agreed goals', 'Success measures', 'Project brief'],
    timeline: 'Typically week 1',
    who: 'Founder and strategy lead',
  },
  {
    n: '02',
    name: 'Strategy',
    what: 'We turn the agreed goals into a practical scope, delivery sequence, measurement plan, team structure, and set of priorities.',
    deliverables: ['Scope of work', 'Milestone plan', 'Risks and assumptions'],
    timeline: 'Typically weeks 1–2',
    who: 'Founder and project lead',
  },
  {
    n: '03',
    name: 'Design',
    what: 'We shape the information, journeys, interface, and visual direction, with planned reviews before detailed design is approved.',
    deliverables: ['Wireframes', 'Prototypes', 'Design system'],
    timeline: 'Often weeks 2–5',
    who: 'Design team and project lead',
  },
  {
    n: '04',
    name: 'Build',
    what: 'We develop the approved experience in reviewable increments, share progress in a staging environment, and resolve questions as they arise.',
    deliverables: ['Staging environment', 'Progress reviews', 'Tested components'],
    timeline: 'Often weeks 4–10',
    who: 'Engineering, QA, and project lead',
  },
  {
    n: '05',
    name: 'Quality assurance',
    what: 'We review accessibility, content, responsive behaviour, browser compatibility, analytics, integrations, and performance before release.',
    deliverables: ['Accessibility review', 'Performance report', 'Prioritised issue log'],
    timeline: 'Before launch',
    who: 'QA and engineering',
  },
  {
    n: '06',
    name: 'Launch',
    what: 'After final approval, we complete the release plan, verify analytics and critical journeys, and provide the agreed documentation.',
    deliverables: ['Production release', 'Analytics verification', 'Handover guide'],
    timeline: 'On the agreed release date',
    who: 'Founder and engineering team',
  },
  {
    n: '07',
    name: 'Improvement',
    what: 'Where ongoing support is included, we review performance, gather evidence, and prioritise the next improvements with your team.',
    deliverables: ['Performance review', 'Updated priorities', 'Optimisation work'],
    timeline: 'Ongoing',
    who: 'Agreed delivery team',
  },
]

const processFaqs = [
  {
    q: 'How long is a typical engagement?',
    a: 'A small, focused scope may take 4–6 weeks, a mid-sized website 8–12 weeks, and a complex application 12–20 weeks or more. Content readiness, integrations, feedback cycles, and dependencies all affect timing, so your proposal includes a project-specific schedule.',
  },
  {
    q: 'How often do we meet?',
    a: 'Weekly progress meetings are common, with additional reviews at key milestones. We agree the cadence and communication channel during kickoff so it fits the team and scope.',
  },
  {
    q: 'What tools do we use together?',
    a: 'We commonly use Figma for design, Linear or Notion for work tracking, GitHub for code, and Slack or another agreed channel for communication. We can adapt when your organisation has established tools or security requirements.',
  },
  {
    q: 'Can you work with our in-house team?',
    a: 'Yes. We can work alongside internal engineering, design, marketing, content, and operational teams, with responsibilities and decision ownership defined at the start.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={
          <>
            A clear path from{' '}
            <span className="text-teal">brief to measurable progress.</span>
          </>
        }
        description="A seven-phase framework that makes decisions, responsibilities, review points, and progress visible throughout the engagement."
      />

      <Section tone="void" className="pt-0">
        <ol className="space-y-6">
          {phases.map((p) => (
            <li
              key={p.n}
              className="relative grid gap-8 rounded-2xl border border-border-dark bg-surface p-8 lg:grid-cols-[auto_1fr_1fr]"
            >
              <div>
                <span className="font-display text-[48px] font-extrabold text-teal">
                  {p.n}
                </span>
                <h3 className="mt-1 font-display text-h3 font-semibold text-white">
                  {p.name}
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-white/75">
                {p.what}
              </p>
              <dl className="grid grid-cols-1 gap-4 text-[13px] sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <dt className="text-caption uppercase text-muted">
                    Deliverables
                  </dt>
                  <dd className="mt-1 text-white/70">{p.deliverables.join(' · ')}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase text-muted">Timeline</dt>
                  <dd className="mt-1 text-white/70">{p.timeline}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase text-muted">Who</dt>
                  <dd className="mt-1 text-white/70">{p.who}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="About the process" />
          <Faq items={processFaqs} />
        </div>
      </Section>

      <CtaBanner
        heading="Have a project to plan?"
        body="Share your goals, constraints, and current setup. We will help you identify the right scope and starting point."
        ctaHref="/contact"
        ctaLabel="Discuss your project"
      />
    </>
  )
}
