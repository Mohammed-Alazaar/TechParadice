import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Our Process',
  description:
    'Discovery, strategy, design, build, QA, launch, growth. The same framework we use on every engagement.',
  path: '/process',
})

const phases = [
  {
    n: '01',
    name: 'Discovery',
    what: 'Stakeholder interviews, audit of existing assets, and alignment on goals and constraints.',
    deliverables: ['Goals doc', 'Success metrics', 'Project brief'],
    timeline: 'Week 1',
    who: 'Founder, lead strategist',
  },
  {
    n: '02',
    name: 'Strategy',
    what: 'We translate goals into a roadmap — scope, sequence, team, and budget against outcomes.',
    deliverables: ['Scope of work', 'Milestones', 'Risk plan'],
    timeline: 'Week 1–2',
    who: 'Founder, PM',
  },
  {
    n: '03',
    name: 'Design',
    what: 'Wireframes and high-fidelity prototypes in Figma — reviewed weekly with the client team.',
    deliverables: ['Wireframes', 'Prototypes', 'Design system'],
    timeline: 'Weeks 2–5',
    who: 'Designers, PM',
  },
  {
    n: '04',
    name: 'Build',
    what: 'Bi-weekly sprints with staging URLs, testable increments, and demos at sprint end.',
    deliverables: ['Staging URLs', 'Sprint demos', 'Tested components'],
    timeline: 'Weeks 4–10',
    who: 'Engineers, QA, PM',
  },
  {
    n: '05',
    name: 'QA',
    what: 'Accessibility audits, cross-browser tests, performance passes, content checks.',
    deliverables: ['Axe audit', 'Lighthouse report', 'Bug triage'],
    timeline: 'Week 10',
    who: 'QA, engineers',
  },
  {
    n: '06',
    name: 'Launch',
    what: 'Final review, DNS cutover, analytics verification, rollback plan ready.',
    deliverables: ['Go-live', 'Analytics live', 'Handoff doc'],
    timeline: 'Week 11',
    who: 'Founder, engineers',
  },
  {
    n: '07',
    name: 'Growth',
    what: 'Retainer or project — we measure, iterate, and compound the wins post-launch.',
    deliverables: ['Monthly report', 'Roadmap refresh', 'Optimizations'],
    timeline: 'Ongoing',
    who: 'Full team',
  },
]

const processFaqs = [
  {
    q: 'How long is a typical engagement?',
    a: 'Small scopes take 4–6 weeks. Mid-size web builds take 8–12 weeks. Complex apps take 12–20 weeks.',
  },
  {
    q: 'How often do we meet?',
    a: 'Weekly syncs by default, plus a sprint demo every two weeks. Always an open channel in Slack or Discord.',
  },
  {
    q: 'What tools do we use together?',
    a: 'Figma for design, Linear or Notion for work tracking, GitHub for code, and a shared Slack channel.',
  },
  {
    q: 'Can you work with our in-house team?',
    a: 'Yes — we collaborate with internal engineers, designers, and marketers. We adapt to your tools and cadence.',
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
            <span className="text-teal">brief to ship.</span>
          </>
        }
        description="Seven phases that keep the project predictable, accountable, and moving. No mystery weeks."
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

      <CtaBanner />
    </>
  )
}
