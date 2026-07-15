import { Section, SectionHeading } from '@/components/ui/Section'

const steps = [
  { n: '01', label: 'Discover', body: 'Goals, constraints, success metrics.' },
  { n: '02', label: 'Design', body: 'Flows, prototypes, a shared language.' },
  { n: '03', label: 'Build', body: 'Focused sprints, regular previews, clear progress.' },
  { n: '04', label: 'Launch', body: 'Go-live support, analytics, and performance checks.' },
  { n: '05', label: 'Grow', body: 'Measure results, improve continuously, scale what works.' },
]

export function ProcessSnapshot() {
  return (
    <Section tone="void">
      <SectionHeading
        eyebrow="How we work"
        title={
          <>
            From discovery to growth, <span className="text-teal">a clear path.</span>
          </>
        }
        description="A practical overview of how we move from shared goals to delivery, measurement, and ongoing improvement."
      />

      <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.n} className="relative">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[32px] font-extrabold text-teal">
                {s.n}
              </span>
              {i < steps.length - 1 ? (
                <span aria-hidden className="hidden h-px flex-1 bg-border-light dark:bg-border-dark lg:block" />
              ) : null}
            </div>
            <h3 className="mt-4 font-display text-h4 font-semibold text-void dark:text-white">
              {s.label}
            </h3>
            <p className="mt-1 text-[14px] text-void/60 dark:text-white/60">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
