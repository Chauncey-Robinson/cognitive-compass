import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useRuthlessMode } from "@/contexts/RuthlessMode";

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
    wef: "—"
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
    wef: "—"
  },
];

const buildComparisons: ComparisonItem[] = [
  {
    dimension: "Foundation Model",
    mckinsey: "Partner",
    pwc: "Multi-vendor",
    accenture: "Partner + Fine-tune",
    aws: "Bedrock",
    bcg: "Vendor agnostic",
    bain: "Best-of-breed",
    deloitte: "Hybrid",
    ibm: "watsonx",
    wef: "—"
  },
  {
    dimension: "Build vs Buy",
    mckinsey: "Build core, buy foundation",
    pwc: "Strategic build",
    accenture: "Balanced",
    aws: "Buy + customize",
    bcg: "Build differentiators",
    bain: "Buy first",
    deloitte: "Build for scale",
    ibm: "IBM ecosystem",
    wef: "—"
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
];

export function ComparisonTable() {
  const { isRuthless } = useRuthlessMode();
  const [category, setCategory] = useState<ComparisonCategory>("strategy");
  const [showInsights, setShowInsights] = useState(false);

  const getComparisonData = () => {
    switch (category) {
      case "strategy": return strategyComparisons;
      case "build": return buildComparisons;
      case "leadership": return leadershipComparisons;
    }
  };

  const renderCell = (value: string | null) => {
    if (!value || value === "—") {
      return <span className="text-muted-foreground/30">—</span>;
    }
    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      {!isRuthless && (
        <div className="text-center space-y-2 py-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Position Comparison</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Side-by-side perspectives across 9 firms.
          </p>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={(v) => setCategory(v as ComparisonCategory)}>
        <TabsList className="grid grid-cols-3 w-full max-w-sm mx-auto bg-muted/30 p-1">
          <TabsTrigger value="strategy" className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Strategy
          </TabsTrigger>
          <TabsTrigger value="build" className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Build
          </TabsTrigger>
          <TabsTrigger value="leadership" className="text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Leadership
          </TabsTrigger>
        </TabsList>

        <TabsContent value={category} className="mt-6">
          <Card className="border-0 shadow-sm bg-background overflow-hidden">
            <CardContent className="p-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-b border-border/50">
                    <TableHead className="w-32 font-medium text-foreground/70 text-xs">Dimension</TableHead>
                    <TableHead className="text-xs text-muted-foreground">McKinsey</TableHead>
                    <TableHead className="text-xs text-muted-foreground">PwC</TableHead>
                    <TableHead className="text-xs text-muted-foreground">Accenture</TableHead>
                    <TableHead className="text-xs text-muted-foreground">AWS</TableHead>
                    <TableHead className="text-xs text-muted-foreground">BCG</TableHead>
                    <TableHead className="text-xs text-muted-foreground">Bain</TableHead>
                    <TableHead className="text-xs text-muted-foreground">Deloitte</TableHead>
                    <TableHead className="text-xs text-muted-foreground">IBM</TableHead>
                    <TableHead className="text-xs text-muted-foreground">WEF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getComparisonData().map((row, idx) => (
                    <TableRow key={idx} className="border-b border-border/30">
                      <TableCell className="font-medium text-sm text-foreground/80">{row.dimension}</TableCell>
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

      {/* Key Insights - Collapsed by Default */}
      {!isRuthless && (
        <Collapsible open={showInsights} onOpenChange={setShowInsights}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-4">
            <ChevronDown className={`h-4 w-4 transition-transform ${showInsights ? 'rotate-180' : ''}`} />
            Key divergences & agreements
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <Card className="border-0 shadow-sm bg-background">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground/80">Universal Agreement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• RAG is essential for enterprise AI</li>
                    <li>• Governance must be board-level</li>
                    <li>• 2026 is critical action window</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-background">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground/80">Key Divergences</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Build vs Buy priorities vary widely</li>
                    <li>• Timeline expectations: 6-36 months</li>
                    <li>• Investment levels: 1% to 6% revenue</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-background">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground/80">Notable Gaps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• WEF focuses on policy, not tactics</li>
                    <li>• AWS emphasizes tech over strategy</li>
                    <li>• Bain most conservative on risk</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}