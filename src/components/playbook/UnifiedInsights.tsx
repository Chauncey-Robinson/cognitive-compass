import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Briefcase, Cpu, GraduationCap, Target, 
  AlertTriangle, CheckCircle2, MessageSquare,
  ArrowRight, ChevronDown
} from "lucide-react";
import { useRuthlessMode } from "@/contexts/RuthlessMode";
import { useState } from "react";

interface TechDecision {
  area: string;
  recommendation: string;
  complexity: number;
  timeframe: string;
  teamSize: string;
}

interface Framework {
  name: string;
  description: string;
  source: string;
  examRelevance: "high" | "medium" | "low";
}

interface CaseStudy {
  company: string;
  industry: string;
  outcome: string;
  keyTakeaway: string;
}

type ConsensusLevel = "high" | "moderate" | "contested";

// CEO Data
const ceoData = {
  realQuestion: "How do I not look stupid about AI at the next board meeting?",
  keyInsights: [
    { text: "Agentic AI = autonomous decision-making, not just chatbots", consensus: "high" as ConsensusLevel },
    { text: "First-mover advantage critical in 2025-2026 window", consensus: "moderate" as ConsensusLevel },
    { text: "Investment benchmark: 2-4% of revenue for serious plays", consensus: "contested" as ConsensusLevel },
    { text: "ROI timeline: 18-24 months for enterprise implementations", consensus: "contested" as ConsensusLevel },
    { text: "Governance is becoming a board-level priority", consensus: "high" as ConsensusLevel }
  ],
  decisionImplications: [
    "If you're not discussing AI governance at board level, you're behind peers",
    "Allocate budget for Q1 pilot now—waiting costs more than experimenting",
    "Question any vendor promising ROI in under 12 months"
  ],
  actionItems: [
    "Ask CTO: 'What are we actually doing about agentic AI?'",
    "Request competitive analysis from strategy team",
    "Schedule briefing with a board AI advisor",
    "Allocate Q1 budget for AI pilot (start small)"
  ],
  redFlags: [
    "Vendor promises ROI in under 6 months",
    "Team can't explain 'agentic' vs regular AI",
    "No governance framework in place",
    "CTO wants to build everything from scratch"
  ],
  talkingPoints: [
    "We're seeing 18-24 month ROI timelines across our peer set",
    "First-movers report 25-35% efficiency gains in targeted areas",
    "The consensus is 2-4% of revenue investment for serious plays"
  ]
};

// CTO Data
const ctoData = {
  realQuestion: "Is this technically real or consultant BS I'll have to build?",
  keyInsights: [
    { text: "Multi-agent orchestration is the dominant architecture pattern", consensus: "high" as ConsensusLevel },
    { text: "RAG (Retrieval Augmented Generation) is essential for enterprise context", consensus: "high" as ConsensusLevel },
    { text: "Build the orchestration layer (moat), buy foundation models", consensus: "moderate" as ConsensusLevel },
    { text: "LangChain/LangGraph vs custom: depends on scale and complexity", consensus: "contested" as ConsensusLevel },
    { text: "Observability is critical—agents are hard to debug", consensus: "high" as ConsensusLevel }
  ],
  decisionImplications: [
    "If you're building orchestration, hire before you start—talent gap is real",
    "Budget 3x model costs for observability and debugging infrastructure",
    "Audit data infrastructure for RAG readiness before committing to timeline"
  ],
  techDecisions: [
    { area: "Foundation Models", recommendation: "Buy (OpenAI, Anthropic, Google)", complexity: 2, timeframe: "1-2 weeks", teamSize: "1-2 engineers" },
    { area: "Orchestration Layer", recommendation: "Build (competitive moat)", complexity: 4, timeframe: "3-6 months", teamSize: "3-5 engineers" },
    { area: "Vector Database", recommendation: "Buy (Pinecone, Weaviate, Qdrant)", complexity: 2, timeframe: "2-4 weeks", teamSize: "1-2 engineers" },
    { area: "RAG Pipeline", recommendation: "Build (domain-specific)", complexity: 4, timeframe: "2-4 months", teamSize: "2-4 engineers" },
    { area: "Observability", recommendation: "Buy (LangSmith, Arize)", complexity: 2, timeframe: "1-2 weeks", teamSize: "1 engineer" },
    { area: "Security/Guardrails", recommendation: "Hybrid (build + buy)", complexity: 5, timeframe: "Ongoing", teamSize: "2-3 engineers" },
  ] as TechDecision[],
  buildVsBuy: [
    { component: "Foundation Models (GPT-4, Claude)", verdict: "BUY", reason: "Commoditized, no moat in training" },
    { component: "Orchestration/Agent Framework", verdict: "BUILD", reason: "Core IP, competitive differentiator" },
    { component: "Vector Database", verdict: "BUY", reason: "Infrastructure, not core to business" },
    { component: "Domain-Specific RAG", verdict: "BUILD", reason: "Proprietary data = unique value" },
    { component: "Monitoring/Observability", verdict: "BUY", reason: "Time-to-value, maturing market" },
    { component: "Custom Guardrails", verdict: "BUILD", reason: "Regulatory/compliance specific" },
  ],
  actionItems: [
    "Spike: Build a simple multi-agent POC (2 weeks)",
    "Evaluate LangChain vs LangGraph vs custom",
    "Audit data infrastructure for RAG readiness",
    "Map workflows for agent automation potential"
  ],
  redFlags: [
    "CEO wants 'ChatGPT but for everything'",
    "No budget for observability/monitoring",
    "Pressure to skip security review",
    "Expecting 'AI magic' without data infrastructure"
  ],
};

