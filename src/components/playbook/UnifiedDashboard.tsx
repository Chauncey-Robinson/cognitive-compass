import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, Area, AreaChart
} from "recharts";
import { 
  TrendingUp, AlertTriangle, CheckCircle2, 
  Target, Lightbulb, Shield, Clock, Sparkles,
  Package, Calculator, DollarSign, Users, Cpu
} from "lucide-react";

// Trend Evolution Data (June - November 2025)
const trendEvolutionData = [
  { month: "Jun", agents: 3, rag: 7, governance: 4, roi: 2 },
  { month: "Jul", agents: 5, rag: 8, governance: 5, roi: 4 },
  { month: "Aug", agents: 7, rag: 9, governance: 6, roi: 5 },
  { month: "Sep", agents: 9, rag: 9, governance: 8, roi: 7 },
  { month: "Oct", agents: 11, rag: 10, governance: 10, roi: 8 },
  { month: "Nov", agents: 12, rag: 10, governance: 12, roi: 10 },
];

// Surprise Findings - insights only mentioned by 1-2 playbooks
const surpriseFindings = [
  { 
    insight: "AI agents should have 'emotional intelligence' training for customer interactions",
    source: "Accenture",
    mentions: 1,
    category: "Innovation"
  },
  { 
    insight: "90% of AI projects fail due to poor change management, not technology",
    source: "Bain",
    mentions: 1,
    category: "Risk"
  },
  { 
    insight: "Shadow AI usage in enterprises exceeds official deployments by 3x",
    source: "IBM",
    mentions: 2,
    category: "Governance"
  },
  { 
    insight: "Smaller models (7B params) outperform larger ones in 40% of enterprise tasks",
    source: "AWS",
    mentions: 1,
    category: "Technical"
  },
  { 
    insight: "CFOs should lead AI investment decisions, not CTOs",
    source: "PwC",
    mentions: 2,
    category: "Leadership"
  },
];

// Vendor Mentions across playbooks
const vendorMentions = [
  { vendor: "OpenAI / ChatGPT", mentions: 12, category: "Foundation Models", sentiment: "positive" },
  { vendor: "Microsoft Azure", mentions: 10, category: "Cloud Platform", sentiment: "positive" },
  { vendor: "AWS Bedrock", mentions: 8, category: "Cloud Platform", sentiment: "positive" },
  { vendor: "Google Vertex AI", mentions: 7, category: "Cloud Platform", sentiment: "neutral" },
  { vendor: "Anthropic Claude", mentions: 6, category: "Foundation Models", sentiment: "positive" },
  { vendor: "LangChain", mentions: 5, category: "Framework", sentiment: "positive" },
  { vendor: "Databricks", mentions: 4, category: "Data Platform", sentiment: "neutral" },
  { vendor: "Snowflake", mentions: 4, category: "Data Platform", sentiment: "neutral" },
  { vendor: "Salesforce Einstein", mentions: 3, category: "Enterprise AI", sentiment: "neutral" },
  { vendor: "Hugging Face", mentions: 3, category: "Open Source", sentiment: "positive" },
];

// Budget Calculator defaults
const budgetDefaults = {
  employees: 500,
  aiMaturity: 2, // 1-5 scale
  pilotProjects: 3,
  enterpriseScale: false,
};

const consensusData = [
  { topic: "Multi-agent orchestration is key", agree: 11, disagree: 1 },
  { topic: "RAG essential for enterprise", agree: 10, disagree: 2 },
  { topic: "Governance frameworks critical", agree: 12, disagree: 0 },
  { topic: "2026 is 'Year of the Agent'", agree: 9, disagree: 3 },
  { topic: "Build core, buy foundation", agree: 8, disagree: 4 },
  { topic: "18-24 month ROI timeline", agree: 10, disagree: 2 },
];

const categoryBreakdown = [
  { name: "Strategy", value: 6, color: "hsl(var(--chart-1))" },
  { name: "Build", value: 2, color: "hsl(var(--chart-2))" },
  { name: "Leadership", value: 4, color: "hsl(var(--chart-3))" },
];

