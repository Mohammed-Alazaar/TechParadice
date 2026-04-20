import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-void pt-32 sm:pt-40 lg:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      >
        <span className="absolute -right-10 top-10 font-display text-[260px] font-extrabold leading-none text-white/[0.04] sm:text-[400px] lg:top-20 lg:text-[520px]">
          T<span className="text-teal/30">/</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-dark to-transparent" />
      </div>

      <div className="container-content pb-24 lg:pb-32">
        <p className="mb-6 flex items-center gap-3 text-caption uppercase text-teal">
          <span className="h-px w-8 bg-teal" />
          A full-stack digital agency
        </p>
        <h1 className="heading-display max-w-4xl text-balance text-white">
          Your digital world,{' '}
          <span className="relative inline-block">
            built
            <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-teal" />
          </span>
          .
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-white/70">
          One senior team. Websites, apps, SEO, social, and ads —
          engineered to ship and designed to compound. Flexible budgets,
          transparent scope, direct line to the founder.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/pricing" size="xl">
            Get a quote
            <ArrowRight size={18} />
          </ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary" size="xl">
            View work
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
