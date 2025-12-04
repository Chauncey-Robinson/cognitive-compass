import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { AI_NEWS_SOURCES, AI_KEYWORDS, type NewsSource } from "./aiNewsSources.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RawArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sourceCategory: "Tech" | "Policy" | "Research" | "Industry" | "Risk";
}

interface BriefItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  tag: "Tech" | "Policy" | "Research" | "Industry" | "Risk";
  summary: string;
  impact: string;
}

interface ExecutiveBrief {
  generatedAt: string;
  timeRange: string;
  items: BriefItem[];
  rejectedCount: number;
  sourcesUsed: string[];
}

// Parse RSS XML to extract articles
function parseRSS(xml: string, sourceName: string, sourceCategory: NewsSource["category"]): RawArticle[] {
  const articles: RawArticle[] = [];
  
  // Extract items using regex (Deno edge functions don't have DOMParser)
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  const titleRegex = /<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i;
  const linkRegex = /<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i;
  const descRegex = /<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i;
  const pubDateRegex = /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i;
  
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    
    const titleMatch = titleRegex.exec(itemContent);
    const linkMatch = linkRegex.exec(itemContent);
    const descMatch = descRegex.exec(itemContent);
    const pubDateMatch = pubDateRegex.exec(itemContent);
    
    if (titleMatch && linkMatch) {
      const title = titleMatch[1].trim().replace(/<[^>]*>/g, '');
      const url = linkMatch[1].trim();
      const description = descMatch ? descMatch[1].trim().replace(/<[^>]*>/g, '').slice(0, 500) : '';
      const publishedAt = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();
      
      articles.push({
        title,
        description,
        url,
        publishedAt,
        source: sourceName,
        sourceCategory
      });
    }
  }
  
  return articles;
}

// STAGE 1: Fetch articles from all sources
async function fetchArticles(daysBack: number): Promise<{ articles: RawArticle[], sourcesUsed: string[] }> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);
  
  const sourcesUsed: string[] = [];
  const allArticles: RawArticle[] = [];
  
  const fetchPromises = AI_NEWS_SOURCES.map(async (source) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(source.url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; OxfordIntelligence/1.0)"
        }
      });
      clearTimeout(timeout);
      
      if (!response.ok) {
        console.log(`Failed to fetch ${source.name}: ${response.status}`);
        return [];
      }
      
      const text = await response.text();
      const articles = parseRSS(text, source.name, source.category);
      
      // Filter by date and limit
      const filtered = articles
        .filter(a => {
          try {
            const pubDate = new Date(a.publishedAt);
            return pubDate >= cutoffDate;
          } catch {
            return true; // Include if date parsing fails
          }
        })
        .slice(0, source.maxItems);
      
      if (filtered.length > 0) {
        sourcesUsed.push(source.name);
      }
      
      return filtered;
    } catch (error) {
      console.log(`Error fetching ${source.name}:`, error);
      return [];
    }
  });
  
  const results = await Promise.all(fetchPromises);
  results.forEach(articles => allArticles.push(...articles));
  
  return { articles: allArticles, sourcesUsed };
}

// STAGE 2: Deduplicate articles
function dedupeArticles(articles: RawArticle[]): { deduped: RawArticle[], removedCount: number } {
  const seen = new Set<string>();
  const deduped: RawArticle[] = [];
  let removedCount = 0;
  
  for (const article of articles) {
    // Check for same URL
    if (seen.has(article.url)) {
      removedCount++;
      continue;
    }
    
    // Check for similar titles (simple fuzzy match)
    const normalizedTitle = article.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    let isDuplicate = false;
    
    for (const existingUrl of seen) {
      const existing = deduped.find(a => a.url === existingUrl);
      if (existing) {
        const existingNormalized = existing.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        // If titles share 80% of characters, consider duplicate
        const similarity = calculateSimilarity(normalizedTitle, existingNormalized);
        if (similarity > 0.8) {
          isDuplicate = true;
          removedCount++;
          break;
        }
      }
    }
    
    if (!isDuplicate) {
      seen.add(article.url);
      deduped.push(article);
    }
  }
  
  return { deduped, removedCount };
}

function calculateSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  
  if (longer.length === 0) return 1;
  
  // Simple character overlap ratio
  let matches = 0;
  for (const char of shorter) {
    if (longer.includes(char)) matches++;
  }
  
  return matches / longer.length;
}

// STAGE 3: Filter for AI-related content
function filterAIContent(articles: RawArticle[]): { filtered: RawArticle[], removedCount: number } {
  const filtered: RawArticle[] = [];
  let removedCount = 0;
  
  for (const article of articles) {
    const searchText = `${article.title} ${article.description}`.toLowerCase();
    const isAIRelated = AI_KEYWORDS.some(keyword => searchText.includes(keyword.toLowerCase()));
    
    if (isAIRelated) {
      filtered.push(article);
    } else {
      removedCount++;
    }
  }
  
  return { filtered, removedCount };
}

// STAGE 4: Rank articles using LLM
async function rankArticles(articles: RawArticle[], maxArticles: number): Promise<RawArticle[]> {
  if (articles.length <= maxArticles) {
    return articles;
  }
  
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    console.log("No LOVABLE_API_KEY, returning first N articles");
    return articles.slice(0, maxArticles);
  }
  
  // Prepare candidates list
  const candidates = articles.map((a, i) => `${i + 1}. "${a.title}" (${a.source})`).join("\n");
  
  const prompt = `You are helping senior executives make AI strategy decisions.

Here are ${articles.length} recent AI news headlines. Select the top ${maxArticles} that would matter most to C-suite executives making AI adoption and strategy decisions.

Focus on:
- Major AI product launches or company announcements
- Significant AI policy or regulation news
- Important AI research breakthroughs
- Industry trends affecting business strategy
- AI risks or safety developments

Headlines:
${candidates}

Return ONLY a comma-separated list of numbers (e.g., "1, 3, 5, 7, 9"). Nothing else.`;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 100,
      }),
    });
    
    if (!response.ok) {
      console.log("LLM ranking failed, using default order");
      return articles.slice(0, maxArticles);
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse the numbers
    const numbers = content.match(/\d+/g)?.map(Number) || [];
    const selected: RawArticle[] = [];
    
    for (const num of numbers) {
      if (num >= 1 && num <= articles.length && selected.length < maxArticles) {
        const article = articles[num - 1];
        if (!selected.includes(article)) {
          selected.push(article);
        }
      }
    }
    
    // Fill remaining slots if needed
    for (const article of articles) {
      if (selected.length >= maxArticles) break;
      if (!selected.includes(article)) {
        selected.push(article);
      }
    }
    
    return selected;
  } catch (error) {
    console.log("Ranking error:", error);
    return articles.slice(0, maxArticles);
  }
}

// CONFIG: Default limits
const MAX_ARTICLES_DEFAULT = 20;
const MAX_ARTICLE_AGE_DAYS_DEFAULT = 14;

