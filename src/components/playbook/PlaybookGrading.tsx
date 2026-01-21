import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, AlertTriangle, TrendingUp, BookOpen, 
  DollarSign, Lightbulb, Target, Shield,
  ThumbsUp, ThumbsDown, Meh
} from "lucide-react";

// Philosophy: This platform optimizes for decision quality, not narrative coherence.
// Treat each consulting firm as an opinionated actor ("Expert Position"), not a neutral authority.

type ConsensusLevel = "high" | "moderate" | "contested";

interface PlaybookGrade {
  title: string;
  company: string;
  date: string;
  scores: {
    actionability: number;
    depth: number;
    bias: number; // Higher = more biased/sales-y
    novelty: number;
    dataBacked: number;
  };
  overallGrade: string;
  verdict: "essential" | "useful" | "skip";
  tldr: string;
  decisionImplication: string; // What should leadership do differently?
  consensusLevel: ConsensusLevel; // How much agreement with other Expert Positions
  fluffAlert: string[];
  goldNuggets: string[];
  hiddenAgenda?: string;
  biasFlags?: string[]; // Vendor self-positioning, service upsell, branded slogans
}

const playbookGrades: PlaybookGrade[] = [
  {
    title: "The State of AI in 2025",
    company: "McKinsey",
    date: "June 2025",
    scores: { actionability: 6, depth: 8, bias: 4, novelty: 7, dataBacked: 9 },
    overallGrade: "B+",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "Solid foundation-setting report. Heavy on data, light on 'how to actually do it.'",
    decisionImplication: "Use this as your baseline for board-level AI strategy discussions. The data points are defensible in executive settings.",
    fluffAlert: [
      "Repeated 'transform your organization' language",
      "Hedged language with 'could' and 'might'"
    ],
    goldNuggets: [
      "40% productivity gain stat is well-sourced",
      "Industry breakdown by AI readiness is genuinely useful",
      "Risk framework is actionable"
    ]
  },
  {
    title: "Agentic AI Reinvention",
    company: "PwC",
    date: "July 2025",
    scores: { actionability: 5, depth: 6, bias: 7, novelty: 4, dataBacked: 5 },
    overallGrade: "C+",
    verdict: "skip",
    consensusLevel: "moderate",
    tldr: "Reads as a sales pitch for PwC's transformation services. 'Reinvention' used 47 times.",
    decisionImplication: "Skip unless you need regulatory landscape context. The core recommendations are derivative of other Expert Positions.",
    fluffAlert: [
      "'Reinvention' is just rebranded digital transformation",
      "Heavy on buzzwords, light on specifics",
      "Every recommendation ends with 'partner with experts'"
    ],
    goldNuggets: [
      "Regulatory landscape section is solid",
      "Change management checklist is practical"
    ],
    hiddenAgenda: "Service upsell for PwC transformation consulting",
    biasFlags: ["Service upsell language", "Branded slogan overuse ('reinvention')"]
  },
  {
    title: "The Agentic AI Opportunity",
    company: "McKinsey",
    date: "July 2025",
    scores: { actionability: 7, depth: 8, bias: 3, novelty: 6, dataBacked: 8 },
    overallGrade: "A-",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "McKinsey's strongest piece. Actual use cases with ROI projections you can take to the board.",
    decisionImplication: "Use the ROI calculator methodology to build your internal business case. The prioritization matrix should inform your pilot selection.",
    fluffAlert: [
      "Some industry examples feel cherry-picked"
    ],
    goldNuggets: [
      "ROI calculator methodology is replicable",
      "Prioritization matrix for use cases",
      "Talent gap analysis with specific roles"
    ]
  },
  {
    title: "Six Key Insights for AI ROI",
    company: "Accenture",
    date: "August 2025",
    scores: { actionability: 8, depth: 7, bias: 5, novelty: 6, dataBacked: 7 },
    overallGrade: "B+",
    verdict: "useful",
    consensusLevel: "moderate",
    tldr: "Surprisingly practical. The '6 insights' framework is actually useful for building a business case.",
    decisionImplication: "Adopt the cost modeling framework for your budget planning. The build vs buy decision tree should guide your architecture discussions.",
    fluffAlert: [
      "Case studies are all Accenture clients",
      "'Responsible AI' section feels tacked on"
    ],
    goldNuggets: [
      "Cost modeling framework is excellent",
      "Build vs buy decision tree",
      "12-month implementation roadmap template"
    ],
    biasFlags: ["Cherry-picked client case studies"]
  },
  {
    title: "The Rise of Autonomous Agents",
    company: "AWS",
    date: "August 2025",
    scores: { actionability: 9, depth: 9, bias: 6, novelty: 8, dataBacked: 7 },
    overallGrade: "A",
    verdict: "essential",
    consensusLevel: "moderate",
    tldr: "Technical deep-dive that's actually useful. Yes, it pushes AWS services, but the architecture patterns are solid.",
    decisionImplication: "Extract the multi-agent architecture patterns for your technical team. Discount the AWS-specific recommendations by 50% for vendor neutrality.",
    fluffAlert: [
      "Every solution somehow involves AWS Bedrock",
      "Competitor comparison is generous to AWS"
    ],
    goldNuggets: [
      "Multi-agent architecture diagrams are production-ready",
      "Cost optimization strategies are real",
      "Security patterns for agent systems",
      "Actual code examples"
    ],
    hiddenAgenda: "Vendor self-positioning for AWS Bedrock platform",
    biasFlags: ["Vendor self-positioning", "Competitor comparison bias"]
  },
  {
    title: "From Hype to Reality",
    company: "Bain & Company",
    date: "August 2025",
    scores: { actionability: 7, depth: 7, bias: 3, novelty: 8, dataBacked: 6 },
    overallGrade: "B+",
    verdict: "essential",
    consensusLevel: "contested",
    tldr: "Refreshingly skeptical. Bain calls out overhyped claims. Good reality check before you overspend.",
    decisionImplication: "Use the 'Red flags' checklist to vet your vendors. The budget reality check should inform your CFO conversations.",
    fluffAlert: [
      "Some contrarian takes feel forced"
    ],
    goldNuggets: [
      "Failure mode analysis is sobering and useful",
      "'Red flags' checklist for vendor evaluation",
      "Budget reality check vs vendor claims",
      "What 'AI-native' actually means"
    ]
  },
  {
    title: "Agentic AI Operating Model",
    company: "IBM",
    date: "September 2025",
    scores: { actionability: 6, depth: 8, bias: 6, novelty: 5, dataBacked: 6 },
    overallGrade: "B",
    verdict: "useful",
    consensusLevel: "moderate",
    tldr: "Solid on org design, weak on technology unless you're buying IBM. Operating model framework is legit.",
    decisionImplication: "Adopt the RACI matrix for AI governance. Use the CoE blueprint if you're establishing a new AI function.",
    fluffAlert: [
      "watsonx mentioned on every other page",
      "'Operating model' is overused"
    ],
    goldNuggets: [
      "RACI matrix for AI governance",
      "Center of Excellence blueprint",
      "Skills taxonomy for AI roles"
    ],
    hiddenAgenda: "Vendor self-positioning for watsonx platform",
    biasFlags: ["Vendor self-positioning (watsonx)"]
  },
  {
    title: "Agentic Enterprise 2028",
    company: "Deloitte",
    date: "September 2025",
    scores: { actionability: 4, depth: 7, bias: 4, novelty: 6, dataBacked: 5 },
    overallGrade: "C+",
    verdict: "skip",
    consensusLevel: "contested",
    tldr: "Interesting thought experiment, but 2028 predictions are speculative. Hard to action today.",
    decisionImplication: "Reference only for long-term workforce planning discussions. Do not use for near-term budget decisions.",
    fluffAlert: [
      "Scenario planning without probabilities",
      "'By 2028' predictions are speculation",
      "Lacks immediate actionability"
    ],
    goldNuggets: [
      "Regulatory scenario planning is useful",
      "Long-term workforce planning framework"
    ]
  },
  {
    title: "Leading in the Age of AI Agents",
    company: "BCG",
    date: "October 2025",
    scores: { actionability: 6, depth: 7, bias: 4, novelty: 7, dataBacked: 6 },
    overallGrade: "B",
    verdict: "useful",
    consensusLevel: "moderate",
    tldr: "Good for CEOs worried about leadership in AI era. Less useful for anyone who needs to build something.",
    decisionImplication: "Use the CEO AI literacy checklist for your own development. The board governance framework should inform your next board presentation.",
    fluffAlert: [
      "'Leadership transformation' is vague",
      "Board presentation material, not implementation guide"
    ],
    goldNuggets: [
      "CEO AI literacy checklist",
      "Board AI governance framework",
      "Executive KPIs for AI initiatives"
    ]
  },
  {
    title: "The Agentic Organization",
    company: "McKinsey",
    date: "October 2025",
    scores: { actionability: 7, depth: 8, bias: 3, novelty: 7, dataBacked: 7 },
    overallGrade: "B+",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "McKinsey's org design guidance. If you're restructuring for AI, start here.",
    decisionImplication: "Use the CoE templates when establishing your AI function. The talent redeployment framework should guide your CHRO conversations.",
    fluffAlert: [
      "Some org charts feel theoretical"
    ],
    goldNuggets: [
      "AI Center of Excellence templates",
      "Talent redeployment framework",
      "Culture change indicators",
      "Incentive structure redesign"
    ]
  },
  {
    title: "AI Agents in Action",
    company: "World Economic Forum",
    date: "November 2025",
    scores: { actionability: 3, depth: 6, bias: 2, novelty: 5, dataBacked: 7 },
    overallGrade: "C",
    verdict: "skip",
    consensusLevel: "high",
    tldr: "Policy perspective, not business guidance. Good for understanding regulatory direction, not useful for implementation.",
    decisionImplication: "Reference only when preparing for regulatory discussions or international expansion. Not actionable for product or operations decisions.",
    fluffAlert: [
      "Very high-level, policy-focused",
      "'Multi-stakeholder' used excessively",
      "No specific business recommendations"
    ],
    goldNuggets: [
      "Global regulatory landscape overview",
      "Ethical framework comparison by region"
    ]
  },
  {
    title: "Seizing the Agentic AI Advantage",
    company: "McKinsey",
    date: "November 2025",
    scores: { actionability: 8, depth: 7, bias: 4, novelty: 6, dataBacked: 7 },
    overallGrade: "A-",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "McKinsey's action-oriented summary. If you only read one, make it this one. Synthesizes their other reports.",
    decisionImplication: "Use the 90-day action plan template to structure your immediate next steps. The investment sizing framework should inform your budget request.",
    fluffAlert: [
      "Some urgency feels manufactured"
    ],
    goldNuggets: [
      "90-day action plan template",
      "Quick wins vs strategic plays matrix",
      "Competitive response playbook",
      "Investment sizing framework"
    ]
  }
];

