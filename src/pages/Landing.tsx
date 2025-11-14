import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, LineChart, MessageSquare } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-foreground">
              Oxford Intelligence
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              An AI-native cognitive operating system for organizations. Diagnose intelligence gaps, 
              build AI fluency, and unlock organizational potential.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate("/signup")}
              >
                Start Intelligence Scan
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-secondary/30">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-primary" />}
              title="Intelligence Scan"
              description="20-minute diagnostic assessing AI understanding, reasoning, and workflow maturity"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="Cognitive Atoms"
              description="Ultra-short lessons on embeddings, context windows, and model mechanics"
            />
            <FeatureCard
              icon={<LineChart className="h-8 w-8 text-primary" />}
              title="Applied Sprints"
              description="Hands-on tasks: automate reports, build assistants, classify messages"
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              title="AI Tutor"
              description="Socratic questioning and concept correction with executive framing"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-foreground">
            Build Your Intelligence Graph
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Discover your strengths, identify gaps, and get a personalized learning path 
            tailored to your role and organizational needs.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/signup")}
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
