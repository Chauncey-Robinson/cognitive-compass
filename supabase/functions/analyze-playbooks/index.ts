import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { playbook_ids } = await req.json();
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
        console.error(`Analysis failed for ${role}:`, response.status);
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
        console.error(`Failed to parse JSON for ${role}:`, e);
        analysisData = {};
      }

      // Store analysis
      const { error } = await supabase.from("playbook_analyses").insert({
        role_type: role,
        analysis_data: analysisData,
        playbook_ids: playbook_ids || [],
      });

      if (error) {
        console.error(`Failed to store analysis for ${role}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Analysis complete for all roles" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
