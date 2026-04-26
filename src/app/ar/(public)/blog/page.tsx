import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'المدونة | TechParadice',
  description: 'مقالات قصيرة ومفيدة حول الهندسة والتصميم والنمو — من فريق تك باراديس.',
  alternates: { canonical: `${SITE_URL}/ar/blog` },
  openGraph: { locale: 'ar_SA' },
}

const categoryLabels: Record<string, string> = {
  All: 'الكل',
  Web: 'ويب',
  Design: 'تصميم',
  Growth: 'نمو',
  Engineering: 'هندسة',
}

export default async function ArBlogPage() {
  const posts = await getArPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <PageHero
        eyebrow="المدونة"
        title={
          <>
            مقالات حول الشحن،{' '}
            <span className="text-teal">ولماذا.</span>
          </>
        }
        description="ملاحظات من الفريق حول الهندسة والتصميم والنمو — قصيرة ومحددة وبلا حشو."
      >
        <ul className="flex flex-wrap gap-2" aria-label="التصنيفات">
          {Object.entries(categoryLabels).map(([, label], i) => (
            <li key={label}>
              <button
                type="button"
                className={
                  i === 0
                    ? 'rounded-full border border-teal bg-teal/10 px-4 py-1.5 text-[13px] font-semibold text-teal'
                    : 'rounded-full border border-border-dark bg-surface px-4 py-1.5 text-[13px] font-semibold text-white/70 hover:border-teal/40 hover:text-white'
                }
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </PageHero>

      {featured ? (
        <Section tone="void" className="pt-0">
          <Link
            href={`/ar/blog/${featured.slug}`}
            className="group grid gap-8 rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:-translate-y-1 hover:border-teal/40 lg:grid-cols-[1.1fr_1fr] lg:p-10"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br from-teal/20 via-void to-surface">
              {featured.cover ? (
                <img src={featured.cover} alt={featured.titleAr} className="h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-display text-[96px] font-extrabold tracking-tight text-white/10">
                  /
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <Badge tone="teal">مميز · {categoryLabels[featured.category] ?? featured.category}</Badge>
              <h2 className="mt-4 heading-h2 text-balance text-white">{featured.titleAr}</h2>
              <p className="mt-4 text-body-lg text-white/70">{featured.excerptAr}</p>
              <p className="mt-6 text-[13px] text-muted">
                {featured.author} · {featured.date} · {featured.readingTime}
              </p>
            </div>
          </Link>
        </Section>
      ) : null}

      <Section tone="void" className="pt-0">
        {posts.length === 0 ? (
          <p className="text-muted">لا توجد منشورات بعد.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/ar/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border-dark bg-surface p-6 transition-all hover:-translate-y-1 hover:border-teal/40"
                >
                  <Badge>{categoryLabels[p.category] ?? p.category}</Badge>
                  <h3 className="mt-4 font-display text-h4 font-semibold text-white group-hover:text-teal">
                    {p.titleAr}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] text-white/60">{p.excerptAr}</p>
                  <p className="mt-6 text-[12px] text-muted">
                    {p.date} · {p.readingTime}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CtaBanner
        heading="هل تريد استقبالها؟"
        body="بريد شهري قصير — ما أطلقناه، ما تعلمناه، ما يستحق القراءة."
        ctaLabel="اشترك عبر التواصل"
        ctaHref="/ar/contact"
        secondaryLabel="جميع الخدمات"
        secondaryHref="/ar/services"
      />
    </>
  )
}
