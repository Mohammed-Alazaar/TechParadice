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
          { label: 'Mobile Apps', href: '/services/mobile-apps', description: 'Native-feeling iOS and Android apps.' },
          { label: 'UI/UX Design', href: '/services/ui-ux-design', description: 'Design systems that look right and work harder.' },
        ],
      },
      {
        label: 'GROW',
        items: [
          { label: 'SEO & Content', href: '/services/seo-content', description: 'Technical SEO and content that compounds.' },
          { label: 'Social Media', href: '/services/social-media', description: 'On-brand social that builds trust and pipeline.' },
          { label: 'Paid Ads', href: '/services/paid-ads', description: 'Meta, Google, LinkedIn, TikTok for ROAS.' },
        ],
      },
      {
        label: 'AUTOMATE',
        items: [
          { label: 'AI Assistants', href: '/services/ai-assistants', description: 'Custom AI agents and chatbots for your workflows.' },
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
          { label: 'Professional Services', href: '/industries/professional-services', description: 'Authority sites, lead gen, and intake automation.' },
        ],
      },
      {
        label: 'B2B & INDUSTRIAL',
        items: [
          { label: 'Manufacturing', href: '/industries/manufacturing-industrial', description: 'Product catalogs, dealer portals, and multilingual sites.' },
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
          { label: 'تطوير المواقع', href: '/ar/services/web-development', description: 'مواقع سريعة مبنية بـ Next.js.' },
          { label: 'تطبيقات الجوال', href: '/ar/services/mobile-apps', description: 'تطبيقات iOS وAndroid بتجربة أصيلة.' },
          { label: 'تصميم UI/UX', href: '/ar/services/ui-ux-design', description: 'أنظمة تصميم تبدو صحيحة وتعمل بكفاءة.' },
        ],
      },
      {
        label: 'نمو',
        items: [
          { label: 'SEO والمحتوى', href: '/ar/services/seo-content', description: 'سيو تقني ومحتوى يتراكم مع الوقت.' },
          { label: 'السوشيال ميديا', href: '/ar/services/social-media', description: 'تواجد اجتماعي يبني الثقة والجمهور.' },
          { label: 'الإعلانات المدفوعة', href: '/ar/services/paid-ads', description: 'Meta وGoogle وLinkedIn وTikTok لتحقيق ROAS.' },
        ],
      },
      {
        label: 'أتمتة',
        items: [
          { label: 'مساعدو الذكاء الاصطناعي', href: '/ar/services/ai-assistants', description: 'وكلاء AI وبوتات مخصصة لسير عملك.' },
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
          { label: 'المطاعم', href: '/ar/industries/restaurants', description: 'قوائم طعام، حجوزات، وسيو محلي.' },
          { label: 'العقارات', href: '/ar/industries/real-estate', description: 'قوائم عقارية وجذب العملاء.' },
          { label: 'العيادات والرعاية الصحية', href: '/ar/industries/clinics', description: 'سير الحجز ومراجعات المرضى والسيو الطبي.' },
          { label: 'الخدمات المهنية', href: '/ar/industries/professional-services', description: 'مواقع سلطة وتوليد عملاء وأتمتة الاستقبال.' },
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
