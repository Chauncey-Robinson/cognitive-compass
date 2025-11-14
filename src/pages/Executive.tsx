import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Scale, Shield, Users, Target, TrendingUp, DollarSign } from "lucide-react";

const Executive = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      icon: <Scale className="h-7 w-7" />,
      title: "Judgment frameworks",
      description: "Decision-making systems for AI adoption",
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: "AI governance and policy",
      description: "Risk management and compliance structures",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Cultural transformation",
      description: "Organizational change management",
    },
    {
      icon: <Target className="h-7 w-7" />,
      title: "Scenario modeling",
      description: "Strategic planning and forecasting",
    },
    {
      icon: <TrendingUp className="h-7 w-7" />,
      title: "Competitive intelligence",
      description: "Market analysis and positioning",
    },
    {
      icon: <DollarSign className="h-7 w-7" />,
      title: "Automation ROI mapping",
      description: "Investment prioritization and impact analysis",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center fade-in">
          <h1 className="text-hero mb-6">
            The AI fluency operating system<br />for leaders.
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-16 font-light">
            Strategic intelligence for executives.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground/5 mb-6">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{capability.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>

          {/* Dashboard Mockup */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-semibold mb-6">CEO Dashboard</h2>
            <div className="aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground text-lg mb-4">Intelligence Metrics</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 px-12">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Intelligence Velocity</p>
                    <p className="text-2xl font-semibold">+47%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Automation Score</p>
                    <p className="text-2xl font-semibold">82/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Team Readiness</p>
                    <p className="text-2xl font-semibold">76%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl text-center mt-16">
          <Button
            onClick={() => navigate("/pricing")}
            className="button-primary"
          >
            Explore Executive Mode →
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Executive;
