import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  tone?: 'teal' | 'muted'
}

export function Badge({ children, className, tone = 'muted' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[1.5px]',
        tone === 'teal'
          ? 'border-teal/40 bg-teal/10 text-teal'
          : 'border-border-dark bg-white/5 text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
