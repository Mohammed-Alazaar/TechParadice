import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي لشركات الخدمات المهنية',
  description:
    'مواقع موثوقة، وSEO، ومحتوى متخصص، وحملات، ومسارات للاستفسارات تناسب الاستشاريين والمحاسبين والمستشارين وشركات الخدمات المهنية.',
  path: '/ar/industries/professional-services',
  alternatePath: '/industries/professional-services',
  locale: 'ar',
})

const services = [
  { title: 'مواقع للخدمات المهنية', detail: 'مواقع سريعة ومتقنة تسهّل تقييم خبرتك وخدماتك وما يميز عرضك.' },
  { title: 'محتوى متخصص وSEO', detail: 'مقالات وأدلة ودراسات حالة وSEO تقني، منظمة حول الأسئلة الفعلية للعملاء.' },
  { title: 'حملات Google وLinkedIn', detail: 'حملات مركزة لصنّاع القرار والخدمات والقطاعات ونية البحث ذات الصلة.' },
  { title: 'مسارات الاستفسارات', detail: 'موارد مفيدة وحجز للاستشارات ونماذج وتسلسلات متابعة متوافقة مع عملية المبيعات لديك.' },
  { title: 'دعم السمعة', detail: 'آليات واضحة لإدارة التقييمات وشهادات العملاء ودراسات الحالة وتعزيز الحضور المهني.' },
  { title: 'استفسارات بمساعدة AI', detail: 'نماذج ومساعدات محددة النطاق بعناية، تجمع السياق وتوجه الاستفسارات إلى الشخص المناسب.' },
]

const results = [
  { value: 'الشرح', label: 'عرض الخدمات والخبرة والقيمة بوضوح' },
  { value: 'الإثبات', label: 'تعزيز الموثوقية بالأدلة والمحتوى المفيد' },
  { value: 'الاستفسار', label: 'مسار سهل للوصول إلى المتخصص المناسب' },
]

export default function ArProfessionalServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="الخدمات المهنية"
        title={
          <>
            اجعل خبرتك{' '}
            <span className="text-teal">أوضح وأسهل تقييماً.</span>
          </>
        }
        description="ابنِ حضوراً رقمياً موثوقاً يشرح قيمتك ويدعم القرارات المبنية على معلومات واضحة، ويوفر للعملاء المحتملين مساراً مباشراً إلى فريقك."
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
          eyebrow="ما نقدمه للخدمات المهنية"
          title="اربط الظهور والمصداقية والاستفسار"
          description="نظّم نشاط البحث والمحتوى والموقع والحملات والمتابعة وفق الطريقة التي يقيّم بها عملاؤك الخبرة."
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
        heading="هل تريد مساراً أقوى من الخبرة إلى الاستفسار؟"
        body="أخبرنا بأهدافك وشارك موقعك الحالي. سنحدد الفرص الأعلى أولوية لتحسين الرحلة."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
