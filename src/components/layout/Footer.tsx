import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { BRAND } from '@/lib/utils'
import { getServices } from '@/lib/services'

export async function Footer() {
  const services = await getServices()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-dark bg-void text-white">
      <div className="container-content py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" aria-label="TechParadice — Home">
              <Wordmark size="md" />
            </Link>
            <p className="mt-4 max-w-xs text-[14px] text-white/60">{BRAND.taglineShort}</p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="https://twitter.com/" aria-label="Twitter / X" className="text-white/60 transition-colors hover:text-teal">
                <Twitter size={18} />
              </Link>
              <Link href="https://linkedin.com/" aria-label="LinkedIn" className="text-white/60 transition-colors hover:text-teal">
                <Linkedin size={18} />
              </Link>
              <Link href="https://github.com/" aria-label="GitHub" className="text-white/60 transition-colors hover:text-teal">
                <Github size={18} />
              </Link>
              <Link href={`mailto:${BRAND.email}`} aria-label="Email" className="text-white/60 transition-colors hover:text-teal">
                <Mail size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">Services</h3>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-[14px] text-white/70 transition-colors hover:text-teal">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">Company</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/process', label: 'Process' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/blog', label: 'Blog' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[14px] text-white/70 hover:text-teal">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">Contact</h3>
            <ul className="flex flex-col gap-2 text-[14px] text-white/70">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-teal">{BRAND.email}</a></li>
              <li>{BRAND.location}</li>
              <li>Response within 24h</li>
            </ul>

            <form className="mt-6 flex gap-2" action="/api/contact" method="post" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="h-10 min-w-0 flex-1 rounded-md border border-border-dark bg-surface px-3 text-[14px] text-white placeholder:text-white/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-teal px-4 text-[13px] font-semibold text-void transition-colors hover:bg-teal-dark"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border-dark pt-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-teal">Privacy</Link>
            <Link href="/terms" className="hover:text-teal">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
