/**
 * Seed MongoDB with the initial hardcoded content.
 * Run once: npx tsx scripts/seed.ts
 */
import "dotenv/config"
import mongoose from "mongoose"
import BlogPostModel from "../src/lib/models/BlogPost"
import CaseStudyModel from "../src/lib/models/CaseStudy"
import ServiceModel from "../src/lib/models/Service"

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) throw new Error("MONGODB_URI not set in .env.local")

const posts = [
  {
    slug: "shipping-faster-with-senior-teams",
    title: "Why small senior teams ship faster than big generalist ones",
    excerpt: "Agency scale doesn't make you faster -- it makes you slower. Here's the math on why a small senior team compounds.",
    category: "Growth",
    author: "Mohammed",
    date: "2026-04-10",
    readingTime: "6 min",
    published: true,
    body: [
      "Every founder has had the same experience: you hire a big agency expecting horsepower, and what you get is five people in Slack waiting on each other.",
      "The math is simple. Coordination overhead grows quadratically with team size. With three senior people, you have three communication edges. With nine people, you have thirty-six. That's not 3x the overhead -- it's 12x.",
      "Senior specialists also compress the decision loop. A junior designer needs a review. A senior designer makes the call. A junior engineer needs architecture guidance. A senior engineer has opinions and evidence. Every removed approval step is a day saved.",
      "This is why TechParadice runs lean. A founder-led core, a vetted network, and zero junior-shadow layers. We'd rather ship a Wednesday than have a meeting about Wednesday.",
    ],
  },
  {
    slug: "web-vitals-that-actually-matter",
    title: "The three Web Vitals that actually move revenue",
    excerpt: "Not every Core Web Vital matters equally. Here's which ones correlate with conversion -- and which are vanity.",
    category: "Engineering",
    author: "Mohammed",
    date: "2026-03-22",
    readingTime: "8 min",
    published: true,
    body: [
      "Google publishes Core Web Vitals. Every SEO audit cites them. But if you dig into real e-commerce data, only two of the three correlate tightly with conversion.",
      "LCP matters because it's the moment the user can read and tap. CLS matters because layout shifts break mobile taps and frustrate checkout. INP matters because slow interactions feel broken.",
      "FCP and TTFB show up on dashboards but rarely drive dollars. Optimize the first three relentlessly, and stop stressing the rest.",
    ],
  },
  {
    slug: "the-slash-as-a-brand-device",
    title: "The slash as a brand device -- why a single character does the work",
    excerpt: "A good brand signature is a shortcut. The TechParadice slash earns its keep in four ways.",
    category: "Design",
    author: "Mohammed",
    date: "2026-02-18",
    readingTime: "4 min",
    published: true,
    body: [
      "Great brands compress meaning into a single repeatable gesture. Nike's swoosh. Apple's apple. TechParadice has the slash.",
      "The slash divides the word. That divide is the point -- it's the contrast between tech (hard, bold) and paradice (soft, faded). It becomes a visual rhythm you can reuse everywhere.",
      "On section breaks, meta separators, testimonial attributions -- the slash stitches the brand together without a single extra logo.",
      "The lesson: if your brand has a repeatable mark that can live alone, you've built something durable. If every layout needs the full wordmark to feel like you, you haven't.",
    ],
  },
]

