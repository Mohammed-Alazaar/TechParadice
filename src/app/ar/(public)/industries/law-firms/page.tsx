import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي لمكاتب المحامين',
  description:
    'مواقع سلطة، محتوى قانوني SEO، إعلانات Google، أتمتة الاستقبال، ومسارات اكتساب العملاء لمكاتب المحامين والممارسات القانونية في الخليج.',
  path: '/ar/industries/law-firms',
  alternatePath: '/industries/law-firms',
  locale: 'ar',
})

const services = [
  { title: 'موقع مكتب المحاماة', detail: 'مواقع احترافية تضع مكتبك باعتباره الخيار الموثوق قبل أن يتصل بك العميل.' },
  { title: 'المحتوى القانوني وSEO', detail: 'صفحات تخصصات، محتوى FAQ، وسيو تقني يرتب موقعك على البحوث التي يجريها العملاء المثاليون.' },
  { title: 'إعلانات Google', detail: 'حملات استهداف الإجراءات العالية تستهدف من يبحث عن تخصصاتك في مدينتك.' },
  { title: 'أتمتة الاستقبال', detail: 'متابعة آلية تحوّل الاستفسارات إلى استشارات مجدولة بينما تركز أنت على القضايا.' },
  { title: 'نظام شهادات العملاء', detail: 'جمع منظّم للمراجعات على Google والدلائل القانونية لبناء الثقة على نطاق واسع.' },
  { title: 'التحليلات والإسناد', detail: 'تقارير كاملة المسار توضح القنوات التي تجلب عملاء موقّعين، لا مجرد نقرات.' },
]

const results = [
  { value: '3.1x', label: 'متوسط زيادة الاستشارات' },
  { value: '–29%', label: 'تكلفة الاستقبال' },
  { value: '8 أسابيع', label: 'إطلاق كامل' },
]

export default function ArLawFirmsPage() {
  return (
    <>
      <PageHero
        eyebrow="مكاتب المحامين"
        title={
          <>
            حوّل عمليات البحث إلى{' '}
            <span className="text-teal">عملاء موقّعين.</span>
          </>
        }
        description="عملاء الخدمات القانونية يبحثون عن الثقة قبل السعر. نبني مواقع السلطة والسيو وسير الاستقبال التي تحوّل تلك البحوث إلى استشارات."
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
          eyebrow="ما نقدمه لمكاتب المحامين"
          title="من البحث إلى التوقيع"
          description="كل خطوة في رحلة اكتساب العميل، محسّنة للثقة والتحويل."
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
        heading="مستعد لتنمية مكتبك رقمياً؟"
        body="شاركنا رابط مكتبك وأهدافك — سنراجع حضورك الرقمي مجاناً."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="أعمالنا"
      />
    </>
  )
}
