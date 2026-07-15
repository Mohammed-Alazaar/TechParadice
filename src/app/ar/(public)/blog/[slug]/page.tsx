import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArPost, getArPosts, getAllArPostSlugs, getPost } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL, BRAND } from '@/lib/utils'

export const dynamicParams = true

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllArPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getArPost(params.slug)
  if (!post) return {}
  return buildMetadata({
    title: post.metaTitleAr || post.titleAr,
    description: post.metaDescriptionAr || post.excerptAr,
    keywords: post.metaKeywordsAr,
    path: `/ar/blog/${post.slug}`,
    alternatePath: `/blog/${post.slug}`,
    locale: 'ar',
    hasAlternate: Boolean(post.published),
  })
}

const categoryLabels: Record<string, string> = {
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

export default async function ArBlogPostPage({ params }: Params) {
  const [post, all] = await Promise.all([getArPost(params.slug), getArPosts()])
  if (!post) {
    const englishPost = await getPost(params.slug)
    if (englishPost?.published) redirect('/ar/blog')
    notFound()
  }

  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2)
  // Arabic pages prefer an Arabic-specific cover, falling back to the shared one.
  const cover = post.coverAr || post.cover

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.titleAr,
      description: post.excerptAr,
      inLanguage: 'ar',
      author: { '@type': 'Person', name: post.author },
      datePublished: post.date,
      dateModified: post.date,
      publisher: {
        '@type': 'Organization',
        name: BRAND.name,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/ar/blog/${post.slug}` },
      ...(cover ? { image: cover } : {}),
      articleSection: post.category,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_URL}/ar` },
        { '@type': 'ListItem', position: 2, name: 'المدونة', item: `${SITE_URL}/ar/blog` },
        { '@type': 'ListItem', position: 3, name: post.titleAr, item: `${SITE_URL}/ar/blog/${post.slug}` },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-void pt-32 sm:pt-40 lg:pt-48">
        <div className="container-content max-w-reading">
          <Link
            href="/ar/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-teal hover:underline"
          >
            <ArrowRight size={14} />
            العودة إلى جميع المقالات
          </Link>
          <Badge tone="teal" className="mt-6">
            {categoryLabels[post.category] ?? post.category}
          </Badge>
          <h1 className="mt-4 heading-h1 text-balance text-white">{post.titleAr}</h1>
          <p className="mt-6 text-[14px] text-muted">
            {post.author} · {formatArabicDate(post.date)} · {localizeReadingTime(post.readingTime)}
          </p>

          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl bg-gradient-to-br from-teal/20 via-void to-surface">
            {cover ? (
              <Image src={cover} alt={post.titleAr} fill className="object-cover" sizes="(min-width: 1024px) 75vw, 100vw" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-display text-[180px] font-extrabold text-white/10">
                /
              </div>
            )}
          </div>

          <div
            className="blog-content mt-12"
            dangerouslySetInnerHTML={{
              __html:
                post.bodyAr.length === 1 && /<[a-z][\s\S]*>/i.test(post.bodyAr[0])
                  ? post.bodyAr[0]
                  : post.bodyAr.map((p) => `<p>${p}</p>`).join(''),
            }}
          />

          {related.length > 0 ? (
            <div className="mt-16 border-t border-border-dark pt-8">
              <p className="text-caption uppercase text-teal">مقالات ذات صلة</p>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/ar/blog/${r.slug}`}
                      className="block rounded-xl border border-border-dark bg-surface p-5 transition-all hover:-translate-y-1 hover:border-teal/40"
                    >
                      <Badge>{categoryLabels[r.category] ?? r.category}</Badge>
                      <p className="mt-3 font-display text-[17px] font-semibold text-white">
                        {r.titleAr}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      <Section tone="void" />
      <CtaBanner
        heading="هل تريد تطبيق هذه الأفكار في عملك؟"
        body="أخبرنا بما تريد تحسينه، وسنساعدك على تحديد خطوة تالية عملية."
        ctaLabel="ابدأ المحادثة"
        ctaHref="/ar/contact"
      />
    </>
  )
}
