import { Button } from "@/components/ui/button";
import { CheckCircle, Newspaper, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OverviewTab = () => {
  const navigate = useNavigate();

  const outcomes = [
    "Make informed AI investment decisions with confidence",
    "Evaluate vendors and solutions using proven frameworks",
    "Lead organizational AI transformation effectively",
    "Navigate governance, risk, and compliance requirements",
    "Build and scale high-performing AI teams"
  ];

  const differences = [
    {
      traditional: "40-hour MBA modules",
      fluency: "15-minute decision frameworks"
    },
    {
      traditional: "Theory-focused lectures",
      fluency: "Interactive tools you use today"
    },
    {
      traditional: "Generic business cases",
      fluency: "Your actual decisions"
    },
    {
      traditional: "Outdated within 6 months",
      fluency: "Updated weekly"
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="glass-card rounded-3xl p-8 cursor-pointer hover:shadow-lg transition-all duration-300 card-hover"
          onClick={() => navigate("/executive/brief")}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Executive Brief</h3>
              <p className="text-muted-foreground mb-4">
                AI news curated and summarized for leaders. Updated daily.
              </p>
              <Button variant="outline" size="sm">
                View This Week's Brief →
              </Button>
            </div>
          </div>
        </div>
        
        <div 
          className="glass-card rounded-3xl p-8 cursor-pointer hover:shadow-lg transition-all duration-300 card-hover"
          onClick={() => navigate("/executive/dashboard")}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Intelligence Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Track competitive moves, ROI, and industry risks at a glance.
              </p>
              <Button variant="outline" size="sm">
                Open Dashboard →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="glass-card rounded-3xl p-10">
        <h2 className="text-3xl font-bold mb-6">
          AI Fluency for the C-Suite
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          The Executive AI Fluency track is designed specifically for leaders who need to make 
          strategic decisions about AI—without becoming technical experts. In just minutes per day, 
          you'll gain the frameworks, tools, and confidence to lead your organization through AI 
          transformation.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          No coding. No math. Just clear thinking and practical tools that translate directly to 
          better decisions.
        </p>
      </div>

      {/* What You'll Learn */}
      <div className="glass-card rounded-3xl p-10">
        <h2 className="text-3xl font-bold mb-8">
          What You'll Learn
        </h2>
        <div className="space-y-4">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-lg">{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It's Different */}
      <div className="glass-card rounded-3xl p-10">
        <h2 className="text-3xl font-bold mb-8">
          How It's Different
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traditional */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-muted-foreground mb-4">
              Traditional Executive Education
            </h3>
            {differences.map((diff, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-muted/30 bg-muted/10"
              >
                <p className="text-muted-foreground">{diff.traditional}</p>
              </div>
            ))}
          </div>

          {/* Fluency AI */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Executive AI Fluency
            </h3>
            {differences.map((diff, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5"
              >
                <p className="font-medium">{diff.fluency}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get Started CTA */}
      <div className="text-center">
        <Button
          onClick={() => navigate("/executive/dashboard")}
          size="lg"
          className="button-primary text-lg px-12 py-7 h-auto rounded-full"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default OverviewTab;