// MBA Student Data
const mbaData = {
  realQuestion: "What do I need to know for interviews and exams?",
  keyInsights: [
    { text: "Agentic AI = AI that takes actions autonomously (vs just generating text)", consensus: "high" as ConsensusLevel },
    { text: "Key distinction: autonomy and goal-directed behavior", consensus: "high" as ConsensusLevel },
    { text: "McKinsey sees 40% productivity gains; Bain is more conservative (25%)", consensus: "contested" as ConsensusLevel },
    { text: "Build vs buy depends on whether AI is core competency", consensus: "moderate" as ConsensusLevel },
    { text: "Governance is emerging as the key differentiator", consensus: "high" as ConsensusLevel }
  ],
  decisionImplications: [
    "When discussing AI strategy, always acknowledge the contested ROI estimates",
    "Build vs Buy is never binary—the sophisticated answer is hybrid",
    "Governance maturity will separate winners from losers in 2026"
  ],
  frameworks: [
    { name: "AAAI Framework", description: "Awareness, Autonomy, Adaptability, Interaction - for evaluating agent maturity", source: "McKinsey", examRelevance: "high" },
    { name: "Build vs Buy Matrix", description: "Decision framework based on core competency + competitive advantage", source: "BCG", examRelevance: "high" },
    { name: "AI Governance Pyramid", description: "Ethics - Compliance - Risk - Operations - Strategy", source: "Deloitte", examRelevance: "medium" },
  ] as Framework[],
  caseStudies: [
    { company: "JPMorgan", industry: "Financial Services", outcome: "40% reduction in legal document review time", keyTakeaway: "Start with high-volume, repetitive tasks" },
    { company: "Amazon", industry: "E-commerce/Logistics", outcome: "25% improvement in supply chain efficiency", keyTakeaway: "Agent coordination scales with data quality" },
    { company: "Salesforce", industry: "Enterprise Software", outcome: "Einstein Copilot drove 30% faster deal cycles", keyTakeaway: "Integration with existing workflows is critical" },
  ] as CaseStudy[],
  actionItems: [
    "Create flashcards for key agentic AI terms",
    "Practice explaining 'agentic AI' in 30 seconds",
    "Read one case study deeply (Amazon, JPMorgan, Salesforce)",
    "Compare McKinsey vs BCG perspectives (interview topic)"
  ],
  redFlags: [
    "Can't define agentic AI without jargon",
    "Don't know difference between OpenAI, Anthropic, Google",
    "Can't name 3 real-world agentic AI use cases",
    "Don't understand why RAG matters"
  ],
};

const getConsensusStyle = (level: ConsensusLevel) => {
  switch (level) {
    case "high": return "border-foreground/20 text-foreground/70";
    case "moderate": return "border-foreground/10 text-foreground/50";
    case "contested": return "bg-accent text-accent-foreground";
    default: return "";
  }
};

const getConsensusLabel = (level: ConsensusLevel) => {
  switch (level) {
    case "high": return "Consensus";
    case "moderate": return "Moderate";
    case "contested": return "Contested";
    default: return "";
  }
};