const portfolio = [
  {
    slug: "northwind-commerce",
    client: "Northwind",
    title: "Headless commerce refactor for a wholesale distributor",
    industry: "B2B Commerce",
    services: ["Web Development", "UI/UX Design", "Analytics"],
    timeline: "12 weeks",
    year: "2025",
    outcome: "+38% conversion",
    published: true,
    challenge: "Northwind ran their B2B catalog on a legacy monolith. Page loads averaged 6.4s, mobile conversion was under 1%, and the sales team couldn't iterate without a developer on standby.",
    approach: [
      "Audited the existing stack and mapped every page to a performance and conversion score.",
      "Designed a new component library in Figma aligned with their existing brand system.",
      "Shipped a Next.js 14 rebuild with a Sanity CMS so the sales team could publish without engineering.",
    ],
    solution: [
      "App Router with server components for instant navigation.",
      "Product and category pages served from the edge with ISR.",
      "Structured data, sitemaps, and GA4 conversions wired end-to-end.",
    ],
    results: [
      { value: "+38%", label: "checkout conversion" },
      { value: "1.4s", label: "median LCP" },
      { value: "2.1x", label: "organic traffic in 90 days" },
    ],
    testimonial: {
      quote: "We went from shipping once a quarter to shipping every week. The difference is night and day.",
      author: "Lena Kovac",
      role: "VP Digital, Northwind",
    },
  },
  {
    slug: "orbit-fintech-app",
    client: "Orbit",
    title: "Mobile app launch for a neobank",
    industry: "Fintech",
    services: ["Mobile App", "UI/UX Design", "Analytics"],
    timeline: "16 weeks",
    year: "2025",
    outcome: "4.8 App Store",
    published: true,
    challenge: "Orbit had a working web product and zero mobile presence. Their SMB customers were opening accounts on desktop but abandoning transfers on their phones.",
    approach: [
      "Ran a two-week discovery with the product and compliance teams.",
      "Prototyped three concepts in Figma and tested with real customers.",
      "Built a React Native app with native modules for biometric auth.",
    ],
    solution: [
      "Cross-platform iOS + Android from one codebase.",
      "Biometric onboarding with 2-step verification.",
      "Offline-first transaction queue with server reconciliation.",
    ],
    results: [
      { value: "4.8", label: "App Store rating" },
      { value: "21k", label: "installs in first 30 days" },
      { value: "54%", label: "of transfers now mobile" },
    ],
  },
  {
    slug: "acacia-growth",
    client: "Acacia",
    title: "Full-funnel SEO + paid relaunch for a DTC skincare brand",
    industry: "DTC / Beauty",
    services: ["SEO", "Paid Ads", "Content Creation"],
    timeline: "6 months",
    year: "2024",
    outcome: "3.2x ROAS",
    published: true,
    challenge: "Acacia's launch traction had plateaued. Paid was bleeding, organic rankings were flat, and their content calendar felt disconnected from revenue.",
    approach: [
      "Rebuilt the keyword cluster around revenue pages, not vanity terms.",
      "Shipped a new creative testing framework with 6 angles / week.",
      "Tied paid, organic, and email into one dashboard.",
    ],
    solution: [
      "Full technical SEO pass and schema rollout.",
      "120 pieces of short-form creative across Meta + TikTok.",
      "Weekly budget reallocation against a single ROAS target.",
    ],
    results: [
      { value: "3.2x", label: "blended ROAS" },
      { value: "+112%", label: "organic sessions" },
      { value: "-28%", label: "CAC" },
    ],
  },
]

