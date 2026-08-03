import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'
import { BRAND, ldJson } from '@/lib/utils'
import { pageGraph, serviceNode, breadcrumbNode } from '@/lib/schema'

export const revalidate = 86400

type CityMeta = {
  label: string
  labelAr: string
  country: string
  countryAr: string
  description: string
  industries: string[]
}

const CITIES: Record<string, CityMeta> = {
  dubai: {
    label: 'Dubai',
    labelAr: 'دبي',
    country: 'UAE',
    countryAr: 'الإمارات',
    description: 'نساعد الشركات في دبي على تحسين طريقة عثور العملاء عليها وفهمهم لما تقدمه وتفاعلهم معها عبر الإنترنت، من خلال استراتيجية واضحة وتصميم متقن وتقنيات موثوقة.',
    industries: ['restaurants', 'real-estate', 'clinics', 'professional-services', 'b2b-businesses'],
  },
  'abu-dhabi': {
    label: 'Abu Dhabi',
    labelAr: 'أبوظبي',
    country: 'UAE',
    countryAr: 'الإمارات',
    description: 'نساعد المؤسسات في أبوظبي على عرض خدماتها بوضوح، وبناء الثقة عبر الإنترنت، وتسهيل انتقال العملاء من الاهتمام إلى التواصل.',
    industries: ['professional-services', 'clinics', 'manufacturing-industrial', 'b2b-businesses', 'restaurants'],
  },
  riyadh: {
    label: 'Riyadh',
    labelAr: 'الرياض',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    description: 'نساعد الشركات في الرياض على بناء تجارب رقمية واضحة وثنائية اللغة، مصممة لتناسب الجمهور المحلي وأولويات العمل القابلة للقياس.',
    industries: ['restaurants', 'real-estate', 'clinics', 'b2b-businesses', 'professional-services'],
  },
  jeddah: {
    label: 'Jeddah',
    labelAr: 'جدة',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    description: 'نساعد الشركات في جدة على تنسيق المواقع والمحتوى وSEO والحملات ضمن رحلة عميل متسقة.',
    industries: ['restaurants', 'real-estate', 'salons-beauty', 'clinics', 'b2b-businesses'],
  },
  kuwait: {
    label: 'Kuwait City',
    labelAr: 'الكويت',
    country: 'Kuwait',
    countryAr: 'الكويت',
    description: 'نساعد الشركات في مدينة الكويت على إنشاء تجارب رقمية احترافية تسهّل العثور على عروضها وتقييمها واتخاذ الخطوة التالية.',
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  doha: {
    label: 'Doha',
    labelAr: 'الدوحة',
    country: 'Qatar',
    countryAr: 'قطر',
    description: 'نساعد الشركات في الدوحة على تحسين حضورها الرقمي عبر المواقع وSEO والمحتوى والحملات، وفق خطة تُصاغ حول أهدافها.',
    industries: ['restaurants', 'real-estate', 'professional-services', 'b2b-businesses', 'clinics'],
  },
  muscat: {
    label: 'Muscat',
    labelAr: 'مسقط',
    country: 'Oman',
    countryAr: 'عُمان',
    description: 'نساعد الشركات في مسقط على تحويل الاستثمار الرقمي إلى رحلة عميل أوضح، من الاكتشاف والتقييم إلى التواصل أو الحجز.',
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  manama: {
    label: 'Manama',
    labelAr: 'المنامة',
    country: 'Bahrain',
    countryAr: 'البحرين',
    description: 'نساعد الشركات في المنامة على توضيح عروضها وتعزيز ظهورها عبر الإنترنت وتسهيل الخطوة التالية على العملاء المناسبين.',
    industries: ['professional-services', 'restaurants', 'b2b-businesses', 'clinics', 'real-estate'],
  },
}

const INDUSTRY_LABELS: Record<string, string> = {
  restaurants: 'المطاعم',
  'real-estate': 'العقارات',
  clinics: 'العيادات والرعاية الصحية',
  'professional-services': 'الخدمات المهنية',
  'manufacturing-industrial': 'التصنيع والصناعة',
  'b2b-businesses': 'شركات B2B',
  'law-firms': 'مكاتب المحاماة',
  'salons-beauty': 'الصالونات والتجميل',
  'auto-repair': 'ورش صيانة السيارات',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const meta = CITIES[city]
  if (!meta) return {}

  return buildMetadata({
    title: `شركة خدمات رقمية في ${meta.labelAr}، ${meta.countryAr}`,
    description: `تقدم TechParadice خدمات تطوير المواقع وتطبيقات الجوال وUI/UX وSEO والمحتوى وإدارة منصات التواصل الاجتماعي والحملات المدفوعة للشركات في ${meta.labelAr}.`,
    path: `/ar/in/${city}`,
    alternatePath: `/in/${city}`,
    locale: 'ar',
  })
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }))
}

