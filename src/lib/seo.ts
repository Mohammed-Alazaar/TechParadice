import type { Metadata } from 'next'
import { SITE_URL, BRAND, X_HANDLE } from './utils'

type SeoInput = {
  title: string
  description: string
  path?: string
  image?: string
  locale?: 'en' | 'ar'
  /** optional meta keywords for this page */
  keywords?: string[]
  /** pass the corresponding path in the other language to get hreflang */
  alternatePath?: string
  /**
   * Whether a counterpart exists in the other language. Defaults to true.
   * Set false for pages that only exist in one language (e.g. a blog post
   * published in English but not Arabic) so we never emit an hreflang tag
   * pointing at a URL that 404s.
   */
  hasAlternate?: boolean
}

/**
 * Joins the copy fields a record already carries into a meta description that
 * uses the ~155 character budget Google actually renders, clamping at a word
 * boundary rather than mid-word.
 *
 * Service records store `short` (a 56-65 char summary) and `value` (the benefit
 * statement) separately; either alone leaves half the budget unused, so the
 * page-level callers pass both.
 */
export function composeDescription(...parts: (string | undefined | null)[]) {
  const text = parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
  if (text.length <= 160) return text
  return `${text.slice(0, 157).replace(/\s+\S*$/, '')}…`
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  locale = 'en',
  keywords,
  alternatePath,
  hasAlternate = true,
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`

  const isAr = locale === 'ar'

  const enUrl = alternatePath ? `${SITE_URL}${isAr ? alternatePath : path}` : `${SITE_URL}${path}`
  // For the root path the derived Arabic URL must be `/ar`, not `/ar/` — the
  // Arabic homepage canonicalises to the unslashed form, so deriving `/ar/`
  // here would advertise an hreflang that disagrees with its own canonical.
  const arUrl = alternatePath
    ? `${SITE_URL}${isAr ? path : alternatePath}`
    : `${SITE_URL}${path === '/' ? '/ar' : `/ar${path}`}`

  // English is the site's default language, so x-default should resolve to
  // the English version of this specific page (not always the homepage).
  // When the page has no counterpart in the other language, only advertise
  // the language that actually exists (x-default points at the page itself).
  const languages: Record<string, string> = hasAlternate
    ? { 'x-default': enUrl, en: enUrl, ar: arUrl }
    : isAr
      ? { 'x-default': arUrl, ar: arUrl }
      : { 'x-default': enUrl, en: enUrl }

  return {
    // `absolute` bypasses the root layout's `%s | TechParadice` template.
    // `fullTitle` has already appended the brand where it was missing, so a
    // plain string here would resolve to "About | TechParadice | TechParadice".
    title: { absolute: fullTitle },
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
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
      site: X_HANDLE,
      creator: X_HANDLE,
      title: fullTitle,
      description,
      images: [image],
    },
  }
}
