import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'التسويق الرقمي لمكاتب المحاماة',
  description:
    'مواقع تركز على الثقة، وSEO قانوني، وحملات بحث، واستفسارات منظمة، وتحليلات لمكاتب المحاماة والممارسات القانونية.',
  path: '/ar/industries/law-firms',
  alternatePath: '/industries/law-firms',
  locale: 'ar',
})

const services = [
  { title: 'مواقع لمكاتب المحاماة', detail: 'مواقع مهنية تشرح مجالات الممارسة والخبرة والمواقع وخيارات التواصل بوضوح.' },
  { title: 'المحتوى القانوني وSEO', detail: 'صفحات مفيدة لمجالات الممارسة وأسئلة شائعة وSEO تقني، منظمة وفق استفسارات البحث التي تهم العملاء.' },
  { title: 'حملات بحث Google', detail: 'حملات منظمة بعناية وفق مجالات الممارسة والمواقع ونية البحث ذات الصلة.' },
  { title: 'مسارات الاستفسارات', detail: 'نماذج منظمة وتوجيه وخطوات متابعة معتمدة، تساعد فريقك على الاستجابة باتساق.' },
  { title: 'دعم السمعة', detail: 'عمليات لطلب التقييمات وإعداد دراسات الحالة، مصممة حول الموافقة والمتطلبات المهنية المعمول بها.' },
  { title: 'التحليلات وإسناد مصادر الاستفسارات', detail: 'تقارير تربط بيانات البحث والحملات والموقع والاستفسارات المتاحة.' },
]

const results = [
  { value: 'الاكتشاف', label: 'ظهور مناسب عبر البحث والحملات' },
  { value: 'التقييم', label: 'خبرات وخدمات وتوقعات معروضة بوضوح' },
  { value: 'التواصل', label: 'خيارات منظمة وسرية لتقديم الاستفسارات' },
]

export default function ArLawFirmsPage() {
  return (
    <>
      <PageHero
        eyebrow="مكاتب المحاماة"
        title={
          <>
            ابنِ الثقة قبل{' '}
            <span className="text-teal">الاستشارة الأولى.</span>
          </>
        }
        description="ساعد العملاء المحتملين على فهم خبرتك وتقييم مدى ملاءمة خدماتك والتواصل مع الفريق المناسب عبر تجربة رقمية واضحة ومهنية."
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
          eyebrow="ما نقدمه لمكاتب المحاماة"
          title="ادعم الرحلة من البحث إلى الاستفسار"
          description="أنشئ مساراً موثوقاً وغنياً بالمعلومات، يساعد العملاء المحتملين على فهم متى وكيف يتواصلون مع مكتبك."
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
        heading="هل تريد حضوراً رقمياً أوضح لمكتبك؟"
        body="شاركنا رابط موقعك وأولوياتك. سنراجع التجربة الحالية ونحدد تحسينات عملية."
        ctaHref="/ar/free-audit"
        ctaLabel="اطلب تدقيقاً مجانياً"
        secondaryHref="/ar/work"
        secondaryLabel="اطّلع على أعمالنا"
      />
    </>
  )
}
