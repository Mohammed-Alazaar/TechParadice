'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { ButtonLink } from '@/components/ui/Button'
import { primaryNav, primaryNavAr } from './nav'

interface MobileNavProps {
  locale?: 'en' | 'ar'
}

export function MobileNav({ locale = 'en' }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const nav = locale === 'ar' ? primaryNavAr : primaryNav
  const homeHref = locale === 'ar' ? '/ar' : '/'
  const contactHref = locale === 'ar' ? '/ar/contact' : '/contact'
  const contactLabel = locale === 'ar' ? 'تواصل معنا' : 'Get in touch'

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-void/70 transition-colors hover:bg-void/5 hover:text-void dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className="fixed inset-0 z-[70] animate-fade-in overflow-y-auto bg-white dark:bg-void"
        >
          <div className="container-content flex h-16 items-center justify-between lg:h-20">
            <Link href={homeHref} aria-label="TechParadice — Home" onClick={() => setOpen(false)}>
              <Wordmark size="md" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-void/70 hover:bg-void/5 hover:text-void dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          <div className="container-content flex flex-col gap-8 pb-16 pt-6">
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {nav.map((item) => (
                <div key={item.href} className="border-b border-border-light pb-4 dark:border-border-dark">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-h3 font-semibold text-void dark:text-white"
                  >
                    {item.label}
                  </Link>
                  {'children' in item && item.children ? (
                    <ul className="mt-3 flex flex-col gap-2 pl-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="block text-[15px] text-void/70 hover:text-teal dark:text-white/70"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </nav>

            <ButtonLink href={contactHref} size="lg" className="w-full">
              {contactLabel}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </>
  )
}
