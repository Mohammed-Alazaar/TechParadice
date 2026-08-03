import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { rootMetadata, rootViewport } from '@/lib/root-metadata'

/**
 * Arabic root layout. Covers everything under `/ar`, emitting
 * `<html lang="ar" dir="rtl">` statically rather than resolving the locale from
 * a request header.
 *
 * Navigating between this tree and the English one triggers a full document
 * load rather than a client-side transition — that is inherent to having two
 * root layouts, and is the correct behaviour for a language switch anyway.
 */
export const metadata: Metadata = rootMetadata('ar')
export const viewport: Viewport = rootViewport

export default function ArabicRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootHtml locale="ar">{children}</RootHtml>
}
