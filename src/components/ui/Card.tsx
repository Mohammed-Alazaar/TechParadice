import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Card({ children, className, as: Tag = 'div' }: Props) {
  return (
    <Tag
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-surface',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
