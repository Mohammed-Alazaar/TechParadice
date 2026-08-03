import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { ButtonLink } from '@/components/ui/Button'
import { getArService, getAllServiceSlugs } from '@/lib/services'
import { getArPortfolio } from '@/lib/portfolio'
import { localizePortfolioIndustryAr, localizePortfolioTimelineAr } from '@/lib/i18n/portfolio-ar'
import { SITE_URL, ldJson } from '@/lib/utils'
import { ORG_REF } from '@/lib/schema'
import { buildMetadata, composeDescription } from '@/lib/seo'

export const dynamicParams = true

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = await getArService(params.slug)
  if (!service) return {}
  return buildMetadata({
    title: service.nameAr,
    // Mirrors the English page: both copy fields, clamped to the render budget.
    description: composeDescription(service.shortAr, service.valueAr),
    path: `/ar/services/${service.slug}`,
    alternatePath: `/services/${service.slug}`,
    locale: 'ar',
  })
}

export default async function ArServiceDetailPage({ params }: Params) {
  const [service, portfolio] = await Promise.all([getArService(params.slug), getArPortfolio()])
  if (!service) notFound()

  const Icon = service.icon
  const name = service.nameAr
  const value = service.valueAr
  const short = service.shortAr
  const deliverables = service.deliverablesAr
  const process = service.processAr
  const faqs = service.faqsAr

  const related = (
    await Promise.all(service.pairsWith.map((s) => getArService(s)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s))

  const sampleWork = portfolio.filter((p) =>
    p.services.some((s) =>
      s.toLowerCase().includes(service.name.split(' ')[0].toLowerCase()),
    ),
  )

  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description: value,
      provider: ORG_REF,
      url: `${SITE_URL}/ar/services/${service.slug}`,
      serviceType: name,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_URL}/ar` },
        { '@type': 'ListItem', position: 2, name: 'الخدمات', item: `${SITE_URL}/ar/services` },
        { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}/ar/services/${service.slug}` },
      ],
    },
  ]

  if (faqs.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq: { q: string; a: string }) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <PageHero eyebrow={name} title={value} description={short}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/ar/free-audit" size="lg">اطلب تدقيقك المجاني</ButtonLink>
          <ButtonLink href="/ar/services" variant="secondary" size="lg">استكشف جميع الخدمات</ButtonLink>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
              <Icon size={24} />
            </span>
            <h2 className="mt-6 heading-h2 text-white">ما الذي يمكن أن يشمله العمل؟</h2>
            <p className="mt-3 max-w-md text-white/70">
              نؤكد المخرجات النهائية بعد مراجعة أهدافك ووضعك الحالي والتبعيات والأولويات.
            </p>
          </div>
          {deliverables.length > 0 ? (
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3 rounded-lg border border-border-dark bg-surface p-5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                    <Check size={14} />
                  </span>
                  <span className="text-[15px] text-white/85">{d}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-border-dark bg-surface p-6 text-white/70">
              نحدد المخرجات وفق متطلبات المشروع. تواصل معنا للحصول على نطاق عمل مصمم حول أهدافك.
            </p>
          )}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="آلية التنفيذ"
          title={`كيف ننفذ ${name}`}
          description="نكيّف التسلسل الدقيق وفق نطاق العمل، مع الاتفاق على المسؤوليات ونقاط المراجعة قبل بدء التنفيذ."
        />
        {process.length > 0 ? (
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step} className="rounded-xl border border-border-dark bg-void p-6">
                <span className="font-display text-[28px] font-extrabold text-teal">0{i + 1}</span>
                <h3 className="mt-3 font-display text-h4 font-semibold text-white">{p.step}</h3>
                <p className="mt-2 text-[14px] text-white/60">{p.detail}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 text-void/70 dark:text-white/70">
            نوثق مراحل التنفيذ ونقاط المراجعة في عرض المشروع.
          </p>
        )}
      </Section>

      <Section tone="void">
        <SectionHeading
          eyebrow="الأدوات"
          title="أدوات نختارها وفق متطلبات العمل"
          description="نختار الأدوات وفق متطلبات المشروع وأنظمتك الحالية واحتياجات الأشخاص الذين سيتولون إدارة العمل وصيانته."
        />
        {service.tools.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {service.tools.map((t) => (
              <li
                key={t}
                className="rounded-lg border border-border-dark bg-surface px-4 py-3 text-center font-display text-[15px] font-semibold text-white/60 transition-colors hover:text-white"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-white/70">
            ندرج الأدوات المقترحة ضمن النهج التقني المقدم للمشروع.
          </p>
        )}
      </Section>

      {sampleWork.length > 0 ? (
        <Section tone="surface">
          <SectionHeading eyebrow="نماذج من أعمالنا" title="كيف تبدو الخدمة عند تطبيقها؟" />
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {sampleWork.slice(0, 2).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/ar/work/${c.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border-dark bg-void transition-all hover:-translate-y-1 hover:border-teal/40"
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-teal/20 via-surface to-void">
                    <div className="absolute inset-0 flex items-center justify-center font-display text-[56px] font-extrabold text-white/10">
                      {c.client}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-h4 font-semibold text-white">
                      {c.titleAr ?? c.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-muted">
                      {localizePortfolioIndustryAr(c.industry)} · {localizePortfolioTimelineAr(c.timeline)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {faqs.length > 0 ? (
        <Section tone="void">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeading eyebrow="الأسئلة الشائعة" title={`أسئلة حول ${name}`} />
            <ul className="divide-y divide-border-dark">
              {faqs.map((faq) => (
                <li key={faq.q} className="py-6">
                  <p className="font-display text-[17px] font-semibold text-white">{faq.q}</p>
                  <p className="mt-2 text-[15px] text-white/70">{faq.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section tone="surface">
          <SectionHeading
            eyebrow="خدمات مكملة"
            title="خبرات مرتبطة"
            description={`بحسب أهدافك، قد تستفيد خدمة ${name} أيضًا من:`}
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon
              return (
                <li key={r.slug}>
                  <Link
                    href={`/ar/services/${r.slug}`}
                    className="group flex h-full flex-col justify-between rounded-xl border border-border-dark bg-void p-6 transition-all hover:-translate-y-1 hover:border-teal/40"
                  >
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
                        <RIcon size={18} />
                      </span>
                      <h3 className="mt-5 font-display text-h4 font-semibold text-white">
                        {r.nameAr}
                      </h3>
                      <p className="mt-2 text-[14px] text-white/60">{r.shortAr}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-semibold text-teal">
                      استكشف المشروع <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Section>
      ) : null}

      <CtaBanner
        heading={`هل تخطط لمشروع في ${name}؟`}
        body="شاركنا أهدافك ووضعك الحالي والقيود التي تواجهها، وسنساعدك على تحديد نطاق عملي وخطوة تالية واضحة."
        ctaHref="/ar/contact"
        ctaLabel="ناقش مشروعك"
      />
    </>
  )
}
