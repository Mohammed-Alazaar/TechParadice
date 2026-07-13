import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Faq } from '@/components/sections/Faq'
import { getService } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 3600

const INDUSTRY_META: Record<string, { label: string; labelAr: string; geo: string; painPoint: string; proof: string }> = {
  restaurants:              { label: 'Restaurants',              labelAr: 'المطاعم',                  geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'الطاولات الفارغة وضعف التواجد الإلكتروني',           proof: 'المطاعم التي نعمل معها ترى ثلاثة أضعاف الحجوزات خلال 6 أسابيع' },
  'real-estate':            { label: 'Real Estate',              labelAr: 'العقارات',                  geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'العملاء المحتملين منخفضي الجودة وهدر الإنفاق الإعلاني', proof: 'عملاء العقارات يُبلّغون عن 2.4 ضعف العملاء المحتملين بتكلفة أقل 31%' },
  clinics:                  { label: 'Clinics',                  labelAr: 'العيادات',                  geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'المواعيد الفائتة وضعف الحضور الإلكتروني',               proof: 'عملاء الرعاية الصحية يحققون متوسط نمو 2.1 ضعف في المواعيد خلال 4 أسابيع' },
  'professional-services':  { label: 'Professional Services',    labelAr: 'الخدمات المهنية',           geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'غياب تدفق العملاء الداخليين المنتظم',                  proof: 'شركات الخدمات المهنية ترى نمواً 89% في حركة البحث العضوي' },
  'manufacturing-industrial': { label: 'Manufacturing',          labelAr: 'التصنيع',                   geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'دورات المبيعات البطيئة وكتالوجات المنتجات الصعبة',      proof: 'عملاء التصنيع يطلقون منصات متعددة اللغات في 20 أسبوعاً' },
  'b2b-businesses':         { label: 'B2B Businesses',           labelAr: 'شركات B2B',                geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'دورات المبيعات الطويلة وغياب نسب العائد التسويقية',    proof: 'عملاء B2B يحققون 3.2 ضعف عائد الاستثمار وزيادة 112% في حركة البحث' },
  'law-firms':              { label: 'Law Firms',                labelAr: 'مكاتب المحامين',            geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'الاعتماد المفرط على الإحالات وضعف ظهور البحث',          proof: 'عملاء مكاتب المحامين يرون 3.1 ضعف الاستشارات بتكلفة أقل 29%' },
  'salons-beauty':          { label: 'Salons & Beauty',          labelAr: 'الصالونات والتجميل',        geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'الكراسي الفارغة وضعف التفاعل على إنستغرام',             proof: 'عملاء التجميل يرون 2.8 ضعف الحجوزات في أقل من 3 أسابيع' },
  'auto-repair':            { label: 'Auto Repair',              labelAr: 'ورش السيارات',              geo: 'منطقة دول مجلس التعاون الخليجي', painPoint: 'انخفاض حجم المكالمات وضعف نتائج البحث المحلي',          proof: 'ورش السيارات ترى 4.1 ضعف المكالمات والمرتبة الأولى على Google في 6 أسابيع' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; industry: string }>
}): Promise<Metadata> {
  const { slug, industry } = await params
  const service = await getService(slug)
  const ind = INDUSTRY_META[industry]
  if (!service || !ind) return {}

  return buildMetadata({
    title: `${service.nameAr ?? service.name} لـ${ind.labelAr}`,
    description: `${service.nameAr ?? service.name} مبني خصيصاً لـ${ind.labelAr} في ${ind.geo}. نعالج ${ind.painPoint}.`,
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
  const [service, ind] = await Promise.all([getService(slug), Promise.resolve(INDUSTRY_META[industry])])

  if (!service || !ind) notFound()

  const Icon = service.icon

  const faqs = [
    {
      q: `كم من الوقت يستغرق تحقيق نتائج ${service.nameAr ?? service.name} لأعمال ${ind.labelAr}؟`,
      a: `تظهر النتائج الأولى عادةً خلال 4-8 أسابيع. ${ind.proof}.`,
    },
    {
      q: `هل تتخصصون في قطاع ${ind.labelAr}؟`,
      a: `نعم. عملنا مع أعمال ${ind.labelAr} في منطقة دول مجلس التعاون الخليجي وبنينا عمليات مخصصة لرحلة المشتري البيئة المناسبة لقطاعك.`,
    },
    {
      q: 'ماذا يتضمن التدقيق المجاني؟',
      a: 'مراجعة موقعك الحالي، صحة السيو التقني، لمحة عن المنافسين، وخطة عمل ذات أولويات — تُسلَّم خلال 48 ساعة، بدون أي التزام.',
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={`${service.nameAr ?? service.name} · ${ind.labelAr}`}
        title={
          <>
            {service.nameAr ?? service.name} مبني لـ
            <span className="text-teal">{ind.labelAr}.</span>
          </>
        }
        description={`${service.shortAr ?? service.short} مصمم خصيصاً للتحديات التي تواجه أعمال ${ind.labelAr} — ${ind.painPoint}.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            احصل على تدقيق مجاني <ArrowRight size={16} className="rotate-180" />
          </Link>
          <Link
            href={`/ar/services/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            عن {service.nameAr ?? service.name}
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
              <Icon size={26} />
            </span>
            <h2 className="mt-6 font-display text-h2 font-semibold text-white">{service.value}</h2>
            <p className="mt-4 text-body-lg text-white/70">
              لـ{ind.labelAr} في المنطقة، هذا يعني: حل {ind.painPoint}، دون إضافة موارد بشرية أو تغيير ما يميزك.
            </p>
            <Link
              href={`/ar/industries/${industry}`}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-teal hover:underline"
            >
              صفحة {ind.labelAr} الكاملة ←
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3 rounded-xl border border-border-dark bg-surface p-4">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                  <Check size={12} />
                </span>
                <span className="text-[14px] text-white/80">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="كيف نعمل"
          title={`عملية ${service.nameAr ?? service.name} لـ${ind.labelAr}`}
          description="أربع خطوات واضحة — لا صناديق سوداء، لا أهداف متحركة."
        />
        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((p, i) => (
            <li key={p.step} className="rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
              <span className="font-display text-[40px] font-extrabold leading-none text-teal/25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-[17px] font-semibold text-void dark:text-white">{p.step}</h3>
              <p className="mt-1 text-[13px] text-void/60 dark:text-white/60">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="الأسئلة الشائعة"
            title={`${service.nameAr ?? service.name} لـ${ind.labelAr} — أسئلة`}
            description="أسئلة أكثر؟ التدقيق المجاني هو أسرع طريقة للحصول على إجابات محددة."
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        heading={`هل أنت مستعد لتنمية أعمال ${ind.labelAr}؟`}
        body={`أخبرنا بأهدافك. سنقترح نطاق ${service.nameAr ?? service.name} الذي يناسب ميزانيتك ويُطلَق في الوقت المحدد.`}
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref={`/ar/industries/${industry}`}
        secondaryLabel={`نظرة عامة على ${ind.labelAr}`}
      />
    </>
  )
}
