/**
 * Seed MongoDB with the initial hardcoded content.
 * Run once: npx tsx scripts/seed.ts
 */
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
dotenv.config()
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
  {
    slug: "local-seo-for-gcc-businesses",
    title: "Local SEO in the GCC: what works in 2026",
    excerpt: "Google Maps dominates discovery in Dubai, Riyadh, and Doha. Here's how to rank in the cities that matter.",
    category: "Growth",
    author: "Mohammed",
    date: "2026-05-12",
    readingTime: "7 min",
    published: true,
    body: [
      "In the GCC, most new customers find local businesses on Google Maps before they ever visit a website. Your Google Business Profile is more important than your homepage for foot traffic.",
      "The ranking factors in 2026 are proximity, relevance, and prominence. Proximity is out of your control. Relevance and prominence are not. Relevance comes from how well your GBP and site categories match the query. Prominence is reviews, links, and citations.",
      "What most GCC businesses miss: their NAP (Name, Address, Phone) is inconsistent across the web. A Dubai restaurant might be 'Restaurant ABC', 'ABC Restaurant Dubai', and 'ABC — Dubai' across three directories. Google sees three different entities. Fix the citations first.",
      "Reviews are the fastest lever. A business with 80 reviews at 4.6 stars outranks a business with 20 reviews at 4.9 stars almost every time. Build a system: text customers a review link 24 hours after a visit. One automated message generates more reviews than a year of asking verbally.",
      "For bilingual markets like the UAE and KSA, duplicate your GBP content in Arabic. Google serves Arabic-language results to Arabic-language searches. A business that only appears in English leaves half the market on the table.",
    ],
  },
  {
    slug: "bilingual-websites-gcc",
    title: "Why bilingual websites earn 2x the traffic in GCC markets",
    excerpt: "Arabic search volume in Saudi Arabia and the UAE is as large as English. Most agency sites are English-only.",
    category: "Engineering",
    author: "Mohammed",
    date: "2026-05-28",
    readingTime: "5 min",
    published: true,
    body: [
      "Most agencies serving the GCC build English-only websites and then wonder why organic traffic plateaus. The answer is simple: half their potential audience searches in Arabic.",
      "In Saudi Arabia, 67% of Google searches are in Arabic. In the UAE, the split is roughly 50/50. A monolingual English site is invisible to a large portion of its own market.",
      "Building bilingual right means more than translation. You need RTL layout, separate URL paths (/ar/...), hreflang tags, and Arabic-optimized meta titles and descriptions. Google treats each language version as a separate indexable page -- done well, you double your indexable surface area.",
      "The common objection is content volume. You've written 40 pages of English content and the thought of translating all of it feels like starting over. The answer is to prioritize. Translate your five highest-traffic pages and your conversion pages first. The ROI is immediate.",
      "At TechParadice, every site we build is bilingual by default. The cost delta at build time is small. The traffic delta over 12 months is not.",
    ],
  },
  {
    slug: "ai-assistants-for-smb",
    title: "AI assistants for SMBs: what to automate first",
    excerpt: "Most small businesses don't need a custom LLM. They need three automations that save 10 hours a week.",
    category: "Engineering",
    author: "Mohammed",
    date: "2026-06-05",
    readingTime: "6 min",
    published: true,
    body: [
      "The AI conversation in 2026 is still dominated by enterprise use cases: RAG pipelines, fine-tuned models, agentic workflows. Most SMBs read this content and feel like AI isn't for them yet. That's a mistake.",
      "The highest-ROI AI automation for an SMB is almost never an LLM. It's a workflow. Lead intake form → CRM → WhatsApp message to the owner. That's not AI in the academic sense, but it's what business owners mean when they say they want AI.",
      "After that: a website chat widget trained on your FAQ, pricing, and service list. Not GPT-4, not a custom model. Just a retrieval-augmented assistant that answers the questions your team answers fifty times a week.",
      "Third: appointment booking. If a customer has to call to book, you're losing 40% of them. An AI-powered booking flow that handles confirmations, reminders, and rescheduling pays for itself in the first week.",
      "Start there. Get those three working. Then you'll have real data on where the next bottleneck is -- and it'll be easier to make the case for something more sophisticated.",
    ],
  },
  {
    slug: "how-to-pick-a-digital-agency-in-dubai",
    title: "How to pick a digital agency in Dubai (without getting burned)",
    excerpt: "Dubai has hundreds of digital agencies. Here's the five-question framework that separates the ones who ship from the ones who sell.",
    category: "Growth",
    author: "Mohammed",
    date: "2026-06-19",
    readingTime: "7 min",
    published: true,
    body: [
      "Dubai has more digital agencies per capita than almost any city in the world. This is good for competition and bad for clarity. When every agency promises 'full-service digital transformation', the words stop meaning anything.",
      "Question one: Can you show me three live sites you built in the last 12 months? Not mockups. Not case studies with redacted client names. Live URLs you can inspect. If they hedge, that's your answer.",
      "Question two: Who specifically will work on my project? Many agencies win pitches with senior partners and then hand the work to juniors. Get the name and LinkedIn of every person who will touch your project before you sign.",
      "Question three: What does the first 30 days look like? Good agencies have a discovery process. Bad ones start designing on day one. If they can't describe their onboarding step-by-step, they don't have one.",
      "Question four: How do you measure success? Vanity metrics (impressions, reach, page views) are easy to game and useless. You want an agency that ties work to revenue metrics: leads, conversions, cost per acquisition.",
      "Question five: What happens if it doesn't work? The answer tells you more than the pitch deck. Good agencies have honest conversations about risk. Great agencies have track records that make the question almost irrelevant.",
    ],
  },
  {
    slug: "mobile-first-design-mena",
    title: "Mobile-first design for MENA: the numbers that change how you build",
    excerpt: "In Saudi Arabia, over 75% of web traffic is mobile. Most sites are still designed desktop-first.",
    category: "Design",
    author: "Mohammed",
    date: "2026-06-30",
    readingTime: "5 min",
    published: true,
    body: [
      "The design industry talks about mobile-first. Most agencies still design desktop-first and call it responsive. In MENA markets, this is a meaningful mistake.",
      "Saudi Arabia has 79% mobile web traffic. UAE is at 74%. Kuwait is 81%. These aren't emerging-market anomalies -- they reflect a population that got smartphones before laptops and never changed. The desktop is the afterthought, not the phone.",
      "Mobile-first design means your hero section, your CTA, your navigation, and your forms are designed for a 390px screen first. The desktop layout is an expansion of the mobile layout, not the other way around. If you design desktop and squeeze it down, you always end up with compromises on mobile.",
      "The most common failure we see: desktop CTA buttons that stack awkwardly on mobile. Desktop navigation that becomes a broken hamburger menu. Desktop hero text that overlaps the image at 375px. All fixable in an hour. All the result of desktop-first process.",
      "Designing mobile-first also disciplines your content. On a 390px screen, you have roughly 60 words before the fold. That forces you to be specific about your value proposition. The constraint is a gift.",
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
  {
    slug: "draglab",
    client: "DragLab Germany",
    title: "Production-grade B2B platform for a laboratory equipment manufacturer",
    industry: "B2B / Lab Equipment",
    services: ["Web Development", "UI/UX Design", "SEO & Content", "Analytics"],
    timeline: "20 weeks",
    year: "2025",
    outcome: "5 languages, zero dev dependency",
    published: true,
    challenge: "DragLab needed a global digital presence that their non-technical team could operate independently. Their previous setup forced every content change through a developer, had no multilingual workflow, and lacked a structured lead pipeline for distributor applications, warranty claims, and technical service requests.",
    approach: [
      "Mapped every content type — products, models, articles, case studies, FAQs, glossary — into a unified multilingual data architecture.",
      "Designed a full admin CMS so the sales and marketing team could publish, update, and manage leads without touching code.",
      "Built a modular lead pipeline with distinct statuses, PDF generation, and SendGrid email automation for each form type.",
      "Implemented a nonce-based CSP, CSRF tokens, and Google reCAPTCHA Enterprise on every public-facing form.",
    ],
    solution: [
      "Node.js + Express MVC platform with EJS server-side rendering for fast, SEO-friendly page loads.",
      "18 Mongoose models covering products, nested model variants, accessories, 6 lead types, articles, case studies, FAQs, glossary, testimonials, and industry landing pages.",
      "Full 5-language system (EN, DE, ES, TR, FR) with per-language publish status on every content piece and hreflang tags across all routes.",
      "Cloudinary CDN + Sharp image pipeline, PDF generation via pdf-lib and pdfkit, and Excel subscriber exports via ExcelJS.",
      "Weighted MongoDB full-text search index spanning product names, descriptions, and keyword tags across all 5 languages simultaneously.",
    ],
    results: [
      { value: "5", label: "languages shipped" },
      { value: "18", label: "data models" },
      { value: "6", label: "lead capture workflows" },
    ],
    titleAr: "منصة B2B متكاملة لمصنّع معدات مختبرات",
    outcomeAr: "5 لغات، استقلالية تامة عن المطورين",
    challengeAr: "احتاجت DragLab إلى حضور رقمي عالمي يستطيع فريقها غير التقني إدارته باستقلالية. كان الإعداد السابق يُلزم كل تعديل في المحتوى بالمرور عبر مطوّر، دون دعم متعدد اللغات أو خط أنابيب منظم للعملاء المحتملين.",
    approachAr: [
      "رسم خريطة لكل نوع محتوى — منتجات، موديلات، مقالات، دراسات حالة، أسئلة شائعة، معجم مصطلحات — ضمن بنية بيانات متعددة اللغات موحّدة.",
      "تصميم لوحة إدارة CMS متكاملة تُمكّن فريقَي المبيعات والتسويق من النشر والتحديث وإدارة العملاء المحتملين دون لمس الكود.",
      "بناء خط أنابيب معياري للعملاء المحتملين مع حالات مميزة لكل نوع وتوليد PDF وأتمتة بريد إلكتروني عبر SendGrid.",
      "تطبيق CSP مبني على النونس وحماية CSRF و Google reCAPTCHA Enterprise على كل نموذج موجّه للعموم.",
    ],
    solutionAr: [
      "منصة Node.js + Express بنمط MVC مع تصيير EJS من جانب الخادم لتحميل صفحات سريع وصديق لمحركات البحث.",
      "18 نموذج Mongoose تشمل المنتجات والموديلات المتداخلة والإكسسوارات و6 أنواع عملاء محتملين ومقالات ودراسات حالة وأسئلة شائعة ومعجمًا وشهادات عملاء وصفحات صناعية.",
      "نظام متكامل لخمس لغات (EN, DE, ES, TR, FR) مع حالة نشر مستقلة لكل قطعة محتوى وعلامات hreflang عبر جميع المسارات.",
      "خط معالجة صور Cloudinary CDN + Sharp، وتوليد PDF عبر pdf-lib وpdfkit، وتصدير Excel للمشتركين عبر ExcelJS.",
      "فهرس بحث نصي MongoDB مرجّح يغطي أسماء المنتجات والأوصاف وكلمات البحث الدلالية عبر اللغات الخمس في آنٍ واحد.",
    ],
    resultsAr: [
      { value: "5", label: "لغات مُطلقة" },
      { value: "18", label: "نموذج بيانات" },
      { value: "6", label: "مسارات استقطاب عملاء" },
    ],
    publishedAr: true,
  },
]

const services = [
  {
    slug: "web-development", name: "Website Development", short: "Fast, accessible sites built in Next.js and tuned for conversion.", value: "Production-grade marketing sites and web apps -- engineered for speed, SEO, and scale.", iconName: "Code2", order: 1,
    deliverables: ["Next.js 14 App Router build, TypeScript end-to-end", "Custom CMS (Sanity, Payload, or MDX) wired to your workflow", "Responsive, pixel-perfect implementation from Figma", "Core Web Vitals targets: LCP < 2.0s, CLS < 0.1", "Vercel deployment with preview URLs per branch"],
    process: [{ step: "Discover", detail: "Requirements, tech audit, success metrics." }, { step: "Design", detail: "Wireframes, component library, prototypes." }, { step: "Build", detail: "Sprints with staging URLs, QA each cycle." }, { step: "Launch", detail: "DNS, analytics, performance pass, go-live." }],
    tools: ["Next.js", "TypeScript", "Tailwind", "Vercel", "Sanity", "Prisma"],
    faqs: [{ q: "How long does a typical site take?", a: "4-10 weeks depending on page count, integrations, and CMS depth." }, { q: "Do you work with existing codebases?", a: "Yes. We audit, refactor, or rebuild -- whichever delivers more value." }],
    pairsWith: ["ui-ux-design", "seo-content", "mobile-apps"],
    nameAr: "تطوير المواقع الإلكترونية", shortAr: "مواقع سريعة وسهلة الوصول مبنية بـ Next.js ومُحسَّنة للتحويل.", valueAr: "مواقع تسويقية وتطبيقات ويب بجودة إنتاجية — مُهنْدَسة للسرعة والسيو والتوسع.",
    deliverablesAr: ["تطوير بـ Next.js 14 App Router مع TypeScript من البداية للنهاية", "نظام CMS مخصص (Sanity أو Payload أو MDX) مرتبط بسير عملك", "تنفيذ متجاوب ودقيق البكسل من تصاميم Figma", "أهداف Core Web Vitals: LCP أقل من 2.0s، CLS أقل من 0.1", "نشر على Vercel مع روابط معاينة لكل فرع"],
    processAr: [{ step: "الاستكشاف", detail: "المتطلبات، تدقيق تقني، مقاييس النجاح." }, { step: "التصميم", detail: "إطارات سلكية، مكتبة مكونات، نماذج أولية." }, { step: "البناء", detail: "سبرينتات مع روابط تدريجية، ضمان جودة في كل دورة." }, { step: "الإطلاق", detail: "DNS، تحليلات، اختبار الأداء، الإطلاق الرسمي." }],
    faqsAr: [{ q: "كم يستغرق بناء الموقع عادةً؟", a: "من 4 إلى 10 أسابيع حسب عدد الصفحات والتكاملات وعمق نظام CMS." }, { q: "هل تعملون على قواعد أكواد موجودة؟", a: "نعم. نقوم بالتدقيق، وإعادة الهيكلة، أو إعادة البناء — أيًا كان الأكثر قيمة." }],
  },
  {
    slug: "mobile-apps", name: "Mobile Apps", short: "Native-feeling iOS and Android apps from a single codebase.", value: "Cross-platform mobile apps built with React Native or native Swift/Kotlin when it matters.", iconName: "Smartphone", order: 2,
    deliverables: ["iOS + Android from one React Native codebase", "Native modules when performance demands it", "App Store + Play Store submission support", "Push notifications, analytics, crash reporting", "OTA updates via Expo or CodePush"],
    process: [{ step: "Discover", detail: "User flows, device targets, MVP scope." }, { step: "Design", detail: "Native UX patterns, prototypes on-device." }, { step: "Build", detail: "Biweekly TestFlight / internal track builds." }, { step: "Launch", detail: "Store submission, rollout, post-launch tuning." }],
    tools: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Sentry"],
    faqs: [{ q: "React Native or fully native?", a: "React Native by default -- it ships faster. We go native when hardware or perf demands it." }, { q: "Do you handle App Store submissions?", a: "Yes -- including review responses and post-launch updates." }],
    pairsWith: ["ui-ux-design", "web-development", "ai-assistants"],
    nameAr: "تطبيقات الجوال", shortAr: "تطبيقات iOS وAndroid بتجربة أصلية من قاعدة كود واحدة.", valueAr: "تطبيقات جوال متعددة المنصات مبنية بـ React Native أو Swift/Kotlin الأصلي عند الحاجة.",
    deliverablesAr: ["iOS وAndroid من قاعدة كود React Native واحدة", "وحدات أصلية عند مطالبات الأداء", "دعم تقديم التطبيق إلى App Store وPlay Store", "إشعارات الدفع، التحليلات، تقارير الأعطال", "تحديثات OTA عبر Expo أو CodePush"],
    processAr: [{ step: "الاستكشاف", detail: "تدفقات المستخدم، الأجهزة المستهدفة، نطاق MVP." }, { step: "التصميم", detail: "أنماط UX الأصلية، نماذج أولية على الجهاز." }, { step: "البناء", detail: "إصدارات TestFlight / internal track كل أسبوعين." }, { step: "الإطلاق", detail: "تقديم المتجر، الطرح، ضبط ما بعد الإطلاق." }],
    faqsAr: [{ q: "React Native أم أصلي بالكامل؟", a: "React Native افتراضيًا — يُشحن أسرع. نلجأ للأصلي عند مطالبات الأجهزة أو الأداء." }, { q: "هل تتولون تقديم التطبيق إلى المتاجر؟", a: "نعم — بما يشمل الردود على المراجعات والتحديثات اللاحقة للإطلاق." }],
  },
  {
    slug: "ui-ux-design", name: "UI/UX Design", short: "Design systems and interfaces that look right and work harder.", value: "From wireframes to a production-ready component library -- crafted in Figma, built for devs.", iconName: "Palette", order: 3,
    deliverables: ["Discovery research, user flows, information architecture", "Low and high-fidelity Figma prototypes", "Design system with tokens, components, documentation", "Accessibility audit (WCAG 2.1 AA baseline)", "Handoff with developer-ready specs and assets"],
    process: [{ step: "Discover", detail: "Stakeholder interviews, competitive audit, goals." }, { step: "Define", detail: "User flows, IA, content strategy." }, { step: "Design", detail: "Wireframes to hi-fi to prototypes." }, { step: "Deliver", detail: "Component library, dev handoff, QA." }],
    tools: ["Figma", "Framer", "Principle", "Maze", "Lottie"],
    faqs: [{ q: "Do you handle brand design too?", a: "Digital brand work, yes -- logos, type systems, UI kits. Full identity is case-by-case." }, { q: "Will I get a design system?", a: "Yes -- tokens, components, and documentation your team can extend." }],
    pairsWith: ["web-development", "mobile-apps", "seo-content"],
    nameAr: "تصميم UI/UX", shortAr: "أنظمة تصميم وواجهات تبدو صحيحة وتعمل بكفاءة أعلى.", valueAr: "من الإطارات السلكية إلى مكتبة مكونات جاهزة للإنتاج — مصنوعة في Figma، مبنية للمطورين.",
    deliverablesAr: ["بحث استكشافي، تدفقات المستخدم، هندسة المعلومات", "نماذج Figma منخفضة وعالية الدقة", "نظام تصميم بالرموز والمكونات والتوثيق", "تدقيق إمكانية الوصول (معيار WCAG 2.1 AA كحد أدنى)", "تسليم مع مواصفات جاهزة للمطورين والأصول"],
    processAr: [{ step: "الاستكشاف", detail: "مقابلات أصحاب المصلحة، تدقيق تنافسي، الأهداف." }, { step: "التحديد", detail: "تدفقات المستخدم، هندسة المعلومات، استراتيجية المحتوى." }, { step: "التصميم", detail: "من الإطارات السلكية إلى التصاميم عالية الدقة والنماذج الأولية." }, { step: "التسليم", detail: "مكتبة مكونات، تسليم للمطورين، ضمان الجودة." }],
    faqsAr: [{ q: "هل تتولون تصميم الهوية التجارية أيضًا؟", a: "العلامة التجارية الرقمية، نعم — شعارات، أنظمة خطوط، مجموعات UI. الهوية الكاملة تُدرس حالة بحالة." }, { q: "هل سأحصل على نظام تصميم؟", a: "نعم — رموز ومكونات وتوثيق يمكن لفريقك توسيعه." }],
  },
  {
    slug: "seo-content", name: "SEO & Content", short: "Technical SEO and content that compounds month over month.", value: "Earn traffic that converts. Technical audits, content strategy, and link execution that move rankings.", iconName: "Search", order: 4,
    deliverables: ["Technical audit: crawl, index, schema, Core Web Vitals", "Keyword research + content roadmap (quarterly)", "On-page optimization across top revenue pages", "Internal linking architecture", "Monthly ranking, traffic, and conversion reports"],
    process: [{ step: "Audit", detail: "Crawl, benchmark, find the quick wins." }, { step: "Strategy", detail: "Keyword clusters mapped to funnel." }, { step: "Execute", detail: "Technical fixes, new content, link work." }, { step: "Measure", detail: "Monthly reports tied to revenue." }],
    tools: ["Ahrefs", "Search Console", "Screaming Frog", "Looker Studio"],
    faqs: [{ q: "How long until I see results?", a: "Technical wins land in weeks. Content and authority compound over 3-6 months." }, { q: "Do you write the content?", a: "Yes -- or we partner with your team. Either way, briefs are SEO-first." }],
    pairsWith: ["web-development", "paid-ads", "ui-ux-design"],
    nameAr: "SEO والمحتوى", shortAr: "سيو تقني ومحتوى يتراكم شهرًا بعد شهر.", valueAr: "اكسب حركة مرور تُحوَّل. تدقيقات تقنية، استراتيجية محتوى، وتنفيذ روابط تحرك التصنيفات.",
    deliverablesAr: ["تدقيق تقني: الزحف، الفهرسة، البيانات المنظمة، Core Web Vitals", "بحث كلمات مفتاحية + خارطة طريق محتوى (ربع سنوي)", "تحسين الصفحات على أعلى الصفحات المُدرَّة للإيرادات", "هيكل الروابط الداخلية", "تقارير شهرية للتصنيف والحركة والتحويل"],
    processAr: [{ step: "التدقيق", detail: "الزحف، قياس الأداء، إيجاد المكاسب السريعة." }, { step: "الاستراتيجية", detail: "مجموعات كلمات مفتاحية مرسمة على مسار التحويل." }, { step: "التنفيذ", detail: "إصلاحات تقنية، محتوى جديد، بناء روابط." }, { step: "القياس", detail: "تقارير شهرية مرتبطة بالإيرادات." }],
    faqsAr: [{ q: "متى أرى النتائج؟", a: "المكاسب التقنية تظهر خلال أسابيع. المحتوى والسلطة يتراكمان على مدى 3-6 أشهر." }, { q: "هل تكتبون المحتوى؟", a: "نعم — أو نتعاون مع فريقك. في كلتا الحالتين، الإحاطات تُعطي الأولوية للسيو." }],
  },
  {
    slug: "social-media", name: "Social Media", short: "On-brand, always-on social that builds trust and pipeline.", value: "Strategy, content calendar, and community -- executed weekly across the platforms that matter for you.", iconName: "Megaphone", order: 5,
    deliverables: ["Channel strategy tailored to audience and goals", "Weekly content calendar with creative briefs", "Post scheduling and publishing", "Community responses within 24 hours", "Monthly performance report"],
    process: [{ step: "Audit", detail: "Current channels, audience, competitors." }, { step: "Strategy", detail: "Pillars, tone, posting cadence." }, { step: "Produce", detail: "Content designed, written, scheduled." }, { step: "Grow", detail: "Engagement, iterate, scale what works." }],
    tools: ["Buffer", "Later", "Canva", "Figma", "Notion"],
    faqs: [{ q: "Which platforms do you cover?", a: "LinkedIn, Instagram, X, TikTok, YouTube Shorts, Threads." }, { q: "Do you produce video?", a: "Short-form, yes. Longer productions on request." }],
    pairsWith: ["seo-content", "paid-ads", "web-development"],
    nameAr: "السوشيال ميديا", shortAr: "تواجد اجتماعي متوافق مع علامتك، دائم الحضور، يبني الثقة والجمهور.", valueAr: "استراتيجية، تقويم محتوى، ومجتمع — تُنفَّذ أسبوعيًا عبر المنصات التي تهمك.",
    deliverablesAr: ["استراتيجية قنوات مُكيَّفة مع الجمهور والأهداف", "تقويم محتوى أسبوعي مع إحاطات إبداعية", "جدولة المنشورات ونشرها", "ردود على المجتمع خلال 24 ساعة", "تقرير أداء شهري"],
    processAr: [{ step: "التدقيق", detail: "القنوات الحالية، الجمهور، المنافسون." }, { step: "الاستراتيجية", detail: "المحاور، النبرة، إيقاع النشر." }, { step: "الإنتاج", detail: "محتوى مصمم ومكتوب ومجدول." }, { step: "النمو", detail: "التفاعل، التكرار، تكثيف ما يناسب." }],
    faqsAr: [{ q: "ما المنصات التي تغطونها؟", a: "LinkedIn، Instagram، X، TikTok، YouTube Shorts، Threads." }, { q: "هل تنتجون محتوى فيديو؟", a: "الفيديو القصير، نعم. الإنتاجات الأطول عند الطلب." }],
  },
  {
    slug: "paid-ads", name: "Paid Ads", short: "Meta, Google, LinkedIn, and TikTok ads managed for ROAS.", value: "Creative, campaign structure, and budget discipline -- tuned weekly against the metric that matters.", iconName: "Activity", order: 6,
    deliverables: ["Channel strategy: Meta, Google, LinkedIn, TikTok, YouTube", "Creative production and testing framework", "Landing pages aligned to ad intent", "Weekly budget pacing and optimization", "Monthly ROAS report with next-cycle plan"],
    process: [{ step: "Plan", detail: "Targets, channels, budgets, creative angles." }, { step: "Launch", detail: "Campaign builds, pixels, conversions wired." }, { step: "Optimize", detail: "Weekly review, reallocate, kill underperformers." }, { step: "Scale", detail: "Double down on winners, test new angles." }],
    tools: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok Ads", "Triple Whale"],
    faqs: [{ q: "What is the minimum ad spend?", a: "We recommend $5k/month media to see signal -- lower is possible case-by-case." }, { q: "Do you produce ad creative?", a: "Yes -- static, motion, and short-form video briefed against performance hypotheses." }],
    pairsWith: ["seo-content", "social-media", "web-development"],
    nameAr: "الإعلانات المدفوعة", shortAr: "إعلانات Meta وGoogle وLinkedIn وTikTok مُدارة لتحقيق ROAS.", valueAr: "إبداع، هيكل حملات، وانضباط ميزانية — مُضبَط أسبوعيًا وفق المقياس الذي يهم.",
    deliverablesAr: ["استراتيجية قنوات: Meta، Google، LinkedIn، TikTok، YouTube", "إنتاج إبداعي وإطار اختبار", "صفحات هبوط متوافقة مع نية الإعلان", "ضبط الميزانية وتحسينها أسبوعيًا", "تقرير ROAS شهري مع خطة الدورة التالية"],
    processAr: [{ step: "التخطيط", detail: "الأهداف، القنوات، الميزانيات، الزوايا الإبداعية." }, { step: "الإطلاق", detail: "بناء الحملات، البكسل، التحويلات مُوصَّلة." }, { step: "التحسين", detail: "مراجعة أسبوعية، إعادة التوزيع، إيقاف ضعاف الأداء." }, { step: "التوسع", detail: "مضاعفة الفائزين، اختبار زوايا جديدة." }],
    faqsAr: [{ q: "ما الحد الأدنى للإنفاق على الإعلانات؟", a: "نوصي بـ 5000 دولار شهريًا على الوسائط لرؤية إشارة — أقل منه ممكن حالة بحالة." }, { q: "هل تنتجون إبداعات الإعلانات؟", a: "نعم — ثابتة، متحركة، وفيديو قصير مُحدَّد وفق فرضيات الأداء." }],
  },
  {
    slug: "ai-assistants", name: "AI Assistants", short: "Custom AI agents and chatbots trained on your business.", value: "Automate first-line support, lead qualification, and internal workflows with AI built for your stack.", iconName: "Bot", order: 7,
    deliverables: ["Custom chatbot or agent trained on your products and FAQs", "Integration with your CRM, helpdesk, or CMS", "Lead qualification and routing flows", "Handover protocol to human agents", "Analytics dashboard for conversation quality"],
    process: [{ step: "Scope", detail: "Define use cases, data sources, and success metrics." }, { step: "Build", detail: "Train, prompt-engineer, and integrate the agent." }, { step: "Test", detail: "Red-team edge cases, QA accuracy and tone." }, { step: "Deploy", detail: "Launch, monitor, iterate on conversation data." }],
    tools: ["OpenAI", "Anthropic", "LangChain", "Pinecone", "n8n", "Zapier"],
    faqs: [{ q: "Do I need existing content to train the AI?", a: "Your FAQs, product docs, and past support tickets are enough to start. We structure them." }, { q: "Can it hand off to a human?", a: "Yes -- configurable escalation to email, Intercom, or your helpdesk of choice." }],
    pairsWith: ["web-development", "mobile-apps", "seo-content"],
    nameAr: "مساعدو الذكاء الاصطناعي", shortAr: "وكلاء AI وبوتات مخصصة مُدرَّبة على عملك.", valueAr: "أتمتة الدعم الأولي وتأهيل العملاء المحتملين وسير العمل الداخلي بذكاء اصطناعي مبني لمنظومتك.",
    deliverablesAr: ["بوت دردشة أو وكيل مُدرَّب على منتجاتك وأسئلتك الشائعة", "تكامل مع CRM أو مكتب المساعدة أو CMS", "مسارات تأهيل وتوجيه العملاء المحتملين", "بروتوكول تسليم إلى وكلاء بشريين", "لوحة تحليلات لجودة المحادثات"],
    processAr: [{ step: "التحديد", detail: "تحديد حالات الاستخدام ومصادر البيانات ومقاييس النجاح." }, { step: "البناء", detail: "التدريب وهندسة التوجيهات والتكامل." }, { step: "الاختبار", detail: "اختبار الحالات الحدّية وضمان دقة النبرة." }, { step: "الإطلاق", detail: "الإطلاق والمراقبة والتحسين من بيانات المحادثة." }],
    faqsAr: [{ q: "هل أحتاج محتوى موجودًا لتدريب الذكاء الاصطناعي؟", a: "أسئلتك الشائعة ووثائق المنتج وتذاكر الدعم السابقة كافية للبدء. نحن نُنظّمها." }, { q: "هل يمكنه التحويل إلى وكيل بشري؟", a: "نعم — تصعيد قابل للإعداد عبر البريد الإلكتروني أو Intercom أو مكتب المساعدة الذي تختاره." }],
  },
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
