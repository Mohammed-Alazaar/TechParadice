import type { Metadata } from 'next'
import { SITE_URL, BRAND } from './utils'

type SeoInput = {
  title: string
  description: string
  path?: string
  image?: string
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og-image.png',
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: BRAND.name,
      images: [{ url: image, width: 1200, height: 630, alt: BRAND.name }],
      locale: 'en_US',
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
