import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { 
  AlertTriangle, Target, Calculator, DollarSign, Users, Cpu, ChevronDown
} from "lucide-react";
import { useRuthlessMode } from "@/contexts/RuthlessMode";

// Surprise Findings - insights only mentioned by 1-2 playbooks
const surpriseFindings = [
  { 
    insight: "90% of AI projects fail due to poor change management, not technology",
    source: "Bain",
    category: "Risk"
  },
  { 
    insight: "Shadow AI usage in enterprises exceeds official deployments by 3x",
    source: "IBM",
    category: "Governance"
  },
  { 
    insight: "CFOs should lead AI investment decisions, not CTOs",
    source: "PwC",
    category: "Leadership"
  },
];

const consensusData = [
  { topic: "Governance frameworks critical", agree: 12, disagree: 0 },
  { topic: "Multi-agent orchestration is key", agree: 11, disagree: 1 },
  { topic: "18-24 month ROI timeline", agree: 10, disagree: 2 },
  { topic: "RAG essential for enterprise", agree: 10, disagree: 2 },
];

const riskFactors = [
  { risk: "Data security & privacy", mentions: 12, severity: "high" },
  { risk: "Talent shortage", mentions: 10, severity: "high" },
  { risk: "Regulatory uncertainty", mentions: 9, severity: "medium" },
];

const topActions = [
  { action: "Establish AI governance board", priority: 95, role: "CEO" },
  { action: "Evaluate multi-agent frameworks", priority: 93, role: "CTO" },
  { action: "Allocate 2-4% revenue to AI", priority: 90, role: "CEO" },
];

// Budget Calculator defaults
const budgetDefaults = {
  employees: 500,
  aiMaturity: 2,
  pilotProjects: 3,
  enterpriseScale: false,
};

