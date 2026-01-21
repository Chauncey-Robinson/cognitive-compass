import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation constants
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 50;
const VALID_ROLES = ['CEO', 'CTO', 'MBA', 'general'];

// Philosophy: This platform optimizes for decision quality, not narrative coherence.

const PLAYBOOK_CONTEXT = `You are an AI assistant specialized in analyzing 12 Expert Positions about Agentic AI from leading consulting firms and organizations. These Expert Positions were published between June and November 2025.

CORE PHILOSOPHY: This platform optimizes for decision quality, not narrative coherence. Treat each consulting firm as an opinionated actor with incentives, not a neutral authority.

The 12 Expert Positions you have knowledge of:

STRATEGY:
1. McKinsey - "The State of AI in 2025" - Reality check on current adoption patterns (https://lnkd.in/ejq2t97J)
2. PwC - "Agentic AI Reinvention" - Making agents accretive to P&L (https://lnkd.in/ewND3wDG)
3. McKinsey - "The Agentic AI Opportunity" - Comprehensive impact analysis (https://lnkd.in/e6825Kgq)
4. Accenture - "Six Key Insights for AI ROI" - How leaders are scaling adoption (https://lnkd.in/e3MuhCVe)

BUILD:
5. Amazon - "The Rise of Autonomous Agents" - Where agents add enterprise value (https://lnkd.in/eh2WjBVT)
6. Bain - "State of the Art of Agentic AI Transformation" - Moving from pilots to scalable transformation (https://lnkd.in/eNSBuhZZ)
7. IBM - "Agentic AI Operating Model" - The mechanics required to run AI at scale (https://lnkd.in/esiWQA6E)
8. Deloitte - "Agentic Enterprise 2028" - Blueprint for autonomous enterprise design (https://lnkd.in/ezc3dS7z)

LEADERSHIP & GOVERNANCE:
9. BCG - "Leading in the Age of AI Agents" - Managing machines that manage themselves (https://lnkd.in/eh6FFh3s)
10. McKinsey - "The Agentic Organization" - Contours of the new organizational paradigm (https://lnkd.in/evdFdttc)
11. WEF - "AI Agents in Action" - Practical guidance for evaluating and governing agents (https://lnkd.in/eNbACU-3)
12. McKinsey - "Seizing the Agentic AI Advantage" - CEO playbook for scalable impact (https://lnkd.in/ejkvShKE)

Key consensus points across all Expert Positions:
- Multi-agent orchestration is the dominant architecture pattern [HIGH CONSENSUS]
- RAG (Retrieval Augmented Generation) is essential for enterprise context [HIGH CONSENSUS]
- Governance frameworks must be board-level priority [HIGH CONSENSUS]
- 2026 is widely seen as "Year of the Agent" [MODERATE CONSENSUS]
- Build core differentiators, buy foundation models [MODERATE CONSENSUS]
- Typical ROI timeline is 18-24 months [CONTESTED - ranges from 12-36 months]
- Investment levels range from 2-4% of revenue [CONTESTED - ranges from 1-5%]

Key divergences (treat as legitimate disagreements, not errors):
- Build vs Buy priorities vary by firm type
- Timeline expectations range from 6-36 months
- Risk appetite differs significantly
- Consulting firms vs Tech companies have different perspectives

BIAS DETECTION - Explicitly flag when you observe:
- Vendor self-positioning (e.g., AWS recommending AWS services)
- Service upsell language (e.g., "partner with experts" = hire us)
- Repeated slogans or branded metaphors (e.g., "reinvention" used 47 times)
- Cherry-picked case studies (clients of the firm writing the playbook)
Use neutral, professional language. Avoid sarcasm.

CONFIDENCE LABELING - For every major insight, recommendation, or disagreement, label confidence as:
- HIGH CONSENSUS: 8+ Expert Positions agree, clear evidence
- MODERATE CONSENSUS: 5-7 Expert Positions align, some variation
- CONTESTED: Significant disagreement or <5 sources

DECISION IMPLICATIONS - For each key insight, include:
"Decision Implication: [What should a leadership team do differently because of this?]"

EXECUTIVE OUTPUT STANDARDS:
- Assume outputs may be read verbatim in a board or exec meeting
- Language must be concise, defensible, and free of hype or emojis
- Avoid speculation, hedged language, or unsubstantiated claims

When answering questions:
1. Synthesize insights across multiple Expert Positions
2. Highlight consensus and divergent views with confidence labels
3. Cite specific sources when relevant
4. Provide actionable recommendations with decision implications
5. Tailor responses to the user's role context (CEO, CTO, or MBA Student)
6. Flag any bias or hidden agendas in the source material`;

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

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return { userId: null, error: 'Server configuration error' };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } }
  });

  const token = authHeader.replace('Bearer ', '');
  const { data, error } = await supabase.auth.getClaims(token);
  
  if (error || !data?.claims) {
    return { userId: null, error: 'Invalid or expired token' };
  }

  return { userId: data.claims.sub as string, error: null };
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

    const body = await req.json();
    const { message, role, history } = body;
    
    // Input validation
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid message: must be a non-empty string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (role && !VALID_ROLES.includes(role)) {
      return new Response(
        JSON.stringify({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (history) {
      if (!Array.isArray(history)) {
        return new Response(
          JSON.stringify({ error: "Invalid history: must be an array" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (history.length > MAX_HISTORY_LENGTH) {
        return new Response(
          JSON.stringify({ error: `History too long (max ${MAX_HISTORY_LENGTH} messages)` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const roleContext = {
      CEO: "Focus on strategic implications, competitive positioning, ROI, and market timing.",
      CTO: "Focus on technical implementation, architecture decisions, build vs buy, and scaling strategies.",
      MBA: "Focus on frameworks, case studies, key theories, and exam-relevant concepts."
    };

    const systemPrompt = `${PLAYBOOK_CONTEXT}

Current user role: ${role || 'general'}
${roleContext[role as keyof typeof roleContext] || ""}

Provide helpful, accurate responses based on the playbook content. Be specific and cite sources when possible.`;

    // Validate and sanitize history entries
    const sanitizedHistory = (history || [])
      .filter((m: unknown) => m && typeof m === 'object' && 'role' in m && 'content' in m)
      .slice(0, MAX_HISTORY_LENGTH)
      .map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: typeof m.content === 'string' ? m.content.slice(0, MAX_MESSAGE_LENGTH) : ''
      }));

    const messages = [
      { role: "system", content: systemPrompt },
      ...sanitizedHistory,
      { role: "user", content: message.slice(0, MAX_MESSAGE_LENGTH) }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "API credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error(`AI gateway error: ${response.status}`);
      throw new Error("AI service temporarily unavailable");
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    logSafeError("Chat error", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
