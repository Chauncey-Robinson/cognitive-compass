import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation constants
const MAX_PLAYBOOK_IDS = 100;

// Safe error logging - no sensitive details
function logSafeError(context: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${context}: ${error.name}`);
  } else {
    console.error(`${context}: Unknown error type`);
  }
}

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
    const { playbook_ids } = body;
    
    // Input validation
    if (playbook_ids !== undefined) {
      if (!Array.isArray(playbook_ids)) {
        return new Response(
          JSON.stringify({ error: "playbook_ids must be an array" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (playbook_ids.length > MAX_PLAYBOOK_IDS) {
        return new Response(
          JSON.stringify({ error: `Too many playbook IDs (max ${MAX_PLAYBOOK_IDS})` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Validate each ID is a valid UUID
      for (const id of playbook_ids) {
        if (typeof id !== 'string' || !UUID_REGEX.test(id)) {
          return new Response(
            JSON.stringify({ error: "Invalid playbook ID format. Must be valid UUIDs." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const roles = ["CEO", "CTO", "MBA"];
    const rolePrompts = {
      CEO: `Analyze these agentic AI playbooks from a CEO perspective. Extract:
- Strategic implications for business positioning
- Competitive positioning insights
- ROI focus areas and metrics
- Market timing considerations
Return as JSON with keys: strategic_implications, competitive_positioning, roi_focus, market_timing (each an array of 4 key insights)`,
      
      CTO: `Analyze these agentic AI playbooks from a CTO perspective. Extract:
- Technical implementation approaches
- Architecture decisions and patterns
- Build vs buy recommendations
- Scaling strategies
Return as JSON with keys: technical_implementation, architecture_decisions, build_vs_buy, scaling_strategies (each an array of 4 key insights)`,
      
      MBA: `Analyze these agentic AI playbooks from an MBA student perspective. Extract:
- Key business frameworks mentioned
- Relevant case studies
- Core theories applicable to exams
- Key exam concepts and definitions
Return as JSON with keys: frameworks, case_studies, key_theories, exam_concepts (each an array of 4 key insights)`
    };

    for (const role of roles) {
      console.log(`Analyzing for role: ${role}`);
      
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { 
              role: "system", 
              content: `You are an expert analyst synthesizing insights from 12 leading strategy playbooks about Agentic AI published by McKinsey, PwC, Accenture, AWS, Bain, IBM, Deloitte, BCG, and WEF between June-November 2025. Return only valid JSON.` 
            },
            { role: "user", content: rolePrompts[role as keyof typeof rolePrompts] }
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        console.error(`Analysis failed for ${role}: ${response.status}`);
        continue;
      }

      const data = await response.json();
      let content = data.choices?.[0]?.message?.content || "{}";
      
      // Clean up JSON response
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      let analysisData = {};
      try {
        analysisData = JSON.parse(content);
      } catch (e) {
        console.error(`Failed to parse JSON for ${role}`);
        analysisData = {};
      }

      // Store analysis with user_id for RLS
      const { error } = await supabase.from("playbook_analyses").insert({
        role_type: role,
        analysis_data: analysisData,
        playbook_ids: playbook_ids || [],
        user_id: userId,
      });

      if (error) {
        console.error(`Failed to store analysis for ${role}`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Analysis complete for all roles" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    logSafeError("Analysis error", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
