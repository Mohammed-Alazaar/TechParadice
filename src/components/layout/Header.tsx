'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Wordmark } from '@/components/brand/Wordmark'
import { cn } from '@/lib/utils'
import { primaryNav, primaryNavAr } from './nav'
import { MobileNav } from './MobileNav'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  locale?: 'en' | 'ar'
}

export function Header({ locale = 'en' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const nav = locale === 'ar' ? primaryNavAr : primaryNav
  const homeHref = locale === 'ar' ? '/ar' : '/'
  const contactHref = locale === 'ar' ? '/ar/contact' : '/contact'
  const contactLabel = locale === 'ar' ? 'تواصل' : 'Contact'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border-light bg-white/90 backdrop-blur-lg dark:border-border-dark dark:bg-void/90'
          : 'bg-transparent',
      )}
    >
      <div className="container-content flex h-16 items-center justify-between lg:h-20">
        <Link href={homeHref} aria-label="TechParadice — Home" className="shrink-0">
          <Wordmark size="md" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) =>
            'children' in item && item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 font-body text-[15px] font-medium text-void/70 transition-colors hover:text-void dark:text-white/80 dark:hover:text-white"
                >
                  {item.label}
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[380px] -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-border-light bg-white p-2 shadow-lg dark:border-border-dark dark:bg-surface">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-lg p-3 transition-colors hover:bg-void/5 dark:hover:bg-white/5"
                      >
                        <div className="font-display text-[15px] font-semibold text-void dark:text-white">
                          {c.label}
                        </div>
                        <div className="mt-0.5 text-[13px] text-muted">{c.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-[15px] font-medium text-void/70 transition-colors hover:text-void dark:text-white/80 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
          <ButtonLink href={contactHref} size="sm" className="hidden sm:inline-flex">
            {contactLabel}
          </ButtonLink>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  )
}
