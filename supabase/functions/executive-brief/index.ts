import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { AI_NEWS_SOURCES, AI_KEYWORDS, ARXIV_KEYWORDS, PRIORITY_KEYWORDS, TOPIC_CONFIG, type NewsSource, type TopicGroup } from "./aiNewsSources.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// CONFIG: Executive-focused limits
const MAX_ARTICLES_DEFAULT = 15;
const MAX_ARTICLE_AGE_DAYS_DEFAULT = 3;
const VALID_RANGES = ['24h', '3d', '7d', '14d', '30d'];
const VALID_TAGS = ['All', 'Strategy', 'Risk', 'Ops', 'Tech'];

// Initialize Supabase client for memory operations
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Safe error logging - no sensitive details
function logSafeError(context: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${context}: ${error.name}`);
  } else {
    console.error(`${context}: Unknown error type`);
  }
}

// JWT validation helper
async function validateAuth(req: Request): Promise<{ userId: string | null; error: string | null }> {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { userId: null, error: 'Missing or invalid authorization header' };
  }

  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  if (!supabaseUrl || !supabaseAnonKey) {
    return { userId: null, error: 'Server configuration error' };
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } }
  });

  const token = authHeader.replace('Bearer ', '');
  const { data, error } = await authClient.auth.getClaims(token);
  
  if (error || !data?.claims) {
    return { userId: null, error: 'Invalid or expired token' };
  }

  return { userId: data.claims.sub as string, error: null };
}

interface RawArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sourceCategory: "Strategy" | "Risk" | "Ops" | "Tech";
  isResearch: boolean;
}

interface ScoredArticle extends RawArticle {
  importanceScore: number;
}

interface BriefItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  tag: "Strategy" | "Risk" | "Ops" | "Tech";
  summary: string;
  impact: string;
  importanceScore: number;
  topicGroup: TopicGroup;
  videoUrl?: string;
}

interface RejectedArticle {
  title: string;
  source: string;
  url: string;
  reason: "duplicate" | "not-ai-related" | "low-score" | "arxiv-filter" | "previously-seen";
  score?: number;
}

// MEMORY: Check if URLs have been seen before
async function checkSeenUrls(urls: string[]): Promise<Set<string>> {
  try {
    const { data, error } = await supabase
      .from("seen_articles")
      .select("url")
      .in("url", urls);
    
    if (error) {
      console.log("Memory check failed");
      return new Set();
    }
    
    return new Set(data?.map(r => r.url) || []);
  } catch (e) {
    logSafeError("Memory check", e);
    return new Set();
  }
}

// MEMORY: Mark articles as seen (after processing)
async function markArticlesAsSeen(articles: Array<{ url: string; title: string; source: string }>): Promise<void> {
  if (articles.length === 0) return;
  
  try {
    const rows = articles.map(a => ({
      url: a.url,
      title: a.title,
      source: a.source,
      seen_date: new Date().toISOString()
    }));
    
    const { error } = await supabase
      .from("seen_articles")
      .upsert(rows, { onConflict: "url", ignoreDuplicates: true });
    
    if (error) {
      console.log("Memory save failed");
    } else {
      console.log(`Memory: Marked ${articles.length} articles as seen`);
    }
  } catch (e) {
    logSafeError("Memory save", e);
  }
}

interface ExecutiveBrief {
  generatedAt: string;
  timeRange: string;
  items: BriefItem[];
  rejectedCount: number;
  sourcesUsed: string[];
  groupedItems: Record<TopicGroup, BriefItem[]>;
  rejectedArticles: RejectedArticle[];
}

// Parse RSS XML to extract articles
function parseRSS(xml: string, sourceName: string, sourceCategory: NewsSource["category"], isResearch: boolean): RawArticle[] {
  const articles: RawArticle[] = [];
  
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
        sourceCategory,
        isResearch
      });
    }
  }
  
  return articles;
}

// STAGE 1: Fetch articles from all sources (with ArXiv keyword filtering)
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
          "User-Agent": "Mozilla/5.0 (compatible; ExecutiveIntelligence/1.0)"
        }
      });
      clearTimeout(timeout);
      
      if (!response.ok) {
        console.log(`Failed to fetch ${source.name}: ${response.status}`);
        return [];
      }
      
      const text = await response.text();
      let articles = parseRSS(text, source.name, source.category, source.isResearch || false);
      
      // Apply strict ArXiv keyword filtering for research sources
      if (source.isResearch) {
        articles = articles.filter(a => {
          const searchText = `${a.title} ${a.description}`.toLowerCase();
          return ARXIV_KEYWORDS.some(keyword => searchText.includes(keyword.toLowerCase()));
        });
        console.log(`ArXiv filter: ${source.name} - kept ${articles.length} papers with business-critical keywords`);
      }
      
      // Filter by date and limit
      const filtered = articles
        .filter(a => {
          try {
            const pubDate = new Date(a.publishedAt);
            return pubDate >= cutoffDate;
          } catch {
            return true;
          }
        })
        .slice(0, source.maxItems);
      
      if (filtered.length > 0) {
        sourcesUsed.push(source.name);
      }
      
      return filtered;
    } catch (error) {
      logSafeError(`Fetch ${source.name}`, error);
      return [];
    }
  });
  
  const results = await Promise.all(fetchPromises);
  results.forEach(articles => allArticles.push(...articles));
  
  return { articles: allArticles, sourcesUsed };
}

// STAGE 2: Deduplicate articles (including memory check)
async function dedupeArticles(articles: RawArticle[]): Promise<{ deduped: RawArticle[], rejected: RejectedArticle[] }> {
  const seen = new Set<string>();
  const deduped: RawArticle[] = [];
  const rejected: RejectedArticle[] = [];
  
  // Check memory for previously seen URLs
  const allUrls = articles.map(a => a.url);
  const previouslySeen = await checkSeenUrls(allUrls);
  console.log(`Memory: Found ${previouslySeen.size} previously seen articles`);
  
  for (const article of articles) {
    // Check if previously seen in memory
    if (previouslySeen.has(article.url)) {
      rejected.push({ title: article.title, source: article.source, url: article.url, reason: "previously-seen" });
      continue;
    }
    
    if (seen.has(article.url)) {
      rejected.push({ title: article.title, source: article.source, url: article.url, reason: "duplicate" });
      continue;
    }
    
    const normalizedTitle = article.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    let isDuplicate = false;
    
    for (const existingUrl of seen) {
      const existing = deduped.find(a => a.url === existingUrl);
      if (existing) {
        const existingNormalized = existing.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        const similarity = calculateSimilarity(normalizedTitle, existingNormalized);
        if (similarity > 0.8) {
          isDuplicate = true;
          rejected.push({ title: article.title, source: article.source, url: article.url, reason: "duplicate" });
          break;
        }
      }
    }
    
    if (!isDuplicate) {
      seen.add(article.url);
      deduped.push(article);
    }
  }
  
  return { deduped, rejected };
}

function calculateSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  
  if (longer.length === 0) return 1;
  
  let matches = 0;
  for (const char of shorter) {
    if (longer.includes(char)) matches++;
  }
  
  return matches / longer.length;
}

// STAGE 3: Filter for AI-related content
function filterAIContent(articles: RawArticle[]): { filtered: RawArticle[], rejected: RejectedArticle[] } {
  const filtered: RawArticle[] = [];
  const rejected: RejectedArticle[] = [];
  
  for (const article of articles) {
    // Research articles already passed strict filtering
    if (article.isResearch) {
      filtered.push(article);
      continue;
    }
    
    const searchText = `${article.title} ${article.description}`.toLowerCase();
    const isAIRelated = AI_KEYWORDS.some(keyword => searchText.includes(keyword.toLowerCase()));
    
    if (isAIRelated) {
      filtered.push(article);
    } else {
      rejected.push({ title: article.title, source: article.source, url: article.url, reason: "not-ai-related" });
    }
  }
  
  return { filtered, rejected };
}

// STAGE 4: Score articles for importance using LLM (CTO Perspective)
async function scoreArticles(articles: RawArticle[]): Promise<{ scored: ScoredArticle[], rejected: RejectedArticle[] }> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    console.log("No LOVABLE_API_KEY, assigning default scores");
    return {
      scored: articles.map(a => ({ ...a, importanceScore: 8 })),
      rejected: []
    };
  }
  
  // Batch score articles (5 at a time)
  const scored: ScoredArticle[] = [];
  const rejected: RejectedArticle[] = [];
  const batchSize = 5;
  
  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    const titles = batch.map((a, idx) => `${idx + 1}. "${a.title}" (${a.source}): ${a.description.slice(0, 150)}...`).join("\n");
    
    // CTO-focused scoring prompt
    const prompt = `Act as a CTO for a Global Fortune 500 company (Finance/Logistics). Rate the importance of each news item from 1-10.

CRITERIA FOR HIGH SCORES (8-10):
- **Strategic Threat:** New competitor models (especially from China/Europe).
- **Enterprise Value:** Solves 'Privacy', 'Hallucination', 'Security', or 'Cost'.
- **Operational Efficiency:** Improves routing, fraud detection, or customer support.
- **Regulation:** Major compliance shifts (e.g., EU AI Act).

CRITERIA FOR LOW SCORES (1-4):
- Theoretical math with no application.
- Generic startup funding news.
- Consumer entertainment (gaming/art).
- Speculative opinion pieces.

Headlines to score:
${titles}

Respond with ONLY a JSON array of scores, like: [8, 5, 9, 6, 7]
Nothing else.`;

    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100,
        }),
      });
      
      if (!response.ok) {
        console.log("Scoring LLM failed, using default scores");
        batch.forEach(a => scored.push({ ...a, importanceScore: 8 }));
        continue;
      }
      
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      
      // Parse scores
      const scoresMatch = content.match(/\[[\d,\s]+\]/);
      let scores: number[] = [];
      if (scoresMatch) {
        try {
          scores = JSON.parse(scoresMatch[0]);
        } catch {
          scores = batch.map(() => 8);
        }
      } else {
        scores = batch.map(() => 8);
      }
      
      // Apply scores - keep all articles regardless of score
      batch.forEach((article, idx) => {
        const score = scores[idx] || 5;
        scored.push({ ...article, importanceScore: score });
      });
      
    } catch (error) {
      logSafeError("Scoring", error);
      batch.forEach(a => scored.push({ ...a, importanceScore: 8 }));
    }
  }
  
  // Sort by importance score descending
  scored.sort((a, b) => b.importanceScore - a.importanceScore);
  
  return { scored, rejected };
}

// STAGE 5: Rank and limit articles
async function rankArticles(articles: ScoredArticle[], maxArticles: number): Promise<ScoredArticle[]> {
  return articles.slice(0, maxArticles);
}

// STAGE 6: Summarize and tag articles (Executive Advisor Persona)
async function summarizeArticles(articles: ScoredArticle[]): Promise<BriefItem[]> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    return articles.map((a, i) => ({
      id: `brief-${i}-${Date.now()}`,
      title: a.title,
      source: a.source,
      url: a.url,
      publishedAt: a.publishedAt,
      tag: a.sourceCategory,
      summary: a.description.slice(0, 200) + "...",
      impact: "AI developments continue to reshape business strategies.",
      importanceScore: a.importanceScore,
      topicGroup: getTopicGroup(a.sourceCategory)
    }));
  }
  
  const results: BriefItem[] = [];
  const batchSize = 3;
  
  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (article, idx) => {
      // Executive Advisor Persona
      const prompt = `You are a Strategic AI Advisor to a Fortune 500 CTO. Summarize this content focusing on **Business Impact**, **Risk**, and **ROI**.

Do not just repeat the news. Answer: Why does this matter to enterprise leadership?

Highlight if this is a 'Strategic Threat' (e.g., from China/Europe competitors) or an 'Operational Win' (efficiency/cost savings).

Categorize as one of:
- Strategy: Global competition, major acquisitions, market shifts
- Risk: Security threats, compliance, privacy concerns, regulations
- Ops: Enterprise efficiency, cost reduction, operational improvements
- Tech: Technical breakthroughs with clear business applications

Title: ${article.title}
Source: ${article.source}
Description: ${article.description}

Respond in this exact JSON format:
{
  "summary": "2-3 sentence executive summary focusing on business impact",
  "impact": "1 sentence: the key strategic takeaway for C-suite",
  "tag": "one of: Strategy, Risk, Ops, Tech"
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
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`LLM request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";
        
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const tag = (parsed.tag as "Strategy" | "Risk" | "Ops" | "Tech") || article.sourceCategory;
          return {
            id: `brief-${i + idx}-${Date.now()}`,
            title: article.title,
            source: article.source,
            url: article.url,
            publishedAt: article.publishedAt,
            tag,
            summary: parsed.summary || article.description.slice(0, 200),
            impact: parsed.impact || "This development may affect AI strategy decisions.",
            importanceScore: article.importanceScore,
            topicGroup: getTopicGroup(tag)
          };
        }
      } catch (error) {
        logSafeError(`Summarize "${article.title.slice(0, 30)}"`, error);
      }
      
      return {
        id: `brief-${i + idx}-${Date.now()}`,
        title: article.title,
        source: article.source,
        url: article.url,
        publishedAt: article.publishedAt,
        tag: article.sourceCategory,
        summary: article.description.slice(0, 200) || "Summary unavailable.",
        impact: "AI developments continue to evolve rapidly.",
        importanceScore: article.importanceScore,
        topicGroup: getTopicGroup(article.sourceCategory)
      };
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  return results;
}

// Helper to determine topic group from tag
function getTopicGroup(tag: string): TopicGroup {
  if (tag === "Strategy") return "strategy";
  if (tag === "Risk") return "risk";
  if (tag === "Ops") return "ops";
  return "tech";
}

// HeyGen Video Generation for Top Story
const HEYGEN_AVATAR_ID = "Jocelyn_standing_sofa_front";
const HEYGEN_VOICE_ID = "1bd001e7e50f421d891986aad5158bc8";

async function generateHeyGenVideo(script: string): Promise<string | null> {
  const HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY");
  if (!HEYGEN_API_KEY) {
    console.log("HeyGen API key not configured");
    return null;
  }
  
  console.log("Generating HeyGen video for top story");
  
  const payload = {
    video_inputs: [{
      character: { 
        type: "avatar", 
        avatar_id: HEYGEN_AVATAR_ID, 
        avatar_style: "normal" 
      },
      voice: { 
        type: "text", 
        input_text: script.slice(0, 1500), // HeyGen text limit
        voice_id: HEYGEN_VOICE_ID 
      },
      background: { type: "color", value: "#FAFAFA" }
    }],
    dimension: { width: 1280, height: 720 },
    test: false
  };

  try {
    const resp = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": HEYGEN_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    if (!resp.ok) {
      console.error(`HeyGen API error: ${resp.status}`);
      return null;
    }
    
    const data = await resp.json();
    const videoId = data.data?.video_id;
    if (!videoId) {
      console.log("No video_id returned from HeyGen");
      return null;
    }
    
    console.log(`Video generation started: ${videoId}`);
    
    // Poll for completion (max 60 seconds with 5 second intervals)
    const statusUrl = `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`;
    for (let attempt = 0; attempt < 12; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const statusResp = await fetch(statusUrl, {
        headers: { "X-Api-Key": HEYGEN_API_KEY }
      });
      
      if (!statusResp.ok) continue;
      
      const statusData = await statusResp.json();
      const status = statusData.data?.status;
      
      if (status === "completed") {
        console.log("Video generation completed");
        return statusData.data?.video_url;
      } else if (status === "failed") {
        console.log("Video generation failed");
        return null;
      }
      
      console.log(`Video status: ${status}`);
    }
    
    console.log("Video generation timed out");
    return `pending:${videoId}`;
  } catch (error) {
    logSafeError("HeyGen video generation", error);
    return null;
  }
}

// Group items by topic
function groupByTopic(items: BriefItem[]): Record<TopicGroup, BriefItem[]> {
  const grouped: Record<TopicGroup, BriefItem[]> = {
    strategy: [],
    risk: [],
    ops: [],
    tech: []
  };
  
  for (const item of items) {
    grouped[item.topicGroup].push(item);
  }
  
  // Sort each group by importance score
  for (const group of Object.keys(grouped) as TopicGroup[]) {
    grouped[group].sort((a, b) => b.importanceScore - a.importanceScore);
  }
  
  return grouped;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authentication
    const { userId, error: authError } = await validateAuth(req);
    if (authError) {
      return new Response(
        JSON.stringify({ error: authError }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Authenticated user: ${userId?.slice(0, 8)}...`);
    
    const url = new URL(req.url);
    const range = url.searchParams.get("range") || "3d";
    const maxParam = url.searchParams.get("max") || "15";
    const tagFilter = url.searchParams.get("tag") || "All";
    
    // Input validation
    if (!VALID_RANGES.includes(range)) {
      return new Response(
        JSON.stringify({ error: `Invalid range. Must be one of: ${VALID_RANGES.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!VALID_TAGS.includes(tagFilter)) {
      return new Response(
        JSON.stringify({ error: `Invalid tag. Must be one of: ${VALID_TAGS.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const max = parseInt(maxParam, 10);
    if (isNaN(max) || max < 1 || max > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid max. Must be a number between 1 and 100" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Parse range (default to 3 days for breaking news)
    let daysBack = MAX_ARTICLE_AGE_DAYS_DEFAULT;
    if (range === "24h") daysBack = 1;
    else if (range === "3d") daysBack = 3;
    else if (range === "7d") daysBack = 7;
    else if (range === "14d") daysBack = 14;
    else if (range === "30d") daysBack = 30;
    
    // Check if video generation is requested
    const generateVideo = url.searchParams.get("video") === "true";
    
    const maxArticles = Math.min(Math.max(max, 1), MAX_ARTICLES_DEFAULT);
    
    console.log(`Generating executive brief: range=${daysBack}d, max=${maxArticles}, tag=${tagFilter}`);
    
    // STAGE 1: Fetch (with ArXiv filtering)
    console.log("Stage 1: Fetching articles...");
    const { articles: rawArticles, sourcesUsed } = await fetchArticles(daysBack);
    console.log(`Fetched ${rawArticles.length} articles from ${sourcesUsed.length} sources`);
    
    // STAGE 2: Dedupe (with memory check)
    console.log("Stage 2: Deduplicating (with memory)...");
    const { deduped, rejected: dedupeRejected } = await dedupeArticles(rawArticles);
    console.log(`After dedupe: ${deduped.length} articles (removed ${dedupeRejected.length})`);
    
    // STAGE 3: Filter - DISABLED per user request (will add filtering controls later)
    console.log("Stage 3: Filtering DISABLED - keeping all articles");
    const filtered = deduped;
    const filterRejected: RejectedArticle[] = [];
    
    // STAGE 4: Score for importance (CTO criteria)
    console.log("Stage 4: Scoring importance (CTO criteria)...");
    const { scored, rejected: scoreRejected } = await scoreArticles(filtered);
    console.log(`After scoring: ${scored.length} articles`);
    
    // STAGE 5: Rank and limit
    console.log("Stage 5: Ranking...");
    const ranked = await rankArticles(scored, maxArticles);
    console.log(`After ranking: ${ranked.length} articles`);
    
    // STAGE 6: Summarize
    console.log("Stage 6: Summarizing (Executive Advisor)...");
    let items = await summarizeArticles(ranked);
    
    // STAGE 7: Generate video for top story (if requested)
    if (generateVideo && items.length > 0) {
      console.log("Stage 7: Generating video for top story...");
      const topStory = items[0];
      const script = `Executive Briefing. ${topStory.title}. ${topStory.summary}`;
      const videoUrl = await generateHeyGenVideo(script);
      if (videoUrl) {
        items[0] = { ...topStory, videoUrl };
      }
    }
    
    // STAGE 8: Save to Memory (mark as seen for future runs)
    console.log("Stage 8: Saving to memory...");
    await markArticlesAsSeen(items.map(i => ({ url: i.url, title: i.title, source: i.source })));
    
    // Apply tag filter if specified
    if (tagFilter && tagFilter !== "All") {
      items = items.filter(item => item.tag === tagFilter);
    }
    
    // Group by topic
    const groupedItems = groupByTopic(items);
    
    // Combine all rejected articles
    const allRejected: RejectedArticle[] = [...dedupeRejected, ...filterRejected, ...scoreRejected];
    
    const timeRangeLabel = daysBack === 1 ? "Last 24 hours" : daysBack === 3 ? "Last 3 days" : daysBack === 7 ? "Last 7 days" : daysBack === 14 ? "Last 14 days" : "Last 30 days";
    
    const brief: ExecutiveBrief = {
      generatedAt: new Date().toISOString(),
      timeRange: timeRangeLabel,
      items,
      rejectedCount: allRejected.length,
      sourcesUsed,
      groupedItems,
      rejectedArticles: allRejected
    };
    
    console.log(`Executive brief generated: ${items.length} items in ${Object.keys(groupedItems).length} topic groups`);
    
    return new Response(JSON.stringify(brief), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    logSafeError("Executive brief", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
