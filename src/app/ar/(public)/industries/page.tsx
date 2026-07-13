import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'القطاعات التي نخدمها | TechParadice',
  description: 'تك باراديس تبني منتجات رقمية للمطاعم والعقارات والتصنيع وشركات B2B.',
  alternates: { canonical: `${SITE_URL}/ar/industries` },
  openGraph: { locale: 'ar_SA' },
}

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
]

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
        description="أطلقنا منتجات رقمية عبر قطاعات مختلفة تتباين في دورات الشراء والمتطلبات وتوقعات العملاء. نعرف ما ينجح — وما يُهدر الميزانية."
      />

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="الأعمال المحلية"
          title="خدمة مجتمعك عبر الإنترنت"
          description="حضور محلي، بصمة احترافية. نساعد الأعمال التقليدية على الفوز رقمياً."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {localBusiness.map((ind) => (
            <li key={ind.href}>
              <Link
                href={ind.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:-translate-y-1 hover:border-teal/40"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h2 className="font-display text-h3 font-semibold text-white">{ind.title}</h2>
                    <ArrowUpRight size={20} className="text-muted transition-colors group-hover:text-teal" />
                  </div>
                  <p className="mt-4 text-[15px] text-white/70">{ind.description}</p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {ind.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border-dark px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
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
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {b2bIndustrial.map((ind) => (
            <li key={ind.href}>
              <Link
                href={ind.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border-light bg-white p-8 transition-all hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-void"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h2 className="font-display text-h3 font-semibold text-void dark:text-white">{ind.title}</h2>
                    <ArrowUpRight size={20} className="text-muted transition-colors group-hover:text-teal" />
                  </div>
                  <p className="mt-4 text-[15px] text-void/70 dark:text-white/70">{ind.description}</p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {ind.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border-light px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted dark:border-border-dark">
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
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
