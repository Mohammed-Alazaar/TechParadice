import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Clock, Zap } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { BRAND } from '@/lib/utils'
import { SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'تدقيق رقمي مجاني | TechParadice',
  description: 'احصل على تدقيق مجاني لموقعك والسيو والحضور الرقمي. نتائج قابلة للتنفيذ بدون أي مبيعات.',
  alternates: { canonical: `${SITE_URL}/ar/free-audit` },
  openGraph: { locale: 'ar_SA' },
}

const auditItems = [
  'تحليل Core Web Vitals وسرعة الصفحة',
  'فحص SEO تقني (الفهرسة، البيانات المنظمة، الروابط الداخلية)',
  'لمحة عن وضع المنافسين',
  'مراجعة مسار التحويل',
  'قائمة أولويات (3-5 إجراءات يمكنك تطبيقها هذا الأسبوع)',
]

const steps = [
  { n: '01', title: 'أكمل النموذج', detail: 'شارك رابط موقعك وما تريد تحسينه. يستغرق دقيقتين.' },
  { n: '02', title: 'نجري التدقيق', detail: 'يراجع فريقنا موقعك خلال 48 ساعة ويُعدّ تقريرًا مركّزًا.' },
  { n: '03', title: 'تستلم النتائج', detail: 'ملف PDF واضح بإجراءات مرتبة حسب الأولوية — بلا مصطلحات تقنية، بلا عرض تقديمي.' },
]

export default function ArFreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="تدقيق مجاني"
        title={
          <>
            اعرف بالضبط ما الذي{' '}
            <span className="text-teal">يُعيق موقعك.</span>
          </>
        }
        description="سندقق في حضورك الرقمي ونسلّمك قائمة إجراءات مرتبة بالأولوية — مجانًا، بدون أي التزام."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="#audit-form"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            <Zap size={16} />
            اطلب التدقيق المجاني
          </Link>
          <Link
            href="/ar/work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            شاهد أعمالنا أولًا
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">ما ستحصل عليه</p>
            <h2 className="mt-4 heading-h2 text-white">تدقيق حقيقي، لا عرض مبيعات.</h2>
            <p className="mt-4 text-body-lg text-white/70">
              معظم الوكالات تستخدم "التدقيق المجاني" كطعم لعرض جاهز. تدقيقنا مراجعة تقنية فعلية
              لموقعك، يُنفّذها نفس الفريق الذي سيبني لك.
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
                وقت التسليم: <span className="font-semibold text-white">خلال 48 ساعة</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" id="audit-form">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="اطلب تدقيقك"
            title="أخبرنا أين تريد النمو"
            description="شارك رابطك والتحدي الذي تواجهه. سنتولى الباقي."
          />
          <div className="mt-10 rounded-2xl border border-border-dark bg-void p-6 sm:p-8">
            <ContactForm />
          </div>
          <p className="mt-6 text-center text-[13px] text-muted">
            تفضل البريد الإلكتروني؟{' '}
            <Link href={`mailto:${BRAND.email}`} className="text-teal hover:underline">
              {BRAND.email}
            </Link>
            {' '}— نرد خلال 24 ساعة.
          </p>
        </div>
      </Section>

      <Section tone="void">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { value: '+38%', label: 'متوسط تحسّن التحويل بعد التدقيق' },
            { value: '48 ساعة', label: 'وقت تسليم كل تدقيق' },
            { value: '100%', label: 'مجاني — بلا بطاقة، بلا التزام' },
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
