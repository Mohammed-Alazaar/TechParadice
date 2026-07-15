import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي للعقارات',
  description:
    'مواقع للعقارات، ومسارات للاستفسارات، وتكامل مع CRM، وSEO، وحملات مدفوعة للوكلاء والمطورين والشركات العقارية.',
  path: '/ar/industries/real-estate',
  alternatePath: '/industries/real-estate',
  locale: 'ar',
})

const services = [
  { title: 'مواقع العقارات', detail: 'قوائم عقارية قابلة للبحث، مع مرشحات مفيدة وخرائط وتفاصيل واضحة وخيارات للاستفسار.' },
  { title: 'مسارات جمع الاستفسارات', detail: 'صفحات هبوط مركزة ونماذج تجمع المعلومات التي يحتاج إليها فريق المبيعات.' },
  { title: 'تكامل CRM', detail: 'توجيه الاستفسارات إلى HubSpot أو Salesforce أو نظام CRM متوافق لتمكين المتابعة في الوقت المناسب.' },
  { title: 'الحملات المدفوعة', detail: 'حملات عبر Meta وGoogle منظمة وفق الموقع والجمهور ونية البحث ونوع العقار.' },
  { title: 'SEO والمحتوى', detail: 'أدلة للمناطق ومعلومات عن السوق ومحتوى للعقارات وبيانات منظمة تدعم الظهور في البحث.' },
  { title: 'تصميم UI/UX', detail: 'رحلات واضحة للعقارات والمشروعات، مصممة للمقارنة وإعداد القوائم المختصرة وتقديم الاستفسارات.' },
]

const results = [
  { value: 'الاكتشاف', label: 'عقارات قابلة للبحث ومحتوى مفيد عن السوق' },
  { value: 'التأهيل', label: 'نماذج استفسار متوافقة مع احتياجات المبيعات' },
  { value: 'المتابعة', label: 'ربط CRM وتوجيه الفرص إلى الفريق المناسب' },
]

export default function ArRealEstatePage() {
  return (
    <>
      <PageHero
        eyebrow="العقارات"
        title={
          <>
            سهّل اكتشاف العقارات{' '}
            <span className="text-teal">واتخاذ الخطوة التالية.</span>
          </>
        }
        description="اربط البحث عن العقارات والمحتوى والحملات والاستفسارات ومسارات CRM، ليتمكن فريقك من التركيز على الفرص ذات الصلة."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            اطلب تدقيقاً مجانياً
          </Link>
          <Link
            href="/ar/industries"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            جميع القطاعات
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {results.map((r) => (
            <li key={r.label} className="rounded-2xl border border-border-dark bg-surface p-8">
              <p className="font-display text-[48px] font-extrabold leading-none text-teal">{r.value}</p>
              <p className="mt-3 text-[13px] uppercase tracking-[1.5px] text-muted">{r.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="ما نقدمه لقطاع العقارات"
          title="اربط القوائم العقارية والاستفسارات والمتابعة"
          description="أنشئ رحلة مترابطة للمشترين والمستأجرين والبائعين ولفريق المبيعات الداخلي."
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="flex gap-3 rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                <Check size={14} />
              </span>
              <div>
                <h3 className="font-display text-[16px] font-semibold text-void dark:text-white">{s.title}</h3>
                <p className="mt-1 text-[13px] text-void/60 dark:text-white/60">{s.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading="هل تريد تحسين رحلة الاستفسار عن العقارات؟"
        body="شاركنا موقعك وأهدافك التجارية. سنراجع التجربة الحالية ونحدد التحسينات الأعلى أولوية."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
