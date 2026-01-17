import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitCompare, CheckCircle2, XCircle, Minus } from "lucide-react";

type ComparisonCategory = "strategy" | "build" | "leadership";

interface ComparisonItem {
  dimension: string;
  mckinsey: string | null;
  pwc: string | null;
  accenture: string | null;
  aws: string | null;
  bcg: string | null;
  bain: string | null;
  deloitte: string | null;
  ibm: string | null;
  wef: string | null;
}

const strategyComparisons: ComparisonItem[] = [
  {
    dimension: "Primary Focus",
    mckinsey: "Competitive advantage",
    pwc: "Business reinvention",
    accenture: "ROI optimization",
    aws: "Technical enablement",
    bcg: "Leadership transformation",
    bain: "Practical implementation",
    deloitte: "Future scenarios",
    ibm: "Operating models",
    wef: "Global implications"
  },
  {
    dimension: "Timeline to Value",
    mckinsey: "18-24 months",
    pwc: "12-18 months",
    accenture: "12-24 months",
    aws: "6-12 months",
    bcg: "24-36 months",
    bain: "18-24 months",
    deloitte: "24-36 months",
    ibm: "12-18 months",
    wef: "N/A"
  },
  {
    dimension: "Investment Level",
    mckinsey: "2-4% revenue",
    pwc: "3-5% revenue",
    accenture: "2-3% revenue",
    aws: "Variable",
    bcg: "3-5% revenue",
    bain: "1-3% revenue",
    deloitte: "4-6% revenue",
    ibm: "2-4% revenue",
    wef: "N/A"
  },
  {
    dimension: "Risk Appetite",
    mckinsey: "Moderate-High",
    pwc: "High",
    accenture: "Moderate",
    aws: "Variable",
    bcg: "High",
    bain: "Low-Moderate",
    deloitte: "High",
    ibm: "Moderate",
    wef: "N/A"
  },
];

const buildComparisons: ComparisonItem[] = [
  {
    dimension: "Foundation Model",
    mckinsey: "Partner (OpenAI/Anthropic)",
    pwc: "Multi-vendor",
    accenture: "Partner + Fine-tune",
    aws: "Bedrock ecosystem",
    bcg: "Vendor agnostic",
    bain: "Best-of-breed",
    deloitte: "Hybrid approach",
    ibm: "watsonx + partners",
    wef: "N/A"
  },
  {
    dimension: "Orchestration",
    mckinsey: "Custom build",
    pwc: "LangChain/LangGraph",
    accenture: "Custom + frameworks",
    aws: "Step Functions + Bedrock",
    bcg: "Framework agnostic",
    bain: "Vendor solutions",
    deloitte: "Hybrid",
    ibm: "IBM tooling",
    wef: "N/A"
  },
  {
    dimension: "Data Architecture",
    mckinsey: "RAG + Vector DB",
    pwc: "RAG essential",
    accenture: "RAG + Knowledge graphs",
    aws: "OpenSearch + RAG",
    bcg: "RAG foundation",
    bain: "Pragmatic RAG",
    deloitte: "Enterprise RAG",
    ibm: "RAG + watsonx.data",
    wef: "N/A"
  },
  {
    dimension: "Build vs Buy",
    mckinsey: "Build core, buy foundation",
    pwc: "Strategic build, tactical buy",
    accenture: "Balanced approach",
    aws: "Buy + customize",
    bcg: "Build differentiators",
    bain: "Buy first, build later",
    deloitte: "Build for scale",
    ibm: "IBM ecosystem + build",
    wef: "N/A"
  },
];

const leadershipComparisons: ComparisonItem[] = [
  {
    dimension: "Governance Model",
    mckinsey: "Board-level AI committee",
    pwc: "AI Center of Excellence",
    accenture: "Federated governance",
    aws: "Distributed ownership",
    bcg: "Executive AI council",
    bain: "Pragmatic oversight",
    deloitte: "Enterprise AI office",
    ibm: "Centralized + federated",
    wef: "Multi-stakeholder"
  },
  {
    dimension: "Change Management",
    mckinsey: "Top-down transformation",
    pwc: "Culture-first approach",
    accenture: "Skills-based transition",
    aws: "Technical enablement",
    bcg: "Leadership alignment",
    bain: "Practical adoption",
    deloitte: "Scenario planning",
    ibm: "Operating model shift",
    wef: "Societal considerations"
  },
  {
    dimension: "Talent Strategy",
    mckinsey: "Upskill + acquire",
    pwc: "Reimagine workforce",
    accenture: "Skills transformation",
    aws: "Technical training",
    bcg: "Leadership development",
    bain: "Targeted hiring",
    deloitte: "Future skills mapping",
    ibm: "AI-augmented workforce",
    wef: "Just transition"
  },
  {
    dimension: "Success Metrics",
    mckinsey: "Revenue + efficiency",
    pwc: "Transformation KPIs",
    accenture: "ROI dashboards",
    aws: "Technical metrics",
    bcg: "Strategic outcomes",
    bain: "Practical milestones",
    deloitte: "Maturity models",
    ibm: "Operational metrics",
    wef: "Inclusive growth"
  },
];

