import { CheckCircle2, Compass, MessageCircle, Sparkles } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/Section'

const reasons = [
  {
    icon: Sparkles,
    title: 'Coordinated senior expertise',
    body: 'Strategy, design, technology, and marketing are organised around one plan and one set of priorities.',
  },
  {
    icon: Compass,
    title: 'Flexible budget-based pricing',
    body: 'No rigid tiers. Share your goals and budget, and we’ll recommend a transparent plan that fits.',
  },
  {
    icon: MessageCircle,
    title: 'Direct line to the founder',
    body: 'Mohammed stays involved throughout the engagement, giving decisions and responsibilities clear owners.',
  },
  {
    icon: CheckCircle2,
    title: 'Designed for real-world use',
    body: 'Deliverables are reviewed against agreed needs, measured with relevant signals, and designed to evolve.',
  },
]

export function WhyUs() {
  return (
    <Section tone="light" className="border-y border-border-light dark:border-border-dark">
      <SectionHeading
        eyebrow="Why TechParadice"
        title={
          <>
            Senior expertise,{' '}
            <span className="text-teal-dark dark:text-teal">one accountable team.</span>
          </>
        }
        description="You get the expertise your project needs, aligned around your goals and coordinated by one founder-led team."
      />

      <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => {
          const Icon = r.icon
          return (
            <li key={r.title} className="relative">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border-light bg-white text-void shadow-sm dark:border-border-dark dark:bg-surface dark:text-teal">
                <Icon size={20} />
              </span>
              <h3 className="font-display text-[20px] font-semibold text-void dark:text-white">
                {r.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-void/70 dark:text-white/60">
                {r.body}
              </p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
