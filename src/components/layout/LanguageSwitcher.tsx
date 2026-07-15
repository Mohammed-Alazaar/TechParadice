'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/$/, '') : path
}

export function LanguageSwitcher({ locale }: { locale: 'en' | 'ar' }) {
  const pathname = usePathname()

  const directTarget = locale === 'ar'
    ? pathname.replace(/^\/ar/, '') || '/'
    : `/ar${pathname === '/' ? '' : pathname}`
  const isBlogDetail = /^\/(?:ar\/)?blog\/[^/]+\/?$/.test(pathname)
  const blogFallback = locale === 'ar' ? '/blog' : '/ar/blog'
  const safeTarget = isBlogDetail ? blogFallback : directTarget
  const [targetPath, setTargetPath] = useState(safeTarget)

  useEffect(() => {
    if (!isBlogDetail) {
      setTargetPath(directTarget)
      return
    }

    const alternateLocale = locale === 'ar' ? 'en' : 'ar'
    const expectedPath = normalizePath(directTarget)

    const updateTarget = () => {
      const alternateLinks = document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"]')
      const hasExactAlternate = Array.from(alternateLinks).some((link) => {
        if (link.hreflang !== alternateLocale) return false

        try {
          return normalizePath(new URL(link.href, window.location.origin).pathname) === expectedPath
        } catch {
          return false
        }
      })

      setTargetPath(hasExactAlternate ? directTarget : blogFallback)
    }

    updateTarget()

    // Next.js updates route metadata after client-side navigation. Watching the
    // head keeps the switcher aligned with the newly rendered post.
    const observer = new MutationObserver(updateTarget)
    observer.observe(document.head, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [blogFallback, directTarget, isBlogDetail, locale])

  const label = locale === 'ar' ? 'English' : 'العربية'
  const ariaLabel = locale === 'ar' ? 'التبديل إلى اللغة الإنجليزية' : 'Switch to Arabic'

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center rounded-md border border-void/10 px-2.5 py-1 text-[12px] font-semibold text-void/60 transition-colors hover:border-teal/40 hover:text-void dark:border-white/10 dark:text-white/60 dark:hover:text-white"
      aria-label={ariaLabel}
    >
      {label}
    </Link>
  )
}
