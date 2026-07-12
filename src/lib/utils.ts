import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://techparadice.com'

export const BRAND = {
  name: 'TechParadice',
  tagline: 'Your digital world, built.',
  taglineShort: 'Website. App. SEO. Social. Done.',
  owner: 'Mohammed',
  location: 'Ankara, TR',
  email: 'hello@techparadice.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/techparadice/',
    instagram: 'https://www.instagram.com/tech.paradice/',
    x: 'https://x.com/techparadices',
    facebook: 'https://www.facebook.com/profile.php?id=61591609504987',
  },
}

/** Public profile URLs used for schema.org sameAs and footer links. */
export const SOCIAL_LINKS = Object.values(BRAND.social)
