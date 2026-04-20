import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: `The terms that govern your use of ${BRAND.name}.`,
  path: '/terms',
})

export default function TermsPage() {
  return (
    <Section tone="void" className="pt-32 sm:pt-40 lg:pt-48">
      <div className="mx-auto max-w-reading">
        <p className="text-caption uppercase text-teal">Legal</p>
        <h1 className="mt-3 heading-h1 text-white">Terms of Service</h1>
        <p className="mt-2 text-[13px] text-muted">
          Last updated: April 2026
        </p>
        <div className="mt-10 space-y-6 text-body leading-relaxed text-white/80">
          <p>
            By accessing or using the {BRAND.name} website, you agree to these
            terms. Engagements beyond the website are governed by a separate
            signed agreement.
          </p>
          <h2 className="heading-h3 text-white">Use of the site</h2>
          <p>
            You agree not to misuse the site — including attempting to
            disrupt, scrape aggressively, or reverse-engineer its systems.
          </p>
          <h2 className="heading-h3 text-white">Intellectual property</h2>
          <p>
            All site content — copy, design, marks, and code — is owned by
            {` `}{BRAND.name} unless otherwise noted. You may not copy or
            redistribute without permission.
          </p>
          <h2 className="heading-h3 text-white">Disclaimers</h2>
          <p>
            The site is provided “as is.” We make no warranties about
            availability or fitness for a particular purpose beyond what is
            required by law.
          </p>
          <h2 className="heading-h3 text-white">Contact</h2>
          <p>
            Questions? Email{' '}
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
