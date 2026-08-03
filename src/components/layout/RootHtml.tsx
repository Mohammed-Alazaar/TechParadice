import { Figtree, Plus_Jakarta_Sans, Noto_Sans_Arabic } from 'next/font/google'
import Script from 'next/script'
import { BRAND, ldJson } from '@/lib/utils'
import { siteGraph } from '@/lib/schema'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { PHProvider } from '@/app/posthog-provider'
import '@/app/globals.css'

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

const gaId = process.env.NEXT_PUBLIC_GA_ID
// Microsoft Clarity project id (overridable per environment; set to '' to disable).
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? 'xmygjt4elx'
// Ahrefs Analytics key (overridable per environment; set to '' to disable).
const ahrefsKey = process.env.NEXT_PUBLIC_AHREFS_KEY ?? 'zr/+hwvzyRwBX6V0dJw3zg'

/**
 * The shared <html>/<body> shell for both root layouts.
 *
 * `locale` is passed in statically by whichever root layout renders — the
 * English tree always passes "en", the Arabic tree always passes "ar". This
 * replaces the previous `headers().get('x-locale')` lookup, which was a dynamic
 * API and therefore opted every route in the app out of static rendering.
 */
export function RootHtml({
  locale,
  children,
}: {
  locale: 'en' | 'ar'
  children: React.ReactNode
}) {
  const isAr = locale === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'
  const fontClass = isAr
    ? `${figtree.variable} ${jakarta.variable} ${notoArabic.variable}`
    : `${figtree.variable} ${jakarta.variable}`

  return (
    <html lang={locale} dir={dir} className={`${fontClass} dark`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element --
          `no-head-element` targets the Pages Router, where <head> must be
          next/head. This component is the App Router root shell (rendered by
          app/(en)/layout.tsx and app/(ar)/layout.tsx), where a literal <head>
          is the correct and only way to emit these tags server-side. The rule
          does not recognise the shell being factored out into a component. */}
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
      <body className={`bg-white text-void antialiased dark:bg-void dark:text-white ${isAr ? 'font-arabic' : 'font-body'}`}>
        <PHProvider>
          <ThemeProvider>{children}</ThemeProvider>
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
        {/* Site-wide Organization + WebSite entity graph. Deliberately a plain
            <script> in this Server Component, not next/script: it must appear in
            the initial server-rendered HTML for Google to read it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(siteGraph) }}
        />
      </body>
    </html>
  )
}
