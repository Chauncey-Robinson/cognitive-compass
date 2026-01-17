import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { 
  Target, TrendingUp, Shield, Clock, 
  Cpu, Building2, Scale, Lightbulb,
  BookOpen, GraduationCap, Briefcase, FileText,
  Download, RefreshCw
} from "lucide-react";
import type { RoleType } from "@/pages/PlaybookPlatform";

interface RoleInsightsProps {
  role: RoleType;
}

interface InsightData {
  strategic_implications?: string[];
  competitive_positioning?: string[];
  roi_focus?: string[];
  market_timing?: string[];
  technical_implementation?: string[];
  architecture_decisions?: string[];
  build_vs_buy?: string[];
  scaling_strategies?: string[];
  frameworks?: string[];
  case_studies?: string[];
  key_theories?: string[];
  exam_concepts?: string[];
}

const roleConfig = {
  CEO: {
    color: "blue",
    icon: Target,
    sections: [
      { key: "strategic_implications", title: "Strategic Implications", icon: Target },
      { key: "competitive_positioning", title: "Competitive Positioning", icon: TrendingUp },
      { key: "roi_focus", title: "ROI Focus", icon: Building2 },
      { key: "market_timing", title: "Market Timing", icon: Clock },
    ],
  },
  CTO: {
    color: "green",
    icon: Cpu,
    sections: [
      { key: "technical_implementation", title: "Technical Implementation", icon: Cpu },
      { key: "architecture_decisions", title: "Architecture Decisions", icon: Building2 },
      { key: "build_vs_buy", title: "Build vs Buy", icon: Scale },
      { key: "scaling_strategies", title: "Scaling Strategies", icon: TrendingUp },
    ],
  },
  MBA: {
    color: "purple",
    icon: GraduationCap,
    sections: [
      { key: "frameworks", title: "Frameworks", icon: BookOpen },
      { key: "case_studies", title: "Case Studies", icon: Briefcase },
      { key: "key_theories", title: "Key Theories", icon: Lightbulb },
      { key: "exam_concepts", title: "Exam Concepts", icon: GraduationCap },
    ],
  },
};

const placeholderInsights: Record<RoleType, InsightData> = {
  CEO: {
    strategic_implications: [
      "Agentic AI represents a paradigm shift from automation to autonomous decision-making",
      "First-mover advantage critical in 2025-2026 window before market saturation",
      "Cross-functional AI governance becomes board-level priority",
      "Talent strategy must evolve: AI augmentation over replacement",
    ],
    competitive_positioning: [
      "McKinsey estimates 40% productivity gain for early adopters",
      "Industry leaders investing 2-4% of revenue in agentic capabilities",
      "Build strategic moats through proprietary AI training data",
      "Partnership ecosystems becoming critical success factor",
    ],
    roi_focus: [
      "Typical ROI timeline: 18-24 months for enterprise implementations",
      "Cost reduction of 25-35% in targeted operational areas",
      "Revenue uplift through personalization: 15-25% increase",
      "Risk reduction through AI-powered compliance monitoring",
    ],
    market_timing: [
      "June-Nov 2025: Consensus forming around agentic AI readiness",
      "2026 predicted as 'Year of the Agent' across all major consultancies",
      "Enterprise adoption curve accelerating faster than cloud transition",
      "Regulatory frameworks lagging—advantage to proactive governance",
    ],
  },
  CTO: {
    technical_implementation: [
      "Multi-agent orchestration patterns emerging as standard",
      "RAG (Retrieval Augmented Generation) critical for enterprise context",
      "Event-driven architectures enabling real-time agent coordination",
      "Observability and tracing essential for agent debugging",
    ],
    architecture_decisions: [
      "Microservices + serverless preferred for agent deployment",
      "Vector databases (Pinecone, Weaviate) for semantic memory",
      "LangChain/LangGraph vs custom frameworks trade-offs",
      "Hybrid cloud essential for data sovereignty requirements",
    ],
    build_vs_buy: [
      "Core orchestration: Build (competitive differentiation)",
      "Foundation models: Buy (leverage OpenAI, Anthropic, Google)",
      "Industry-specific agents: Partner with domain experts",
      "Observability tooling: Buy (LangSmith, Phoenix)",
    ],
    scaling_strategies: [
      "Horizontal scaling through agent pooling and load balancing",
      "Caching strategies for repetitive agent queries",
      "Progressive rollout: Pilot → Department → Enterprise",
      "Cost optimization through model selection and prompt caching",
    ],
  },
  MBA: {
    frameworks: [
      "Porter's Five Forces applied to AI agent ecosystems",
      "McKinsey 7S for AI transformation readiness",
      "PESTLE analysis of agentic AI regulatory landscape",
      "Blue Ocean Strategy: Creating new markets with AI agents",
    ],
    case_studies: [
      "Amazon: Multi-agent systems in supply chain optimization",
      "JPMorgan: AI agents in trading and compliance",
      "Salesforce: Einstein agents transforming CRM",
      "Microsoft: Copilot as enterprise agent platform",
    ],
    key_theories: [
      "Principal-Agent Theory extended to AI systems",
      "Transaction Cost Economics in AI make-vs-buy decisions",
      "Resource-Based View: AI capabilities as competitive advantage",
      "Dynamic Capabilities Framework for AI adaptation",
    ],
    exam_concepts: [
      "Define: Agentic AI vs Traditional Automation vs RPA",
      "Compare: Consulting firm perspectives (McKinsey vs BCG vs Bain)",
      "Analyze: ROI frameworks across different industry verticals",
      "Evaluate: Build vs Buy vs Partner strategic options",
    ],
  },
};

export function RoleInsights({ role }: RoleInsightsProps) {
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);
  const config = roleConfig[role];

  useEffect(() => {
    fetchInsights();
  }, [role]);

  const fetchInsights = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from("playbook_analyses")
      .select("*")
      .eq("role_type", role)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching insights:", error);
    }

    if (data?.analysis_data) {
      setInsights(data.analysis_data as InsightData);
    } else {
      // Use placeholder insights for demo
      setInsights(placeholderInsights[role]);
    }
    
    setLoading(false);
  };

  const roleColors = {
    CEO: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
    CTO: "from-green-500/10 to-green-600/5 border-green-500/20",
    MBA: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
  };

  const badgeColors = {
    CEO: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    CTO: "bg-green-500/20 text-green-400 border-green-500/30",
    MBA: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="space-y-6">
      {/* Role Header */}
      <div className={`rounded-xl p-6 bg-gradient-to-br ${roleColors[role]} border`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${config.color}-500/20`}>
              <config.icon className={`h-8 w-8 text-${config.color}-400`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{role} Insights</h2>
              <p className="text-muted-foreground">
                {role === "CEO" && "Strategic implications, competitive positioning, and ROI focus"}
                {role === "CTO" && "Technical implementation, architecture, and scaling strategies"}
                {role === "MBA" && "Frameworks, case studies, theories, and exam concepts"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchInsights}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {config.sections.map((section) => (
          <Card key={section.key} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <ul className="space-y-3">
                  {(insights?.[section.key as keyof InsightData] || []).map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Badge 
                        variant="outline" 
                        className={`${badgeColors[role]} text-[10px] px-1.5 py-0 mt-0.5 shrink-0`}
                      >
                        {idx + 1}
                      </Badge>
                      <span className="text-muted-foreground leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Source Attribution */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Insights synthesized from 12 playbooks (June - November 2025)</span>
            </div>
            <Badge variant="outline">AI-Generated Analysis</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
