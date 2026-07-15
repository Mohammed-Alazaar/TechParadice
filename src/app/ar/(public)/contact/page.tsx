import type { Metadata } from 'next'
import { Clock, Mail, MapPin } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { BRAND } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'تواصل معنا',
  description: 'تواصل مع TechParadice لمناقشة أهدافك المتعلقة بالموقع أو المنتج أو SEO أو المحتوى أو النمو الرقمي.',
  path: '/ar/contact',
  alternatePath: '/contact',
  locale: 'ar',
})

export default function ArContactPage() {
  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title={<>لنتحدث عن <span className="text-teal">الخطوة التالية لعملك.</span></>}
        description="شاركنا أهدافك وقيودك والتحديات الحالية. نراجع كل رسالة ونسعى إلى الرد خلال يوم عمل واحد."
      />

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <aside className="space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-teal" />
                <p className="text-caption uppercase text-teal">البريد الإلكتروني</p>
              </div>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-2 block text-[15px] text-white/80 hover:text-teal"
              >
                {BRAND.email}
              </a>
            </div>

            <div className="h-px w-full bg-border-dark" />

            <ul className="space-y-5 text-[15px] text-white/80">
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 text-teal" />
                <div>
                  <p className="font-semibold text-white">مدة الرد</p>
                  <p className="text-white/60">عادة خلال يوم عمل واحد، من الاثنين إلى الجمعة.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-teal" />
                <div>
                  <p className="font-semibold text-white">مقرنا</p>
                  <p className="text-white/60">أنقرة، تركيا</p>
                </div>
              </li>
            </ul>

            <div className="rounded-2xl border border-border-dark bg-surface p-6">
              <p className="text-caption uppercase text-teal">تفضّل إجراء مكالمة؟</p>
              <p className="mt-3 text-[15px] text-white/80">
                املأ النموذج واطلب مكالمة، وسنقترح موعداً لمناقشة أولوياتك والإجابة عن الأسئلة الأولية.
              </p>
            </div>
          </aside>

          <div className="rounded-2xl border border-border-dark bg-surface p-6 sm:p-8">
            <ContactForm locale="ar" />
          </div>
        </div>
      </Section>
    </>
  )
}
