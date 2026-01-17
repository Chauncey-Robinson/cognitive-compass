import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, AlertTriangle, TrendingUp, BookOpen, 
  DollarSign, Lightbulb, Target, Shield,
  ThumbsUp, ThumbsDown, Meh
} from "lucide-react";

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
  fluffAlert: string[];
  goldNuggets: string[];
  hiddenAgenda?: string;
}

const playbookGrades: PlaybookGrade[] = [
  {
    title: "The State of AI in 2025",
    company: "McKinsey",
    date: "June 2025",
    scores: { actionability: 6, depth: 8, bias: 4, novelty: 7, dataBacked: 9 },
    overallGrade: "B+",
    verdict: "essential",
    tldr: "Solid foundation-setting report. Heavy on data, light on 'how to actually do it.'",
    fluffAlert: [
      "'Transform your organization' - says every consulting deck ever",
      "Lots of 'could' and 'might' language"
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
    tldr: "Feels like a sales pitch for PwC's transformation services. 'Reinvention' used 47 times.",
    fluffAlert: [
      "'Reinvention' is just rebranded digital transformation",
      "Heavy on buzzwords, light on specifics",
      "Every recommendation ends with 'partner with experts'"
    ],
    goldNuggets: [
      "Regulatory landscape section is solid",
      "Change management checklist is practical"
    ],
    hiddenAgenda: "Selling PwC transformation consulting"
  },
  {
    title: "The Agentic AI Opportunity",
    company: "McKinsey",
    date: "July 2025",
    scores: { actionability: 7, depth: 8, bias: 3, novelty: 6, dataBacked: 8 },
    overallGrade: "A-",
    verdict: "essential",
    tldr: "McKinsey's strongest piece. Actual use cases with ROI projections you can take to the board.",
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
    tldr: "Surprisingly practical. The '6 insights' framework is actually useful for building a business case.",
    fluffAlert: [
      "Case studies are all Accenture clients (convenient)",
      "'Responsible AI' section feels tacked on"
    ],
    goldNuggets: [
      "Cost modeling framework is excellent",
      "Build vs buy decision tree",
      "12-month implementation roadmap template"
    ]
  },
  {
    title: "The Rise of Autonomous Agents",
    company: "AWS",
    date: "August 2025",
    scores: { actionability: 9, depth: 9, bias: 6, novelty: 8, dataBacked: 7 },
    overallGrade: "A",
    verdict: "essential",
    tldr: "Technical deep-dive that's actually useful. Yes, it pushes AWS services, but the architecture patterns are solid.",
    fluffAlert: [
      "Every solution somehow involves AWS Bedrock",
      "Competitor comparison is... generous to AWS"
    ],
    goldNuggets: [
      "Multi-agent architecture diagrams are production-ready",
      "Cost optimization strategies are real",
      "Security patterns for agent systems",
      "Actual code examples (rare!)"
    ],
    hiddenAgenda: "Selling AWS Bedrock, but at least they're honest about it"
  },
  {
    title: "From Hype to Reality",
    company: "Bain & Company",
    date: "August 2025",
    scores: { actionability: 7, depth: 7, bias: 3, novelty: 8, dataBacked: 6 },
    overallGrade: "B+",
    verdict: "essential",
    tldr: "Refreshingly skeptical. Bain calls BS on overhyped claims. Good reality check before you overspend.",
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
    tldr: "Solid on org design, weak on technology (unless you're buying IBM). Operating model framework is legit.",
    fluffAlert: [
      "watsonx mentioned on every other page",
      "'Operating model' is overused"
    ],
    goldNuggets: [
      "RACI matrix for AI governance",
      "Center of Excellence blueprint",
      "Skills taxonomy for AI roles"
    ],
    hiddenAgenda: "Selling watsonx platform"
  },
  {
    title: "Agentic Enterprise 2028",
    company: "Deloitte",
    date: "September 2025",
    scores: { actionability: 4, depth: 7, bias: 4, novelty: 6, dataBacked: 5 },
    overallGrade: "C+",
    verdict: "skip",
    tldr: "Interesting thought experiment, but 2028 predictions are basically sci-fi. Hard to action today.",
    fluffAlert: [
      "Scenario planning without probabilities",
      "'By 2028' predictions are pure speculation",
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
    tldr: "Good for CEOs worried about leadership in AI era. Less useful for anyone who needs to actually build something.",
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
    tldr: "McKinsey's org design playbook. If you're restructuring for AI, start here.",
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
    tldr: "Policy perspective, not business guidance. Good for understanding regulatory direction, useless for implementation.",
    fluffAlert: [
      "Very high-level, policy-focused",
      "'Multi-stakeholder' everything",
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
    tldr: "McKinsey's action-oriented summary. If you only read one, make it this one. Synthesizes their other reports.",
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
              <h2 className="text-xl font-bold">Playbook Quality Report Card</h2>
              <p className="text-muted-foreground mt-1">
                Honest grades for each playbook. We call out the fluff so you don't waste time.
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
                  <Badge variant="outline" className={getVerdictColor(playbook.verdict)}>
                    <VerdictIcon className="h-3 w-3 mr-1" />
                    {playbook.verdict.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* TL;DR */}
                <p className="text-sm font-medium">{playbook.tldr}</p>

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
                  <TabsContent value="fluff" className="mt-3">
                    <ul className="space-y-1">
                      {playbook.fluffAlert.map((fluff, fIdx) => (
                        <li key={fIdx} className="text-sm text-red-400 flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 mt-1 shrink-0" />
                          {fluff}
                        </li>
                      ))}
                    </ul>
                    {playbook.hiddenAgenda && (
                      <p className="mt-2 text-xs text-amber-400 bg-amber-500/10 p-2 rounded">
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
