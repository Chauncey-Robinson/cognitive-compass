import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  AlertTriangle, ArrowLeftRight, ChevronDown
} from "lucide-react";
import { useRuthlessMode } from "@/contexts/RuthlessMode";

interface Contradiction {
  id: string;
  topic: string;
  category: "strategy" | "technical" | "timeline" | "investment" | "risk";
  sideA: {
    firm: string;
    position: string;
  };
  sideB: {
    firm: string;
    position: string;
  };
  severity: "high" | "medium";
  decisionImplication: string;
}

const contradictions: Contradiction[] = [
  {
    id: "1",
    topic: "ROI Timeline Expectations",
    category: "timeline",
    sideA: { firm: "McKinsey", position: "18-24 months for enterprise ROI" },
    sideB: { firm: "Bain", position: "24-36 months for realistic ROI" },
    severity: "high",
    decisionImplication: "Plan for 24-month payback in board presentations but structure quick wins at 6 months to maintain momentum.",
  },
  {
    id: "2",
    topic: "Build vs Buy for Orchestration",
    category: "technical",
    sideA: { firm: "Google DeepMind", position: "Build custom orchestration layer" },
    sideB: { firm: "Accenture", position: "Buy proven platforms first" },
    severity: "high",
    decisionImplication: "If AI is core to your product, build. If AI supports operations, buy first and customize once you've proven value.",
  },
  {
    id: "3",
    topic: "Agent Autonomy Level",
    category: "strategy",
    sideA: { firm: "AWS", position: "High autonomy is the goal" },
    sideB: { firm: "Deloitte", position: "Human oversight is permanent" },
    severity: "high",
    decisionImplication: "Design for human oversight from day one. Autonomy can be increased incrementally as trust and guardrails mature.",
  },
  {
    id: "4",
    topic: "Investment Level (% of Revenue)",
    category: "investment",
    sideA: { firm: "BCG", position: "3-5% of revenue for leaders" },
    sideB: { firm: "Bain", position: "1-3% is prudent starting point" },
    severity: "medium",
    decisionImplication: "Start at 2% of revenue, with clear milestones to scale to 4% based on demonstrated ROI.",
  },
  {
    id: "5",
    topic: "Governance Timing",
    category: "risk",
    sideA: { firm: "PwC", position: "Governance first, then deploy" },
    sideB: { firm: "AWS", position: "Deploy fast, iterate governance" },
    severity: "high",
    decisionImplication: "For regulated industries, governance first. For others, establish minimum viable governance and iterate.",
  },
  {
    id: "6",
    topic: "Multi-Agent Complexity",
    category: "technical",
    sideA: { firm: "Google DeepMind", position: "Debugging costs exceed model costs 3:1" },
    sideB: { firm: "Microsoft", position: "Multi-agent overhead is manageable" },
    severity: "medium",
    decisionImplication: "Budget 3x your model costs for observability and debugging. If that breaks your business case, simplify architecture.",
  },
];

export function ContradictionFinder() {
  const { isRuthless } = useRuthlessMode();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const filteredContradictions = selectedCategory === "all" 
    ? contradictions 
    : contradictions.filter(c => c.category === selectedCategory);

  const highSeverityCount = contradictions.filter(c => c.severity === "high").length;

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // In ruthless mode, only show high severity
  const displayedContradictions = isRuthless 
    ? filteredContradictions.filter(c => c.severity === "high")
    : filteredContradictions;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <div className="flex items-center justify-center gap-3">
          <AlertTriangle className="h-5 w-5 text-foreground/60" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Position Conflicts</h2>
        </div>
        {!isRuthless && (
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {highSeverityCount} high-impact conflicts requiring executive attention.
          </p>
        )}
      </div>

      {/* Category Filters */}
      {!isRuthless && (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="text-xs"
          >
            All
          </Button>
          {["timeline", "technical", "investment", "risk", "strategy"].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>
      )}

      {/* Contradictions List */}
      <div className="space-y-4">
        {displayedContradictions.map((contradiction) => (
          <Card key={contradiction.id} className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-medium text-foreground">{contradiction.topic}</CardTitle>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="outline" className="text-[10px] text-muted-foreground border-border/50 capitalize">
                      {contradiction.category}
                    </Badge>
                    {contradiction.severity === "high" && (
                      <Badge variant="outline" className="text-[10px] bg-accent/10 text-accent-foreground border-accent/20">
                        High Impact
                      </Badge>
                    )}
                  </div>
                </div>
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-5 space-y-4">
              {/* Decision Implication - Primary Focus */}
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-sm text-foreground leading-relaxed">
                  {contradiction.decisionImplication}
                </p>
              </div>

              {/* Positions - Collapsible */}
              {!isRuthless && (
                <Collapsible open={expandedCards[contradiction.id]} onOpenChange={() => toggleCard(contradiction.id)}>
                  <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronDown className={`h-3 w-3 transition-transform ${expandedCards[contradiction.id] ? 'rotate-180' : ''}`} />
                    View conflicting positions
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">{contradiction.sideA.firm}</p>
                        <p className="text-sm text-foreground/80">{contradiction.sideA.position}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                        <p className="text-xs text-muted-foreground mb-1">{contradiction.sideB.firm}</p>
                        <p className="text-sm text-foreground/80">{contradiction.sideB.position}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}