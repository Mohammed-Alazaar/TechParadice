'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Item = { q: string; a: string }

type Props = {
  items: Item[]
  tone?: 'dark' | 'light'
}

export function Faq({ items, tone = 'dark' }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="divide-y divide-border-light dark:divide-border-dark">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-void transition-colors hover:text-teal dark:text-white"
            >
              <span className="flex items-start gap-3 font-display text-[17px] font-semibold">
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 inline-block h-[1px] w-6 shrink-0 transition-all',
                    isOpen ? 'bg-teal' : 'bg-void/30 dark:bg-white/30',
                  )}
                />
                {item.q}
              </span>
              <Plus
                size={18}
                className={cn(
                  'shrink-0 transition-transform',
                  isOpen && 'rotate-45',
                )}
              />
            </button>
            <div
              className={cn(
                'grid overflow-hidden transition-[grid-template-rows] duration-300',
                isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pl-9 text-[15px] leading-relaxed text-void/70 dark:text-white/70">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
