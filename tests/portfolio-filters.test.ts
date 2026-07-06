import { describe, it, expect } from 'vitest'
import {
  PORTFOLIO_FILTERS,
  serviceMatchesFilter,
  studyMatchesFilter,
} from '@/lib/portfolio-filters'

describe('PORTFOLIO_FILTERS', () => {
  it('starts with All', () => {
    expect(PORTFOLIO_FILTERS[0]).toBe('All')
  })
})

describe('serviceMatchesFilter', () => {
  it('matches every service for All', () => {
    expect(serviceMatchesFilter('Anything', 'All')).toBe(true)
  })

  it('classifies the real seeded services', () => {
    // service names as they exist in the database
    expect(serviceMatchesFilter('Web Development', 'Web')).toBe(true)
    expect(serviceMatchesFilter('Mobile App', 'Mobile')).toBe(true)
    expect(serviceMatchesFilter('UI/UX Design', 'Design')).toBe(true)
    expect(serviceMatchesFilter('SEO', 'Marketing')).toBe(true)
    expect(serviceMatchesFilter('Paid Ads', 'Marketing')).toBe(true)
    expect(serviceMatchesFilter('Content Creation', 'Marketing')).toBe(true)
    expect(serviceMatchesFilter('Analytics', 'Marketing')).toBe(true)
    expect(serviceMatchesFilter('Analytics & Reporting', 'Marketing')).toBe(true)
  })

  it('does not cross-classify', () => {
    expect(serviceMatchesFilter('SEO', 'Web')).toBe(false)
    expect(serviceMatchesFilter('Web Development', 'Mobile')).toBe(false)
    expect(serviceMatchesFilter('Mobile App', 'Design')).toBe(false)
  })
})

describe('studyMatchesFilter', () => {
  const services = ['Web Development', 'UI/UX Design', 'Analytics']

  it('matches when any service belongs to the category', () => {
    expect(studyMatchesFilter(services, 'Web')).toBe(true)
    expect(studyMatchesFilter(services, 'Design')).toBe(true)
    expect(studyMatchesFilter(services, 'Marketing')).toBe(true)
  })

  it('rejects categories with no matching service', () => {
    expect(studyMatchesFilter(services, 'Mobile')).toBe(false)
  })

  it('always matches All, even with no services', () => {
    expect(studyMatchesFilter([], 'All')).toBe(true)
  })
})