const services = [
  { slug: "web-development", name: "Website Development", short: "Fast, accessible sites built in Next.js and tuned for conversion.", value: "Production-grade marketing sites and web apps -- engineered for speed, SEO, and scale.", iconName: "Code2", order: 1, deliverables: ["Next.js 14 App Router build, TypeScript end-to-end", "Custom CMS (Sanity, Payload, or MDX) wired to your workflow", "Responsive, pixel-perfect implementation from Figma", "Core Web Vitals targets: LCP < 2.0s, CLS < 0.1", "Vercel deployment with preview URLs per branch"], process: [{ step: "Discover", detail: "Requirements, tech audit, success metrics." }, { step: "Design", detail: "Wireframes, component library, prototypes." }, { step: "Build", detail: "Sprints with staging URLs, QA each cycle." }, { step: "Launch", detail: "DNS, analytics, performance pass, go-live." }], tools: ["Next.js", "TypeScript", "Tailwind", "Vercel", "Sanity", "Prisma"], faqs: [{ q: "How long does a typical site take?", a: "4-10 weeks depending on page count, integrations, and CMS depth." }, { q: "Do you work with existing codebases?", a: "Yes. We audit, refactor, or rebuild -- whichever delivers more value." }], pairsWith: ["ui-ux-design", "seo", "analytics-reporting"] },
  { slug: "mobile-app-development", name: "Mobile App Development", short: "Native-feeling iOS and Android apps from a single codebase.", value: "Cross-platform mobile apps built with React Native or native Swift/Kotlin when it matters.", iconName: "Smartphone", order: 2, deliverables: ["iOS + Android from one React Native codebase", "Native modules when performance demands it", "App Store + Play Store submission support", "Push notifications, analytics, crash reporting", "OTA updates via Expo or CodePush"], process: [{ step: "Discover", detail: "User flows, device targets, MVP scope." }, { step: "Design", detail: "Native UX patterns, prototypes on-device." }, { step: "Build", detail: "Biweekly TestFlight / internal track builds." }, { step: "Launch", detail: "Store submission, rollout, post-launch tuning." }], tools: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Sentry"], faqs: [{ q: "React Native or fully native?", a: "React Native by default -- it ships faster. We go native when hardware or perf demands it." }, { q: "Do you handle App Store submissions?", a: "Yes -- including review responses and post-launch updates." }], pairsWith: ["ui-ux-design", "analytics-reporting", "web-development"] },
  { slug: "ui-ux-design", name: "Custom UI/UX Design", short: "Design systems and interfaces that look right and work harder.", value: "From wireframes to a production-ready component library -- crafted in Figma, built for devs.", iconName: "Palette", order: 3, deliverables: ["Discovery research, user flows, information architecture", "Low and high-fidelity Figma prototypes", "Design system with tokens, components, documentation", "Accessibility audit (WCAG 2.1 AA baseline)", "Handoff with developer-ready specs and assets"], process: [{ step: "Discover", detail: "Stakeholder interviews, competitive audit, goals." }, { step: "Define", detail: "User flows, IA, content strategy." }, { step: "Design", detail: "Wireframes to hi-fi to prototypes." }, { step: "Deliver", detail: "Component library, dev handoff, QA." }], tools: ["Figma", "Framer", "Principle", "Maze", "Lottie"], faqs: [{ q: "Do you handle brand design too?", a: "Digital brand work, yes -- logos, type systems, UI kits. Full identity is case-by-case." }, { q: "Will I get a design system?", a: "Yes -- tokens, components, and documentation your team can extend." }], pairsWith: ["web-development", "mobile-app-development", "content-creation"] },
  { slug: "seo", name: "Search Engine Optimization", short: "Technical and content SEO that compounds month over month.", value: "Earn traffic that converts. Technical audits, content strategy, and link execution that move rankings.", iconName: "Search", order: 4, deliverables: ["Technical audit: crawl, index, schema, Core Web Vitals", "Keyword research + content roadmap (quarterly)", "On-page optimization across top revenue pages", "Internal linking architecture", "Monthly ranking, traffic, and conversion reports"], process: [{ step: "Audit", detail: "Crawl, benchmark, find the quick wins." }, { step: "Strategy", detail: "Keyword clusters mapped to funnel." }, { step: "Execute", detail: "Technical fixes, new content, link work." }, { step: "Measure", detail: "Monthly reports tied to revenue." }], tools: ["Ahrefs", "Search Console", "Screaming Frog", "Looker Studio"], faqs: [{ q: "How long until I see results?", a: "Technical wins land in weeks. Content and authority compound over 3-6 months." }, { q: "Do you write the content?", a: "Yes -- or we partner with your team. Either way, briefs are SEO-first." }], pairsWith: ["web-development", "content-creation", "analytics-reporting"] },
  { slug: "social-media-management", name: "Social Media Management", short: "On-brand, always-on social that builds trust and pipeline.", value: "Strategy, content calendar, and community -- executed weekly across the platforms that matter for you.", iconName: "Megaphone", order: 5, deliverables: ["Channel strategy tailored to audience and goals", "Weekly content calendar with creative briefs", "Post scheduling and publishing", "Community responses within 24 hours", "Monthly performance report"], process: [{ step: "Audit", detail: "Current channels, audience, competitors." }, { step: "Strategy", detail: "Pillars, tone, posting cadence." }, { step: "Produce", detail: "Content designed, written, scheduled." }, { step: "Grow", detail: "Engagement, iterate, scale what works." }], tools: ["Buffer", "Later", "Canva", "Figma", "Notion"], faqs: [{ q: "Which platforms do you cover?", a: "LinkedIn, Instagram, X, TikTok, YouTube Shorts, Threads." }, { q: "Do you produce video?", a: "Short-form, yes. Longer productions through our content arm." }], pairsWith: ["content-creation", "paid-advertising", "community-management"] },
  { slug: "content-creation", name: "Content Creation", short: "Writing, design, and video that earns attention and trust.", value: "Long-form articles, short-form social creative, and video -- produced to a brief and a deadline.", iconName: "FileText", order: 6, deliverables: ["Content strategy aligned to SEO and social goals", "Long-form articles, case studies, landing page copy", "Social graphics and short-form video", "Editorial calendar, SEO briefs, keyword mapping", "Source interviews and subject-matter reviews"], process: [{ step: "Plan", detail: "Calendar, briefs, keyword targets." }, { step: "Produce", detail: "Drafts, design, edits, approvals." }, { step: "Publish", detail: "CMS, social, distribution channels." }, { step: "Iterate", detail: "Performance review, refresh, repurpose." }], tools: ["Notion", "Frase", "Grammarly", "Descript", "Figma"], faqs: [{ q: "Who writes the content?", a: "Specialist writers paired with subject-matter reviewers -- never generic AI output." }, { q: "Do you handle video?", a: "Short-form social video, product walkthroughs, and edits of existing footage." }], pairsWith: ["seo", "social-media-management", "ui-ux-design"] },
  { slug: "community-management", name: "Community Management", short: "Respond, moderate, and grow -- like a team member who never sleeps.", value: "Real humans responding in your voice, building loyalty across every comment thread and DM.", iconName: "Users", order: 7, deliverables: ["Response SLA: under 4 hours during business hours", "Tone and escalation playbooks", "Moderation and spam removal", "Insights reports on sentiment and common questions", "FAQ library to reduce repeat tickets"], process: [{ step: "Onboard", detail: "Voice guide, escalation paths, tools." }, { step: "Monitor", detail: "Inbox and mentions watched continuously." }, { step: "Respond", detail: "Thoughtful replies, not templates." }, { step: "Report", detail: "Monthly themes, risks, opportunities." }], tools: ["Sprout", "Sprinklr", "Discord", "Intercom"], faqs: [{ q: "What hours do you cover?", a: "Standard is 9-6 local. Extended and weekend coverage available." }, { q: "Do you run Discord or Slack communities?", a: "Yes -- moderation, onboarding, events, and reporting." }], pairsWith: ["social-media-management", "content-creation", "analytics-reporting"] },
  { slug: "analytics-reporting", name: "Analytics & Reporting", short: "Clean data pipelines and dashboards that actually get read.", value: "Event tracking, dashboards, and monthly narrative reports -- so every decision has numbers behind it.", iconName: "BarChart3", order: 8, deliverables: ["GA4 + server-side tagging setup", "Custom event schema and conversion tracking", "Looker Studio or Metabase dashboards", "Funnel analysis and drop-off insights", "Monthly narrative report with recommendations"], process: [{ step: "Audit", detail: "Current tracking, data quality, gaps." }, { step: "Implement", detail: "Events, conversions, pipelines." }, { step: "Visualize", detail: "Dashboards tuned to decisions you make." }, { step: "Report", detail: "Monthly read-outs with next actions." }], tools: ["GA4", "GTM", "Looker Studio", "Metabase", "Mixpanel", "Segment"], faqs: [{ q: "Can you migrate from UA?", a: "Yes -- and we document every event so the new schema stays clean." }, { q: "Do you build dashboards?", a: "Yes -- in whatever tool your team already uses." }], pairsWith: ["seo", "paid-advertising", "web-development"] },
  { slug: "paid-advertising", name: "Paid Advertising", short: "Meta, Google, LinkedIn, and TikTok ads managed for ROAS.", value: "Creative, campaign structure, and budget discipline -- tuned weekly against the metric that matters.", iconName: "Activity", order: 9, deliverables: ["Channel strategy: Meta, Google, LinkedIn, TikTok, YouTube", "Creative production and testing framework", "Landing pages aligned to ad intent", "Weekly budget pacing and optimization", "Monthly ROAS report with next-cycle plan"], process: [{ step: "Plan", detail: "Targets, channels, budgets, creative angles." }, { step: "Launch", detail: "Campaign builds, pixels, conversions wired." }, { step: "Optimize", detail: "Weekly review, reallocate, kill underperformers." }, { step: "Scale", detail: "Double down on winners, test new angles." }], tools: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok Ads", "Triple Whale"], faqs: [{ q: "What is the minimum ad spend?", a: "We recommend $5k/month media to see signal -- lower is possible case-by-case." }, { q: "Do you produce ad creative?", a: "Yes -- static, motion, and short-form video briefed against performance hypotheses." }], pairsWith: ["analytics-reporting", "content-creation", "web-development"] },
]

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log("Connected to MongoDB")

  await BlogPostModel.deleteMany({})
  await CaseStudyModel.deleteMany({})
  await ServiceModel.deleteMany({})

  await BlogPostModel.insertMany(posts)
  console.log(`Seeded ${posts.length} blog posts`)

  await CaseStudyModel.insertMany(portfolio)
  console.log(`Seeded ${portfolio.length} case studies`)

  await ServiceModel.insertMany(services)
  console.log(`Seeded ${services.length} services`)

  await mongoose.disconnect()
  console.log("Done.")
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
