import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'الرقمي للتصنيع والصناعة',
  description:
    'كتالوجات المنتجات، بوابات الموزعين، منصات B2B متعددة اللغات وخطوط العملاء للشركات الصناعية والمصنّعين.',
  path: '/ar/industries/manufacturing-industrial',
  alternatePath: '/industries/manufacturing-industrial',
  locale: 'ar',
})

const services = [
  { title: 'مواقع كتالوج المنتجات', detail: 'كتالوجات قابلة للبحث والفلترة مع متغيرات الموديل والملحقات والمواصفات التقنية.' },
  { title: 'بوابات الموزعين', detail: 'بوابات مُؤمَّنة للوصول إلى الأسعار والمخزون وأدوات الضمان.' },
  { title: 'منصات متعددة اللغات', detail: 'دعم 5+ لغات مع تحكم في النشر لكل لغة وعلامات hreflang.' },
  { title: 'أتمتة خط العملاء', detail: 'نماذج استفسار وعروض أسعار وضمانات تُوجَّه للفريق المناسب مع أتمتة بريدية.' },
  { title: 'SEO والمحتوى', detail: 'صفحات منتجات تقنية ومحتوى صناعي محسّن للبحث B2B ذي الذيل الطويل.' },
  { title: 'مساعدو الذكاء الاصطناعي', detail: 'بوتات مدرّبة على كتالوج منتجاتك للإجابة على استفسارات الموزعين والعملاء.' },
]

const results = [
  { value: '5', label: 'لغات مُطلقة (مشروع DragLab)' },
  { value: '18', label: 'نموذج بيانات بدون تبعية على المطور' },
  { value: '6', label: 'سير عمل جذب عملاء مُؤتمتة' },
]

export default function ArManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="التصنيع والصناعة"
        title={
          <>
            منتجات معقدة،{' '}
            <span className="text-teal">حضور رقمي واضح.</span>
          </>
        }
        description="بنينا منصات B2B متعددة اللغات للمصنّعين الذين يحتاجون وصولاً عالمياً وبوابات موزعين وخطوط عملاء يمكن لفرقهم غير التقنية تشغيلها."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            احصل على تدقيق مجاني
          </Link>
          <Link
            href="/ar/work/draglab"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            دراسة حالة DragLab
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
          eyebrow="ما نقدمه للمصنّعين"
          title="مبني لدورات مبيعات طويلة ومشترين عالميين"
          description="مشتروك تقنيون، منتجاتك معقدة، وفريقك يحتاج لتحديث المحتوى دون استدعاء مطور."
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
        heading="مستعد لتحديث حضورك الرقمي B2B؟"
        body="سنراجع إعدادك الحالي ونضع خارطة طريق لمنصة يمكن لفريقك العالمي تشغيلها باستقلالية."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="أعمالنا"
      />
    </>
  )
}
