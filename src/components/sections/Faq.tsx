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
    <ul
      className={cn(
        'divide-y',
        tone === 'dark' ? 'divide-border-dark' : 'divide-border-light',
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={cn(
                'flex w-full items-center justify-between gap-6 py-5 text-left transition-colors',
                tone === 'dark'
                  ? 'text-white hover:text-teal'
                  : 'text-void hover:text-teal-dark',
              )}
            >
              <span className="flex items-start gap-3 font-display text-[17px] font-semibold">
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 inline-block h-[1px] w-6 shrink-0 transition-all',
                    isOpen ? 'bg-teal' : tone === 'dark' ? 'bg-white/30' : 'bg-void/30',
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
                <p
                  className={cn(
                    'max-w-3xl pl-9 text-[15px] leading-relaxed',
                    tone === 'dark' ? 'text-white/70' : 'text-void/70',
                  )}
                >
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
