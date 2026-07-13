import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي للمطاعم',
  description:
    'قوائم طعام أونلاين، قمع حجوزات، سيو محلي وإدارة سوشيال ميديا مصمم للمطاعم التي تريد ملء طاولاتها باستمرار.',
  path: '/ar/industries/restaurants',
  alternatePath: '/industries/restaurants',
  locale: 'ar',
})

const services = [
  { title: 'قائمة الطعام الرقمية', detail: 'قوائم طعام سريعة ومحسّنة للجوال مع إمكانية الطلب الأونلاين.' },
  { title: 'السيو المحلي', detail: 'تحسين Google Business Profile واستهداف الكلمات المحلية.' },
  { title: 'إدارة السوشيال ميديا', detail: 'خطط محتوى أسبوعية وتوجيه التصوير الغذائي وإدارة المجتمع.' },
  { title: 'قمع الحجوزات', detail: 'أدوات حجز مدمجة مع تأكيدات عبر SMS والبريد الإلكتروني.' },
  { title: 'الإعلانات المدفوعة', detail: 'حملات Meta وGoogle مستهدفة حسب المنطقة والوقت والمناسبة.' },
  { title: 'تطوير المواقع', detail: 'مواقع فائقة السرعة مصممة لتحويل الزوار إلى حجوزات.' },
]

const results = [
  { value: '3.2x', label: 'متوسط زيادة الحجوزات' },
  { value: '< 6 أسابيع', label: 'وقت الوصول لأول نتائج' },
  { value: '4.8★', label: 'متوسط تحسّن تقييم Google' },
]

export default function ArRestaurantsPage() {
  return (
    <>
      <PageHero
        eyebrow="المطاعم"
        title={
          <>
            المزيد من الحجوزات مع{' '}
            <span className="text-teal">رقمي يعمل.</span>
          </>
        }
        description="من قائمة طعام أونلاين سريعة إلى سيو محلي يضعك في مقدمة خرائط Google — نتولى الرقمي حتى تركز على المطبخ."
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
          eyebrow="ما نقدمه للمطاعم"
          title="كل نقطة تواصل مع العميل مغطّاة"
          description="يجدك العميل على Google، يتصفح قائمتك، يحجز طاولة. نجعل كل خطوة سلسة وبلا احتكاك."
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
        heading="مستعد لملء المزيد من الطاولات؟"
        body="شاركنا رابط مطعمك وسنراجع حضورك الرقمي — مجاناً وبلا أي التزام."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="أعمالنا"
      />
    </>
  )
}
