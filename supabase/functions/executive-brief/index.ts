import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsItem {
  url: string;
  title: string;
  summary: string;
  type: 'research' | 'news' | 'report' | 'other';
}

interface AIResponse {
  whatHappened: string;
  explainLikeIm10: string;
  whyItMatters: string;
  leaderAction: string;
}

// Fetch and parse RSS feeds from AI news sources
async function fetchAINews(): Promise<NewsItem[]> {
  const rssSources = [
    'https://openai.com/blog/rss.xml',
    'https://blog.google/technology/ai/rss',
    'https://www.anthropic.com/news/rss',
  ];

  const newsItems: NewsItem[] = [];

  for (const rssUrl of rssSources) {
    try {
      const response = await fetch(rssUrl);
      if (!response.ok) continue;

      const xmlText = await response.text();
      
      // Simple RSS parsing - extract items
      const itemMatches = xmlText.matchAll(/<item>([\s\S]*?)<\/item>/g);
      
      for (const match of itemMatches) {
        const itemXml = match[1];
        
        const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
        const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
        const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/);
        
        if (titleMatch && linkMatch) {
          const title = (titleMatch[1] || titleMatch[2] || '').trim();
          const url = linkMatch[1].trim();
          const description = (descMatch?.[1] || descMatch?.[2] || '').trim()
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .substring(0, 500); // Limit length
          
          if (title && url) {
            newsItems.push({
              url,
              title,
              summary: description || title,
              type: rssUrl.includes('openai') || rssUrl.includes('anthropic') ? 'news' : 'research'
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching RSS from ${rssUrl}:`, error);
    }
  }

  return newsItems;
}

async function generateExecutiveBrief() {
  // Fetch real AI news from RSS feeds
  console.log('Fetching AI news from RSS feeds...');
  const newsItems = await fetchAINews();
  
  // If no news found, use fallback
  if (newsItems.length === 0) {
    console.log('No news found from RSS feeds, using fallback');
    newsItems.push({
      url: 'https://openai.com',
      title: 'AI Industry Update',
      summary: 'The AI industry continues to evolve with new developments in large language models, safety research, and practical applications across various sectors.',
      type: 'news'
    });
  }

  // Pick the most recent item as today's main story
  const main = newsItems[0];
  console.log(`Selected story: ${main.title}`);

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
    source_url: main.url,
    source_title: main.title,
    source_type: main.type,
    what_happened: parsed.whatHappened,
    explain_like_im_10: parsed.explainLikeIm10,
    why_it_matters: parsed.whyItMatters,
    leader_action: parsed.leaderAction,
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
