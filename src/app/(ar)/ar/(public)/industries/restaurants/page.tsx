import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'
import { IndustrySchema } from '@/components/seo/PageSchema'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي للمطاعم',
  description:
    'قوائم طعام متوافقة مع الجوال، ومسارات للحجز، وSEO محلي، ومنصات تواصل، وحملات مدفوعة للمطاعم.',
  path: '/ar/industries/restaurants',
  alternatePath: '/industries/restaurants',
  locale: 'ar',
})

const services = [
  { title: 'قوائم الطعام والطلب الإلكتروني', detail: 'قوائم سريعة ومتوافقة مع الجوال، مع إمكانية ربطها بخدمات الطلب والتوصيل عند الحاجة.' },
  { title: 'SEO محلي', detail: 'تحسين Google Business Profile ودقة بيانات النشاط ومحتوى بحث ذي صلة بالموقع الجغرافي.' },
  { title: 'إدارة منصات التواصل', detail: 'تخطيط المحتوى والتوجيه الإبداعي ودعم النشر وإرشادات إدارة التفاعل.' },
  { title: 'مسارات الحجز', detail: 'أدوات حجز متكاملة تعرض المواعيد المتاحة بوضوح، مع خيارات للتأكيد والتذكير.' },
  { title: 'الحملات المدفوعة', detail: 'حملات عبر Meta وGoogle منظمة وفق الموقع ونية البحث والتوقيت والإجراءات القابلة للقياس.' },
  { title: 'تطوير المواقع', detail: 'مواقع سريعة تراعي إتاحة الوصول، وتسهّل استخدام القوائم والعثور على الفروع وساعات العمل وخيارات الحجز.' },
]

const results = [
  { value: 'العثور', label: 'على معلومات دقيقة في البحث وGoogle Maps' },
  { value: 'الاختيار', label: 'عبر قوائم طعام ومواقع ومعلومات واضحة' },
  { value: 'الحجز', label: 'من خلال تجربة سهلة للحجز والطلب' },
]

export default function ArRestaurantsPage() {
  return (
    <>
      <IndustrySchema
        locale="ar"
        path="/industries/restaurants"
        name="التسويق الرقمي للمطاعم"
        description="قوائم طعام متوافقة مع الجوال، ومسارات للحجز، وSEO محلي، ومنصات تواصل، وحملات مدفوعة للمطاعم."
        audience="المطاعم"
        crumb="المطاعم"
      />
      <PageHero
        eyebrow="المطاعم"
        title={
          <>
            اجعل الاكتشاف المحلي مساراً واضحاً نحو{' '}
            <span className="text-teal">الحجز والطلب.</span>
          </>
        }
        description="اجمع قائمة الطعام وبيانات الموقع والحجوزات والمحتوى والحملات في رحلة رقمية واضحة للضيوف."
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
          eyebrow="ما نقدمه للمطاعم"
          title="ادعم الرحلة من البحث إلى الطاولة"
          description="سهّل على الضيوف العثور على مطعمك والتأكد من المعلومات المهمة والحجز أو الطلب من أي جهاز."
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
        heading="هل تريد مساراً أوضح من الاكتشاف إلى الحجز؟"
        body="شاركنا رابط موقع مطعمك وأهدافك. سنراجع الرحلة الحالية ونرتب التحسينات العملية حسب الأولوية."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
