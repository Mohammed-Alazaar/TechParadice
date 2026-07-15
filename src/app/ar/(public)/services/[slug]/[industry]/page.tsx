import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Faq } from '@/components/sections/Faq'
import { getArService } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 3600

type IndustryMeta = {
  label: string
  labelAr: string
  geo: string
  challenge: string
  focus: string
}

const INDUSTRY_META: Record<string, IndustryMeta> = {
  restaurants: {
    label: 'Restaurants',
    labelAr: 'المطاعم',
    geo: 'منطقة الخليج',
    challenge: 'تحويل الظهور المحلي إلى حجوزات وطلبات',
    focus: 'قوائم الطعام والمواقع وتجارب الحجز وSEO المحلي والتواصل مع الضيوف',
  },
  'real-estate': {
    label: 'Real Estate',
    labelAr: 'العقارات',
    geo: 'منطقة الخليج',
    challenge: 'مساعدة المشترين والمستأجرين على إيجاد العقار المناسب وتقديم استفسار مفيد',
    focus: 'اكتشاف العقارات وتأهيل الفرص ورحلات الحملات وتسليم البيانات إلى CRM',
  },
  clinics: {
    label: 'Clinics & Healthcare',
    labelAr: 'العيادات والرعاية الصحية',
    geo: 'منطقة الخليج',
    challenge: 'تسهيل الوصول إلى المعلومات الموثوقة وخيارات حجز المواعيد',
    focus: 'معلومات المرضى والظهور المحلي والسمعة وسهولة الوصول وتجارب الحجز',
  },
  'professional-services': {
    label: 'Professional Services',
    labelAr: 'الخدمات المهنية',
    geo: 'منطقة الخليج',
    challenge: 'تحويل الخبرة والإحالات إلى رحلة استفسار أكثر اتساقاً',
    focus: 'الموثوقية ومحتوى الخبراء والظهور في البحث واستفسارات الاستشارة المنظمة',
  },
  'manufacturing-industrial': {
    label: 'Manufacturing & Industrial',
    labelAr: 'التصنيع والصناعة',
    geo: 'منطقة الخليج',
    challenge: 'عرض المنتجات المعقدة بوضوح ضمن دورات مبيعات طويلة ومتعددة اللغات',
    focus: 'الكتالوجات التقنية وبوابات الوكلاء والنشر متعدد اللغات وتوجيه الاستفسارات',
  },
  'b2b-businesses': {
    label: 'B2B Businesses',
    labelAr: 'شركات B2B',
    geo: 'منطقة الخليج',
    challenge: 'دعم دورات الشراء الطويلة عبر تأهيل أوضح وقياس أفضل',
    focus: 'رحلات المشترين والمحتوى المفيد وأولويات الحسابات وتوجيه الفرص وتقارير مسار المبيعات',
  },
  'law-firms': {
    label: 'Law Firms',
    labelAr: 'مكاتب المحاماة',
    geo: 'منطقة الخليج',
    challenge: 'بناء الثقة وتوجيه الاستفسارات السرية بسهولة أكبر',
    focus: 'محتوى مجالات الممارسة والموثوقية المهنية والظهور في البحث وخيارات التواصل المنظمة',
  },
  'salons-beauty': {
    label: 'Salons & Beauty',
    labelAr: 'الصالونات والتجميل',
    geo: 'منطقة الخليج',
    challenge: 'ربط الظهور على وسائل التواصل الاجتماعي والبحث المحلي بالحجز وإعادة الحجز',
    focus: 'المحتوى البصري وSEO المحلي ومعلومات الخدمات وأدوات الحجز ومتابعة العملاء',
  },
  'auto-repair': {
    label: 'Auto Repair',
    labelAr: 'ورش السيارات',
    geo: 'منطقة الخليج',
    challenge: 'مساعدة السائقين على إيجاد الخدمة المناسبة والتواصل مع الورشة بسرعة',
    focus: 'الظهور على الخرائط ومعلومات الخدمات والسمعة والمكالمات وطلبات الأسعار والمواعيد',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; industry: string }>
}): Promise<Metadata> {
  const { slug, industry } = await params
  const service = await getArService(slug)
  const ind = INDUSTRY_META[industry]
  if (!service || !ind) return {}

  return buildMetadata({
    title: `${service.nameAr} لقطاع ${ind.labelAr}`,
    description: `خدمة ${service.nameAr} لقطاع ${ind.labelAr} في ${ind.geo}، مصممة حول ${ind.challenge}.`,
    path: `/ar/services/${slug}/${industry}`,
    alternatePath: `/services/${slug}/${industry}`,
    locale: 'ar',
  })
}

