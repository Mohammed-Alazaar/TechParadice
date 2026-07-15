import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArPortfolio } from '@/lib/portfolio'
import { localizePortfolioIndustryAr, localizePortfolioServiceAr } from '@/lib/i18n/portfolio-ar'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'أعمالنا | TechParadice',
  description: 'استكشف دراسات حالة من TechParadice في تطوير المواقع والتطبيقات وتصميم UI/UX وSEO والنمو الرقمي.',
  path: '/ar/work',
  alternatePath: '/work',
  locale: 'ar',
})

export default async function ArWorkPage() {
  const portfolio = await getArPortfolio()

  return (
    <>
      <PageHero
        eyebrow="أعمال مختارة"
        title={
          <>
            مشروعات بُنيت حول{' '}
            <span className="text-teal">تحديات واضحة.</span>
          </>
        }
        description="تعرّف إلى سياق كل مشروع ومنهجنا وما نفذناه والنتائج المتاحة لكل تعاون."
      >
        <ul className="flex flex-wrap gap-2" aria-label="تصفية">
          {['الكل', 'تطوير الويب', 'التطبيقات', 'تصميم UI/UX', 'التسويق'].map((f, i) => (
            <li key={f}>
              <button
                type="button"
                className={
                  i === 0
                    ? 'rounded-full border border-teal bg-teal/10 px-4 py-1.5 text-[13px] font-semibold text-teal'
                    : 'rounded-full border border-border-dark bg-surface px-4 py-1.5 text-[13px] font-semibold text-white/70 hover:border-teal/40 hover:text-white'
                }
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="void" className="pt-0">
        {portfolio.length === 0 ? (
          <p className="text-muted">لا توجد دراسات حالة منشورة حاليًا. عد قريبًا للاطلاع على أحدث أعمالنا.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/ar/work/${c.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border-dark bg-surface transition-all hover:-translate-y-1 hover:border-teal/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal/20 via-surface to-void">
                    {c.cover ? (
                      <Image src={c.cover} alt={c.client} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-[48px] font-extrabold tracking-tight text-white/10">
                          {c.client}
                        </span>
                      </div>
                    )}
                    <div className="absolute right-4 top-4">
                      <Badge tone="teal">{c.outcomeAr}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-caption uppercase text-muted">
                      {localizePortfolioIndustryAr(c.industry)} ·{' '}
                      {c.year === 'Not publicly disclosed' ? 'غير معلن' : c.year}
                    </p>
                    <h2 className="mt-2 font-display text-h4 font-semibold text-white">
                      {c.titleAr}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.services.map((s) => (
                        <Badge key={s}>{localizePortfolioServiceAr(s)}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CtaBanner
        heading="هل تريد مناقشة مشروعك؟"
        body="شاركنا أهدافك والتحدي الذي تواجهه، وسنساعدك على تحديد نطاق عملي وخطوة تالية واضحة."
        ctaLabel="ابدأ المحادثة"
        ctaHref="/ar/contact"
      />
    </>
  )
}
