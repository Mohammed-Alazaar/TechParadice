import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArPost, getArPosts, getAllArPostSlugs } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'

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
    title: post.titleAr,
    description: post.excerptAr,
    path: `/ar/blog/${post.slug}`,
    alternatePath: `/blog/${post.slug}`,
    locale: 'ar',
  })
}

const categoryLabels: Record<string, string> = {
  Web: 'ويب',
  Design: 'تصميم',
  Growth: 'نمو',
  Engineering: 'هندسة',
}

export default async function ArBlogPostPage({ params }: Params) {
  const [post, all] = await Promise.all([getArPost(params.slug), getArPosts()])
  if (!post) notFound()

  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <article className="bg-void pt-32 sm:pt-40 lg:pt-48">
        <div className="container-content max-w-reading">
          <Link
            href="/ar/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-teal hover:underline"
          >
            <ArrowRight size={14} className="rotate-180" />
            العودة إلى المدونة
          </Link>
          <Badge tone="teal" className="mt-6">
            {categoryLabels[post.category] ?? post.category}
          </Badge>
          <h1 className="mt-4 heading-h1 text-balance text-white">{post.titleAr}</h1>
          <p className="mt-6 text-[14px] text-muted">
            {post.author} · {post.date} · {post.readingTime}
          </p>

          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl bg-gradient-to-br from-teal/20 via-void to-surface">
            {post.cover ? (
              <Image src={post.cover} alt={post.titleAr} fill className="object-cover" sizes="(min-width: 1024px) 75vw, 100vw" priority />
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
              <p className="text-caption uppercase text-teal">تابع القراءة</p>
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
        heading="هل أنت مستعد للبدء؟"
        body="أخبرنا بأهدافك. سنتكفل بالباقي."
        ctaLabel="تواصل معنا"
        ctaHref="/ar/contact"
      />
    </>
  )
}
