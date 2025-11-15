import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Target, Users, Rocket, Shield, LineChart } from "lucide-react";

const metrics = [
  {
    label: "Intelligence Velocity",
    value: "+47%",
    description: "Year-over-year improvement in decision-making speed",
    icon: TrendingUp,
    trend: "up"
  },
  {
    label: "Automation Score",
    value: "82/100",
    description: "Percentage of automatable workflows currently deployed",
    icon: Target,
    trend: "stable"
  },
  {
    label: "Team Readiness",
    value: "76%",
    description: "Employees who have completed AI fluency training",
    icon: Users,
    trend: "up"
  },
  {
    label: "AI Project Velocity",
    value: "12 active",
    description: "Number of AI initiatives currently in progress",
    icon: Rocket,
    trend: "up"
  },
  {
    label: "Governance Coverage",
    value: "94%",
    description: "Critical systems with AI governance policies in place",
    icon: Shield,
    trend: "stable"
  },
  {
    label: "ROI Tracking",
    value: "$2.4M",
    description: "Estimated annual savings from AI automation",
    icon: LineChart,
    trend: "up"
  },
];

const ExecutiveDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/executive")}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Executive Mode
        </Button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sample CEO Dashboard
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            This is the executive view available after your organization completes the Intelligence Scan 
            and begins running Applied Sprints. Track team progress, measure AI adoption, and monitor 
            ROI across your organization in real-time.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-border/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {metric.trend === "up" && (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      ↑ Trending
                    </span>
                  )}
                  {metric.trend === "stable" && (
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                      → Stable
                    </span>
                  )}
                </div>
                
                <p className="text-4xl font-bold mb-2">{metric.value}</p>
                <p className="text-sm font-medium text-card-foreground mb-2">
                  {metric.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="glass-card p-8 rounded-2xl border-l-4 border-primary">
          <h3 className="text-xl font-semibold mb-3">
            Dashboard Preview Mode
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            This is a static preview with sample data. Once your organization completes the Intelligence Scan, 
            you'll see real metrics tracking your team's progress, AI adoption rates, and measurable business impact.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate("/scan")}
              className="button-primary"
            >
              Start Intelligence Scan
            </Button>
            <Button
              onClick={() => navigate("/pricing")}
              variant="outline"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
