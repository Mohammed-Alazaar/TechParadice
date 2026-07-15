import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArPosts } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'المدونة',
  description: 'أفكار عملية من فريق TechParadice حول تطوير المنتجات الرقمية وتصميم UI/UX وSEO والنمو.',
  path: '/ar/blog',
  alternatePath: '/blog',
  locale: 'ar',
})

const categoryLabels: Record<string, string> = {
  All: 'الكل',
  Web: 'تطوير الويب',
  Design: 'تصميم',
  Growth: 'نمو',
  Engineering: 'هندسة',
}

function formatArabicDate(date: string) {
  const parsed = new Date(/^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00Z` : date)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat('ar', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed)
}

function localizeReadingTime(readingTime: string) {
  const minutes = readingTime.match(/^(\d+)\s*(?:min|minutes?)(?:\s+read)?$/i)
  if (!minutes) return readingTime
  const count = Number(minutes[1])
  if (count === 1) return 'دقيقة قراءة'
  if (count === 2) return 'دقيقتان للقراءة'
  if (count >= 3 && count <= 10) return `${count} دقائق قراءة`
  return `${count} دقيقة قراءة`
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
            أفكار عملية،{' '}
            <span className="text-teal">تصنع فرقًا.</span>
          </>
        }
        description="رؤى وتجارب من فريقنا حول التطوير والتصميم وSEO والنمو، مكتوبة بوضوح لتساعدك على اتخاذ قرارات أفضل."
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
              {featured.coverAr || featured.cover ? (
                <Image src={(featured.coverAr || featured.cover)!} alt={featured.titleAr} fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-display text-[96px] font-extrabold tracking-tight text-white/10">
                  /
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <Badge tone="teal">مقال مختار · {categoryLabels[featured.category] ?? featured.category}</Badge>
              <h2 className="mt-4 heading-h2 text-balance text-white">{featured.titleAr}</h2>
              <p className="mt-4 text-body-lg text-white/70">{featured.excerptAr}</p>
              <p className="mt-6 text-[13px] text-muted">
                {featured.author} · {formatArabicDate(featured.date)} · {localizeReadingTime(featured.readingTime)}
              </p>
            </div>
          </Link>
        </Section>
      ) : null}

      <Section tone="void" className="pt-0">
        {posts.length === 0 ? (
          <p className="text-muted">نعمل على إعداد محتوى جديد. عد قريبًا للاطلاع عليه.</p>
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
                    {formatArabicDate(p.date)} · {localizeReadingTime(p.readingTime)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CtaBanner
        heading="هل لديك تحدٍ رقمي تريد حله؟"
        body="أخبرنا بما تريد تحسينه، وسنساعدك على تحديد خطوة تالية عملية."
        ctaLabel="ابدأ محادثة"
        ctaHref="/ar/contact"
        secondaryLabel="استكشف خدماتنا"
        secondaryHref="/ar/services"
      />
    </>
  )
}
