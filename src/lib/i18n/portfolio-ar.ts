export const portfolioIndustryLabelsAr: Record<string, string> = {
  'B2B Commerce': 'التجارة بين الشركات B2B',
  'B2B e-commerce': 'التجارة الإلكترونية بين الشركات B2B',
  Fintech: 'التقنية المالية',
  'DTC / Beauty': 'DTC / التجميل',
  'DTC beauty': 'DTC / التجميل',
  'B2B / Lab Equipment': 'B2B / معدات المختبرات',
  'B2B laboratory equipment': 'B2B / معدات المختبرات',
}

export const portfolioServiceLabelsAr: Record<string, string> = {
  'Web Development': 'تطوير المواقع',
  'Website Development': 'تطوير المواقع',
  'Mobile App': 'تطبيقات iOS وAndroid',
  'Mobile App Development': 'تطوير تطبيقات iOS وAndroid',
  'UI/UX Design': 'تصميم UI/UX',
  'Custom UI/UX Design': 'تصميم UI/UX مخصص',
  Analytics: 'التحليلات',
  'Analytics & Reporting': 'التحليلات والتقارير',
  SEO: 'SEO',
  'Search Engine Optimization': 'SEO',
  'SEO & Content': 'SEO والمحتوى',
  'Social Media Management': 'إدارة منصات التواصل الاجتماعي',
  'Community Management': 'إدارة المجتمعات الرقمية',
  'Paid Ads': 'الإعلانات المدفوعة',
  'Paid Advertising': 'الإعلانات المدفوعة',
  'Content Creation': 'إنتاج المحتوى',
}

export function localizePortfolioIndustryAr(industry: string) {
  return portfolioIndustryLabelsAr[industry] ?? industry
}

export function localizePortfolioServiceAr(service: string) {
  return portfolioServiceLabelsAr[service] ?? service
}

export function localizePortfolioTimelineAr(timeline: string) {
  if (timeline === 'Not publicly disclosed') return 'غير معلن'
  const weeks = timeline.match(/^(\d+) weeks?$/i)
  if (weeks) return `${weeks[1]} أسبوعًا`
  const months = timeline.match(/^(\d+) months?$/i)
  if (months) return `${months[1]} أشهر`
  return timeline
}