const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case "essential": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "useful": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "skip": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "";
  }
};

const getVerdictIcon = (verdict: string) => {
  switch (verdict) {
    case "essential": return ThumbsUp;
    case "useful": return Meh;
    case "skip": return ThumbsDown;
    default: return Meh;
  }
};

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-green-400";
  if (grade.startsWith("B")) return "text-yellow-400";
  return "text-red-400";
};

const getConsensusColor = (level: ConsensusLevel) => {
  switch (level) {
    case "high": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "moderate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "contested": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default: return "";
  }
};

const getConsensusLabel = (level: ConsensusLevel) => {
  switch (level) {
    case "high": return "High Consensus";
    case "moderate": return "Moderate Consensus";
    case "contested": return "Contested";
    default: return "";
  }
};

export function PlaybookGrading() {
  const essentialCount = playbookGrades.filter(p => p.verdict === "essential").length;
  const skipCount = playbookGrades.filter(p => p.verdict === "skip").length;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-red-500/10 border-amber-500/20">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-10 w-10 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold">Expert Position Quality Report</h2>
              <p className="text-muted-foreground mt-1">
                Honest grades for each Expert Position. We call out the fluff so you don't waste time.
              </p>
              <p className="text-xs text-muted-foreground mt-1 italic">
                Outputs are board-ready: concise, defensible, and free of hype.
              </p>
              <div className="flex gap-4 mt-3">
                <Badge className="bg-green-500/20 text-green-400">{essentialCount} Essential</Badge>
                <Badge className="bg-yellow-500/20 text-yellow-400">{12 - essentialCount - skipCount} Useful</Badge>
                <Badge className="bg-red-500/20 text-red-400">{skipCount} Skip</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grading Criteria */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">How We Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-400" />
              <span><strong>Actionability:</strong> Can you do something with this?</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <span><strong>Depth:</strong> Superficial or substantive?</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-red-400" />
              <span><strong>Bias:</strong> Genuine insight or sales pitch?</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              <span><strong>Novelty:</strong> New ideas or rehashed?</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span><strong>Data-Backed:</strong> Evidence vs opinions?</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Playbook Cards */}
      <div className="space-y-4">
        {playbookGrades.map((playbook, idx) => {
          const VerdictIcon = getVerdictIcon(playbook.verdict);
          const avgScore = Object.values(playbook.scores).reduce((a, b) => a + b, 0) / 5;
          
          return (
            <Card key={idx} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`text-4xl font-bold ${getGradeColor(playbook.overallGrade)}`}>
                      {playbook.overallGrade}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{playbook.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {playbook.company} · {playbook.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getConsensusColor(playbook.consensusLevel)}>
                      {getConsensusLabel(playbook.consensusLevel)}
                    </Badge>
                    <Badge variant="outline" className={getVerdictColor(playbook.verdict)}>
                      <VerdictIcon className="h-3 w-3 mr-1" />
                      {playbook.verdict.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* TL;DR */}
                <p className="text-sm font-medium">{playbook.tldr}</p>
                
                {/* Decision Implication */}
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-xs font-semibold text-primary mb-1">Decision Implication</p>
                  <p className="text-sm text-muted-foreground">{playbook.decisionImplication}</p>
                </div>

                {/* Score Bars */}
                <div className="grid grid-cols-5 gap-3">
                  {Object.entries(playbook.scores).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span>{value}/10</span>
                      </div>
                      <Progress 
                        value={key === 'bias' ? (10 - value) * 10 : value * 10} 
                        className="h-1.5" 
                      />
                    </div>
                  ))}
                </div>

                <Tabs defaultValue="gold" className="w-full">
                  <TabsList className="grid grid-cols-2 w-64">
                    <TabsTrigger value="gold" className="text-xs">
                      <Star className="h-3 w-3 mr-1" /> Gold Nuggets
                    </TabsTrigger>
                    <TabsTrigger value="fluff" className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Fluff Alert
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="gold" className="mt-3">
                    <ul className="space-y-1">
                      {playbook.goldNuggets.map((nugget, nIdx) => (
                        <li key={nIdx} className="text-sm text-green-400 flex items-start gap-2">
                          <Star className="h-3 w-3 mt-1 shrink-0" />
                          {nugget}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="fluff" className="mt-3 space-y-3">
                    <ul className="space-y-1">
                      {playbook.fluffAlert.map((fluff, fIdx) => (
                        <li key={fIdx} className="text-sm text-red-400 flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 mt-1 shrink-0" />
                          {fluff}
                        </li>
                      ))}
                    </ul>
                    {playbook.biasFlags && playbook.biasFlags.length > 0 && (
                      <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded">
                        <p className="text-xs font-semibold text-orange-400 mb-1">Bias Flags</p>
                        <ul className="space-y-1">
                          {playbook.biasFlags.map((flag, bIdx) => (
                            <li key={bIdx} className="text-xs text-orange-300 flex items-start gap-1">
                              <span>•</span> {flag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {playbook.hiddenAgenda && (
                      <p className="text-xs text-amber-400 bg-amber-500/10 p-2 rounded">
                        <strong>Hidden Agenda:</strong> {playbook.hiddenAgenda}
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
