import type { Metadata } from 'next'
import { SITE_URL, BRAND } from './utils'

type SeoInput = {
  title: string
  description: string
  path?: string
  image?: string
  locale?: 'en' | 'ar'
  /** pass the corresponding path in the other language to get hreflang */
  alternatePath?: string
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  locale = 'en',
  alternatePath,
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`

  const isAr = locale === 'ar'

  const languages: Record<string, string> = {
    'x-default': `${SITE_URL}/`,
    en: alternatePath ? `${SITE_URL}${isAr ? alternatePath : path}` : `${SITE_URL}${path}`,
    ar: alternatePath ? `${SITE_URL}${isAr ? path : alternatePath}` : `${SITE_URL}/ar${path}`,
  }

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: BRAND.name,
      images: [{ url: image, width: 1200, height: 630, alt: BRAND.name }],
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}
