import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'
import { BasicPageSchema } from '@/components/seo/PageSchema'
import { BRAND } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: `Read the terms that apply when you access and use the ${BRAND.name} website.`,
  path: '/terms',
})

export default function TermsPage() {
  return (
    <Section tone="void" className="pt-32 sm:pt-40 lg:pt-48">
      <BasicPageSchema
        locale="en"
        path="/terms"
        type="WebPage"
        name="Terms of Service"
        description="Read the terms that apply when you access and use the TechParadice website."
        crumb="Terms"
      />
      <div className="mx-auto max-w-reading">
        <p className="text-caption uppercase text-teal">Legal</p>
        <h1 className="mt-3 heading-h1 text-white">Terms of Service</h1>
        <p className="mt-2 text-[13px] text-muted">
          Last updated: 14 July 2026
        </p>
        <div className="mt-10 space-y-6 text-body leading-relaxed text-white/80">
          <p>
            These terms apply to your access to and use of the {BRAND.name}
            website. By using the site, you agree to follow them. Client work,
            proposals, payments, deliverables, and project responsibilities are
            governed by a separate written agreement.
          </p>
          <h2 className="heading-h3 text-white">Use of the site</h2>
          <p>
            You may use the site for lawful purposes and to learn about or
            contact us regarding our services. You must not disrupt the site,
            attempt unauthorised access, introduce malicious code, scrape it in
            a way that harms its operation, or misuse its content or systems.
          </p>
          <h2 className="heading-h3 text-white">Website information</h2>
          <p>
            We aim to keep website information clear and current, but content
            may contain errors or become outdated. Articles, examples, and
            general guidance are informational and are not a substitute for
            advice tailored to your circumstances.
          </p>
          <h2 className="heading-h3 text-white">Intellectual property</h2>
          <p>
            Unless otherwise stated, the site&apos;s copy, design, graphics,
            branding, and code are owned by or licensed to {BRAND.name}. You may
            view them for personal or internal business evaluation, but you may
            not reproduce, modify, distribute, or commercially exploit them
            without written permission.
          </p>
          <h2 className="heading-h3 text-white">Third-party services and links</h2>
          <p>
            The site may link to or rely on third-party services. We are not
            responsible for their content, availability, security, or terms.
            Your use of those services is subject to the provider&apos;s own
            policies.
          </p>
          <h2 className="heading-h3 text-white">Availability and disclaimers</h2>
          <p>
            The site is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. To the extent permitted by law, we do not
            guarantee uninterrupted availability, error-free operation, or
            suitability for a particular purpose.
          </p>
          <h2 className="heading-h3 text-white">Changes to these terms</h2>
          <p>
            We may update these terms when the website or our practices change.
            The date above shows the latest revision. Continued use of the site
            after an update means the revised terms apply to that use.
          </p>
          <h2 className="heading-h3 text-white">Contact</h2>
          <p>
            For questions about these terms, email{' '}
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
