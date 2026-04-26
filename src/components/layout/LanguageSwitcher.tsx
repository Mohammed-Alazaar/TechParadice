'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LanguageSwitcher({ locale }: { locale: 'en' | 'ar' }) {
  const pathname = usePathname()

  let targetPath: string
  if (locale === 'ar') {
    targetPath = pathname.replace(/^\/ar/, '') || '/'
  } else {
    targetPath = `/ar${pathname === '/' ? '' : pathname}`
  }

  const label = locale === 'ar' ? 'English' : 'العربية'

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center rounded-md border border-void/10 px-2.5 py-1 text-[12px] font-semibold text-void/60 transition-colors hover:border-teal/40 hover:text-void dark:border-white/10 dark:text-white/60 dark:hover:text-white"
      aria-label={`Switch to ${locale === 'ar' ? 'English' : 'Arabic'}`}
    >
      {label}
    </Link>
  )
}
