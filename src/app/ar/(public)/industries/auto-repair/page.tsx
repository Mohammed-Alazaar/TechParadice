import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي لورش السيارات',
  description:
    'SEO محلي، وحملات بحث، ودعم للسمعة، ومواقع، ومسارات للحجز تناسب ورش السيارات ومراكز الخدمة.',
  path: '/ar/industries/auto-repair',
  alternatePath: '/industries/auto-repair',
  locale: 'ar',
})

const services = [
  { title: 'SEO محلي والظهور على الخرائط', detail: 'تحسين Google Business Profile ودقة بيانات النشاط ومحتوى خدمات ذي صلة بالموقع الجغرافي.' },
  { title: 'حملات بحث Google', detail: 'حملات منظمة وفق نوع الخدمة والموقع ونية البحث والمكالمات أو الاستفسارات القابلة للتتبع.' },
  { title: 'دعم السمعة', detail: 'طلبات تقييم بعد انتهاء الخدمة وإرشادات للرد، تساعد العملاء على تقييم نشاطك.' },
  { title: 'الحجز الإلكتروني وعروض الأسعار', detail: 'نماذج عملية للحجز وطلب التقدير، تجمع التفاصيل التي يحتاج إليها فريقك.' },
  { title: 'تطوير المواقع', detail: 'مواقع سريعة ومتوافقة مع الجوال، تعرض الخدمات والموقع وخيارات الاتصال والحجز بوضوح.' },
  { title: 'منصات التواصل', detail: 'أمثلة للخدمات وإرشادات للصيانة وتحديثات الورشة والعروض، منظمة ضمن خطة محتوى مفيدة.' },
]

const results = [
  { value: 'العثور', label: 'ظهور محلي دقيق للخدمات ذات الصلة' },
  { value: 'الاختيار', label: 'أدلة وتقييمات ومعلومات واضحة عن الورشة' },
  { value: 'الحجز', label: 'خيارات سهلة للمكالمة وطلب السعر والموعد' },
]

export default function ArAutoRepairPage() {
  return (
    <>
      <PageHero
        eyebrow="ورش السيارات"
        title={
          <>
            سهّل على السائقين في منطقتك{' '}
            <span className="text-teal">العثور على ورشتك والتواصل معها.</span>
          </>
        }
        description="اجمع حضورك في البحث المحلي ومعلومات الخدمات والتقييمات والحملات وخيارات الحجز ضمن رحلة واضحة للعميل."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ar/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            اطلب تدقيقاً مجانياً
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
          eyebrow="ما نقدمه لورش السيارات"
          title="ادعم الرحلة من البحث إلى الخدمة"
          description="وفر للسائقين المعلومات وخيارات التواصل التي يحتاجون إليها، وساعد فريقك على جمع تفاصيل مفيدة للحجز."
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
        heading="هل تريد تحسين رحلة عملائك المحليين؟"
        body="شاركنا رابط موقع الورشة وأولوياتك. سنراجع حضورك الرقمي ونحدد تحسينات عملية."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
