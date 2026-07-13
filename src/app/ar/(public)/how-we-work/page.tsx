import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Faq } from '@/components/sections/Faq'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: 'كيف نعمل',
  description: 'عمليتنا ونماذج التعاون وفلسفة التسعير — شفافية من اليوم الأول.',
  path: '/ar/how-we-work',
  alternatePath: '/how-we-work',
  locale: 'ar',
})

const steps = [
  {
    n: '01',
    title: 'التدقيق المجاني',
    description: 'نحلل موقعك الحالي والسيو والمنافسين. تحصل على نتائج — بلا أي التزام.',
  },
  {
    n: '02',
    title: 'الاقتراح',
    description:
      'نحدد نطاق العمل الذي يتوافق مع أهدافك وميزانيتك. سعر ثابت، مخرجات واضحة، جدول زمني محدد.',
  },
  {
    n: '03',
    title: 'البناء والإطلاق',
    description:
      'تنفيذ من كبار الخبراء فقط. تحديثات أسبوعية، مراجعة على بيئة اختبارية، وأنت توافق قبل الإطلاق.',
  },
  {
    n: '04',
    title: 'النمو والتطوير',
    description:
      'بعد الإطلاق، نتتبع ونُقرّر ونحسّن. عملاء العقود الدائمة يحصلون على مكالمات استراتيجية شهرية وقائمة أعمال مشتركة.',
  },
]

const engagementModels = [
  {
    title: 'مشروع',
    description:
      'نطاق ثابت. فاتورة واحدة. موعد تسليم واحد. مثالي لموقع جديد أو إطلاق منتج أو حملة محددة.',
  },
  {
    title: 'عقد دائم',
    description:
      'علاقة مستمرة. نطاق شهري، تقارير شهرية، قائمة أعمال مشتركة، وفريق يعرف عملك.',
  },
]

const stats = [
  { value: '0', label: 'رسوم خفية' },
  { value: '100%', label: 'فواتير تتطابق مع الاقتراح' },
  { value: '24 ساعة', label: 'وقت استجابة' },
]

const faqs = [
  {
    q: 'ماذا يشمل التدقيق المجاني؟',
    a: 'مراجعة Core Web Vitals لموقعك والصحة التقنية لـ SEO ولمحة عن المنافسين وأفضل 3 توصيات فورية. تُسلَّم خلال 48 ساعة كملخص مكتوب.',
  },
  {
    q: 'كم يستغرق المشروع النموذجي؟',
    a: 'موقع ويب: 4–8 أسابيع. هوية كاملة + موقع + SEO: 8–12 أسبوعاً. العقود الدائمة مفتوحة المدة. نقدم تقديرات زمنية في كل اقتراح.',
  },
  {
    q: 'هل تعملون مع ميزانيات صغيرة؟',
    a: 'نعم. لدينا مشاريع من $500 فما فوق. القيد يشكّل النطاق، لا الجودة. تنفيذ كبار الخبراء، مخرجات بالحجم المناسب.',
  },
  {
    q: 'هل يمكنني إيقاف العقد الدائم أو إلغاؤه؟',
    a: 'نعم، بإشعار خطي لمدة 30 يوماً. لا نُقيّدك. نفضل أن نكسب العلاقة شهراً بشهر.',
  },
  {
    q: 'هل تعملون خارج الخليج؟',
    a: 'نعم. نعمل مع عملاء حول العالم. الفريق في أنقرة؛ المخرجات مرنة في التوقيت.',
  },
]

export default function ArHowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="كيف نعمل"
        title={
          <>
            شفافية بالتصميم،
            <span className="text-teal"> نتائج بالتسليم.</span>
          </>
        }
        description="لا مفاجآت في العقد، لا ضبابية في النطاق. إليك بالضبط كيف نعمل — من أول مكالمة إلى النمو المستمر."
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
            title="مشروع أو عقد دائم — أنت تختار."
            description="نعمل بكلا الطريقتين. معظم العملاء يبدأون بمشروع، ثم ينتقلون إلى عقد دائم بمجرد أن يروا كيف يبدو التنفيذ المنسق."
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
            ميزانية محددة. لا مفاجآت.
          </h2>
          <p className="mt-6 text-body-lg text-void/70 dark:text-white/70">
            لا قائمة أسعار ثابتة لدينا. لدينا محادثة. تشارك هدفك وسقف ميزانيتك؛ نقترح النطاق
            الذي يحقق أكبر قيمة ضمنه. النطاق ثابت. الجدول الزمني ثابت. الفاتورة تتطابق مع
            الاقتراح.
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
        heading="مستعد للبدء؟ نحن أيضاً."
        body="احجز التدقيق المجاني — بلا التزام ولا مكالمة مبيعات. فقط أرسل رابطك وأهدافك."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/about"
        secondaryLabel="من نحن"
      />
    </>
  )
}
