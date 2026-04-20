import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How TechParadice collects, uses, and protects your data.`,
  path: '/privacy-policy',
})

export default function PrivacyPage() {
  return (
    <Section tone="void" className="pt-32 sm:pt-40 lg:pt-48">
      <div className="mx-auto max-w-reading">
        <p className="text-caption uppercase text-teal">Legal</p>
        <h1 className="mt-3 heading-h1 text-white">Privacy Policy</h1>
        <p className="mt-2 text-[13px] text-muted">
          Last updated: April 2026
        </p>
        <div className="mt-10 space-y-6 text-body leading-relaxed text-white/80">
          <p>
            This policy describes how {BRAND.name} (“we”, “us”) collects, uses,
            and protects information when you use our website or engage our
            services.
          </p>
          <h2 className="heading-h3 text-white">Information we collect</h2>
          <p>
            We collect information you voluntarily submit through forms
            (name, email, company, message), and standard analytics data such
            as pages viewed, device type, and referral source.
          </p>
          <h2 className="heading-h3 text-white">How we use it</h2>
          <p>
            Form submissions are used only to respond to your inquiry.
            Analytics data is aggregated and used to improve the site.
            We never sell your information.
          </p>
          <h2 className="heading-h3 text-white">Cookies</h2>
          <p>
            We use cookies for essential site functionality and privacy-safe
            analytics. You can disable cookies in your browser at any time.
          </p>
          <h2 className="heading-h3 text-white">Contact</h2>
          <p>
            Questions about this policy? Email{' '}
            <a href={`mailto:${BRAND.email}`} className="text-teal hover:underline">
              {BRAND.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  )
}
