import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg' | 'xl'

type BaseProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-teal text-void hover:bg-teal-dark hover:shadow-glow active:translate-y-px',
  secondary:
    'border border-teal text-teal hover:bg-teal hover:text-void',
  ghost:
    'text-void/80 hover:text-teal dark:text-white/90',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-[14px]',
  md: 'h-10 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[16px]',
  xl: 'h-14 px-8 text-[17px]',
}

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-lg font-body font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-void'

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', className, children, ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          base,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

type ButtonLinkProps = BaseProps & {
  href: string
  target?: string
  rel?: string
  ariaLabel?: string
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  target,
  rel,
  ariaLabel,
}: ButtonLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className)

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={target ?? '_blank'}
        rel={rel ?? 'noreferrer noopener'}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
