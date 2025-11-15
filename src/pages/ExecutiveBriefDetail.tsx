import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import ListenButton from '@/components/ListenButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ExternalLink } from 'lucide-react';

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

const ExecutiveBriefDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [brief, setBrief] = useState<ExecutiveBrief | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrief = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('executive_brief')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBrief(data);
      } catch (err) {
        console.error('Error fetching brief:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrief();
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-40 pb-24 px-6">
            <div className="mx-auto max-w-4xl">
              <Skeleton className="h-10 w-32 mb-8" />
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-8">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </PageTransition>
    );
  }

  if (!brief) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-40 pb-24 px-6">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-muted-foreground mb-8">Brief not found.</p>
              <Button onClick={() => navigate('/executive-brief')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all briefs
              </Button>
            </div>
          </main>
        </div>
      </PageTransition>
    );
  }

  const fullText = `
    ${brief.source_title}.
    What happened: ${brief.what_happened}
    Explain it like I'm 10: ${brief.explain_like_im_10}
    Why it matters: ${brief.why_it_matters}
    What to do this week: ${brief.leader_action}
  `;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-40 pb-24 px-6">
          <div className="mx-auto max-w-4xl">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/executive-brief')}
              className="mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all briefs
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{brief.source_title}</CardTitle>
                    <CardDescription className="text-base">
                      {new Date(brief.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </div>
                  <ListenButton text={fullText} />
                </div>
                {brief.source_url && (
                  <a 
                    href={brief.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    View source
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
              </CardHeader>

              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">What happened</h3>
                  <p className="text-foreground leading-relaxed text-lg">{brief.what_happened}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Explain it like I'm 10</h3>
                  <p className="text-foreground leading-relaxed text-lg">{brief.explain_like_im_10}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Why it matters</h3>
                  <p className="text-foreground leading-relaxed text-lg">{brief.why_it_matters}</p>
                </div>

                <div className="bg-secondary/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-primary">What to do this week</h3>
                  <p className="text-foreground leading-relaxed text-lg font-medium">{brief.leader_action}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ExecutiveBriefDetail;
