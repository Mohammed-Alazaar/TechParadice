import { CheckCircle2, Compass, MessageCircle, Sparkles } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/Section'

const reasons = [
  {
    icon: Sparkles,
    title: 'All-in-one senior team',
    body: 'Nine disciplines, one contract, zero hand-off tax. Everyone on your project has shipped work at scale.',
  },
  {
    icon: Compass,
    title: 'Flexible budget-based pricing',
    body: 'No rigid tiers. Share your goal and budget — we scope a path that fits, transparently.',
  },
  {
    icon: MessageCircle,
    title: 'Direct line to the founder',
    body: 'Mohammed is on every project. Decisions are fast, accountability is clear, momentum stays high.',
  },
  {
    icon: CheckCircle2,
    title: 'Built to ship, built to grow',
    body: 'Everything we build is production-grade, measured, and set up to compound month over month.',
  },
]

export function WhyUs() {
  return (
    <Section tone="light" className="border-y border-border-light dark:border-border-dark">
      <SectionHeading
        eyebrow="Why TechParadice"
        title={
          <>
            A studio-quality team{' '}
            <span className="text-teal-dark dark:text-teal">without the studio tax.</span>
          </>
        }
        description="We cut the overhead, keep the craft. You get senior execution across every discipline, coordinated by one founder-led team."
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
