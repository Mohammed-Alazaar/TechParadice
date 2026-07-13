import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'الرقمي للخدمات المهنية',
  description:
    'مواقع سلطة، توليد عملاء، SEO ومحتوى تسويقي للمحامين ومكاتب المحاسبة والاستشارات وسائر الخدمات المهنية.',
  path: '/ar/industries/professional-services',
  alternatePath: '/industries/professional-services',
  locale: 'ar',
})

const services = [
  { title: 'تطوير مواقع السلطة', detail: 'مواقع متقنة وسريعة تعكس الخبرة وتحول الزوار المترددين إلى استفسارات.' },
  { title: 'محتوى القيادة الفكرية وSEO', detail: 'مقالات وأدلة ودراسات حالة تتصدر نتائج البحث وتبني المصداقية.' },
  { title: 'إعلانات Google وLinkedIn', detail: 'حملات دقيقة تستهدف صانعي القرار الباحثين عن خدماتك.' },
  { title: 'مسارات استقطاب العملاء', detail: 'موارد مقيّدة وحجز استشارات ومتابعات تلتقط نوايا العملاء الشرائية.' },
  { title: 'إدارة السمعة', detail: 'استراتيجية مراجعات ودراسات حالة ودعم ترشيحات الجوائز.' },
  { title: 'استقبال مساعد بالذكاء الاصطناعي', detail: 'نماذج ذكية وشات بوت يؤهلون العملاء قبل وصولهم إلى فريقك.' },
]

const results = [
  { value: '+89%', label: 'زيادة الزيارات الطبيعية' },
  { value: '–34%', label: 'انخفاض تكلفة العميل المؤهل' },
  { value: '6 أسابيع', label: 'وقت إطلاق نموذجي' },
]

export default function ArProfessionalServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="الخدمات المهنية"
        title={
          <>
            اكسب العملاء بـ
            <span className="text-teal">سلطة رقمية.</span>
          </>
        }
        description="عملاء الخدمات المهنية يشترون الخبرة قبل الخدمة. نبني الحضور الرقمي الذي يجعل سلطتك لا يمكن تجاهلها."
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
          eyebrow="ما نقدمه للخدمات المهنية"
          title="من أول نقرة إلى عقد موقّع"
          description="نرسم رحلة اكتساب العملاء كاملة — بحث، موقع، استقبال ومتابعة — ونحسّن كل خطوة فيها."
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
        heading="مستعد لبناء مسار عملاء تلقائي؟"
        body="شاركنا أهدافك — سنراجع حضورك الرقمي ونحدد أسرع الفرص."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="أعمالنا"
      />
    </>
  )
}