const companyColors: Record<string, string> = {
  mckinsey: "text-blue-400",
  pwc: "text-orange-400",
  accenture: "text-purple-400",
  aws: "text-yellow-400",
  bcg: "text-red-400",
  bain: "text-pink-400",
  deloitte: "text-green-400",
  ibm: "text-cyan-400",
  wef: "text-teal-400",
};

export function ComparisonTable() {
  const [category, setCategory] = useState<ComparisonCategory>("strategy");

  const getComparisonData = () => {
    switch (category) {
      case "strategy": return strategyComparisons;
      case "build": return buildComparisons;
      case "leadership": return leadershipComparisons;
    }
  };

  const renderCell = (value: string | null) => {
    if (!value || value === "N/A") {
      return <span className="text-muted-foreground">—</span>;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <GitCompare className="h-10 w-10 text-primary" />
            <div>
              <h2 className="text-xl font-bold">Playbook Comparison Matrix</h2>
              <p className="text-muted-foreground">
                Compare perspectives across McKinsey, PwC, Accenture, AWS, BCG, Bain, Deloitte, IBM & WEF
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={(v) => setCategory(v as ComparisonCategory)}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="strategy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Strategy
          </TabsTrigger>
          <TabsTrigger value="build" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Build
          </TabsTrigger>
          <TabsTrigger value="leadership" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Leadership
          </TabsTrigger>
        </TabsList>

        <TabsContent value={category} className="mt-6">
          <Card>
            <CardContent className="p-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-40 font-bold">Dimension</TableHead>
                    <TableHead className={companyColors.mckinsey}>McKinsey</TableHead>
                    <TableHead className={companyColors.pwc}>PwC</TableHead>
                    <TableHead className={companyColors.accenture}>Accenture</TableHead>
                    <TableHead className={companyColors.aws}>AWS</TableHead>
                    <TableHead className={companyColors.bcg}>BCG</TableHead>
                    <TableHead className={companyColors.bain}>Bain</TableHead>
                    <TableHead className={companyColors.deloitte}>Deloitte</TableHead>
                    <TableHead className={companyColors.ibm}>IBM</TableHead>
                    <TableHead className={companyColors.wef}>WEF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getComparisonData().map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{row.dimension}</TableCell>
                      <TableCell>{renderCell(row.mckinsey)}</TableCell>
                      <TableCell>{renderCell(row.pwc)}</TableCell>
                      <TableCell>{renderCell(row.accenture)}</TableCell>
                      <TableCell>{renderCell(row.aws)}</TableCell>
                      <TableCell>{renderCell(row.bcg)}</TableCell>
                      <TableCell>{renderCell(row.bain)}</TableCell>
                      <TableCell>{renderCell(row.deloitte)}</TableCell>
                      <TableCell>{renderCell(row.ibm)}</TableCell>
                      <TableCell>{renderCell(row.wef)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-400">Strategy</Badge>
              <span className="text-muted-foreground">Market positioning, ROI, timing</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400">Build</Badge>
              <span className="text-muted-foreground">Tech architecture, implementation</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-500/20 text-purple-400">Leadership</Badge>
              <span className="text-muted-foreground">Governance, talent, change</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Universal Agreement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• RAG is essential for enterprise AI</li>
              <li>• Governance must be board-level</li>
              <li>• 2026 is critical action window</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              Key Divergences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Build vs Buy priorities vary widely</li>
              <li>• Timeline expectations differ 6-36 mo</li>
              <li>• Investment levels: 1% to 6% revenue</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Minus className="h-4 w-4 text-yellow-500" />
              Notable Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• WEF focuses on policy, not tactics</li>
              <li>• AWS emphasizes tech over strategy</li>
              <li>• Bain most conservative on risk</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
