import { getSitemapEntries } from '@/lib/sitemap-data'

export const revalidate = 300

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const entries = await getSitemapEntries()

  const urls = entries
    .map((entry) => {
      const alts = entry.alternates
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escapeXml(a.href)}" />`,
        )
        .join('\n')
      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>${alts ? '\n' + alts : ''}
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
