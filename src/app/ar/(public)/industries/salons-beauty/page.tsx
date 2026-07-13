import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي للصالونات ومراكز التجميل',
  description:
    'أنظمة حجز، محتوى إنستغرام، سيو محلي، وإعلانات مدفوعة لصالونات الشعر ومراكز الأظافر والسبا ومشاريع التجميل في الخليج.',
  path: '/ar/industries/salons-beauty',
  alternatePath: '/industries/salons-beauty',
  locale: 'ar',
})

const services = [
  { title: 'تكامل الحجز الإلكتروني', detail: 'أدوات حجز سلسة تتيح للعملاء الجدولة الذاتية 24/7 من إنستغرام أو Google أو موقعك.' },
  { title: 'محتوى إنستغرام وتيك توك', detail: 'خطط محتوى جذابة وكتابة تعليقات وجداول نشر مصمّمة لتنمية متابعيك وملء مواعيدك.' },
  { title: 'السيو المحلي وGoogle Business Profile', detail: 'ملفات محسّنة واستهداف كلمات محلية حتى تظهر حين يبحث الناس عن "صالون قريب مني".' },
  { title: 'حملات السوشيال المدفوعة', detail: 'إعلانات Meta وتيك توك مستهدفة تصل لعملاء جدد في منطقتك في اللحظة المناسبة.' },
  { title: 'سير الولاء والإحالة', detail: 'رسائل آلية تشجع على إعادة الحجز وتحوّل العملاء السعداء إلى أفضل مسوّقيك.' },
  { title: 'تطوير المواقع', detail: 'مواقع سريعة وجذابة بصرياً تعرض أعمالك وتحوّل الزوار إلى مواعيد محجوزة.' },
]

const results = [
  { value: '2.8x', label: 'متوسط زيادة الحجوزات' },
  { value: '< 3 أسابيع', label: 'أول نتائج' },
  { value: '4.9★', label: 'متوسط تقييم Google' },
]

export default function ArSalonsBeautyPage() {
  return (
    <>
      <PageHero
        eyebrow="الصالونات والتجميل"
        title={
          <>
            امتلئ كراسيك بـ
            <span className="text-teal">رقمي يحوّل.</span>
          </>
        }
        description="عملاء التجميل يكتشفونك على إنستغرام ويحجزون عبر Google. نضمن أنك موجود وتبدو رائعاً وسهل الحجز — في كل مكان ينظرون."
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
          eyebrow="ما نقدمه للصالونات والتجميل"
          title="كل نقطة تواصل من الاكتشاف إلى إعادة الحجز"
          description="نغطي رحلة عميل التجميل الكاملة — من أول تمرير إلى زبون وفي."
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
        heading="مستعد لملء روزنامتك؟"
        body="شاركنا رابط صالونك — سنراجع حضورك الأونلاين ونجد أكبر الفرص."
        ctaHref="/ar/free-audit"
        ctaLabel="احصل على تدقيق مجاني"
        secondaryHref="/ar/work"
        secondaryLabel="أعمالنا"
      />
    </>
  )
}
