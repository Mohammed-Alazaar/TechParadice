import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'

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
    description: 'تتنافس الأعمال في دبي في أحد أكثر الأسواق تطوراً رقمياً في العالم. نساعدك على التميز — بمواقع تحمل سريعاً وتتصدر نتائج البحث وتحوّل الزوار.',
    industries: ['restaurants', 'real-estate', 'clinics', 'professional-services', 'b2b-businesses'],
  },
  'abu-dhabi': {
    label: 'Abu Dhabi',
    labelAr: 'أبوظبي',
    country: 'UAE',
    countryAr: 'الإمارات',
    description: 'اقتصاد أبوظبي يتنوع بسرعة. سواء كنت تخدم العملاء الحكوميين أو الضيافة أو المهنيين، نبني الحضور الرقمي الذي يكسب الثقة.',
    industries: ['professional-services', 'clinics', 'manufacturing-industrial', 'b2b-businesses', 'restaurants'],
  },
  riyadh: {
    label: 'Riyadh',
    labelAr: 'الرياض',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    description: 'الرياض في قلب التحول الرقمي لرؤية 2030. نساعد الأعمال السعودية على اقتناص نصيبها من هذا النمو بمواقع ثنائية اللغة وسريعة وجاهزة للسيو.',
    industries: ['restaurants', 'real-estate', 'clinics', 'b2b-businesses', 'professional-services'],
  },
  jeddah: {
    label: 'Jeddah',
    labelAr: 'جدة',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    description: 'طفرة الميناء والسياحة والضيافة في جدة تعني منافسة رقمية شرسة. نبني المواقع والحملات التي تضع عملك أمام الجمهور المناسب.',
    industries: ['restaurants', 'real-estate', 'salons-beauty', 'clinics', 'b2b-businesses'],
  },
  kuwait: {
    label: 'Kuwait City',
    labelAr: 'الكويت',
    country: 'Kuwait',
    countryAr: 'الكويت',
    description: 'سوق الأعمال الصغيرة والمتوسطة في الكويت لم يُخدَم بما يكفي إلكترونياً. نساعد الأعمال المحلية على بناء حضور رقمي ينافس الأفضل في المنطقة.',
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  doha: {
    label: 'Doha',
    labelAr: 'الدوحة',
    country: 'Qatar',
    countryAr: 'قطر',
    description: 'الدوحة بعد 2022 مدينة عالمية في صعود. نساعد الأعمال القطرية على مجاراة طموحها بحضور رقمي يؤدي في كل نقطة تواصل.',
    industries: ['restaurants', 'real-estate', 'professional-services', 'b2b-businesses', 'clinics'],
  },
  muscat: {
    label: 'Muscat',
    labelAr: 'مسقط',
    country: 'Oman',
    countryAr: 'عُمان',
    description: 'الاقتصاد المتنامي وقطاع السياحة في مسقط يعني فرصاً للأعمال المستعدة للاستثمار الرقمي. نساعدك على الوصول أسرع.',
    industries: ['restaurants', 'clinics', 'real-estate', 'professional-services', 'auto-repair'],
  },
  manama: {
    label: 'Manama',
    labelAr: 'المنامة',
    country: 'Bahrain',
    countryAr: 'البحرين',
    description: 'الاقتصاد المفتوح ومركز التقنية المالية يجعلان المنامة من أكثر أسواق دول مجلس التعاون الخليجي ديناميكية. نساعد الأعمال المحلية على المنافسة إلكترونياً.',
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
  'law-firms': 'مكاتب المحامين',
  'salons-beauty': 'الصالونات والتجميل',
  'auto-repair': 'ورش السيارات',
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
    title: `وكالة رقمية في ${meta.labelAr}، ${meta.countryAr}`,
    description: `تك باراديس تبني المواقع والتطبيقات والسيو والسوشيال ميديا والإعلانات المدفوعة للأعمال في ${meta.labelAr}. فريق متمرس واحد. نتائج سريعة.`,
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

  return (
    <>
      <PageHero
        eyebrow={`${meta.labelAr}، ${meta.countryAr}`}
        title={
          <>
            نمو رقمي للأعمال في{' '}
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
            احصل على تدقيق مجاني <ArrowRight size={16} className="rotate-180" />
          </Link>
          <Link
            href="/ar/work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            شاهد أعمالنا
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="الخدمات"
          title={`ما نبنيه لأعمال ${meta.labelAr}`}
          description="كل خدمة متاحة في هذا السوق. نعرف المشهد المحلي ونصمم وفقاً له."
        />
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
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="القطاعات"
          title={`القطاعات التي نخدمها في ${meta.labelAr}`}
          description={`عملنا مع أعمال ${meta.labelAr} في هذه القطاعات.`}
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
        heading={`هل أنت مستعد للنمو في ${meta.labelAr}؟`}
        body="نخدم الأعمال في منطقة دول مجلس التعاون الخليجي. شارك رابطك وأهدافك — سنراجع حضورك الرقمي ونحدد أكبر الفرص المتاحة."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/about"
        secondaryLabel="من نحن"
      />
    </>
  )
}
