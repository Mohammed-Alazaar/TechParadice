export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: 'Web' | 'Design' | 'Growth' | 'Engineering'
  author: string
  date: string
  readingTime: string
  body: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'shipping-faster-with-senior-teams',
    title: 'Why small senior teams ship faster than big generalist ones',
    excerpt:
      'Agency scale doesn’t make you faster — it makes you slower. Here’s the math on why a small senior team compounds.',
    category: 'Growth',
    author: 'Mohammed',
    date: '2026-04-10',
    readingTime: '6 min',
    body: [
      'Every founder has had the same experience: you hire a big agency expecting horsepower, and what you get is five people in Slack waiting on each other.',
      'The math is simple. Coordination overhead grows quadratically with team size. With three senior people, you have three communication edges. With nine people, you have thirty-six. That’s not 3× the overhead — it’s 12×.',
      'Senior specialists also compress the decision loop. A junior designer needs a review. A senior designer makes the call. A junior engineer needs architecture guidance. A senior engineer has opinions and evidence. Every removed approval step is a day saved.',
      'This is why TechParadice runs lean. A founder-led core, a vetted network, and zero junior-shadow layers. We’d rather ship a Wednesday than have a meeting about Wednesday.',
    ],
  },
  {
    slug: 'web-vitals-that-actually-matter',
    title: 'The three Web Vitals that actually move revenue',
    excerpt:
      'Not every Core Web Vital matters equally. Here’s which ones correlate with conversion — and which are vanity.',
    category: 'Engineering',
    author: 'Mohammed',
    date: '2026-03-22',
    readingTime: '8 min',
    body: [
      'Google publishes Core Web Vitals. Every SEO audit cites them. But if you dig into real e-commerce data, only two of the three correlate tightly with conversion.',
      'LCP matters because it’s the moment the user can read and tap. CLS matters because layout shifts break mobile taps and frustrate checkout. INP matters because slow interactions feel broken.',
      'FCP and TTFB show up on dashboards but rarely drive dollars. Optimize the first three relentlessly, and stop stressing the rest.',
    ],
  },
  {
    slug: 'the-slash-as-a-brand-device',
    title: 'The slash as a brand device — why a single character does the work',
    excerpt:
      'A good brand signature is a shortcut. The TechParadice slash earns its keep in four ways.',
    category: 'Design',
    author: 'Mohammed',
    date: '2026-02-18',
    readingTime: '4 min',
    body: [
      'Great brands compress meaning into a single repeatable gesture. Nike’s swoosh. Apple’s apple. TechParadice has the slash.',
      'The slash divides the word. That divide is the point — it’s the contrast between tech (hard, bold) and paradice (soft, faded). It becomes a visual rhythm you can reuse everywhere.',
      'On section breaks, meta separators, testimonial attributions — the slash stitches the brand together without a single extra logo.',
      'The lesson: if your brand has a repeatable mark that can live alone, you’ve built something durable. If every layout needs the full wordmark to feel like you, you haven’t.',
    ],
  },
]

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}
