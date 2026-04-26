'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function LocaleSync() {
  const pathname = usePathname()

  useEffect(() => {
    const isAr = pathname.startsWith('/ar')
    const html = document.documentElement
    html.lang = isAr ? 'ar' : 'en'
    html.dir = isAr ? 'rtl' : 'ltr'
    document.body.className = document.body.className
      .replace(/\bfont-(arabic|body)\b/g, '')
      .trim()
      .concat(isAr ? ' font-arabic' : ' font-body')
  }, [pathname])

  return null
}
