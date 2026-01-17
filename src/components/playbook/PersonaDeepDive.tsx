import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Briefcase, GraduationCap, Target, Clock, 
  AlertTriangle, CheckCircle2, MessageSquare, Lightbulb,
  DollarSign, Cpu, BookOpen, TrendingUp
} from "lucide-react";

interface PersonaDetail {
  id: string;
  title: string;
  icon: typeof User;
  color: string;
  realQuestion: string;
  whatTheyActuallyNeed: string[];
  whatTheyDontNeed: string[];
  weeklyActionItems: string[];
  boardroomTalkingPoints: string[];
  redFlags: string[];
  timeToValue: string;
  keyMetrics: string[];
}

const personas: PersonaDetail[] = [
  {
    id: "CEO",
    title: "Chief Executive Officer",
    icon: Briefcase,
    color: "blue",
    realQuestion: "How do I not look stupid about AI at the next board meeting?",
    whatTheyActuallyNeed: [
      "3 talking points about agentic AI that sound smart but aren't BS",
      "Competitive intelligence: What are my peers doing?",
      "Risk assessment: What happens if we do nothing?",
      "Investment sizing: How much should I budget?",
      "Timeline reality check: 6 months? 2 years?",
      "A framework to evaluate vendor pitches (they all sound the same)"
    ],
    whatTheyDontNeed: [
      "Technical architecture diagrams",
      "Vendor feature comparisons",
      "Implementation details",
      "Jargon-heavy explanations of how AI works"
    ],
    weeklyActionItems: [
      "Ask CTO: 'What are we actually doing about agentic AI?'",
      "Request competitive analysis from strategy team",
      "Schedule 30-min briefing with a board AI advisor",
      "Review Q1 budget for AI pilot allocation"
    ],
    boardroomTalkingPoints: [
      "We're seeing 18-24 month ROI timelines on agentic AI pilots across our peer set",
      "The consensus is 2-4% of revenue investment for serious plays",
      "First-movers in our industry are reporting 25-35% efficiency gains in targeted areas",
      "Governance is becoming a board-level issue—we need an AI committee"
    ],
    redFlags: [
      "Vendor promises ROI in under 6 months",
      "Team can't explain what 'agentic' means vs regular AI",
      "No governance framework in place",
      "CTO wants to 'build everything from scratch'"
    ],
    timeToValue: "90 days for pilot, 18-24 months for meaningful ROI",
    keyMetrics: [
      "% of processes with AI augmentation",
      "Cost per decision (before/after)",
      "Time-to-market improvements",
      "Employee productivity delta"
    ]
  },
  {
    id: "CTO",
    title: "Chief Technology Officer",
    icon: Cpu,
    color: "green",
    realQuestion: "Is this technically real or consultant BS I'll have to actually build?",
    whatTheyActuallyNeed: [
      "Architecture patterns that actually work at scale",
      "Build vs buy decision framework (honest version)",
      "Vendor-agnostic tech stack recommendations",
      "Security and compliance patterns for agent systems",
      "Cost modeling for infrastructure",
      "Team skill gaps and hiring priorities"
    ],
    whatTheyDontNeed: [
      "High-level strategy without technical substance",
      "'Transform your organization' platitudes",
      "Case studies without technical details",
      "ROI projections without implementation costs"
    ],
    weeklyActionItems: [
      "Spike: Build a simple multi-agent orchestration POC",
      "Evaluate LangChain vs LangGraph vs custom",
      "Audit current data infrastructure for RAG readiness",
      "Map existing workflows for agent automation potential",
      "Review security implications of agent systems"
    ],
    boardroomTalkingPoints: [
      "We need vector database infrastructure—I recommend [Pinecone/Weaviate] because...",
      "Build the orchestration layer (competitive moat), buy the foundation models",
      "6-month pilot timeline is realistic if we start with [specific use case]",
      "Key risk is observability—agents are hard to debug without proper tooling"
    ],
    redFlags: [
      "CEO wants 'ChatGPT but for everything'",
      "No budget for observability/monitoring",
      "Pressure to skip security review",
      "Expectation of 'AI magic' without data infrastructure"
    ],
    timeToValue: "2-week POC, 3-month pilot, 6-12 months production",
    keyMetrics: [
      "Agent reliability (% successful completions)",
      "Latency P50/P99",
      "Cost per agent invocation",
      "Hallucination rate",
      "Time to debug/fix agent failures"
    ]
  },
  {
    id: "MBA",
    title: "MBA Student / Early Career",
    icon: GraduationCap,
    color: "purple",
    realQuestion: "What do I need to know to sound smart in interviews and pass exams?",
    whatTheyActuallyNeed: [
      "Clear definitions: Agentic AI vs Generative AI vs RPA",
      "Frameworks for case interviews (McKinsey 7S for AI, etc.)",
      "Real case studies with numbers",
      "Key terms that will show up on exams",
      "Interview talking points for tech/consulting roles",
      "Understanding of different consulting firm perspectives"
    ],
    whatTheyDontNeed: [
      "Deep technical implementation details",
      "Vendor-specific recommendations",
      "Actual architecture diagrams",
      "Real governance frameworks (too complex for interviews)"
    ],
    weeklyActionItems: [
      "Create flashcards for key agentic AI terms",
      "Practice explaining 'agentic AI' in 30 seconds",
      "Read one case study deeply (Amazon, JPMorgan, Salesforce)",
      "Compare McKinsey vs BCG perspectives (common interview topic)",
      "Build a simple ROI model in Excel"
    ],
    boardroomTalkingPoints: [
      "The key distinction is autonomy—agentic AI makes decisions, traditional AI assists",
      "McKinsey sees 40% productivity gains; Bain is more conservative at 25%",
      "The build vs buy decision depends on whether AI is your core competency",
      "Governance is emerging as the key differentiator between leaders and laggards"
    ],
    redFlags: [
      "Can't define agentic AI without jargon",
      "Don't know the difference between OpenAI, Anthropic, and Google models",
      "Can't name 3 real-world agentic AI use cases",
      "Don't understand why RAG matters"
    ],
    timeToValue: "2 weeks to conversational fluency, 1 month to interview-ready",
    keyMetrics: [
      "Terminology recall accuracy",
      "Framework application speed",
      "Case study depth",
      "Cross-firm perspective understanding"
    ]
  }
];