export function UnifiedDashboard() {
  const { isRuthless } = useRuthlessMode();
  const [budgetInputs, setBudgetInputs] = useState(budgetDefaults);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Budget calculation based on playbook recommendations
  const calculateBudget = () => {
    const basePerEmployee = 2500;
    const maturityMultiplier = [0.5, 0.75, 1, 1.25, 1.5][budgetInputs.aiMaturity - 1];
    const pilotCost = budgetInputs.pilotProjects * 150000;
    const enterpriseMultiplier = budgetInputs.enterpriseScale ? 2.5 : 1;
    
    const annualBudget = (budgetInputs.employees * basePerEmployee * maturityMultiplier * enterpriseMultiplier) + pilotCost;
    const monthlyBudget = annualBudget / 12;
    
    return {
      annual: annualBudget,
      monthly: monthlyBudget,
      infrastructure: annualBudget * 0.35,
      talent: annualBudget * 0.40,
      training: annualBudget * 0.15,
      governance: annualBudget * 0.10,
    };
  };

  const budget = calculateBudget();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Minimal Header */}
      {!isRuthless && (
        <div className="text-center space-y-2 py-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Intelligence Dashboard</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Synthesized findings from 12 Expert Positions on Agentic AI.
          </p>
        </div>
      )}

      {/* Primary Focus: Top Risks */}
      <Card className="border-0 shadow-sm bg-background">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <AlertTriangle className="h-5 w-5 text-accent-foreground" />
            </div>
            <CardTitle className="text-lg font-semibold">Critical Risks</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((risk, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
                <span className="text-sm text-foreground/80">{risk.risk}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{risk.mentions}/12 mentions</span>
                  <Badge 
                    variant="outline"
                    className={
                      risk.severity === "high" 
                        ? "bg-accent/10 text-accent-foreground border-accent/30"
                        : "text-muted-foreground"
                    }
                  >
                    {risk.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secondary: Priority Actions */}
      <Card className="border-0 shadow-sm bg-background">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50">
              <Target className="h-5 w-5 text-foreground/60" />
            </div>
            <CardTitle className="text-base font-medium text-foreground/80">Priority Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topActions.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">{item.action}</span>
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    {item.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={item.priority} className="flex-1 h-1.5" />
                  <span className="text-xs text-muted-foreground w-8">{item.priority}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collapsed: Surprise Findings */}
      {!isRuthless && (
        <Collapsible open={expandedSections['surprise']} onOpenChange={() => toggleSection('surprise')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Surprise Findings</span>
              <Badge variant="secondary" className="text-xs">Rare</Badge>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['surprise'] ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="space-y-3">
              {surpriseFindings.map((finding, idx) => (
                <Card key={idx} className="border-0 shadow-sm bg-muted/20">
                  <CardContent className="pt-4">
                    <p className="text-sm text-foreground/80 leading-relaxed mb-2">"{finding.insight}"</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{finding.source}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="text-xs text-muted-foreground">{finding.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Collapsed: Consensus Chart */}
      {!isRuthless && (
        <Collapsible open={expandedSections['consensus']} onOpenChange={() => toggleSection('consensus')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
            <span className="text-sm font-medium text-muted-foreground">Consensus Analysis</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['consensus'] ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card className="border-0 shadow-sm bg-background">
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={consensusData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" domain={[0, 12]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      type="category" 
                      dataKey="topic" 
                      width={180} 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="agree" fill="hsl(var(--foreground) / 0.2)" name="Agree" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Collapsed: Budget Calculator */}
      {!isRuthless && (
        <Collapsible open={expandedSections['budget']} onOpenChange={() => toggleSection('budget')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">AI Budget Calculator</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections['budget'] ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card className="border-0 shadow-sm bg-background">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Number of Employees
                      </Label>
                      <Input
                        type="number"
                        value={budgetInputs.employees}
                        onChange={(e) => setBudgetInputs({ ...budgetInputs, employees: parseInt(e.target.value) || 0 })}
                        className="max-w-[180px] bg-muted/30 border-border/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Cpu className="h-4 w-4" />
                        AI Maturity Level: {budgetInputs.aiMaturity}/5
                      </Label>
                      <Slider
                        value={[budgetInputs.aiMaturity]}
                        onValueChange={(v) => setBudgetInputs({ ...budgetInputs, aiMaturity: v[0] })}
                        min={1}
                        max={5}
                        step={1}
                        className="max-w-[280px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        {budgetInputs.aiMaturity === 1 && "Just starting AI journey"}
                        {budgetInputs.aiMaturity === 2 && "Some pilots in progress"}
                        {budgetInputs.aiMaturity === 3 && "Multiple production deployments"}
                        {budgetInputs.aiMaturity === 4 && "AI embedded in operations"}
                        {budgetInputs.aiMaturity === 5 && "AI-first organization"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4" />
                        Planned Pilot Projects
                      </Label>
                      <Input
                        type="number"
                        value={budgetInputs.pilotProjects}
                        onChange={(e) => setBudgetInputs({ ...budgetInputs, pilotProjects: parseInt(e.target.value) || 0 })}
                        className="max-w-[180px] bg-muted/30 border-border/50"
                        min={1}
                        max={10}
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-foreground/60" />
                        <span className="text-sm text-muted-foreground">Estimated Annual Budget</span>
                      </div>
                      <p className="text-3xl font-semibold text-foreground">${(budget.annual / 1000000).toFixed(2)}M</p>
                      <p className="text-xs text-muted-foreground mt-1">~${(budget.monthly / 1000).toFixed(0)}K/month</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Allocation</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Talent (40%)</span>
                          <span>${(budget.talent / 1000000).toFixed(2)}M</span>
                        </div>
                        <Progress value={40} className="h-1.5" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Infrastructure (35%)</span>
                          <span>${(budget.infrastructure / 1000000).toFixed(2)}M</span>
                        </div>
                        <Progress value={35} className="h-1.5" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Training (15%)</span>
                          <span>${(budget.training / 1000000).toFixed(2)}M</span>
                        </div>
                        <Progress value={15} className="h-1.5" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Governance (10%)</span>
                          <span>${(budget.governance / 1000000).toFixed(2)}M</span>
                        </div>
                        <Progress value={10} className="h-1.5" />
                      </div>
                    </div>

                    <p className="text-[10px] text-muted-foreground mt-4">
                      * Based on 2-4% revenue allocation recommended by McKinsey, PwC, and Accenture
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}