import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, RefreshCw, ExternalLink, Filter, Clock, AlertCircle, Rocket, Building2, Scale } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

type TopicGroup = "research" | "industry" | "policy";

interface BriefItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  tag: "Tech" | "Policy" | "Research" | "Industry" | "Risk";
  summary: string;
  impact: string;
  importanceScore: number;
  topicGroup: TopicGroup;
}

interface ExecutiveBrief {
  generatedAt: string;
  timeRange: string;
  items: BriefItem[];
  rejectedCount: number;
  sourcesUsed: string[];
  groupedItems: Record<TopicGroup, BriefItem[]>;
}

const TAG_COLORS: Record<string, string> = {
  Tech: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Policy: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Research: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Industry: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Risk: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const TOPIC_CONFIG: Record<TopicGroup, { title: string; emoji: React.ReactNode; color: string }> = {
  research: {
    title: "Major Research Breakthroughs",
    emoji: <Rocket className="h-5 w-5" />,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  industry: {
    title: "Industry News & Releases",
    emoji: <Building2 className="h-5 w-5" />,
    color: "text-blue-600 dark:text-blue-400"
  },
  policy: {
    title: "Policy & Safety",
    emoji: <Scale className="h-5 w-5" />,
    color: "text-violet-600 dark:text-violet-400"
  }
};

const ExecutiveBrief = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [brief, setBrief] = useState<ExecutiveBrief | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "14d" | "30d">("7d");
  const [tagFilter, setTagFilter] = useState<string>("All");
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const fetchBrief = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/executive-brief?range=${timeRange}&max=20&tag=${tagFilter}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a few minutes.");
        }
        if (response.status === 402) {
          throw new Error("Usage limit reached. Please add credits to continue.");
        }
        throw new Error(`Failed to fetch brief: ${response.status}`);
      }
      
      const briefData = await response.json();
      setBrief(briefData);
    } catch (err) {
      console.error("Error fetching brief:", err);
      setError(err instanceof Error ? err.message : "Failed to load executive brief");
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to load executive brief",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrief();
  }, [timeRange]);

  const handleDownloadPdf = async () => {
    if (!brief) return;
    
    setDownloadingPdf(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/executive-brief-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ brief }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }
      
      const html = await response.text();
      
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai_research_and_news_${new Date().toISOString().split("T")[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Your executive brief has been downloaded.",
      });
    } catch (err) {
      console.error("PDF download error:", err);
      toast({
        title: "Download Failed",
        description: "Unable to generate the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingPdf(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return "bg-emerald-900 text-emerald-100";
    if (score >= 8) return "bg-blue-900 text-blue-100";
    return "bg-slate-800 text-slate-200";
  };

  const renderTopicSection = (group: TopicGroup, items: BriefItem[]) => {
    // Apply tag filter
    const filteredItems = tagFilter === "All" 
      ? items 
      : items.filter(item => item.tag === tagFilter);
    
    if (filteredItems.length === 0) return null;
    
    const config = TOPIC_CONFIG[group];
    
    return (
      <div key={group} className="mb-10">
        <div className={`flex items-center gap-3 mb-4 pb-2 border-b border-border`}>
          <span className={config.color}>{config.emoji}</span>
          <h2 className={`text-xl font-bold ${config.color}`}>{config.title}</h2>
          <span className="text-sm text-muted-foreground">({filteredItems.length})</span>
        </div>
        
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${TAG_COLORS[item.tag]}`}>
                    {item.tag}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${getScoreColor(item.importanceScore)}`}>
                    [Score: {item.importanceScore}/10]
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.source} · {formatDate(item.publishedAt)}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 leading-tight">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  {item.title}
                  <ExternalLink className="h-4 w-4 opacity-50" />
                </a>
              </h3>
              
              <p className="text-foreground/90 mb-3 leading-relaxed">
                {item.summary}
              </p>
              
              <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                💡 {item.impact}
              </p>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => navigate("/executive")}
              className="mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Executive Mode
            </Button>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                Executive Brief
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                AI research and news, scored and organized for leaders.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8 p-4 glass-card rounded-2xl">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Time range:</span>
                <div className="flex gap-1">
                  {(["24h", "7d", "14d", "30d"] as const).map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                      className="h-8"
                    >
                      {range === "24h" ? "24h" : range === "7d" ? "7 days" : range === "14d" ? "14 days" : "30 days"}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <div className="flex gap-1 flex-wrap">
                  {["All", "Tech", "Policy", "Research", "Industry", "Risk"].map((tag) => (
                    <Button
                      key={tag}
                      variant={tagFilter === tag ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTagFilter(tag)}
                      className="h-8"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                variant="outline"
                onClick={fetchBrief}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={handleDownloadPdf}
                disabled={!brief || downloadingPdf || loading}
              >
                <Download className="h-4 w-4 mr-2" />
                {downloadingPdf ? "Generating..." : "Download PDF"}
              </Button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                </div>
                <h3 className="text-lg font-medium mb-2">Generating Your Brief</h3>
                <p className="text-muted-foreground">
                  Fetching sources, scoring importance, filtering low-quality items...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-medium mb-2">Unable to Load Brief</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchBrief}>Try Again</Button>
              </div>
            )}

            {/* Brief Content - Grouped by Topic */}
            {!loading && !error && brief && (
              <>
                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                  <span>📅 {brief.timeRange}</span>
                  <span>📰 {brief.items.length} high-quality articles</span>
                  <span>🔍 {brief.sourcesUsed.length} sources</span>
                  <span>🗑️ {brief.rejectedCount} filtered out</span>
                </div>

                {/* Grouped Articles */}
                {brief.groupedItems ? (
                  <>
                    {renderTopicSection("research", brief.groupedItems.research || [])}
                    {renderTopicSection("industry", brief.groupedItems.industry || [])}
                    {renderTopicSection("policy", brief.groupedItems.policy || [])}
                  </>
                ) : (
                  <div className="text-center py-12 glass-card rounded-2xl">
                    <p className="text-muted-foreground">
                      No articles found for the selected filters.
                    </p>
                  </div>
                )}

                {/* Sources Footer */}
                {brief.sourcesUsed.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <h4 className="text-sm font-medium mb-2">Sources</h4>
                    <p className="text-sm text-muted-foreground">
                      {brief.sourcesUsed.join(" · ")}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ExecutiveBrief;