const companyInsights = [
  { company: "McKinsey", playbooks: 4, keyFocus: "Strategic positioning", confidence: 95 },
  { company: "PwC", playbooks: 1, keyFocus: "Reinvention frameworks", confidence: 88 },
  { company: "Accenture", playbooks: 1, keyFocus: "ROI metrics", confidence: 90 },
  { company: "AWS", playbooks: 1, keyFocus: "Technical architecture", confidence: 92 },
  { company: "Bain", playbooks: 1, keyFocus: "Reality checks", confidence: 85 },
  { company: "IBM", playbooks: 1, keyFocus: "Operating models", confidence: 87 },
  { company: "Deloitte", playbooks: 1, keyFocus: "Future scenarios", confidence: 82 },
  { company: "BCG", playbooks: 1, keyFocus: "Leadership", confidence: 91 },
  { company: "WEF", playbooks: 1, keyFocus: "Global implications", confidence: 78 },
];

const riskFactors = [
  { risk: "Data security & privacy", mentions: 12, severity: "high" },
  { risk: "Talent shortage", mentions: 10, severity: "high" },
  { risk: "Regulatory uncertainty", mentions: 9, severity: "medium" },
  { risk: "Integration complexity", mentions: 8, severity: "medium" },
  { risk: "Cost overruns", mentions: 7, severity: "medium" },
  { risk: "Vendor lock-in", mentions: 5, severity: "low" },
];

const topActions = [
  { action: "Establish AI governance board", priority: 95, role: "CEO" },
  { action: "Evaluate multi-agent frameworks", priority: 93, role: "CTO" },
  { action: "Allocate 2-4% revenue to AI", priority: 90, role: "CEO" },
  { action: "Implement RAG infrastructure", priority: 88, role: "CTO" },
  { action: "Identify 3 pilot use cases", priority: 85, role: "CEO" },
  { action: "Master agentic AI terminology", priority: 82, role: "MBA" },
];

