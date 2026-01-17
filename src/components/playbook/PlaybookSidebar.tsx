import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
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
  { title: "The Rise of Autonomous Agents", company: "AWS", date: "2025-08-15", category: "Build" },
  { title: "From Hype to Reality", company: "Bain & Company", date: "2025-08-28", category: "Strategy" },
  { title: "Agentic AI Operating Model", company: "IBM", date: "2025-09-10", category: "Leadership" },
  { title: "Agentic Enterprise 2028", company: "Deloitte", date: "2025-09-25", category: "Strategy" },
  { title: "Leading in the Age of AI Agents", company: "BCG", date: "2025-10-05", category: "Leadership" },
  { title: "The Agentic Organization", company: "McKinsey", date: "2025-10-20", category: "Leadership" },
  { title: "AI Agents in Action", company: "World Economic Forum", date: "2025-11-01", category: "Strategy" },
  { title: "Seizing the Agentic AI Advantage", company: "McKinsey", date: "2025-11-15", category: "Strategy" },
];

const companyLogos: Record<string, string> = {
  "McKinsey": "🔵",
  "PwC": "🟠",
  "Accenture": "🟣",
  "AWS": "🟡",
  "Bain & Company": "🔴",
  "IBM": "🔷",
  "Deloitte": "🟢",
  "BCG": "⬛",
  "World Economic Forum": "🌐",
};

const categoryColors: Record<string, string> = {
  "Strategy": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Build": "bg-green-500/20 text-green-400 border-green-500/30",
  "Leadership": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

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
    if (!dateStr) return "Unknown";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <aside className="w-80 border-r bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Playbook Library
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {playbooks.length} documents loaded
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 border-b space-y-2">
        {playbooks.length === 0 && (
          <Button 
            onClick={initializePreloadedPlaybooks} 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Load 12 Playbooks
          </Button>
        )}
        
        {playbooks.length > 0 && (
          <Button 
            onClick={analyzeAllPlaybooks}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={analyzing}
          >
            {analyzing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {analyzing ? "Analyzing..." : "Analyze All 12 Playbooks"}
          </Button>
        )}
      </div>

      {/* Playbook List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {loading && playbooks.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : playbooks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No playbooks loaded yet</p>
              <p className="text-xs mt-1">Click above to load the 12 strategy playbooks</p>
            </div>
          ) : (
            playbooks.map((playbook) => (
              <Card 
                key={playbook.id} 
                className="p-3 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">{companyLogos[playbook.company] || "📄"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight truncate">
                      {playbook.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {playbook.company}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant="outline" 
                        className={`text-[10px] px-1.5 py-0 ${categoryColors[playbook.category]}`}
                      >
                        {playbook.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {formatDate(playbook.publication_date)}
                      </span>
                      {playbook.content_extracted ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Category Legend */}
      <div className="p-3 border-t bg-muted/30">
        <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">Categories</p>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className={categoryColors["Strategy"]}>Strategy</Badge>
          <Badge variant="outline" className={categoryColors["Build"]}>Build</Badge>
          <Badge variant="outline" className={categoryColors["Leadership"]}>Leadership</Badge>
        </div>
      </div>
    </aside>
  );
}
