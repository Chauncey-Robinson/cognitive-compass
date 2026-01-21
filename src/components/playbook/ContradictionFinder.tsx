import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, Scale, Building2, ArrowLeftRight, 
  ThumbsUp, ThumbsDown, Lightbulb, TrendingUp, 
  Shield, Clock, DollarSign, Users, Zap, Info
} from "lucide-react";

// Philosophy: This platform optimizes for decision quality, not narrative coherence.
// Treat each consulting firm as an opinionated actor ("Expert Position"), not a neutral authority.

interface Contradiction {
  id: string;
  topic: string;
  category: "strategy" | "technical" | "timeline" | "investment" | "risk";
  sideA: {
    firm: string;
    position: string;
    quote: string;
    confidence: number;
    date: string;
  };
  sideB: {
    firm: string;
    position: string;
    quote: string;
    confidence: number;
    date: string;
  };
  severity: "high" | "medium" | "low";
  resolution?: string;
  decisionImplication: string; // What should leadership do differently?
  userVotes?: { sideA: number; sideB: number };
}

const contradictions: Contradiction[] = [
  {
    id: "1",
    topic: "ROI Timeline Expectations",
    category: "timeline",
    sideA: {
      firm: "McKinsey",
      position: "18-24 months for enterprise ROI",
      quote: "Organizations should expect meaningful returns within 18-24 months of implementation, with early wins visible by month 6.",
      confidence: 92,
      date: "October 2025",
    },
    sideB: {
      firm: "Bain",
      position: "24-36 months for realistic ROI",
      quote: "The hype cycle suggests faster returns, but our analysis shows 24-36 months is more realistic for true enterprise value.",
      confidence: 88,
      date: "November 2025",
    },
    severity: "high",
    resolution: "The difference may be explained by definition of 'ROI' - McKinsey focuses on productivity gains, Bain on bottom-line impact.",
    decisionImplication: "Plan for 24-month payback in board presentations but structure quick wins at 6 months to maintain momentum.",
    userVotes: { sideA: 145, sideB: 89 },
  },
  {
    id: "2",
    topic: "Build vs Buy for Orchestration",
    category: "technical",
    sideA: {
      firm: "Google DeepMind",
      position: "Build custom orchestration layer",
      quote: "The orchestration layer is your competitive moat. Building custom ensures alignment with your specific workflows and data.",
      confidence: 95,
      date: "September 2025",
    },
    sideB: {
      firm: "Accenture",
      position: "Buy proven platforms first",
      quote: "Start with established platforms like LangChain or Microsoft's ecosystem. Custom building should come after proving value.",
      confidence: 85,
      date: "October 2025",
    },
    severity: "high",
    resolution: "Context matters: tech companies should build, enterprises should buy then customize.",
    decisionImplication: "If AI is core to your product, build. If AI supports operations, buy first and customize once you've proven value.",
    userVotes: { sideA: 234, sideB: 178 },
  },
  {
    id: "3",
    topic: "Agent Autonomy Level",
    category: "strategy",
    sideA: {
      firm: "AWS",
      position: "High autonomy is the goal",
      quote: "The future is fully autonomous agents. Human-in-the-loop is a transitional state, not an end goal.",
      confidence: 78,
      date: "August 2025",
    },
    sideB: {
      firm: "Deloitte",
      position: "Human oversight is permanent",
      quote: "Human-in-the-loop isn't transitional—it's essential for governance, trust, and regulatory compliance indefinitely.",
      confidence: 90,
      date: "November 2025",
    },
    severity: "high",
    decisionImplication: "Design for human oversight from day one. Autonomy can be increased incrementally as trust and guardrails mature.",
    userVotes: { sideA: 156, sideB: 267 },
  },
  {
    id: "4",
    topic: "Investment Level (% of Revenue)",
    category: "investment",
    sideA: {
      firm: "BCG",
      position: "3-5% of revenue for leaders",
      quote: "Companies serious about AI leadership should allocate 3-5% of revenue. Anything less signals lack of commitment.",
      confidence: 88,
      date: "October 2025",
    },
    sideB: {
      firm: "Bain",
      position: "1-3% is prudent starting point",
      quote: "Start with 1-3% and scale based on proven ROI. Over-investment without validation leads to waste.",
      confidence: 85,
      date: "November 2025",
    },
    severity: "medium",
    resolution: "Industry-dependent: tech companies may need 3-5%, traditional enterprises 1-3%.",
    decisionImplication: "Start at 2% of revenue, with clear milestones to scale to 4% based on demonstrated ROI. This is defensible to boards.",
    userVotes: { sideA: 98, sideB: 142 },
  },
  {
    id: "5",
    topic: "Foundation Model Strategy",
    category: "technical",
    sideA: {
      firm: "a16z",
      position: "Open-source will dominate by 2027",
      quote: "Open-source models are catching up fast. By 2027, there will be no compelling reason to pay for proprietary models.",
      confidence: 72,
      date: "July 2025",
    },
    sideB: {
      firm: "McKinsey",
      position: "Proprietary models maintain edge",
      quote: "Enterprise requirements for security, support, and performance will keep proprietary models dominant for the foreseeable future.",
      confidence: 82,
      date: "October 2025",
    },
    severity: "medium",
    decisionImplication: "Design model-agnostic architecture now. Avoid lock-in to any single provider while leveraging proprietary models for current performance.",
    userVotes: { sideA: 189, sideB: 134 },
  },
  {
    id: "6",
    topic: "Governance Timing",
    category: "risk",
    sideA: {
      firm: "PwC",
      position: "Governance first, then deploy",
      quote: "Establish comprehensive governance frameworks before any production deployment. The risks of moving fast are too high.",
      confidence: 94,
      date: "September 2025",
    },
    sideB: {
      firm: "AWS",
      position: "Deploy fast, iterate governance",
      quote: "Perfect governance is the enemy of progress. Start with basic guardrails and evolve governance alongside deployment.",
      confidence: 76,
      date: "August 2025",
    },
    severity: "high",
    resolution: "Industry context: regulated industries (finance, healthcare) need governance first; others can iterate.",
    decisionImplication: "For regulated industries, governance first. For others, establish minimum viable governance and iterate. Never skip governance entirely.",
    userVotes: { sideA: 201, sideB: 87 },
  },
  {
    id: "7",
    topic: "Multi-Agent Complexity",
    category: "technical",
    sideA: {
      firm: "Google DeepMind",
      position: "Multi-agent debugging costs exceed model costs 3:1",
      quote: "Our research shows that debugging and maintaining multi-agent systems costs 3x more than the underlying model infrastructure.",
      confidence: 91,
      date: "September 2025",
    },
    sideB: {
      firm: "Microsoft",
      position: "Multi-agent overhead is manageable",
      quote: "With proper observability tooling, multi-agent systems are no more complex to maintain than traditional microservices.",
      confidence: 80,
      date: "October 2025",
    },
    severity: "medium",
    decisionImplication: "Budget 3x your model costs for observability and debugging. If that breaks your business case, simplify your agent architecture.",
    userVotes: { sideA: 112, sideB: 98 },
  },
  {
    id: "8",
    topic: "Talent Strategy",
    category: "strategy",
    sideA: {
      firm: "IBM",
      position: "Upskill existing workforce",
      quote: "The talent gap can be closed through systematic upskilling. Hiring AI specialists at scale isn't sustainable or necessary.",
      confidence: 83,
      date: "October 2025",
    },
    sideB: {
      firm: "BCG",
      position: "Hire specialized AI talent",
      quote: "AI requires specialized skills that can't be easily taught. Organizations need to compete for top AI talent.",
      confidence: 86,
      date: "October 2025",
    },
    severity: "medium",
    resolution: "Both are needed: hire for core AI team, upskill for organization-wide adoption.",
    decisionImplication: "Hire 5-10 specialized AI engineers for your core team. Upskill 100+ employees for AI-augmented roles. Both tracks are necessary.",
    userVotes: { sideA: 167, sideB: 145 },
  },
];

