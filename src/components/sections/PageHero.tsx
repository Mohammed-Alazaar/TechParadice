import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function PageHero({ eyebrow, title, description, children, className }: Props) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-white pb-16 pt-32 dark:bg-void sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(ellipse_at_top,_rgba(94,234,212,0.15),_transparent_70%)]"
      />
      <div className="container-content">
        {eyebrow ? (
          <p className="mb-5 flex items-center gap-3 text-caption uppercase text-teal">
            <span className="h-px w-8 bg-teal" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="heading-h1 max-w-4xl text-balance text-void dark:text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-body-lg text-void/70 dark:text-white/70">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  )
}
