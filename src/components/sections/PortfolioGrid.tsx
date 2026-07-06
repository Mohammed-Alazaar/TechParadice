'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import {
  PORTFOLIO_FILTERS,
  studyMatchesFilter,
  type PortfolioFilter,
} from '@/lib/portfolio-filters'

export type PortfolioCardData = {
  slug: string
  href: string
  client: string
  title: string
  industry: string
  year: string
  services: string[]
  outcome: string
  cover?: string
  /** one-line summary shown on the card */
  excerpt: string
  /** headline stat pulled from results, e.g. { value: '+38%', label: 'checkout conversion' } */
  keyResult?: { value: string; label: string }
}

type Labels = {
  filterAria: string
  filters: Record<PortfolioFilter, string>
  empty: string
  showing: (count: number) => string
}

export function PortfolioGrid({
  items,
  labels,
}: {
  items: PortfolioCardData[]
  labels: Labels
}) {
  const [active, setActive] = useState<PortfolioFilter>('All')

  const visible = useMemo(
    () => items.filter((c) => studyMatchesFilter(c.services, active)),
    [items, active],
  )

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2" aria-label={labels.filterAria}>
          {PORTFOLIO_FILTERS.map((f) => (
            <li key={f}>
              <button
                type="button"
                aria-pressed={active === f}
                onClick={() => setActive(f)}
                className={
                  active === f
                    ? 'rounded-full border border-teal bg-teal/10 px-4 py-1.5 text-[13px] font-semibold text-teal'
                    : 'rounded-full border border-border-dark bg-surface px-4 py-1.5 text-[13px] font-semibold text-white/70 transition-colors hover:border-teal/40 hover:text-white'
                }
              >
                {labels.filters[f]}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-muted" aria-live="polite">
          {labels.showing(visible.length)}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-muted">{labels.empty}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <li key={c.slug}>
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-dark bg-surface transition-all hover:-translate-y-1 hover:border-teal/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal/20 via-surface to-void">
                  {c.cover ? (
                    <Image
                      src={c.cover}
                      alt={`${c.client} — ${c.title}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[48px] font-extrabold tracking-tight text-white/10">
                        {c.client}
                      </span>
                    </div>
                  )}
                  <div className="absolute right-4 top-4">
                    <Badge tone="teal">{c.outcome}</Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-caption uppercase text-muted">
                    {c.client} · {c.industry} · {c.year}
                  </p>
                  <h2 className="mt-2 font-display text-h4 font-semibold text-white">
                    {c.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-white/60">
                    {c.excerpt}
                  </p>
                  {c.keyResult ? (
                    <p className="mt-4 text-[14px] text-white/70">
                      <span className="font-display text-[20px] font-extrabold text-teal">
                        {c.keyResult.value}
                      </span>{' '}
                      {c.keyResult.label}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {c.services.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
