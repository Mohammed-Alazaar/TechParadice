import { describe, it, expect } from 'vitest'
import { cn, SITE_URL, BRAND } from '@/lib/utils'

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(cn('a', false && 'b', undefined, null)).toBe('a')
  })

  it('resolves tailwind conflicts (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-white', 'text-teal')).toBe('text-teal')
  })
})

describe('site constants', () => {
  it('SITE_URL has no trailing slash', () => {
    expect(SITE_URL.endsWith('/')).toBe(false)
  })

  it('BRAND has a contact email', () => {
    expect(BRAND.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/)
  })
})
