import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useRuthlessMode } from "@/contexts/RuthlessMode";
import { useState } from "react";

const timelineData = [
  {
    month: "June 2025",
    playbooks: [
      { title: "The State of AI in 2025", company: "McKinsey" }
    ],
    keyTheme: "Foundation Setting",
    insight: "Initial framing of agentic AI as distinct from traditional automation.",
  },
  {
    month: "July 2025",
    playbooks: [
      { title: "Agentic AI Reinvention", company: "PwC" },
      { title: "The Agentic AI Opportunity", company: "McKinsey" }
    ],
    keyTheme: "Opportunity Identification",
    insight: "First ROI frameworks emerge. Industry-specific use cases crystallize.",
  },
  {
    month: "August 2025",
    playbooks: [
      { title: "Six Key Insights for AI ROI", company: "Accenture" },
      { title: "The Rise of Autonomous Agents", company: "Amazon" },
      { title: "From Hype to Reality", company: "Bain" }
    ],
    keyTheme: "Reality Check & Build Phase",
    insight: "Technical implementation details emerge. First warnings about overhype.",
  },
  {
    month: "September 2025",
    playbooks: [
      { title: "Agentic AI Operating Model", company: "IBM" },
      { title: "Agentic Enterprise 2028", company: "Deloitte" }
    ],
    keyTheme: "Organizational Design",
    insight: "Focus shifts to governance and operating models.",
  },
  {
    month: "October 2025",
    playbooks: [
      { title: "Leading in the Age of AI Agents", company: "BCG" },
      { title: "The Agentic Organization", company: "McKinsey" }
    ],
    keyTheme: "Leadership Evolution",
    insight: "Leadership competencies for AI age defined. Organizational restructuring frameworks.",
  },
  {
    month: "November 2025",
    playbooks: [
      { title: "AI Agents in Action", company: "WEF" },
      { title: "Seizing the Agentic AI Advantage", company: "McKinsey" }
    ],
    keyTheme: "Action & Urgency",
    insight: "Consensus that 2026 is critical window. First-mover advantages emphasized.",
  }
];

export function TimelineView() {
  const { isRuthless } = useRuthlessMode();
  const [expandedPeriods, setExpandedPeriods] = useState<Record<number, boolean>>({});

  const togglePeriod = (idx: number) => {
    setExpandedPeriods(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      {!isRuthless && (
        <div className="text-center space-y-2 py-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Evolution Timeline</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            How Expert Position perspectives evolved from June to November 2025.
          </p>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-border/50" />

        <div className="space-y-6">
          {timelineData.map((period, idx) => (
            <div key={idx} className="relative pl-10">
              {/* Timeline dot */}
              <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-foreground/20 border-2 border-background" />
              
              <Card className="border-0 shadow-sm bg-background">
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex items-baseline justify-between">
                    <CardTitle className="text-base font-medium text-foreground">
                      {period.month}
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] text-muted-foreground border-border/50">
                      {period.playbooks.length} position{period.playbooks.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/70 font-medium">{period.keyTheme}</p>
                </CardHeader>
                <CardContent className="px-5 pb-4">
                  {/* Key Insight - Always visible */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {period.insight}
                  </p>

                  {/* Playbook details - Collapsible */}
                  {!isRuthless && (
                    <Collapsible open={expandedPeriods[idx]} onOpenChange={() => togglePeriod(idx)}>
                      <CollapsibleTrigger className="flex items-center gap-1 mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronDown className={`h-3 w-3 transition-transform ${expandedPeriods[idx] ? 'rotate-180' : ''}`} />
                        View sources
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {period.playbooks.map((pb, pbIdx) => (
                            <div 
                              key={pbIdx}
                              className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded"
                            >
                              {pb.company}
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Summary - Collapsed by Default */}
      {!isRuthless && (
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-4">
            <ChevronDown className="h-4 w-4" />
            Key observations
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="border-0 shadow-sm bg-muted/20">
              <CardContent className="py-5">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground/40">•</span>
                    <span>Early 2025: Focus on defining and sizing the opportunity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground/40">•</span>
                    <span>Mid 2025: Reality checks and technical deep-dives emerge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground/40">•</span>
                    <span>Late 2025: Organizational and leadership implications dominate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground/40">•</span>
                    <span>Consistent: 2026 framed as critical action window</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}