export default async function ArServiceIndustryPage({
  params,
}: {
  params: Promise<{ slug: string; industry: string }>
}) {
  const { slug, industry } = await params
  const [service, ind] = await Promise.all([getArService(slug), Promise.resolve(INDUSTRY_META[industry])])

  if (!service || !ind) notFound()

  const Icon = service.icon
  const name = service.nameAr
  const short = service.shortAr
  const value = service.valueAr
  const deliverables = service.deliverablesAr
  const process = service.processAr

  const faqs = [
    {
      q: `كم تستغرق خدمة ${name} لقطاع ${ind.labelAr}؟`,
      a: 'تعتمد المدة على المخرجات المتفق عليها وجاهزية المحتوى والتكاملات والموافقات والتبعيات التقنية. بعد المراجعة الأولية، نقدم جدولاً زمنياً تقديرياً مع نطاق العمل المقترح.',
    },
    {
      q: `كيف تكيّفون خدمة ${name} لقطاع ${ind.labelAr}؟`,
      a: `نبدأ برحلة العميل ومتطلبات التشغيل والسياق المحلي وأي قيود تنظيمية ذات صلة. ثم نختار المخرجات التي تدعم أولوياتك وأنظمتك الحالية فقط.`,
    },
    {
      q: 'ماذا يتضمن التدقيق المجاني؟',
      a: 'مراجعة مركزة لموقعك وSEO التقني وتموضع المنافسين وفرص التحسين ذات الأولوية. نستهدف إرسال ملخص مكتوب خلال يومي عمل، من دون أي التزام بالاستمرار.',
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={`${name} · ${ind.labelAr}`}
        title={
          <>
            خدمة {name} مصممة{' '}
            <span className="text-teal">لقطاع {ind.labelAr}.</span>
          </>
        }
        description={`${short} نطبقها بما يناسب أولويات قطاع ${ind.labelAr}، ومنها ${ind.challenge}.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            اطلب تدقيقك المجاني <ArrowRight size={16} className="rotate-180" />
          </Link>
          <Link
            href={`/ar/services/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            تفاصيل خدمة {name}
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
              <Icon size={26} />
            </span>
            <h2 className="mt-6 font-display text-h2 font-semibold text-white">{value}</h2>
            <p className="mt-4 text-body-lg text-white/70">
              لقطاع {ind.labelAr} في {ind.geo}، نُشكّل نطاق العمل حول {ind.focus}. وتحدد
              المراجعة الأولية الأولويات المناسبة لعملائك وفريقك وأنظمتك وميزانيتك.
            </p>
            <Link
              href={`/ar/industries/${industry}`}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-teal hover:underline"
            >
              استكشف حلولنا لقطاع {ind.labelAr} ←
            </Link>
          </div>
          {deliverables.length > 0 ? (
            <ul className="grid grid-cols-1 gap-3">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3 rounded-xl border border-border-dark bg-surface p-4">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                    <Check size={12} />
                  </span>
                  <span className="text-[14px] text-white/80">{d}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-border-dark bg-surface p-6 text-white/70">
              نحدد المخرجات بعد المراجعة الأولية ونوثقها في عرض المشروع.
            </p>
          )}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="كيف نعمل"
          title={`كيف ننفذ ${name} لقطاع ${ind.labelAr}`}
          description="نكيّف التسلسل وفق نطاق العمل، ونوضح المسؤوليات ونقاط المراجعة والقرارات قبل بدء التنفيذ."
        />
        {process.length > 0 ? (
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step} className="rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
                <span className="font-display text-[40px] font-extrabold leading-none text-teal/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[17px] font-semibold text-void dark:text-white">{p.step}</h3>
                <p className="mt-1 text-[13px] text-void/60 dark:text-white/60">{p.detail}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 text-void/70 dark:text-white/70">
            ندرج مراحل التنفيذ ونقاط المراجعة المقترحة ضمن نطاق العمل.
          </p>
        )}
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="الأسئلة الشائعة"
            title={`أسئلة حول ${name} لقطاع ${ind.labelAr}`}
            description="تساعدنا المراجعة الأولية على تقديم إجابات مبنية على وضعك الحالي وأولوياتك."
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        heading={`هل تخطط لتحسين الرحلة الرقمية لقطاع ${ind.labelAr}؟`}
        body={`شاركنا أهدافك وقيودك، وسنقترح نطاقًا لخدمة ${name} يتوافق مع أولوياتك وميزانيتك.`}
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقك المجاني"
        secondaryHref={`/ar/industries/${industry}`}
        secondaryLabel={`حلول قطاع ${ind.labelAr}`}
      />
    </>
  )
}
