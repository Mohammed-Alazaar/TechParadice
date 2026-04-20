import { Section, SectionHeading } from '@/components/ui/Section'

const steps = [
  { n: '01', label: 'Discover', body: 'Goals, constraints, success metrics.' },
  { n: '02', label: 'Design', body: 'Flows, prototypes, a shared language.' },
  { n: '03', label: 'Build', body: 'Sprints, staging URLs, zero surprises.' },
  { n: '04', label: 'Launch', body: 'Go-live, analytics, performance pass.' },
  { n: '05', label: 'Grow', body: 'Measure, iterate, compound the wins.' },
]

export function ProcessSnapshot() {
  return (
    <Section tone="void">
      <SectionHeading
        eyebrow="How we work"
        title={
          <>
            Five steps, <span className="text-teal">no fluff.</span>
          </>
        }
        description="The same process we use whether we’re shipping a marketing site, a mobile app, or a paid campaign."
      />

      <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.n} className="relative">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[32px] font-extrabold text-teal">
                {s.n}
              </span>
              {i < steps.length - 1 ? (
                <span aria-hidden className="hidden h-px flex-1 bg-border-dark lg:block" />
              ) : null}
            </div>
            <h3 className="mt-4 font-display text-h4 font-semibold text-white">
              {s.label}
            </h3>
            <p className="mt-1 text-[14px] text-white/60">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
