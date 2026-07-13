import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'الرقمي لشركات B2B',
  description:
    'توليد عملاء محتملين، تسويق قائم على الحسابات، مساعدو AI ولوحات تحليلات مرتبطة مباشرة بخط المبيعات لشركات B2B.',
  path: '/ar/industries/b2b-businesses',
  alternatePath: '/industries/b2b-businesses',
  locale: 'ar',
})

const services = [
  { title: 'أنظمة توليد العملاء', detail: 'قمع inbound ومحتوى مقيّد وتسلسلات outbound تملأ خط مبيعاتك.' },
  { title: 'التسويق القائم على الحسابات', detail: 'صفحات هبوط وحملات مخصصة تستهدف حسابات وأدوار بعينها.' },
  { title: 'مساعدو الذكاء الاصطناعي', detail: 'بوتات تأهيل تُصنّف وتُوجّه العملاء الواردين قبل أن يلمسهم فريقك.' },
  { title: 'تطوير المواقع', detail: 'مواقع سلطة مع حاسبات ROI ودراسات حالة وتدفقات حجز عرض توضيحي.' },
  { title: 'SEO والمحتوى', detail: 'محتوى قيادة فكرية وسيو تقني يستهدف كلمات نية الشراء.' },
  { title: 'لوحات التحليلات والمبيعات', detail: 'تقارير إسناد تربط الإنفاق التسويقي بالإيراد المُغلق.' },
]

const results = [
  { value: '+112%', label: 'متوسط زيادة الزيارات الطبيعية' },
  { value: '–28%', label: 'متوسط انخفاض تكلفة الاكتساب' },
  { value: '3.2x', label: 'ROAS مُحقَّق' },
]

export default function ArB2BBusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="شركات B2B"
        title={
          <>
            خط مبيعات،{' '}
            <span className="text-teal">لا مقاييس وهمية.</span>
          </>
        }
        description="مشترو B2B يأخذون وقتهم. نبني أنظمة — محتوى وسيو وتواصل وأتمتة — تعمل عبر دورات مبيعات طويلة مع إسناد واضح."
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
          eyebrow="ما نقدمه لشركات B2B"
          title="من أول نقرة إلى إغلاق الصفقة"
          description="نبني الأنظمة التي تجعل تسويقك قابلاً للإسناد إلى الإيراد — لا مجرد زيارات."
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
        heading="مستعد لبناء خط مبيعات لا يعتمد على الإحالات؟"
        body="شاركنا أهداف نموك وسنراجع إعدادك الحالي — مجاناً مع خطة عمل واضحة."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="أعمالنا"
      />
    </>
  )
}
