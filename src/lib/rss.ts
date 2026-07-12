import { SITE_URL, BRAND } from './utils'

export type FeedItem = {
  title: string
  description: string
  url: string
  date: string
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(date: string): string {
  const d = new Date(date)
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
}

/** Builds an RSS 2.0 feed document. */
export function buildRssFeed(opts: {
  title: string
  description: string
  feedUrl: string
  siteUrl: string
  language: 'en' | 'ar'
  items: FeedItem[]
}): string {
  const { title, description, feedUrl, siteUrl, language, items } = opts

  const lastBuild =
    items.length > 0
      ? toRfc822(items.map((i) => i.date).sort().reverse()[0])
      : new Date().toUTCString()

  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRfc822(item.date)}</pubDate>
    </item>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>${language}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <copyright>© ${new Date().getFullYear()} ${escapeXml(BRAND.name)}</copyright>
${itemsXml}
  </channel>
</rss>
`
}

export { SITE_URL }
