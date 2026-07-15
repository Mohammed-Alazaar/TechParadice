import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'القطاعات التي نخدمها',
  description: 'استكشف خدمات الاستراتيجية الرقمية والمواقع وSEO والمحتوى والحملات والأتمتة، المصممة لتناسب تسعة قطاعات محلية ومهنية وB2B.',
  path: '/ar/industries',
  alternatePath: '/industries',
  locale: 'ar',
})

const localBusiness = [
  {
    href: '/ar/industries/restaurants',
    title: 'المطاعم',
    description: 'قوائم طعام متوافقة مع الجوال، ومسارات للحجز، وSEO محلي، ومنصات تواصل مصممة وفق طريقة اكتشاف الضيوف للمطاعم واختيارهم لها.',
    tags: ['SEO محلي', 'الطلب الإلكتروني', 'منصات التواصل'],
  },
  {
    href: '/ar/industries/real-estate',
    title: 'العقارات',
    description: 'مواقع للعقارات، وتكامل مع CRM، ومسارات للاستفسارات، وحملات موجهة للمشترين والمستأجرين والبائعين.',
    tags: ['منصات العقارات', 'جمع الاستفسارات', 'الإعلانات المدفوعة'],
  },
  {
    href: '/ar/industries/clinics',
    title: 'العيادات والرعاية الصحية',
    description: 'مسارات لحجز المواعيد، وSEO محلي، ودعم للسمعة، ومعلومات واضحة للمرضى في العيادات ومنشآت الرعاية الصحية.',
    tags: ['حجز المواعيد', 'SEO طبي', 'إدارة التقييمات'],
  },
  {
    href: '/ar/industries/professional-services',
    title: 'الخدمات المهنية',
    description: 'مواقع موثوقة، واستراتيجية للبحث، ومحتوى، ومسارات للاستفسارات تناسب الاستشاريين والمحاسبين والمستشارين وغيرهم من المتخصصين.',
    tags: ['مواقع احترافية', 'مسارات الاستفسار', 'محتوى متخصص'],
  },
  {
    href: '/ar/industries/salons-beauty',
    title: 'الصالونات والتجميل',
    description: 'تكاملات للحجز، ومحتوى اجتماعي، وSEO محلي، وحملات مدفوعة تسهّل اكتشاف الصالونات وحجز خدماتها.',
    tags: ['الحجز الإلكتروني', 'Instagram وTikTok', 'SEO محلي'],
  },
  {
    href: '/ar/industries/auto-repair',
    title: 'ورش السيارات',
    description: 'SEO محلي، وحملات بحث، ودعم للسمعة، ومسارات للحجز تناسب الورش ومراكز خدمات السيارات.',
    tags: ['SEO محلي', 'إعلانات Google', 'إدارة التقييمات'],
  },
]

const b2bIndustrial = [
  {
    href: '/ar/industries/manufacturing-industrial',
    title: 'التصنيع والصناعة',
    description: 'كتالوجات منتجات، وبوابات للموزعين، ومواقع B2B متعددة اللغات، ومسارات للاستفسارات تناسب المنتجات المعقدة ودورات البيع الأطول.',
    tags: ['كتالوجات المنتجات', 'منصات متعددة اللغات', 'بوابات B2B'],
  },
  {
    href: '/ar/industries/b2b-businesses',
    title: 'شركات B2B',
    description: 'حملات موجهة للحسابات، ومسارات لتوليد العملاء المحتملين، وأتمتة مسؤولة، وتحليلات مصممة لدعم قرارات مسار المبيعات.',
    tags: ['التركيز على الحسابات', 'توليد العملاء المحتملين', 'استخدام مسؤول لـ AI'],
  },
  {
    href: '/ar/industries/law-firms',
    title: 'مكاتب المحاماة',
    description: 'مواقع تركز على الثقة، وSEO قانوني، وحملات بحث، ومسارات منظمة للاستفسارات تناسب مكاتب المحاماة والممارسات القانونية.',
    tags: ['مواقع مكاتب المحاماة', 'SEO قانوني', 'مسارات الاستفسارات'],
  },
]

function IndustryCard({
  href,
  title,
  description,
  tags,
  light = false,
}: {
  href: string
  title: string
  description: string
  tags: string[]
  light?: boolean
}) {
  const cardCls = light
    ? 'group flex h-full flex-col justify-between rounded-2xl border border-border-light bg-white p-8 transition-all hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-void'
    : 'group flex h-full flex-col justify-between rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:-translate-y-1 hover:border-teal/40'
  const titleCls = light
    ? 'font-display text-h3 font-semibold text-void dark:text-white'
    : 'font-display text-h3 font-semibold text-white'
  const descCls = light
    ? 'mt-4 text-[15px] text-void/70 dark:text-white/70'
    : 'mt-4 text-[15px] text-white/70'
  const tagCls = light
    ? 'rounded-full border border-border-light px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted dark:border-border-dark'
    : 'rounded-full border border-border-dark px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted'

  return (
    <Link href={href} className={cardCls}>
      <div>
        <div className="flex items-start justify-between">
          <h2 className={titleCls}>{title}</h2>
          <ArrowUpRight size={20} className="text-muted transition-colors group-hover:text-teal" />
        </div>
        <p className={descCls}>{description}</p>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className={tagCls}>{t}</li>
        ))}
      </ul>
    </Link>
  )
}

export default function ArIndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="القطاعات"
        title={
          <>
            خدمات رقمية تراعي{' '}
            <span className="text-teal">طريقة عمل شركتك.</span>
          </>
        }
        description="تختلف رحلات العملاء ودورات الشراء والقيود التشغيلية من قطاع إلى آخر، لذلك نكيّف الاستراتيجية والمحتوى والتقنية وفقاً لذلك."
      />

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="الأعمال المحلية"
          title="سهّل اكتشاف نشاطك محلياً"
          description="ساعد العملاء القريبين على العثور على معلومات دقيقة وفهم ما تقدمه واتخاذ الخطوة التالية بقدر أقل من التعقيد."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localBusiness.map((ind) => (
            <li key={ind.href} className="flex">
              <IndustryCard {...ind} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="B2B والصناعة"
          title="منتجات معقدة وحضور رقمي واضح"
          description="ادعم المشترين المتخصصين ودورات البيع الأطول بمحتوى مفيد ومسارات منظمة وآليات قابلة للقياس لمعالجة الاستفسارات."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {b2bIndustrial.map((ind) => (
            <li key={ind.href} className="flex">
              <IndustryCard {...ind} light />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading="لست متأكداً أي قطاع يناسب عملك؟"
        body="أخبرنا عن عملائك وأهدافك ووضعك الحالي. سنوصي بالخدمات الأكثر صلة ونقطة بداية عملية."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
