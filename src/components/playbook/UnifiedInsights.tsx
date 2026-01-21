import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, Cpu, GraduationCap, Target, TrendingUp, 
  Shield, Clock, Building2, Scale, Lightbulb, BookOpen,
  AlertTriangle, CheckCircle2, MessageSquare, Code, Layers,
  Users, DollarSign, Wrench, Brain, FileText, HelpCircle,
  ArrowRight, Zap, Server, GitBranch
} from "lucide-react";

interface TechDecision {
  area: string;
  recommendation: string;
  complexity: number; // 1-5
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

// Philosophy: This platform optimizes for decision quality, not narrative coherence.
// Treat each consulting firm as an opinionated actor ("Expert Position"), not a neutral authority.

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

// CTO Data - Enhanced
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
  techStack: [
    { category: "LLM Providers", tools: ["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Mistral"], consensus: 85 },
    { category: "Orchestration", tools: ["LangChain", "LangGraph", "AutoGen", "CrewAI"], consensus: 70 },
    { category: "Vector DBs", tools: ["Pinecone", "Weaviate", "Qdrant", "Chroma"], consensus: 75 },
    { category: "Observability", tools: ["LangSmith", "Arize", "Weights & Biases", "Phoenix"], consensus: 60 },
  ],
  implementationTimeline: [
    { phase: "Phase 1: POC", duration: "4-8 weeks", focus: "Single use case, validate architecture", resources: "2-3 engineers" },
    { phase: "Phase 2: Pilot", duration: "3-4 months", focus: "Production-ready, limited rollout", resources: "4-6 engineers" },
    { phase: "Phase 3: Scale", duration: "6-12 months", focus: "Multi-use case, enterprise rollout", resources: "8-15 engineers" },
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

// MBA Student Data - Enhanced
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
    { name: "Agent Orchestration Model", description: "Planner - Executor - Validator - Optimizer loop", source: "Google DeepMind", examRelevance: "medium" },
    { name: "ROI Calculation Framework", description: "Cost savings + Revenue gains - Implementation costs - Ongoing maintenance", source: "Accenture", examRelevance: "high" },
    { name: "Human-in-the-Loop Spectrum", description: "Full automation - Assisted - Augmented - Human-led", source: "PwC", examRelevance: "low" },
  ] as Framework[],
  caseStudies: [
    { company: "JPMorgan", industry: "Financial Services", outcome: "40% reduction in legal document review time", keyTakeaway: "Start with high-volume, repetitive tasks" },
    { company: "Amazon", industry: "E-commerce/Logistics", outcome: "25% improvement in supply chain efficiency", keyTakeaway: "Agent coordination scales with data quality" },
    { company: "Salesforce", industry: "Enterprise Software", outcome: "Einstein Copilot drove 30% faster deal cycles", keyTakeaway: "Integration with existing workflows is critical" },
    { company: "Microsoft", industry: "Technology", outcome: "Copilot increased developer productivity by 55%", keyTakeaway: "Measure productivity gains, not just adoption" },
  ] as CaseStudy[],
  comparisonMatrix: [
    { topic: "ROI Timeline", mckinsey: "18-24 months", bcg: "12-18 months", bain: "24-36 months", deloitte: "18-30 months" },
    { topic: "Investment (% Revenue)", mckinsey: "2-4%", bcg: "3-5%", bain: "1-3%", deloitte: "2-4%" },
    { topic: "Productivity Gains", mckinsey: "30-40%", bcg: "25-35%", bain: "20-30%", deloitte: "25-40%" },
    { topic: "Primary Risk", mckinsey: "Talent gap", bcg: "Data quality", bain: "Governance", deloitte: "Security" },
  ],
  theoryVsPractice: [
    { theory: "Agents can fully automate complex workflows", practice: "Human oversight still required for edge cases (15-20%)", gap: "Overpromise on autonomy" },
    { theory: "ROI is immediate and measurable", practice: "18-24 month timeline for enterprise-scale benefits", gap: "Underestimate change management" },
    { theory: "Foundation models are commoditized", practice: "Significant performance differences for specific use cases", gap: "Model selection matters more than claimed" },
    { theory: "Build vs Buy is a simple framework", practice: "Hybrid approaches dominate (build orchestration, buy components)", gap: "Binary thinking is oversimplified" },
  ],
  discussionQuestions: [
    { question: "Should enterprises build or buy their AI orchestration layer?", modelAnswer: "The consensus is 'build for differentiation, buy for infrastructure.' If AI is core to your competitive advantage (e.g., product companies), build the orchestration layer. If AI supports operations, leverage platforms like Salesforce Einstein or Microsoft Copilot. The key factor is whether your AI creates customer-facing value or internal efficiency." },
    { question: "What governance structures are needed for agentic AI?", modelAnswer: "Three-tier governance is emerging as best practice: (1) Board-level AI ethics committee for strategic decisions, (2) Cross-functional AI council for operational oversight, (3) Technical review boards for model deployment. McKinsey emphasizes 'responsible AI by design' while BCG focuses on 'risk-based governance scaling with agent autonomy.'" },
    { question: "How do you calculate ROI for agentic AI investments?", modelAnswer: "Use the Accenture framework: Direct savings (labor reduction, error reduction) + Revenue impact (faster cycles, new capabilities) - Implementation costs (tech + talent + change management) - Ongoing costs (compute, maintenance, governance). Key insight: Include 'option value' for future capabilities. Most Expert Positions suggest 18-24 month payback for enterprise implementations." },
  ],
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

const getConsensusColor = (level: ConsensusLevel) => {
  switch (level) {
    case "high": return "bg-green-500/20 text-green-400";
    case "moderate": return "bg-yellow-500/20 text-yellow-400";
    case "contested": return "bg-orange-500/20 text-orange-400";
    default: return "";
  }
};

const getConsensusLabel = (level: ConsensusLevel) => {
  switch (level) {
    case "high": return "High";
    case "moderate": return "Mod";
    case "contested": return "Contested";
    default: return "";
  }
};

export function UnifiedInsights() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-green-500/10 to-purple-500/10 border-primary/20">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="h-10 w-10 text-primary" />
            <div>
              <h2 className="text-xl font-bold">What Each Role Needs to Know</h2>
              <p className="text-muted-foreground mt-1">
                Deep-dive into CEO, CTO, and MBA Student perspectives from 12 Expert Positions.
              </p>
              <p className="text-xs text-muted-foreground mt-1 italic">
                This platform optimizes for decision quality, not narrative coherence.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ceo" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ceo" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            CEO View
          </TabsTrigger>
          <TabsTrigger value="cto" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            CTO View
          </TabsTrigger>
          <TabsTrigger value="mba" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            MBA Student
          </TabsTrigger>
        </TabsList>

