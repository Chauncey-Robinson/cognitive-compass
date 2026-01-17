import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Lightbulb, AlertCircle } from "lucide-react";

const timelineData = [
  {
    month: "June 2025",
    playbooks: [
      { title: "The State of AI in 2025", company: "McKinsey", category: "Strategy" }
    ],
    keyTheme: "Foundation Setting",
    insight: "Initial framing of agentic AI as distinct from traditional automation. Focus on potential rather than implementation.",
    sentiment: "optimistic"
  },
  {
    month: "July 2025",
    playbooks: [
      { title: "Agentic AI Reinvention", company: "PwC", category: "Strategy" },
      { title: "The Agentic AI Opportunity", company: "McKinsey", category: "Strategy" }
    ],
    keyTheme: "Opportunity Identification",
    insight: "Shift from 'what is it' to 'what can we do with it'. First ROI frameworks emerge. Industry-specific use cases crystallize.",
    sentiment: "optimistic"
  },
  {
    month: "August 2025",
    playbooks: [
      { title: "Six Key Insights for AI ROI", company: "Accenture", category: "Build" },
      { title: "The Rise of Autonomous Agents", company: "AWS", category: "Build" },
      { title: "From Hype to Reality", company: "Bain & Company", category: "Strategy" }
    ],
    keyTheme: "Reality Check & Build Phase",
    insight: "Technical implementation details emerge. First warnings about overhype. Concrete architecture patterns defined.",
    sentiment: "cautious"
  },
  {
    month: "September 2025",
    playbooks: [
      { title: "Agentic AI Operating Model", company: "IBM", category: "Leadership" },
      { title: "Agentic Enterprise 2028", company: "Deloitte", category: "Strategy" }
    ],
    keyTheme: "Organizational Design",
    insight: "Focus shifts to governance and operating models. Long-term vision (2028) articulated. Change management becomes central.",
    sentiment: "balanced"
  },
  {
    month: "October 2025",
    playbooks: [
      { title: "Leading in the Age of AI Agents", company: "BCG", category: "Leadership" },
      { title: "The Agentic Organization", company: "McKinsey", category: "Leadership" }
    ],
    keyTheme: "Leadership Evolution",
    insight: "Leadership competencies for AI age defined. Organizational restructuring frameworks. Talent strategy imperatives.",
    sentiment: "optimistic"
  },
  {
    month: "November 2025",
    playbooks: [
      { title: "AI Agents in Action", company: "World Economic Forum", category: "Strategy" },
      { title: "Seizing the Agentic AI Advantage", company: "McKinsey", category: "Strategy" }
    ],
    keyTheme: "Action & Urgency",
    insight: "Consensus that 2026 is critical window. First-mover advantages emphasized. Global implications explored.",
    sentiment: "urgent"
  }
];

const categoryColors: Record<string, string> = {
  "Strategy": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Build": "bg-green-500/20 text-green-400 border-green-500/30",
  "Leadership": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const sentimentConfig: Record<string, { color: string; icon: typeof TrendingUp }> = {
  optimistic: { color: "text-green-400", icon: TrendingUp },
  cautious: { color: "text-yellow-400", icon: AlertCircle },
  balanced: { color: "text-blue-400", icon: Lightbulb },
  urgent: { color: "text-orange-400", icon: Clock },
};

export function TimelineView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <Clock className="h-10 w-10 text-primary" />
            <div>
              <h2 className="text-xl font-bold">Evolution of Agentic AI Thinking</h2>
              <p className="text-muted-foreground">
                Track how perspectives evolved from June to November 2025 across 12 playbooks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {timelineData.map((period, idx) => {
            const SentimentIcon = sentimentConfig[period.sentiment]?.icon || Lightbulb;
            const sentimentColor = sentimentConfig[period.sentiment]?.color || "text-muted-foreground";
            
            return (
              <div key={idx} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-4 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="font-bold">{period.month}</span>
                        <Badge variant="outline" className="ml-2">
                          {period.playbooks.length} playbook{period.playbooks.length > 1 ? 's' : ''}
                        </Badge>
                      </CardTitle>
                      <div className={`flex items-center gap-1 text-sm ${sentimentColor}`}>
                        <SentimentIcon className="h-4 w-4" />
                        <span className="capitalize">{period.sentiment}</span>
                      </div>
                    </div>
                    <p className="text-sm text-primary font-medium">{period.keyTheme}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Playbooks */}
                    <div className="flex flex-wrap gap-2">
                      {period.playbooks.map((pb, pbIdx) => (
                        <div 
                          key={pbIdx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50"
                        >
                          <span className="text-sm font-medium">{pb.company}</span>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground truncate max-w-48">{pb.title}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] px-1.5 py-0 ${categoryColors[pb.category]}`}
                          >
                            {pb.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    {/* Key Insight */}
                    <div className="p-3 rounded-lg bg-muted/30 border-l-2 border-primary">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <Lightbulb className="h-4 w-4 inline mr-2 text-primary" />
                        {period.insight}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-muted/30">
        <CardContent className="py-6">
          <h3 className="font-semibold mb-3">Key Timeline Observations</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Early 2025 (June-July): Focus on defining and sizing the opportunity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Mid 2025 (August): Reality checks and technical deep-dives emerge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Late 2025 (Sept-Nov): Organizational and leadership implications dominate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Consistent theme: 2026 framed as critical action window across all sources</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
