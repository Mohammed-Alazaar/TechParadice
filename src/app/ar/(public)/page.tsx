import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Testimonial } from '@/components/sections/Testimonial'
import { getArServices } from '@/lib/services'
import { getArPortfolio } from '@/lib/portfolio'
import { localizePortfolioIndustryAr } from '@/lib/i18n/portfolio-ar'
import { BRAND, SITE_URL, SOCIAL_LINKS } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: `${BRAND.name} | الاستراتيجية والتصميم والنمو الرقمي`,
  description: 'يجمع TechParadice الاستراتيجية والمواقع والتطبيقات وتصميم UI/UX وSEO والمحتوى والتسويق ضمن خطة رقمية واحدة.',
  path: '/ar',
  alternatePath: '/',
  locale: 'ar',
})

export default async function ArHomePage() {
  const [services, portfolio] = await Promise.all([getArServices(), getArPortfolio()])

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND.name,
      url: `${SITE_URL}/ar`,
      logo: `${SITE_URL}/og-image.png`,
      image: `${SITE_URL}/og-image.png`,
      email: BRAND.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      sameAs: SOCIAL_LINKS,
      description:
        'وكالة رقمية متكاملة تقدم تطوير المواقع وتطبيقات iOS وAndroid وتصميم UI/UX وSEO وإدارة وسائل التواصل الاجتماعي وإنتاج المحتوى والإعلانات المدفوعة.',
      knowsLanguage: ['ar', 'en'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: BRAND.email,
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'English'],
      },
      inLanguage: 'ar',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${SITE_URL}/ar`,
      name: BRAND.name,
      inLanguage: 'ar',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: BRAND.name,
      url: `${SITE_URL}/ar`,
      email: BRAND.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      priceRange: '$0 – $5,000+',
      description: 'وكالة رقمية متكاملة لتطوير المواقع والتطبيقات وتصميم UI/UX وSEO والتسويق الرقمي.',
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
        eyebrow="TechParadice"
        title={
          <>
            نحوّل رؤيتك إلى{' '}
            <span className="text-teal">مسار رقمي واضح.</span>
          </>
        }
        description="فريق خبير واحد للمواقع والتطبيقات وSEO ووسائل التواصل الاجتماعي والإعلانات المدفوعة، مع استراتيجية واضحة وتنفيذ شفاف وتواصل مباشر مع المؤسس من المحادثة الأولى حتى الإطلاق والتحسين المستمر."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            اطلب تدقيقك المجاني
          </Link>
          <Link
            href="/ar/work"
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
            title={<>خبرات تغطي كل مرحلة، <span className="text-teal">ضمن فريق واحد.</span></>}
            description="ننسق الاستراتيجية والتصميم والتقنية والتسويق عبر فريق خبير واحد وخطة عمل مترابطة."
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
                      {service.nameAr}
                    </h2>
                    <p className="mt-2 text-[14px] text-white/60">
                      {service.shortAr}
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
            title={<>أعمال مبنية حول <span className="text-teal">أهداف واضحة.</span></>}
            description="دراسات حالة تعرض سياق العمل والتحدي والنهج وما نفذناه والمخرجات المتاحة."
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.slice(0, 3).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/ar/work/${c.slug}`}
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
                    <p className="text-caption uppercase text-muted">
                      {localizePortfolioIndustryAr(c.industry)} ·{' '}
                      {c.year === 'Not publicly disclosed' ? 'غير معلن' : c.year}
                    </p>
                    <h3 className="mt-2 font-display text-h4 font-semibold text-white">
                      {c.titleAr ?? c.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/ar/work" className="inline-flex items-center gap-2 text-[14px] font-semibold text-teal hover:underline">
              جميع الأعمال <ArrowUpRight size={14} />
            </Link>
          </div>
        </Section>
      ) : null}

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="لماذا نحن"
            title={<>فريق واحد، <span className="text-teal">ورؤية متكاملة.</span></>}
            description="بدلًا من تنسيق العمل بين جهات متعددة، تتعامل مع فريق واحد ينسق التخصصات حول خطة وأولويات مشتركة."
          />
          <ul className="grid grid-cols-2 gap-4">
            {[
              { t: 'وضوح منذ البداية', b: 'أهداف ونطاق عمل ومؤشرات نجاح متفق عليها قبل التنفيذ.' },
              { t: 'خبرات متخصصة', b: 'نختار المتخصصين وفق المهارات والخبرة التي يحتاج إليها العمل.' },
              { t: 'تسعير واضح', b: 'ميزانية ونطاق محددان مسبقًا، من دون رسوم مبهمة أو مفاجآت.' },
              { t: 'مصمم للاستخدام الفعلي', b: 'نراجع المخرجات وفق الاحتياجات المتفق عليها ومؤشرات القياس المناسبة.' },
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

      <Testimonial locale="ar" />

      <CtaBanner
        heading="لنحوّل أهدافك إلى خطة واضحة."
        body="شاركنا ما تريد تحقيقه، وسنحدد لك الأولويات والخطوات العملية المناسبة."
        ctaLabel="اطلب تدقيقك المجاني"
        ctaHref="/ar/free-audit"
        secondaryLabel="أعمالنا"
        secondaryHref="/ar/work"
      />
    </>
  )
}
