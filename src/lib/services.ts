import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BarChart3,
  Code2,
  FileText,
  Megaphone,
  Palette,
  Search,
  Smartphone,
  Users,
} from 'lucide-react'

export type Service = {
  slug: string
  name: string
  short: string
  value: string
  icon: LucideIcon
  deliverables: string[]
  process: { step: string; detail: string }[]
  tools: string[]
  faqs: { q: string; a: string }[]
  pairsWith: string[]
}

export const services: Service[] = [
  {
    slug: 'web-development',
    name: 'Website Development',
    short: 'Fast, accessible sites built in Next.js and tuned for conversion.',
    value:
      'Production-grade marketing sites and web apps — engineered for speed, SEO, and scale.',
    icon: Code2,
    deliverables: [
      'Next.js 14 App Router build, TypeScript end-to-end',
      'Custom CMS (Sanity, Payload, or MDX) wired to your workflow',
      'Responsive, pixel-perfect implementation from Figma',
      'Core Web Vitals targets: LCP < 2.0s, CLS < 0.1',
      'Vercel deployment with preview URLs per branch',
    ],
    process: [
      { step: 'Discover', detail: 'Requirements, tech audit, success metrics.' },
      { step: 'Design', detail: 'Wireframes, component library, prototypes.' },
      { step: 'Build', detail: 'Sprints with staging URLs, QA each cycle.' },
      { step: 'Launch', detail: 'DNS, analytics, performance pass, go-live.' },
    ],
    tools: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel', 'Sanity', 'Prisma'],
    faqs: [
      {
        q: 'How long does a typical site take?',
        a: '4–10 weeks depending on page count, integrations, and CMS depth.',
      },
      {
        q: 'Do you work with existing codebases?',
        a: 'Yes. We audit, refactor, or rebuild — whichever delivers more value.',
      },
      {
        q: 'Will my site be SEO-ready?',
        a: 'Yes. Structured data, sitemaps, metadata, and Core Web Vitals are standard.',
      },
      {
        q: 'Can you maintain the site after launch?',
        a: 'Absolutely. Retainers cover updates, feature work, and performance.',
      },
    ],
    pairsWith: ['ui-ux-design', 'seo', 'analytics-reporting'],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    short: 'Native-feeling iOS and Android apps from a single codebase.',
    value:
      'Cross-platform mobile apps built with React Native or native Swift/Kotlin when it matters.',
    icon: Smartphone,
    deliverables: [
      'iOS + Android from one React Native codebase',
      'Native modules when performance demands it',
      'App Store + Play Store submission support',
      'Push notifications, analytics, crash reporting',
      'OTA updates via Expo or CodePush',
    ],
    process: [
      { step: 'Discover', detail: 'User flows, device targets, MVP scope.' },
      { step: 'Design', detail: 'Native UX patterns, prototypes on-device.' },
      { step: 'Build', detail: 'Biweekly TestFlight / internal track builds.' },
      { step: 'Launch', detail: 'Store submission, rollout, post-launch tuning.' },
    ],
    tools: ['React Native', 'Expo', 'Swift', 'Kotlin', 'Firebase', 'Sentry'],
    faqs: [
      {
        q: 'React Native or fully native?',
        a: 'React Native by default — it ships faster. We go native when hardware or perf demands it.',
      },
      {
        q: 'Do you handle App Store submissions?',
        a: 'Yes — including review responses and post-launch updates.',
      },
      {
        q: 'Can the app share code with my web product?',
        a: 'Yes. We share types, API clients, and business logic across platforms.',
      },
      {
        q: 'What about offline support?',
        a: 'We build offline-first when the use case needs it — local storage, sync, conflict resolution.',
      },
    ],
    pairsWith: ['ui-ux-design', 'analytics-reporting', 'web-development'],
  },
  {
    slug: 'ui-ux-design',
    name: 'Custom UI/UX Design',
    short: 'Design systems and interfaces that look right and work harder.',
    value:
      'From wireframes to a production-ready component library — crafted in Figma, built for devs.',
    icon: Palette,
    deliverables: [
      'Discovery research, user flows, information architecture',
      'Low and high-fidelity Figma prototypes',
      'Design system with tokens, components, documentation',
      'Accessibility audit (WCAG 2.1 AA baseline)',
      'Handoff with developer-ready specs and assets',
    ],
    process: [
      { step: 'Discover', detail: 'Stakeholder interviews, competitive audit, goals.' },
      { step: 'Define', detail: 'User flows, IA, content strategy.' },
      { step: 'Design', detail: 'Wireframes → hi-fi → prototypes.' },
      { step: 'Deliver', detail: 'Component library, dev handoff, QA.' },
    ],
    tools: ['Figma', 'Framer', 'Principle', 'Maze', 'Lottie'],
    faqs: [
      {
        q: 'Do you handle brand design too?',
        a: 'Digital brand work, yes — logos, type systems, UI kits. Full identity is case-by-case.',
      },
      {
        q: 'Will I get a design system?',
        a: 'Yes — tokens, components, and documentation your team can extend.',
      },
      {
        q: 'Can you work with our existing brand?',
        a: 'Absolutely. We treat existing guidelines as constraints, not suggestions.',
      },
      {
        q: 'Do you do user research?',
        a: 'Discovery interviews and usability tests are included on most engagements.',
      },
    ],
    pairsWith: ['web-development', 'mobile-app-development', 'content-creation'],
  },
  {
    slug: 'seo',
    name: 'Search Engine Optimization',
    short: 'Technical and content SEO that compounds month over month.',
    value:
      'Earn traffic that converts. Technical audits, content strategy, and link execution that move rankings.',
    icon: Search,
    deliverables: [
      'Technical audit: crawl, index, schema, Core Web Vitals',
      'Keyword research + content roadmap (quarterly)',
      'On-page optimization across top revenue pages',
      'Internal linking architecture',
      'Monthly ranking, traffic, and conversion reports',
    ],
    process: [
      { step: 'Audit', detail: 'Crawl, benchmark, find the quick wins.' },
      { step: 'Strategy', detail: 'Keyword clusters mapped to funnel.' },
      { step: 'Execute', detail: 'Technical fixes, new content, link work.' },
      { step: 'Measure', detail: 'Monthly reports tied to revenue.' },
    ],
    tools: ['Ahrefs', 'Search Console', 'Screaming Frog', 'Looker Studio'],
    faqs: [
      {
        q: 'How long until I see results?',
        a: 'Technical wins land in weeks. Content and authority compound over 3–6 months.',
      },
      {
        q: 'Do you write the content?',
        a: 'Yes — or we partner with your team. Either way, briefs are SEO-first.',
      },
      {
        q: 'Can you fix a Google penalty?',
        a: 'We audit, identify the cause, and file a reconsideration request if needed.',
      },
      {
        q: 'Do you do local SEO?',
        a: 'Yes — Google Business Profile, local citations, review strategy.',
      },
    ],
    pairsWith: ['web-development', 'content-creation', 'analytics-reporting'],
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    short: 'On-brand, always-on social that builds trust and pipeline.',
    value:
      'Strategy, content calendar, and community — executed weekly across the platforms that matter for you.',
    icon: Megaphone,
    deliverables: [
      'Channel strategy tailored to audience and goals',
      'Weekly content calendar with creative briefs',
      'Post scheduling and publishing (LinkedIn, Instagram, X, TikTok)',
      'Community responses within 24 hours',
      'Monthly performance report with next-cycle recommendations',
    ],
    process: [
      { step: 'Audit', detail: 'Current channels, audience, competitors.' },
      { step: 'Strategy', detail: 'Pillars, tone, posting cadence.' },
      { step: 'Produce', detail: 'Content designed, written, scheduled.' },
      { step: 'Grow', detail: 'Engagement, iterate, scale what works.' },
    ],
    tools: ['Buffer', 'Later', 'Canva', 'Figma', 'Notion'],
    faqs: [
      {
        q: 'Which platforms do you cover?',
        a: 'LinkedIn, Instagram, X, TikTok, YouTube Shorts, Threads. We recommend the 2–3 that fit.',
      },
      {
        q: 'Do you produce video?',
        a: 'Short-form, yes. Longer productions through our content arm.',
      },
      {
        q: 'Can I approve posts?',
        a: 'Weekly batch approval via Notion or ClickUp — fast and auditable.',
      },
      {
        q: 'What about paid promotion?',
        a: 'We handle it through our Paid Advertising service — integrated with organic.',
      },
    ],
    pairsWith: ['content-creation', 'paid-advertising', 'community-management'],
  },
  {
    slug: 'content-creation',
    name: 'Content Creation',
    short: 'Writing, design, and video that earns attention and trust.',
    value:
      'Long-form articles, short-form social creative, and video — produced to a brief and a deadline.',
    icon: FileText,
    deliverables: [
      'Content strategy aligned to SEO and social goals',
      'Long-form articles, case studies, landing page copy',
      'Social graphics and short-form video',
      'Editorial calendar, SEO briefs, keyword mapping',
      'Source interviews and subject-matter reviews',
    ],
    process: [
      { step: 'Plan', detail: 'Calendar, briefs, keyword targets.' },
      { step: 'Produce', detail: 'Drafts, design, edits, approvals.' },
      { step: 'Publish', detail: 'CMS, social, distribution channels.' },
      { step: 'Iterate', detail: 'Performance review, refresh, repurpose.' },
    ],
    tools: ['Notion', 'Frase', 'Grammarly', 'Descript', 'Figma'],
    faqs: [
      {
        q: 'Who writes the content?',
        a: 'Specialist writers paired with subject-matter reviewers — never generic AI output.',
      },
      {
        q: 'Do you handle video?',
        a: 'Short-form social video, product walkthroughs, and edits of existing footage.',
      },
      {
        q: 'How is tone handled?',
        a: 'A documented voice guide — approved by you before any content ships.',
      },
      {
        q: 'Can you repurpose existing content?',
        a: 'Yes. A single long-form piece usually spawns 6–10 derivatives.',
      },
    ],
    pairsWith: ['seo', 'social-media-management', 'ui-ux-design'],
  },
  {
    slug: 'community-management',
    name: 'Community Management',
    short: 'Respond, moderate, and grow — like a team member who never sleeps.',
    value:
      'Real humans responding in your voice, building loyalty across every comment thread and DM.',
    icon: Users,
    deliverables: [
      'Response SLA: under 4 hours during business hours',
      'Tone and escalation playbooks',
      'Moderation and spam removal',
      'Insights reports on sentiment and common questions',
      'FAQ library to reduce repeat tickets',
    ],
    process: [
      { step: 'Onboard', detail: 'Voice guide, escalation paths, tools.' },
      { step: 'Monitor', detail: 'Inbox and mentions watched continuously.' },
      { step: 'Respond', detail: 'Thoughtful replies, not templates.' },
      { step: 'Report', detail: 'Monthly themes, risks, opportunities.' },
    ],
    tools: ['Sprout', 'Sprinklr', 'Discord', 'Intercom'],
    faqs: [
      {
        q: 'What hours do you cover?',
        a: 'Standard is 9–6 local. Extended and weekend coverage available.',
      },
      {
        q: 'Can you handle negative comments?',
        a: 'Yes — with a playbook that protects brand reputation and escalates fast.',
      },
      {
        q: 'Do you run Discord or Slack communities?',
        a: 'Yes — moderation, onboarding, events, and reporting.',
      },
      {
        q: 'Do you use AI replies?',
        a: 'Only as a drafting assist — every reply is reviewed before sending.',
      },
    ],
    pairsWith: ['social-media-management', 'content-creation', 'analytics-reporting'],
  },
  {
    slug: 'analytics-reporting',
    name: 'Analytics & Reporting',
    short: 'Clean data pipelines and dashboards that actually get read.',
    value:
      'Event tracking, dashboards, and monthly narrative reports — so every decision has numbers behind it.',
    icon: BarChart3,
    deliverables: [
      'GA4 + server-side tagging setup',
      'Custom event schema and conversion tracking',
      'Looker Studio or Metabase dashboards',
      'Funnel analysis and drop-off insights',
      'Monthly narrative report with recommendations',
    ],
    process: [
      { step: 'Audit', detail: 'Current tracking, data quality, gaps.' },
      { step: 'Implement', detail: 'Events, conversions, pipelines.' },
      { step: 'Visualize', detail: 'Dashboards tuned to decisions you make.' },
      { step: 'Report', detail: 'Monthly read-outs with next actions.' },
    ],
    tools: ['GA4', 'GTM', 'Looker Studio', 'Metabase', 'Mixpanel', 'Segment'],
    faqs: [
      {
        q: 'Can you migrate from UA?',
        a: 'Yes — and we document every event so the new schema stays clean.',
      },
      {
        q: 'What about privacy and consent?',
        a: 'Consent mode v2, cookie banners, server-side tagging where needed.',
      },
      {
        q: 'Do you build dashboards?',
        a: 'Yes — in whatever tool your team already uses.',
      },
      {
        q: 'Will I get reports or just raw data?',
        a: 'Both. Dashboards for self-serve, monthly narratives for decisions.',
      },
    ],
    pairsWith: ['seo', 'paid-advertising', 'web-development'],
  },
  {
    slug: 'paid-advertising',
    name: 'Paid Advertising',
    short: 'Meta, Google, LinkedIn, and TikTok ads managed for ROAS.',
    value:
      'Creative, campaign structure, and budget discipline — tuned weekly against the metric that matters.',
    icon: Activity,
    deliverables: [
      'Channel strategy: Meta, Google, LinkedIn, TikTok, YouTube',
      'Creative production and testing framework',
      'Landing pages aligned to ad intent',
      'Weekly budget pacing and optimization',
      'Monthly ROAS report with next-cycle plan',
    ],
    process: [
      { step: 'Plan', detail: 'Targets, channels, budgets, creative angles.' },
      { step: 'Launch', detail: 'Campaign builds, pixels, conversions wired.' },
      { step: 'Optimize', detail: 'Weekly review, reallocate, kill underperformers.' },
      { step: 'Scale', detail: 'Double down on winners, test new angles.' },
    ],
    tools: ['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'TikTok Ads', 'Triple Whale'],
    faqs: [
      {
        q: 'What is the minimum ad spend?',
        a: 'We recommend $5k/month media to see signal — lower is possible case-by-case.',
      },
      {
        q: 'Do you produce ad creative?',
        a: 'Yes — static, motion, and short-form video briefed against performance hypotheses.',
      },
      {
        q: 'How do you handle attribution?',
        a: 'Server-side tagging + a mix of platform, MMM, and self-reported attribution.',
      },
      {
        q: 'What does your fee look like?',
        a: 'Flat monthly management plus creative. No opaque % of spend.',
      },
    ],
    pairsWith: ['analytics-reporting', 'content-creation', 'web-development'],
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
