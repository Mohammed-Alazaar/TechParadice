import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://techparadice.com'

export const BRAND = {
  name: 'TechParadice',
  /**
   * Deliberate spelling variant, C not S. Emitted as schema.org alternateName so
   * Google learns the spaced form maps to this entity. Never add "Tech Paradise"
   * or "Paradize" here — feeding a misspelling to the knowledge graph is exactly
   * the autocorrect behaviour we are trying to undo.
   */
  alternateName: 'Tech Paradice',
  tagline: 'Strategy, technology, and growth in one team.',
  taglineShort: 'Websites. Apps. SEO. Marketing. One team.',
  slogan: 'Your digital world, built.',
  owner: 'Mohammed',
  location: 'Ankara, TR',
  email: 'hello@techparadice.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/techparadice/',
    instagram: 'https://www.instagram.com/tech.paradice/',
    x: 'https://x.com/techparadices',
    facebook: 'https://www.facebook.com/profile.php?id=61591609504987',
    /** Google Business Profile. Ties the site entity to the verified local listing. */
    googleMaps: 'https://maps.app.goo.gl/x9gjjLJigP8jHEUU9',
  },
}

/** Twitter/X handle derived from the profile URL, for twitter:site / twitter:creator. */
export const X_HANDLE = `@${BRAND.social.x.split('/').pop()}`

/**
 * Public profile URLs used for schema.org sameAs. The footer links each network
 * individually via BRAND.social.*, so entries added here for entity resolution
 * (e.g. the Google Business Profile) do not appear as footer social icons.
 */
export const SOCIAL_LINKS = Object.values(BRAND.social)

/**
 * Serialize a JSON-LD object for embedding in a <script> tag. Escaping "<"
 * prevents CMS-authored content containing "</script>" from breaking out of
 * the tag.
 */
export const ldJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003c')
