import { describe, it, expect } from 'vitest'
import {
  buildMetadata,
  truncateAtWord,
  firstSentence,
  resolveAlternates,
  breadcrumbJsonLd,
  faqJsonLd,
} from '@/lib/seo'
import { SITE_URL, BRAND } from '@/lib/utils'

describe('truncateAtWord', () => {
  it('returns short text unchanged', () => {
    expect(truncateAtWord('Short description.')).toBe('Short description.')
  })

  it('never cuts mid-word and appends an ellipsis', () => {
    const text = 'word '.repeat(60).trim()
    const out = truncateAtWord(text, 50)
    expect(out.length).toBeLessThanOrEqual(52)
    expect(out.endsWith('…')).toBe(true)
    expect(out).not.toMatch(/wor…$/)
  })

  it('collapses whitespace', () => {
    expect(truncateAtWord('a  b\n c')).toBe('a b c')
  })

  it('strips trailing punctuation before the ellipsis', () => {
    const out = truncateAtWord('Hello there, my friend, how are you today', 12)
    expect(out).toBe('Hello there…')
  })
})

describe('firstSentence', () => {
  it('extracts the first sentence', () => {
    expect(firstSentence('One. Two. Three.')).toBe('One.')
  })

  it('handles Arabic question marks', () => {
    expect(firstSentence('هل هذا سؤال؟ نعم.')).toBe('هل هذا سؤال؟')
  })

  it('returns full text when no terminator exists', () => {
    expect(firstSentence('no punctuation here')).toBe('no punctuation here')
  })
})

describe('resolveAlternates', () => {
  it('derives the ar path for an en page', () => {
    expect(resolveAlternates('/about', 'en')).toEqual({
      enPath: '/about',
      arPath: '/ar/about',
    })
  })

  it('maps the en homepage to /ar (no trailing slash)', () => {
    expect(resolveAlternates('/', 'en')).toEqual({ enPath: '/', arPath: '/ar' })
  })

  it('derives the en path for an ar page', () => {
    expect(resolveAlternates('/ar/about', 'ar')).toEqual({
      enPath: '/about',
      arPath: '/ar/about',
    })
  })

  it('maps /ar back to the en homepage', () => {
    expect(resolveAlternates('/ar', 'ar')).toEqual({ enPath: '/', arPath: '/ar' })
  })

  it('prefers an explicit alternatePath', () => {
    expect(resolveAlternates('/portfolio/x', 'en', '/ar/portfolio/x')).toEqual({
      enPath: '/portfolio/x',
      arPath: '/ar/portfolio/x',
    })
    expect(resolveAlternates('/ar/portfolio/x', 'ar', '/portfolio/x')).toEqual({
      enPath: '/portfolio/x',
      arPath: '/ar/portfolio/x',
    })
  })

  it('does not mangle paths that merely start with /ar-like segments', () => {
    expect(resolveAlternates('/architecture', 'en').arPath).toBe('/ar/architecture')
  })
})

describe('buildMetadata', () => {
  it('appends the brand to the title when missing', () => {
    const meta = buildMetadata({ title: 'Pricing', description: 'd', path: '/pricing' })
    expect(meta.title).toBe(`Pricing | ${BRAND.name}`)
  })

  it('keeps the title as-is when it already contains the brand', () => {
    const meta = buildMetadata({
      title: `${BRAND.name} — tagline`,
      description: 'd',
    })
    expect(meta.title).toBe(`${BRAND.name} — tagline`)
  })

  it('builds canonical + hreflang for an en page', () => {
    const meta = buildMetadata({ title: 't', description: 'd', path: '/about' })
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/about`)
    expect(meta.alternates?.languages).toEqual({
      'x-default': `${SITE_URL}/about`,
      en: `${SITE_URL}/about`,
      ar: `${SITE_URL}/ar/about`,
    })
  })

  it('builds canonical + hreflang for an ar page', () => {
    const meta = buildMetadata({
      title: 'ت',
      description: 'د',
      path: '/ar/about',
      alternatePath: '/about',
      locale: 'ar',
    })
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/ar/about`)
    expect(meta.alternates?.languages).toEqual({
      'x-default': `${SITE_URL}/about`,
      en: `${SITE_URL}/about`,
      ar: `${SITE_URL}/ar/about`,
    })
    expect((meta.openGraph as { locale?: string })?.locale).toBe('ar_SA')
  })

  it('omits the ar hreflang when arAvailable is false', () => {
    const meta = buildMetadata({
      title: 't',
      description: 'd',
      path: '/blog/en-only-post',
      arAvailable: false,
    })
    expect(meta.alternates?.languages).not.toHaveProperty('ar')
    expect(meta.alternates?.languages).toHaveProperty('en')
  })

  it('truncates over-long descriptions at a word boundary', () => {
    const meta = buildMetadata({
      title: 't',
      description: 'lorem '.repeat(60),
    })
    expect(String(meta.description).length).toBeLessThanOrEqual(161)
    expect(String(meta.description).endsWith('…')).toBe(true)
  })

  it('sets the og type', () => {
    const article = buildMetadata({ title: 't', description: 'd', type: 'article' })
    expect((article.openGraph as { type?: string })?.type).toBe('article')
    const site = buildMetadata({ title: 't', description: 'd' })
    expect((site.openGraph as { type?: string })?.type).toBe('website')
  })
})

describe('breadcrumbJsonLd', () => {
  it('builds a positioned BreadcrumbList', () => {
    const ld = breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
    ])
    expect(ld['@type']).toBe('BreadcrumbList')
    expect(ld.itemListElement).toHaveLength(2)
    expect(ld.itemListElement[0]).toMatchObject({
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    })
    expect(ld.itemListElement[1]).toMatchObject({
      position: 2,
      item: `${SITE_URL}/portfolio`,
    })
  })
})

describe('faqJsonLd', () => {
  it('builds a FAQPage with Question/Answer pairs', () => {
    const ld = faqJsonLd([{ q: 'Why?', a: 'Because.' }])
    expect(ld['@type']).toBe('FAQPage')
    expect(ld.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Why?',
      acceptedAnswer: { '@type': 'Answer', text: 'Because.' },
    })
  })
})
