import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { portfolio } from '@/lib/portfolio'

export function FeaturedWork() {
  const featured = portfolio.slice(0, 3)

  return (
    <Section tone="void">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Recent projects,{' '}
              <span className="text-teal">shipped.</span>
            </>
          }
          description="A cross-section of what we build — from marketing sites to mobile apps to full-funnel campaigns."
        />
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-body text-[15px] font-semibold text-teal hover:underline"
        >
          View all
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {featured.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/portfolio/${item.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border-dark bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-teal/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal/20 via-surface to-void">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[48px] font-extrabold tracking-tight text-white/10">
                    {item.client}
                  </span>
                </div>
                <div className="absolute right-4 top-4">
                  <Badge tone="teal">{item.outcome}</Badge>
                </div>
              </div>
              <div className="p-6">
                <p className="text-caption uppercase text-muted">
                  {item.industry}
                </p>
                <h3 className="mt-2 font-display text-[20px] font-semibold text-white">
                  {item.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.services.slice(0, 3).map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
