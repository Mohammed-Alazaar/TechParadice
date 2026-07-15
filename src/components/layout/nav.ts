export type NavChild = {
  label: string
  href: string
  description: string
}

export type NavGroup = {
  label: string
  items: NavChild[]
}

export type NavItemSimple = { label: string; href: string }
export type NavItemGrouped = { label: string; href: string; groups: NavGroup[] }
export type NavItem = NavItemSimple | NavItemGrouped

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    groups: [
      {
        label: 'BUILD',
        items: [
          { label: 'Website Development', href: '/services/web-development', description: 'Fast, accessible sites built in Next.js.' },
          { label: 'Mobile App Development', href: '/services/mobile-app-development', description: 'Reliable iOS and Android products built around real journeys.' },
          { label: 'Custom UI/UX Design', href: '/services/ui-ux-design', description: 'Clear interfaces and reusable design systems.' },
        ],
      },
      {
        label: 'GROW',
        items: [
          { label: 'SEO', href: '/services/seo', description: 'Technical foundations and search-informed improvements.' },
          { label: 'Content Creation', href: '/services/content-creation', description: 'Useful content shaped for your audience and channels.' },
          { label: 'Paid Advertising', href: '/services/paid-advertising', description: 'Campaigns built around clear objectives and tracking.' },
        ],
      },
      {
        label: 'AI ASSISTANTS',
        items: [
          { label: 'Voice AI Receptionist', href: '/services/voice-ai-receptionist', description: 'Answers calls 24/7, books appointments, and routes callers.' },
          { label: 'Customer Support AI', href: '/services/customer-support-ai', description: 'Instant support across your website, WhatsApp, and email.' },
          { label: 'Sales & Lead Qualification AI', href: '/services/sales-lead-qualification-ai', description: 'Qualifies leads, follows up, and books meetings.' },
          { label: 'Business Analytics AI', href: '/services/business-analytics-ai', description: 'KPI analysis and forecasts from plain-language questions.' },
          { label: 'Internal Knowledge AI', href: '/services/internal-knowledge-ai', description: 'Instant answers from your policies, SOPs, and documents.' },
          { label: 'Meeting & Executive AI', href: '/services/meeting-executive-ai', description: 'Summaries, action items, and follow-ups from meetings.' },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    groups: [
      {
        label: 'LOCAL BUSINESS',
        items: [
          { label: 'Restaurants', href: '/industries/restaurants', description: 'Menus, reservations, and local SEO.' },
          { label: 'Real Estate', href: '/industries/real-estate', description: 'Listings, lead capture, and CRM integration.' },
          { label: 'Clinics & Healthcare', href: '/industries/clinics', description: 'Booking flows, patient reviews, and medical SEO.' },
          { label: 'Professional Services', href: '/industries/professional-services', description: 'Credible websites, lead generation, and intake automation.' },
        ],
      },
      {
        label: 'B2B & INDUSTRIAL',
        items: [
          { label: 'Manufacturing', href: '/industries/manufacturing-industrial', description: 'Product catalogues, dealer portals, and multilingual sites.' },
          { label: 'B2B Businesses', href: '/industries/b2b-businesses', description: 'Lead gen, account-based marketing, and automation.' },
        ],
      },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/blog' },
]

export const primaryNavAr: NavItem[] = [
  {
    label: 'الخدمات',
    href: '/ar/services',
    groups: [
      {
        label: 'بناء',
        items: [
          { label: 'تطوير المواقع', href: '/ar/services/web-development', description: 'مواقع سريعة مبنية باستخدام Next.js.' },
          { label: 'تطوير تطبيقات الجوال', href: '/ar/services/mobile-app-development', description: 'منتجات موثوقة لنظامي iOS وAndroid مبنية حول رحلات استخدام حقيقية.' },
          { label: 'تصميم UI/UX مخصص', href: '/ar/services/ui-ux-design', description: 'واجهات واضحة وأنظمة تصميم قابلة لإعادة الاستخدام.' },
        ],
      },
      {
        label: 'نمو',
        items: [
          { label: 'SEO', href: '/ar/services/seo', description: 'أسس تقنية وتحسينات مدروسة للظهور في نتائج البحث.' },
          { label: 'إنتاج المحتوى', href: '/ar/services/content-creation', description: 'محتوى مفيد يناسب جمهورك وقنواتك.' },
          { label: 'الإعلانات المدفوعة', href: '/ar/services/paid-advertising', description: 'حملات بأهداف واضحة وقياس موثوق.' },
        ],
      },
      {
        label: 'المساعدون الذكيون',
        items: [
          { label: 'مساعد الاستقبال الذكي الصوتي', href: '/ar/services/voice-ai-receptionist', description: 'يرد على المكالمات على مدار الساعة ويحجز المواعيد ويوجّه المتصلين.' },
          { label: 'مساعد خدمة العملاء الذكي', href: '/ar/services/customer-support-ai', description: 'دعم فوري عبر الموقع وواتساب والبريد الإلكتروني.' },
          { label: 'مساعد المبيعات وتأهيل العملاء', href: '/ar/services/sales-lead-qualification-ai', description: 'يؤهّل العملاء المحتملين ويتابع ويحجز الاجتماعات.' },
          { label: 'مساعد تحليل الأعمال الذكي', href: '/ar/services/business-analytics-ai', description: 'تحليل المؤشرات والتوقعات بالاستعلام باللغة الطبيعية.' },
          { label: 'مساعد المعرفة الداخلية', href: '/ar/services/internal-knowledge-ai', description: 'إجابات فورية من سياساتك وإجراءاتك ومستنداتك.' },
          { label: 'مساعد الاجتماعات والمدير التنفيذي', href: '/ar/services/meeting-executive-ai', description: 'ملخّصات ومهام ورسائل متابعة من اجتماعاتك.' },
        ],
      },
    ],
  },
  {
    label: 'القطاعات',
    href: '/ar/industries',
    groups: [
      {
        label: 'الأعمال المحلية',
        items: [
          { label: 'المطاعم', href: '/ar/industries/restaurants', description: 'قوائم طعام، حجوزات، وSEO محلي.' },
          { label: 'العقارات', href: '/ar/industries/real-estate', description: 'قوائم عقارية وجذب العملاء.' },
          { label: 'العيادات والرعاية الصحية', href: '/ar/industries/clinics', description: 'رحلات حجز سهلة، تقييمات المرضى، وSEO طبي.' },
          { label: 'الخدمات المهنية', href: '/ar/industries/professional-services', description: 'مواقع موثوقة وتوليد فرص وأتمتة استقبال العملاء.' },
        ],
      },
      {
        label: 'B2B والصناعة',
        items: [
          { label: 'التصنيع والصناعة', href: '/ar/industries/manufacturing-industrial', description: 'كتالوجات منتجات ومواقع متعددة اللغات.' },
          { label: 'شركات B2B', href: '/ar/industries/b2b-businesses', description: 'توليد عملاء محتملين وأتمتة التسويق.' },
        ],
      },
    ],
  },
  { label: 'من نحن', href: '/ar/about' },
  { label: 'المدونة', href: '/ar/blog' },
]
