import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-void py-24">
      <div className="container-content text-center">
        <p className="font-display text-[120px] font-extrabold leading-none text-teal sm:text-[180px]">
          4<span className="text-white">/</span>4
        </p>
        <h1 className="mt-6 heading-h2 text-white">Page not found</h1>
        <p className="mt-4 text-body-lg text-white/70">
          The page you’re looking for moved, got renamed, or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border-dark px-6 text-[15px] font-semibold text-white/80 hover:border-teal/40 hover:text-white"
          >
            See services
          </Link>
        </div>
      </div>
    </section>
  )
}
