import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices } from '@/lib/services'
import { getArPortfolio } from '@/lib/portfolio'
import { BRAND, SITE_URL } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: `${BRAND.name} — عالمك الرقمي، مبني.`,
  description: 'تك باراديس وكالة رقمية متكاملة. مواقع، تطبيقات، تصميم، SEO، سوشيال ومحتوى — فريق واحد متكامل.',
  path: '/ar',
  alternatePath: '/',
  locale: 'ar',
})

export default async function ArHomePage() {
  const [services, portfolio] = await Promise.all([getServices(), getArPortfolio()])

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND.name,
      url: `${SITE_URL}/ar`,
      logo: `${SITE_URL}/og-image.png`,
      email: BRAND.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      sameAs: [],
      description:
        'وكالة رقمية متكاملة تقدّم مواقع، تطبيقات موبايل، تصميم UI/UX، SEO، سوشيال ميديا، إنتاج محتوى، وإعلانات مدفوعة.',
      serviceArea: { '@type': 'AdministrativeArea', name: 'Worldwide' },
      inLanguage: 'ar',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${SITE_URL}/ar`,
      name: BRAND.name,
      inLanguage: 'ar',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/ar/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: BRAND.name,
      url: `${SITE_URL}/ar`,
      email: BRAND.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      priceRange: '$0 – $5,000+',
      description: 'وكالة رقمية: تطوير مواقع، تطبيقات موبايل، SEO، سوشيال ميديا، وتصميم.',
      inLanguage: 'ar',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="تك باراديس"
        title={
          <>
            عالمك الرقمي،{' '}
            <span className="text-teal">مبني.</span>
          </>
        }
        description="وكالة رقمية متكاملة تحت قيادة واحدة. مواقع، تطبيقات، تصميم، SEO، سوشيال ومحتوى — كل شيء في فريق واحد."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            ابدأ مشروعاً
          </Link>
          <Link
            href="/ar/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            أعمالنا
          </Link>
        </div>
      </PageHero>

      {services.length > 0 ? (
        <Section tone="void" className="pt-0">
          <SectionHeading
            eyebrow="الخدمات"
            title={<>كل ما تحتاجه، <span className="text-teal">تحت سقف واحد.</span></>}
            description="تسع كفاءات متخصصة. عقد واحد، مسؤولية واحدة."
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <li key={service.slug}>
                  <Link
                    href={`/ar/services/${service.slug}`}
                    className="group relative block h-full overflow-hidden rounded-xl border border-border-dark bg-surface p-6 transition-all hover:-translate-y-1 hover:border-teal/50"
                  >
                    <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-500 group-hover:scale-x-100" />
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
                        <Icon size={20} />
                      </span>
                      <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-teal" />
                    </div>
                    <h2 className="mt-6 font-display text-h4 font-semibold text-white">
                      {service.nameAr ?? service.name}
                    </h2>
                    <p className="mt-2 text-[14px] text-white/60">
                      {service.shortAr ?? service.short}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Section>
      ) : null}

      {portfolio.length > 0 ? (
        <Section tone="surface">
          <SectionHeading
            eyebrow="أعمال مختارة"
            title={<>مشاريع <span className="text-teal">أطلقناها.</span></>}
            description="دراسات حالة حقيقية مع الأرقام."
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.slice(0, 3).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/ar/portfolio/${c.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border-dark bg-void transition-all hover:-translate-y-1 hover:border-teal/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal/20 via-surface to-void">
                    {c.cover ? (
                      <Image src={c.cover} alt={c.client} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-display text-[48px] font-extrabold text-white/10">
                        {c.client}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-caption uppercase text-muted">{c.industry} · {c.year}</p>
                    <h3 className="mt-2 font-display text-h4 font-semibold text-white">
                      {c.titleAr ?? c.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/ar/portfolio" className="inline-flex items-center gap-2 text-[14px] font-semibold text-teal hover:underline">
              جميع الأعمال <ArrowUpRight size={14} />
            </Link>
          </div>
        </Section>
      ) : null}

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="لماذا نحن"
            title={<>فريق واحد، <span className="text-teal">مسؤولية واحدة.</span></>}
            description="لا تنسيق بين وكالات متعددة. فريق متكامل يملك كل الكفاءات ويُسلّم نتائج حقيقية."
          />
          <ul className="grid grid-cols-2 gap-4">
            {[
              { t: 'بلا حشو', b: 'نطاقات واضحة وأرقام واضحة.' },
              { t: 'تنفيذ كبار', b: 'لا مبتدئين. كل شخص في مشروعك أطلق منتجات حقيقية.' },
              { t: 'تسعير شفاف', b: 'ميزانية محددة مسبقاً. بلا نسب غامضة.' },
              { t: 'مبني للشحن', b: 'نقيس أنفسنا بالنتائج في الإنتاج — لا بالعروض التقديمية.' },
            ].map((v) => (
              <li key={v.t} className="rounded-xl border border-border-dark bg-surface p-5">
                <span className="mb-2 inline-block h-px w-6 bg-teal" />
                <h3 className="font-display text-h4 font-semibold text-white">{v.t}</h3>
                <p className="mt-1 text-[13px] text-white/60">{v.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner
        heading="هل أنت مستعد للبدء؟"
        body="أخبرنا بأهدافك. سنتكفل بالباقي."
        ctaLabel="تواصل معنا"
        ctaHref="/ar/contact"
        secondaryLabel="جميع الخدمات"
        secondaryHref="/ar/services"
      />
    </>
  )
}
