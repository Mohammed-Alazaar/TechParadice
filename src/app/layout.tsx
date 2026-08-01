import type { Metadata, Viewport } from 'next'
import { Figtree, Plus_Jakarta_Sans, Noto_Sans_Arabic } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'
import { BRAND, SITE_URL, SOCIAL_LINKS } from '@/lib/utils'
import { LocaleSync } from '@/components/layout/LocaleSync'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { PHProvider } from './posthog-provider'
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
    locale: 'en_US',
    url: SITE_URL,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      'One senior team for digital strategy, websites, apps, SEO, content, social media, and paid growth.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: 'summary_large_image',
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
// Microsoft Clarity project id (overridable per environment; set to '' to disable).
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? 'xmygjt4elx'
// Ahrefs Analytics key (overridable per environment; set to '' to disable).
const ahrefsKey = process.env.NEXT_PUBLIC_AHREFS_KEY ?? 'zr/+hwvzyRwBX6V0dJw3zg'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = headers().get('x-locale') ?? 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const fontClass = locale === 'ar'
    ? `${figtree.variable} ${jakarta.variable} ${notoArabic.variable}`
    : `${figtree.variable} ${jakarta.variable}`

  return (
    <html lang={locale} dir={dir} className={`${fontClass} dark`} suppressHydrationWarning>
      <head>
        {/* Blog feed discovery (set here rather than via metadata alternates,
            which page-level alternates would otherwise override). */}
        <link rel="alternate" type="application/rss+xml" title={`${BRAND.name} — Blog`} href="/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title={`${BRAND.name} — المدونة`} href="/ar/feed.xml" />
        {/* Anti-FOUC: set theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        {/* Google Analytics - plain head tags let Google's installation checker
            detect the tag in the initial HTML response. */}
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');`,
              }}
            />
          </>
        ) : null}
        {/* Ahrefs Web Analytics — kept in <head> as a plain tag so Ahrefs'
            installation check can find it in the served HTML. */}
        {ahrefsKey ? (
          <script src="https://analytics.ahrefs.com/analytics.js" data-key={ahrefsKey} async />
        ) : null}
      </head>
      <body className={`bg-white text-void antialiased dark:bg-void dark:text-white ${locale === 'ar' ? 'font-arabic' : 'font-body'}`}>
        <PHProvider>
        <ThemeProvider>
        <LocaleSync />
        {children}
        </ThemeProvider>
        </PHProvider>
        {clarityId ? (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");`}
          </Script>
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
              image: `${SITE_URL}/og-image.png`,
              email: BRAND.email,
              description:
                'Founder-led digital agency delivering websites, mobile apps, UI/UX design, SEO, content, social media, and paid advertising through one senior team.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ankara',
                addressCountry: 'TR',
              },
              sameAs: SOCIAL_LINKS,
              knowsLanguage: ['en', 'ar'],
              contactPoint: {
                '@type': 'ContactPoint',
                email: BRAND.email,
                contactType: 'customer service',
                availableLanguage: ['English', 'Arabic'],
              },
              founder: { '@type': 'Person', name: BRAND.owner },
            }),
          }}
        />
      </body>
    </html>
  )
}