export default async function ArCityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const meta = CITIES[city]
  if (!meta) notFound()

  const services = await getServices()

  // Mirrors the English city page. The Service name stays partly Latin because
  // the brand entity is Latin-script in both locales; areaServed uses the
  // Arabic place names so the node matches the page's own copy.
  const jsonLd = pageGraph(
    serviceNode({
      locale: 'ar',
      pagePath: `/in/${city}`,
      name: `خدمات رقمية في ${meta.labelAr} — ${BRAND.name}`,
      description: meta.description,
      serviceType: 'Digital agency services',
      areaServed: { name: meta.labelAr, type: 'City', containedIn: meta.countryAr },
    }),
    breadcrumbNode('ar', `/in/${city}`, [
      [`${meta.labelAr}، ${meta.countryAr}`, `/in/${city}`],
    ]),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <PageHero
        eyebrow={`${meta.labelAr}، ${meta.countryAr}`}
        title={
          <>
            دعم النمو الرقمي للشركات في{' '}
            <span className="text-teal">{meta.labelAr}.</span>
          </>
        }
        description={meta.description}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            اطلب تدقيقاً مجانياً <ArrowRight size={16} className="rotate-180" />
          </Link>
          <Link
            href="/ar/work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            اطّلع على أعمالنا
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="الخدمات"
          title={`خدمات رقمية للشركات في ${meta.labelAr}`}
          description="اختر خدمة محددة أو اجمع عدة تخصصات ضمن خطة واحدة منسقة، تُصاغ وفق جمهورك وأهدافك وسياق عملك."
        />
        {services.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <li key={service.slug}>
                  <Link
                    href={`/ar/services/${service.slug}`}
                    className="group flex items-start gap-4 rounded-xl border border-border-dark bg-surface p-5 transition-all hover:border-teal/50"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-display text-[15px] font-semibold text-white">{service.nameAr ?? service.name}</p>
                      <p className="mt-0.5 text-[13px] text-white/50">{service.shortAr ?? service.short}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="mt-8 rounded-xl border border-border-dark bg-surface p-6 text-white/70">
            نعمل على تحديث تفاصيل الخدمات. تواصل معنا لمناقشة الخدمات المناسبة لأهدافك في{' '}
            {meta.labelAr}.
          </p>
        )}
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="القطاعات"
          title={`قطاعات ذات صلة في ${meta.labelAr}`}
          description="استكشف أمثلة على كيفية تكييف قدراتنا مع رحلات عملاء ونماذج أعمال مختلفة."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {meta.industries.map((ind) => (
            <li key={ind}>
              <Link
                href={`/ar/industries/${ind}`}
                className="group flex items-center justify-between rounded-xl border border-border-light bg-white p-5 transition-all hover:border-teal/40 dark:border-border-dark dark:bg-void"
              >
                <span className="font-display text-[15px] font-semibold text-void group-hover:text-teal dark:text-white">
                  {INDUSTRY_LABELS[ind] ?? ind}
                </span>
                <ArrowRight size={15} className="rotate-180 text-muted transition-colors group-hover:text-teal" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading={`هل تخطط لمبادرتك الرقمية التالية في ${meta.labelAr}؟`}
        body="شاركنا رابط موقعك وأهدافك والقيود الحالية. سنراجع الفرصة ونوصي بنقطة بداية عملية."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/about"
        secondaryLabel="من نحن"
      />
    </>
  )
}
