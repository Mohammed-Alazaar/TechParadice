import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices } from '@/lib/services'
import { SITE_URL } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'الخدمات | TechParadice',
  description: 'مواقع، تطبيقات، تصميم، SEO، سوشيال ومحتوى — فريق واحد متكامل.',
  alternates: { canonical: `${SITE_URL}/ar/services` },
  openGraph: { locale: 'ar_SA' },
}

const overviewFaqs = [
  {
    q: 'هل يمكنني العمل معكم على خدمة واحدة فقط؟',
    a: 'بالتأكيد. ابدأ بما تحتاجه — معظم عملائنا يضيفون خدمات مع نمو العلاقة.',
  },
  {
    q: 'هل أحتاج إلى معرفة ما أريده قبل التواصل؟',
    a: 'لا. شارك هدفك وقيودك. سنحدد المسار والمخرجات معاً.',
  },
  {
    q: 'كيف تسعّرون المشاريع؟',
    a: 'على أساس الميزانية. نقترح نطاقاً يناسب هدفك وننفذ بشفافية.',
  },
  {
    q: 'أين يتمركز فريقكم؟',
    a: 'مقرنا في أنقرة، تركيا. مع شبكة من كبار المستقلين المنتشرين في أوروبا والشرق الأوسط.',
  },
]

export default async function ArServicesPage() {
  const services = await getServices()

  return (
    <>
      <PageHero
        eyebrow="الخدمات"
        title={
          <>
            كل ما تحتاجه للنمو أونلاين،{' '}
            <span className="text-teal">تحت سقف واحد.</span>
          </>
        }
        description="تسع كفاءات متخصصة. عقد واحد، مسؤولية واحدة، خطة متكاملة."
      />

      <Section tone="void" className="pt-0">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <li key={service.slug}>
                <Link
                  href={`/ar/services/${service.slug}`}
                  className="group relative block h-full overflow-hidden rounded-xl border border-border-dark bg-surface p-6 transition-all hover:-translate-y-1 hover:border-teal/50"
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-teal" />
                  </div>
                  <h2 className="mt-6 font-display text-h4 font-semibold text-white">
                    {service.nameAr ?? service.name}
                  </h2>
                  <p className="mt-2 text-[14px] text-white/60">
                    {service.shortAr ?? service.short}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section tone="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">أفضل معاً</p>
            <h2 className="mt-4 heading-h2 text-balance text-white">
              معظم عملائنا يعملون معنا على{' '}
              <span className="text-teal">ثلاث خدمات أو أكثر.</span>
            </h2>
            <p className="mt-4 text-body-lg text-white/70">
              التنفيذ المنسق عبر الويب والتصميم والمحتوى والنمو يتفوق على خمسة موردين
              منفصلين في كل مرة. خطة خلفية واحدة، فريق واحد مسؤول عن النتائج.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              'ويب + SEO + محتوى',
              'ويب + تصميم + تحليلات',
              'موبايل + تصميم + تحليلات',
              'سوشيال + محتوى + إعلانات',
              'SEO + محتوى + إعلانات',
              'ويب + موبايل + تصميم',
            ].map((combo) => (
              <li
                key={combo}
                className="rounded-xl border border-border-dark bg-void p-5 font-display text-[16px] font-semibold text-white"
              >
                <span className="mb-2 inline-block h-px w-6 bg-teal" />
                <div>{combo}</div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="void">
        <SectionHeading
          eyebrow="أسئلة شائعة"
          title="أسئلة حول الخدمات"
          description="أسئلة أكثر تحديداً؟ كل صفحة خدمة تحتوي على قسم أسئلة شائعة خاص بها."
        />
        <div className="mt-10 max-w-3xl">
          <ul className="divide-y divide-border-dark">
            {overviewFaqs.map((faq) => (
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
