import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'

export default function ArPublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header locale="ar" />
      <main id="main">{children}</main>
      <Footer locale="ar" />
    </>
  )
}
