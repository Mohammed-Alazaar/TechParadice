import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getPosts } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'
import { BasicPageSchema } from '@/components/seo/PageSchema'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Practical articles from TechParadice on digital strategy, design, engineering, SEO, and growth.',
  path: '/blog',
})

const categories = ['All', 'Web', 'Design', 'Growth', 'Engineering']

export default async function BlogPage() {
  const posts = await getPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <BasicPageSchema
        locale="en"
        path="/blog"
        type="CollectionPage"
        name="Blog"
        description="Practical articles from TechParadice on digital strategy, design, engineering, SEO, and growth."
        crumb="Blog"
      />
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Useful thinking for{' '}
            <span className="text-teal">better digital decisions.</span>
          </>
        }
        description="Clear, practical perspectives on strategy, design, engineering, SEO, and sustainable growth."
      >
        <ul className="flex flex-wrap gap-2" aria-label="Categories">
          {categories.map((c, i) => (
            <li key={c}>
              <button
                type="button"
                className={
                  i === 0
                    ? 'rounded-full border border-teal bg-teal/10 px-4 py-1.5 text-[13px] font-semibold text-teal'
                    : 'rounded-full border border-border-dark bg-surface px-4 py-1.5 text-[13px] font-semibold text-white/70 hover:border-teal/40 hover:text-white'
                }
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="void" className="pt-0">
        {featured ? (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-8 rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:-translate-y-1 hover:border-teal/40 lg:grid-cols-[1.1fr_1fr] lg:p-10"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br from-teal/20 via-void to-surface">
              {featured.cover ? (
                <Image src={featured.cover} alt={featured.title} fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-display text-[96px] font-extrabold tracking-tight text-white/10">
                  /
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <Badge tone="teal">Featured · {featured.category}</Badge>
              <h2 className="mt-4 heading-h2 text-balance text-white">{featured.title}</h2>
              <p className="mt-4 text-body-lg text-white/70">{featured.excerpt}</p>
              <p className="mt-6 text-[13px] text-muted">
                {featured.author} · {featured.date} · {featured.readingTime}
              </p>
            </div>
          </Link>
        ) : (
          <div className="rounded-2xl border border-border-dark bg-surface p-8 sm:p-10">
            <h2 className="font-display text-h3 font-semibold text-white">
              New articles are in progress
            </h2>
            <p className="mt-3 max-w-2xl text-white/65">
              We are preparing practical articles on digital strategy, design,
              engineering, SEO, and growth. In the meantime, contact us if you
              have a specific question.
            </p>
          </div>
        )}
      </Section>

      {rest.length > 0 ? (
        <Section tone="void" className="pt-0">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border-dark bg-surface p-6 transition-all hover:-translate-y-1 hover:border-teal/40"
                >
                  <Badge>{p.category}</Badge>
                  <h3 className="mt-4 font-display text-h4 font-semibold text-white group-hover:text-teal">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] text-white/60">{p.excerpt}</p>
                  <p className="mt-6 text-[12px] text-muted">
                    {p.date} · {p.readingTime}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBanner
        heading="Have a digital challenge to solve?"
        body="Tell us what you are trying to improve, and we will help you identify a practical next step."
        ctaLabel="Start a conversation"
        ctaHref="/contact"
        secondaryLabel="Explore services"
        secondaryHref="/services"
      />
    </>
  )
}
