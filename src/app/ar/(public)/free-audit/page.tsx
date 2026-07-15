import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Clock, Zap } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { BRAND } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'تدقيق رقمي مجاني | TechParadice',
  description: 'اطلب تدقيقًا مجانيًا لموقعك وأداء SEO وحضورك الرقمي، واحصل على توصيات واضحة ومرتبة حسب الأولوية.',
  path: '/ar/free-audit',
  alternatePath: '/free-audit',
  locale: 'ar',
})

const auditItems = [
  'تحليل Core Web Vitals وسرعة الصفحة',
  'مراجعة SEO التقني، بما يشمل الفهرسة والبيانات المنظمة والروابط الداخلية',
  'مقارنة موجزة مع أبرز المنافسين',
  'مراجعة رحلة المستخدم ومسار التحويل',
  'قائمة مرتبة حسب الأولوية تضم تحسينات عملية مقترحة',
]

const steps = [
  { n: '01', title: 'أرسل طلبك', detail: 'ألصق رابط موقعك في الرسالة وأخبرنا بما تريد تحسينه.' },
  { n: '02', title: 'نراجع الموقع', detail: 'نفحص الجوانب ذات الأولوية ونعد تقييماً موجزاً ومركزاً.' },
  { n: '03', title: 'استلم النتائج', detail: 'تحصل على ملخص واضح يتضمن توصيات مرتبة حسب الأولوية وخطوات تالية مقترحة.' },
]

export default function ArFreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="تدقيق مجاني"
        title={
          <>
            اكتشف أوضح فرص{' '}
            <span className="text-teal">تحسين موقعك.</span>
          </>
        }
        description="نراجع موقعك وSEO، ثم نشاركك قائمة إجراءات مرتبة حسب الأولوية، من دون تكلفة أو التزام بالتعاقد."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="#audit-form"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            <Zap size={16} />
            اطلب تدقيقك المجاني
          </Link>
          <Link
            href="/ar/work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            اطّلع على أعمالنا
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">ما ستحصل عليه</p>
            <h2 className="mt-4 heading-h2 text-white">مراجعة مركزة يمكنك الاستفادة منها.</h2>
            <p className="mt-4 text-body-lg text-white/70">
              نقيّم الجوانب الأكثر ارتباطاً بالظهور وسهولة الاستخدام والتحويل، ثم نرتب النتائج
              وفق أثرها المتوقع والجهد اللازم لتنفيذها.
            </p>
            <ul className="mt-8 space-y-3">
              {auditItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                    <Check size={14} />
                  </span>
                  <span className="text-[15px] text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5 rounded-xl border border-border-dark bg-surface p-6">
                <span className="font-display text-[28px] font-extrabold leading-none text-teal/30">{s.n}</span>
                <div>
                  <h3 className="font-display text-h4 font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-[14px] text-white/60">{s.detail}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-xl border border-teal/20 bg-teal/5 p-5">
              <Clock size={18} className="shrink-0 text-teal" />
              <p className="text-[14px] text-white/70">
                وقت التسليم المستهدف: <span className="font-semibold text-white">خلال يومي عمل</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" id="audit-form">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="اطلب تدقيقك"
            title="أخبرنا ما الذي تريد تحسينه"
            description="ألصق رابط موقعك في حقل الرسالة واشرح التحدي الذي تواجهه، وسنستخدم هذا السياق لتركيز المراجعة."
          />
          <div className="mt-10 rounded-2xl border border-border-dark bg-void p-6 sm:p-8">
            <ContactForm locale="ar" />
          </div>
          <p className="mt-6 text-center text-[13px] text-muted">
            تفضّل التواصل عبر البريد الإلكتروني؟{' '}
            <Link href={`mailto:${BRAND.email}`} className="text-teal hover:underline">
              {BRAND.email}
            </Link>
            {' '}— نرد عادة خلال يوم عمل واحد.
          </p>
        </div>
      </Section>

      <Section tone="void">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { value: 'مركّز', label: 'مراجعة مبنية على الأهداف التي تشاركها معنا' },
            { value: 'يومان', label: 'المدة المستهدفة للتسليم خلال أيام العمل' },
            { value: 'دون تكلفة', label: 'لا دفع ولا التزام بالتعاقد' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border-dark bg-surface p-8 text-center">
              <p className="font-display text-[48px] font-extrabold leading-none text-teal">{stat.value}</p>
              <p className="mt-3 text-[13px] uppercase tracking-[1.5px] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
