import { describe, it, expect } from 'vitest'
import { getDictionary } from '@/lib/i18n'
import { en } from '@/lib/i18n/en'
import { ar } from '@/lib/i18n/ar'

/** Collect dotted key paths; arrays are treated as leaves. */
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return [prefix]
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  )
}

describe('getDictionary', () => {
  it('returns en for en and ar for ar', () => {
    expect(getDictionary('en')).toBe(en)
    expect(getDictionary('ar')).toBe(ar)
  })
})

describe('dictionary parity', () => {
  it('en and ar expose exactly the same key structure', () => {
    const enKeys = keyPaths(en).sort()
    const arKeys = keyPaths(ar).sort()
    expect(arKeys).toEqual(enKeys)
  })

  it('declares matching locale/dir metadata', () => {
    expect(en.locale).toBe('en')
    expect(en.dir).toBe('ltr')
    expect(ar.locale).toBe('ar')
    expect(ar.dir).toBe('rtl')
  })
})
