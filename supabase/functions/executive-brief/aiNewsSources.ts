// AI News RSS/JSON Feed Sources Configuration
export interface NewsSource {
  name: string;
  url: string;
  type: "rss" | "json";
  maxItems: number;
  category: "Tech" | "Policy" | "Research" | "Industry" | "Risk";
  isResearch?: boolean; // Flag for ArXiv/academic sources requiring strict filtering
}

export const AI_NEWS_SOURCES: NewsSource[] = [
  // Tech News
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    type: "rss",
    maxItems: 5,
    category: "Tech"
  },
  {
    name: "VentureBeat AI",
    url: "https://venturebeat.com/category/ai/feed/",
    type: "rss",
    maxItems: 5,
    category: "Tech"
  },
  {
    name: "The Verge AI",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    type: "rss",
    maxItems: 5,
    category: "Tech"
  },
  // Research - ArXiv Feeds (strict keyword filtering)
  {
    name: "ArXiv AI",
    url: "https://rss.arxiv.org/rss/cs.AI",
    type: "rss",
    maxItems: 10,
    category: "Research",
    isResearch: true
  },
  {
    name: "ArXiv Machine Learning",
    url: "https://rss.arxiv.org/rss/cs.LG",
    type: "rss",
    maxItems: 10,
    category: "Research",
    isResearch: true
  },
  {
    name: "ArXiv Computation & Language",
    url: "https://rss.arxiv.org/rss/cs.CL",
    type: "rss",
    maxItems: 10,
    category: "Research",
    isResearch: true
  },
  // Research - Lab Blogs
  {
    name: "MIT Technology Review AI",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
    type: "rss",
    maxItems: 5,
    category: "Research"
  },
  {
    name: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
    type: "rss",
    maxItems: 3,
    category: "Research"
  },
  // Industry
  {
    name: "Wired AI",
    url: "https://www.wired.com/feed/tag/ai/latest/rss",
    type: "rss",
    maxItems: 5,
    category: "Industry"
  },
  {
    name: "Reuters Tech",
    url: "https://www.reuters.com/technology/rss",
    type: "rss",
    maxItems: 5,
    category: "Industry"
  },
  // Policy
  {
    name: "Ars Technica AI",
    url: "https://feeds.arstechnica.com/arstechnica/features",
    type: "rss",
    maxItems: 4,
    category: "Policy"
  }
];

// Keywords for filtering AI-related content (general)
export const AI_KEYWORDS = [
  "ai", "artificial intelligence", "machine learning", "ml", "llm", "large language model",
  "gpt", "chatgpt", "openai", "anthropic", "claude", "gemini", "deepmind",
  "transformer", "neural network", "deep learning", "generative ai", "gen ai",
  "ai agent", "ai model", "foundation model", "ai policy", "ai regulation",
  "ai safety", "ai ethics", "ai governance", "automation", "copilot",
  "diffusion model", "stable diffusion", "midjourney", "dall-e", "sora",
  "natural language processing", "nlp", "computer vision", "reinforcement learning"
];

// Strict keywords for ArXiv/research paper filtering
// Only fetch papers containing these high-signal terms
export const ARXIV_KEYWORDS = [
  "llm", "large language model", "transformer", "generative", "diffusion",
  "state-of-the-art", "sota", "benchmark", "agent", "reasoning",
  "chain-of-thought", "cot", "retrieval augmented", "rag", "multimodal",
  "vision language", "instruction tuning", "rlhf", "preference learning"
];

// Topic groupings for final report
export type TopicGroup = "research" | "industry" | "policy";

export const TOPIC_CONFIG: Record<TopicGroup, { title: string; emoji: string; tags: string[] }> = {
  research: {
    title: "Major Research Breakthroughs",
    emoji: "🚀",
    tags: ["Research"]
  },
  industry: {
    title: "Industry News & Releases",
    emoji: "🏢",
    tags: ["Tech", "Industry"]
  },
  policy: {
    title: "Policy & Safety",
    emoji: "⚖️",
    tags: ["Policy", "Risk"]
  }
};
