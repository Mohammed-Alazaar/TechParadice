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
  /** set false when this page has no Arabic version — omits the ar hreflang */
  arAvailable?: boolean
  /** OpenGraph type — use 'article' for blog posts and case studies */
  type?: 'website' | 'article'
}

/** Cut text at a word boundary so meta descriptions never end mid-word. */
export function truncateAtWord(text: string, max = 155): string {
  const clean = text.trim().replace(/\s+/g, ' ')
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max + 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.\s]+$/, '')}…`
}

/** First sentence of a paragraph (supports Arabic question mark). */
export function firstSentence(text: string): string {
  const clean = text.trim()
  const match = clean.match(/^[^.!?؟]*[.!?؟]/)
  return match ? match[0].trim() : clean
}

/** Given a page path + locale, resolve the EN and AR paths for hreflang. */
export function resolveAlternates(
  path: string,
  locale: 'en' | 'ar',
  alternatePath?: string,
): { enPath: string; arPath: string } {
  if (locale === 'ar') {
    const enPath = alternatePath ?? (path.replace(/^\/ar(?=\/|$)/, '') || '/')
    return { enPath, arPath: path }
  }
  const arPath = alternatePath ?? (path === '/' ? '/ar' : `/ar${path}`)
  return { enPath: path, arPath }
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  locale = 'en',
  alternatePath,
  arAvailable = true,
  type = 'website',
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`
  const safeDescription = truncateAtWord(description, 160)

  const isAr = locale === 'ar'
  const { enPath, arPath } = resolveAlternates(path, locale, alternatePath)

  const languages: Record<string, string> = {
    'x-default': `${SITE_URL}${enPath}`,
    en: `${SITE_URL}${enPath}`,
  }
  if (arAvailable) languages.ar = `${SITE_URL}${arPath}`

  return {
    title: fullTitle,
    description: safeDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description: safeDescription,
      url,
      siteName: BRAND.name,
      images: [{ url: image, width: 1200, height: 630, alt: BRAND.name }],
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: arAvailable ? (isAr ? 'en_US' : 'ar_SA') : undefined,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: safeDescription,
      images: [image],
    },
  }
}

/** schema.org BreadcrumbList for a trail of { name, path } items. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

/** schema.org FAQPage from an array of { q, a }. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}
