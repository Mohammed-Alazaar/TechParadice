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
    slug: "website-cost-saudi-arabia-2026",
    title: "How Much Does a Website Cost in Saudi Arabia? (2026 Pricing Guide)",
    excerpt:
      "Real 2026 numbers for website pricing in Saudi Arabia — landing pages, corporate sites, and e-commerce stores — plus what actually drives the cost.",
    category: "Web",
    author: "Mohammed",
    date: "2026-06-28",
    readingTime: "5 min",
    published: true,
    body: [
      `<p>One of the first questions every business owner asks is simple: <strong>how much does a website cost in Saudi Arabia?</strong> The honest answer is that it depends on scope — but you deserve real numbers, not "it depends." Below is a transparent 2026 pricing breakdown based on the projects we actually ship.</p>
<h2>Website cost in Saudi Arabia at a glance (2026)</h2>
<ul>
<li><strong>Landing page or one-pager:</strong> SAR 3,000–8,000</li>
<li><strong>Business / corporate website (5–10 pages):</strong> SAR 12,000–35,000</li>
<li><strong>E-commerce store:</strong> SAR 25,000–120,000+</li>
<li><strong>Custom web application:</strong> SAR 80,000 and up</li>
</ul>
<h2>What actually drives the price</h2>
<p>Design quality, number of pages, content, and languages all move the number — a bilingual Arabic/English build adds real work. So do integrations such as payment gateways and CRMs, and whether you need a content management system. A fast, SEO-ready build on a modern stack costs more up front but pays back in traffic and conversions.</p>
<h2>Do cheap websites save money?</h2>
<p>Rarely. A SAR 1,500 template site usually loads slowly, ranks poorly, and gets rebuilt within a year. The cost of that rebuild — plus the leads you lose in between — almost always exceeds the price of doing it right once.</p>
<h2>How to budget smartly</h2>
<p>Start with the outcome, not the page count. If the site needs to generate leads, invest in performance, SEO, and a clear conversion path. If it is a digital brochure, a leaner build is fine. Either way, ask for a fixed scope and a written timeline before you pay.</p>
<p>Want a precise quote for your project? <a href="/pricing">See our pricing</a> or <a href="/contact">tell us what you need</a> and we'll send a transparent estimate within two business days.</p>`,
    ],
    titleAr: "كم تكلفة تصميم موقع إلكتروني في السعودية؟ دليل الأسعار 2026",
    excerptAr:
      "أرقام حقيقية لأسعار تصميم المواقع في السعودية 2026 — صفحات هبوط ومواقع شركات ومتاجر إلكترونية — وما الذي يحدد التكلفة فعليًا.",
    bodyAr: [
      `<p>من أول الأسئلة التي يطرحها كل صاحب عمل سؤال بسيط: <strong>كم تكلفة تصميم موقع إلكتروني في السعودية؟</strong> الإجابة الصادقة أنها تعتمد على حجم المشروع — لكنك تستحق أرقامًا حقيقية لا عبارة "الأمر يعتمد". فيما يلي تفصيل شفاف لأسعار 2026 بناءً على المشاريع التي ننفذها فعليًا.</p>
<h2>تكلفة موقع إلكتروني في السعودية باختصار (2026)</h2>
<ul>
<li><strong>صفحة هبوط أو موقع من صفحة واحدة:</strong> 3,000–8,000 ريال</li>
<li><strong>موقع شركة تعريفي (5–10 صفحات):</strong> 12,000–35,000 ريال</li>
<li><strong>متجر إلكتروني:</strong> 25,000–120,000 ريال فأكثر</li>
<li><strong>تطبيق ويب مخصص:</strong> من 80,000 ريال وأعلى</li>
</ul>
<h2>ما الذي يحدد السعر فعليًا؟</h2>
<p>جودة التصميم، وعدد الصفحات، والمحتوى، واللغات — كلها تحرّك الرقم، فالبناء ثنائي اللغة عربي/إنجليزي يضيف عملًا حقيقيًا. وكذلك التكاملات مثل بوابات الدفع وأنظمة إدارة العملاء، وهل تحتاج نظام إدارة محتوى. البناء السريع والجاهز لتحسين محركات البحث على تقنيات حديثة يكلف أكثر في البداية لكنه يعوّض ذلك زياراتٍ وتحويلات.</p>
<h2>هل توفّر المواقع الرخيصة المال؟</h2>
<p>نادرًا. الموقع القالبي بـ 1,500 ريال غالبًا يكون بطيء التحميل، ضعيف الترتيب في البحث، ويُعاد بناؤه خلال سنة. تكلفة إعادة البناء تلك — إضافةً إلى العملاء الذين تفقدهم بينهما — تتجاوز عادةً تكلفة تنفيذه بشكل صحيح من أول مرة.</p>
<h2>كيف تضع ميزانية ذكية؟</h2>
<p>ابدأ من النتيجة لا من عدد الصفحات. إن كان الموقع يجب أن يجلب عملاء، استثمر في الأداء وتحسين محركات البحث ومسار تحويل واضح. وإن كان مجرد كتيّب رقمي، فالبناء المبسّط يكفي. في الحالتين، اطلب نطاقًا ثابتًا وجدولًا زمنيًا مكتوبًا قبل الدفع.</p>
<p>تريد عرض سعر دقيقًا لمشروعك؟ <a href="/ar/pricing">اطّلع على أسعارنا</a> أو <a href="/ar/contact">أخبرنا باحتياجك</a> وسنرسل تقديرًا شفافًا خلال يومَي عمل.</p>`,
    ],
    publishedAr: true,
  },
  {
    slug: "seo-for-arabic-websites",
    title: "SEO for Arabic Websites: A Practical 2026 Guide",
    excerpt:
      "Arabic SEO needs its own playbook, not a translated English one. Here's how to rank in Saudi Arabia, the UAE, and the wider MENA region.",
    category: "Growth",
    author: "Mohammed",
    date: "2026-06-14",
    readingTime: "6 min",
    published: true,
    body: [
      `<p>Arabic is one of the fastest-growing languages online, yet most Arabic websites are barely optimized for search. If you want to rank in Saudi Arabia, the UAE, or the wider MENA region, <strong>SEO for Arabic websites</strong> needs its own playbook — not a translated copy of an English one.</p>
<h2>Why Arabic SEO is different</h2>
<p>Right-to-left layout, diacritics (tashkeel), multiple spellings of the same word, and the gap between dialect and Modern Standard Arabic all change how people search. A keyword typed in Gulf dialect can look completely different from its formal equivalent.</p>
<h2>The Arabic SEO checklist</h2>
<ul>
<li><strong>Set the right language and direction:</strong> use <code>lang="ar"</code> and <code>dir="rtl"</code> so search engines and screen readers understand the page.</li>
<li><strong>Add hreflang tags:</strong> tell Google which page is Arabic and which is English to avoid duplicate-content confusion.</li>
<li><strong>Research real Arabic keywords:</strong> include common misspellings and dialect variants, not just dictionary terms.</li>
<li><strong>Write natively:</strong> machine-translated content reads awkwardly and ranks poorly. Publish original Arabic writing.</li>
<li><strong>Optimize technical performance:</strong> fast loading and strong Core Web Vitals matter just as much in Arabic markets.</li>
</ul>
<h2>Content that ranks in Arabic</h2>
<p>Answer the questions your audience actually types. Long-form guides, clear H2 headings, and structured data help you win featured snippets — which are increasingly common in Arabic results.</p>
<p>We build bilingual sites with Arabic SEO baked in from day one. <a href="/services">Explore our SEO service</a> or <a href="/contact">book a free audit</a>.</p>`,
    ],
    titleAr: "تحسين محركات البحث (SEO) للمواقع العربية: دليل عملي 2026",
    excerptAr:
      "تحسين محركات البحث العربي يحتاج خطته الخاصة لا نسخة مترجمة عن الإنجليزية. إليك كيف تتصدّر نتائج البحث في السعودية والإمارات ومنطقة الشرق الأوسط.",
    bodyAr: [
      `<p>العربية من أسرع اللغات نموًا على الإنترنت، ومع ذلك فإن معظم المواقع العربية بالكاد تكون مهيّأة لمحركات البحث. إن أردت الظهور في السعودية أو الإمارات أو منطقة الشرق الأوسط عمومًا، فإن <strong>تحسين محركات البحث للمواقع العربية</strong> يحتاج خطته الخاصة — لا نسخة مترجمة عن الإنجليزية.</p>
<h2>لماذا يختلف SEO العربي؟</h2>
<p>التخطيط من اليمين إلى اليسار، والتشكيل، وتعدد طرق كتابة الكلمة الواحدة، والفجوة بين العامية والفصحى — كلها تغيّر طريقة بحث الناس. فالكلمة المكتوبة بلهجة الخليج قد تبدو مختلفة تمامًا عن مقابلها الفصيح.</p>
<h2>قائمة تحقق SEO العربي</h2>
<ul>
<li><strong>اضبط اللغة والاتجاه الصحيحين:</strong> استخدم <code>lang="ar"</code> و<code>dir="rtl"</code> ليفهم محرك البحث وقارئ الشاشة الصفحة.</li>
<li><strong>أضف وسوم hreflang:</strong> أخبر جوجل أي صفحة عربية وأيها إنجليزية لتجنّب لبس المحتوى المكرر.</li>
<li><strong>ابحث عن كلمات مفتاحية عربية حقيقية:</strong> أدرج الأخطاء الإملائية الشائعة وصيغ اللهجات، لا مصطلحات القاموس فقط.</li>
<li><strong>اكتب بلغة أصلية:</strong> المحتوى المترجم آليًا ركيك ويترتّب ضعيفًا. انشر كتابة عربية أصيلة.</li>
<li><strong>حسّن الأداء التقني:</strong> سرعة التحميل ومؤشرات Core Web Vitals القوية مهمة في الأسواق العربية بنفس القدر.</li>
</ul>
<h2>محتوى يتصدّر بالعربية</h2>
<p>أجب عن الأسئلة التي يكتبها جمهورك فعلًا. الأدلة المطوّلة، وعناوين H2 الواضحة، والبيانات المنظّمة تساعدك على كسب المقتطفات المميّزة — وهي تتزايد في نتائج البحث العربية.</p>
<p>نبني مواقع ثنائية اللغة مع تحسين محركات البحث العربي منذ اليوم الأول. <a href="/ar/services">تعرّف على خدمة SEO لدينا</a> أو <a href="/ar/contact">احجز تدقيقًا مجانيًا</a>.</p>`,
    ],
    publishedAr: true,
  },
  {
    slug: "nextjs-vs-wordpress-business-websites",
    title: "Next.js vs WordPress: Which Is Right for Your Business Website?",
    excerpt:
      "A clear, hype-free comparison of Next.js and WordPress — performance, SEO, security, and cost — to help you pick the right stack.",
    category: "Engineering",
    author: "Mohammed",
    date: "2026-05-30",
    readingTime: "5 min",
    published: true,
    body: [
      `<p>When it's time to build a business website, the choice often comes down to <strong>Next.js vs WordPress</strong>. Both can produce a great site — but they suit very different needs. Here's a clear comparison to help you decide without the hype.</p>
<h2>WordPress: strengths and trade-offs</h2>
<p>WordPress powers a huge share of the web because it's familiar, has thousands of plugins, and lets non-technical teams publish easily. The trade-off is performance and security: plugin bloat slows sites down, and outdated plugins are the most common way sites get hacked.</p>
<h2>Next.js: strengths and trade-offs</h2>
<p>Next.js is a modern framework that renders pages incredibly fast, scores high on Core Web Vitals, and gives developers full control. It's ideal for performance-critical, SEO-focused, or custom applications. The trade-off is that it needs developers to build and maintain — it's not a drag-and-drop tool.</p>
<h2>Which should you choose?</h2>
<ul>
<li><strong>Choose WordPress if:</strong> you need a simple blog or brochure site your team edits daily, on a tight budget.</li>
<li><strong>Choose Next.js if:</strong> speed, SEO, scalability, or custom functionality matter — an online store, a SaaS marketing site, or a lead-generation machine.</li>
</ul>
<p>Many teams get the best of both: a Next.js front end with a headless CMS for easy editing. <a href="/services">See how we build websites</a> or <a href="/contact">ask which fits your project</a>.</p>`,
    ],
    titleAr: "Next.js أم ووردبريس: أيهما الأنسب لموقع شركتك؟",
    excerptAr:
      "مقارنة واضحة وبلا مبالغة بين Next.js وووردبريس — الأداء وSEO والأمان والتكلفة — لمساعدتك على اختيار التقنية الصحيحة.",
    bodyAr: [
      `<p>عند بناء موقع لشركتك، يتلخّص الخيار غالبًا في <strong>Next.js أم ووردبريس</strong>. كلاهما قادر على تقديم موقع رائع — لكنهما يناسبان احتياجات مختلفة تمامًا. إليك مقارنة واضحة تساعدك على القرار بلا مبالغة.</p>
<h2>ووردبريس: نقاط القوة والمقايضات</h2>
<p>يشغّل ووردبريس حصة ضخمة من الويب لأنه مألوف، ويملك آلاف الإضافات، ويتيح للفرق غير التقنية النشر بسهولة. المقايضة في الأداء والأمان: كثرة الإضافات تُبطئ الموقع، والإضافات القديمة أكثر أسباب اختراق المواقع شيوعًا.</p>
<h2>Next.js: نقاط القوة والمقايضات</h2>
<p>Next.js إطار عمل حديث يعرض الصفحات بسرعة فائقة، ويحقق درجات عالية في Core Web Vitals، ويمنح المطورين تحكمًا كاملًا. وهو مثالي للتطبيقات الحساسة للأداء أو المركّزة على SEO أو المخصّصة. المقايضة أنه يحتاج مطورين لبنائه وصيانته — فهو ليس أداة سحب وإفلات.</p>
<h2>أيهما تختار؟</h2>
<ul>
<li><strong>اختر ووردبريس إذا:</strong> كنت تحتاج مدونة بسيطة أو موقعًا تعريفيًا يحرره فريقك يوميًا بميزانية محدودة.</li>
<li><strong>اختر Next.js إذا:</strong> كانت السرعة أو SEO أو قابلية التوسّع أو الوظائف المخصّصة مهمة — متجر إلكتروني، موقع تسويقي لمنتج SaaS، أو آلة لجذب العملاء.</li>
</ul>
<p>كثير من الفرق تحصل على الأفضل من الاثنين: واجهة Next.js مع نظام إدارة محتوى منفصل لسهولة التحرير. <a href="/ar/services">شاهد كيف نبني المواقع</a> أو <a href="/ar/contact">اسألنا أيهما يناسب مشروعك</a>.</p>`,
    ],
    publishedAr: true,
  },
  {
    slug: "ecommerce-ux-mistakes-that-kill-conversions",
    title: "7 E-commerce UX Mistakes That Kill Your Conversion Rate",
    excerpt:
      "You can drive all the traffic in the world to your store, but these seven UX mistakes send shoppers away with a full cart and no order.",
    category: "Design",
    author: "Mohammed",
    date: "2026-05-16",
    readingTime: "7 min",
    published: true,
    body: [
      `<p>You can drive all the traffic in the world to your online store, but if the experience frustrates shoppers they'll leave with a full cart and no order. These are the seven most common <strong>e-commerce UX mistakes</strong> we see killing conversion rates — and how to fix each one.</p>
<h2>1. A slow, heavy storefront</h2>
<p>Every extra second of load time drops conversions. Compress images, lazy-load below the fold, and measure your LCP.</p>
<h2>2. A checkout that asks for too much</h2>
<p>Forcing account creation before purchase is the number-one cause of abandoned carts. Offer guest checkout and keep form fields to the minimum.</p>
<h2>3. Weak product photography</h2>
<p>Shoppers can't touch the product, so images do the selling. Multiple angles, zoom, and real-context photos build trust.</p>
<h2>4. Hidden shipping costs</h2>
<p>Surprise fees at the last step break trust. Show shipping and taxes early — ideally on the product page.</p>
<h2>5. A poor mobile experience</h2>
<p>Most Gulf e-commerce traffic is mobile. Large tap targets, a sticky add-to-cart, and a thumb-friendly checkout are non-negotiable.</p>
<h2>6. No trust signals</h2>
<p>Reviews, secure-payment badges, clear return policies, and a real contact method all reduce purchase anxiety.</p>
<h2>7. Confusing navigation and search</h2>
<p>If shoppers can't find a product in a few taps, they won't buy it. Invest in clear categories and a fast, forgiving search.</p>
<p>Fixing even two or three of these often lifts revenue more than a new ad campaign. <a href="/services">See our UX and e-commerce work</a> or <a href="/contact">get a free UX review</a>.</p>`,
    ],
    titleAr: "7 أخطاء في تجربة المستخدم تقتل معدل التحويل في متجرك الإلكتروني",
    excerptAr:
      "يمكنك جلب كل الزيارات إلى متجرك، لكن هذه الأخطاء السبعة في تجربة المستخدم تجعل المتسوّقين يغادرون بسلة ممتلئة دون طلب.",
    bodyAr: [
      `<p>يمكنك جلب كل الزيارات إلى متجرك الإلكتروني، لكن إن كانت التجربة تُحبط المتسوّقين فسيغادرون بسلة ممتلئة دون طلب. إليك أكثر سبع <strong>أخطاء في تجربة المستخدم</strong> نراها تقتل معدلات التحويل — وكيفية إصلاح كل منها.</p>
<h2>1. متجر بطيء وثقيل</h2>
<p>كل ثانية إضافية في وقت التحميل تخفض التحويلات. اضغط الصور، وحمّل ما تحت الطية بشكل مؤجل، وقِس مؤشر LCP.</p>
<h2>2. إتمام شراء يطلب الكثير</h2>
<p>إجبار المستخدم على إنشاء حساب قبل الشراء هو السبب الأول لهجر السلة. أتِح الشراء كضيف واختصر حقول النموذج للحد الأدنى.</p>
<h2>3. صور منتجات ضعيفة</h2>
<p>لا يستطيع المتسوّق لمس المنتج، فالصور هي من تبيع. زوايا متعددة، وتكبير، وصور بسياق واقعي تبني الثقة.</p>
<h2>4. تكاليف شحن مخفية</h2>
<p>الرسوم المفاجئة في الخطوة الأخيرة تكسر الثقة. أظهر الشحن والضرائب مبكرًا — ويفضّل في صفحة المنتج.</p>
<h2>5. تجربة جوال رديئة</h2>
<p>معظم زيارات التجارة الإلكترونية في الخليج من الجوال. أزرار كبيرة قابلة للنقر، وزر إضافة للسلة ثابت، وإتمام شراء ملائم للإبهام — أمور غير قابلة للتنازل.</p>
<h2>6. غياب إشارات الثقة</h2>
<p>التقييمات، وشارات الدفع الآمن، وسياسات إرجاع واضحة، ووسيلة تواصل حقيقية — كلها تقلّل قلق الشراء.</p>
<h2>7. تنقّل وبحث مربكان</h2>
<p>إن لم يجد المتسوّق المنتج في نقرات قليلة فلن يشتريه. استثمر في تصنيفات واضحة وبحث سريع ومتسامح مع الأخطاء.</p>
<p>إصلاح خطأين أو ثلاثة من هذه غالبًا يرفع الإيرادات أكثر من حملة إعلانية جديدة. <a href="/ar/services">شاهد أعمالنا في تجربة المستخدم والتجارة الإلكترونية</a> أو <a href="/ar/contact">احصل على مراجعة UX مجانية</a>.</p>`,
    ],
    publishedAr: true,
  },
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
  {
    slug: "draglab-germany",
    client: "DragLab Germany",
    title: "Production-grade B2B platform for a laboratory equipment manufacturer",
    industry: "B2B / Lab Equipment",
    services: ["Web Development", "UI/UX Design", "SEO", "Analytics & Reporting"],
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
    pairsWith: ["ui-ux-design", "seo", "analytics-reporting"],
    nameAr: "تطوير المواقع الإلكترونية", shortAr: "مواقع سريعة وسهلة الوصول مبنية بـ Next.js ومُحسَّنة للتحويل.", valueAr: "مواقع تسويقية وتطبيقات ويب بجودة إنتاجية — مُهنْدَسة للسرعة والسيو والتوسع.",
    deliverablesAr: ["تطوير بـ Next.js 14 App Router مع TypeScript من البداية للنهاية", "نظام CMS مخصص (Sanity أو Payload أو MDX) مرتبط بسير عملك", "تنفيذ متجاوب ودقيق البكسل من تصاميم Figma", "أهداف Core Web Vitals: LCP أقل من 2.0s، CLS أقل من 0.1", "نشر على Vercel مع روابط معاينة لكل فرع"],
    processAr: [{ step: "الاستكشاف", detail: "المتطلبات، تدقيق تقني، مقاييس النجاح." }, { step: "التصميم", detail: "إطارات سلكية، مكتبة مكونات، نماذج أولية." }, { step: "البناء", detail: "سبرينتات مع روابط تدريجية، ضمان جودة في كل دورة." }, { step: "الإطلاق", detail: "DNS، تحليلات، اختبار الأداء، الإطلاق الرسمي." }],
    faqsAr: [{ q: "كم يستغرق بناء الموقع عادةً؟", a: "من 4 إلى 10 أسابيع حسب عدد الصفحات والتكاملات وعمق نظام CMS." }, { q: "هل تعملون على قواعد أكواد موجودة؟", a: "نعم. نقوم بالتدقيق، وإعادة الهيكلة، أو إعادة البناء — أيًا كان الأكثر قيمة." }],
  },
  {
    slug: "mobile-app-development", name: "Mobile App Development", short: "Native-feeling iOS and Android apps from a single codebase.", value: "Cross-platform mobile apps built with React Native or native Swift/Kotlin when it matters.", iconName: "Smartphone", order: 2,
    deliverables: ["iOS + Android from one React Native codebase", "Native modules when performance demands it", "App Store + Play Store submission support", "Push notifications, analytics, crash reporting", "OTA updates via Expo or CodePush"],
    process: [{ step: "Discover", detail: "User flows, device targets, MVP scope." }, { step: "Design", detail: "Native UX patterns, prototypes on-device." }, { step: "Build", detail: "Biweekly TestFlight / internal track builds." }, { step: "Launch", detail: "Store submission, rollout, post-launch tuning." }],
    tools: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Sentry"],
    faqs: [{ q: "React Native or fully native?", a: "React Native by default -- it ships faster. We go native when hardware or perf demands it." }, { q: "Do you handle App Store submissions?", a: "Yes -- including review responses and post-launch updates." }],
    pairsWith: ["ui-ux-design", "analytics-reporting", "web-development"],
    nameAr: "تطوير تطبيقات الجوال", shortAr: "تطبيقات iOS وAndroid بتجربة أصلية من قاعدة كود واحدة.", valueAr: "تطبيقات جوال متعددة المنصات مبنية بـ React Native أو Swift/Kotlin الأصلي عند الحاجة.",
    deliverablesAr: ["iOS وAndroid من قاعدة كود React Native واحدة", "وحدات أصلية عند مطالبات الأداء", "دعم تقديم التطبيق إلى App Store وPlay Store", "إشعارات الدفع، التحليلات، تقارير الأعطال", "تحديثات OTA عبر Expo أو CodePush"],
    processAr: [{ step: "الاستكشاف", detail: "تدفقات المستخدم، الأجهزة المستهدفة، نطاق MVP." }, { step: "التصميم", detail: "أنماط UX الأصلية، نماذج أولية على الجهاز." }, { step: "البناء", detail: "إصدارات TestFlight / internal track كل أسبوعين." }, { step: "الإطلاق", detail: "تقديم المتجر، الطرح، ضبط ما بعد الإطلاق." }],
    faqsAr: [{ q: "React Native أم أصلي بالكامل؟", a: "React Native افتراضيًا — يُشحن أسرع. نلجأ للأصلي عند مطالبات الأجهزة أو الأداء." }, { q: "هل تتولون تقديم التطبيق إلى المتاجر؟", a: "نعم — بما يشمل الردود على المراجعات والتحديثات اللاحقة للإطلاق." }],
  },
  {
    slug: "ui-ux-design", name: "Custom UI/UX Design", short: "Design systems and interfaces that look right and work harder.", value: "From wireframes to a production-ready component library -- crafted in Figma, built for devs.", iconName: "Palette", order: 3,
    deliverables: ["Discovery research, user flows, information architecture", "Low and high-fidelity Figma prototypes", "Design system with tokens, components, documentation", "Accessibility audit (WCAG 2.1 AA baseline)", "Handoff with developer-ready specs and assets"],
    process: [{ step: "Discover", detail: "Stakeholder interviews, competitive audit, goals." }, { step: "Define", detail: "User flows, IA, content strategy." }, { step: "Design", detail: "Wireframes to hi-fi to prototypes." }, { step: "Deliver", detail: "Component library, dev handoff, QA." }],
    tools: ["Figma", "Framer", "Principle", "Maze", "Lottie"],
    faqs: [{ q: "Do you handle brand design too?", a: "Digital brand work, yes -- logos, type systems, UI kits. Full identity is case-by-case." }, { q: "Will I get a design system?", a: "Yes -- tokens, components, and documentation your team can extend." }],
    pairsWith: ["web-development", "mobile-app-development", "content-creation"],
    nameAr: "تصميم UI/UX مخصص", shortAr: "أنظمة تصميم وواجهات تبدو صحيحة وتعمل بكفاءة أعلى.", valueAr: "من الإطارات السلكية إلى مكتبة مكونات جاهزة للإنتاج — مصنوعة في Figma، مبنية للمطورين.",
    deliverablesAr: ["بحث استكشافي، تدفقات المستخدم، هندسة المعلومات", "نماذج Figma منخفضة وعالية الدقة", "نظام تصميم بالرموز والمكونات والتوثيق", "تدقيق إمكانية الوصول (معيار WCAG 2.1 AA كحد أدنى)", "تسليم مع مواصفات جاهزة للمطورين والأصول"],
    processAr: [{ step: "الاستكشاف", detail: "مقابلات أصحاب المصلحة، تدقيق تنافسي، الأهداف." }, { step: "التحديد", detail: "تدفقات المستخدم، هندسة المعلومات، استراتيجية المحتوى." }, { step: "التصميم", detail: "من الإطارات السلكية إلى التصاميم عالية الدقة والنماذج الأولية." }, { step: "التسليم", detail: "مكتبة مكونات، تسليم للمطورين، ضمان الجودة." }],
    faqsAr: [{ q: "هل تتولون تصميم الهوية التجارية أيضًا؟", a: "العلامة التجارية الرقمية، نعم — شعارات، أنظمة خطوط، مجموعات UI. الهوية الكاملة تُدرس حالة بحالة." }, { q: "هل سأحصل على نظام تصميم؟", a: "نعم — رموز ومكونات وتوثيق يمكن لفريقك توسيعه." }],
  },
  {
    slug: "seo", name: "Search Engine Optimization", short: "Technical and content SEO that compounds month over month.", value: "Earn traffic that converts. Technical audits, content strategy, and link execution that move rankings.", iconName: "Search", order: 4,
    deliverables: ["Technical audit: crawl, index, schema, Core Web Vitals", "Keyword research + content roadmap (quarterly)", "On-page optimization across top revenue pages", "Internal linking architecture", "Monthly ranking, traffic, and conversion reports"],
    process: [{ step: "Audit", detail: "Crawl, benchmark, find the quick wins." }, { step: "Strategy", detail: "Keyword clusters mapped to funnel." }, { step: "Execute", detail: "Technical fixes, new content, link work." }, { step: "Measure", detail: "Monthly reports tied to revenue." }],
    tools: ["Ahrefs", "Search Console", "Screaming Frog", "Looker Studio"],
    faqs: [{ q: "How long until I see results?", a: "Technical wins land in weeks. Content and authority compound over 3-6 months." }, { q: "Do you write the content?", a: "Yes -- or we partner with your team. Either way, briefs are SEO-first." }],
    pairsWith: ["web-development", "content-creation", "analytics-reporting"],
    nameAr: "تحسين محركات البحث", shortAr: "سيو تقني ومحتوى يتراكم شهرًا بعد شهر.", valueAr: "اكسب حركة مرور تُحوَّل. تدقيقات تقنية، استراتيجية محتوى، وتنفيذ روابط تحرك التصنيفات.",
    deliverablesAr: ["تدقيق تقني: الزحف، الفهرسة، البيانات المنظمة، Core Web Vitals", "بحث كلمات مفتاحية + خارطة طريق محتوى (ربع سنوي)", "تحسين الصفحات على أعلى الصفحات المُدرَّة للإيرادات", "هيكل الروابط الداخلية", "تقارير شهرية للتصنيف والحركة والتحويل"],
    processAr: [{ step: "التدقيق", detail: "الزحف، قياس الأداء، إيجاد المكاسب السريعة." }, { step: "الاستراتيجية", detail: "مجموعات كلمات مفتاحية مرسمة على مسار التحويل." }, { step: "التنفيذ", detail: "إصلاحات تقنية، محتوى جديد، بناء روابط." }, { step: "القياس", detail: "تقارير شهرية مرتبطة بالإيرادات." }],
    faqsAr: [{ q: "متى أرى النتائج؟", a: "المكاسب التقنية تظهر خلال أسابيع. المحتوى والسلطة يتراكمان على مدى 3-6 أشهر." }, { q: "هل تكتبون المحتوى؟", a: "نعم — أو نتعاون مع فريقك. في كلتا الحالتين، الإحاطات تُعطي الأولوية للسيو." }],
  },
  {
    slug: "social-media-management", name: "Social Media Management", short: "On-brand, always-on social that builds trust and pipeline.", value: "Strategy, content calendar, and community -- executed weekly across the platforms that matter for you.", iconName: "Megaphone", order: 5,
    deliverables: ["Channel strategy tailored to audience and goals", "Weekly content calendar with creative briefs", "Post scheduling and publishing", "Community responses within 24 hours", "Monthly performance report"],
    process: [{ step: "Audit", detail: "Current channels, audience, competitors." }, { step: "Strategy", detail: "Pillars, tone, posting cadence." }, { step: "Produce", detail: "Content designed, written, scheduled." }, { step: "Grow", detail: "Engagement, iterate, scale what works." }],
    tools: ["Buffer", "Later", "Canva", "Figma", "Notion"],
    faqs: [{ q: "Which platforms do you cover?", a: "LinkedIn, Instagram, X, TikTok, YouTube Shorts, Threads." }, { q: "Do you produce video?", a: "Short-form, yes. Longer productions through our content arm." }],
    pairsWith: ["content-creation", "paid-advertising", "community-management"],
    nameAr: "إدارة وسائل التواصل الاجتماعي", shortAr: "تواجد اجتماعي متوافق مع علامتك، دائم الحضور، يبني الثقة والجمهور.", valueAr: "استراتيجية، تقويم محتوى، ومجتمع — تُنفَّذ أسبوعيًا عبر المنصات التي تهمك.",
    deliverablesAr: ["استراتيجية قنوات مُكيَّفة مع الجمهور والأهداف", "تقويم محتوى أسبوعي مع إحاطات إبداعية", "جدولة المنشورات ونشرها", "ردود على المجتمع خلال 24 ساعة", "تقرير أداء شهري"],
    processAr: [{ step: "التدقيق", detail: "القنوات الحالية، الجمهور، المنافسون." }, { step: "الاستراتيجية", detail: "المحاور، النبرة، إيقاع النشر." }, { step: "الإنتاج", detail: "محتوى مصمم ومكتوب ومجدول." }, { step: "النمو", detail: "التفاعل، التكرار، تكثيف ما يناسب." }],
    faqsAr: [{ q: "ما المنصات التي تغطونها؟", a: "LinkedIn، Instagram، X، TikTok، YouTube Shorts، Threads." }, { q: "هل تنتجون محتوى فيديو؟", a: "الفيديو القصير، نعم. الإنتاجات الأطول عبر ذراع المحتوى لدينا." }],
  },
  {
    slug: "content-creation", name: "Content Creation", short: "Writing, design, and video that earns attention and trust.", value: "Long-form articles, short-form social creative, and video -- produced to a brief and a deadline.", iconName: "FileText", order: 6,
    deliverables: ["Content strategy aligned to SEO and social goals", "Long-form articles, case studies, landing page copy", "Social graphics and short-form video", "Editorial calendar, SEO briefs, keyword mapping", "Source interviews and subject-matter reviews"],
    process: [{ step: "Plan", detail: "Calendar, briefs, keyword targets." }, { step: "Produce", detail: "Drafts, design, edits, approvals." }, { step: "Publish", detail: "CMS, social, distribution channels." }, { step: "Iterate", detail: "Performance review, refresh, repurpose." }],
    tools: ["Notion", "Frase", "Grammarly", "Descript", "Figma"],
    faqs: [{ q: "Who writes the content?", a: "Specialist writers paired with subject-matter reviewers -- never generic AI output." }, { q: "Do you handle video?", a: "Short-form social video, product walkthroughs, and edits of existing footage." }],
    pairsWith: ["seo", "social-media-management", "ui-ux-design"],
    nameAr: "إنشاء المحتوى", shortAr: "كتابة وتصميم وفيديو يكسبان الانتباه والثقة.", valueAr: "مقالات طويلة، مقاطع اجتماعية قصيرة، وفيديو — مُنتَجة وفق إحاطة وموعد نهائي.",
    deliverablesAr: ["استراتيجية محتوى متوافقة مع أهداف السيو والسوشيال", "مقالات طويلة، دراسات حالة، نصوص صفحات الهبوط", "رسومات اجتماعية وفيديو قصير", "تقويم تحريري، إحاطات سيو، خرائط كلمات مفتاحية", "مقابلات مصادر ومراجعات متخصصة"],
    processAr: [{ step: "التخطيط", detail: "التقويم، الإحاطات، أهداف الكلمات المفتاحية." }, { step: "الإنتاج", detail: "مسودات، تصميم، تحرير، موافقات." }, { step: "النشر", detail: "CMS، سوشيال، قنوات التوزيع." }, { step: "التكرار", detail: "مراجعة الأداء، التحديث، إعادة الاستخدام." }],
    faqsAr: [{ q: "من يكتب المحتوى؟", a: "كتّاب متخصصون بجانب مراجعين متخصصين في الموضوع — لا ناتج AI عام أبدًا." }, { q: "هل تتولون الفيديو؟", a: "فيديو سوشيال قصير، جولات تعريفية بالمنتج، وتحرير اللقطات الموجودة." }],
  },
  {
    slug: "community-management", name: "Community Management", short: "Respond, moderate, and grow -- like a team member who never sleeps.", value: "Real humans responding in your voice, building loyalty across every comment thread and DM.", iconName: "Users", order: 7,
    deliverables: ["Response SLA: under 4 hours during business hours", "Tone and escalation playbooks", "Moderation and spam removal", "Insights reports on sentiment and common questions", "FAQ library to reduce repeat tickets"],
    process: [{ step: "Onboard", detail: "Voice guide, escalation paths, tools." }, { step: "Monitor", detail: "Inbox and mentions watched continuously." }, { step: "Respond", detail: "Thoughtful replies, not templates." }, { step: "Report", detail: "Monthly themes, risks, opportunities." }],
    tools: ["Sprout", "Sprinklr", "Discord", "Intercom"],
    faqs: [{ q: "What hours do you cover?", a: "Standard is 9-6 local. Extended and weekend coverage available." }, { q: "Do you run Discord or Slack communities?", a: "Yes -- moderation, onboarding, events, and reporting." }],
    pairsWith: ["social-media-management", "content-creation", "analytics-reporting"],
    nameAr: "إدارة المجتمع", shortAr: "ردود واعتدال ونمو — كعضو فريق لا ينام أبدًا.", valueAr: "بشر حقيقيون يردون بصوتك، يبنون الولاء عبر كل خيط تعليقات وصندوق رسائل.",
    deliverablesAr: ["SLA للردود: أقل من 4 ساعات خلال ساعات العمل", "دلائل النبرة وطرق التصعيد", "الاعتدال وإزالة السبام", "تقارير رؤى حول المشاعر والأسئلة الشائعة", "مكتبة أسئلة شائعة لتقليل التذاكر المتكررة"],
    processAr: [{ step: "الانطلاق", detail: "دليل الصوت، مسارات التصعيد، الأدوات." }, { step: "المراقبة", detail: "صندوق الوارد والإشارات تحت المراقبة المستمرة." }, { step: "الرد", detail: "ردود متأنية، لا قوالب جاهزة." }, { step: "التقرير", detail: "موضوعات شهرية، مخاطر، فرص." }],
    faqsAr: [{ q: "ما ساعات التغطية؟", a: "القياسية 9-6 بالتوقيت المحلي. التغطية الممتدة وعطلة نهاية الأسبوع متاحة." }, { q: "هل تديرون مجتمعات Discord أو Slack؟", a: "نعم — اعتدال، إدماج، فعاليات، وتقارير." }],
  },
  {
    slug: "analytics-reporting", name: "Analytics & Reporting", short: "Clean data pipelines and dashboards that actually get read.", value: "Event tracking, dashboards, and monthly narrative reports -- so every decision has numbers behind it.", iconName: "BarChart3", order: 8,
    deliverables: ["GA4 + server-side tagging setup", "Custom event schema and conversion tracking", "Looker Studio or Metabase dashboards", "Funnel analysis and drop-off insights", "Monthly narrative report with recommendations"],
    process: [{ step: "Audit", detail: "Current tracking, data quality, gaps." }, { step: "Implement", detail: "Events, conversions, pipelines." }, { step: "Visualize", detail: "Dashboards tuned to decisions you make." }, { step: "Report", detail: "Monthly read-outs with next actions." }],
    tools: ["GA4", "GTM", "Looker Studio", "Metabase", "Mixpanel", "Segment"],
    faqs: [{ q: "Can you migrate from UA?", a: "Yes -- and we document every event so the new schema stays clean." }, { q: "Do you build dashboards?", a: "Yes -- in whatever tool your team already uses." }],
    pairsWith: ["seo", "paid-advertising", "web-development"],
    nameAr: "التحليلات والتقارير", shortAr: "خطوط بيانات نظيفة ولوحات معلومات تُقرأ فعلًا.", valueAr: "تتبع الأحداث، لوحات المعلومات، وتقارير سردية شهرية — حتى تكون كل قرار له أرقام خلفه.",
    deliverablesAr: ["إعداد GA4 مع الوسم من جانب الخادم", "مخطط أحداث مخصص وتتبع التحويل", "لوحات Looker Studio أو Metabase", "تحليل مسار التحويل ورؤى نقاط التراجع", "تقرير سردي شهري مع توصيات"],
    processAr: [{ step: "التدقيق", detail: "التتبع الحالي، جودة البيانات، الفجوات." }, { step: "التنفيذ", detail: "الأحداث، التحويلات، خطوط الأنابيب." }, { step: "التصور", detail: "لوحات معلومات مُوجَّهة للقرارات التي تتخذها." }, { step: "التقرير", detail: "قراءات شهرية مع الخطوات التالية." }],
    faqsAr: [{ q: "هل تستطيعون الترحيل من UA؟", a: "نعم — ونوثق كل حدث حتى يبقى المخطط الجديد نظيفًا." }, { q: "هل تبنون لوحات المعلومات؟", a: "نعم — في أي أداة يستخدمها فريقك بالفعل." }],
  },
  {
    slug: "paid-advertising", name: "Paid Advertising", short: "Meta, Google, LinkedIn, and TikTok ads managed for ROAS.", value: "Creative, campaign structure, and budget discipline -- tuned weekly against the metric that matters.", iconName: "Activity", order: 9,
    deliverables: ["Channel strategy: Meta, Google, LinkedIn, TikTok, YouTube", "Creative production and testing framework", "Landing pages aligned to ad intent", "Weekly budget pacing and optimization", "Monthly ROAS report with next-cycle plan"],
    process: [{ step: "Plan", detail: "Targets, channels, budgets, creative angles." }, { step: "Launch", detail: "Campaign builds, pixels, conversions wired." }, { step: "Optimize", detail: "Weekly review, reallocate, kill underperformers." }, { step: "Scale", detail: "Double down on winners, test new angles." }],
    tools: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok Ads", "Triple Whale"],
    faqs: [{ q: "What is the minimum ad spend?", a: "We recommend $5k/month media to see signal -- lower is possible case-by-case." }, { q: "Do you produce ad creative?", a: "Yes -- static, motion, and short-form video briefed against performance hypotheses." }],
    pairsWith: ["analytics-reporting", "content-creation", "web-development"],
    nameAr: "الإعلانات المدفوعة", shortAr: "إعلانات Meta وGoogle وLinkedIn وTikTok مُدارة لتحقيق ROAS.", valueAr: "إبداع، هيكل حملات، وانضباط ميزانية — مُضبَط أسبوعيًا وفق المقياس الذي يهم.",
    deliverablesAr: ["استراتيجية قنوات: Meta، Google، LinkedIn، TikTok، YouTube", "إنتاج إبداعي وإطار اختبار", "صفحات هبوط متوافقة مع نية الإعلان", "ضبط الميزانية وتحسينها أسبوعيًا", "تقرير ROAS شهري مع خطة الدورة التالية"],
    processAr: [{ step: "التخطيط", detail: "الأهداف، القنوات، الميزانيات، الزوايا الإبداعية." }, { step: "الإطلاق", detail: "بناء الحملات، البكسل، التحويلات مُوصَّلة." }, { step: "التحسين", detail: "مراجعة أسبوعية، إعادة التوزيع، إيقاف ضعاف الأداء." }, { step: "التوسع", detail: "مضاعفة الفائزين، اختبار زوايا جديدة." }],
    faqsAr: [{ q: "ما الحد الأدنى للإنفاق على الإعلانات؟", a: "نوصي بـ 5000 دولار شهريًا على الوسائط لرؤية إشارة — أقل منه ممكن حالة بحالة." }, { q: "هل تنتجون إبداعات الإعلانات؟", a: "نعم — ثابتة، متحركة، وفيديو قصير مُحدَّد وفق فرضيات الأداء." }],
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
