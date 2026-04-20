import { cn } from '@/lib/utils'

type WordmarkProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'on-dark' | 'on-light' | 'on-teal'
  as?: 'span' | 'div'
}

const sizeMap = {
  sm: 'text-[18px]',
  md: 'text-[22px]',
  lg: 'text-[32px]',
  xl: 'text-[56px]',
}

export function Wordmark({
  className,
  size = 'md',
  tone = 'on-dark',
  as: Tag = 'span',
}: WordmarkProps) {
  const techColor =
    tone === 'on-light'
      ? 'text-void'
      : tone === 'on-teal'
        ? 'text-void'
        : 'text-white'

  const paradiceColor =
    tone === 'on-light'
      ? 'text-void/40'
      : tone === 'on-teal'
        ? 'text-void/50'
        : 'text-white/40'

  const slashColor = tone === 'on-teal' ? 'text-void/50' : 'text-teal'

  return (
    <Tag
      className={cn(
        'inline-flex items-baseline font-display leading-none tracking-[-1.5px]',
        sizeMap[size],
        className,
      )}
      aria-label="TechParadice"
    >
      <span className={cn('font-extrabold', techColor)}>Tech</span>
      <span className={cn('mx-[0.18em] font-extrabold', slashColor)}>/</span>
      <span className={cn('font-light', paradiceColor)}>Paradice</span>
    </Tag>
  )
}
