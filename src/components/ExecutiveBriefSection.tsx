import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';

interface ExecutiveBrief {
  id: string;
  date: string;
  source_url: string | null;
  source_title: string;
  what_happened: string;
  explain_like_im_10: string;
  why_it_matters: string;
  leader_action: string;
}

const ExecutiveBriefSection = () => {
  const [brief, setBrief] = useState<ExecutiveBrief | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodaysBrief = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('executive-brief');
        
        if (error) throw error;
        setBrief(data);
      } catch (err) {
        console.error('Error fetching executive brief:', err);
        setError("Today's brief is still loading. Check back soon.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysBrief();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">The Executive Brief</h2>
          <p className="text-muted-foreground mb-8">AI news made simple for leaders.</p>
          <Card>
            <CardContent className="py-12">
              <p className="text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!brief) return null;

  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">The Executive Brief</h2>
          <p className="text-xl text-muted-foreground">AI news made simple for leaders.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{brief.source_title}</CardTitle>
            <CardDescription>
              {new Date(brief.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary">What happened</h3>
              <p className="text-foreground leading-relaxed">{brief.what_happened}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Explain it like I'm 10</h3>
              <p className="text-foreground leading-relaxed">{brief.explain_like_im_10}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Why it matters</h3>
              <p className="text-foreground leading-relaxed">{brief.why_it_matters}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary">What to do this week</h3>
              <p className="text-foreground leading-relaxed">{brief.leader_action}</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={() => navigate('/executive-brief')}
            className="group"
          >
            View all briefs
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveBriefSection;