// STAGE 5: Summarize and tag articles
async function summarizeArticles(articles: RawArticle[]): Promise<BriefItem[]> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    // Return basic items without summaries
    return articles.map((a, i) => ({
      id: `brief-${i}-${Date.now()}`,
      title: a.title,
      source: a.source,
      url: a.url,
      publishedAt: a.publishedAt,
      tag: a.sourceCategory,
      summary: a.description.slice(0, 200) + "...",
      impact: "AI developments continue to reshape business strategies."
    }));
  }
  
  const results: BriefItem[] = [];
  
  // Process in batches of 3 for efficiency
  const batchSize = 3;
  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (article, idx) => {
      const prompt = `You are an expert AI Research Analyst and Tech Reporter. Analyze the content provided. Determine if it is General Industry News or an Academic/Technical Paper.

If General News: Summarize the key event, the companies involved, and the strategic implications for the AI industry.

If Academic Research (e.g., ArXiv, University Blog): Identify the Core Problem being solved, the Methodology/Architecture used (e.g., Transformer, Diffusion), and the Key Results (state-of-the-art improvements).

Keep all summaries concise, objective, and technical. Avoid marketing fluff. Write at a 6th-grade reading level where possible.

Title: ${article.title}
Source: ${article.source}
Description: ${article.description}

Respond in this exact JSON format:
{
  "summary": "2-3 sentence summary following the guidelines above",
  "impact": "1 sentence on why this matters for business leaders",
  "tag": "one of: Tech, Policy, Research, Industry, Risk"
}`;

      try {
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "user", content: prompt }
            ],
            max_tokens: 300,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`LLM request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";
        
        // Extract JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            id: `brief-${i + idx}-${Date.now()}`,
            title: article.title,
            source: article.source,
            url: article.url,
            publishedAt: article.publishedAt,
            tag: parsed.tag || article.sourceCategory,
            summary: parsed.summary || article.description.slice(0, 200),
            impact: parsed.impact || "This development may affect AI strategy decisions."
          };
        }
      } catch (error) {
        console.log(`Summarize error for "${article.title}":`, error);
      }
      
      // Fallback
      return {
        id: `brief-${i + idx}-${Date.now()}`,
        title: article.title,
        source: article.source,
        url: article.url,
        publishedAt: article.publishedAt,
        tag: article.sourceCategory,
        summary: article.description.slice(0, 200) || "Summary unavailable.",
        impact: "AI developments continue to evolve rapidly."
      };
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  return results;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const range = url.searchParams.get("range") || "7d";
    const max = parseInt(url.searchParams.get("max") || "10", 10);
    const tagFilter = url.searchParams.get("tag") || "All";
    
    // Parse range (default to 14 days for research papers)
    let daysBack = MAX_ARTICLE_AGE_DAYS_DEFAULT;
    if (range === "24h") daysBack = 1;
    else if (range === "7d") daysBack = 7;
    else if (range === "14d") daysBack = 14;
    else if (range === "30d") daysBack = 30;
    
    const maxArticles = Math.min(Math.max(max, 1), MAX_ARTICLES_DEFAULT);
    
    console.log(`Generating brief: range=${daysBack}d, max=${maxArticles}, tag=${tagFilter}`);
    
    // STAGE 1: Fetch
    console.log("Stage 1: Fetching articles...");
    const { articles: rawArticles, sourcesUsed } = await fetchArticles(daysBack);
    console.log(`Fetched ${rawArticles.length} articles from ${sourcesUsed.length} sources`);
    
    // STAGE 2: Dedupe
    console.log("Stage 2: Deduplicating...");
    const { deduped, removedCount: dedupeRemoved } = dedupeArticles(rawArticles);
    console.log(`After dedupe: ${deduped.length} articles (removed ${dedupeRemoved})`);
    
    // STAGE 3: Filter
    console.log("Stage 3: Filtering AI content...");
    const { filtered, removedCount: filterRemoved } = filterAIContent(deduped);
    console.log(`After filter: ${filtered.length} articles (removed ${filterRemoved})`);
    
    // STAGE 4: Rank
    console.log("Stage 4: Ranking...");
    const ranked = await rankArticles(filtered, maxArticles);
    console.log(`After ranking: ${ranked.length} articles`);
    
    // STAGE 5: Summarize
    console.log("Stage 5: Summarizing...");
    let items = await summarizeArticles(ranked);
    
    // Apply tag filter if specified
    if (tagFilter && tagFilter !== "All") {
      items = items.filter(item => item.tag === tagFilter);
    }
    
    const timeRangeLabel = daysBack === 1 ? "Last 24 hours" : daysBack === 7 ? "Last 7 days" : "Last 30 days";
    
    const brief: ExecutiveBrief = {
      generatedAt: new Date().toISOString(),
      timeRange: timeRangeLabel,
      items,
      rejectedCount: dedupeRemoved + filterRemoved,
      sourcesUsed
    };
    
    console.log(`Brief generated: ${items.length} items`);
    
    return new Response(JSON.stringify(brief), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Executive brief error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
