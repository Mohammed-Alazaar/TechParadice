import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { BRAND } from '@/lib/utils'
import { getServices } from '@/lib/services'

interface FooterProps {
  locale?: 'en' | 'ar'
}

export async function Footer({ locale = 'en' }: FooterProps) {
  const services = await getServices()
  const year = new Date().getFullYear()
  const p = locale === 'ar' ? '/ar' : ''
  const homeHref = locale === 'ar' ? '/ar' : '/'
  const isAr = locale === 'ar'

  const companyLinks = isAr
    ? [
        { href: `${p}/about`, label: 'من نحن' },
        { href: `${p}/work`, label: 'أعمالنا' },
        { href: `${p}/blog`, label: 'المدونة' },
        { href: `${p}/contact`, label: 'تواصل معنا' },
        { href: `${p}/free-audit`, label: 'استشارة مجانية' },
      ]
    : [
        { href: `${p}/about`, label: 'About' },
        { href: `${p}/work`, label: 'Our Work' },
        { href: `${p}/blog`, label: 'Blog' },
        { href: `${p}/contact`, label: 'Contact' },
        { href: `${p}/free-audit`, label: 'Free Audit' },
      ]

  const industryLinks = isAr
    ? [
        { href: `${p}/industries/restaurants`, label: 'المطاعم' },
        { href: `${p}/industries/real-estate`, label: 'العقارات' },
        { href: `${p}/industries/manufacturing-industrial`, label: 'التصنيع والصناعة' },
        { href: `${p}/industries/b2b-businesses`, label: 'شركات B2B' },
      ]
    : [
        { href: `${p}/industries/restaurants`, label: 'Restaurants' },
        { href: `${p}/industries/real-estate`, label: 'Real Estate' },
        { href: `${p}/industries/manufacturing-industrial`, label: 'Manufacturing' },
        { href: `${p}/industries/b2b-businesses`, label: 'B2B Businesses' },
      ]

  return (
    <footer className="border-t border-border-light bg-white text-void dark:border-border-dark dark:bg-void dark:text-white">
      <div className="container-content py-16 lg:py-20">
        {/* Logo row */}
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href={homeHref} aria-label="TechParadice — Home">
              <Wordmark size="md" />
            </Link>
            <p className="mt-3 max-w-xs text-[14px] text-void/60 dark:text-white/60">
              {isAr ? 'موقع. تطبيق. سيو. سوشيال. جاهز.' : BRAND.taglineShort}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Link href={BRAND.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Linkedin size={18} />
              </Link>
              <Link href={BRAND.social.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Twitter size={18} />
              </Link>
              <Link href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Instagram size={18} />
              </Link>
              <Link href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Facebook size={18} />
              </Link>
              <Link href={`mailto:${BRAND.email}`} aria-label="Email" className="text-void/60 transition-colors hover:text-teal dark:text-white/60">
                <Mail size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Services */}
          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">
              {isAr ? 'الخدمات' : 'Services'}
            </h3>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${p}/services/${s.slug}`}
                    className="text-[14px] text-void/70 transition-colors hover:text-teal dark:text-white/70"
                  >
                    {isAr && s.nameAr ? s.nameAr : s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">
              {isAr ? 'القطاعات' : 'Industries'}
            </h3>
            <ul className="flex flex-col gap-2">
              {industryLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[14px] text-void/70 hover:text-teal dark:text-white/70">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">
              {isAr ? 'الشركة' : 'Company'}
            </h3>
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

          {/* Get Started */}
          <div>
            <h3 className="mb-4 text-caption uppercase text-teal">
              {isAr ? 'ابدأ الآن' : 'Get Started'}
            </h3>
            <Link
              href={`${p}/free-audit`}
              className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-[14px] font-semibold text-void transition-colors hover:bg-teal-dark"
            >
              {isAr ? 'احصل على تدقيق مجاني' : 'Get a Free Audit'}
            </Link>
            <ul className="mt-6 flex flex-col gap-2 text-[14px] text-void/70 dark:text-white/70">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-teal">{BRAND.email}</a></li>
              <li>{isAr ? 'أنقرة، تركيا' : BRAND.location}</li>
              <li>{isAr ? 'رد خلال 24 ساعة' : 'Response within 24h'}</li>
            </ul>

            <form className="mt-6 flex gap-2" action="/api/contact" method="post" aria-label={isAr ? 'اشتراك في النشرة' : 'Newsletter signup'}>
              <label htmlFor="newsletter-email" className="sr-only">
                {isAr ? 'البريد الإلكتروني' : 'Email address'}
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder={isAr ? 'بريدك@مثال.كوم' : 'you@example.com'}
                className="h-10 min-w-0 flex-1 rounded-md border border-border-light bg-neutral-50 px-3 text-[14px] text-void placeholder:text-void/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 dark:border-border-dark dark:bg-surface dark:text-white dark:placeholder:text-white/40"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-teal px-4 text-[13px] font-semibold text-void transition-colors hover:bg-teal-dark"
              >
                {isAr ? 'اشتراك' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border-light pt-8 text-[13px] text-muted dark:border-border-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {BRAND.name}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-6">
            <Link href={`${p}/privacy-policy`} className="hover:text-teal">
              {isAr ? 'الخصوصية' : 'Privacy'}
            </Link>
            <Link href={`${p}/terms`} className="hover:text-teal">
              {isAr ? 'الشروط' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
