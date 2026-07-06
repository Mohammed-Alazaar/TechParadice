/**
 * Maps case-study service names to the portfolio filter categories.
 * Pure functions so the grid filter can be tested without a DOM.
 */

export type PortfolioFilter = 'All' | 'Web' | 'Mobile' | 'Design' | 'Marketing'

export const PORTFOLIO_FILTERS: PortfolioFilter[] = [
  'All',
  'Web',
  'Mobile',
  'Design',
  'Marketing',
]

const CATEGORY_PATTERNS: Record<Exclude<PortfolioFilter, 'All'>, RegExp> = {
  Web: /web|website|commerce|platform/i,
  Mobile: /mobile|app\b|ios|android/i,
  Design: /design|ui|ux|brand/i,
  Marketing: /seo|ads|advertis|marketing|social|content|analytics|growth/i,
}

export function serviceMatchesFilter(service: string, filter: PortfolioFilter): boolean {
  if (filter === 'All') return true
  return CATEGORY_PATTERNS[filter].test(service)
}

export function studyMatchesFilter(services: string[], filter: PortfolioFilter): boolean {
  if (filter === 'All') return true
  return services.some((s) => serviceMatchesFilter(s, filter))
}
