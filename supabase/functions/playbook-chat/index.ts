import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation constants
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 50;
const VALID_ROLES = ['CEO', 'CTO', 'MBA', 'general'];

const PLAYBOOK_CONTEXT = `You are an AI assistant specialized in analyzing 12 strategy playbooks about Agentic AI from leading consulting firms and organizations. These playbooks were published between June and November 2025.

The 12 playbooks you have knowledge of:
1. McKinsey - "The State of AI in 2025" (June 2025) - Strategic positioning
2. PwC - "Agentic AI Reinvention" (July 2025) - Business reinvention frameworks
3. McKinsey - "The Agentic AI Opportunity" (July 2025) - Opportunity sizing
4. Accenture - "Six Key Insights for AI ROI" (August 2025) - ROI metrics and frameworks
5. AWS - "The Rise of Autonomous Agents" (August 2025) - Technical architecture
6. Bain & Company - "From Hype to Reality" (August 2025) - Practical implementation
7. IBM - "Agentic AI Operating Model" (September 2025) - Operating model design
8. Deloitte - "Agentic Enterprise 2028" (September 2025) - Future scenarios
9. BCG - "Leading in the Age of AI Agents" (October 2025) - Leadership transformation
10. McKinsey - "The Agentic Organization" (October 2025) - Organizational design
11. World Economic Forum - "AI Agents in Action" (November 2025) - Global implications
12. McKinsey - "Seizing the Agentic AI Advantage" (November 2025) - Competitive strategy

Key consensus points across all playbooks:
- Multi-agent orchestration is the dominant architecture pattern
- RAG (Retrieval Augmented Generation) is essential for enterprise context
- Governance frameworks must be board-level priority
- 2026 is widely seen as "Year of the Agent"
- Build core differentiators, buy foundation models
- Typical ROI timeline is 18-24 months
- Investment levels range from 2-4% of revenue

Key divergences:
- Build vs Buy priorities vary by firm type
- Timeline expectations range from 6-36 months
- Risk appetite differs significantly
- Consulting firms vs Tech companies have different perspectives

When answering questions:
1. Synthesize insights across multiple playbooks
2. Highlight consensus and divergent views
3. Cite specific sources when relevant
4. Provide actionable recommendations
5. Tailor responses to the user's role context (CEO, CTO, or MBA Student)`;

// Safe error logging - no sensitive details
function logSafeError(context: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${context}: ${error.name}`);
  } else {
    console.error(`${context}: Unknown error type`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
