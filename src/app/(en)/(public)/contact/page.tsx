import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Mail, MapPin } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { BRAND } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'
import { BasicPageSchema } from '@/components/seo/PageSchema'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: `Contact TechParadice to discuss your website, product, SEO, content, or digital growth goals.`,
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <BasicPageSchema
        locale="en"
        path="/contact"
        type="ContactPage"
        name="Contact"
        description="Contact TechParadice to discuss your website, product, SEO, content, or digital growth goals."
        crumb="Contact"
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s discuss what your business{' '}
            <span className="text-teal">needs next.</span>
          </>
        }
        description="Share your goals, constraints, and current challenges. We review every message and aim to reply within one business day."
      />

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <aside className="space-y-8">
            <div>
              <p className="text-caption uppercase text-teal">Email us</p>
              <Link
                href={`mailto:${BRAND.email}`}
                className="mt-3 inline-flex items-center gap-2 font-display text-h3 font-semibold text-white hover:text-teal"
              >
                <Mail size={20} />
                {BRAND.email}
              </Link>
            </div>
            <div className="h-px w-full bg-border-dark" />
            <ul className="space-y-5 text-[15px] text-white/80">
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 text-teal" />
                <div>
                  <p className="font-semibold text-white">Response time</p>
                  <p className="text-white/60">Usually within one business day, Monday–Friday.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-teal" />
                <div>
                  <p className="font-semibold text-white">Based in</p>
                  <p className="text-white/60">{BRAND.location}</p>
                </div>
              </li>
            </ul>
            <div className="rounded-2xl border border-border-dark bg-surface p-6">
              <p className="text-caption uppercase text-teal">Prefer a call?</p>
              <p className="mt-3 text-[15px] text-white/80">
                Complete the form and ask for a call. We will suggest a time
                to discuss your priorities and answer the initial questions.
              </p>
            </div>
          </aside>

          <div className="rounded-2xl border border-border-dark bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  )
}