export function UnifiedDashboard() {
  const [budgetInputs, setBudgetInputs] = useState(budgetDefaults);

  // Budget calculation based on playbook recommendations
  const calculateBudget = () => {
    const basePerEmployee = 2500; // Average from playbooks
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
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Playbooks Analyzed</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Key Insights</p>
                <p className="text-3xl font-bold">48</p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Factors</p>
                <p className="text-3xl font-bold">6</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Action Items</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NEW: Trend Evolution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Consensus Evolution (June - November 2025)
          </CardTitle>
          <p className="text-xs text-muted-foreground">How key topics gained traction across playbooks over time</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendEvolutionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 12]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="agents" name="Agentic AI" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="rag" name="RAG Systems" stroke="#22C55E" fill="#22C55E" fillOpacity={0.3} />
              <Area type="monotone" dataKey="governance" name="Governance" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="roi" name="ROI Focus" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* NEW: Surprise Findings & Vendor Mentions Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Surprise Findings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Surprise Findings
              <Badge variant="secondary" className="ml-auto text-xs">Rare Insights</Badge>
            </CardTitle>
            <p className="text-xs text-muted-foreground">Unique insights mentioned by only 1-2 playbooks</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {surpriseFindings.map((finding, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/20">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-relaxed">"{finding.insight}"</p>
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                      {finding.mentions === 1 ? "Unique" : `${finding.mentions}×`}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-[10px]">{finding.source}</Badge>
                    <span className="text-[10px] text-muted-foreground">• {finding.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Mentions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              Vendor Mentions
              <Badge variant="secondary" className="ml-auto text-xs">Top 10</Badge>
            </CardTitle>
            <p className="text-xs text-muted-foreground">Most recommended tools and platforms across playbooks</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {vendorMentions.map((vendor, idx) => (
                <div key={idx} className="flex items-center gap-3 py-1.5">
                  <span className="w-5 text-xs text-muted-foreground font-mono">{idx + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{vendor.vendor}</span>
                      <Badge variant="outline" className="text-[10px] shrink-0">{vendor.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          vendor.sentiment === 'positive' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${(vendor.mentions / 12) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-6">{vendor.mentions}×</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NEW: Budget Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-4 w-4 text-green-500" />
            AI Investment Budget Calculator
            <Badge variant="secondary" className="ml-auto text-xs">Based on Playbook Recommendations</Badge>
          </CardTitle>
          <p className="text-xs text-muted-foreground">Estimate your AI investment based on consensus recommendations from all playbooks</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Number of Employees
                </Label>
                <Input
                  type="number"
                  value={budgetInputs.employees}
                  onChange={(e) => setBudgetInputs({ ...budgetInputs, employees: parseInt(e.target.value) || 0 })}
                  className="max-w-[200px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  AI Maturity Level: {budgetInputs.aiMaturity}/5
                </Label>
                <Slider
                  value={[budgetInputs.aiMaturity]}
                  onValueChange={(v) => setBudgetInputs({ ...budgetInputs, aiMaturity: v[0] })}
                  min={1}
                  max={5}
                  step={1}
                  className="max-w-[300px]"
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
                <Label className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Planned Pilot Projects
                </Label>
                <Input
                  type="number"
                  value={budgetInputs.pilotProjects}
                  onChange={(e) => setBudgetInputs({ ...budgetInputs, pilotProjects: parseInt(e.target.value) || 0 })}
                  className="max-w-[200px]"
                  min={1}
                  max={10}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant={budgetInputs.enterpriseScale ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBudgetInputs({ ...budgetInputs, enterpriseScale: !budgetInputs.enterpriseScale })}
                >
                  {budgetInputs.enterpriseScale ? "Enterprise Scale ✓" : "Enterprise Scale"}
                </Button>
                <span className="text-xs text-muted-foreground">
                  Multi-region, compliance requirements
                </span>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Estimated Annual Budget</span>
                </div>
                <p className="text-3xl font-bold">${(budget.annual / 1000000).toFixed(2)}M</p>
                <p className="text-xs text-muted-foreground mt-1">~${(budget.monthly / 1000).toFixed(0)}K/month</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recommended Allocation</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Talent & Hiring (40%)</span>
                    <span className="font-medium">${(budget.talent / 1000000).toFixed(2)}M</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Infrastructure (35%)</span>
                    <span className="font-medium">${(budget.infrastructure / 1000000).toFixed(2)}M</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Training & Change Mgmt (15%)</span>
                    <span className="font-medium">${(budget.training / 1000000).toFixed(2)}M</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Governance & Compliance (10%)</span>
                    <span className="font-medium">${(budget.governance / 1000000).toFixed(2)}M</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground mt-4">
                * Based on 2-4% revenue allocation recommended by McKinsey, PwC, and Accenture playbooks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Original Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Consensus Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Consensus vs Divergence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={consensusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" domain={[0, 12]} />
                <YAxis 
                  type="category" 
                  dataKey="topic" 
                  width={150} 
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Bar dataKey="agree" fill="hsl(var(--chart-2))" name="Agree" />
                <Bar dataKey="disagree" fill="hsl(var(--destructive))" name="Disagree" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Playbooks by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Priority Actions (All Roles) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Top Priority Actions (All Roles)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topActions.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.action}</span>
                    <Badge 
                      variant="outline" 
                      className={
                        item.role === "CEO" 
                          ? "bg-blue-500/20 text-blue-400" 
                          : item.role === "CTO" 
                          ? "bg-green-500/20 text-green-400"
                          : "bg-purple-500/20 text-purple-400"
                      }
                    >
                      {item.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.priority} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-8">{item.priority}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Top Risk Factors (All Playbooks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskFactors.map((risk, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{risk.risk}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{risk.mentions} mentions</span>
                    <Badge 
                      variant="outline"
                      className={
                        risk.severity === "high" 
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : risk.severity === "medium"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                          : "bg-green-500/10 text-green-400 border-green-500/30"
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
      </div>

      {/* Company Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Insights by Company
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {companyInsights.map((company, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{company.company}</span>
                  <Badge variant="secondary" className="text-xs">{company.playbooks} doc{company.playbooks > 1 ? 's' : ''}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{company.keyFocus}</p>
                <div className="flex items-center gap-2">
                  <Progress value={company.confidence} className="flex-1 h-1.5" />
                  <span className="text-[10px] text-muted-foreground">{company.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
