import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArCaseStudy, getAllArCaseStudySlugs, getArPortfolio } from '@/lib/portfolio'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = true

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllArCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = await getArCaseStudy(params.slug)
  if (!study) return {}
  return buildMetadata({
    title: `${study.client} — ${study.titleAr ?? study.title}`,
    description: (study.challengeAr ?? '').slice(0, 150),
    path: `/ar/portfolio/${study.slug}`,
    alternatePath: `/portfolio/${study.slug}`,
    locale: 'ar',
  })
}

export default async function ArCaseStudyPage({ params }: Params) {
  const [study, portfolio] = await Promise.all([
    getArCaseStudy(params.slug),
    getArPortfolio(),
  ])
  if (!study) notFound()

  const index = portfolio.findIndex((p) => p.slug === study.slug)
  const next = portfolio[(index + 1) % portfolio.length] ?? portfolio[0]

  return (
    <>
      <PageHero
        eyebrow={study.industry}
        title={study.titleAr ?? study.title}
        description={study.challengeAr ? study.challengeAr.split('.')[0] + '.' : ''}
      >
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-white/70">
          <li>
            <span className="text-caption text-muted">العميل</span>{' '}
            <span className="font-semibold text-white">{study.client}</span>
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">الخدمات</span>{' '}
            {study.services.join('، ')}
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">المدة</span> {study.timeline}
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">السنة</span> {study.year}
          </li>
        </ul>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-border-dark bg-gradient-to-br from-teal/20 via-surface to-void">
          {study.cover ? (
            <Image src={study.cover} alt={study.client} fill className="object-cover" sizes="100vw" priority />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[120px] font-extrabold tracking-tight text-white/10 sm:text-[180px]">
                {study.client}
              </span>
            </div>
          )}
          {(study.outcomeAr ?? study.outcome) ? (
            <div className="absolute right-6 top-6">
              <Badge tone="teal">{study.outcomeAr ?? study.outcome}</Badge>
            </div>
          ) : null}
        </div>
      </Section>

      <Section tone="void">
        <div className="mx-auto grid max-w-4xl gap-10">
          {study.challengeAr ? (
            <div>
              <p className="text-caption uppercase text-teal">التحدي</p>
              <p className="mt-4 text-body-lg text-white/80">{study.challengeAr}</p>
            </div>
          ) : null}
          {study.approachAr && study.approachAr.length > 0 ? (
            <div>
              <p className="text-caption uppercase text-teal">النهج</p>
              <ul className="mt-4 space-y-3">
                {study.approachAr.map((a) => (
                  <li key={a} className="flex gap-3 text-body-lg text-white/80">
                    <span className="mt-3 h-px w-6 shrink-0 bg-teal" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {study.solutionAr && study.solutionAr.length > 0 ? (
            <div>
              <p className="text-caption uppercase text-teal">الحل</p>
              <ul className="mt-4 space-y-3">
                {study.solutionAr.map((s) => (
                  <li key={s} className="flex gap-3 text-body-lg text-white/80">
                    <span className="mt-3 h-px w-6 shrink-0 bg-teal" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      {study.resultsAr && study.resultsAr.length > 0 ? (
        <Section tone="surface">
          <p className="text-caption uppercase text-teal">النتائج</p>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {study.resultsAr.map((r) => (
              <li key={r.label} className="rounded-2xl border border-border-dark bg-void p-8">
                <p className="font-display text-[56px] font-extrabold leading-none text-teal">
                  {r.value}
                </p>
                <p className="mt-3 text-[14px] uppercase tracking-[1.5px] text-muted">{r.label}</p>
              </li>
            ))}
          </ul>

          {study.testimonialAr ? (
            <figure className="mt-14 border-r-2 border-teal pr-6">
              <blockquote className="font-display text-h3 font-medium italic text-white">
                &ldquo;{study.testimonialAr.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[14px] text-muted">
                <span className="font-semibold text-white">{study.testimonialAr.author}</span> —{' '}
                {study.testimonialAr.role}
              </figcaption>
            </figure>
          ) : null}
        </Section>
      ) : null}

      {next && next.slug !== study.slug ? (
        <Section tone="void">
          <Link
            href={`/ar/portfolio/${next.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:border-teal/40"
          >
            <div>
              <p className="text-caption uppercase text-muted">الدراسة التالية</p>
              <p className="mt-2 font-display text-h3 font-semibold text-white">
                {next.titleAr ?? next.title}
              </p>
            </div>
            <ArrowLeft
              size={28}
              className="text-teal transition-transform group-hover:-translate-x-1"
            />
          </Link>
        </Section>
      ) : null}

      <CtaBanner
        heading="هل أنت مستعد للبدء؟"
        body="أخبرنا بأهدافك. سنتكفل بالباقي."
        ctaLabel="تواصل معنا"
        ctaHref="/ar/contact"
      />
    </>
  )
}
