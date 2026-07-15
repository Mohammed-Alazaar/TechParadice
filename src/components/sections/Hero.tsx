import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-32 dark:bg-void sm:pt-40 lg:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      >
        <span className="absolute -right-10 top-10 font-display text-[260px] font-extrabold leading-none text-void/[0.04] dark:text-white/[0.04] sm:text-[400px] lg:top-20 lg:text-[520px]">
          T<span className="text-teal/30">/</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-light to-transparent dark:via-border-dark" />
      </div>

      <div className="container-content pb-24 lg:pb-32">
        <p className="mb-6 flex items-center gap-3 text-caption uppercase text-teal">
          <span className="h-px w-8 bg-teal" />
          Strategy, technology, and growth in one team
        </p>
        <h1 className="heading-display max-w-4xl text-balance text-void dark:text-white">
          Turn your vision into{' '}
          <span className="relative inline-block">
            digital growth
            <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-teal" />
          </span>
          .
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-void/70 dark:text-white/70">
          One senior team for websites, apps, SEO, social media, and paid
          growth. Clear strategy, transparent delivery, and direct access to
          the founder from the first conversation through launch and ongoing improvement.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/free-audit" size="xl">
            Get a Free Audit
            <ArrowRight size={18} />
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary" size="xl">
            View work
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
