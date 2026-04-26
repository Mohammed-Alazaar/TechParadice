import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { BRAND, SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'تواصل | TechParadice',
  description: 'أخبرنا ما تبني. سنرد خلال يوم عمل واحد.',
  alternates: { canonical: `${SITE_URL}/ar/contact` },
  openGraph: { locale: 'ar_SA' },
}

export default function ArContactPage() {
  return (
    <>
      <PageHero
        eyebrow="تواصل"
        title={<>ابدأ <span className="text-teal">محادثة.</span></>}
        description="أخبرنا ما تبني. سنرد خلال يوم عمل واحد."
      />

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-8">
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

            <div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-teal" />
                <p className="text-caption uppercase text-teal">الموقع</p>
              </div>
              <p className="mt-2 text-[15px] text-white/80">أنقرة، تركيا</p>
            </div>

            <div className="rounded-xl border border-border-dark bg-surface p-6">
              <p className="font-display text-h4 font-semibold text-white">احجز مكالمة</p>
              <p className="mt-2 text-[14px] text-white/60">
                تفضل الحديث؟ احجز مكالمة اكتشاف مدتها 30 دقيقة عبر Calendly.
              </p>
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-teal hover:underline"
              >
                احجز عبر Calendly →
              </a>
            </div>
          </div>

          <ContactForm locale="ar" />
        </div>
      </Section>
    </>
  )
}