export function PersonaDeepDive() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <User className="h-10 w-10 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold">What Each Persona Actually Needs</h2>
              <p className="text-muted-foreground mt-1">
                Forget the generic advice. Here's what you really need based on your role.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Persona Tabs */}
      <Tabs defaultValue="CEO" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="CEO" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Briefcase className="h-4 w-4 mr-2" /> CEO
          </TabsTrigger>
          <TabsTrigger value="CTO" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Cpu className="h-4 w-4 mr-2" /> CTO
          </TabsTrigger>
          <TabsTrigger value="MBA" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <GraduationCap className="h-4 w-4 mr-2" /> MBA
          </TabsTrigger>
        </TabsList>

        {personas.map((persona) => (
          <TabsContent key={persona.id} value={persona.id} className="mt-6 space-y-6">
            {/* The Real Question */}
            <Card className={`border-${persona.color}-500/30 bg-${persona.color}-500/5`}>
              <CardContent className="py-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className={`h-6 w-6 text-${persona.color}-400`} />
                  <div>
                    <p className="text-sm text-muted-foreground">The Real Question You're Asking:</p>
                    <p className="text-xl font-semibold mt-1">"{persona.realQuestion}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* What You Need */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    What You Actually Need
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {persona.whatTheyActuallyNeed.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* What You Don't Need */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    What You Don't Need (Skip It)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {persona.whatTheyDontNeed.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2 text-muted-foreground">
                        <span className="text-red-400">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Weekly Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    This Week's Action Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {persona.weeklyActionItems.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0 text-[10px]">{idx + 1}</Badge>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Talking Points */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Boardroom Talking Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {persona.boardroomTalkingPoints.map((point, idx) => (
                      <li key={idx} className="text-sm p-2 bg-muted/50 rounded-lg">
                        "{point}"
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Red Flags */}
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Red Flags to Watch For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {persona.redFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-red-400">🚩</span>
                      {flag}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time to Value & Metrics */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Time to Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{persona.timeToValue}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Key Metrics to Track
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {persona.keyMetrics.map((metric, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
