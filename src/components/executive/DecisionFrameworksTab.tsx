import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, AlertTriangle, Award, Users } from "lucide-react";

const DecisionFrameworksTab = () => {
  const frameworks = [
    {
      icon: TrendingUp,
      title: "Build vs. Buy AI Tools",
      description: "Interactive decision tree to determine the optimal approach for your organization",
      type: "Decision Tree",
      duration: "10 min"
    },
    {
      icon: DollarSign,
      title: "AI Investment Prioritization",
      description: "ROI calculator to rank and prioritize AI initiatives based on impact and effort",
      type: "Calculator",
      duration: "15 min"
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment Matrix",
      description: "Scenario modeling tool to evaluate and mitigate AI-related risks",
      type: "Scenario Tool",
      duration: "12 min"
    },
    {
      icon: Award,
      title: "Vendor Evaluation Framework",
      description: "Comprehensive scoring system for evaluating AI vendors and solutions",
      type: "Scoring System",
      duration: "20 min"
    },
    {
      icon: Users,
      title: "Team Readiness Assessment",
      description: "Diagnostic quiz to measure your team's preparedness for AI adoption",
      type: "Diagnostic",
      duration: "15 min"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Executive Decision Frameworks
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Proven frameworks to make confident AI decisions. Each tool is designed for 
          quick use during actual decision-making moments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {frameworks.map((framework, index) => {
          const Icon = framework.icon;
          return (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {framework.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {framework.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{framework.title}</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {framework.description}
              </p>
              
              <Button variant="outline" className="w-full">
                Open Framework
              </Button>
            </div>
          );
        })}
      </div>

      {/* Coming Soon Notice */}
      <div className="glass-card rounded-2xl p-6 border-l-4 border-primary mt-8">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Interactive frameworks are currently in development. 
          Each will be available as a standalone tool you can use during actual decision-making.
        </p>
      </div>
    </div>
  );
};

export default DecisionFrameworksTab;
