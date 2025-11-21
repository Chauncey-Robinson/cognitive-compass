import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

const IntelligenceDashboardTab = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: TrendingUp,
      title: "Competitive Intelligence Monitor",
      description: "Track competitor AI moves and market trends in real-time. Stay ahead of industry shifts with automated insights.",
      features: ["Weekly competitor updates", "Market trend analysis", "Strategic implications"]
    },
    {
      icon: DollarSign,
      title: "ROI Tracker",
      description: "Measure the business impact of your AI initiatives. See hours saved, value generated, and team adoption metrics.",
      features: ["Automation hours saved", "Cost savings estimation", "Sprint completion tracking"]
    },
    {
      icon: AlertTriangle,
      title: "Risk Monitor",
      description: "Identify and track emerging AI risks before they become problems. 90-day forward-looking risk assessment.",
      features: ["Severity ratings", "Mitigation frameworks", "Regulatory updates"]
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Introduction */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Executive Intelligence Dashboard
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Your command center for AI strategy. Monitor competitive moves, track ROI, 
          and identify risks—all in one place.
        </p>
        <Button
          onClick={() => navigate("/executive/dashboard")}
          size="lg"
          className="button-primary"
        >
          View Full Dashboard
        </Button>
      </div>

      {/* Dashboard Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">{section.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {section.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                    <ul className="space-y-1">
                      {section.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customization CTA */}
      <div className="glass-card rounded-3xl p-10 bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Customize Your Dashboard
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Tailor the dashboard to your industry, competitive landscape, and strategic priorities. 
          Add custom metrics and data sources.
        </p>
        <Button variant="outline" size="lg">
          Customize Dashboard
        </Button>
      </div>
    </div>
  );
};

export default IntelligenceDashboardTab;
