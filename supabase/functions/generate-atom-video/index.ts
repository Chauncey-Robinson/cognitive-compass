import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation constants
const MAX_SCRIPT_LENGTH = 2000;
const VALID_ACTIONS = ['generate', 'check_status'];

// HeyGen Configuration
const HEYGEN_AVATAR_ID = "Jocelyn_standing_sofa_front";
const HEYGEN_VOICE_ID = "1bd001e7e50f421d891986aad5158bc8";

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

async function generateHeyGenVideo(script: string): Promise<{ videoUrl: string | null; videoId: string | null; status: string }> {
  const HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY");
  if (!HEYGEN_API_KEY) {
    console.log("HeyGen API key not configured");
    return { videoUrl: null, videoId: null, status: "no_api_key" };
  }
  
  console.log("Generating HeyGen video for atom lesson");
  
  const payload = {
    video_inputs: [{
      character: { 
        type: "avatar", 
        avatar_id: HEYGEN_AVATAR_ID, 
        avatar_style: "normal" 
      },
      voice: { 
        type: "text", 
        input_text: script.slice(0, 1500),
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
      return { videoUrl: null, videoId: null, status: "api_error" };
    }
    
    const data = await resp.json();
    const videoId = data.data?.video_id;
    if (!videoId) {
      console.log("No video_id returned from HeyGen");
      return { videoUrl: null, videoId: null, status: "no_video_id" };
    }
    
    console.log(`Video generation started: ${videoId}`);
    
    // Poll for completion (max 90 seconds with 5 second intervals)
    const statusUrl = `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`;
    for (let attempt = 0; attempt < 18; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const statusResp = await fetch(statusUrl, {
        headers: { "X-Api-Key": HEYGEN_API_KEY }
      });
      
      if (!statusResp.ok) continue;
      
      const statusData = await statusResp.json();
      const status = statusData.data?.status;
      
      if (status === "completed") {
        const videoUrl = statusData.data?.video_url;
        console.log("Video generation completed");
        return { videoUrl, videoId, status: "completed" };
      } else if (status === "failed") {
        console.log("Video generation failed");
        return { videoUrl: null, videoId, status: "failed" };
      }
      
      console.log(`Video status: ${status}`);
    }
    
    // Return pending status with video_id for client to poll later
    return { videoUrl: null, videoId, status: "pending" };
  } catch (error) {
    logSafeError("HeyGen video generation", error);
    return { videoUrl: null, videoId: null, status: "error" };
  }
}

async function checkVideoStatus(videoId: string): Promise<{ videoUrl: string | null; status: string }> {
  const HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY");
  if (!HEYGEN_API_KEY) {
    return { videoUrl: null, status: "no_api_key" };
  }
  
  try {
    const statusUrl = `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`;
    const statusResp = await fetch(statusUrl, {
      headers: { "X-Api-Key": HEYGEN_API_KEY }
    });
    
    if (!statusResp.ok) {
      console.error(`HeyGen status check error: ${statusResp.status}`);
      return { videoUrl: null, status: "api_error" };
    }
    
    const statusData = await statusResp.json();
    const status = statusData.data?.status;
    
    if (status === "completed") {
      return { videoUrl: statusData.data?.video_url, status: "completed" };
    } else if (status === "failed") {
      return { videoUrl: null, status: "failed" };
    }
    
    return { videoUrl: null, status: status || "unknown" };
  } catch (error) {
    logSafeError("Video status check", error);
    return { videoUrl: null, status: "error" };
  }
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
    const { action, script, atomId, videoId } = body;
    
    // Input validation
    if (!action || typeof action !== 'string' || !VALID_ACTIONS.includes(action)) {
      return new Response(
        JSON.stringify({ error: `Invalid action. Must be one of: ${VALID_ACTIONS.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (action === "check_status") {
      if (!videoId || typeof videoId !== 'string') {
        return new Response(
          JSON.stringify({ error: "videoId is required for check_status action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Validate videoId format (alphanumeric with dashes)
      if (!/^[a-zA-Z0-9-]+$/.test(videoId)) {
        return new Response(
          JSON.stringify({ error: "Invalid videoId format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const result = await checkVideoStatus(videoId);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    if (action === "generate") {
      if (!script || typeof script !== 'string') {
        return new Response(
          JSON.stringify({ error: "script is required for generate action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (script.length > MAX_SCRIPT_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Script too long (max ${MAX_SCRIPT_LENGTH} characters)` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log(`Generating video for atom: ${typeof atomId === 'string' ? atomId.slice(0, 50) : 'unknown'}`);
      const result = await generateHeyGenVideo(script);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    logSafeError("generate-atom-video", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
