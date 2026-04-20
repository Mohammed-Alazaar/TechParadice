import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getCaseStudy, portfolio } from '@/lib/portfolio'
import { buildMetadata } from '@/lib/seo'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const study = getCaseStudy(params.slug)
  if (!study) return {}
  return buildMetadata({
    title: `${study.client} — ${study.title}`,
    description: study.challenge.slice(0, 150),
    path: `/portfolio/${study.slug}`,
  })
}

export default function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy(params.slug)
  if (!study) notFound()

  const index = portfolio.findIndex((p) => p.slug === study.slug)
  const next = portfolio[(index + 1) % portfolio.length]

  return (
    <>
      <PageHero
        eyebrow={study.industry}
        title={study.title}
        description={study.challenge.split('.')[0] + '.'}
      >
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-white/70">
          <li>
            <span className="text-caption text-muted">Client</span>{' '}
            <span className="font-semibold text-white">{study.client}</span>
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">Services</span>{' '}
            {study.services.join(', ')}
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">Timeline</span>{' '}
            {study.timeline}
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">Year</span> {study.year}
          </li>
        </ul>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-border-dark bg-gradient-to-br from-teal/20 via-surface to-void">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[120px] font-extrabold tracking-tight text-white/10 sm:text-[180px]">
              {study.client}
            </span>
          </div>
          <div className="absolute right-6 top-6">
            <Badge tone="teal">{study.outcome}</Badge>
          </div>
        </div>
      </Section>

      <Section tone="void">
        <div className="mx-auto grid max-w-4xl gap-10">
          <div>
            <p className="text-caption uppercase text-teal">Challenge</p>
            <p className="mt-4 text-body-lg text-white/80">{study.challenge}</p>
          </div>
          <div>
            <p className="text-caption uppercase text-teal">Approach</p>
            <ul className="mt-4 space-y-3">
              {study.approach.map((a) => (
                <li
                  key={a}
                  className="flex gap-3 text-body-lg text-white/80"
                >
                  <span className="mt-3 h-px w-6 shrink-0 bg-teal" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-caption uppercase text-teal">Solution</p>
            <ul className="mt-4 space-y-3">
              {study.solution.map((s) => (
                <li key={s} className="flex gap-3 text-body-lg text-white/80">
                  <span className="mt-3 h-px w-6 shrink-0 bg-teal" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <p className="text-caption uppercase text-teal">Results</p>
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {study.results.map((r) => (
            <li
              key={r.label}
              className="rounded-2xl border border-border-dark bg-void p-8"
            >
              <p className="font-display text-[56px] font-extrabold leading-none text-teal">
                {r.value}
              </p>
              <p className="mt-3 text-[14px] uppercase tracking-[1.5px] text-muted">
                {r.label}
              </p>
            </li>
          ))}
        </ul>

        {study.testimonial ? (
          <figure className="mt-14 border-l-2 border-teal pl-6">
            <blockquote className="font-display text-h3 font-medium italic text-white">
              “{study.testimonial.quote}”
            </blockquote>
            <figcaption className="mt-4 text-[14px] text-muted">
              <span className="font-semibold text-white">
                {study.testimonial.author}
              </span>{' '}
              — {study.testimonial.role}
            </figcaption>
          </figure>
        ) : null}
      </Section>

      <Section tone="void">
        <Link
          href={`/portfolio/${next.slug}`}
          className="group flex items-center justify-between rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:border-teal/40"
        >
          <div>
            <p className="text-caption uppercase text-muted">Next case study</p>
            <p className="mt-2 font-display text-h3 font-semibold text-white">
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={28}
            className="text-teal transition-transform group-hover:translate-x-1"
          />
        </Link>
      </Section>

      <CtaBanner />
    </>
  )
}