const categoryIcons = {
  strategy: Scale,
  technical: Zap,
  timeline: Clock,
  investment: DollarSign,
  risk: Shield,
};

const categoryColors = {
  strategy: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  technical: "text-green-400 bg-green-500/10 border-green-500/30",
  timeline: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  investment: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  risk: "text-red-400 bg-red-500/10 border-red-500/30",
};

export function ContradictionFinder() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [userVotes, setUserVotes] = useState<Record<string, "A" | "B" | null>>({});

  const filteredContradictions = selectedCategory === "all" 
    ? contradictions 
    : contradictions.filter(c => c.category === selectedCategory);

  const handleVote = (contradictionId: string, side: "A" | "B") => {
    setUserVotes(prev => ({
      ...prev,
      [contradictionId]: prev[contradictionId] === side ? null : side,
    }));
  };

  const highSeverityCount = contradictions.filter(c => c.severity === "high").length;
  const mediumSeverityCount = contradictions.filter(c => c.severity === "medium").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border-orange-500/20">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-10 w-10 text-orange-500" />
            <div className="flex-1">
              <h2 className="text-xl font-bold">Expert Position Conflicts</h2>
              <p className="text-muted-foreground mt-1">
                Where the Expert Positions disagree—and why it matters for your decisions.
              </p>
              <p className="text-xs text-muted-foreground mt-1 italic">
                Each firm is an opinionated actor with incentives, not a neutral authority.
              </p>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-400">{highSeverityCount}</p>
                <p className="text-xs text-muted-foreground">High Impact</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">{mediumSeverityCount}</p>
                <p className="text-xs text-muted-foreground">Medium Impact</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">{contradictions.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All Categories
        </Button>
        {Object.entries(categoryIcons).map(([category, Icon]) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Contradictions List */}
      <div className="space-y-6">
        {filteredContradictions.map((contradiction) => {
          const CategoryIcon = categoryIcons[contradiction.category];
          const categoryColor = categoryColors[contradiction.category];
          const userVote = userVotes[contradiction.id];
          const totalVotes = (contradiction.userVotes?.sideA || 0) + (contradiction.userVotes?.sideB || 0);
          const sideAPercent = totalVotes ? Math.round(((contradiction.userVotes?.sideA || 0) / totalVotes) * 100) : 50;
          const sideBPercent = 100 - sideAPercent;

          return (
            <Card key={contradiction.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${categoryColor}`}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{contradiction.topic}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {contradiction.category}
                        </Badge>
                        <Badge 
                          variant={contradiction.severity === "high" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {contradiction.severity} impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Side by Side Comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Side A */}
                  <div 
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userVote === "A" 
                        ? "border-blue-500 bg-blue-500/5" 
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-400" />
                        <span className="font-semibold">{contradiction.sideA.firm}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{contradiction.sideA.date}</span>
                    </div>
                    <p className="font-medium text-sm mb-2">{contradiction.sideA.position}</p>
                    <blockquote className="text-sm text-muted-foreground italic border-l-2 border-blue-500/50 pl-3">
                      "{contradiction.sideA.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <Progress value={contradiction.sideA.confidence} className="h-2 w-16" />
                        <span className="text-xs font-medium">{contradiction.sideA.confidence}%</span>
                      </div>
                      <Button
                        size="sm"
                        variant={userVote === "A" ? "default" : "outline"}
                        onClick={() => handleVote(contradiction.id, "A")}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        Agree
                      </Button>
                    </div>
                  </div>

                  {/* Side B */}
                  <div 
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userVote === "B" 
                        ? "border-green-500 bg-green-500/5" 
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-green-400" />
                        <span className="font-semibold">{contradiction.sideB.firm}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{contradiction.sideB.date}</span>
                    </div>
                    <p className="font-medium text-sm mb-2">{contradiction.sideB.position}</p>
                    <blockquote className="text-sm text-muted-foreground italic border-l-2 border-green-500/50 pl-3">
                      "{contradiction.sideB.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <Progress value={contradiction.sideB.confidence} className="h-2 w-16" />
                        <span className="text-xs font-medium">{contradiction.sideB.confidence}%</span>
                      </div>
                      <Button
                        size="sm"
                        variant={userVote === "B" ? "default" : "outline"}
                        onClick={() => handleVote(contradiction.id, "B")}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        Agree
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Community Vote Bar */}
                {contradiction.userVotes && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{contradiction.sideA.firm}: {sideAPercent}%</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {totalVotes} votes
                      </span>
                      <span>{contradiction.sideB.firm}: {sideBPercent}%</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 transition-all" 
                        style={{ width: `${sideAPercent}%` }} 
                      />
                      <div 
                        className="bg-green-500 transition-all" 
                        style={{ width: `${sideBPercent}%` }} 
                      />
                    </div>
                  </div>
                )}

                {/* Decision Implication */}
                <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-primary mb-1">Decision Implication</p>
                    <p className="text-sm text-muted-foreground">{contradiction.decisionImplication}</p>
                  </div>
                </div>

                {/* Resolution (if available) */}
                {contradiction.resolution && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-yellow-500 mb-1">Potential Resolution</p>
                      <p className="text-sm text-muted-foreground">{contradiction.resolution}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Understanding Contradictions</p>
              <p className="text-sm text-muted-foreground mt-1">
                Contradictions don't mean one side is wrong—they often reflect different contexts, 
                industries, or timeframes. Use these disagreements to identify where you need to 
                make context-specific decisions for your organization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
