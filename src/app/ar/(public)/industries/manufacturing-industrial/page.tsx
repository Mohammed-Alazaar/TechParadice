import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'الحلول الرقمية لشركات التصنيع والصناعة',
  description:
    'كتالوجات منتجات، وبوابات للموزعين، ومواقع B2B متعددة اللغات، ومسارات للاستفسارات، وSEO، ومساعدات AI للمصنّعين والشركات الصناعية.',
  path: '/ar/industries/manufacturing-industrial',
  alternatePath: '/industries/manufacturing-industrial',
  locale: 'ar',
})

const services = [
  { title: 'مواقع وكتالوجات المنتجات', detail: 'كتالوجات قابلة للبحث والتصفية، تعرض تنويعات الطرازات والملحقات والاستخدامات والمواصفات التقنية.' },
  { title: 'بوابات الوكلاء والموزعين', detail: 'بوابات آمنة تتيح للمستخدمين المعتمدين الوصول إلى الأسعار والمخزون والوثائق وأدوات الخدمة ذات الصلة.' },
  { title: 'منصات متعددة اللغات', detail: 'نشر منظم بلغات متعددة، مع ضوابط على مستوى كل لغة وتطبيق مناسب لعلامات hreflang.' },
  { title: 'أتمتة مسارات الاستفسارات', detail: 'توجيه طلبات عروض الأسعار والمنتجات والخدمة والضمان إلى الفريق المناسب، مع إشعارات مهيأة.' },
  { title: 'SEO والمحتوى الصناعي', detail: 'معلومات تقنية عن المنتجات ومحتوى صناعي، منظمان وفق عمليات بحث B2B محددة وأسئلة المشترين.' },
  { title: 'مساعدات بتقنيات AI', detail: 'مساعدات خاضعة لضوابط واضحة وتستند إلى معلومات المنتجات المعتمدة للإجابة عن الأسئلة الشائعة للوكلاء والعملاء.' },
]

const results = [
  { value: '5', label: 'لغات تدعمها منصة DragLab' },
  { value: '18', label: 'نموذجاً منظماً للبيانات في المشروع' },
  { value: '6', label: 'مسارات مهيأة للاستفسارات والخدمة' },
]

export default function ArManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="التصنيع والصناعة"
        title={
          <>
            اجعل المنتجات المعقدة{' '}
            <span className="text-teal">أسهل في العثور عليها وتقييمها.</span>
          </>
        }
        description="نصمم منصات B2B وكتالوجات وبوابات ومسارات للاستفسارات بلغات متعددة، تناسب المصنّعين ذوي المنتجات التقنية والفرق الموزعة."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            اطلب تدقيقاً مجانياً
          </Link>
          <Link
            href="/ar/work/draglab-germany"
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
          title="ادعم المشترين التقنيين والفرق الموزعة"
          description="نظّم معلومات المنتجات التفصيلية بوضوح، ووفر للفرق المخولة أدوات عملية لإدارة المحتوى والاستفسارات."
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
        heading="هل تخطط لمنصة رقمية صناعية أكثر قوة؟"
        body="شاركنا إعدادك الحالي وهيكل المنتجات ومتطلبات الفريق. سنرتب أولويات مرحلة تالية عملية."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
