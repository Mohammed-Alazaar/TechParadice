import type { Metadata, Viewport } from 'next'
import { Figtree, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { BRAND, SITE_URL } from '@/lib/utils'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    'TechParadice is a B2B digital agency. Websites, mobile apps, UI/UX, SEO, social, content, ads — one senior team, flexible pricing.',
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
    locale: 'en_US',
    url: SITE_URL,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      'One senior team. Websites, apps, SEO, social, and ads — built to ship and built to grow.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: 'One senior team. Full stack. No compromise.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${jakarta.variable}`}>
      <body className="bg-void font-body text-white antialiased">
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: BRAND.name,
              url: SITE_URL,
              logo: `${SITE_URL}/og-image.png`,
              email: BRAND.email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ankara',
                addressCountry: 'TR',
              },
              founder: { '@type': 'Person', name: BRAND.owner },
            }),
          }}
        />
      </body>
    </html>
  )
}
