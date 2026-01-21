import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Playbook {
  id: string;
  title: string;
  company: string;
  publication_date: string | null;
  category: string;
  is_preloaded: boolean;
  content_extracted: string | null;
}

const PRELOADED_PLAYBOOKS = [
  { title: "The State of AI in 2025", company: "McKinsey", date: "2025-06-15", category: "Strategy" },
  { title: "Agentic AI Reinvention", company: "PwC", date: "2025-07-01", category: "Strategy" },
  { title: "The Agentic AI Opportunity", company: "McKinsey", date: "2025-07-20", category: "Strategy" },
  { title: "Six Key Insights for AI ROI", company: "Accenture", date: "2025-08-05", category: "Build" },
  { title: "The Rise of Autonomous Agents", company: "Amazon", date: "2025-08-15", category: "Build" },
  { title: "From Hype to Reality", company: "Bain", date: "2025-08-28", category: "Strategy" },
  { title: "Agentic AI Operating Model", company: "IBM", date: "2025-09-10", category: "Leadership" },
  { title: "Agentic Enterprise 2028", company: "Deloitte", date: "2025-09-25", category: "Strategy" },
  { title: "Leading in the Age of AI Agents", company: "BCG", date: "2025-10-05", category: "Leadership" },
  { title: "The Agentic Organization", company: "McKinsey", date: "2025-10-20", category: "Leadership" },
  { title: "AI Agents in Action", company: "WEF", date: "2025-11-01", category: "Strategy" },
  { title: "Seizing the Agentic AI Advantage", company: "McKinsey", date: "2025-11-15", category: "Strategy" },
];

export function PlaybookSidebar() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlaybooks();
  }, []);

  const fetchPlaybooks = async () => {
    const { data, error } = await supabase
      .from("playbooks")
      .select("*")
      .order("publication_date", { ascending: true });

    if (error) {
      console.error("Error fetching playbooks:", error);
    } else {
      setPlaybooks(data || []);
    }
    setLoading(false);
  };

  const initializePreloadedPlaybooks = async () => {
    setLoading(true);
    
    for (const pb of PRELOADED_PLAYBOOKS) {
      const { error } = await supabase.from("playbooks").insert({
        title: pb.title,
        company: pb.company,
        publication_date: pb.date,
        category: pb.category,
        is_preloaded: true,
      });
      
      if (error && !error.message.includes("duplicate")) {
        console.error("Error inserting playbook:", error);
      }
    }
    
    await fetchPlaybooks();
    toast({
      title: "Playbooks Loaded",
      description: "12 strategy playbooks have been added to your library.",
    });
  };

  const analyzeAllPlaybooks = async () => {
    setAnalyzing(true);
    toast({
      title: "Analysis Started",
      description: "Analyzing all 12 playbooks with AI. This may take a moment...",
    });

    try {
      const response = await supabase.functions.invoke("analyze-playbooks", {
        body: { playbook_ids: playbooks.map(p => p.id) },
      });

      if (response.error) throw response.error;

      toast({
        title: "Analysis Complete",
        description: "AI has finished analyzing all playbooks. Check the insights tabs!",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Error",
        description: "There was an error analyzing the playbooks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <aside className="w-72 border-r border-border/50 bg-background flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border/50">
        <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Expert Positions
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {playbooks.length} documents
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-border/30">
        {playbooks.length === 0 && (
          <Button 
            onClick={initializePreloadedPlaybooks} 
            variant="outline"
            className="w-full text-sm"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Load 12 Expert Positions
          </Button>
        )}
        
        {playbooks.length > 0 && (
          <Button 
            onClick={analyzeAllPlaybooks}
            variant="outline"
            className="w-full text-sm"
            disabled={analyzing}
          >
            {analyzing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {analyzing ? "Analyzing..." : "Analyze All"}
          </Button>
        )}
      </div>

      {/* Playbook List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {loading && playbooks.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : playbooks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-3 opacity-20" />
              <p className="text-xs">No positions loaded</p>
            </div>
          ) : (
            playbooks.map((playbook) => (
              <div 
                key={playbook.id} 
                className="p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer border border-transparent hover:border-border/50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground/80 leading-tight truncate">
                      {playbook.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-muted-foreground">{playbook.company}</span>
                      <span className="text-muted-foreground/30">·</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(playbook.publication_date)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {playbook.content_extracted ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-foreground/40" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-muted-foreground/50" />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border/30">
        <div className="flex gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-muted/30 border-border/50">Strategy</Badge>
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-muted/30 border-border/50">Build</Badge>
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-muted/30 border-border/50">Leadership</Badge>
        </div>
      </div>
    </aside>
  );
}