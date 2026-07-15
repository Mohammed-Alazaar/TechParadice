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
    pairsWith: ["ui-ux-design", "web-development", "customer-support-ai"],
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
    pairsWith: ["web-development", "content-creation", "business-analytics-ai"],
    nameAr: "SEO", shortAr: "SEO تقني يساعد محركات البحث على اكتشاف موقعك وفهمه وعرضه بصورة أفضل.", valueAr: "نجمع بين التدقيق التقني وبحث نية المستخدم وتحسين الصفحات وتقارير عملية لدعم الظهور العضوي على المدى الطويل.",
    deliverablesAr: ["تدقيق تقني لـ SEO يشمل الزحف والفهرسة والبيانات المنظمة وCore Web Vitals", "بحث الكلمات المفتاحية ونية البحث مع خطة عمل مرتبة حسب الأولوية", "توصيات للصفحات ذات الأولوية وتنفيذ التحسينات المتفق عليها", "توصيات للروابط الداخلية والبيانات المنظمة وفجوات المحتوى", "تقارير عن الظهور والزيارات العضوية المؤهلة ومؤشرات التحويل المتفق عليها"],
    processAr: [{ step: "التدقيق", detail: "مراجعة الزحف والفهرسة وأداء الموقع وبنية الصفحات وإشارات المحتوى ومشهد البحث ذي الصلة." }, { step: "التخطيط", detail: "ترتيب الفرص التقنية وفرص تحسين الصفحات وفق احتياجات العملاء والجهد والأهمية التجارية." }, { step: "التنفيذ", detail: "تطبيق التحسينات المتفق عليها وتنسيق أي متطلبات مرتبطة بالتطوير أو المحتوى." }, { step: "القياس", detail: "متابعة الظهور والزيارات المؤهلة والتحويلات المتفق عليها، ثم تحديث الأولويات بناءً على البيانات." }],
    faqsAr: [{ q: "كم يحتاج SEO حتى يظهر تقدماً؟", a: "لا توجد مدة واحدة تنطبق على جميع المواقع. تؤثر حالة الموقع والمنافسة والمحتوى والسمعة وسرعة التنفيذ في التقدم. نحدد خط أساس ونقيس الحركة وفق مؤشرات متفق عليها من دون ضمان ترتيب محدد." }, { q: "هل يمكنكم تنفيذ توصيات SEO؟", a: "نعم. يمكننا تنفيذ التحسينات التقنية وتحسينات الصفحات المتفق عليها، أو التعاون مع فريقي التطوير والمحتوى لديك من خلال مهام مرتبة ومعايير اعتماد واضحة." }],
  },
  {
    slug: "content-creation", name: "Content Creation", short: "Purposeful copy, graphics, and short-form media shaped for your brand and chosen channels.", value: "We turn an agreed strategy into clear, consistent content that fits the audience, format, and action each asset is meant to support.", iconName: "FileText", order: 6,
    deliverables: ["Content themes, messaging guidance, and production briefs", "Website, campaign, email, or social copy within the agreed scope", "Static graphics, carousels, and reusable visual templates", "Short-form video or motion assets where included in the production plan", "Organised source files and a handover library for approved assets"],
    process: [{ step: "Brief", detail: "Clarify the audience, message, channel, required formats, brand guidance, and approval criteria." }, { step: "Concept", detail: "Develop content angles and visual directions, then agree what moves into production." }, { step: "Create", detail: "Write, design, edit, and review each asset through the agreed feedback rounds." }, { step: "Deliver", detail: "Prepare channel-ready files, organise source materials, and record any usage or publishing notes." }],
    tools: ["Figma", "Adobe Creative Cloud", "Canva", "CapCut", "Notion"],
    faqs: [{ q: "What types of content can you create?", a: "Depending on the brief, we can produce copy, static designs, carousels, presentations, short-form video, motion assets, and reusable templates. Deliverables are confirmed before production starts." }, { q: "Can you create content in English and Arabic?", a: "Yes. We can plan bilingual content and adapt the message for each language rather than relying on literal translation. The final language mix and review process are agreed in the scope." }],
    pairsWith: ["web-development", "paid-advertising", "seo"],
    nameAr: "إنتاج المحتوى", shortAr: "نصوص وتصاميم ومحتوى قصير هادف، يُعد بما يناسب علامتك والقنوات المختارة.", valueAr: "نحوّل الاستراتيجية المتفق عليها إلى محتوى واضح ومتسق يراعي الجمهور والصيغة والخطوة التي صُممت كل مادة لدعمها.",
    deliverablesAr: ["محاور للمحتوى وإرشادات للرسائل وموجزات واضحة للإنتاج", "نصوص للموقع أو الحملات أو البريد الإلكتروني أو القنوات الاجتماعية ضمن النطاق المتفق عليه", "تصاميم ثابتة ومنشورات متسلسلة وقوالب بصرية قابلة لإعادة الاستخدام", "فيديوهات قصيرة أو مواد Motion عندما تكون مدرجة في خطة الإنتاج", "ملفات مصدر منظمة ومكتبة تسليم للمواد المعتمدة"],
    processAr: [{ step: "الموجز", detail: "توضيح الجمهور والرسالة والقناة والصيغ المطلوبة وإرشادات العلامة ومعايير الاعتماد." }, { step: "الفكرة", detail: "تطوير زوايا المحتوى والاتجاهات البصرية، ثم الاتفاق على ما ينتقل إلى الإنتاج." }, { step: "الإنتاج", detail: "كتابة كل مادة وتصميمها وتحريرها ومراجعتها خلال جولات الملاحظات المتفق عليها." }, { step: "التسليم", detail: "تجهيز الملفات بصيغ مناسبة للقنوات وتنظيم مواد المصدر وتوثيق ملاحظات الاستخدام أو النشر." }],
    faqsAr: [{ q: "ما أنواع المحتوى التي يمكنكم إنتاجها؟", a: "وفق الموجز، يمكننا إعداد النصوص والتصاميم الثابتة والمنشورات المتسلسلة والعروض التقديمية والفيديو القصير ومواد Motion والقوالب القابلة لإعادة الاستخدام. نؤكد جميع المخرجات قبل بدء الإنتاج." }, { q: "هل تنشئون المحتوى بالإنجليزية والعربية؟", a: "نعم. يمكننا تخطيط محتوى ثنائي اللغة وتكييف الرسالة لكل لغة بدلاً من الاعتماد على الترجمة الحرفية. نتفق ضمن النطاق على مزيج اللغات وآلية المراجعة النهائية." }],
  },
  {
    slug: "paid-advertising", name: "Paid Advertising", short: "Paid campaigns built around clear objectives, reliable tracking, and disciplined testing.", value: "We plan and manage campaigns across relevant platforms, connecting audience strategy, creative, landing pages, measurement, and budget decisions.", iconName: "Activity", order: 9,
    deliverables: ["A channel and campaign plan for the relevant advertising platforms", "Audience, message, and creative hypotheses with a documented testing plan", "Landing-page recommendations or production aligned with campaign intent", "Tracking validation, budget pacing, and optimisation on an agreed schedule", "Performance reporting covering ROAS and other agreed business measures"],
    process: [{ step: "Plan", detail: "Define audiences, offers, channels, budgets, measurement, and the assumptions to test." }, { step: "Launch", detail: "Build campaigns, complete quality checks, and validate conversion tracking before increasing spend." }, { step: "Optimise", detail: "Review performance on an agreed schedule and adjust creative, targeting, bids, and budgets." }, { step: "Expand", detail: "Increase investment carefully where evidence supports it and continue testing new opportunities." }],
    tools: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "GA4"],
    faqs: [{ q: "What is the minimum advertising budget?", a: "The appropriate media budget depends on the market, audience size, objective, sales cycle, and available data. We recommend a testable starting range after reviewing those factors rather than applying one minimum to every business." }, { q: "Do you produce advertising creative?", a: "Yes. Creative production can be included in the scope, with each variation tied to a clear audience, message, or offer hypothesis. The required formats and production volume are agreed before launch." }],
    pairsWith: ["content-creation", "sales-lead-qualification-ai", "web-development"],
    nameAr: "الإعلانات المدفوعة", shortAr: "حملات مدفوعة مبنية على أهداف واضحة وتتبع موثوق واختبارات منضبطة.", valueAr: "نخطط الحملات ونديرها على المنصات المناسبة، مع ربط استراتيجية الجمهور والمحتوى الإعلاني وصفحات الهبوط والقياس وقرارات الميزانية.",
    deliverablesAr: ["خطة للقنوات والحملات على منصات الإعلان المناسبة", "فرضيات للجمهور والرسائل والمحتوى الإعلاني مع خطة موثقة للاختبار", "توصيات لصفحات الهبوط أو تنفيذها بما يتوافق مع هدف الحملة", "التحقق من التتبع ومتابعة الإنفاق وتحسين الحملات وفق جدول متفق عليه", "تقارير أداء تشمل ROAS ومؤشرات الأعمال الأخرى المتفق عليها"],
    processAr: [{ step: "التخطيط", detail: "تحديد الجمهور والعروض والقنوات والميزانيات وآلية القياس والفرضيات المطلوب اختبارها." }, { step: "الإطلاق", detail: "إعداد الحملات وفحص جودتها والتحقق من تتبع التحويل قبل زيادة الإنفاق." }, { step: "التحسين", detail: "مراجعة الأداء وفق جدول متفق عليه وتعديل المحتوى والاستهداف والعروض والميزانيات." }, { step: "التوسع المدروس", detail: "زيادة الاستثمار بحذر عندما تدعم البيانات ذلك، مع مواصلة اختبار فرص جديدة." }],
    faqsAr: [{ q: "ما الحد الأدنى لميزانية الإعلان؟", a: "تعتمد الميزانية المناسبة على السوق وحجم الجمهور والهدف ودورة البيع والبيانات المتاحة. نقترح نطاق بداية قابلاً للاختبار بعد مراجعة هذه العوامل بدلاً من تطبيق حد واحد على جميع الأعمال." }, { q: "هل تنتجون المحتوى الإعلاني؟", a: "نعم. يمكن إدراج إنتاج المحتوى الإعلاني ضمن النطاق، مع ربط كل نسخة بفرضية واضحة حول الجمهور أو الرسالة أو العرض. نتفق على الصيغ وحجم الإنتاج قبل الإطلاق." }],
  },
  {
    "slug": "voice-ai-receptionist",
    "name": "Voice AI Receptionist",
    "nameAr": "مساعد الاستقبال الذكي الصوتي",
    "iconName": "Phone",
    "order": 10,
    "short": "A voice assistant that answers calls around the clock, handles common requests, and routes important callers to your team.",
    "value": "It answers routine calls, books appointments, and qualifies callers in Arabic and English, reducing repetitive reception work and staffing load while capturing enquiries that would otherwise be missed after hours.",
    "deliverables": [
      "A voice assistant configured to answer inbound calls at any hour and respond to common inquiries in a natural, on-brand manner",
      "Appointment booking that checks availability, schedules callers into your calendar, and confirms the details during the call",
      "Call routing rules that identify urgent or high-value callers and transfer them to the right person or team when needed",
      "Lead qualification that captures caller intent, contact details, and key context, then records each enquiry for follow-up",
      "Multilingual conversation handling in Arabic and English, with the assistant detecting and responding in the caller's language"
    ],
    "process": [
      {
        "step": "Discover",
        "detail": "Review your call types, common inquiries, booking rules, escalation criteria, and the tone the assistant should use."
      },
      {
        "step": "Configure",
        "detail": "Build the conversation flows, qualification questions, routing logic, and Arabic and English voice settings."
      },
      {
        "step": "Integrate",
        "detail": "Connect telephony, calendar, and CRM systems so calls, bookings, and caller records flow into your existing tools."
      },
      {
        "step": "Launch",
        "detail": "Test with realistic call scenarios, launch on a live number, then monitor transcripts and refine responses over time."
      }
    ],
    "tools": [
      "Twilio",
      "Vapi",
      "ElevenLabs",
      "OpenAI",
      "Deepgram"
    ],
    "faqs": [
      {
        "q": "Will callers know they are speaking with an AI assistant?",
        "a": "Yes. We configure the assistant to be clear about what it is, and it transfers to a member of your team whenever a caller asks for a person or the situation calls for one."
      },
      {
        "q": "What happens if the assistant cannot handle a call?",
        "a": "It follows the escalation rules we agree on, such as transferring to the right person, taking a message, or offering a callback, so callers are never left without a next step."
      }
    ],
    "pairsWith": [
      "customer-support-ai",
      "sales-lead-qualification-ai",
      "web-development"
    ],
    "shortAr": "مساعد صوتي يرد على المكالمات على مدار الساعة، ويتولى الطلبات الشائعة، ويحوّل المتصلين المهمين إلى فريقك.",
    "valueAr": "يرد على المكالمات الروتينية، ويحجز المواعيد، ويؤهّل المتصلين بالعربية والإنجليزية، مما يقلل مهام الاستقبال المتكررة وأعباء التوظيف ويلتقط الاستفسارات التي قد تُفقد خارج ساعات العمل.",
    "deliverablesAr": [
      "مساعد صوتي مُعدّ للرد على المكالمات الواردة في أي وقت والإجابة عن الأسئلة الشائعة بأسلوب طبيعي يناسب علامتك",
      "حجز المواعيد مع التحقق من التوفر وجدولة المتصلين في التقويم وتأكيد التفاصيل أثناء المكالمة",
      "قواعد لتوجيه المكالمات تتعرّف على المتصلين العاجلين أو المهمين وتحوّلهم إلى الشخص أو الفريق المناسب عند الحاجة",
      "تأهيل العملاء المحتملين بجمع نية المتصل وبيانات التواصل والسياق الأساسي، وتسجيل كل استفسار للمتابعة",
      "إدارة المحادثات بالعربية والإنجليزية، مع تعرّف المساعد على لغة المتصل والرد بها"
    ],
    "processAr": [
      {
        "step": "الاكتشاف",
        "detail": "مراجعة أنواع المكالمات والأسئلة الشائعة وقواعد الحجز ومعايير التصعيد والنبرة التي ينبغي أن يستخدمها المساعد."
      },
      {
        "step": "الإعداد",
        "detail": "بناء مسارات المحادثة وأسئلة التأهيل ومنطق التوجيه وإعدادات الصوت بالعربية والإنجليزية."
      },
      {
        "step": "الربط",
        "detail": "ربط أنظمة الهاتف والتقويم وإدارة العملاء بحيث تتدفق المكالمات والحجوزات وسجلات المتصلين إلى أدواتك الحالية."
      },
      {
        "step": "الإطلاق",
        "detail": "الاختبار بسيناريوهات مكالمات واقعية، ثم الإطلاق على رقم مباشر، ومتابعة النصوص وتحسين الردود مع الوقت."
      }
    ],
    "faqsAr": [
      {
        "q": "هل سيعرف المتصلون أنهم يتحدثون مع مساعد ذكي؟",
        "a": "نعم. نُعدّ المساعد ليكون واضحاً بشأن طبيعته، وهو يحوّل المكالمة إلى أحد أفراد فريقك متى طلب المتصل التحدث إلى شخص أو تطلّب الموقف ذلك."
      },
      {
        "q": "ماذا يحدث إذا لم يستطع المساعد التعامل مع مكالمة؟",
        "a": "يتّبع قواعد التصعيد المتفق عليها، مثل التحويل إلى الشخص المناسب أو تدوين رسالة أو عرض معاودة الاتصال، بحيث لا يُترك المتصل من دون خطوة تالية."
      }
    ]
  },
  {
    "slug": "customer-support-ai",
    "name": "Customer Support AI",
    "nameAr": "مساعد خدمة العملاء الذكي",
    "iconName": "Headphones",
    "order": 11,
    "short": "AI support across your website, WhatsApp, and email that answers routine questions instantly and escalates complex cases to your team.",
    "shortAr": "دعم بالذكاء الاصطناعي عبر الموقع وواتساب والبريد الإلكتروني يجيب فوراً عن الأسئلة المتكررة ويحوّل الحالات المعقدة إلى فريقك.",
    "value": "We connect a single AI assistant across your website, WhatsApp, and email to answer routine questions instantly around the clock, reduce your team's support workload, and escalate complex cases with full context.",
    "valueAr": "نربط مساعداً ذكياً واحداً عبر موقعك وواتساب والبريد الإلكتروني للإجابة الفورية عن الأسئلة المتكررة على مدار الساعة، وتخفيف عبء الدعم عن فريقك، وتحويل الحالات المعقدة مع سياقها الكامل.",
    "deliverables": [
      "A website chat assistant configured with your brand voice to answer common questions and guide visitors toward the right next step",
      "A WhatsApp Business API integration that responds to customer messages and continues conversations on their preferred channel",
      "Email support handling that answers routine enquiries and routes the remainder to your team with the relevant context",
      "An automated FAQ layer grounded in your own approved content so answers stay accurate and consistent across channels",
      "Ticket routing and escalation rules that pass complex or sensitive cases to the right agent, along with the conversation history"
    ],
    "deliverablesAr": [
      "مساعد محادثة على الموقع مُعدّ بنبرة علامتك التجارية للإجابة عن الأسئلة الشائعة وتوجيه الزوار إلى الخطوة التالية المناسبة",
      "تكامل مع WhatsApp Business API يرد على رسائل العملاء ويكمل المحادثات على قناتهم المفضلة",
      "معالجة دعم عبر البريد الإلكتروني تجيب عن الاستفسارات المتكررة وتحوّل الباقي إلى فريقك مع السياق ذي الصلة",
      "طبقة أسئلة شائعة آلية مبنية على محتواك المعتمد لضمان بقاء الإجابات دقيقة ومتسقة عبر القنوات",
      "قواعد لتوجيه التذاكر وتصعيدها تمرر الحالات المعقدة أو الحساسة إلى الموظف المناسب مع سجل المحادثة"
    ],
    "process": [
      {
        "step": "Discover",
        "detail": "Review your common enquiries, support channels, existing content, and the cases that should always reach a person."
      },
      {
        "step": "Configure",
        "detail": "Build the assistant's knowledge base, brand voice, answer boundaries, and escalation rules from your approved material."
      },
      {
        "step": "Integrate",
        "detail": "Connect the assistant to your website, WhatsApp, email, and helpdesk, and validate handovers to your team."
      },
      {
        "step": "Launch",
        "detail": "Go live on the agreed channels, monitor real conversations, and refine answers and routing over time."
      }
    ],
    "processAr": [
      {
        "step": "الاكتشاف",
        "detail": "مراجعة استفساراتك المتكررة وقنوات الدعم والمحتوى الحالي والحالات التي يجب أن تصل دائماً إلى موظف."
      },
      {
        "step": "الإعداد",
        "detail": "بناء قاعدة معرفة المساعد ونبرة العلامة وحدود الإجابات وقواعد التصعيد من موادك المعتمدة."
      },
      {
        "step": "التكامل",
        "detail": "ربط المساعد بموقعك وواتساب والبريد الإلكتروني ونظام الدعم، والتحقق من عمليات التحويل إلى فريقك."
      },
      {
        "step": "الإطلاق",
        "detail": "التشغيل على القنوات المتفق عليها ومتابعة المحادثات الفعلية وتحسين الإجابات والتوجيه بمرور الوقت."
      }
    ],
    "tools": [
      "OpenAI",
      "WhatsApp Business API",
      "Zendesk",
      "Intercom",
      "Pinecone"
    ],
    "faqs": [
      {
        "q": "Will this replace our support team?",
        "a": "No. The assistant handles routine, high-volume enquiries around the clock and escalates complex or sensitive cases to your team with the full conversation context, so staff focus on the work that genuinely needs a person."
      },
      {
        "q": "How do you keep it from giving inaccurate answers?",
        "a": "The assistant answers from your own approved content and defined boundaries rather than open-ended generation. When a question falls outside what it can confidently handle, it hands the conversation to your team instead of guessing."
      }
    ],
    "faqsAr": [
      {
        "q": "هل سيحل هذا محل فريق الدعم لدينا؟",
        "a": "لا. يتولى المساعد الاستفسارات المتكررة وكبيرة الحجم على مدار الساعة، ويحوّل الحالات المعقدة أو الحساسة إلى فريقك مع سياق المحادثة الكامل، ليتفرغ الموظفون للعمل الذي يحتاج فعلاً إلى تدخل بشري."
      },
      {
        "q": "كيف تضمنون عدم تقديمه إجابات غير دقيقة؟",
        "a": "يجيب المساعد اعتماداً على محتواك المعتمد وحدود محددة بدلاً من التوليد المفتوح. وعندما يقع السؤال خارج ما يمكنه التعامل معه بثقة، يحوّل المحادثة إلى فريقك بدلاً من التخمين."
      }
    ],
    "pairsWith": [
      "voice-ai-receptionist",
      "internal-knowledge-ai",
      "web-development"
    ]
  },
  {
    "slug": "sales-lead-qualification-ai",
    "name": "Sales & Lead Qualification AI",
    "short": "An AI assistant that engages prospects, qualifies leads, follows up automatically, and books meetings with your sales team.",
    "value": "It combines lead qualification, automated follow-up, and meeting scheduling with your CRM, helping you respond faster, surface more qualified leads, and lift sales-team productivity and conversion over time.",
    "iconName": "TrendingUp",
    "order": 12,
    "deliverables": [
      "A configured qualification flow that scores and routes prospects against your defined criteria before they reach the sales team",
      "Automated, multi-step follow-up sequences that re-engage prospects across your chosen channels without manual chasing",
      "Real-time meeting scheduling that checks representative availability and books qualified prospects directly into calendars",
      "Two-way CRM integration that logs conversations, contact details, and lead status so your pipeline stays current",
      "Natural sales conversations aligned with your product, pricing, and brand voice, with a clear handover to a person when needed"
    ],
    "process": [
      {
        "step": "Discover",
        "detail": "Map your sales process, qualification criteria, common questions, and the CRM and calendar tools already in use."
      },
      {
        "step": "Configure",
        "detail": "Build the qualification logic, conversation flows, follow-up sequences, and escalation rules around your sales team."
      },
      {
        "step": "Integrate",
        "detail": "Connect the assistant to your CRM, calendar, and messaging channels, then validate data flow and booking end to end."
      },
      {
        "step": "Launch",
        "detail": "Deploy to live traffic, monitor conversations and conversion, and refine qualification and follow-up on an agreed schedule."
      }
    ],
    "tools": [
      "OpenAI",
      "HubSpot",
      "Salesforce",
      "Calendly",
      "Make"
    ],
    "faqs": [
      {
        "q": "Will the AI replace our sales team?",
        "a": "No. It handles early engagement, qualification, follow-up, and scheduling so your representatives spend their time on qualified conversations. Complex or high-intent cases are handed to a person with the full context captured."
      },
      {
        "q": "Which CRM and calendar tools does it work with?",
        "a": "It integrates with common platforms such as HubSpot, Salesforce, and Calendly, and can connect to others through automation tools like Make. We confirm compatibility with your current stack during discovery."
      }
    ],
    "pairsWith": [
      "customer-support-ai",
      "paid-advertising",
      "business-analytics-ai"
    ],
    "nameAr": "مساعد المبيعات وتأهيل العملاء",
    "shortAr": "مساعد ذكاء اصطناعي يتفاعل مع العملاء المحتملين، ويؤهّلهم، ويتابع تلقائياً، ويحجز الاجتماعات مع فريق المبيعات.",
    "valueAr": "يجمع بين تأهيل العملاء والمتابعة التلقائية وجدولة الاجتماعات مع التكامل مع نظام CRM، مما يساعدك على الاستجابة أسرع، وإبراز مزيد من العملاء المؤهلين، ورفع إنتاجية فريق المبيعات ومعدلات التحويل بمرور الوقت.",
    "deliverablesAr": [
      "مسار تأهيل مُعدّ يقيّم العملاء المحتملين ويوجّههم وفق معاييرك المحددة قبل وصولهم إلى فريق المبيعات",
      "سلاسل متابعة تلقائية متعددة الخطوات تعيد التفاعل مع العملاء المحتملين عبر القنوات المختارة دون متابعة يدوية",
      "جدولة اجتماعات فورية تتحقق من توفّر أعضاء الفريق وتحجز العملاء المؤهلين مباشرة في التقويم",
      "تكامل ثنائي الاتجاه مع نظام CRM يسجّل المحادثات وبيانات التواصل وحالة العميل ليبقى مسار المبيعات محدّثاً",
      "محادثات مبيعات طبيعية تتوافق مع منتجك وأسعارك ونبرة علامتك، مع تحويل واضح إلى موظف بشري عند الحاجة"
    ],
    "processAr": [
      {
        "step": "الاكتشاف",
        "detail": "رسم عملية المبيعات ومعايير التأهيل والأسئلة الشائعة وأنظمة CRM والتقويم المستخدمة حالياً."
      },
      {
        "step": "الإعداد",
        "detail": "بناء منطق التأهيل ومسارات المحادثة وسلاسل المتابعة وقواعد التصعيد حول فريق المبيعات."
      },
      {
        "step": "التكامل",
        "detail": "ربط المساعد بنظام CRM والتقويم وقنوات المراسلة، والتحقق من تدفق البيانات والحجز من البداية إلى النهاية."
      },
      {
        "step": "الإطلاق",
        "detail": "التشغيل على الحركة الفعلية، ومراقبة المحادثات والتحويل، وتحسين التأهيل والمتابعة وفق جدول متفق عليه."
      }
    ],
    "faqsAr": [
      {
        "q": "هل سيحل الذكاء الاصطناعي محل فريق المبيعات؟",
        "a": "لا. يتولى التفاعل المبكر والتأهيل والمتابعة والجدولة كي يركّز فريقك على المحادثات المؤهلة. أما الحالات المعقّدة أو عالية الاهتمام فتُحوَّل إلى موظف بشري مع كامل السياق."
      },
      {
        "q": "ما أنظمة CRM والتقويم التي يعمل معها؟",
        "a": "يتكامل مع منصات شائعة مثل HubSpot وSalesforce وCalendly، ويمكن ربطه بغيرها عبر أدوات الأتمتة مثل Make. نتحقق من التوافق مع أنظمتك الحالية أثناء مرحلة الاكتشاف."
      }
    ]
  },
  {
    "slug": "business-analytics-ai",
    "name": "Business Analytics AI",
    "short": "An AI assistant that connects your dashboards, spreadsheets, and databases so teams can ask questions in plain language.",
    "value": "We deploy an assistant that turns your existing data sources into plain-language KPI analysis, trend reports, and forecasts, supporting faster reporting, clearer executive dashboards, and better-informed decisions.",
    "iconName": "BarChart3",
    "order": 13,
    "deliverables": [
      "A KPI reporting layer that summarises agreed metrics from your connected sources and answers questions in plain language",
      "Sales analysis views that break performance down by product, channel, region, or period on request",
      "Trend detection that surfaces meaningful movements and anomalies across your key measures",
      "Forecasting that projects selected metrics forward with the assumptions and ranges stated clearly",
      "A natural-language query interface configured against your dashboards, spreadsheets, and databases"
    ],
    "process": [
      {
        "step": "Discover",
        "detail": "Identify the metrics, questions, and reports that matter, then map the data sources and access needed to answer them reliably."
      },
      {
        "step": "Connect",
        "detail": "Integrate the assistant with your dashboards, spreadsheets, and databases, and define how each metric is calculated."
      },
      {
        "step": "Configure",
        "detail": "Tune the natural-language queries, KPI definitions, trend rules, and forecast assumptions against real questions from your team."
      },
      {
        "step": "Launch",
        "detail": "Roll out the assistant to agreed users, review answer quality, and refine definitions and dashboards from actual usage."
      }
    ],
    "tools": [
      "OpenAI",
      "BigQuery",
      "Metabase",
      "Looker Studio",
      "GA4"
    ],
    "faqs": [
      {
        "q": "Where does the assistant get its numbers from?",
        "a": "It works from the data sources you connect, such as dashboards, spreadsheets, and databases. It does not invent figures; answers reflect the metrics and definitions configured during setup, so accuracy depends on the quality and freshness of the connected data."
      },
      {
        "q": "Can it forecast future performance reliably?",
        "a": "It can project selected metrics forward based on historical patterns and stated assumptions, and it presents ranges rather than single certainties. Forecasts are decision-support estimates that should be read alongside business context, not guarantees of future results."
      }
    ],
    "pairsWith": [
      "seo",
      "sales-lead-qualification-ai",
      "meeting-executive-ai"
    ],
    "nameAr": "مساعد تحليل الأعمال الذكي",
    "shortAr": "مساعد ذكي يربط لوحات البيانات وملفات Excel وقواعد البيانات ليطرح فريقك أسئلته باللغة الطبيعية.",
    "valueAr": "ننشر مساعداً يحوّل مصادر بياناتك الحالية إلى تحليل للمؤشرات وتقارير للاتجاهات وتوقعات باللغة الطبيعية، بما يدعم تقارير أسرع ولوحات ملائمة للإدارة وقرارات أفضل استناداً إلى البيانات.",
    "deliverablesAr": [
      "طبقة لتقارير المؤشرات تلخّص المقاييس المتفق عليها من مصادرك المتصلة وتجيب عن الأسئلة باللغة الطبيعية",
      "لوحات لتحليل المبيعات تفصّل الأداء حسب المنتج أو القناة أو المنطقة أو الفترة عند الطلب",
      "رصد للاتجاهات يبرز التحركات المهمة والحالات الشاذة عبر مقاييسك الأساسية",
      "توقعات تعرض مساراً مستقبلياً للمقاييس المختارة مع بيان الافتراضات والنطاقات بوضوح",
      "واجهة استعلام باللغة الطبيعية مهيأة على لوحات بياناتك وملفات Excel وقواعد بياناتك"
    ],
    "processAr": [
      {
        "step": "الاكتشاف",
        "detail": "تحديد المؤشرات والأسئلة والتقارير المهمة، ثم رسم مصادر البيانات والصلاحيات اللازمة للإجابة عنها بموثوقية."
      },
      {
        "step": "الربط",
        "detail": "دمج المساعد مع لوحات بياناتك وملفات Excel وقواعد بياناتك، وتحديد طريقة احتساب كل مؤشر."
      },
      {
        "step": "التهيئة",
        "detail": "ضبط الاستعلامات باللغة الطبيعية وتعريفات المؤشرات وقواعد الاتجاهات وافتراضات التوقعات وفق أسئلة فعلية من فريقك."
      },
      {
        "step": "الإطلاق",
        "detail": "إتاحة المساعد للمستخدمين المتفق عليهم ومراجعة جودة الإجابات وتحسين التعريفات واللوحات بناءً على الاستخدام الفعلي."
      }
    ],
    "faqsAr": [
      {
        "q": "من أين يحصل المساعد على أرقامه؟",
        "a": "يعمل من مصادر البيانات التي تربطها، مثل لوحات البيانات وملفات Excel وقواعد البيانات. وهو لا يختلق الأرقام؛ فالإجابات تعكس المؤشرات والتعريفات المهيأة أثناء الإعداد، وبالتالي تعتمد الدقة على جودة البيانات المتصلة وحداثتها."
      },
      {
        "q": "هل يمكنه التنبؤ بالأداء المستقبلي بموثوقية؟",
        "a": "يستطيع عرض مسار مستقبلي للمقاييس المختارة استناداً إلى الأنماط التاريخية والافتراضات المعلنة، ويقدّم نطاقات بدلاً من قيم قاطعة. والتوقعات تقديرات داعمة للقرار يجب قراءتها مع السياق التجاري، وليست ضماناً للنتائج المستقبلية."
      }
    ]
  },
  {
    "slug": "internal-knowledge-ai",
    "name": "Internal Knowledge AI",
    "short": "An internal assistant that lets employees find company knowledge across policies, SOPs, and documents in seconds.",
    "value": "We connect your policies, SOPs, HR files, and technical manuals into a secure assistant that gives staff consistent answers in seconds, shortening onboarding and reducing repeated questions.",
    "iconName": "BookOpen",
    "order": 14,
    "deliverables": [
      "A unified company knowledge base that indexes policies, SOPs, HR documents, and technical manuals for search",
      "An HR assistant that answers common questions about leave, benefits, and internal procedures from approved sources",
      "Natural-language SOP search that returns the relevant step or section rather than a full document to read",
      "Document question-and-answer with citations back to the source file so staff can verify each response",
      "Secure internal access with role-based permissions so employees only see the knowledge they are authorised to view"
    ],
    "process": [
      {
        "step": "Discover",
        "detail": "Review the documents, systems, and common questions, and agree access rules, source priorities, and success measures."
      },
      {
        "step": "Configure",
        "detail": "Index the approved sources, structure the knowledge base, and set retrieval, permissions, and response guidelines."
      },
      {
        "step": "Integrate",
        "detail": "Connect the assistant to your document stores and internal channels, then test answers against real employee questions."
      },
      {
        "step": "Launch",
        "detail": "Roll out to teams with guidance, monitor accuracy and gaps, and refine the sources and responses from actual usage."
      }
    ],
    "tools": [
      "OpenAI",
      "Pinecone",
      "LangChain",
      "Notion",
      "Google Drive"
    ],
    "faqs": [
      {
        "q": "Is company data kept secure and private?",
        "a": "Yes. The assistant works within agreed access controls, respects existing document permissions, and only draws on the internal sources you approve. We confirm data handling, retention, and access boundaries before launch."
      },
      {
        "q": "What happens when the assistant cannot find an answer?",
        "a": "It is configured to say when the knowledge base does not cover a question rather than guess, and to point staff toward the right document or team. Gaps surfaced this way help us improve the sources over time."
      }
    ],
    "pairsWith": [
      "customer-support-ai",
      "meeting-executive-ai",
      "ui-ux-design"
    ],
    "nameAr": "مساعد المعرفة الداخلية",
    "shortAr": "مساعد داخلي يمكّن الموظفين من العثور على معرفة الشركة عبر السياسات والإجراءات والمستندات خلال ثوانٍ.",
    "valueAr": "نربط سياساتك وإجراءاتك ومستندات الموارد البشرية والأدلة الفنية في مساعد آمن يمنح الموظفين إجابات متسقة خلال ثوانٍ، ما يسرّع التهيئة ويقلّل الأسئلة المتكررة.",
    "deliverablesAr": [
      "قاعدة معرفة موحّدة للشركة تفهرس السياسات والإجراءات ومستندات الموارد البشرية والأدلة الفنية للبحث فيها",
      "مساعد للموارد البشرية يجيب عن الأسئلة الشائعة حول الإجازات والمزايا والإجراءات الداخلية من مصادر معتمدة",
      "بحث في الإجراءات باللغة الطبيعية يعيد الخطوة أو القسم المطلوب بدلاً من مستند كامل للقراءة",
      "أسئلة وأجوبة على المستندات مع الإحالة إلى الملف المصدر ليتمكن الموظف من التحقق من كل إجابة",
      "وصول داخلي آمن بصلاحيات محددة حسب الدور بحيث لا يرى الموظف سوى المعرفة المصرّح له بالاطلاع عليها"
    ],
    "processAr": [
      {
        "step": "الاكتشاف",
        "detail": "مراجعة المستندات والأنظمة والأسئلة الشائعة، والاتفاق على قواعد الوصول وأولويات المصادر ومؤشرات النجاح."
      },
      {
        "step": "الإعداد",
        "detail": "فهرسة المصادر المعتمدة وبناء قاعدة المعرفة وضبط الاسترجاع والصلاحيات وإرشادات الردود."
      },
      {
        "step": "الربط",
        "detail": "ربط المساعد بمخازن مستنداتك وقنواتك الداخلية، ثم اختبار الإجابات مقابل أسئلة حقيقية للموظفين."
      },
      {
        "step": "الإطلاق",
        "detail": "الطرح للفرق مع إرشاد، ومتابعة الدقة والفجوات، وتحسين المصادر والردود بناءً على الاستخدام الفعلي."
      }
    ],
    "faqsAr": [
      {
        "q": "هل تبقى بيانات الشركة آمنة وخاصة؟",
        "a": "نعم. يعمل المساعد ضمن ضوابط الوصول المتفق عليها ويحترم صلاحيات المستندات القائمة ولا يعتمد إلا على المصادر الداخلية التي تعتمدها. نؤكد آلية التعامل مع البيانات والاحتفاظ بها وحدود الوصول قبل الإطلاق."
      },
      {
        "q": "ماذا يحدث حين لا يجد المساعد إجابة؟",
        "a": "يُهيَّأ ليوضح أن قاعدة المعرفة لا تغطي السؤال بدلاً من التخمين، ويوجّه الموظف إلى المستند أو الفريق المناسب. وتساعدنا الفجوات التي تظهر بهذه الطريقة على تحسين المصادر مع الوقت."
      }
    ]
  },
  {
    "slug": "meeting-executive-ai",
    "name": "Meeting & Executive AI",
    "short": "An AI assistant that records, summarises, and organises meetings so teams focus on execution instead of note-taking.",
    "value": "We deploy an assistant that captures meetings, drafts summaries, action items, follow-up emails, and executive reports, saving management time and improving accountability, documentation, and decision execution.",
    "iconName": "CalendarCheck",
    "order": 15,
    "deliverables": [
      "Automated meeting summaries that capture key discussion points, decisions, and context from each session",
      "Structured action items with owners, due dates, and status ready to track after every meeting",
      "Drafted follow-up emails and meeting recaps prepared for review and sending to participants",
      "Concise executive reports that consolidate outcomes across meetings for leadership review",
      "A shared collaboration workspace where notes, tasks, and summaries are organised and searchable for the team"
    ],
    "process": [
      {
        "step": "Discover",
        "detail": "Review your meeting types, participants, tools, and reporting needs to define what the assistant should capture and produce."
      },
      {
        "step": "Configure",
        "detail": "Set up transcription, summary formats, action-item structure, and executive report templates aligned with your workflow."
      },
      {
        "step": "Integrate",
        "detail": "Connect the assistant to your meeting, task, and communication tools, with agreed access and data-handling controls."
      },
      {
        "step": "Launch",
        "detail": "Roll out with your team, monitor output quality, and refine prompts, templates, and routing based on real use."
      }
    ],
    "tools": [
      "OpenAI",
      "Whisper",
      "Otter.ai",
      "Notion",
      "Slack"
    ],
    "faqs": [
      {
        "q": "How does the assistant handle meeting recordings and data privacy?",
        "a": "We agree at the outset which meetings are captured, where recordings and transcripts are stored, and who can access them. Access controls and retention rules are configured to match your internal policies, and sensitive sessions can be excluded."
      },
      {
        "q": "How accurate are the summaries and action items?",
        "a": "Accuracy depends on audio quality, speaker clarity, and how the meeting is structured. The assistant produces a strong first draft that a participant can review and correct, rather than a final record that goes out without oversight."
      }
    ],
    "pairsWith": [
      "internal-knowledge-ai",
      "business-analytics-ai",
      "customer-support-ai"
    ],
    "nameAr": "مساعد الاجتماعات والمدير التنفيذي",
    "shortAr": "مساعد بالذكاء الاصطناعي يسجّل الاجتماعات ويلخّصها وينظّمها ليتفرّغ الفريق للتنفيذ بدل تدوين الملاحظات.",
    "valueAr": "ننشر مساعداً يوثّق الاجتماعات ويصوغ الملخصات والمهام ورسائل المتابعة والتقارير التنفيذية، بما يوفّر وقت الإدارة ويعزّز المساءلة والتوثيق وسرعة تنفيذ القرارات.",
    "deliverablesAr": [
      "ملخصات آلية للاجتماعات تلتقط أبرز نقاط النقاش والقرارات والسياق من كل جلسة",
      "مهام منظمة تحدّد المسؤول والموعد والحالة وتكون جاهزة للمتابعة بعد كل اجتماع",
      "رسائل متابعة ومحاضر موجزة مُعدّة للمراجعة والإرسال إلى المشاركين",
      "تقارير تنفيذية مختصرة تجمع مخرجات الاجتماعات لمراجعة الإدارة",
      "مساحة عمل مشتركة تُنظَّم فيها الملاحظات والمهام والملخصات وتكون قابلة للبحث أمام الفريق"
    ],
    "processAr": [
      {
        "step": "الاستكشاف",
        "detail": "مراجعة أنواع اجتماعاتكم والمشاركين والأدوات واحتياجات التقارير لتحديد ما ينبغي أن يلتقطه المساعد وينتجه."
      },
      {
        "step": "الإعداد",
        "detail": "تهيئة التفريغ الصوتي وصيغ الملخصات وبنية المهام وقوالب التقارير التنفيذية بما يتوافق مع سير عملكم."
      },
      {
        "step": "الربط",
        "detail": "ربط المساعد بأدوات الاجتماعات والمهام والتواصل لديكم، مع صلاحيات وضوابط لمعالجة البيانات متفق عليها."
      },
      {
        "step": "الإطلاق",
        "detail": "الإطلاق مع فريقكم ومتابعة جودة المخرجات وتحسين التوجيهات والقوالب والتوزيع بناءً على الاستخدام الفعلي."
      }
    ],
    "faqsAr": [
      {
        "q": "كيف يتعامل المساعد مع تسجيلات الاجتماعات وخصوصية البيانات؟",
        "a": "نتفق منذ البداية على الاجتماعات التي تُسجَّل وأماكن حفظ التسجيلات والتفريغات ومن يمكنه الوصول إليها. تُضبط صلاحيات الوصول وقواعد الاحتفاظ بما يتوافق مع سياساتكم الداخلية، ويمكن استثناء الجلسات الحساسة."
      },
      {
        "q": "ما مدى دقة الملخصات والمهام؟",
        "a": "تعتمد الدقة على جودة الصوت ووضوح المتحدثين وطريقة تنظيم الاجتماع. ينتج المساعد مسودة أولى قوية يمكن لأحد المشاركين مراجعتها وتصحيحها، بدل اعتبارها محضراً نهائياً يُرسل من دون إشراف."
      }
    ]
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
