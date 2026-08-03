import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'

export default function ArabicNotFound() {
  return (
    <section dir="rtl" className="flex min-h-[80vh] items-center justify-center bg-void py-24">
      <div className="container-content text-center">
        <p className="font-display text-[120px] font-extrabold leading-none text-teal sm:text-[180px]">
          4<span className="text-white">/</span>4
        </p>
        <h1 className="mt-6 heading-h2 text-white">الصفحة غير موجودة</h1>
        <p className="mt-4 text-body-lg text-white/70">
          ربما نُقلت الصفحة أو تغير اسمها أو لم تعد متاحة.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/ar" size="lg">
            العودة إلى الرئيسية
          </ButtonLink>
          <Link
            href="/ar/services"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border-dark px-6 text-[15px] font-semibold text-white/80 hover:border-teal/40 hover:text-white"
          >
            استكشف الخدمات
          </Link>
        </div>
      </div>
    </section>
  )
}
