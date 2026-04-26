import type { Metadata, Viewport } from 'next'
import { Figtree, Plus_Jakarta_Sans, Noto_Sans_Arabic } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'
import { BRAND, SITE_URL } from '@/lib/utils'
import { LocaleSync } from '@/components/layout/LocaleSync'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
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

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
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
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = headers().get('x-locale') ?? 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const fontClass = locale === 'ar'
    ? `${figtree.variable} ${jakarta.variable} ${notoArabic.variable}`
    : `${figtree.variable} ${jakarta.variable}`

  return (
    <html lang={locale} dir={dir} className={`${fontClass} dark`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: set theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`bg-white text-void antialiased dark:bg-void dark:text-white ${locale === 'ar' ? 'font-arabic' : 'font-body'}`}>
        <ThemeProvider>
        <LocaleSync />
        {children}
        </ThemeProvider>
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
