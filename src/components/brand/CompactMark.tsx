import { cn } from '@/lib/utils'

type Props = {
  className?: string
  tone?: 'dark' | 'light'
  size?: number
}

export function CompactMark({ className, tone = 'dark', size = 40 }: Props) {
  const bg = tone === 'dark' ? 'bg-void' : 'bg-white'
  const fg = tone === 'dark' ? 'text-white' : 'text-void'

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-display font-extrabold leading-none tracking-[-1px]',
        bg,
        fg,
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.52),
      }}
      aria-label="TechParadice"
    >
      <span>T</span>
      <span className="ml-[0.02em] text-teal">/</span>
    </span>
  )
}
