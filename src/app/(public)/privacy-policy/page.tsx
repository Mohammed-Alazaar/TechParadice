import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `Learn what information TechParadice collects through this website, why we use it, and how to contact us about your data.`,
  path: '/privacy-policy',
})

export default function PrivacyPage() {
  return (
    <Section tone="void" className="pt-32 sm:pt-40 lg:pt-48">
      <div className="mx-auto max-w-reading">
        <p className="text-caption uppercase text-teal">Legal</p>
        <h1 className="mt-3 heading-h1 text-white">Privacy Policy</h1>
        <p className="mt-2 text-[13px] text-muted">
          Last updated: 14 July 2026
        </p>
        <div className="mt-10 space-y-6 text-body leading-relaxed text-white/80">
          <p>
            This policy explains how {BRAND.name} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and
            safeguards information when you visit this website or contact us
            about our services.
          </p>
          <h2 className="heading-h3 text-white">Information you provide</h2>
          <p>
            When you submit a contact, audit, or quote form, we may collect your
            name, email address, company details, website address, budget range,
            and any information you include in your message.
          </p>
          <h2 className="heading-h3 text-white">Information collected automatically</h2>
          <p>
            We may collect standard technical and analytics information, such
            as pages viewed, approximate location, device and browser type,
            referral source, and interaction data. We use this information to
            understand website performance and improve the experience.
          </p>
          <h2 className="heading-h3 text-white">How we use information</h2>
          <p>
            We use submitted information to respond to enquiries, prepare
            requested audits or proposals, communicate about potential or active
            engagements, and maintain the security and operation of the website.
            We do not sell personal information.
          </p>
          <h2 className="heading-h3 text-white">Cookies</h2>
          <p>
            The website may use cookies or similar technologies for essential
            functionality and analytics. You can manage cookies through your
            browser settings, although disabling essential cookies may affect
            some site features.
          </p>
          <h2 className="heading-h3 text-white">Service providers</h2>
          <p>
            We may use trusted providers to host the website, process form
            submissions, support communications, or provide analytics. They
            receive only the information needed to perform those services and
            are expected to handle it appropriately.
          </p>
          <h2 className="heading-h3 text-white">Retention and security</h2>
          <p>
            We retain information for as long as reasonably needed to respond,
            provide services, maintain business records, or meet legal
            obligations. We use reasonable administrative and technical
            safeguards, but no online system can guarantee absolute security.
          </p>
          <h2 className="heading-h3 text-white">Your choices</h2>
          <p>
            You may contact us to ask about the personal information we hold or
            to request a correction or deletion. Some information may need to be
            retained for legal, security, or contractual reasons.
          </p>
          <h2 className="heading-h3 text-white">External links</h2>
          <p>
            Our website may link to third-party websites. Their privacy
            practices are governed by their own policies, not this one.
          </p>
          <h2 className="heading-h3 text-white">Contact</h2>
          <p>
            For privacy questions or requests, email{' '}
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
