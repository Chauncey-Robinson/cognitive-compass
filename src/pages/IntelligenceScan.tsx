import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Workflow, Gauge, TrendingUp, Users, BarChart } from "lucide-react";

const IntelligenceScan = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      icon: <Brain className="h-6 w-6" />,
      label: "Reasoning assessment",
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      label: "Workflow mapping",
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      label: "Automation readiness",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: "Skill gap analysis",
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: "Leadership fluency",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      label: "Organizational Intelligence Score (AIS)",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center fade-in">
          <h1 className="text-hero mb-6">
            Start with clarity.
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-16 font-light">
            The fastest way to measure AI readiness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-start gap-4 text-left fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center">
                  {capability.icon}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-lg text-foreground">{capability.label}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => navigate("/scan")}
            className="button-primary min-w-[240px]"
          >
            Begin Scan →
          </Button>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-32 px-6 bg-secondary/20">
        <div className="mx-auto max-w-6xl">
          <div className="glass-card p-12 rounded-3xl">
            <div className="aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-2xl flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Intelligence Scan Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-display mb-6">
            Know where you stand.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            Get a comprehensive view of your organization's AI capabilities, 
            identify critical gaps, and receive a personalized roadmap 
            for transformation.
          </p>
          <Button
            onClick={() => navigate("/scan")}
            className="button-primary"
          >
            Start Your Scan →
          </Button>
        </div>
      </section>
    </div>
  );
};

export default IntelligenceScan;
