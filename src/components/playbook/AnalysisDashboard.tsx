import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { 
  TrendingUp, AlertTriangle, CheckCircle2, 
  Target, Lightbulb, Shield, Clock
} from "lucide-react";
import type { RoleType } from "@/pages/PlaybookPlatform";

interface AnalysisDashboardProps {
  role: RoleType;
}

const consensusData = [
  { topic: "Multi-agent orchestration is key", agree: 11, disagree: 1 },
  { topic: "RAG essential for enterprise", agree: 10, disagree: 2 },
  { topic: "Governance frameworks critical", agree: 12, disagree: 0 },
  { topic: "2026 is 'Year of the Agent'", agree: 9, disagree: 3 },
  { topic: "Build core, buy foundation", agree: 8, disagree: 4 },
  { topic: "18-24 month ROI timeline", agree: 10, disagree: 2 },
];

const categoryBreakdown = [
  { name: "Strategy", value: 6, color: "#3B82F6" },
  { name: "Build", value: 2, color: "#22C55E" },
  { name: "Leadership", value: 4, color: "#A855F7" },
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

const priorityActions = {
  CEO: [
    { action: "Establish AI governance board", priority: 95, category: "Leadership" },
    { action: "Allocate 2-4% revenue to AI", priority: 90, category: "Strategy" },
    { action: "Identify 3 pilot use cases", priority: 88, category: "Strategy" },
    { action: "Develop talent acquisition plan", priority: 85, category: "Build" },
  ],
  CTO: [
    { action: "Evaluate multi-agent frameworks", priority: 95, category: "Build" },
    { action: "Implement RAG infrastructure", priority: 92, category: "Build" },
    { action: "Set up observability stack", priority: 88, category: "Build" },
    { action: "Define API strategy for agents", priority: 85, category: "Strategy" },
  ],
  MBA: [
    { action: "Master agentic AI terminology", priority: 95, category: "Learning" },
    { action: "Analyze 3 industry case studies", priority: 90, category: "Research" },
    { action: "Compare consulting frameworks", priority: 88, category: "Analysis" },
    { action: "Build ROI calculation model", priority: 85, category: "Skills" },
  ],
};

export function AnalysisDashboard({ role }: AnalysisDashboardProps) {
  const actions = priorityActions[role];

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

      {/* Charts Row */}
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
                <Bar dataKey="agree" fill="#22C55E" name="Agree" />
                <Bar dataKey="disagree" fill="#EF4444" name="Disagree" />
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
        {/* Priority Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Priority Actions for {role}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actions.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.action}</span>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
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
