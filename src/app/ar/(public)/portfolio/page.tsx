import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArPortfolio } from '@/lib/portfolio'
import { SITE_URL } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'أعمالنا | TechParadice',
  description: 'مشاريع تك باراديس الحديثة — مواقع وتطبيقات وبرامج نمو رقمي متكاملة.',
  alternates: { canonical: `${SITE_URL}/ar/portfolio` },
  openGraph: { locale: 'ar_SA' },
}

export default async function ArPortfolioPage() {
  const portfolio = await getArPortfolio()

  return (
    <>
      <PageHero
        eyebrow="أعمال مختارة"
        title={
          <>
            مشاريع{' '}
            <span className="text-teal">أطلقناها.</span>
          </>
        }
        description="كل دراسة حالة تتضمن التحدي والنهج والأرقام التي خرجت من الجانب الآخر."
      >
        <ul className="flex flex-wrap gap-2" aria-label="تصفية">
          {['الكل', 'ويب', 'موبايل', 'تصميم', 'تسويق'].map((f, i) => (
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
          <p className="text-muted">لا توجد دراسات حالة بعد.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/ar/portfolio/${c.slug}`}
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
                      <Badge tone="teal">{c.outcomeAr ?? c.outcome}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-caption uppercase text-muted">
                      {c.industry} · {c.year}
                    </p>
                    <h2 className="mt-2 font-display text-h4 font-semibold text-white">
                      {c.titleAr ?? c.title}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
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
      </Section>

      <CtaBanner
        heading="هل أنت مستعد للبدء؟"
        body="أخبرنا بأهدافك. سنتكفل بالباقي."
        ctaLabel="تواصل معنا"
        ctaHref="/ar/contact"
      />
    </>
  )
}
