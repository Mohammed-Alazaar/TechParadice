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
import {
  localizePortfolioIndustryAr,
  localizePortfolioServiceAr,
  localizePortfolioTimelineAr,
} from '@/lib/i18n/portfolio-ar'
import { buildMetadata } from '@/lib/seo'
import { ORG_REF } from '@/lib/schema'
import { SITE_URL, ldJson } from '@/lib/utils'

export const dynamicParams = true

type Params = { params: { slug: string } }

/**
 * Case-study copy is far longer than a meta description slot, and a blind
 * slice cuts mid-word. Trim to the budget, drop the dangling partial word,
 * then mark the truncation with an ellipsis.
 */
function truncateDescription(text: string, max = 155) {
  if (text.length <= max) return text
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`
}

export async function generateStaticParams() {
  const slugs = await getAllArCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = await getArCaseStudy(params.slug)
  if (!study) return {}
  return buildMetadata({
    title: `${study.client} — ${study.titleAr}`,
    description: truncateDescription(study.challengeAr),
    path: `/ar/work/${study.slug}`,
    alternatePath: `/work/${study.slug}`,
    locale: 'ar',
    hasAlternate: Boolean(study.published),
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

  // The canonical Organization is emitted once by the root layout, so author
  // and publisher reference it by @id rather than restating a second,
  // competing business entity on every case study.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${study.client} — ${study.titleAr}`,
      description: study.challengeAr.slice(0, 200),
      inLanguage: 'ar',
      author: ORG_REF,
      publisher: ORG_REF,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/ar/work/${study.slug}` },
      about: study.services,
      ...(study.cover ? { image: study.cover } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_URL}/ar` },
        { '@type': 'ListItem', position: 2, name: 'أعمالنا', item: `${SITE_URL}/ar/work` },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${study.client} — ${study.titleAr}`,
          item: `${SITE_URL}/ar/work/${study.slug}`,
        },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <PageHero
        eyebrow={localizePortfolioIndustryAr(study.industry)}
        title={study.titleAr}
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
            {study.services.map(localizePortfolioServiceAr).join('، ')}
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">المدة</span> {localizePortfolioTimelineAr(study.timeline)}
          </li>
          <li className="text-teal">/</li>
          <li>
            <span className="text-caption text-muted">السنة</span>{' '}
            {study.year === 'Not publicly disclosed' ? 'غير معلن' : study.year}
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
          {study.outcomeAr ? (
            <div className="absolute right-6 top-6">
              <Badge tone="teal">{study.outcomeAr}</Badge>
            </div>
          ) : null}
        </div>
      </Section>

      <Section tone="void">
        <div className="mx-auto grid max-w-4xl gap-10">
          {study.challengeAr ? (
            <div>
              <h2 className="text-caption uppercase text-teal">التحدي</h2>
              <p className="mt-4 text-body-lg text-white/80">{study.challengeAr}</p>
            </div>
          ) : null}
          {study.approachAr && study.approachAr.length > 0 ? (
            <div>
              <h2 className="text-caption uppercase text-teal">منهجية العمل</h2>
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
              <h2 className="text-caption uppercase text-teal">ما نفذناه</h2>
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

      <Section tone="surface">
        <p className="text-caption uppercase text-teal">
          {study.resultsAr && study.resultsAr.length > 0 ? 'المخرجات والنتائج' : 'المخرجات'}
        </p>
        {study.resultsAr && study.resultsAr.length > 0 ? (
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
        ) : (
          <p className="mt-4 max-w-3xl text-white/70">
            تركز دراسة الحالة هذه على ما نُفذ. ولا ننشر بيانات أداء إضافية لهذا المشروع.
          </p>
        )}

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

      {next && next.slug !== study.slug ? (
        <Section tone="void">
          <Link
            href={`/ar/work/${next.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:border-teal/40"
          >
            <div>
              <p className="text-caption uppercase text-muted">دراسة الحالة التالية</p>
              <p className="mt-2 font-display text-h3 font-semibold text-white">
                {next.titleAr}
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
        heading="هل لديك تحدٍ مشابه؟"
        body="أخبرنا بما تريد تحقيقه، وسنساعدك على تحديد المسار المناسب من الفكرة إلى النتيجة."
        ctaLabel="اطلب تدقيقك المجاني"
        ctaHref="/ar/free-audit"
      />
    </>
  )
}
