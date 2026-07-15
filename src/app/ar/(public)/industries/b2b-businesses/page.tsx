import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي لشركات B2B',
  description:
    'مواقع B2B، ومسارات لتوليد العملاء المحتملين، وحملات موجهة للحسابات، وأتمتة مسؤولة، وSEO، وتحليلات لمسار المبيعات.',
  path: '/ar/industries/b2b-businesses',
  alternatePath: '/industries/b2b-businesses',
  locale: 'ar',
})

const services = [
  { title: 'مسارات توليد العملاء المحتملين', detail: 'محتوى وموارد مفيدة ونماذج وتسلسلات متابعة ضمن مسارات لاكتساب العملاء المحتملين، ومتوافقة مع عملية المبيعات لديك.' },
  { title: 'التسويق الموجّه للحسابات', detail: 'صفحات هبوط ومحتوى وحملات مركزة للحسابات ذات الأولوية والأدوار المشاركة في اتخاذ القرار.' },
  { title: 'مساعدات رقمية بتقنيات AI', detail: 'أدوات محددة النطاق بعناية، تجمع السياق وتجيب عن الأسئلة المعتمدة وتوجه الاستفسارات.' },
  { title: 'تطوير المواقع', detail: 'مواقع B2B موثوقة تضم دراسات حالة وأدوات مفيدة ومسارات واضحة لحجز عرض توضيحي أو استشارة.' },
  { title: 'SEO والمحتوى المتخصص', detail: 'SEO تقني ومحتوى متخصص منظم حول أسئلة البحث والشراء الفعلية.' },
  { title: 'التحليلات ولوحات مسار المبيعات', detail: 'تقارير تجمع بيانات التسويق وCRM المتاحة لدعم قرارات مسار المبيعات.' },
]

const results = [
  { value: 'الجذب', label: 'الوصول إلى جمهور مناسب حول احتياجات محددة' },
  { value: 'التأهيل', label: 'استفسارات تتضمن سياقاً مفيداً لفريق المبيعات' },
  { value: 'القياس', label: 'ربط النشاط التسويقي ببيانات مسار المبيعات' },
]

export default function ArB2BBusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="شركات B2B"
        title={
          <>
            ابنِ مساراً أوضح من{' '}
            <span className="text-teal">الاهتمام إلى الفرصة.</span>
          </>
        }
        description="نسّق موقعك ومحتواك وحملاتك وأتمتتك وتقاريرك مع رحلة شراء أطول يشارك فيها عدد من أصحاب المصلحة."
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
          eyebrow="ما نقدمه لشركات B2B"
          title="اربط النشاط التسويقي بأولويات المبيعات"
          description="صمم رحلات مفيدة للمشترين، مع تزويد فريقك بسياق أفضل للتأهيل والمتابعة والقياس."
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
        heading="هل تريد منظومة أكثر اتساقاً لدعم نمو B2B؟"
        body="شاركنا أهدافك وعملية المبيعات وإعدادك الرقمي الحالي. سنحدد طرقاً عملية لتعزيز الرحلة."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
