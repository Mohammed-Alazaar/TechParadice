import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'العملية',
  description: 'سبع مراحل من الاكتشاف إلى النمو. نفس الإطار الذي نطبقه على كل مشاركة.',
  path: '/ar/process',
  alternatePath: '/process',
  locale: 'ar',
})

const phases = [
  {
    n: '01', name: 'الاكتشاف',
    what: 'مقابلات أصحاب المصلحة، مراجعة الأصول الحالية، والتوافق على الأهداف والقيود.',
    deliverables: ['وثيقة الأهداف', 'مقاييس النجاح', 'ملخص المشروع'],
    timeline: 'الأسبوع 1', who: 'المؤسس، كبير الاستراتيجيين',
  },
  {
    n: '02', name: 'الاستراتيجية',
    what: 'نترجم الأهداف إلى خارطة طريق — النطاق والتسلسل والفريق والميزانية مقابل النتائج.',
    deliverables: ['نطاق العمل', 'المراحل', 'خطة المخاطر'],
    timeline: 'الأسبوع 1–2', who: 'المؤسس، مدير المشروع',
  },
  {
    n: '03', name: 'التصميم',
    what: 'نماذج تقريبية وعالية الدقة في Figma — تُراجَع أسبوعياً مع فريق العميل.',
    deliverables: ['النماذج الأولية', 'النماذج التفاعلية', 'نظام التصميم'],
    timeline: 'الأسبوع 2–5', who: 'المصممون، مدير المشروع',
  },
  {
    n: '04', name: 'البناء',
    what: 'سبرينت نصف شهري مع روابط تجريبية، ومخرجات قابلة للاختبار، وعروض تقديمية.',
    deliverables: ['روابط التجربة', 'عروض السبرينت', 'مكونات مختبرة'],
    timeline: 'الأسبوع 4–10', who: 'المهندسون، QA، مدير المشروع',
  },
  {
    n: '05', name: 'ضمان الجودة',
    what: 'مراجعات إمكانية الوصول، اختبارات متعددة المتصفحات، تحسين الأداء، فحص المحتوى.',
    deliverables: ['تقرير Axe', 'تقرير Lighthouse', 'فرز الأخطاء'],
    timeline: 'الأسبوع 10', who: 'QA، المهندسون',
  },
  {
    n: '06', name: 'الإطلاق',
    what: 'مراجعة نهائية، تحويل DNS، التحقق من التحليلات، خطة التراجع جاهزة.',
    deliverables: ['الإطلاق الفعلي', 'التحليلات نشطة', 'وثيقة التسليم'],
    timeline: 'الأسبوع 10–11', who: 'المهندسون، المؤسس',
  },
  {
    n: '07', name: 'النمو',
    what: 'مراجعات شهرية، تحسين مستمر، خدمات اختياريةمستمرة للمحتوى والـ SEO والإعلانات.',
    deliverables: ['تقارير شهرية', 'اختبار A/B', 'خارطة طريق النمو'],
    timeline: 'شهر 3+', who: 'المؤسس، متخصصو النمو',
  },
]

export default function ArProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="العملية"
        title={<>كيف <span className="text-teal">نعمل.</span></>}
        description="سبع مراحل من الاكتشاف إلى النمو. بلا مفاجآت وبلا توسع غير مخطط له — فقط خطة واضحة تُنفَّذ بإتقان."
      />

      <Section tone="void" className="pt-0">
        <ol className="space-y-6">
          {phases.map((phase) => (
            <li
              key={phase.n}
              className="grid gap-6 rounded-2xl border border-border-dark bg-surface p-8 lg:grid-cols-[80px_1fr_1fr]"
            >
              <div>
                <span className="font-display text-[40px] font-extrabold leading-none text-teal">
                  {phase.n}
                </span>
              </div>
              <div>
                <h2 className="font-display text-h3 font-semibold text-white">{phase.name}</h2>
                <p className="mt-2 text-[15px] text-white/70">{phase.what}</p>
                <p className="mt-4 text-[13px] text-muted">{phase.who}</p>
              </div>
              <div>
                <p className="text-caption uppercase text-teal">المخرجات</p>
                <ul className="mt-3 space-y-1.5">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-[14px] text-white/70">
                      <span className="h-px w-4 bg-teal/50 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-teal/70">{phase.timeline}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner
        heading="هل أنت مستعد للبدء؟"
        body="أخبرنا بأهدافك. سنتكفل بالباقي."
        ctaLabel="تواصل معنا"
        ctaHref="/ar/contact"
      />
    </>
  )
}
