/**
 * Safely sync the initial hardcoded content into MongoDB.
 * Existing records with matching slugs are updated; unrelated records are preserved.
 * Run: npx tsx scripts/seed.ts
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
    title: "Why focused senior teams can deliver more effectively",
    excerpt: "Clear ownership, direct communication, and experienced decision-making can help a focused team move complex work forward.",
    category: "Growth",
    author: "Mohammed",
    date: "2026-04-10",
    readingTime: "2 min",
    published: true,
    body: [
      "Team size matters less than clarity. Larger teams can add valuable capacity, but each additional handoff also creates more coordination. When ownership is fragmented, decisions slow down and important context can be lost between roles.",
      "A focused senior team shortens the path between a question and a decision. The people responsible for strategy, design, and engineering remain close to the work, making it easier to discuss trade-offs, resolve risks, and maintain a shared view of the outcome.",
      "Experience is most useful when it improves judgment rather than simply adding senior titles. Strong specialists know when to investigate further, when a simpler solution is sufficient, and how to explain the long-term implications of a technical or commercial choice.",
      "TechParadice combines a founder-led core team with trusted specialists selected for the needs of each engagement. The objective is a capable team with clear accountability, direct access, and enough breadth to deliver the work well.",
    ],
  },
  {
    slug: "web-vitals-that-actually-matter",
    title: "What Core Web Vitals reveal about customer experience",
    excerpt: "Learn what LCP, CLS, and INP measure, where the data has limits, and how to prioritise improvements that users can feel.",
    category: "Engineering",
    author: "Mohammed",
    date: "2026-03-22",
    readingTime: "2 min",
    published: true,
    body: [
      "Core Web Vitals provide a common way to assess loading performance, visual stability, and interaction responsiveness. They are useful indicators of experience, but they should be read alongside analytics, user feedback, and the commercial importance of each journey.",
      "Largest Contentful Paint (LCP) measures when the main visible content finishes rendering. Cumulative Layout Shift (CLS) captures unexpected movement that can interrupt reading or cause a user to select the wrong control. Interaction to Next Paint (INP) measures how promptly a page responds throughout a visit.",
      "Field data reflects real visits, while laboratory tests help reproduce and diagnose specific problems. Supporting measurements such as Time to First Byte (TTFB) and First Contentful Paint (FCP) can point to likely causes, but no single score explains the entire experience.",
      "Start with the pages and tasks that matter most to customers. Use real-user data where available, confirm the issue on representative devices and connections, and prioritise changes that improve both usability and business outcomes.",
    ],
  },
  {
    slug: "the-slash-as-a-brand-device",
    title: "How the TechParadice slash works as a brand device",
    excerpt: "A simple, repeatable visual cue can make a brand more recognizable across pages, messages, and formats.",
    category: "Design",
    author: "Mohammed",
    date: "2026-02-18",
    readingTime: "2 min",
    published: true,
    body: [
      "A useful brand device carries recognition without requiring the full logo in every placement. For TechParadice, the slash provides that compact visual signature.",
      "Within the wordmark, the slash creates a clear transition between the precise, technical character of “Tech” and the more open, expressive character of “Paradice.” That contrast gives the identity a rhythm that can extend beyond the logo itself.",
      "The same mark can separate metadata, introduce a section, frame a quotation, or add structure to a layout. Repeating it with restraint helps different touchpoints feel connected without turning every surface into an advertisement for the brand.",
      "The broader design principle is consistency: choose a distinctive element, define how it should be used, and apply it often enough to become familiar. A brand device earns recognition through coherent use over time.",
    ],
  },
  {
    slug: "local-seo-for-gcc-businesses",
    title: "A practical local SEO framework for businesses in the GCC",
    excerpt: "Strengthen local discovery with accurate business details, useful location pages, genuine reviews, and a well-maintained Google Business Profile.",
    category: "Growth",
    author: "Mohammed",
    date: "2026-05-12",
    readingTime: "2 min",
    published: true,
    body: [
      "Google Search and Google Maps are often part of the journey when customers compare nearby providers. A complete Google Business Profile and a useful website should present the same clear information and guide people toward the next step.",
      "Local results consider relevance, distance, and prominence. Accurate categories and specific service descriptions help search platforms understand the business, while genuine reviews, reputable mentions, and consistent information contribute to trust and visibility.",
      "Keep the business name, address, phone number, opening hours, and location details consistent across the website, Google Business Profile, and relevant directories. Update every source when something changes so customers do not encounter conflicting information.",
      "Build a review process that invites real customers to share honest feedback without incentives or pressure. Respond professionally, avoid formulaic replies, and treat recurring praise or complaints as useful input for the business.",
      "Where customers search in both Arabic and English, publish useful information in both languages. Localize services, location details, metadata, and calls to action for the intended audience instead of relying on word-for-word translation.",
    ],
  },
  {
    slug: "bilingual-websites-gcc",
    title: "How to build an effective bilingual website for GCC markets",
    excerpt: "Plan Arabic and English experiences across content, RTL design, URLs, metadata, and hreflang—not translation alone.",
    category: "Engineering",
    author: "Mohammed",
    date: "2026-05-28",
    readingTime: "2 min",
    published: true,
    body: [
      "Businesses serving GCC audiences may need to communicate in both Arabic and English. Supporting both languages well can make information easier to understand, strengthen trust, and help each audience find the most relevant version of a page.",
      "A bilingual website is more than a set of translated paragraphs. It needs dependable language switching, RTL-aware layouts, distinct URLs, localized navigation and metadata, and correctly implemented hreflang annotations.",
      "Arabic copy should be written for the intended audience rather than mirrored word for word from English. Search terms, tone, sentence structure, and calls to action can differ, while technical terms may be clearer when retained in English.",
      "If complete translation is not practical at launch, prioritise core service pages, contact and conversion journeys, and the content customers use most. Clearly manage what is available in each language, then expand through an editorial plan.",
      "TechParadice plans multilingual architecture early in relevant projects so content models, interface components, and SEO foundations can support Arabic and English without creating two disconnected websites.",
    ],
  },
  {
    slug: "ai-assistants-for-smb",
    title: "AI assistants for small businesses: a practical starting point",
    excerpt: "Begin with a bounded problem, approved information, measurable expectations, and a clear route to human support.",
    category: "Engineering",
    author: "Mohammed",
    date: "2026-06-05",
    readingTime: "2 min",
    published: true,
    body: [
      "Small businesses do not need a broad, enterprise-scale AI programme to test whether an assistant is useful. A better starting point is a recurring problem with clear inputs, an accountable owner, and an outcome the team can observe.",
      "First separate conventional automation from AI. A form connected to a CRM, followed by a timely WhatsApp notification, may solve the problem without a language model. Simpler workflows are often easier to verify, maintain, and explain.",
      "A customer-facing AI assistant may help answer common questions when it relies on approved knowledge, states its limitations, handles personal information appropriately, and offers a clear route to a person. High-risk or sensitive decisions should remain under suitable human control.",
      "Appointment journeys may also benefit from availability checks, confirmations, reminders, and rescheduling. Add AI only when it contributes something useful beyond deterministic rules and standard integrations.",
      "Pilot one bounded use case, define what a successful and unsuccessful response looks like, and monitor accuracy, escalation, and user feedback. Expand only when the first workflow is dependable and the people responsible for it are comfortable operating it.",
    ],
  },
  {
    slug: "how-to-pick-a-digital-agency-in-dubai",
    title: "How to choose a digital agency in Dubai",
    excerpt: "Ask these five questions to compare relevant experience, team structure, delivery, measurement, and risk management.",
    category: "Growth",
    author: "Mohammed",
    date: "2026-06-19",
    readingTime: "2 min",
    published: true,
    body: [
      "Dubai has a wide range of digital agencies and specialist partners, so a structured comparison is more useful than relying on presentation style alone. Clear evidence, responsibilities, and working methods reveal more than broad promises of transformation.",
      "Question one: Can you show relevant work and explain your contribution? Ask for live examples where possible while respecting legitimate confidentiality. Focus on the original problem, the work the agency actually owned, and the evidence available after launch.",
      "Question two: Who will work on the engagement? Understand the experience and responsibilities of the day-to-day team, who has decision authority, and whether important parts of the work will be delivered by external partners.",
      "Question three: What will happen during the first month? A prepared partner should be able to explain discovery, access requirements, decision points, communication, expected deliverables, and how risks or delays will be raised.",
      "Question four: How will success be measured? Useful measures depend on the engagement and may include qualified leads, conversion, adoption, retention, performance, operational efficiency, or customer satisfaction—not visibility metrics in isolation.",
      "Question five: How do you manage uncertainty? Look for explicit assumptions, documented dependencies, sensible change control, quality assurance, and a willingness to adjust the plan when evidence challenges the original approach.",
    ],
  },
  {
    slug: "mobile-first-design-mena",
    title: "A mobile-first design framework for audiences in MENA",
    excerpt: "Prioritise essential journeys on smaller screens, then validate content, navigation, forms, performance, and RTL behaviour on real devices.",
    category: "Design",
    author: "Mohammed",
    date: "2026-06-30",
    readingTime: "2 min",
    published: true,
    body: [
      "Mobile devices are an important part of how many people in MENA discover services, compare options, communicate, and complete transactions. A layout that simply shrinks to fit a phone does not necessarily provide a good mobile experience.",
      "Mobile-first design begins with the most important customer journeys on a smaller screen. Navigation, calls to action, forms, content hierarchy, and performance are resolved before the interface expands to larger displays.",
      "Test across representative screen sizes and real devices instead of relying on a single design width. Check touch targets, keyboard behaviour, validation, loading and error states, and the effect of longer labels in both Arabic and English.",
      "For bilingual products, validate LTR and RTL experiences independently. Direction changes can affect icons, navigation, carousels, form alignment, numbers, and lines that combine Arabic with English technical terms.",
      "Limited space also encourages better editorial choices. Present the information people need to decide or act, keep the next step easy to find, and place supporting detail where it remains available without obscuring the primary journey.",
    ],
  },
]

const portfolio = [
  {
    slug: "northwind-commerce",
    client: "Northwind",
    title: "Headless commerce rebuild for a wholesale distributor",
    industry: "B2B e-commerce",
    services: ["Website Development", "UI/UX Design", "Analytics & Reporting"],
    timeline: "12 weeks",
    year: "2025",
    outcome: "38% increase in checkout conversion",
    // Draft only: no source evidence for this client or its performance figures is stored in this repository.
    published: false,
    challenge: "Northwind managed its B2B catalogue through a legacy monolithic platform. Average page loads were measured at 6.4 seconds, mobile conversion was below 1%, and routine sales updates required developer support.",
    approach: [
      "Audited the existing platform and assessed priority templates against performance and conversion data.",
      "Designed a reusable component library in Figma that extended the existing brand system.",
      "Rebuilt the storefront with Next.js 14 and connected Sanity CMS so the sales team could manage approved content directly.",
    ],
    solution: [
      "Next.js App Router and server components for efficient page rendering and navigation.",
      "Edge delivery and Incremental Static Regeneration (ISR) for product and category pages.",
      "Structured data, XML sitemaps, and validated GA4 conversion events across the purchase journey.",
    ],
    results: [
      { value: "+38%", label: "increase in checkout conversion" },
      { value: "1.4s", label: "median LCP" },
      { value: "2.1x", label: "organic traffic after 90 days" },
    ],
  },
  {
    slug: "orbit-fintech-app",
    client: "Orbit",
    title: "Mobile banking app launch for a neobank",
    industry: "Fintech",
    services: ["Mobile App Development", "UI/UX Design", "Analytics & Reporting"],
    timeline: "16 weeks",
    year: "2025",
    outcome: "4.8 average App Store rating",
    // Draft only: no source evidence for this client or its performance figures is stored in this repository.
    published: false,
    challenge: "Orbit had an established web product but no dedicated mobile app. Its SMB customers opened accounts on desktop, while transfer journeys on mobile showed high abandonment.",
    approach: [
      "Completed a two-week discovery phase with the product and compliance teams.",
      "Created three Figma concepts and tested the prototypes with representative customers.",
      "Built the app with React Native and native modules for biometric authentication.",
    ],
    solution: [
      "A shared React Native codebase for iOS and Android.",
      "Biometric authentication and two-step verification within onboarding.",
      "An offline-aware transaction queue with server-side reconciliation.",
    ],
    results: [
      { value: "4.8", label: "average App Store rating" },
      { value: "21k", label: "installs during the first 30 days" },
      { value: "54%", label: "share of transfers completed on mobile" },
    ],
  },
  {
    slug: "acacia-growth",
    client: "Acacia",
    title: "Integrated SEO and paid media relaunch for a skincare brand",
    industry: "DTC beauty",
    services: ["SEO & Content", "Paid Advertising", "Content Creation"],
    timeline: "6 months",
    year: "2024",
    outcome: "3.2x ROAS",
    // Draft only: no source evidence for this client or its performance figures is stored in this repository.
    published: false,
    challenge: "Acacia's initial growth had leveled off. Paid acquisition efficiency had declined, organic visibility was static, and the content plan was not clearly connected to commercial priorities.",
    approach: [
      "Reorganized the keyword strategy around commercially important pages and relevant customer needs.",
      "Introduced a creative testing framework covering six distinct hypotheses each week.",
      "Combined paid, organic, and email performance in one reporting view.",
    ],
    solution: [
      "A technical SEO audit followed by prioritised fixes and structured data implementation.",
      "120 short-form creative assets produced for Meta and TikTok.",
      "Weekly budget reviews guided by an agreed blended ROAS target.",
    ],
    results: [
      { value: "3.2x", label: "blended ROAS" },
      { value: "+112%", label: "increase in organic sessions" },
      { value: "-28%", label: "reduction in CAC" },
    ],
  },
  {
    slug: "draglab-germany",
    client: "DragLab Germany",
    title: "Multilingual B2B platform for a laboratory equipment manufacturer",
    industry: "B2B laboratory equipment",
    services: ["Website Development", "UI/UX Design", "SEO & Content", "Analytics & Reporting"],
    timeline: "Not publicly disclosed",
    year: "Not publicly disclosed",
    outcome: "Content administration across 5 languages",
    published: true,
    challenge: "DragLab required a global digital platform that combined a multilingual product catalogue, structured customer-submission workflows, content publishing, and an administrative interface suitable for non-technical staff.",
    approach: [
      "Organised products, models, articles, case studies, FAQs, and glossary entries within a unified multilingual content architecture.",
      "Designed an administrative CMS that enabled authorized users to publish content, update records, and manage inquiries without editing code.",
      "Created 6 public submission flows, with status-based handling where applicable, PDF generation for quote and distributor forms, and automated confirmation and internal notification emails.",
      "Protected public forms with a nonce-based Content Security Policy (CSP), CSRF tokens, and Google reCAPTCHA Enterprise.",
    ],
    solution: [
      "A Node.js and Express MVC platform with EJS server-side rendering to support performance and SEO requirements.",
      "18 Mongoose models covering products, nested model variants, accessories, 6 submission types, articles, case studies, FAQs, a glossary, testimonials, and industry landing pages.",
      "A 5-language publishing system (EN, DE, ES, TR, FR) with language-specific publishing controls and hreflang annotations across relevant routes.",
      "An image workflow using Cloudinary CDN and Sharp, PDF generation with pdf-lib and pdfkit, and subscriber exports to Excel through ExcelJS.",
      "A weighted MongoDB full-text search index covering product names, descriptions, and keyword tags in all 5 supported languages.",
    ],
    results: [
      { value: "5", label: "supported languages" },
      { value: "18", label: "data models" },
      { value: "6", label: "customer-facing submission workflows" },
    ],
    titleAr: "منصة B2B متعددة اللغات لشركة مصنّعة لمعدات المختبرات",
    outcomeAr: "إدارة المحتوى عبر 5 لغات",
    challengeAr: "احتاجت DragLab إلى منصة رقمية عالمية تجمع بين دليل منتجات متعدد اللغات ومسارات منظّمة لاستقبال نماذج العملاء ونظام لنشر المحتوى ولوحة إدارة مناسبة للموظفين غير التقنيين.",
    approachAr: [
      "نظّمنا المنتجات والطرازات والمقالات ودراسات الحالة والأسئلة الشائعة ومعجم المصطلحات ضمن بنية محتوى موحّدة ومتعددة اللغات.",
      "صممنا لوحة إدارة CMS تتيح للمستخدمين المخوّلين نشر المحتوى وتحديث السجلات وإدارة الطلبات دون تعديل الكود.",
      "أنشأنا 6 مسارات عامة لاستقبال النماذج، مع إدارة الحالات عند الحاجة، وتوليد ملفات PDF لطلبات عروض الأسعار وطلبات الموزعين، وإرسال رسائل تأكيد وتنبيهات داخلية تلقائياً.",
      "حمينا النماذج العامة بسياسة CSP تعتمد على nonce، إلى جانب رموز CSRF وGoogle reCAPTCHA Enterprise.",
    ],
    solutionAr: [
      "منصة مبنية بـ Node.js وExpress وفق نمط MVC، مع التصيير من جانب الخادم عبر EJS لدعم متطلبات الأداء وSEO.",
      "18 نموذج بيانات في Mongoose تشمل المنتجات وطرازاتها الفرعية والملحقات و6 أنواع من النماذج، إضافة إلى المقالات ودراسات الحالة والأسئلة الشائعة ومعجم المصطلحات وشهادات العملاء وصفحات القطاعات.",
      "نظام نشر يدعم 5 لغات (EN, DE, ES, TR, FR)، مع التحكم في حالة النشر لكل لغة وإضافة hreflang إلى المسارات المعنية.",
      "معالجة الصور عبر Cloudinary CDN وSharp، وتوليد ملفات PDF باستخدام pdf-lib وpdfkit، وتصدير بيانات المشتركين إلى Excel عبر ExcelJS.",
      "فهرس MongoDB مرجّح للبحث النصي يشمل أسماء المنتجات وأوصافها وكلماتها المفتاحية باللغات الخمس المدعومة.",
    ],
    resultsAr: [
      { value: "5", label: "لغات مدعومة" },
      { value: "18", label: "نموذج بيانات" },
      { value: "6", label: "مسارات للنماذج الموجّهة للعملاء" },
    ],
    publishedAr: true,
  },
]

const services = [
  {
    slug: "web-development", name: "Website Development", short: "Fast, accessible websites designed to help customers understand, trust, and act.", value: "Marketing websites and web applications built around your goals, with maintainable content, strong performance, SEO, and accessibility in mind.", iconName: "Code2", order: 1,
    deliverables: ["Next.js App Router implementation with TypeScript", "A CMS such as Sanity, Payload, or MDX configured for your publishing workflow", "Responsive implementation from approved Figma designs", "Quality assurance covering accessibility, browser compatibility, and Core Web Vitals", "Vercel deployment, preview environments, and analytics handover"],
    process: [{ step: "Discover", detail: "Clarify requirements, review the current technology, and agree on success measures." }, { step: "Design", detail: "Define the information structure, key journeys, components, and prototypes." }, { step: "Build", detail: "Develop in reviewable stages, with testing and quality assurance throughout." }, { step: "Launch", detail: "Prepare DNS, analytics, redirects, performance checks, and the production release." }],
    tools: ["Next.js", "TypeScript", "Tailwind", "Vercel", "Sanity", "Prisma"],
    faqs: [{ q: "How long does a website project take?", a: "Timing depends on the number of templates, content readiness, integrations, and the approval process. We confirm a realistic schedule after discovery and identify any dependencies before development begins." }, { q: "Do you work with existing codebases?", a: "Yes. We can assess and improve an existing codebase or recommend a rebuild when that offers clearer long-term value." }],
    pairsWith: ["ui-ux-design", "seo", "mobile-app-development"],
    nameAr: "تطوير المواقع الإلكترونية", shortAr: "مواقع سريعة وسهلة الوصول تساعد العملاء على فهم خدماتك والثقة بعملك واتخاذ الخطوة التالية.", valueAr: "نطوّر مواقع تسويقية وتطبيقات ويب تخدم أهدافك، مع محتوى سهل الإدارة وأداء قوي واهتمام بـ SEO وإمكانية الوصول.",
    deliverablesAr: ["تطوير باستخدام Next.js App Router وTypeScript", "إعداد CMS مثل Sanity أو Payload أو MDX بما يتوافق مع آلية النشر لديك", "تنفيذ متجاوب انطلاقاً من تصاميم Figma المعتمدة", "اختبار إمكانية الوصول والتوافق بين المتصفحات وCore Web Vitals", "النشر على Vercel مع بيئات للمعاينة وتسليم إعدادات التحليلات"],
    processAr: [{ step: "الاستكشاف", detail: "توضيح المتطلبات ومراجعة التقنية الحالية والاتفاق على مؤشرات النجاح." }, { step: "التصميم", detail: "تحديد بنية المعلومات والمسارات الأساسية والمكونات والنماذج التفاعلية." }, { step: "التطوير", detail: "تنفيذ المشروع على مراحل قابلة للمراجعة، مع الاختبار وضمان الجودة طوال العمل." }, { step: "الإطلاق", detail: "تجهيز DNS والتحليلات وعمليات إعادة التوجيه وفحوص الأداء والإصدار النهائي." }],
    faqsAr: [{ q: "كم يستغرق تنفيذ مشروع الموقع؟", a: "تعتمد المدة على عدد القوالب وجاهزية المحتوى والتكاملات وآلية الاعتماد. نحدد جدولاً واقعياً بعد مرحلة الاستكشاف، مع توضيح المتطلبات التي قد تؤثر في الموعد." }, { q: "هل تعملون على مشاريع برمجية قائمة؟", a: "نعم. يمكننا تقييم المشروع القائم وتطويره، أو اقتراح إعادة البناء عندما تكون أكثر جدوى على المدى الطويل." }],
  },
  {
    slug: "mobile-app-development", name: "Mobile App Development", short: "Reliable iOS and Android apps designed around real user journeys.", value: "We build cross-platform apps with React Native and use Swift or Kotlin when native capabilities offer a clear product or performance advantage.", iconName: "Smartphone", order: 2,
    deliverables: ["A shared React Native codebase for iOS and Android when appropriate", "Native modules in Swift or Kotlin where product requirements call for them", "App Store and Play Store release preparation and submission support", "Push notifications, analytics, and crash reporting", "A testing, release, and post-launch update plan"],
    process: [{ step: "Discover", detail: "Define user journeys, device requirements, integrations, risks, and MVP scope." }, { step: "Design", detail: "Create accessible mobile patterns and validate interactive prototypes on representative devices." }, { step: "Build", detail: "Develop in testable releases shared through TestFlight or the appropriate internal track." }, { step: "Launch", detail: "Prepare store submissions, plan the rollout, monitor stability, and prioritise follow-up improvements." }],
    tools: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Sentry"],
    faqs: [{ q: "React Native or fully native development?", a: "We choose the approach based on the product, performance, device features, and integration requirements. React Native is often efficient, while native development is appropriate when it offers a meaningful advantage." }, { q: "Do you support App Store submissions?", a: "Yes. We prepare the required build and listing materials, support the review process, and address technical feedback. Final approval remains with Apple and Google." }],
    pairsWith: ["ui-ux-design", "web-development", "analytics-reporting"],
    nameAr: "تطوير تطبيقات الجوال", shortAr: "تطبيقات موثوقة على iOS وAndroid مصممة حول مسارات استخدام حقيقية.", valueAr: "نطوّر تطبيقات متعددة المنصات باستخدام React Native، ونلجأ إلى Swift أو Kotlin عندما توفر التقنية Native ميزة واضحة للمنتج أو الأداء.",
    deliverablesAr: ["قاعدة كود مشتركة باستخدام React Native لنظامي iOS وAndroid عندما يكون ذلك مناسباً", "وحدات Native باستخدام Swift أو Kotlin وفق متطلبات المنتج", "تجهيز الإصدار ودعم تقديمه إلى App Store وPlay Store", "إشعارات فورية وإعداد التحليلات وتقارير الأعطال", "خطة للاختبار والإصدار والتحديثات بعد الإطلاق"],
    processAr: [{ step: "الاستكشاف", detail: "تحديد مسارات المستخدم ومتطلبات الأجهزة والتكاملات والمخاطر ونطاق MVP." }, { step: "التصميم", detail: "تصميم أنماط متوافقة مع الجوال واختبار النماذج التفاعلية على أجهزة ممثلة للاستخدام." }, { step: "التطوير", detail: "تنفيذ التطبيق على إصدارات قابلة للاختبار عبر TestFlight أو مسار الاختبار الداخلي المناسب." }, { step: "الإطلاق", detail: "تجهيز ملفات المتاجر وخطة طرح الإصدار ومراقبة الاستقرار وتحديد التحسينات اللاحقة." }],
    faqsAr: [{ q: "React Native أم تطوير Native بالكامل؟", a: "نختار التقنية وفق متطلبات المنتج والأداء وخصائص الجهاز والتكاملات. يكون React Native فعالاً في حالات كثيرة، بينما نستخدم التطوير Native عندما يحقق فائدة ملموسة." }, { q: "هل تدعمون تقديم التطبيق إلى المتاجر؟", a: "نعم. نجهز الإصدار ومواد صفحة المتجر، وندعم مرحلة المراجعة، ونعالج الملاحظات التقنية. ويبقى قرار الاعتماد النهائي لدى Apple وGoogle." }],
  },
  {
    slug: "ui-ux-design", name: "Custom UI/UX Design", short: "Clear, accessible interfaces and design systems shaped around real user needs.", value: "We turn product goals into considered journeys, interactive prototypes, and reusable Figma components that development teams can implement with confidence.", iconName: "Palette", order: 3,
    deliverables: ["Discovery research, user journeys, and information architecture", "Low- and high-fidelity wireframes and Figma prototypes", "A design system with tokens, reusable components, and usage guidance", "An accessibility review against the agreed WCAG AA criteria", "Developer handover with specifications, assets, and design QA"],
    process: [{ step: "Discover", detail: "Understand stakeholders, users, existing evidence, constraints, and product goals." }, { step: "Define", detail: "Set the information architecture, priority journeys, content needs, and design principles." }, { step: "Design", detail: "Progress from wireframes to detailed interfaces and testable prototypes." }, { step: "Deliver", detail: "Document the component library, support implementation, and review the built experience." }],
    tools: ["Figma", "Framer", "Principle", "Maze", "Lottie"],
    faqs: [{ q: "Do you also provide brand design?", a: "We can design selected digital identity elements, including logo refinements, typography, colour systems, and UI libraries. A complete brand identity is scoped separately based on the brief." }, { q: "Will I receive a design system?", a: "When the product requires one, we provide reusable foundations, components, states, and documentation sized to the project rather than an unnecessary library." }],
    pairsWith: ["web-development", "mobile-app-development", "content-creation"],
    nameAr: "تصميم UI/UX مخصص", shortAr: "واجهات واضحة وسهلة الوصول، وأنظمة تصميم مبنية حول احتياجات المستخدمين الفعلية.", valueAr: "نحوّل أهداف المنتج إلى مسارات استخدام مدروسة ونماذج تفاعلية ومكونات قابلة لإعادة الاستخدام في Figma، بحيث يستطيع فريق التطوير تنفيذها بثقة.",
    deliverablesAr: ["بحث استكشافي ومسارات للمستخدم وهندسة للمعلومات", "مخططات أولية ونماذج Figma منخفضة وعالية الدقة", "نظام تصميم يشمل Design Tokens ومكونات قابلة لإعادة الاستخدام وإرشادات للتطبيق", "مراجعة إمكانية الوصول وفق معايير WCAG AA المتفق عليها", "تسليم لفريق التطوير يشمل المواصفات والمواد المطلوبة ومراجعة QA للتصميم"],
    processAr: [{ step: "الاستكشاف", detail: "فهم أصحاب المصلحة والمستخدمين والبيانات المتاحة والقيود وأهداف المنتج." }, { step: "التحديد", detail: "وضع هندسة المعلومات والمسارات ذات الأولوية واحتياجات المحتوى ومبادئ التصميم." }, { step: "التصميم", detail: "الانتقال من المخططات الأولية إلى واجهات تفصيلية ونماذج تفاعلية قابلة للاختبار." }, { step: "التسليم", detail: "توثيق مكتبة المكونات ودعم التنفيذ ومراجعة التجربة بعد تطويرها." }],
    faqsAr: [{ q: "هل تقدمون خدمات تصميم الهوية أيضاً؟", a: "يمكننا تصميم عناصر محددة للهوية الرقمية، مثل تطوير الشعار والخطوط والألوان ومكتبات UI. أما الهوية البصرية المتكاملة فنحدد نطاقها بشكل مستقل وفق متطلبات المشروع." }, { q: "هل سأحصل على نظام تصميم؟", a: "عندما يحتاج المنتج إلى ذلك، نسلّم أسساً ومكونات وحالات استخدام موثقة وقابلة لإعادة الاستخدام، بحجم يناسب المشروع دون إضافة مكتبة غير ضرورية." }],
  },
  {
    slug: "seo", name: "Search Engine Optimization", short: "Technical SEO that improves how search engines discover, understand, and present your website.", value: "We combine technical auditing, search-intent research, on-page optimisation, and practical reporting to strengthen organic visibility over time.", iconName: "Search", order: 4,
    deliverables: ["A technical SEO audit covering crawling, indexing, structured data, and Core Web Vitals", "Keyword and search-intent research with a prioritised action plan", "On-page recommendations and implementation for agreed priority pages", "Internal-linking, structured-data, and content-gap recommendations", "Reporting on visibility, qualified organic traffic, and agreed conversion measures"],
    process: [{ step: "Audit", detail: "Review crawling, indexing, site performance, page structure, content signals, and the relevant search landscape." }, { step: "Plan", detail: "Prioritise technical and on-page opportunities according to customer needs, effort, and commercial relevance." }, { step: "Implement", detail: "Apply the agreed improvements and coordinate any development or content dependencies." }, { step: "Measure", detail: "Track visibility, qualified traffic, and agreed conversions, then refine the next priorities from the evidence." }],
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog", "Looker Studio"],
    faqs: [{ q: "How long does SEO take to show progress?", a: "There is no universal timeline. Site condition, competition, content, authority, and implementation pace all affect progress. We establish a baseline and report movement against agreed measures without guaranteeing rankings." }, { q: "Can you implement the SEO recommendations?", a: "Yes. We can handle agreed technical and on-page changes directly, or work with your development and content teams through prioritised tickets and clear acceptance criteria." }],
    pairsWith: ["web-development", "content-creation", "analytics-reporting"],
    nameAr: "SEO", shortAr: "SEO تقني يساعد محركات البحث على اكتشاف موقعك وفهمه وعرضه بصورة أفضل.", valueAr: "نجمع بين التدقيق التقني وبحث نية المستخدم وتحسين الصفحات وتقارير عملية لدعم الظهور العضوي على المدى الطويل.",
    deliverablesAr: ["تدقيق تقني لـ SEO يشمل الزحف والفهرسة والبيانات المنظمة وCore Web Vitals", "بحث الكلمات المفتاحية ونية البحث مع خطة عمل مرتبة حسب الأولوية", "توصيات للصفحات ذات الأولوية وتنفيذ التحسينات المتفق عليها", "توصيات للروابط الداخلية والبيانات المنظمة وفجوات المحتوى", "تقارير عن الظهور والزيارات العضوية المؤهلة ومؤشرات التحويل المتفق عليها"],
    processAr: [{ step: "التدقيق", detail: "مراجعة الزحف والفهرسة وأداء الموقع وبنية الصفحات وإشارات المحتوى ومشهد البحث ذي الصلة." }, { step: "التخطيط", detail: "ترتيب الفرص التقنية وفرص تحسين الصفحات وفق احتياجات العملاء والجهد والأهمية التجارية." }, { step: "التنفيذ", detail: "تطبيق التحسينات المتفق عليها وتنسيق أي متطلبات مرتبطة بالتطوير أو المحتوى." }, { step: "القياس", detail: "متابعة الظهور والزيارات المؤهلة والتحويلات المتفق عليها، ثم تحديث الأولويات بناءً على البيانات." }],
    faqsAr: [{ q: "كم يحتاج SEO حتى يظهر تقدماً؟", a: "لا توجد مدة واحدة تنطبق على جميع المواقع. تؤثر حالة الموقع والمنافسة والمحتوى والسمعة وسرعة التنفيذ في التقدم. نحدد خط أساس ونقيس الحركة وفق مؤشرات متفق عليها من دون ضمان ترتيب محدد." }, { q: "هل يمكنكم تنفيذ توصيات SEO؟", a: "نعم. يمكننا تنفيذ التحسينات التقنية وتحسينات الصفحات المتفق عليها، أو التعاون مع فريقي التطوير والمحتوى لديك من خلال مهام مرتبة ومعايير اعتماد واضحة." }],
  },
  {
    slug: "social-media-management", name: "Social Media Management", short: "Structured planning and publishing that keeps your brand active and consistent across the right social channels.", value: "We manage channel strategy, editorial calendars, publishing, and approvals around your brand voice, audience, and business priorities.", iconName: "Megaphone", order: 5,
    deliverables: ["A channel strategy based on audience behaviour and business goals", "An editorial calendar with clear briefs, formats, owners, and dates", "Copy adaptation, scheduling, publishing, and approval coordination", "A documented workflow for assets, feedback, and last-minute changes", "Performance reviews with recommendations for the next publishing cycle"],
    process: [{ step: "Audit", detail: "Review current channels, audience behaviour, content performance, resources, and relevant competitors." }, { step: "Plan", detail: "Define the role of each channel, publishing themes, formats, cadence, and approval workflow." }, { step: "Manage", detail: "Coordinate assets and copy, secure approvals, schedule posts, and publish against the agreed calendar." }, { step: "Improve", detail: "Review meaningful engagement and business signals, then update the plan based on evidence." }],
    tools: ["Meta Business Suite", "Buffer", "Later", "Notion", "Canva"],
    faqs: [{ q: "Which platforms do you manage?", a: "We can support LinkedIn, Instagram, Facebook, X, TikTok, YouTube, and Threads. We recommend a channel mix based on where your audience is active and the level of coverage your team can sustain." }, { q: "How does the approval process work?", a: "We agree reviewers, deadlines, and escalation routes at the start. Content is shared in an editorial calendar so your team can comment and approve it before scheduling." }],
    pairsWith: ["content-creation", "community-management", "analytics-reporting"],
    nameAr: "إدارة منصات التواصل الاجتماعي", shortAr: "تخطيط ونشر منظمان يحافظان على حضور علامتك واتساقها عبر القنوات الاجتماعية المناسبة.", valueAr: "ندير استراتيجية القنوات والتقويم التحريري والنشر والاعتمادات بما ينسجم مع نبرة علامتك وجمهورك وأولويات أعمالك.",
    deliverablesAr: ["استراتيجية للقنوات تستند إلى سلوك الجمهور وأهداف العمل", "تقويم تحريري يوضح الموجز والصيغة والمسؤول والموعد لكل منشور", "تكييف النصوص وجدولة المنشورات ونشرها وتنسيق اعتمادها", "آلية موثقة لإدارة المواد والملاحظات والتغييرات العاجلة", "مراجعات للأداء مع توصيات لدورة النشر التالية"],
    processAr: [{ step: "التدقيق", detail: "مراجعة القنوات الحالية وسلوك الجمهور وأداء المحتوى والموارد والمنافسين ذوي الصلة." }, { step: "التخطيط", detail: "تحديد دور كل قناة وموضوعات النشر والصيغ والوتيرة وآلية الاعتماد." }, { step: "الإدارة", detail: "تنسيق المواد والنصوص والحصول على الاعتمادات وجدولة المنشورات ونشرها وفق التقويم المتفق عليه." }, { step: "التحسين", detail: "مراجعة التفاعل المفيد والمؤشرات المرتبطة بالأعمال، ثم تحديث الخطة بناءً على البيانات." }],
    faqsAr: [{ q: "ما المنصات التي تديرونها؟", a: "يمكننا دعم LinkedIn وInstagram وFacebook وX وTikTok وYouTube وThreads. ونوصي بمزيج القنوات وفق نشاط جمهورك ومستوى التغطية الذي يستطيع فريقك استدامته." }, { q: "كيف تعمل آلية اعتماد المحتوى؟", a: "نتفق منذ البداية على المسؤولين عن المراجعة والمواعيد ومسارات التصعيد. نشارك المحتوى ضمن تقويم تحريري كي يتمكن فريقك من التعليق عليه واعتماده قبل الجدولة." }],
  },
  {
    slug: "content-creation", name: "Content Creation", short: "Purposeful copy, graphics, and short-form media shaped for your brand and chosen channels.", value: "We turn an agreed strategy into clear, consistent content that fits the audience, format, and action each asset is meant to support.", iconName: "FileText", order: 6,
    deliverables: ["Content themes, messaging guidance, and production briefs", "Website, campaign, email, or social copy within the agreed scope", "Static graphics, carousels, and reusable visual templates", "Short-form video or motion assets where included in the production plan", "Organised source files and a handover library for approved assets"],
    process: [{ step: "Brief", detail: "Clarify the audience, message, channel, required formats, brand guidance, and approval criteria." }, { step: "Concept", detail: "Develop content angles and visual directions, then agree what moves into production." }, { step: "Create", detail: "Write, design, edit, and review each asset through the agreed feedback rounds." }, { step: "Deliver", detail: "Prepare channel-ready files, organise source materials, and record any usage or publishing notes." }],
    tools: ["Figma", "Adobe Creative Cloud", "Canva", "CapCut", "Notion"],
    faqs: [{ q: "What types of content can you create?", a: "Depending on the brief, we can produce copy, static designs, carousels, presentations, short-form video, motion assets, and reusable templates. Deliverables are confirmed before production starts." }, { q: "Can you create content in English and Arabic?", a: "Yes. We can plan bilingual content and adapt the message for each language rather than relying on literal translation. The final language mix and review process are agreed in the scope." }],
    pairsWith: ["social-media-management", "paid-advertising", "seo"],
    nameAr: "إنتاج المحتوى", shortAr: "نصوص وتصاميم ومحتوى قصير هادف، يُعد بما يناسب علامتك والقنوات المختارة.", valueAr: "نحوّل الاستراتيجية المتفق عليها إلى محتوى واضح ومتسق يراعي الجمهور والصيغة والخطوة التي صُممت كل مادة لدعمها.",
    deliverablesAr: ["محاور للمحتوى وإرشادات للرسائل وموجزات واضحة للإنتاج", "نصوص للموقع أو الحملات أو البريد الإلكتروني أو القنوات الاجتماعية ضمن النطاق المتفق عليه", "تصاميم ثابتة ومنشورات متسلسلة وقوالب بصرية قابلة لإعادة الاستخدام", "فيديوهات قصيرة أو مواد Motion عندما تكون مدرجة في خطة الإنتاج", "ملفات مصدر منظمة ومكتبة تسليم للمواد المعتمدة"],
    processAr: [{ step: "الموجز", detail: "توضيح الجمهور والرسالة والقناة والصيغ المطلوبة وإرشادات العلامة ومعايير الاعتماد." }, { step: "الفكرة", detail: "تطوير زوايا المحتوى والاتجاهات البصرية، ثم الاتفاق على ما ينتقل إلى الإنتاج." }, { step: "الإنتاج", detail: "كتابة كل مادة وتصميمها وتحريرها ومراجعتها خلال جولات الملاحظات المتفق عليها." }, { step: "التسليم", detail: "تجهيز الملفات بصيغ مناسبة للقنوات وتنظيم مواد المصدر وتوثيق ملاحظات الاستخدام أو النشر." }],
    faqsAr: [{ q: "ما أنواع المحتوى التي يمكنكم إنتاجها؟", a: "وفق الموجز، يمكننا إعداد النصوص والتصاميم الثابتة والمنشورات المتسلسلة والعروض التقديمية والفيديو القصير ومواد Motion والقوالب القابلة لإعادة الاستخدام. نؤكد جميع المخرجات قبل بدء الإنتاج." }, { q: "هل تنشئون المحتوى بالإنجليزية والعربية؟", a: "نعم. يمكننا تخطيط محتوى ثنائي اللغة وتكييف الرسالة لكل لغة بدلاً من الاعتماد على الترجمة الحرفية. نتفق ضمن النطاق على مزيج اللغات وآلية المراجعة النهائية." }],
  },
  {
    slug: "community-management", name: "Community Management", short: "Thoughtful audience engagement supported by clear response and escalation guidelines.", value: "We help you monitor conversations, respond consistently, identify recurring issues, and route sensitive or service-related cases to the right team.", iconName: "Users", order: 7,
    deliverables: ["A channel coverage plan with agreed days, hours, and responsibilities", "A response playbook covering brand voice, common questions, and boundaries", "Inbox, comment, and mention monitoring during the agreed coverage periods", "Escalation routes for support, sales, complaints, and sensitive conversations", "Recurring insight summaries covering questions, sentiment themes, and unresolved issues"],
    process: [{ step: "Set up", detail: "Agree access, coverage periods, response boundaries, service information, and escalation contacts." }, { step: "Monitor", detail: "Review relevant comments, direct messages, mentions, and conversation themes during agreed hours." }, { step: "Respond", detail: "Reply using approved guidance and route cases that require specialist or internal attention." }, { step: "Learn", detail: "Share recurring questions and audience signals so content, service, and channel plans can improve." }],
    tools: ["Meta Business Suite", "Sprout Social", "Buffer", "Zendesk", "Notion"],
    faqs: [{ q: "Do you provide round-the-clock community management?", a: "Coverage is agreed for each engagement based on channels, audience activity, risk, and budget. If extended or weekend monitoring is needed, we define the hours and escalation arrangements explicitly." }, { q: "How do you handle complaints or sensitive comments?", a: "We follow an approved response and escalation playbook. Cases involving account details, legal concerns, safety, or specialist support are routed to the named contact rather than answered beyond the agreed remit." }],
    pairsWith: ["social-media-management", "content-creation", "analytics-reporting"],
    nameAr: "إدارة المجتمع الرقمي", shortAr: "تفاعل مدروس مع الجمهور يستند إلى إرشادات واضحة للرد والتصعيد.", valueAr: "نساعدك على متابعة المحادثات والرد باتساق ورصد المسائل المتكررة وتحويل الحالات الحساسة أو المرتبطة بالخدمة إلى الفريق المناسب.",
    deliverablesAr: ["خطة لتغطية القنوات توضح الأيام والساعات والمسؤوليات المتفق عليها", "دليل للردود يشمل نبرة العلامة والأسئلة الشائعة وحدود الصلاحية", "متابعة الرسائل والتعليقات والإشارات خلال فترات التغطية المتفق عليها", "مسارات تصعيد لحالات الدعم والمبيعات والشكاوى والمحادثات الحساسة", "ملخصات دورية للأسئلة والموضوعات المتكررة والحالات غير المحلولة"],
    processAr: [{ step: "الإعداد", detail: "الاتفاق على الصلاحيات وفترات التغطية وحدود الرد ومعلومات الخدمة وجهات التصعيد." }, { step: "المتابعة", detail: "مراجعة التعليقات والرسائل الخاصة والإشارات والموضوعات ذات الصلة خلال الساعات المتفق عليها." }, { step: "الرد", detail: "الرد وفق الإرشادات المعتمدة وتحويل الحالات التي تحتاج إلى مختص أو إلى فريقك الداخلي." }, { step: "التعلّم", detail: "مشاركة الأسئلة المتكررة وإشارات الجمهور لتطوير المحتوى والخدمة وخطط القنوات." }],
    faqsAr: [{ q: "هل توفرون إدارة للمجتمع على مدار الساعة؟", a: "نحدد التغطية لكل تعاون وفق القنوات ونشاط الجمهور والمخاطر والميزانية. وإذا كانت هناك حاجة إلى متابعة ممتدة أو في عطلة نهاية الأسبوع، فنوضح الساعات وترتيبات التصعيد ضمن النطاق." }, { q: "كيف تتعاملون مع الشكاوى أو التعليقات الحساسة؟", a: "نتبع دليلاً معتمداً للرد والتصعيد. ونحوّل الحالات التي تتضمن بيانات حساب أو مسائل قانونية أو سلامة أو دعماً متخصصاً إلى جهة الاتصال المحددة بدلاً من الرد خارج الصلاحية المتفق عليها." }],
  },
  {
    slug: "analytics-reporting", name: "Analytics & Reporting", short: "Clear measurement that turns website and channel data into practical decisions.", value: "We define useful measures, review tracking quality, and build reporting that explains performance, limitations, and the next questions worth investigating.", iconName: "BarChart3", order: 8,
    deliverables: ["A measurement plan with agreed goals, events, KPIs, and ownership", "A review of GA4, Google Tag Manager, pixels, consent signals, and data gaps", "Dashboards tailored to the audiences and decisions agreed in the brief", "Scheduled reports with concise interpretation and relevant comparisons", "Prioritised recommendations with data-quality notes and known limitations"],
    process: [{ step: "Align", detail: "Clarify the decisions reporting should support and define each agreed measure consistently." }, { step: "Instrument", detail: "Review or configure tracking, events, naming, access, and relevant platform connections." }, { step: "Validate", detail: "Test collection and reconcile key figures where possible before relying on the reports." }, { step: "Report", detail: "Present trends, context, limitations, and practical follow-up questions on the agreed schedule." }],
    tools: ["GA4", "Google Tag Manager", "Looker Studio", "Google Search Console", "Meta Ads Manager"],
    faqs: [{ q: "Can you work with our existing analytics setup?", a: "Yes. We begin by reviewing access, configuration, events, consent behaviour, and known gaps. We then recommend which parts to keep, repair, or simplify before building new reporting." }, { q: "Will every platform show the same numbers?", a: "Not always. Platforms use different attribution rules, identity signals, time zones, and modelling. We document material differences and agree which source is appropriate for each decision." }],
    pairsWith: ["seo", "paid-advertising", "social-media-management"],
    nameAr: "التحليلات والتقارير", shortAr: "قياس واضح يحوّل بيانات الموقع والقنوات إلى قرارات عملية.", valueAr: "نحدد مؤشرات مفيدة ونراجع جودة التتبع ونبني تقارير توضح الأداء والقيود والأسئلة التالية الجديرة بالتحليل.",
    deliverablesAr: ["خطة قياس توضح الأهداف والأحداث وKPI والمسؤوليات المتفق عليها", "مراجعة إعداد GA4 وGoogle Tag Manager وPixels وإشارات الموافقة وفجوات البيانات", "لوحات معلومات مصممة وفق الجمهور والقرارات المحددة في الموجز", "تقارير مجدولة تتضمن تفسيراً موجزاً ومقارنات ذات صلة", "توصيات مرتبة حسب الأولوية مع ملاحظات عن جودة البيانات والقيود المعروفة"],
    processAr: [{ step: "المواءمة", detail: "توضيح القرارات التي ينبغي أن تدعمها التقارير ووضع تعريف موحد لكل مؤشر متفق عليه." }, { step: "الإعداد", detail: "مراجعة التتبع والأحداث والتسميات والصلاحيات وروابط المنصات ذات الصلة أو إعدادها." }, { step: "التحقق", detail: "اختبار جمع البيانات ومطابقة الأرقام الأساسية حيثما أمكن قبل الاعتماد على التقارير." }, { step: "إعداد التقارير", detail: "عرض الاتجاهات والسياق والقيود والأسئلة العملية التالية وفق الجدول المتفق عليه." }],
    faqsAr: [{ q: "هل يمكنكم العمل على إعداد التحليلات الحالي لدينا؟", a: "نعم. نبدأ بمراجعة الصلاحيات والإعداد والأحداث وسلوك الموافقة والفجوات المعروفة، ثم نوصي بما ينبغي الإبقاء عليه أو إصلاحه أو تبسيطه قبل بناء تقارير جديدة." }, { q: "هل ستعرض جميع المنصات الأرقام نفسها؟", a: "ليس بالضرورة. تستخدم المنصات قواعد مختلفة للإسناد وإشارات الهوية والمناطق الزمنية والنمذجة. نوثق الفروقات المؤثرة ونتفق على المصدر المناسب لكل قرار." }],
  },
  {
    slug: "paid-advertising", name: "Paid Advertising", short: "Paid campaigns built around clear objectives, reliable tracking, and disciplined testing.", value: "We plan and manage campaigns across relevant platforms, connecting audience strategy, creative, landing pages, measurement, and budget decisions.", iconName: "Activity", order: 9,
    deliverables: ["A channel and campaign plan for the relevant advertising platforms", "Audience, message, and creative hypotheses with a documented testing plan", "Landing-page recommendations or production aligned with campaign intent", "Tracking validation, budget pacing, and optimisation on an agreed schedule", "Performance reporting covering ROAS and other agreed business measures"],
    process: [{ step: "Plan", detail: "Define audiences, offers, channels, budgets, measurement, and the assumptions to test." }, { step: "Launch", detail: "Build campaigns, complete quality checks, and validate conversion tracking before increasing spend." }, { step: "Optimise", detail: "Review performance on an agreed schedule and adjust creative, targeting, bids, and budgets." }, { step: "Expand", detail: "Increase investment carefully where evidence supports it and continue testing new opportunities." }],
    tools: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "GA4"],
    faqs: [{ q: "What is the minimum advertising budget?", a: "The appropriate media budget depends on the market, audience size, objective, sales cycle, and available data. We recommend a testable starting range after reviewing those factors rather than applying one minimum to every business." }, { q: "Do you produce advertising creative?", a: "Yes. Creative production can be included in the scope, with each variation tied to a clear audience, message, or offer hypothesis. The required formats and production volume are agreed before launch." }],
    pairsWith: ["content-creation", "analytics-reporting", "web-development"],
    nameAr: "الإعلانات المدفوعة", shortAr: "حملات مدفوعة مبنية على أهداف واضحة وتتبع موثوق واختبارات منضبطة.", valueAr: "نخطط الحملات ونديرها على المنصات المناسبة، مع ربط استراتيجية الجمهور والمحتوى الإعلاني وصفحات الهبوط والقياس وقرارات الميزانية.",
    deliverablesAr: ["خطة للقنوات والحملات على منصات الإعلان المناسبة", "فرضيات للجمهور والرسائل والمحتوى الإعلاني مع خطة موثقة للاختبار", "توصيات لصفحات الهبوط أو تنفيذها بما يتوافق مع هدف الحملة", "التحقق من التتبع ومتابعة الإنفاق وتحسين الحملات وفق جدول متفق عليه", "تقارير أداء تشمل ROAS ومؤشرات الأعمال الأخرى المتفق عليها"],
    processAr: [{ step: "التخطيط", detail: "تحديد الجمهور والعروض والقنوات والميزانيات وآلية القياس والفرضيات المطلوب اختبارها." }, { step: "الإطلاق", detail: "إعداد الحملات وفحص جودتها والتحقق من تتبع التحويل قبل زيادة الإنفاق." }, { step: "التحسين", detail: "مراجعة الأداء وفق جدول متفق عليه وتعديل المحتوى والاستهداف والعروض والميزانيات." }, { step: "التوسع المدروس", detail: "زيادة الاستثمار بحذر عندما تدعم البيانات ذلك، مع مواصلة اختبار فرص جديدة." }],
    faqsAr: [{ q: "ما الحد الأدنى لميزانية الإعلان؟", a: "تعتمد الميزانية المناسبة على السوق وحجم الجمهور والهدف ودورة البيع والبيانات المتاحة. نقترح نطاق بداية قابلاً للاختبار بعد مراجعة هذه العوامل بدلاً من تطبيق حد واحد على جميع الأعمال." }, { q: "هل تنتجون المحتوى الإعلاني؟", a: "نعم. يمكن إدراج إنتاج المحتوى الإعلاني ضمن النطاق، مع ربط كل نسخة بفرضية واضحة حول الجمهور أو الرسالة أو العرض. نتفق على الصيغ وحجم الإنتاج قبل الإطلاق." }],
  },
]

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log("Connected to MongoDB")

  const postResult = await BlogPostModel.bulkWrite(
    posts.map((post) => ({
      updateOne: {
        filter: { slug: post.slug },
        update: { $set: post },
        upsert: true,
      },
    })),
  )
  console.log(
    `Blog posts: ${postResult.upsertedCount} created, ${postResult.modifiedCount} updated, ${postResult.matchedCount} matched`,
  )

  const portfolioResult = await CaseStudyModel.bulkWrite(
    portfolio.map((study) => ({
      updateOne: {
        filter: { slug: study.slug },
        update: {
          $set: study,
          $unset: { testimonial: '', testimonialAr: '' },
        },
        upsert: true,
      },
    })),
  )
  console.log(
    `Case studies: ${portfolioResult.upsertedCount} created, ${portfolioResult.modifiedCount} updated, ${portfolioResult.matchedCount} matched`,
  )

  const serviceResult = await ServiceModel.bulkWrite(
    services.map((service) => ({
      updateOne: {
        filter: { slug: service.slug },
        update: { $set: service },
        upsert: true,
      },
    })),
  )
  console.log(
    `Services: ${serviceResult.upsertedCount} created, ${serviceResult.modifiedCount} updated, ${serviceResult.matchedCount} matched`,
  )

  await mongoose.disconnect()
  console.log("Done.")
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
