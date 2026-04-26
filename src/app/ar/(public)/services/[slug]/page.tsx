import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { ButtonLink } from '@/components/ui/Button'
import { getService, getAllServiceSlugs } from '@/lib/services'
import { getArPortfolio } from '@/lib/portfolio'
import { SITE_URL } from '@/lib/utils'

export const dynamicParams = true

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = await getService(params.slug)
  if (!service) return {}
  return {
    title: `${service.nameAr ?? service.name} | TechParadice`,
    description: service.valueAr ?? service.value,
    alternates: { canonical: `${SITE_URL}/ar/services/${service.slug}` },
    openGraph: { locale: 'ar_SA' },
  }
}

export default async function ArServiceDetailPage({ params }: Params) {
  const [service, portfolio] = await Promise.all([getService(params.slug), getArPortfolio()])
  if (!service) notFound()

  const Icon = service.icon
  const name = service.nameAr ?? service.name
  const value = service.valueAr ?? service.value
  const short = service.shortAr ?? service.short
  const deliverables = service.deliverablesAr && service.deliverablesAr.length > 0
    ? service.deliverablesAr
    : service.deliverables
  const process = service.processAr && service.processAr.length > 0
    ? service.processAr
    : service.process
  const faqs = service.faqsAr && service.faqsAr.length > 0
    ? service.faqsAr
    : service.faqs

  const related = (
    await Promise.all(service.pairsWith.map((s) => getService(s)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s))

  const sampleWork = portfolio.filter((p) =>
    p.services.some((s) =>
      s.toLowerCase().includes(service.name.split(' ')[0].toLowerCase()),
    ),
  )

  return (
    <>
      <PageHero eyebrow={name} title={value} description={short}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/ar/contact" size="lg">ابدأ مشروعاً</ButtonLink>
          <ButtonLink href="/ar/services" variant="secondary" size="lg">جميع الخدمات</ButtonLink>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
              <Icon size={24} />
            </span>
            <h2 className="mt-6 heading-h2 text-white">ما يشمله العمل</h2>
            <p className="mt-3 max-w-md text-white/70">
              مجموعة محددة وشفافة من المخرجات — تُعدَّل وفق أهدافك عند الانطلاق.
            </p>
          </div>
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
        </div>
      </Section>

      {process.length > 0 ? (
        <Section tone="surface">
          <SectionHeading eyebrow="العملية" title={`كيف تسير مشاركة ${name}`} />
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step} className="rounded-xl border border-border-dark bg-void p-6">
                <span className="font-display text-[28px] font-extrabold text-teal">0{i + 1}</span>
                <h3 className="mt-3 font-display text-h4 font-semibold text-white">{p.step}</h3>
                <p className="mt-2 text-[14px] text-white/60">{p.detail}</p>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      <Section tone="void">
        <SectionHeading eyebrow="الأدوات" title="الأدوات التي نستخدمها" />
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
      </Section>

      {sampleWork.length > 0 ? (
        <Section tone="surface">
          <SectionHeading eyebrow="نماذج من الأعمال" title={`${name} في التطبيق`} />
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {sampleWork.slice(0, 2).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/ar/portfolio/${c.slug}`}
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
                    <p className="mt-2 text-[14px] text-muted">{c.industry} · {c.timeline}</p>
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
            <SectionHeading eyebrow="الأسئلة الشائعة" title={`حول ${name}`} />
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
            eyebrow="اقرنها بـ"
            title="خدمات تعمل معاً بشكل أفضل"
            description={`عملاء ${name} يضيفون في الغالب:`}
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
                        {r.nameAr ?? r.name}
                      </h3>
                      <p className="mt-2 text-[14px] text-white/60">{r.shortAr ?? r.short}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-semibold text-teal">
                      استكشف <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Section>
      ) : null}

      <CtaBanner heading={`هل أنت مستعد لتطوير ${name}؟`} ctaHref="/ar/contact" ctaLabel="تواصل معنا" />
    </>
  )
}
