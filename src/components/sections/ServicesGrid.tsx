import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { services } from '@/lib/services'

export function ServicesGrid() {
  return (
    <Section tone="void">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            Nine services.{' '}
            <span className="text-teal">One team.</span>
          </>
        }
        description="Everything you need to build, launch, and grow online — executed by senior specialists, coordinated end-to-end."
      />

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative block h-full overflow-hidden rounded-xl border border-border-dark bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/50"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
                    <Icon size={20} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted transition-colors group-hover:text-teal"
                  />
                </div>
                <h3 className="mt-6 font-display text-h4 font-semibold text-white">
                  {service.name}
                </h3>
                <p className="mt-2 text-[14px] text-white/60">
                  {service.short}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
