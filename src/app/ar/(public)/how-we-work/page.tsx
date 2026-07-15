import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Faq } from '@/components/sections/Faq'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: 'كيف نعمل',
  description:
    'تعرّف إلى منهج TechParadice في تحديد نطاق المشاريع الرقمية وتنفيذها ودعمها، من المراجعة الأولى إلى التحسين المستمر.',
  path: '/ar/how-we-work',
  alternatePath: '/how-we-work',
  locale: 'ar',
})

const steps = [
  {
    n: '01',
    title: 'المراجعة الأولية',
    description: 'نراجع موقعك الحالي وSEO والمنافسين والأهداف والقيود لتحديد نقطة البداية المناسبة.',
  },
  {
    n: '02',
    title: 'النطاق وعرض العمل',
    description:
      'نوصي بنطاق عملي يوضح المخرجات والمسؤوليات والرسوم وجدولاً زمنياً تقديرياً.',
  },
  {
    n: '03',
    title: 'التنفيذ والإطلاق',
    description:
      'ينفذ الفريق العمل وفق المراحل المتفق عليها، ويشارك تحديثات دورية ونقاط مراجعة قبل الإطلاق.',
  },
  {
    n: '04',
    title: 'القياس والتحسين',
    description:
      'بعد الإطلاق، يمكننا متابعة الأداء وترتيب التحسينات ومواصلة العمل وفق خطة دعم أو تعاون مستمر متفق عليها.',
  },
]

const engagementModels = [
  {
    title: 'مشروع محدد',
    description:
      'نطاق محدد ومراحل ورسوم متفق عليها لعمل مثل إنشاء موقع أو إطلاق منتج أو تنفيذ حملة.',
  },
  {
    title: 'تعاون مستمر',
    description:
      'وصول مستمر إلى الفريق ضمن نطاق وأولويات مشتركة وتقارير ونقاط مراجعة متفق عليها.',
  },
]

const stats = [
  { value: 'مكتوب', label: 'نطاق العمل والمسؤوليات والرسوم' },
  { value: 'دورية', label: 'تحديثات التقدم ونقاط المراجعة' },
  { value: 'متفق عليه', label: 'إجراء التغييرات قبل بدء أي عمل إضافي' },
]

const faqs = [
  {
    q: 'ماذا يشمل التدقيق المجاني؟',
    a: 'مراجعة مركزة لـ Core Web Vitals والجوانب التقنية في SEO وتموضع المنافسين والتحسينات ذات الأولوية. نوضح نطاق الملخص المكتوب وموعد تسليمه عند مراجعة الطلب.',
  },
  {
    q: 'كم يستغرق المشروع النموذجي؟',
    a: 'تعتمد المدة على نطاق العمل وجاهزية المحتوى والتكاملات ودورات المراجعة والعوامل التي يعتمد عليها المشروع. ويتضمن عرض العمل جدولاً زمنياً تقديرياً مبنياً على هذه العناصر.',
  },
  {
    q: 'هل تعملون مع ميزانيات صغيرة؟',
    a: 'يمكننا غالباً تعديل النطاق أو ترتيب المراحل أو نموذج التنفيذ ليناسب ميزانية محددة. شاركنا الحد المتاح وأولوياتك، وسنوضح لك ما يمكن تنفيذه بواقعية قبل الالتزام.',
  },
  {
    q: 'هل يمكنني إيقاف التعاون المستمر أو إنهاؤه؟',
    a: 'تخضع فترات الإشعار وشروط الإيقاف أو الإنهاء للاتفاقية. وتُستخدم فترة الإشعار المتفق عليها لإغلاق العمل الجاري أو تسليمه وتأكيد أي التزامات متبقية.',
  },
  {
    q: 'هل تعملون خارج الخليج؟',
    a: 'نقيّم إمكانية تنفيذ المشروع عن بُعد، داخل الخليج أو خارجه، وفق تداخل ساعات العمل ومتطلبات المشروع والبيانات والتعاقد. ونتفق على أوقات الاجتماعات مع فريق المشروع.',
  },
]

export default function ArHowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="كيف نعمل"
        title={
          <>
            وضوح منذ البداية،
            <span className="text-teal"> ومسؤوليات محددة طوال التنفيذ.</span>
          </>
        }
        description="تعرّف إلى كيفية تحديد العمل وإدارة القرارات ومشاركة التقدم ودعم فريقك بعد الإطلاق."
      />

      {/* 4-step process */}
      <Section tone="void" className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative overflow-hidden rounded-2xl border border-border-dark bg-surface p-8 transition-all"
            >
              <span className="font-display text-[64px] font-extrabold leading-none text-teal/20">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-h3 font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="نماذج التعاون"
            title="اختر النموذج الملائم للعمل."
            description="استخدم مشروعاً محدد النطاق لتحقيق هدف بعينه، أو تعاوناً مستمراً عندما تحتاج إلى قدرة تنفيذية وتحسين قائم على الأولويات."
          />
          <div className="flex flex-col gap-6">
            {engagementModels.map((model) => (
              <div
                key={model.title}
                className="rounded-2xl border border-border-light bg-white p-8 dark:border-border-dark dark:bg-void"
              >
                <h3 className="font-display text-h3 font-semibold text-void dark:text-white">
                  {model.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-void/70 dark:text-white/70">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing philosophy */}
      <Section tone="void">
        <div className="max-w-3xl">
          <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-teal">
            التسعير
          </p>
          <h2 className="heading-h2 text-balance text-void dark:text-white">
            النطاق أولاً، مع رسوم واضحة.
          </h2>
          <p className="mt-6 text-body-lg text-void/70 dark:text-white/70">
            شاركنا الهدف والأولويات والقيود والميزانية التقديرية. ثم نوصي بالنطاق
            العملي ضمن هذه الحدود، ونوثق المخرجات والافتراضات والرسوم وآلية التغيير قبل
            بدء العمل.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[40px] font-extrabold leading-none text-teal">
                {stat.value}
              </p>
              <p className="mt-2 text-[15px] text-void/70 dark:text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="أسئلة شائعة" />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        heading="هل أنت مستعد لتحديد الخطوة التالية المناسبة؟"
        body="أرسل لنا رابط موقعك وأهدافك. سنراجع الوضع الحالي ونشارك مجموعة مركزة من الأولويات."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/about"
        secondaryLabel="من نحن"
      />
    </>
  )
}
