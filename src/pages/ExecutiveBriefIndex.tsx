import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';

interface ExecutiveBrief {
  id: string;
  date: string;
  source_title: string;
  what_happened: string;
}

const ExecutiveBriefIndex = () => {
  const [briefs, setBriefs] = useState<ExecutiveBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBriefs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('executive_brief')
          .select('id, date, source_title, what_happened')
          .order('date', { ascending: false });

        if (error) throw error;
        setBriefs(data || []);
      } catch (err) {
        console.error('Error fetching briefs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBriefs();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-40 pb-24 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">The Executive Brief</h1>
              <p className="text-xl text-muted-foreground">
                A simple daily AI briefing for busy leaders.
              </p>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : briefs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No briefs available yet. Check back soon!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {briefs.map((brief) => (
                  <Card 
                    key={brief.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/executive-brief/${brief.id}`)}
                  >
                    <CardHeader>
                      <CardDescription>
                        {new Date(brief.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                      <CardTitle className="text-2xl">{brief.source_title}</CardTitle>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2">
                        {brief.what_happened}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="group">
                        Read this brief
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ExecutiveBriefIndex;
