export function LogoCloud() {
  const stack = [
    'Next.js',
    'React',
    'Figma',
    'TypeScript',
    'Tailwind',
    'Vercel',
    'GA4',
    'Sanity',
  ]

  return (
    <section className="border-y border-border-light bg-white py-14 dark:border-border-dark dark:bg-void">
      <div className="container-content">
        <p className="text-center text-caption uppercase text-muted">
          Built with the best
        </p>
        <ul className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {stack.map((name) => (
            <li
              key={name}
              className="text-center font-display text-[18px] font-semibold tracking-tight text-void/40 transition-colors hover:text-void/70 dark:text-white/50 dark:hover:text-white/80"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
