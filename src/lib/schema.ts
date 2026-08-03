import { BRAND, SITE_URL, SOCIAL_LINKS } from './utils'

/**
 * Stable @id values for the site's core entities. Every other JSON-LD node on
 * the site references these instead of restating the organisation inline, so
 * Google resolves one business entity rather than a dozen look-alikes.
 */
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const FOUNDER_ID = `${SITE_URL}/#founder`

/** Reference to the Organization node rendered by the root layout. */
export const ORG_REF = { '@id': ORG_ID }
/** Reference to the founder Person node. */
export const FOUNDER_REF = { '@id': FOUNDER_ID }
/** Reference to the WebSite node rendered by the root layout. */
export const WEBSITE_REF = { '@id': WEBSITE_ID }

/**
 * Square brand mark used for schema.org logo. Deliberately NOT og-image.png —
 * that asset is a 1200x630 landscape share banner, which Google rejects as an
 * Organization logo.
 */
export const LOGO_URL = `${SITE_URL}/icon-512.png`

/**
 * The canonical TechParadice business entity. Rendered exactly once per page,
 * from the root layout, so it is present in the initial server HTML on every
 * route in both locales.
 */
export const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BRAND.name,
  alternateName: BRAND.alternateName,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.png`,
  slogan: BRAND.slogan,
  description:
    'TechParadice is a digital services agency delivering websites, mobile apps, UI/UX design, SEO, and social media management for small and medium businesses.',
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ankara',
    addressCountry: 'TR',
  },
  areaServed: [
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Bahrain',
    'Kuwait',
    'Oman',
    'Turkey',
  ],
  knowsAbout: [
    'Website Development',
    'Mobile App Development',
    'UI/UX Design',
    'Search Engine Optimization',
    'Social Media Management',
    'Paid Advertising',
  ],
  knowsLanguage: ['en', 'ar'],
  sameAs: SOCIAL_LINKS,
  contactPoint: {
    '@type': 'ContactPoint',
    email: BRAND.email,
    contactType: 'customer service',
    availableLanguage: ['English', 'Arabic'],
  },
  // @id'd so the richer Person node on /about merges into this same founder
  // rather than resolving as a second, separate individual.
  founder: { '@type': 'Person', '@id': FOUNDER_ID, name: BRAND.owner },
}

/** The site itself, published by the organisation above. */
export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: BRAND.name,
  alternateName: BRAND.alternateName,
  inLanguage: ['en', 'ar'],
  publisher: ORG_REF,
}

/**
 * Site-wide @graph. Rendered server-side by the root layout on every route.
 * Page-level JSON-LD should emit only page-specific types (Article, Service,
 * BreadcrumbList, FAQPage) and point `publisher`/`provider` at ORG_REF.
 */
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [organizationNode, websiteNode],
}

type Locale = 'en' | 'ar'

/** Locale-aware absolute URL for a path expressed without its locale prefix. */
export const localeUrl = (locale: Locale, path = '') =>
  `${SITE_URL}${locale === 'ar' ? '/ar' : ''}${path}`

/**
 * BreadcrumbList for an interior page. `trail` is everything below the home
 * crumb, in order, as [name, pathWithoutLocalePrefix] pairs.
 */
export function breadcrumbNode(
  locale: Locale,
  pagePath: string,
  trail: [name: string, path: string][],
) {
  const home = locale === 'ar' ? 'الرئيسية' : 'Home'
  const items = [[home, ''] as [string, string], ...trail]
  return {
    '@type': 'BreadcrumbList',
    '@id': `${localeUrl(locale, pagePath)}#breadcrumb`,
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      // Home resolves to the bare origin in English and `/ar` in Arabic, which
      // is exactly the canonical form Next serves for each (no trailing slash).
      item: localeUrl(locale, path),
    })),
  }
}

/**
 * A service offered by the organisation, optionally scoped to a place. Used by
 * the city and industry landing pages, which previously shipped no page-level
 * structured data at all.
 */
export function serviceNode(opts: {
  locale: Locale
  pagePath: string
  name: string
  description: string
  serviceType?: string
  areaServed?: { name: string; type?: 'City' | 'Country'; containedIn?: string }
  audience?: string
  offers?: { price: string; priceCurrency: string; name: string }
}) {
  const { locale, pagePath, name, description, serviceType, areaServed, audience, offers } = opts
  return {
    '@type': 'Service',
    '@id': `${localeUrl(locale, pagePath)}#service`,
    name,
    description,
    ...(serviceType ? { serviceType } : {}),
    provider: ORG_REF,
    inLanguage: locale,
    url: localeUrl(locale, pagePath),
    ...(areaServed
      ? {
          areaServed: {
            '@type': areaServed.type ?? 'City',
            name: areaServed.name,
            ...(areaServed.containedIn
              ? { containedInPlace: { '@type': 'Country', name: areaServed.containedIn } }
              : {}),
          },
        }
      : {}),
    ...(audience ? { audience: { '@type': 'Audience', audienceType: audience } } : {}),
    ...(offers
      ? {
          offers: {
            '@type': 'Offer',
            price: offers.price,
            priceCurrency: offers.priceCurrency,
            name: offers.name,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  }
}

/** Generic page node, linked to the site and the organisation. */
export function webPageNode(opts: {
  locale: Locale
  pagePath: string
  name: string
  description: string
  type?: 'WebPage' | 'ContactPage' | 'CollectionPage' | 'AboutPage'
}) {
  const { locale, pagePath, name, description, type = 'WebPage' } = opts
  return {
    '@type': type,
    '@id': `${localeUrl(locale, pagePath)}#webpage`,
    url: localeUrl(locale, pagePath),
    name,
    description,
    inLanguage: locale,
    isPartOf: WEBSITE_REF,
    about: ORG_REF,
  }
}

/** Wraps page-level nodes in the @graph envelope every page emits. */
export const pageGraph = (...nodes: unknown[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
})
