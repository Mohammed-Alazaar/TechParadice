import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'

// AI crawlers/agents that fetch content for chat answers, search summaries,
// and "recommend a provider" style responses. Explicitly allow them so it's
// clear intent (the wildcard rule below already permits them, but being
// explicit protects us if any of these ever ship a default-deny posture).
const aiUserAgents = [
  'GPTBot', // OpenAI (ChatGPT training/browsing)
  'ChatGPT-User', // OpenAI (ChatGPT live browsing)
  'OAI-SearchBot', // OpenAI (ChatGPT search)
  'ClaudeBot', // Anthropic (Claude web crawl)
  'Claude-Web', // Anthropic (Claude live browsing)
  'anthropic-ai', // Anthropic
  'PerplexityBot', // Perplexity
  'Perplexity-User', // Perplexity live browsing
  'Google-Extended', // Google (Gemini / AI Overviews training)
  'GoogleOther', // Google (misc AI/search crawl)
  'Applebot', // Apple (Siri / Spotlight)
  'Applebot-Extended', // Apple (Apple Intelligence training)
  'Bingbot', // Microsoft Bing / Copilot
  'meta-externalagent', // Meta AI
  'Amazonbot', // Amazon (Alexa+)
  'DuckAssistBot', // DuckDuckGo AI
  'CCBot', // Common Crawl (feeds many LLM training sets)
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      ...aiUserAgents.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/admin/', '/api/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
