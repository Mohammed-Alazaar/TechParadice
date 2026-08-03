import { ldJson } from '@/lib/utils'
import { pageGraph, serviceNode, breadcrumbNode, webPageNode } from '@/lib/schema'

type Locale = 'en' | 'ar'

/**
 * Server-rendered JSON-LD for the industry landing pages. These pages carried
 * no page-level structured data, so an "X for clinics" query had nothing
 * machine-readable to match beyond the site-wide Organization node.
 *
 * Emits a Service scoped by audience plus the Home → Industries → {industry}
 * breadcrumb trail.
 */
export function IndustrySchema({
  locale,
  path,
  name,
  description,
  audience,
  crumb,
}: {
  locale: Locale
  /** Path without the locale prefix, e.g. "/industries/clinics". */
  path: string
  name: string
  description: string
  audience: string
  crumb: string
}) {
  const industriesLabel = locale === 'ar' ? 'القطاعات' : 'Industries'
  const jsonLd = pageGraph(
    serviceNode({
      locale,
      pagePath: path,
      name,
      description,
      serviceType: 'Digital agency services',
      audience,
    }),
    breadcrumbNode(locale, path, [
      [industriesLabel, '/industries'],
      [crumb, path],
    ]),
  )
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
    />
  )
}

/**
 * Generic page-level JSON-LD for routes that are neither a Service nor an
 * Article — listings, contact, and legal pages. Adds the page node plus a
 * breadcrumb so every indexable URL carries at least one page-specific type.
 */
export function BasicPageSchema({
  locale,
  path,
  name,
  description,
  crumb,
  type = 'WebPage',
}: {
  locale: Locale
  path: string
  name: string
  description: string
  crumb: string
  type?: 'WebPage' | 'ContactPage' | 'CollectionPage'
}) {
  const jsonLd = pageGraph(
    webPageNode({ locale, pagePath: path, name, description, type }),
    breadcrumbNode(locale, path, [[crumb, path]]),
  )
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
    />
  )
}
