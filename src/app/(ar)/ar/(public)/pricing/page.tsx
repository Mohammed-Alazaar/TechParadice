import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'الأسعار',
  description: 'اطّلع على نطاقات الميزانية المعتادة لدى TechParadice وكيف نحدد نطاق العمل والرسوم والمراحل والفوترة قبل بدء التنفيذ.',
  path: '/ar/pricing',
  alternatePath: '/pricing',
  locale: 'ar',
})

const ranges = [
  {
    tier: 'بداية',
    price: '$0 – $500',
    body: 'تدقيقات مجانية أو إصلاحات صغيرة أو تحديثات محتوى مركزة أو مهام تصميم محددة بوضوح.',
  },
  {
    tier: 'أساسي',
    price: '$500 – $1,000',
    body: 'صفحات تسويقية مركزة أو تحسينات تصميم موجهة أو إضافات محدودة إلى مزايا قائمة.',
  },
  {
    tier: 'قياسي',
    price: '$1,000 – $2,000',
    body: 'مواقع لحملات محددة أو حزم هوية أساسية أو مجموعة واضحة من مزايا موقع أو تطبيق.',
  },
  {
    tier: 'نمو',
    price: '$2,000 – $5,000',
    body: 'مواقع متعددة الصفحات أو دعم إطلاق منتج أو شراكات مركزة أو نماذج أولية لمنتجات تم التحقق من فكرتها.',
  },
  {
    tier: 'توسع',
    price: 'أكثر من $5,000',
    body: 'منتجات رقمية معقدة أو منصات متعددة اللغات أو برامج منسقة تشمل المحتوى والحملات والتحليلات.',
  },
]

const steps = [
  { n: '01', t: 'شاركنا السياق', b: 'أخبرنا عن أهدافك وأولوياتك وقيودك والجدول الزمني ونطاق الميزانية.' },
  { n: '02', t: 'راجع نطاق العمل المقترح', b: 'نوثق المخرجات وتسلسل التنفيذ والمسؤوليات والافتراضات والفريق.' },
  { n: '03', t: 'اعتمد عرض السعر', b: 'نتفق على الرسوم والمراحل والفوترة وآلية التغيير قبل بدء العمل.' },
]

const pricingFaqs = [
  {
    q: 'لماذا لا تنشرون أسعاراً ثابتة؟',
    a: 'يعتمد حجم الجهد على المحتوى والتكاملات ودورات المراجعة والقيود التقنية ومستوى الدعم المطلوب. تساعد النطاقات أعلاه في التخطيط، بينما يعكس عرضك نطاق العمل الفعلي.',
  },
  {
    q: 'كيف تُصدرون الفواتير؟',
    a: 'تُفوتر المشاريع عادة حسب المراحل، وغالباً ما تبدأ بدفعة قدرها 30% عند الانطلاق ثم دفعات مرتبطة بالمخرجات المتفق عليها. أما الشراكات المستمرة فتُفوتر شهرياً. يوضح عرضك جدول الدفع النهائي.',
  },
  {
    q: 'هل يمكنني تخفيض الميزانية في منتصف المشروع؟',
    a: 'يمكننا مراجعة الجزء المتبقي من نطاق العمل والاتفاق على المخرجات أو المزايا أو المراحل التي ينبغي تعديلها. نوثق أثر التغيير في المدة والرسوم والتبعيات قبل متابعة الخطة المعدلة.',
  },
  {
    q: 'هل تقبلون حصصاً في الشركة أو اتفاقيات مرتبطة بالأداء؟',
    a: 'تعتمد شراكاتنا المعتادة على رسوم واضحة. ننظر في النماذج التجارية البديلة بصورة انتقائية عندما تكون التوقعات والقياس والمخاطر واضحة للطرفين.',
  },
]

export default function ArPricingPage() {
  return (
    <>
      <PageHero
        eyebrow="الأسعار"
        title={<>نطاق واضح <span className="text-teal">لأهدافك وميزانيتك.</span></>}
        description="استخدم النطاقات أدناه للتخطيط الأولي. نؤكد المخرجات والافتراضات والرسوم والمراحل في عرض مكتوب قبل بدء العمل."
      />

      <Section tone="void" className="pt-0">
        <SectionHeading eyebrow="للاسترشاد" title="نطاقات الميزانية المعتادة" description="هذه الأرقام إرشادية وليست باقات ثابتة. يعكس عرض السعر نطاق العمل ومتطلبات التنفيذ المتفق عليها." />
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
        <SectionHeading eyebrow="آلية التسعير" title="كيف نعد عرضك" />
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
              title="اطلب عرضًا مخصصًا"
              description="شاركنا سياقاً كافياً لتقييم ملاءمة المشروع وتحديد الأسئلة التي نحتاج إلى مناقشتها. نستهدف الرد خلال يوم عمل واحد."
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
        heading="هل تريد تقديرًا يناسب مشروعك؟"
        body="شاركنا احتياجاتك وميزانيتك، وسنقترح نطاقاً واضحاً وخطوة تالية عملية."
        ctaLabel="اطلب عرضًا"
        ctaHref="/ar/contact"
      />
    </>
  )
}
