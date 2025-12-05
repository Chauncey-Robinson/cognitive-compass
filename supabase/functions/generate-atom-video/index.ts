import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HeyGen Configuration
const HEYGEN_AVATAR_ID = "Jocelyn_standing_sofa_front";
const HEYGEN_VOICE_ID = "1bd001e7e50f421d891986aad5158bc8";

async function generateHeyGenVideo(script: string): Promise<{ videoUrl: string | null; videoId: string | null; status: string }> {
  const HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY");
  if (!HEYGEN_API_KEY) {
    console.log("No HEYGEN_API_KEY found");
    return { videoUrl: null, videoId: null, status: "no_api_key" };
  }
  
  console.log("🎬 Generating HeyGen video for atom lesson...");
  
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
      const errorText = await resp.text();
      console.log(`HeyGen API error: ${resp.status} - ${errorText}`);
      return { videoUrl: null, videoId: null, status: "api_error" };
    }
    
    const data = await resp.json();
    const videoId = data.data?.video_id;
    if (!videoId) {
      console.log("No video_id returned from HeyGen");
      return { videoUrl: null, videoId: null, status: "no_video_id" };
    }
    
    console.log(`Video generation started, video_id: ${videoId}`);
    
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
        console.log(`✅ Video ready: ${videoUrl}`);
        return { videoUrl, videoId, status: "completed" };
      } else if (status === "failed") {
        console.log("❌ Video generation failed");
        return { videoUrl: null, videoId, status: "failed" };
      }
      
      console.log(`Video status: ${status}, waiting...`);
    }
    
    // Return pending status with video_id for client to poll later
    return { videoUrl: null, videoId, status: "pending" };
  } catch (error) {
    console.log("HeyGen error:", error);
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
    console.log("Status check error:", error);
    return { videoUrl: null, status: "error" };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, script, atomId, videoId } = await req.json();
    
    if (action === "check_status" && videoId) {
      const result = await checkVideoStatus(videoId);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    if (action === "generate" && script) {
      console.log(`Generating video for atom ${atomId}: "${script.slice(0, 50)}..."`);
      const result = await generateHeyGenVideo(script);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    return new Response(
      JSON.stringify({ error: "Invalid request. Provide action and required params." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("generate-atom-video error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
