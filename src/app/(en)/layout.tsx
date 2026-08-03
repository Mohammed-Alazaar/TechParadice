import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { rootMetadata, rootViewport } from '@/lib/root-metadata'

/**
 * English root layout. One of two root layouts (see also `app/(ar)`); the route
 * group name is not part of the URL, so these routes stay at `/`, `/about`, etc.
 *
 * The locale is a literal here rather than read from `headers()`, which is what
 * lets every route below this layout render statically / via ISR.
 */
export const metadata: Metadata = rootMetadata('en')
export const viewport: Viewport = rootViewport

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootHtml locale="en">{children}</RootHtml>
}
