import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, LineChart, MessageSquare } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-hero mb-6 hero-fade-in">
            Oxford Intelligence
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 font-light tracking-tight hero-fade-in-delayed">
            The intelligence layer for modern organizations.
          </p>
          <Button
            onClick={() => navigate("/scan")}
            className="button-primary min-w-[240px] button-scale-in"
          >
            Start the Intelligence Scan <span className="arrow-slide">→</span>
          </Button>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-display mb-4">How Oxford Intelligence Works</h2>
            <p className="text-xl text-muted-foreground font-light">
              Think better. Build smarter. Watch the change compound.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center card-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-6 icon-bounce">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Think with Your Tutor</h3>
              <p className="text-muted-foreground leading-relaxed">
                Socratic conversations that sharpen reasoning and deepen your understanding of AI.
              </p>
            </div>
            <div className="text-center card-fade-up-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-6 icon-rotate">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Build in the Lab</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hands-on simulations and guided sprints using your real workflows and documents.
              </p>
            </div>
            <div className="text-center card-fade-up-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-6 icon-shimmer">
                <LineChart className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Track Your Evolution</h3>
              <p className="text-muted-foreground leading-relaxed">
                A live dashboard for your Intelligence Score, skill velocity, and workflow gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-fade-up">
              <FeatureCard
                icon={<Brain className="h-8 w-8" />}
                title="Intelligence Scan"
                description="20-minute diagnostic assessing reasoning, workflow maturity, and AI readiness."
                onClick={() => navigate("/intelligence-scan")}
              />
            </div>
            <div className="card-fade-up-1">
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Cognitive Atoms"
                description="15-second lessons on embeddings, attention, and model mechanics."
                onClick={() => navigate("/atoms")}
              />
            </div>
            <div className="card-fade-up-2">
              <FeatureCard
                icon={<LineChart className="h-8 w-8" />}
                title="Applied Sprints"
                description="Hands-on tasks to automate reports, build assistants, redesign workflows."
                onClick={() => navigate("/sprints")}
              />
            </div>
            <div className="card-fade-up">
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8" />}
                title="Executive Mode"
                description="Judgment frameworks, governance, and strategic AI transformation."
                onClick={() => navigate("/executive")}
              />
            </div>
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
      className="glass-card p-10 rounded-3xl text-left card-hover group"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground/5 mb-6 group-hover:bg-foreground/10 transition-all duration-300 icon-bounce">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </button>
  );
};

export default Home;
