import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'القطاعات التي نخدمها',
  description: 'تك باراديس تبني منتجات رقمية للمطاعم والعقارات والعيادات والخدمات المهنية والتصنيع وشركات B2B ومكاتب المحامين والصالونات وورش السيارات.',
  path: '/ar/industries',
  alternatePath: '/industries',
  locale: 'ar',
})

const localBusiness = [
  {
    href: '/ar/industries/restaurants',
    title: 'المطاعم',
    description: 'قوائم طعام إلكترونية، أنظمة حجز، سيو محلي، وسوشيال ميديا — كل ما يحتاجه المطعم العصري لملء الطاولات.',
    tags: ['سيو محلي', 'الطلب الإلكتروني', 'السوشيال ميديا'],
  },
  {
    href: '/ar/industries/real-estate',
    title: 'العقارات',
    description: 'مواقع قوائم عقارية، تكامل CRM، مسارات استقطاب العملاء، وإعلانات مدفوعة تجلب المشترين والمستأجرين الجادين.',
    tags: ['بوابات القوائم', 'استقطاب العملاء', 'الإعلانات المدفوعة'],
  },
  {
    href: '/ar/industries/clinics',
    title: 'العيادات والرعاية الصحية',
    description: 'أنظمة حجز، مراجعات المرضى، سيو محلي، ومحتوى بناء الثقة للعيادات الطبية وعيادات الأسنان ومقدمي الرعاية الصحية.',
    tags: ['أنظمة الحجز', 'السيو الطبي', 'إدارة التقييمات'],
  },
  {
    href: '/ar/industries/professional-services',
    title: 'الخدمات المهنية',
    description: 'مواقع سلطة، SEO، أتمتة الاستقبال، ومسارات عملاء للمحامين والاستشاريين ومكاتب المحاسبة.',
    tags: ['مواقع السلطة', 'مسارات العملاء', 'القيادة الفكرية'],
  },
  {
    href: '/ar/industries/salons-beauty',
    title: 'الصالونات والتجميل',
    description: 'تكاملات حجز ومحتوى إنستغرام وسيو محلي وإعلانات سوشيال تملأ كراسيك.',
    tags: ['الحجز الإلكتروني', 'إنستغرام وتيك توك', 'سيو محلي'],
  },
  {
    href: '/ar/industries/auto-repair',
    title: 'ورش السيارات',
    description: 'سيو محلي وإعلانات Google وإدارة تقييمات وأنظمة حجز حتى يجدك السائقون أولاً.',
    tags: ['سيو محلي', 'إعلانات Google', 'إدارة التقييمات'],
  },
]

const b2bIndustrial = [
  {
    href: '/ar/industries/manufacturing-industrial',
    title: 'التصنيع والصناعة',
    description: 'كتالوجات منتجات، بوابات موزعين، مواقع B2B متعددة اللغات، ومسارات عملاء مبنية لدورات بيع طويلة.',
    tags: ['كتالوجات المنتجات', 'متعدد اللغات', 'بوابات B2B'],
  },
  {
    href: '/ar/industries/b2b-businesses',
    title: 'شركات B2B',
    description: 'تسويق قائم على الحسابات، توليد عملاء محتملين، أتمتة بمساعدة الذكاء الاصطناعي، ولوحات تحليلات مرتبطة بالإيراد.',
    tags: ['قائم على الحسابات', 'توليد عملاء', 'الأتمتة بالذكاء الاصطناعي'],
  },
  {
    href: '/ar/industries/law-firms',
    title: 'مكاتب المحامين',
    description: 'مواقع سلطة، سيو قانوني، إعلانات Google، وأتمتة استقبال تحوّل البحوث إلى استشارات.',
    tags: ['مواقع السلطة', 'السيو القانوني', 'أتمتة الاستقبال'],
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
            مبني لنوع{' '}
            <span className="text-teal">عملك.</span>
          </>
        }
        description="أطلقنا منتجات رقمية عبر تسعة قطاعات تتباين في دورات الشراء والمتطلبات وتوقعات العملاء. نعرف ما ينجح — وما يُهدر الميزانية."
      />

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="الأعمال المحلية"
          title="خدمة مجتمعك عبر الإنترنت"
          description="حضور محلي، بصمة احترافية. نساعد الأعمال التقليدية على الفوز رقمياً."
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
          title="منتجات معقدة، حضور رقمي واضح"
          description="دورات بيع أطول، مشترون تقنيون، وانتشار عالمي — أطلقناها جميعاً."
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
        heading="لست متأكدًا من الفئة المناسبة؟"
        body="أخبرنا بطبيعة عملك. سنحدد الخدمات المناسبة في تدقيق مجاني."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="شاهد أعمالنا"
      />
    </>
  )
}
