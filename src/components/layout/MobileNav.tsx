'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { ButtonLink } from '@/components/ui/Button'
import { primaryNav } from './nav'

export function MobileNav() {
  const [open, setOpen] = useState(false)

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
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
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
          className="fixed inset-0 z-[70] animate-fade-in overflow-y-auto bg-void"
        >
          <div className="container-content flex h-16 items-center justify-between lg:h-20">
            <Link
              href="/"
              aria-label="TechParadice — Home"
              onClick={() => setOpen(false)}
            >
              <Wordmark size="md" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/5 hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          <div className="container-content flex flex-col gap-8 pb-16 pt-6">
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {primaryNav.map((item) => (
                <div key={item.href} className="border-b border-border-dark pb-4">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-h3 font-semibold text-white"
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
                            className="block text-[15px] text-white/70 hover:text-teal"
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

            <ButtonLink href="/contact" size="lg" className="w-full">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </>
  )
}
