import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'الأسعار | TechParadice',
  description: 'تسعير يناسب ميزانيتك. شارك أهدافك ونحدد المسار الصحيح. عروض شفافة.',
  alternates: { canonical: `${SITE_URL}/ar/pricing` },
  openGraph: { locale: 'ar_SA' },
}

const ranges = [
  {
    tier: 'مبتدئ',
    price: '$0 – $500',
    body: 'صفحات هبوط بسيطة، إصلاحات صغيرة، تحديثات محتوى أو مهام تصميم أساسية.',
  },
  {
    tier: 'أساسي',
    price: '$500 – $1,000',
    body: 'صفحات تسويقية صغيرة، إعادة تصميم بسيطة، أو إضافة ميزات محدودة.',
  },
  {
    tier: 'معياري',
    price: '$1,000 – $2,000',
    body: 'مواقع كاملة، حملات تسويقية، حزم هوية بصرية، أو تطبيقات ويب صغيرة.',
  },
  {
    tier: 'نمو',
    price: '$2,000 – $5,000',
    body: 'مواقع متعددة الصفحات، إطلاق منتجات، استضافة مستمرة، أو بناء MVP للموبايل.',
  },
  {
    tier: 'توسع',
    price: 'أكثر من $5,000',
    body: 'منتجات معقدة، إطلاق متعدد الأسطح، برامج كاملة مع إعلانات ومحتوى وتحليلات.',
  },
]

const steps = [
  { n: '01', t: 'تشارك أهدافك', b: 'الجدول الزمني ونطاق الميزانية والنتائج التي تسعى إليها.' },
  { n: '02', t: 'نقترح نطاق العمل', b: 'النطاق والترتيب والفريق والرسوم — كتابةً.' },
  { n: '03', t: 'عرض شفاف', b: 'فوترة على أساس المراحل. بلا نسب مخفية.' },
]

const pricingFaqs = [
  {
    q: 'لماذا لا تنشرون أسعاراً ثابتة؟',
    a: 'لأن لا مشروعين متشابهين. الحزمة الثابتة تجبرك على شراء نطاق لا تحتاجه أو تخطي نطاق تحتاجه. التسعير على أساس الميزانية أسرع وأكثر صدقاً.',
  },
  {
    q: 'كيف تُصدرون الفواتير؟',
    a: 'على أساس المراحل. عادةً 30٪ عند الانطلاق، ثم مدفوعات تدريجية مقابل المخرجات. العقود الشهرية تُفوتر شهرياً.',
  },
  {
    q: 'هل يمكنني تخفيض الميزانية في منتصف المشروع؟',
    a: 'نعم. نعيد النطاق تعاونياً. مقايضات واضحة، لا أوامر تغيير مفاجئة.',
  },
]

export default function ArPricingPage() {
  return (
    <>
      <PageHero
        eyebrow="الأسعار"
        title={<>تسعير يناسب <span className="text-teal">ميزانيتك.</span></>}
        description="شارك أهدافك وميزانيتك. سنحدد المسار الصحيح. عروض شفافة وبدون قيود صارمة."
      />

      <Section tone="void" className="pt-0">
        <SectionHeading eyebrow="النطاقات" title="نطاقات الميزانية المعتادة" />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ranges.map((r) => (
            <li key={r.tier} className="rounded-xl border border-border-dark bg-surface p-6">
              <p className="text-caption uppercase text-teal">{r.tier}</p>
              <p className="mt-2 font-display text-h2 font-bold text-white">{r.price}</p>
              <p className="mt-3 text-[14px] text-white/60">{r.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="العملية" title="كيف يعمل" />
        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl border border-border-dark bg-void p-6">
              <span className="font-display text-[32px] font-extrabold text-teal">{s.n}</span>
              <h3 className="mt-3 font-display text-h4 font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-[14px] text-white/60">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="احصل على عرض"
              title="احصل على عرض مخصص"
              description="أخبرنا عن أهدافك ونطاق ميزانيتك."
            />
          </div>
          <QuoteForm locale="ar" />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="الأسئلة الشائعة" title="أسئلة حول التسعير" />
        <div className="mt-10 max-w-3xl">
          <ul className="divide-y divide-border-dark">
            {pricingFaqs.map((faq) => (
              <li key={faq.q} className="py-6">
                <p className="font-display text-[17px] font-semibold text-white">{faq.q}</p>
                <p className="mt-2 text-[15px] text-white/70">{faq.a}</p>
              </li>
            ))}
          </ul>
        </div>
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
