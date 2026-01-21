import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Star, AlertTriangle, BookOpen, 
  DollarSign, Lightbulb, Target, Shield,
  ThumbsUp, ThumbsDown, Meh, ExternalLink, ChevronDown
} from "lucide-react";
import { useRuthlessMode } from "@/contexts/RuthlessMode";

// Philosophy: This platform optimizes for decision quality, not narrative coherence.
// Treat each consulting firm as an opinionated actor ("Expert Position"), not a neutral authority.

type ConsensusLevel = "high" | "moderate" | "contested";
type PlaybookCategory = "Strategy" | "Build" | "Leadership & Governance";

interface PlaybookGrade {
  title: string;
  company: string;
  date: string;
  category: PlaybookCategory;
  url: string;
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
  // STRATEGY
  {
    title: "The State of AI in 2025",
    company: "McKinsey",
    date: "2025",
    category: "Strategy",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    scores: { actionability: 6, depth: 8, bias: 4, novelty: 7, dataBacked: 9 },
    overallGrade: "B+",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "Reality check on current adoption patterns. Heavy on data, light on 'how to actually do it.'",
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
    date: "2025",
    category: "Strategy",
    url: "https://www.pwc.com/us/en/tech-effect/ai-analytics/agentic-ai.html",
    scores: { actionability: 5, depth: 6, bias: 7, novelty: 4, dataBacked: 5 },
    overallGrade: "C+",
    verdict: "skip",
    consensusLevel: "moderate",
    tldr: "Making agents accretive to P&L. Reads as a sales pitch for PwC's transformation services.",
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
    date: "2025",
    category: "Strategy",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/why-agents-are-the-next-frontier-of-generative-ai",
    scores: { actionability: 7, depth: 8, bias: 3, novelty: 6, dataBacked: 8 },
    overallGrade: "A-",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "Comprehensive impact analysis. Actual use cases with ROI projections you can take to the board.",
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
    date: "2025",
    category: "Strategy",
    url: "https://www.accenture.com/us-en/insights/technology/agentic-ai",
    scores: { actionability: 8, depth: 7, bias: 5, novelty: 6, dataBacked: 7 },
    overallGrade: "B+",
    verdict: "useful",
    consensusLevel: "moderate",
    tldr: "How leaders are scaling adoption. The '6 insights' framework is actually useful for building a business case.",
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
  // BUILD
  {
    title: "The Rise of Autonomous Agents",
    company: "Amazon",
    date: "2025",
    category: "Build",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-foundations/introduction.html",
    scores: { actionability: 9, depth: 9, bias: 6, novelty: 8, dataBacked: 7 },
    overallGrade: "A",
    verdict: "essential",
    consensusLevel: "moderate",
    tldr: "Where agents add enterprise value. Technical deep-dive that's actually useful. Yes, it pushes AWS services, but architecture patterns are solid.",
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
    title: "State of the Art of Agentic AI Transformation",
    company: "Bain",
    date: "2025",
    category: "Build",
    url: "https://www.bain.com/insights/state-of-the-art-of-agentic-ai-transformation-technology-report-2025/",
    scores: { actionability: 7, depth: 7, bias: 3, novelty: 8, dataBacked: 6 },
    overallGrade: "B+",
    verdict: "essential",
    consensusLevel: "contested",
    tldr: "Moving from pilots to scalable transformation. Refreshingly skeptical. Bain calls out overhyped claims.",
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
    date: "2025",
    category: "Build",
    url: "https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/agentic-ai-operating-model",
    scores: { actionability: 6, depth: 8, bias: 6, novelty: 5, dataBacked: 6 },
    overallGrade: "B",
    verdict: "useful",
    consensusLevel: "moderate",
    tldr: "The mechanics required to run AI at scale. Solid on org design, weak on technology unless you're buying IBM.",
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
    date: "2025",
    category: "Build",
    url: "https://www.deloitte.com/us/en/insights/focus/technology-and-the-future-of-work/agentic-ai-enterprise.html",
    scores: { actionability: 4, depth: 7, bias: 4, novelty: 6, dataBacked: 5 },
    overallGrade: "C+",
    verdict: "skip",
    consensusLevel: "contested",
    tldr: "Blueprint for autonomous enterprise design. Interesting thought experiment, but 2028 predictions are speculative.",
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
  // LEADERSHIP & GOVERNANCE
  {
    title: "Leading in the Age of AI Agents",
    company: "BCG",
    date: "2025",
    category: "Leadership & Governance",
    url: "https://www.bcg.com/publications/2025/machines-that-manage-themselves",
    scores: { actionability: 6, depth: 7, bias: 4, novelty: 7, dataBacked: 6 },
    overallGrade: "B",
    verdict: "useful",
    consensusLevel: "moderate",
    tldr: "Managing machines that manage themselves. Good for CEOs worried about leadership in AI era.",
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
    date: "2025",
    category: "Leadership & Governance",
    url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization",
    scores: { actionability: 7, depth: 8, bias: 3, novelty: 7, dataBacked: 7 },
    overallGrade: "B+",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "Contours of the new organizational paradigm. McKinsey's org design guidance. If you're restructuring for AI, start here.",
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
    company: "WEF",
    date: "2025",
    category: "Leadership & Governance",
    url: "https://www.weforum.org/publications/ai-agents-in-action-foundations-for-evaluation-and-governance/",
    scores: { actionability: 3, depth: 6, bias: 2, novelty: 5, dataBacked: 7 },
    overallGrade: "C",
    verdict: "skip",
    consensusLevel: "high",
    tldr: "Practical guidance for evaluating and governing agents. Policy perspective, not business guidance.",
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
    date: "2025",
    category: "Leadership & Governance",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage",
    scores: { actionability: 8, depth: 7, bias: 4, novelty: 6, dataBacked: 7 },
    overallGrade: "A-",
    verdict: "essential",
    consensusLevel: "high",
    tldr: "CEO playbook for scalable impact. McKinsey's action-oriented summary. If you only read one, make it this one.",
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

// Executive-grade grayscale with single accent
const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case "essential": return "bg-foreground text-background";
    case "useful": return "bg-muted text-foreground border-border";
    case "skip": return "bg-destructive/10 text-destructive border-destructive/20";
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
  if (grade.startsWith("A")) return "text-foreground";
  if (grade.startsWith("B")) return "text-foreground/70";
  return "text-destructive";
};

const getConsensusColor = (level: ConsensusLevel) => {
  switch (level) {
    case "high": return "bg-muted text-foreground";
    case "moderate": return "bg-muted text-muted-foreground";
    case "contested": return "bg-destructive/10 text-destructive";
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

export function PlaybookGrading() {
  const { isRuthless } = useRuthlessMode();
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  
  const essentialCount = playbookGrades.filter(p => p.verdict === "essential").length;
  const skipCount = playbookGrades.filter(p => p.verdict === "skip").length;
  
  // In ruthless mode, only show essential playbooks
  const displayedPlaybooks = isRuthless 
    ? playbookGrades.filter(p => p.verdict === "essential")
    : playbookGrades;

  const toggleCard = (idx: number) => {
    setExpandedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8">
      {/* Summary Header - Primary Focus Element */}
      <div className="primary-focus">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-primary-focus">What's Worth Your Time</h2>
          <div className="flex gap-3 text-meta">
            <span>{essentialCount} Must-Read</span>
            <span className="text-muted-foreground/50">·</span>
            <span>{12 - essentialCount - skipCount} Useful</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-destructive">{skipCount} Skip</span>
          </div>
        </div>
        {!isRuthless && (
          <p className="text-meta">
            What matters first. Details when you need them.
          </p>
        )}
      </div>

      {/* Grading Criteria - Collapsed by Default */}
      {!isRuthless && (
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 text-meta hover:text-foreground transition-colors">
            <ChevronDown className="h-4 w-4" />
            How we scored this
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="executive-card-muted">
              <div className="grid grid-cols-5 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-foreground/50" />
                  <span><strong>Actionability</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-foreground/50" />
                  <span><strong>Depth</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-foreground/50" />
                  <span><strong>Bias</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-foreground/50" />
                  <span><strong>Novelty</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-foreground/50" />
                  <span><strong>Evidence</strong></span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Playbook Cards - Decision-first layout */}
      <div className="space-y-6">
        {displayedPlaybooks.map((playbook, idx) => {
          const VerdictIcon = getVerdictIcon(playbook.verdict);
          
          return (
            <div key={idx} className="executive-card">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`text-3xl font-semibold ${getGradeColor(playbook.overallGrade)}`}>
                    {playbook.overallGrade}
                  </div>
                  <div>
                    <h3 className="text-secondary-element flex items-center gap-2">
                      {playbook.title}
                      <a href={playbook.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </h3>
                    <p className="text-meta">
                      {playbook.company} · {playbook.category}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className={`text-xs ${getConsensusColor(playbook.consensusLevel)}`}>
                    {getConsensusLabel(playbook.consensusLevel)}
                  </Badge>
                  <Badge className={`text-xs ${getVerdictColor(playbook.verdict)}`}>
                    {playbook.verdict.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              {/* DECISION IMPLICATION FIRST - Primary focus */}
              <div className="primary-focus mb-4">
                <p className="text-sm text-foreground">{playbook.decisionImplication}</p>
              </div>
              
              {/* TL;DR - Secondary */}
              {!isRuthless && (
                <p className="text-sm text-muted-foreground mb-4">{playbook.tldr}</p>
              )}

              {/* Score Bars - Muted, collapsed by default in ruthless mode */}
              {!isRuthless && (
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {Object.entries(playbook.scores).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span>{value}/10</span>
                      </div>
                      <Progress 
                        value={key === 'bias' ? (10 - value) * 10 : value * 10} 
                        className="h-1" 
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Gold Nuggets & Fluff - Collapsed by default */}
              {!isRuthless && (
                  <Collapsible open={expandedCards[idx]} onOpenChange={() => toggleCard(idx)}>
                    <CollapsibleTrigger className="flex items-center gap-2 text-meta hover:text-foreground transition-colors w-full justify-between">
                      <span className="flex items-center gap-2">
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedCards[idx] ? 'rotate-180' : ''}`} />
                        View details
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {playbook.goldNuggets.length} insights · {playbook.fluffAlert.length} warnings
                      </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-4">
                      {/* Gold Nuggets */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-foreground/70">Key Insights</h4>
                        <ul className="space-y-1">
                          {playbook.goldNuggets.map((nugget, nIdx) => (
                            <li key={nIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Star className="h-3 w-3 mt-1 shrink-0 text-foreground/40" />
                              {nugget}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Fluff Alerts */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-destructive/70">Warnings</h4>
                        <ul className="space-y-1">
                          {playbook.fluffAlert.map((fluff, fIdx) => (
                            <li key={fIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 mt-1 shrink-0 text-destructive/50" />
                              {fluff}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Bias Flags */}
                      {playbook.biasFlags && playbook.biasFlags.length > 0 && (
                        <div className="p-3 bg-muted/50 rounded">
                          <p className="text-xs font-medium text-foreground/70 mb-2">Bias Detected</p>
                          <ul className="space-y-1">
                            {playbook.biasFlags.map((flag, bIdx) => (
                              <li key={bIdx} className="text-xs text-muted-foreground flex items-start gap-1">
                                <span>•</span> {flag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Hidden Agenda */}
                      {playbook.hiddenAgenda && (
                        <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                          <strong className="text-foreground/70">Hidden Agenda:</strong> {playbook.hiddenAgenda}
                        </p>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
