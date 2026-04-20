import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export function Slash({ className }: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block select-none font-display text-teal',
        className,
      )}
    >
      /
    </span>
  )
}

export function SlashRule({ className }: Props) {
  return (
    <span
      aria-hidden
      className={cn('block h-[1.5px] w-10 bg-teal', className)}
    />
  )
}
