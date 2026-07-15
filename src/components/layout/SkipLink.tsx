export function SkipLink({ locale = 'en' }: { locale?: 'en' | 'ar' }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:font-semibold focus:text-void"
    >
      {locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
    </a>
  )
}
