import { en, type Dictionary } from './en'
import { ar } from './ar'

export type Locale = 'en' | 'ar'
export type { Dictionary }

export function getDictionary(locale: Locale): Dictionary {
  return locale === 'ar' ? ar : en
}
