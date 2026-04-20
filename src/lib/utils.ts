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
}
