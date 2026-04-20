import { Section } from '@/components/ui/Section'

export function Testimonial() {
  return (
    <Section tone="void">
      <figure className="relative mx-auto max-w-4xl text-center">
        <span
          aria-hidden
          className="absolute -top-8 left-0 font-display text-[180px] font-extrabold leading-none text-teal/30 sm:left-4 sm:-top-12 sm:text-[240px]"
        >
          “
        </span>
        <blockquote className="relative font-display text-[28px] font-semibold leading-tight text-white sm:text-[36px]">
          We went from shipping once a quarter to shipping every week.
          The difference is night and day.
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3 text-[14px] text-muted">
          <span className="font-semibold text-white">Lena Kovač</span>
          <span className="text-teal">/</span>
          <span>VP Digital, Northwind</span>
        </figcaption>
      </figure>
    </Section>
  )
}