export function UnifiedInsights() {
  const { isRuthless } = useRuthlessMode();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Minimal Header */}
      {!isRuthless && (
        <div className="text-center space-y-2 py-4">
          <h2 className="text-primary-focus">What Matters to You</h2>
          <p className="text-meta max-w-lg mx-auto">
            The takeaways that matter most, based on your role.
          </p>
        </div>
      )}

      <Tabs defaultValue="ceo" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-muted/30 p-1">
          <TabsTrigger value="ceo" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">CEO</span>
          </TabsTrigger>
          <TabsTrigger value="cto" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Cpu className="h-4 w-4" />
            <span className="hidden sm:inline">CTO</span>
          </TabsTrigger>
          <TabsTrigger value="mba" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">MBA</span>
          </TabsTrigger>
        </TabsList>

        {/* CEO Tab */}
        <TabsContent value="ceo" className="space-y-6">
          {/* Primary Focus: Decision Implications */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <ArrowRight className="h-5 w-5 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg font-semibold">What This Means for You</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ceoData.decisionImplications.map((impl, idx) => (
                  <div key={idx} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">{impl}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Secondary: Key Insights */}
          {!isRuthless && (
            <Card className="border-0 shadow-sm bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-foreground/80">What the Experts Agree On</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ceoData.keyInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 py-2">
                      <Badge variant="outline" className={`text-[10px] px-2 shrink-0 ${getConsensusStyle(insight.consensus)}`}>
                        {getConsensusLabel(insight.consensus)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{insight.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tertiary: Red Flags - Always Visible */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent-foreground" />
                <CardTitle className="text-base font-medium text-foreground/80">Warning Signs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ceoData.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground/40">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Collapsed by Default: Actions & Talking Points */}
          {!isRuthless && (
            <Collapsible open={expandedSections['ceo-actions']} onOpenChange={() => toggleSection('ceo-actions')}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Next Steps & Talking Points</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['ceo-actions'] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-0 shadow-sm bg-muted/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">This Week's Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {ceoData.actionItems.map((action, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-foreground/40 font-mono text-xs">{idx + 1}.</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm bg-muted/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Talking Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {ceoData.talkingPoints.map((point, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground italic">"{point}"</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </TabsContent>

        {/* CTO Tab */}
        <TabsContent value="cto" className="space-y-6">
          {/* Primary Focus: Decision Implications */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <ArrowRight className="h-5 w-5 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg font-semibold">What This Means for You</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ctoData.decisionImplications.map((impl, idx) => (
                  <div key={idx} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">{impl}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Secondary: Build vs Buy - Critical Decisions */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-foreground/80">Build It or Buy It?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ctoData.buildVsBuy.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-3 border-b border-border/30 last:border-0">
                    <Badge 
                      variant="outline"
                      className={`shrink-0 text-xs px-2 ${item.verdict === "BUILD" ? "bg-accent/10 text-accent-foreground border-accent/30" : "text-muted-foreground"}`}
                    >
                      {item.verdict}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground/80 truncate">{item.component}</p>
                      <p className="text-xs text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Red Flags */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent-foreground" />
                <CardTitle className="text-base font-medium text-foreground/80">Warning Signs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ctoData.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground/40">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Collapsed: Technical Details */}
          {!isRuthless && (
            <Collapsible open={expandedSections['cto-tech']} onOpenChange={() => toggleSection('cto-tech')}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Under the Hood</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['cto-tech'] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <Card className="border-0 shadow-sm bg-muted/20">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {ctoData.techDecisions.map((decision, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-foreground/70">{decision.area}</p>
                            <p className="text-xs text-muted-foreground">{decision.timeframe} • {decision.teamSize}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">{decision.recommendation}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Collapsed: Key Insights */}
          {!isRuthless && (
            <Collapsible open={expandedSections['cto-insights']} onOpenChange={() => toggleSection('cto-insights')}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">What the Experts Agree On</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['cto-insights'] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <Card className="border-0 shadow-sm bg-muted/20">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {ctoData.keyInsights.map((insight, idx) => (
                        <div key={idx} className="flex items-start gap-3 py-2">
                          <Badge variant="outline" className={`text-[10px] px-2 shrink-0 ${getConsensusStyle(insight.consensus)}`}>
                            {getConsensusLabel(insight.consensus)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{insight.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          )}
        </TabsContent>

        {/* MBA Tab */}
        <TabsContent value="mba" className="space-y-6">
          {/* Primary Focus: Decision Implications */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <ArrowRight className="h-5 w-5 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg font-semibold">What This Means for You</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mbaData.decisionImplications.map((impl, idx) => (
                  <div key={idx} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">{impl}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Secondary: Key Frameworks */}
          {!isRuthless && (
            <Card className="border-0 shadow-sm bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-foreground/80">Useful Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mbaData.frameworks.map((framework, idx) => (
                    <div key={idx} className="py-3 border-b border-border/30 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground/80">{framework.name}</p>
                        <span className="text-xs text-muted-foreground">{framework.source}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{framework.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Red Flags */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent-foreground" />
                <CardTitle className="text-base font-medium text-foreground/80">Warning Signs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mbaData.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground/40">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Collapsed: Case Studies */}
          {!isRuthless && (
            <Collapsible open={expandedSections['mba-cases']} onOpenChange={() => toggleSection('mba-cases')}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Real Examples</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['mba-cases'] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="grid gap-3">
                  {mbaData.caseStudies.map((study, idx) => (
                    <Card key={idx} className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm text-foreground/80">{study.company}</p>
                          <span className="text-xs text-muted-foreground">{study.industry}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{study.outcome}</p>
                        <p className="text-xs text-foreground/60 italic">Takeaway: {study.keyTakeaway}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Collapsed: Key Insights */}
          {!isRuthless && (
            <Collapsible open={expandedSections['mba-insights']} onOpenChange={() => toggleSection('mba-insights')}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">What the Experts Agree On</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['mba-insights'] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <Card className="border-0 shadow-sm bg-muted/20">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {mbaData.keyInsights.map((insight, idx) => (
                        <div key={idx} className="flex items-start gap-3 py-2">
                          <Badge variant="outline" className={`text-[10px] px-2 shrink-0 ${getConsensusStyle(insight.consensus)}`}>
                            {getConsensusLabel(insight.consensus)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{insight.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}