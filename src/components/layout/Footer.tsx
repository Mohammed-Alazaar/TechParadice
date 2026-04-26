import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { BRAND } from '@/lib/utils'
import { getDictionary } from '@/lib/i18n'
import { getServices } from '@/lib/services'

interface FooterProps {
  locale?: 'en' | 'ar'
}

export async function Footer({ locale = 'en' }: FooterProps) {
  const services = await getServices()
  const year = new Date().getFullYear()
  const d = getDictionary(locale)
  const p = locale === 'ar' ? '/ar' : ''
  const homeHref = locale === 'ar' ? '/ar' : '/'

  const companyLinks = [
    { href: `${p}/about`, label: d.footer.about },
    { href: `${p}/process`, label: d.footer.process },
    { href: `${p}/portfolio`, label: d.footer.portfolio },
    { href: `${p}/blog`, label: d.footer.blog },
    { href: `${p}/pricing`, label: d.footer.pricing },
    { href: `${p}/contact`, label: d.footer.contact },
  ]

  return (
    <footer className="border-t border-border-light bg-white text-void dark:border-border-dark dark:bg-void dark:text-white">
      <div className="container-content py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href={homeHref} aria-label="TechParadice — Home">
              <Wordmark size="md" />
            </Link>
            <p className="mt-4 max-w-xs text-[14px] text-void/60 dark:text-white/60">
              {locale === 'ar' ? 'موقع. تطبيق. سيو. سوشيال. جاهز.' : BRAND.taglineShort}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="https://twitter.com/" aria-label="Twitter / X" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Twitter size={18} />
              </Link>
              <Link href="https://linkedin.com/" aria-label="LinkedIn" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Linkedin size={18} />
              </Link>
              <Link href="https://github.com/" aria-label="GitHub" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Github size={18} />
              </Link>
              <Link href={`mailto:${BRAND.email}`} aria-label="Email" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Mail size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">{d.footer.services}</h3>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${p}/services/${s.slug}`}
                    className="text-[14px] text-void/70 transition-colors hover:text-teal dark:text-white/70"
                  >
                    {locale === 'ar' && s.nameAr ? s.nameAr : s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">{d.footer.company}</h3>
            <ul className="flex flex-col gap-2">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[14px] text-void/70 hover:text-teal dark:text-white/70">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">{d.footer.contact}</h3>
            <ul className="flex flex-col gap-2 text-[14px] text-void/70 dark:text-white/70">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-teal">{BRAND.email}</a></li>
              <li>{locale === 'ar' ? d.about.location : BRAND.location}</li>
              <li>{d.footer.response}</li>
            </ul>

            <form className="mt-6 flex gap-2" action="/api/contact" method="post" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder={d.footer.emailPlaceholder}
                className="h-10 min-w-0 flex-1 rounded-md border border-border-light bg-neutral-50 px-3 text-[14px] text-void placeholder:text-void/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 dark:border-border-dark dark:bg-surface dark:text-white dark:placeholder:text-white/40"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-teal px-4 text-[13px] font-semibold text-void transition-colors hover:bg-teal-dark"
              >
                {d.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border-light pt-8 text-[13px] text-muted dark:border-border-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {BRAND.name}. {d.footer.allRights}</p>
          <div className="flex items-center gap-6">
            <Link href={`${p}/privacy-policy`} className="hover:text-teal">{d.footer.privacy}</Link>
            <Link href={`${p}/terms`} className="hover:text-teal">{d.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
