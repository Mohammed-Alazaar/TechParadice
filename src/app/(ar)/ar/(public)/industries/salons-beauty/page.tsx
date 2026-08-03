import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'
import { IndustrySchema } from '@/components/seo/PageSchema'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي للصالونات ومراكز التجميل',
  description:
    'تكاملات للحجز، ومحتوى اجتماعي، وSEO محلي، ومواقع، وحملات مدفوعة للصالونات والسبا والاستوديوهات وأنشطة التجميل.',
  path: '/ar/industries/salons-beauty',
  alternatePath: '/industries/salons-beauty',
  locale: 'ar',
})

const services = [
  { title: 'تكامل الحجز الإلكتروني', detail: 'أدوات حجز تتيح للعملاء التحقق من المواعيد المتاحة وطلبها أو جدولتها عبر القنوات الأساسية.' },
  { title: 'محتوى Instagram وTikTok', detail: 'تخطيط للمحتوى وتوجيه إبداعي ونصوص ودعم للنشر، وكلها مصممة حول خدماتك وجمهورك.' },
  { title: 'SEO محلي وGoogle Business Profile', detail: 'ملفات نشاط دقيقة ومحتوى محلي ذو صلة وتحسينات للبحث تساعد على اكتشاف الخدمات القريبة.' },
  { title: 'الحملات الاجتماعية المدفوعة', detail: 'حملات عبر Meta وTikTok منظمة وفق الموقع والجمهور والعرض وإجراءات الحجز القابلة للقياس.' },
  { title: 'مسارات الولاء والإحالة', detail: 'رسائل متابعة وإعادة حجز وإحالة تُستخدم بعد الموافقة، ومصممة لدعم العلاقات المتكررة مع العملاء.' },
  { title: 'تطوير المواقع', detail: 'مواقع سريعة ومتقنة تعرض الخدمات ونماذج الأعمال وإرشادات الأسعار والفروع وخيارات الحجز.' },
]

const results = [
  { value: 'الاكتشاف', label: 'حضور متسق عبر البحث ووسائل التواصل الاجتماعي' },
  { value: 'الحجز', label: 'خدمات ومواعيد وخطوات تالية واضحة' },
  { value: 'العودة', label: 'رحلات مدروسة لإعادة الحجز والإحالة' },
]

export default function ArSalonsBeautyPage() {
  return (
    <>
      <IndustrySchema
        locale="ar"
        path="/industries/salons-beauty"
        name="التسويق الرقمي للصالونات ومراكز التجميل"
        description="تكاملات للحجز، ومحتوى اجتماعي، وSEO محلي، ومواقع، وحملات مدفوعة للصالونات والسبا والاستوديوهات وأنشطة التجميل."
        audience="الصالونات والتجميل"
        crumb="الصالونات والتجميل"
      />
      <PageHero
        eyebrow="الصالونات والتجميل"
        title={
          <>
            سهّل الانتقال من الاكتشاف الرقمي{' '}
            <span className="text-teal">إلى الحجز.</span>
          </>
        }
        description="أنشئ رحلة متسقة عبر منصات التواصل والبحث المحلي وموقعك وأدوات الحجز، ليتمكن العملاء من الاختيار وتحديد الموعد بوضوح."
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
          eyebrow="ما نقدمه للصالونات والتجميل"
          title="اربط الاكتشاف والحجز وإعادة الحجز"
          description="اعرض أعمالك بصورة متسقة، وقلل تعقيد الحجز، وادعم علاقة مستمرة مع العملاء."
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
        heading="هل تريد مساراً أكثر سلاسة من الاكتشاف إلى الحجز؟"
        body="شاركنا موقعك وأولوياتك. سنراجع التجربة الحالية ونحدد فرصاً عملية لتحسينها."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
