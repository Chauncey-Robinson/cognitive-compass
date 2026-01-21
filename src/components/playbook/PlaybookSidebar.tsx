import { ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExpertPosition {
  title: string;
  company: string;
  category: "Strategy" | "Build" | "Leadership";
  url: string;
}

const EXPERT_POSITIONS: ExpertPosition[] = [
  // Strategy
  { title: "The State of AI in 2025", company: "McKinsey", category: "Strategy", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" },
  { title: "Agentic AI Reinvention", company: "PwC", category: "Strategy", url: "https://www.pwc.com/us/en/tech-effect/ai-analytics/agentic-ai.html" },
  { title: "The Agentic AI Opportunity", company: "McKinsey", category: "Strategy", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/why-agents-are-the-next-frontier-of-generative-ai" },
  { title: "Six Key Insights for AI ROI", company: "Accenture", category: "Strategy", url: "https://www.accenture.com/us-en/insights/technology/agentic-ai" },
  // Build
  { title: "The Rise of Autonomous Agents", company: "Amazon", category: "Build", url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-foundations/introduction.html" },
  { title: "Agentic AI Transformation", company: "Bain", category: "Build", url: "https://www.bain.com/insights/state-of-the-art-of-agentic-ai-transformation-technology-report-2025/" },
  { title: "Agentic AI Operating Model", company: "IBM", category: "Build", url: "https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/agentic-ai-operating-model" },
  { title: "Agentic Enterprise 2028", company: "Deloitte", category: "Build", url: "https://www.deloitte.com/us/en/insights/focus/technology-and-the-future-of-work/agentic-ai-enterprise.html" },
  // Leadership
  { title: "Leading in the Age of AI Agents", company: "BCG", category: "Leadership", url: "https://www.bcg.com/publications/2025/machines-that-manage-themselves" },
  { title: "The Agentic Organization", company: "McKinsey", category: "Leadership", url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization" },
  { title: "AI Agents in Action", company: "WEF", category: "Leadership", url: "https://www.weforum.org/publications/ai-agents-in-action-foundations-for-evaluation-and-governance/" },
  { title: "Seizing the Agentic AI Advantage", company: "McKinsey", category: "Leadership", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage" },
];

const categories = ["Strategy", "Build", "Leadership"] as const;

export function PlaybookSidebar() {
  const groupedPositions = categories.map(category => ({
    category,
    positions: EXPERT_POSITIONS.filter(p => p.category === category)
  }));

  return (
    <aside className="w-64 border-r border-border/40 bg-background flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border/40">
        <h2 className="text-sm font-medium text-foreground">Sources</h2>
        <p className="text-xs text-muted-foreground mt-0.5">12 Expert Positions</p>
      </div>

      {/* Source List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {groupedPositions.map(({ category, positions }) => (
            <div key={category}>
              <h3 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                {category}
              </h3>
              <div className="space-y-1">
                {positions.map((position) => (
                  <a
                    key={position.url}
                    href={position.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 p-2 -mx-2 rounded-md hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground/80 leading-snug truncate group-hover:text-foreground transition-colors">
                        {position.company}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug truncate">
                        {position.title}
                      </p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground/50 group-hover:text-muted-foreground shrink-0 mt-0.5 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
