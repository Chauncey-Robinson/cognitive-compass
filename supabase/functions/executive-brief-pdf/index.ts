import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type TopicGroup = "strategy" | "risk" | "ops" | "tech";

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
}

interface ExecutiveBrief {
  generatedAt: string;
  timeRange: string;
  items: BriefItem[];
  rejectedCount: number;
  sourcesUsed: string[];
  groupedItems: Record<TopicGroup, BriefItem[]>;
}

const TOPIC_CONFIG: Record<TopicGroup, { title: string; emoji: string }> = {
  strategy: { title: "Strategic Threats & Global Competition", emoji: "🚨" },
  risk: { title: "Security, Risk & Compliance", emoji: "🛡️" },
  ops: { title: "Enterprise Ops & Efficiency", emoji: "🏢" },
  tech: { title: "Key Technical Breakthroughs", emoji: "🚀" }
};

// Safe error logging - no sensitive details
function logSafeError(context: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${context}: ${error.name}`);
  } else {
    console.error(`${context}: Unknown error type`);
  }
}

// HTML escape function to prevent XSS attacks
function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validate brief structure
function validateBrief(brief: unknown): brief is ExecutiveBrief {
  if (!brief || typeof brief !== 'object') return false;
  const b = brief as Record<string, unknown>;
  
  if (typeof b.generatedAt !== 'string') return false;
  if (typeof b.timeRange !== 'string') return false;
  if (!Array.isArray(b.items)) return false;
  if (typeof b.rejectedCount !== 'number') return false;
  if (!Array.isArray(b.sourcesUsed)) return false;
  
  // Validate items have required fields
  for (const item of b.items) {
    if (!item || typeof item !== 'object') return false;
    const i = item as Record<string, unknown>;
    if (typeof i.title !== 'string') return false;
    if (typeof i.source !== 'string') return false;
    if (typeof i.summary !== 'string') return false;
  }
  
  return true;
}

function generatePDFHTML(brief: ExecutiveBrief): string {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return escapeHtml(dateStr);
    }
  };

  const groupOrder: TopicGroup[] = ["strategy", "risk", "ops", "tech"];
  const sectionsHTML = groupOrder.map(group => {
    const items = brief.groupedItems?.[group] || [];
    if (items.length === 0) return '';
    
    const config = TOPIC_CONFIG[group];
    const itemsHTML = items.map((item) => `
      <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #eee;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: ${getTagColor(item.tag)}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;">${escapeHtml(item.tag)}</span>
          <span style="background: #1a1a2e; color: #ffd700; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700;">[Impact: ${Math.min(10, Math.max(0, Math.floor(item.importanceScore || 0)))}/10]</span>
          <span style="color: #666; font-size: 11px;">${escapeHtml(item.source)} · ${formatDate(item.publishedAt)}</span>
        </div>
        <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #111;">${escapeHtml(item.title)}</h4>
        <p style="margin: 0 0 6px 0; font-size: 13px; color: #333; line-height: 1.5;">${escapeHtml(item.summary)}</p>
        <p style="margin: 0; font-size: 12px; color: #666; font-style: italic;">💡 ${escapeHtml(item.impact)}</p>
      </div>
    `).join('');

    return `
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; font-weight: 700; color: #111; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid ${getSectionColor(group)};">
          ${config.emoji} ${escapeHtml(config.title)}
        </h2>
        ${itemsHTML}
      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Global Executive AI Brief - ${escapeHtml(brief.timeRange)}</title>
  <style>
    @page {
      margin: 0.75in;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #111;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
      padding-bottom: 20px;
      border-bottom: 3px solid #111;
    }
    .header h1 {
      margin: 0 0 8px 0;
      font-size: 26px;
      font-weight: 700;
    }
    .header p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 28px;
      padding: 12px 16px;
      background: #f5f5f5;
      border-radius: 8px;
      font-size: 12px;
    }
    .footer {
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #e5e5e5;
      text-align: center;
      font-size: 11px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Global Executive AI Brief</h1>
    <p>Strategic Intelligence for Leadership (CTO-Scored)</p>
  </div>
  
  <div class="meta">
    <span><strong>Period:</strong> ${escapeHtml(brief.timeRange)}</span>
    <span><strong>Generated:</strong> ${formatDate(brief.generatedAt)}</span>
    <span><strong>Articles:</strong> ${brief.items?.length || 0}</span>
    <span><strong>Filtered:</strong> ${brief.rejectedCount || 0} (score &lt;8)</span>
  </div>
  
  ${sectionsHTML}
  
  <div class="footer">
    <p>Generated by Oxford Intelligence</p>
    <p>Global Sources: ${(brief.sourcesUsed || []).slice(0, 6).map(s => escapeHtml(s)).join(', ')}${(brief.sourcesUsed?.length || 0) > 6 ? ` and ${(brief.sourcesUsed?.length || 0) - 6} more` : ''}</p>
  </div>
</body>
</html>
  `;
}

function getTagColor(tag: string): string {
  switch (tag) {
    case "Strategy": return "#dc2626";
    case "Risk": return "#d97706";
    case "Ops": return "#0066cc";
    case "Tech": return "#059669";
    default: return "#6b7280";
  }
}

function getSectionColor(group: TopicGroup): string {
  switch (group) {
    case "strategy": return "#dc2626";
    case "risk": return "#d97706";
    case "ops": return "#0066cc";
    case "tech": return "#059669";
    default: return "#6b7280";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { brief } = body as { brief: unknown };
    
    // Input validation
    if (!validateBrief(brief)) {
      return new Response(
        JSON.stringify({ error: "Invalid brief data structure" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Limit items to prevent abuse
    if (brief.items.length > 100) {
      return new Response(
        JSON.stringify({ error: "Too many items (max 100)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const html = generatePDFHTML(brief);
    
    return new Response(html, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="executive_ai_brief_${new Date().toISOString().split('T')[0]}.html"`,
      },
    });
    
  } catch (error) {
    logSafeError("PDF generation", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
