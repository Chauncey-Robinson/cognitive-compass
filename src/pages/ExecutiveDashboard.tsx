import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/Navigation";

const competitorInsights = [
  {
    company: "Microsoft",
    headline: "Microsoft launched Copilot for Finance Teams",
    daysAgo: 2,
    logo: "🏢"
  },
  {
    company: "Salesforce",
    headline: "Salesforce announced Einstein GPT pricing",
    daysAgo: 4,
    logo: "☁️"
  },
  {
    company: "Google",
    headline: "Google DeepMind released new reasoning model",
    daysAgo: 5,
    logo: "🔍"
  }
];

const automationData = [
  { month: "Jul", hours: 28 },
  { month: "Aug", hours: 35 },
  { month: "Sep", hours: 42 },
  { month: "Oct", hours: 47 }
];

const riskCategories = [
  {
    name: "Data Privacy Compliance",
    severity: "MEDIUM",
    color: "yellow",
    description: "GDPR and data protection regulations evolving. Ensure AI systems maintain compliance with latest requirements."
  },
  {
    name: "Model Hallucination Liability",
    severity: "LOW",
    color: "green",
    description: "Current safeguards and human oversight processes adequately mitigate risks of AI-generated misinformation."
  },
  {
    name: "Vendor Lock-in Risk",
    severity: "HIGH",
    color: "red",
    description: "Heavy reliance on single AI provider. Recommend diversification strategy and portable data architecture."
  },
  {
    name: "Talent Shortage Impact",
    severity: "MEDIUM",
    color: "yellow",
    description: "Competitive market for AI talent. Upskilling current workforce and strategic partnerships advised."
  },
  {
    name: "Regulatory Changes",
    severity: "MEDIUM",
    color: "yellow",
    description: "EU AI Act and US executive orders pending. Monitor developments and prepare compliance frameworks."
  }
];

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  const toggleRisk = (riskName: string) => {
    setExpandedRisk(expandedRisk === riskName ? null : riskName);
  };

  const getSeverityEmoji = (color: string) => {
    switch (color) {
      case "red": return "🔴";
      case "yellow": return "🟡";
      case "green": return "🟢";
      default: return "⚪";
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            <Button
              variant="ghost"
              onClick={() => navigate("/executive")}
              className="mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Executive Mode
            </Button>

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4 tracking-tight">
                Executive Intelligence Dashboard
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Real-time insights on competitive moves, team automation impact, and emerging AI risks.
              </p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              
              {/* SECTION 1 - Competitive Intelligence Monitor */}
              <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-6">
                  Competitive AI Moves This Week
                </h2>
                
                <div className="space-y-4">
                  {competitorInsights.map((insight, index) => (
                    <div
                      key={insight.company}
                      className="border-l-4 border-primary/30 pl-4 py-3 hover:border-primary transition-all animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-3xl">{insight.logo}</span>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{insight.headline}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {insight.daysAgo} days ago
                          </p>
                          <button className="text-sm text-primary hover:underline flex items-center gap-1">
                            Read Analysis
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2 - ROI Tracker */}
              <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "100ms" }}>
                <h2 className="text-2xl font-semibold mb-6">
                  Your Team's Automation Impact
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-3xl font-bold">47</p>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">Hours saved this month</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
                    <p className="text-3xl font-bold">$12,840</p>
                    <p className="text-sm text-muted-foreground">Estimated value</p>
                    <p className="text-xs text-muted-foreground mt-1">@ $275/hour avg</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
                    <p className="text-3xl font-bold">23</p>
                    <p className="text-sm text-muted-foreground">Sprints completed</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
                    <p className="text-3xl font-bold">8/12</p>
                    <p className="text-sm text-muted-foreground">Active users</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={automationData}>
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Bar dataKey="hours" fill="url(#colorHours)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Button variant="outline" className="w-full">
                  View Detailed Report
                </Button>
              </div>
            </div>

            {/* SECTION 3 - Risk Monitor - Full Width */}
            <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "200ms" }}>
              <h2 className="text-2xl font-semibold mb-6">
                Industry AI Risks - Next 90 Days
              </h2>
              
              <div className="space-y-3">
                {riskCategories.map((risk) => (
                  <div key={risk.name} className="border border-border rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => toggleRisk(risk.name)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{getSeverityEmoji(risk.color)}</span>
                        <div className="text-left">
                          <h3 className="font-medium">{risk.name}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          risk.color === "red" 
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
                            : risk.color === "yellow"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                          {risk.severity}
                        </span>
                        {expandedRisk === risk.name ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                    
                    {expandedRisk === risk.name && (
                      <div className="px-6 py-4 bg-muted/20 border-t border-border animate-fade-in">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {risk.description}
                        </p>
                        <button className="text-sm text-primary hover:underline font-medium">
                          View Framework →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ExecutiveDashboard;
