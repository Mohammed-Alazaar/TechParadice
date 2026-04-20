import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

type Props = {
  heading?: string
  body?: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export function CtaBanner({
  heading = 'Ready to build your digital world?',
  body = 'Tell us where you’re headed. We’ll propose a scope that fits and a plan that ships.',
  ctaHref = '/contact',
  ctaLabel = 'Start a project',
  secondaryHref = '/pricing',
  secondaryLabel = 'See how pricing works',
}: Props) {
  return (
    <section className="bg-void py-20 lg:py-28">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-3xl border border-border-dark bg-gradient-to-br from-surface via-void to-void p-10 sm:p-14 lg:p-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 font-display text-[280px] font-extrabold leading-none text-teal/10"
          >
            /
          </span>
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="heading-h2 text-balance text-white">{heading}</h2>
              <p className="mt-4 text-body-lg text-white/70">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={ctaHref} size="lg">
                {ctaLabel}
                <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink href={secondaryHref} variant="secondary" size="lg">
                {secondaryLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
