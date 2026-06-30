import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getPost, getAllPostSlugs, getPosts } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = true

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: Params) {
  const [post, all] = await Promise.all([getPost(params.slug), getPosts()])
  if (!post) notFound()

  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'TechParadice',
      logo: { '@type': 'ImageObject', url: 'https://techparadice.com/og-image.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://techparadice.com/blog/${post.slug}` },
    ...(post.cover ? { image: post.cover } : {}),
    articleSection: post.category,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-white pt-32 dark:bg-void sm:pt-40 lg:pt-48">
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
          <h1 className="mt-4 heading-h1 text-balance text-void dark:text-white">{post.title}</h1>
          <p className="mt-6 text-[14px] text-muted">
            {post.author} · {post.date} · {post.readingTime}
          </p>

          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl bg-gradient-to-br from-teal/20 via-neutral-100 to-white dark:via-void dark:to-surface">
            {post.cover ? (
              <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="(min-width: 1024px) 75vw, 100vw" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-display text-[180px] font-extrabold text-void/10 dark:text-white/10">
                /
              </div>
            )}
          </div>

          <div
            className="blog-content mt-12"
            dangerouslySetInnerHTML={{
              __html:
                post.body.length === 1 && /<[a-z][\s\S]*>/i.test(post.body[0])
                  ? post.body[0]
                  : post.body.map((p) => `<p>${p}</p>`).join(''),
            }}
          />

          <div className="mt-16 border-t border-border-light pt-8 dark:border-border-dark">
            <p className="text-caption uppercase text-teal">Keep reading</p>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="block rounded-xl border border-border-light bg-neutral-50 p-5 transition-all hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-surface"
                  >
                    <Badge>{r.category}</Badge>
                    <p className="mt-3 font-display text-[17px] font-semibold text-void dark:text-white">
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
