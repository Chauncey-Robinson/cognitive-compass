// Global Executive AI Intelligence Engine - Source Configuration
export interface NewsSource {
  name: string;
  url: string;
  type: "rss" | "json";
  maxItems: number;
  category: "Strategy" | "Risk" | "Ops" | "Tech";
  isResearch?: boolean;
}

export const AI_NEWS_SOURCES: NewsSource[] = [
  // === 🌏 GLOBAL STRATEGY (China & Europe) ===
  {
    name: "SCMP Tech",
    url: "https://www.scmp.com/rss/318421/feed",
    type: "rss",
    maxItems: 5,
    category: "Strategy"
  },
  {
    name: "Sifted EU",
    url: "https://sifted.eu/feed",
    type: "rss",
    maxItems: 5,
    category: "Strategy"
  },
  {
    name: "Rest of World",
    url: "https://restofworld.org/feed/",
    type: "rss",
    maxItems: 5,
    category: "Strategy"
  },

  // === 🏢 ENTERPRISE & OPERATIONS (The "CTO" View) ===
  {
    name: "VentureBeat Enterprise",
    url: "https://venturebeat.com/category/enterprise-analytics/feed/",
    type: "rss",
    maxItems: 5,
    category: "Ops"
  },
  {
    name: "ZDNet AI",
    url: "https://www.zdnet.com/topic/artificial-intelligence/rss.xml",
    type: "rss",
    maxItems: 5,
    category: "Ops"
  },
  {
    name: "MIT Sloan Review",
    url: "https://sloanreview.mit.edu/topic/technology-innovation/feed",
    type: "rss",
    maxItems: 5,
    category: "Strategy"
  },

  // === 🛡️ RISK, SECURITY & GOVERNANCE ===
  {
    name: "Dark Reading",
    url: "https://www.darkreading.com/rss_simple.asp",
    type: "rss",
    maxItems: 5,
    category: "Risk"
  },
  {
    name: "ArXiv Security",
    url: "http://export.arxiv.org/rss/cs.CR",
    type: "rss",
    maxItems: 5,
    category: "Risk",
    isResearch: true
  },

  // === 🔬 BREAKTHROUGH WATCH (Keep Top Research) ===
  {
    name: "ArXiv AI",
    url: "http://export.arxiv.org/rss/cs.AI",
    type: "rss",
    maxItems: 8,
    category: "Tech",
    isResearch: true
  },
  {
    name: "MIT AI News",
    url: "https://news.mit.edu/rss/topic/artificial-intelligence2",
    type: "rss",
    maxItems: 5,
    category: "Tech",
    isResearch: true
  },

  // === INDUSTRY NEWS ===
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    type: "rss",
    maxItems: 5,
    category: "Strategy"
  },
  {
    name: "Reuters Tech",
    url: "https://www.reuters.com/technology/rss",
    type: "rss",
    maxItems: 5,
    category: "Strategy"
  }
];

// Keywords for filtering AI-related content (general news)
export const AI_KEYWORDS = [
  "ai", "artificial intelligence", "machine learning", "ml", "llm", "large language model",
  "gpt", "chatgpt", "openai", "anthropic", "claude", "gemini", "deepmind",
  "transformer", "neural network", "deep learning", "generative ai", "gen ai",
  "ai agent", "ai model", "foundation model", "ai policy", "ai regulation",
  "ai safety", "ai ethics", "ai governance", "automation", "copilot",
  "natural language processing", "nlp", "computer vision", "reinforcement learning"
];

// Business-critical ArXiv filters (replaces academic-focused keywords)
export const ARXIV_KEYWORDS = [
  "llm", "security", "privacy", "attack", "defense", "fraud",
  "optimization", "agent", "reasoning", "hallucination", "cost",
  "enterprise", "production", "deployment", "efficiency", "latency"
];

// Priority keywords that flag articles as "High Priority" for executives
export const PRIORITY_KEYWORDS = [
  // Finance Interest
  "fraud detection", "market prediction", "risk assessment", "compliance",
  "algorithmic trading", "financial forecasting", "privacy", "federated learning",
  "on-premise", "security", "audit",
  // Logistics Interest
  "routing", "multi-agent", "reinforcement learning", "last mile", "autonomous",
  "fleet management", "supply chain", "optimization", "latency", "real-time",
  // Strategic Threats
  "china", "regulation", "eu ai act", "ban", "lawsuit", "competitor"
];

// Topic groupings for final report (Executive-focused)
export type TopicGroup = "strategy" | "risk" | "ops" | "tech";

export const TOPIC_CONFIG: Record<TopicGroup, { title: string; emoji: string; tags: string[] }> = {
  strategy: {
    title: "Strategic Threats & Global Competition",
    emoji: "🚨",
    tags: ["Strategy"]
  },
  risk: {
    title: "Security, Risk & Compliance",
    emoji: "🛡️",
    tags: ["Risk"]
  },
  ops: {
    title: "Enterprise Ops & Efficiency",
    emoji: "🏢",
    tags: ["Ops"]
  },
  tech: {
    title: "Key Technical Breakthroughs",
    emoji: "🚀",
    tags: ["Tech"]
  }
};
