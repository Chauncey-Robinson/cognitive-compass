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

  const highPriorityCount = contradictions.filter(c => c.severity === "high").length;

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
        <h2 className="text-primary-focus">Where They Disagree</h2>
        {!isRuthless && (
          <p className="text-meta max-w-lg mx-auto">
            {highPriorityCount} areas where the experts see it differently—your call.
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

      {/* Decision Tensions List */}
      <div className="space-y-4">
        {displayedContradictions.map((tension) => (
          <div key={tension.id} className="executive-card">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-secondary-element">{tension.topic}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-meta capitalize">{tension.category}</span>
                  {tension.severity === "high" && (
                    <span className="text-meta">· Priority</span>
                  )}
                </div>
              </div>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
            </div>

            {/* Decision Implication - Primary Focus */}
            <div className="primary-focus mb-4">
              <p className="decision-statement text-sm leading-relaxed">
                {tension.decisionImplication}
              </p>
            </div>

            {/* Positions - Collapsible */}
            {!isRuthless && (
              <Collapsible open={expandedCards[tension.id]} onOpenChange={() => toggleCard(tension.id)}>
                <CollapsibleTrigger className="flex items-center gap-1 text-meta hover:text-foreground transition-colors">
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedCards[tension.id] ? 'rotate-180' : ''}`} />
                  View positions
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="executive-card-muted">
                      <p className="text-meta mb-1">{tension.sideA.firm}</p>
                      <p className="text-sm text-body">{tension.sideA.position}</p>
                    </div>
                    <div className="executive-card-muted">
                      <p className="text-meta mb-1">{tension.sideB.firm}</p>
                      <p className="text-sm text-body">{tension.sideB.position}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}