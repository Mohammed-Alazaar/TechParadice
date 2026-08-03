import type { Metadata, Viewport } from 'next'
import { BRAND, SITE_URL, X_HANDLE, ldJson } from './utils'

/**
 * Defaults shared by both root layouts.
 *
 * These live here rather than in one root layout because the app has two —
 * `app/(en)` and `app/(ar)` — each hardcoding its own locale so that no dynamic
 * API (previously `headers()`) is needed to render `<html lang>`. Keeping the
 * defaults in one module stops the two trees drifting apart.
 */
export function rootMetadata(locale: 'en' | 'ar'): Metadata {
  const isAr = locale === 'ar'
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${BRAND.name} — ${BRAND.tagline}`,
      template: `%s | ${BRAND.name}`,
    },
    description:
      'TechParadice is a founder-led digital agency delivering websites, mobile apps, UI/UX, SEO, content, social media, and paid growth through one senior team.',
    applicationName: BRAND.name,
    keywords: [
      'digital agency',
      'web development',
      'mobile app development',
      'UI UX design',
      'SEO',
      'social media management',
      'Ankara agency',
      'Next.js agency',
    ],
    authors: [{ name: BRAND.owner }],
    creator: BRAND.name,
    publisher: BRAND.name,
    icons: {
      icon: [
        // .ico first: Google fetches /favicon.ico when choosing the SERP favicon.
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    openGraph: {
      type: 'website',
      siteName: BRAND.name,
      locale: isAr ? 'ar_SA' : 'en_US',
      url: isAr ? `${SITE_URL}/ar` : SITE_URL,
      title: `${BRAND.name} — ${BRAND.tagline}`,
      description:
        'One senior team for digital strategy, websites, apps, SEO, content, social media, and paid growth.',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: BRAND.name }],
    },
    twitter: {
      card: 'summary_large_image',
      site: X_HANDLE,
      creator: X_HANDLE,
      title: `${BRAND.name} — ${BRAND.tagline}`,
      description: 'Digital strategy, technology, and growth through one accountable senior team.',
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export const rootViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

export { ldJson }
