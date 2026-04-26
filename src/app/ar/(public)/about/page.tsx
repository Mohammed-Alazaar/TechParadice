import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { BRAND, SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'من نحن | TechParadice',
  description: `تك باراديس وكالة رقمية متكاملة بقيادة مؤسسها ${BRAND.owner}. فريق واحد، كفاءات متعددة.`,
  alternates: { canonical: `${SITE_URL}/ar/about` },
  openGraph: { locale: 'ar_SA' },
}

const values = [
  { title: 'بلا حشو', body: 'نطاقات واضحة وأرقام واضحة وتواصل واضح. نحترم وقتك.' },
  { title: 'تنفيذ كبار فقط', body: 'لا مبتدئين. كل شخص في مشروعك أطلق منتجات حقيقية.' },
  { title: 'تسعير شفاف', body: 'ميزانية محددة مسبقاً. بلا نسب غامضة وبلا فواتير مفاجئة.' },
  { title: 'مبني للشحن', body: 'نقيس أنفسنا بالنتائج في الإنتاج — لا بالعروض التقديمية.' },
]

const disciplines = [
  'استراتيجية المنتج',
  'تصميم UI/UX',
  'هندسة الواجهة الأمامية',
  'هندسة الموبايل',
  'SEO والتحليلات',
  'الإعلانات المدفوعة',
  'المحتوى والكتابة',
  'المجتمع والعمليات',
]

export default function ArAboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title={
          <>
            فريق رقمي متكامل،{' '}
            <span className="text-teal">بقيادة مؤسسه.</span>
          </>
        }
        description={`تك باراديس بُنيت وتُقاد من ${BRAND.owner} في ${BRAND.location}. فريق واحد، مسؤولية واحدة، تنفيذ كبار عبر كل التخصصات.`}
      />

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-caption uppercase text-teal">قصتنا</p>
            <div className="mt-4 space-y-4 text-body-lg text-white/75">
              <p>
                أسست تك باراديس لأنني كنت أرى شركات جيدة تدفع لثلاث وكالات
                لإنجاز ما يمكن لفريق واحد منسق أن يفعله بشكل أفضل. وكالة موقع
                هنا، وفريق سوشيال هناك، ومستشار مدفوع بالساعة — كلهم يتعثرون
                ببعضهم ولا أحد يملك النتيجة.
              </p>
              <p>
                تك باراديس تطوي هذا كله. تحصل على فريق واحد كبير عبر الويب
                والموبايل والتصميم والـ SEO والمحتوى والسوشيال والمجتمع
                والتحليلات والإعلانات. خطة واحدة. رقم واحد تتصل به.
              </p>
              <p>
                نحن نبقى بحجم مدروس — فريق أساسي بالإضافة إلى شبكة من كبار
                المستقلين المختارين بعناية، يُجمَعون لكل مشروع. هكذا نقدم
                عمل جودة الاستوديو بدون تكاليف الاستوديو.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border-dark bg-surface p-8">
            <p className="text-caption uppercase text-teal">المؤسس</p>
            <p className="mt-4 font-display text-h2 font-bold text-white">{BRAND.owner}</p>
            <p className="mt-1 text-muted">{BRAND.location}</p>
            <div className="mt-6 space-y-3 text-[15px] text-white/70">
              <p>مهندس ومشغّل بخبرة 10+ سنوات في بناء المنتجات الرقمية وإطلاقها.</p>
              <p>
                متواجد بشكل عملي عبر الاستراتيجية وتوجيه التصميم والكود —
                متفاعل في كل مشاركة من الانطلاق حتى الإطلاق.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="ما نؤمن به" title="أربعة ثوابت لا تقبل التنازل" />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="rounded-xl border border-border-dark bg-void p-6">
              <span className="mb-3 inline-block h-px w-8 bg-teal" />
              <h3 className="font-display text-h4 font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-[14px] text-white/60">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="الشبكة"
            title={<>شبكة موثوقة، <span className="text-teal">بقيادة {BRAND.owner}.</span></>}
            description="متخصصون كبار يُجمَعون لكل مشروع. كل مساهم مختار بعناية، مرتبط بعقد، ومُراجَع بعد كل مشاركة."
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {disciplines.map((d) => (
              <li
                key={d}
                className="flex items-center gap-3 rounded-lg border border-border-dark bg-surface px-4 py-3 text-[15px] text-white/80"
              >
                <span aria-hidden className="h-px w-5 bg-teal" />
                {d}
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