        {/* CEO Tab */}
        <TabsContent value="ceo">
          <Card className="border bg-blue-500/5 border-blue-500/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Briefcase className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">CEO Perspective</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    "{ceoData.realQuestion}"
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Key Insights with Consensus Labels */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    Key Insights
                  </h4>
                  <ul className="space-y-1.5">
                    {ceoData.keyInsights.map((insight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Badge variant="outline" className={`text-[9px] px-1 shrink-0 ${getConsensusColor(insight.consensus)}`}>
                          {getConsensusLabel(insight.consensus)}
                        </Badge>
                        <span>{insight.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decision Implications */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    Decision Implications
                  </h4>
                  <ul className="space-y-1.5">
                    {ceoData.decisionImplications.map((impl, idx) => (
                      <li key={idx} className="text-sm p-2 bg-primary/5 border border-primary/20 rounded text-muted-foreground">
                        {impl}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Items */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-400" />
                    This Week's Actions
                  </h4>
                  <ul className="space-y-1.5">
                    {ceoData.actionItems.map((action, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0 text-[10px] px-1.5">{idx + 1}</Badge>
                        <span className="text-muted-foreground">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Red Flags */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    Red Flags
                  </h4>
                  <ul className="space-y-1.5">
                    {ceoData.redFlags.map((flag, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-400">🚩</span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Talking Points */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Ready-to-Use Talking Points
                  </h4>
                  <ul className="space-y-2">
                    {ceoData.talkingPoints.map((point, idx) => (
                      <li key={idx} className="text-sm p-2 bg-muted/30 rounded-lg text-muted-foreground">
                        "{point}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTO Tab - Enhanced */}
        <TabsContent value="cto" className="space-y-6">
          <Card className="border bg-green-500/5 border-green-500/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Cpu className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">CTO Perspective</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    "{ctoData.realQuestion}"
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Key Insights with Consensus Labels */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Key Insights
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {ctoData.keyInsights.map((insight, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground p-2 bg-muted/30 rounded-lg flex items-start gap-2">
                      <Badge variant="outline" className={`text-[9px] px-1 shrink-0 ${getConsensusColor(insight.consensus)}`}>
                        {getConsensusLabel(insight.consensus)}
                      </Badge>
                      <span>{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decision Implications */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Decision Implications
                </h4>
                <div className="grid md:grid-cols-3 gap-2">
                  {ctoData.decisionImplications.map((impl, idx) => (
                    <div key={idx} className="text-sm p-2 bg-primary/5 border border-primary/20 rounded text-muted-foreground">
                      {impl}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Architecture Decisions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Server className="h-5 w-5 text-green-400" />
                Technical Architecture Decisions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ctoData.techDecisions.map((decision, idx) => (
                  <div key={idx} className="p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{decision.area}</h4>
                      <Badge variant={decision.recommendation.startsWith("Build") ? "default" : "secondary"}>
                        {decision.recommendation}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Complexity:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={decision.complexity * 20} className="h-2 flex-1" />
                          <span className="text-xs">{decision.complexity}/5</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeframe:</span>
                        <p className="font-medium">{decision.timeframe}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Team Size:</span>
                        <p className="font-medium">{decision.teamSize}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Build vs Buy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GitBranch className="h-5 w-5 text-green-400" />
                Build vs Buy Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ctoData.buildVsBuy.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                    <Badge 
                      variant={item.verdict === "BUILD" ? "default" : "outline"}
                      className={item.verdict === "BUILD" ? "bg-green-500" : ""}
                    >
                      {item.verdict}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.component}</p>
                      <p className="text-xs text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="h-5 w-5 text-green-400" />
                Tech Stack Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {ctoData.techStack.map((stack, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{stack.category}</h4>
                      <span className="text-xs text-muted-foreground">{stack.consensus}% consensus</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stack.tools.map((tool, tidx) => (
                        <Badge key={tidx} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-green-400" />
                Implementation Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-500/30" />
                <div className="space-y-6">
                  {ctoData.implementationTimeline.map((phase, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold">
                        {idx + 1}
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{phase.focus}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Users className="h-3 w-3" />
                          <span>{phase.resources}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions & Red Flags */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-blue-400" />
                  This Week's Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ctoData.actionItems.map((action, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <Badge variant="outline" className="shrink-0 text-[10px] px-1.5">{idx + 1}</Badge>
                      <span className="text-muted-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Red Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ctoData.redFlags.map((flag, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-red-400">🚩</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* MBA Tab - Enhanced */}
        <TabsContent value="mba" className="space-y-6">
          <Card className="border bg-purple-500/5 border-purple-500/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <GraduationCap className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">MBA Student Perspective</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    "{mbaData.realQuestion}"
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Key Insights */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Key Insights
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {mbaData.keyInsights.map((insight, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground p-2 bg-muted/30 rounded-lg flex items-start gap-2">
                      <Badge variant="outline" className={`text-[9px] px-1 shrink-0 ${getConsensusColor(insight.consensus)}`}>
                        {getConsensusLabel(insight.consensus)}
                      </Badge>
                      <span>{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decision Implications */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Decision Implications
                </h4>
                <div className="grid md:grid-cols-3 gap-2">
                  {mbaData.decisionImplications.map((impl, idx) => (
                    <div key={idx} className="text-sm p-2 bg-primary/5 border border-primary/20 rounded text-muted-foreground">
                      {impl}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frameworks to Memorize */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-purple-400" />
                Key Frameworks to Memorize
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {mbaData.frameworks.map((framework, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{framework.name}</h4>
                      <Badge 
                        variant={framework.examRelevance === "high" ? "default" : "secondary"}
                        className={framework.examRelevance === "high" ? "bg-purple-500" : ""}
                      >
                        {framework.examRelevance} relevance
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{framework.description}</p>
                    <p className="text-xs text-muted-foreground">Source: {framework.source}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Case Study Summaries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-purple-400" />
                Case Study Summaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {mbaData.caseStudies.map((study, idx) => (
                  <div key={idx} className="p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-purple-400" />
                      <h4 className="font-medium">{study.company}</h4>
                      <Badge variant="outline" className="text-xs">{study.industry}</Badge>
                    </div>
                    <p className="text-sm text-green-400 mb-2">{study.outcome}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Key Takeaway:</span> {study.keyTakeaway}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-purple-400" />
                Firm Comparison Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Topic</th>
                      <th className="text-center py-2 font-medium">McKinsey</th>
                      <th className="text-center py-2 font-medium">BCG</th>
                      <th className="text-center py-2 font-medium">Bain</th>
                      <th className="text-center py-2 font-medium">Deloitte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mbaData.comparisonMatrix.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 font-medium">{row.topic}</td>
                        <td className="text-center py-3 text-muted-foreground">{row.mckinsey}</td>
                        <td className="text-center py-3 text-muted-foreground">{row.bcg}</td>
                        <td className="text-center py-3 text-muted-foreground">{row.bain}</td>
                        <td className="text-center py-3 text-muted-foreground">{row.deloitte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Theory vs Practice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-purple-400" />
                Theory vs Practice Gaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mbaData.theoryVsPractice.map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground uppercase">Theory</span>
                        <p className="text-sm">{item.theory}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase">Practice</span>
                        <p className="text-sm">{item.practice}</p>
                      </div>
                      <div>
                        <span className="text-xs text-red-400 uppercase">Gap</span>
                        <p className="text-sm text-red-400">{item.gap}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discussion Questions with Model Answers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <HelpCircle className="h-5 w-5 text-purple-400" />
                Discussion Questions with Model Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mbaData.discussionQuestions.map((qa, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-medium text-purple-400 mb-2">Q: {qa.question}</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Model Answer: </span>
                      {qa.modelAnswer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions & Red Flags */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-blue-400" />
                  This Week's Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mbaData.actionItems.map((action, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <Badge variant="outline" className="shrink-0 text-[10px] px-1.5">{idx + 1}</Badge>
                      <span className="text-muted-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Red Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mbaData.redFlags.map((flag, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-red-400">🚩</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Summary */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Insights synthesized from 12 playbooks (June - November 2025)
            </span>
            <div className="flex gap-2">
              <Badge className="bg-blue-500/20 text-blue-400">CEO</Badge>
              <Badge className="bg-green-500/20 text-green-400">CTO</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">MBA</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
