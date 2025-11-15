import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SampleInput {
  url: string;
  title: string;
  summary: string;
}

interface AIResponse {
  whatHappened: string;
  explainLikeIm10: string;
  whyItMatters: string;
  leaderAction: string;
}

async function generateExecutiveBrief() {
  // Sample inputs - in the future this can be replaced with RSS feeds or APIs
  const sampleInputs: SampleInput[] = [
    {
      url: 'https://example.com/mit-ai-paper',
      title: 'Smaller AI Models with Better Data',
      summary: 'MIT researchers show that smaller models trained on higher-quality data can match or beat larger models, changing the cost-benefit tradeoff of scaling.'
    },
    {
      url: 'https://example.com/openai-multimodal',
      title: 'New Multimodal Assistant Capabilities',
      summary: 'OpenAI releases a model that can process text, images, audio, and video together, enabling more natural assistant-like behavior.'
    }
  ];

  // Pick the first item as today's main story
  const main = sampleInputs[0];

  // Call AI to generate the brief
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  if (!LOVABLE_API_KEY) {
    throw new Error('LOVABLE_API_KEY not configured');
  }

  const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are Oxford Intelligence, creating THE EXECUTIVE BRIEF.

Your job: Turn complex AI news into a simple, short briefing for business leaders.
Reading level: 5th grade. Tone: calm, clear, confident.

Given a short article summary, output a JSON object with:
- whatHappened: 1–2 sentences, plain English.
- explainLikeIm10: 1–2 sentences, a 10-year-old could read and say out loud.
- whyItMatters: 2–3 sentences for executives, focused on business impact.
- leaderAction: 1 sentence: one concrete move a leader can take this week.

Keep everything short, simple, and direct.
No jargon. No buzzwords.`
        },
        {
          role: 'user',
          content: `Article title: ${main.title}\nArticle summary: ${main.summary}\n\nReturn ONLY a JSON object with the four fields: whatHappened, explainLikeIm10, whyItMatters, leaderAction.`
        }
      ],
    }),
  });

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();
    console.error('AI API error:', aiResponse.status, errorText);
    throw new Error(`AI API error: ${aiResponse.status}`);
  }

  const aiData = await aiResponse.json();
  const content = aiData.choices[0].message.content;
  
  // Parse the JSON response
  let parsed: AIResponse;
  try {
    // Extract JSON if it's wrapped in markdown code blocks
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : content;
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error('Failed to parse AI response:', content);
    throw new Error('Failed to parse AI response as JSON');
  }

  return {
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    sourceUrl: main.url,
    sourceTitle: main.title,
    sourceType: 'research',
    whatHappened: parsed.whatHappened,
    explainLikeIm10: parsed.explainLikeIm10,
    whyItMatters: parsed.whyItMatters,
    leaderAction: parsed.leaderAction,
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    if (action === 'generate') {
      // Admin endpoint to generate a new brief
      console.log('Generating new executive brief...');
      const briefData = await generateExecutiveBrief();

      // Insert into database (will update if date already exists due to UNIQUE constraint)
      const { data, error } = await supabase
        .from('executive_brief')
        .upsert(briefData, { onConflict: 'date' })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Default: Get today's brief
    const today = new Date().toISOString().split('T')[0];
    
    // Try to find today's brief
    const { data: existingBrief, error: fetchError } = await supabase
      .from('executive_brief')
      .select('*')
      .eq('date', today)
      .maybeSingle();

    if (fetchError) {
      console.error('Database fetch error:', fetchError);
      throw fetchError;
    }

    if (existingBrief) {
      // Brief exists, return it
      return new Response(JSON.stringify(existingBrief), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Brief doesn't exist, generate it
    console.log('No brief found for today, generating...');
    const briefData = await generateExecutiveBrief();

    const { data, error } = await supabase
      .from('executive_brief')
      .insert(briefData)
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in executive-brief function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
