import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Cpu, GraduationCap, Target, TrendingUp, 
  Shield, Clock, Building2, Scale, Lightbulb, BookOpen,
  AlertTriangle, CheckCircle2, MessageSquare
} from "lucide-react";

interface RoleSection {
  id: string;
  title: string;
  icon: typeof Briefcase;
  color: string;
  bgColor: string;
  realQuestion: string;
  keyInsights: string[];
  actionItems: string[];
  redFlags: string[];
  talkingPoints: string[];
}

const roles: RoleSection[] = [
  {
    id: "CEO",
    title: "CEO",
    icon: Briefcase,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/30",
    realQuestion: "How do I not look stupid about AI at the next board meeting?",
    keyInsights: [
      "Agentic AI = autonomous decision-making, not just chatbots",
      "First-mover advantage critical in 2025-2026 window",
      "Investment benchmark: 2-4% of revenue for serious plays",
      "ROI timeline: 18-24 months for enterprise implementations",
      "Governance is becoming a board-level priority"
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
  },
  {
    id: "CTO",
    title: "CTO",
    icon: Cpu,
    color: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/30",
    realQuestion: "Is this technically real or consultant BS I'll have to build?",
    keyInsights: [
      "Multi-agent orchestration is the dominant architecture pattern",
      "RAG (Retrieval Augmented Generation) is essential for enterprise context",
      "Build the orchestration layer (moat), buy foundation models",
      "LangChain/LangGraph vs custom: depends on scale and complexity",
      "Observability is critical—agents are hard to debug"
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
    talkingPoints: [
      "We need vector database infrastructure—I recommend Pinecone or Weaviate",
      "Build the orchestration layer (competitive moat), buy foundation models",
      "6-month pilot is realistic if we start with a focused use case"
    ]
  },
  {
    id: "MBA",
    title: "MBA Student",
    icon: GraduationCap,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/30",
    realQuestion: "What do I need to know for interviews and exams?",
    keyInsights: [
      "Agentic AI = AI that takes actions autonomously (vs just generating text)",
      "Key distinction: autonomy and goal-directed behavior",
      "McKinsey sees 40% productivity gains; Bain is more conservative (25%)",
      "Build vs buy depends on whether AI is core competency",
      "Governance is emerging as the key differentiator"
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
    talkingPoints: [
      "The key distinction is autonomy—agentic AI makes decisions, traditional AI assists",
      "Build vs buy depends on whether AI is your core competency",
      "Governance is emerging as the key differentiator between leaders and laggards"
    ]
  }
];

export function UnifiedInsights() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-green-500/10 to-purple-500/10 border-primary/20">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="h-10 w-10 text-primary" />
            <div>
              <h2 className="text-xl font-bold">Role-Based Insights</h2>
              <p className="text-muted-foreground mt-1">
                What each persona actually needs from these 12 playbooks—no fluff.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Three Roles */}
      <div className="space-y-8">
        {roles.map((role) => (
          <Card key={role.id} className={`border ${role.bgColor}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${role.bgColor}`}>
                  <role.icon className={`h-6 w-6 ${role.color}`} />
                </div>
                <div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    "{role.realQuestion}"
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Grid of 4 sections */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Key Insights */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    Key Insights
                  </h4>
                  <ul className="space-y-1.5">
                    {role.keyInsights.map((insight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className={role.color}>•</span>
                        {insight}
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
                    {role.actionItems.map((action, idx) => (
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
                    {role.redFlags.map((flag, idx) => (
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
                    {role.talkingPoints.map((point, idx) => (
                      <li key={idx} className="text-sm p-2 bg-muted/30 rounded-lg text-muted-foreground">
                        "{point}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
