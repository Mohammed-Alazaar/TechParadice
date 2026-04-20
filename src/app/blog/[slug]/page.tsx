import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getPost, posts } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  })
}

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <article className="bg-void pt-32 sm:pt-40 lg:pt-48">
        <div className="container-content max-w-reading">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-teal hover:underline"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>
          <Badge tone="teal" className="mt-6">
            {post.category}
          </Badge>
          <h1 className="mt-4 heading-h1 text-balance text-white">
            {post.title}
          </h1>
          <p className="mt-6 text-[14px] text-muted">
            {post.author} · {post.date} · {post.readingTime}
          </p>

          <div className="mt-12 relative aspect-[16/8] overflow-hidden rounded-2xl bg-gradient-to-br from-teal/20 via-void to-surface">
            <div className="absolute inset-0 flex items-center justify-center font-display text-[180px] font-extrabold text-white/10">
              /
            </div>
          </div>

          <div className="mt-12 space-y-6 text-body-lg leading-relaxed text-white/80">
            {post.body.map((para, i) => (
              <p key={i} className="text-pretty">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-16 border-t border-border-dark pt-8">
            <p className="text-caption uppercase text-teal">Keep reading</p>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="block rounded-xl border border-border-dark bg-surface p-5 transition-all hover:-translate-y-1 hover:border-teal/40"
                  >
                    <Badge>{r.category}</Badge>
                    <p className="mt-3 font-display text-[17px] font-semibold text-white">
                      {r.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <Section tone="void" />
      <CtaBanner />
    </>
  )
}
