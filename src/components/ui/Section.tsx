import { cn } from '@/lib/utils'

type SectionProps = {
  children?: React.ReactNode
  className?: string
  tone?: 'void' | 'surface' | 'light'
  containerClassName?: string
  id?: string
  as?: React.ElementType
}

const toneClasses = {
  void: 'bg-void text-white',
  surface: 'bg-surface text-white',
  light: 'bg-white text-void',
}

export function Section({
  children,
  className,
  tone = 'void',
  containerClassName,
  id,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'py-16 sm:py-20 lg:py-24',
        toneClasses[tone],
        className,
      )}
    >
      <div className={cn('container-content', containerClassName)}>
        {children}
      </div>
    </Tag>
  )
}

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-4 font-body text-[11px] font-semibold uppercase tracking-[1.5px]',
            tone === 'dark' ? 'text-teal' : 'text-muted',
            align === 'center' && 'flex items-center justify-center gap-3',
          )}
        >
          {align === 'center' && <span className="h-px w-8 bg-teal" />}
          {eyebrow}
          {align === 'center' && <span className="h-px w-8 bg-teal" />}
        </p>
      ) : null}
      <h2 className="heading-h2 text-balance">{title}</h2>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-2xl text-body-lg',
            tone === 'dark' ? 'text-white/70' : 'text-void/70',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
