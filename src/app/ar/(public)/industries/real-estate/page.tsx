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
    'بوابات قوائم العقارات، قمع جذب العملاء، تكامل CRM وإعلانات مدفوعة لوكلاء ووكالات العقارات.',
  path: '/ar/industries/real-estate',
  alternatePath: '/industries/real-estate',
  locale: 'ar',
})

const services = [
  { title: 'بوابات قوائم العقارات', detail: 'مواقع بحث عقاري مع فلاتر وخرائط ونماذج استفسار.' },
  { title: 'قمع جذب العملاء', detail: 'صفحات هبوط ونماذج مُهندسة لتحويل الزوار إلى عملاء مؤهلين.' },
  { title: 'تكامل CRM', detail: 'إرسال العملاء مباشرة إلى CRM الخاص بك — HubSpot أو Salesforce أو مخصص.' },
  { title: 'الإعلانات المدفوعة', detail: 'إعلانات Facebook وInstagram وGoogle مستهدفة حسب الموقع والنية.' },
  { title: 'SEO والمحتوى', detail: 'أدلة الأحياء وتقارير السوق والبيانات المنظمة لنتائج بحث غنية.' },
  { title: 'تصميم UI/UX', detail: 'صفحات تفاصيل العقار مصممة للإبقاء على الانتباه وتحفيز الاستفسار.' },
]

const results = [
  { value: '2.4x', label: 'متوسط زيادة حجم العملاء' },
  { value: '–31%', label: 'متوسط انخفاض تكلفة العميل المؤهل' },
  { value: '8 أسابيع', label: 'وقت الإطلاق الكامل' },
]

export default function ArRealEstatePage() {
  return (
    <>
      <PageHero
        eyebrow="العقارات"
        title={
          <>
            المزيد من العملاء المؤهلين،{' '}
            <span className="text-teal">أقل إنفاق مهدر.</span>
          </>
        }
        description="بوابات عقارية وقمع جذب عملاء وحملات مدفوعة مبنية لجلب المشترين الجادين — لا المتفرجين."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            احصل على تدقيق مجاني
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
          title="من القائمة إلى توقيع العقد"
          description="كل خطوة في رحلة المشتري والمستأجر — محسّنة لتقليل الاحتكاك وزيادة الاستفسارات."
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
        heading="مستعد لإغلاق المزيد من الصفقات؟"
        body="شاركنا موقعك وأهدافك — سنراجع قمع الرقمي ونحدد أكبر الفرص."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="أعمالنا"
      />
    </>
  )
}
