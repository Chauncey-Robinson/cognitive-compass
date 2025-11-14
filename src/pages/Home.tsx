import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, LineChart, MessageSquare, Play } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center fade-in">
          <h1 className="text-hero mb-6">
            Oxford Intelligence
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 font-light tracking-tight">
            The intelligence layer for modern organizations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/scan")}
              className="button-primary min-w-[240px]"
            >
              Start the Intelligence Scan →
            </Button>
            <button className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors">
              <Play className="h-5 w-5" />
              <span className="text-lg">Watch 2-min demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 border-y border-border/50">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm text-muted-foreground mb-8 tracking-wide uppercase">
            Trusted by executives at
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40">
            <span className="text-2xl font-semibold">Oracle</span>
            <span className="text-2xl font-semibold">JPMorgan</span>
            <span className="text-2xl font-semibold">PwC</span>
            <span className="text-2xl font-semibold">Mastercard</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-6">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Meet Your Tutor</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI Socratic guide that upgrades thinking.
              </p>
            </div>
            <div className="text-center fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-6">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Enter the Lab</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hands-on simulations and workflow redesigns.
              </p>
            </div>
            <div className="text-center fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-6">
                <LineChart className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Watch Yourself Evolve</h3>
              <p className="text-muted-foreground leading-relaxed">
                Intelligence score, skill velocity, decision tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Intelligence Scan"
              description="20-minute diagnostic assessing reasoning, workflow maturity, and AI readiness."
              onClick={() => navigate("/intelligence-scan")}
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Cognitive Atoms"
              description="15-second lessons on embeddings, attention, and model mechanics."
              onClick={() => navigate("/atoms")}
            />
            <FeatureCard
              icon={<LineChart className="h-8 w-8" />}
              title="Applied Sprints"
              description="Hands-on tasks to automate reports, build assistants, redesign workflows."
              onClick={() => navigate("/sprints")}
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="Executive Mode"
              description="Judgment frameworks, governance, and strategic AI transformation."
              onClick={() => navigate("/executive")}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-display mb-12">
            Upgrade your organization's intelligence.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/scan")}
              className="button-primary min-w-[280px]"
            >
              Start the Intelligence Scan →
            </Button>
          </div>
          <button
            onClick={() => navigate("/pricing")}
            className="mt-6 text-foreground hover:text-muted-foreground transition-colors text-lg"
          >
            Contact Sales →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-foreground/20" />
              <span className="text-sm font-semibold">Oxford Intelligence</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Oxford Intelligence. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="glass-card p-10 rounded-3xl text-left hover:scale-[1.02] transition-all duration-300 group"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground/5 mb-6 group-hover:bg-foreground/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </button>
  );
};

export default Home;
