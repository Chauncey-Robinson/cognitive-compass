import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, LineChart, MessageSquare } from "lucide-react";
import ListenButton from "@/components/ListenButton";
import heroIllustration from "@/assets/hero-intelligence-layer.png";
import tutorIllustration from "@/assets/tutor-thinking.png";
import labIllustration from "@/assets/lab-building.png";
import evolutionIllustration from "@/assets/evolution-tracking.png";
import scanBg from "@/assets/intelligence-scan-illustration.png";
import atomsBg from "@/assets/cognitive-atoms-illustration.png";
import sprintsBg from "@/assets/applied-sprints-illustration.png";
import executiveBg from "@/assets/executive-mode-illustration.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <img 
            src={heroIllustration} 
            alt="" 
            className="w-full max-w-5xl object-contain"
          />
        </div>
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-hero mb-6">
            Lead smarter with AI.
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-4 font-light tracking-tight">
            Clear tools. Simple lessons. Real impact.
          </p>
          <p className="text-lg text-muted-foreground mb-12 font-light">
            Built for busy leaders who need AI to make sense—fast.
          </p>
          <Button
            onClick={() => navigate("/scan")}
            className="button-primary min-w-[240px]"
          >
            Start the Intelligence Scan <span>→</span>
          </Button>
        </div>
      </section>


      {/* What We Do */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-display mb-12">Everything you need to use AI with confidence.</h2>
          <div className="space-y-4 text-xl md:text-2xl font-light text-foreground">
            <p>Learn fast.</p>
            <p>Decide better.</p>
            <p>Help your team move quicker.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FeatureCard
                icon={<Brain className="h-8 w-8" />}
                title="Intelligence Scan"
                tagline="A quick checkup to see how ready you and your team are for AI."
                description="A 20-minute diagnostic that shows strengths, gaps, and your AI maturity score."
                onClick={() => navigate("/intelligence-scan")}
                bgImage={scanBg}
              />
            </div>
            <div>
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Cognitive Atoms"
                tagline="15-second lessons that explain AI in the simplest possible way."
                description="Short, fun, clear micro-lessons on how models work, how they think, and how to use them."
                onClick={() => navigate("/atoms")}
                bgImage={atomsBg}
              />
            </div>
            <div>
              <FeatureCard
                icon={<LineChart className="h-8 w-8" />}
                title="Applied Sprints"
                tagline="Hands-on tasks that help you automate work and build real tools."
                description="Step-by-step guides to automate reports, build assistants, redesign workflows, and save hours weekly."
                onClick={() => navigate("/sprints")}
                bgImage={sprintsBg}
              />
            </div>
            <div>
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8" />}
                title="Executive Mode"
                tagline="Clear frameworks for making smart, safe, strategic AI decisions."
                description="Strategy, governance, risk, culture, and AI planning—all explained simply."
                onClick={() => navigate("/executive")}
                bgImage={executiveBg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-display mb-12">
            Ready to lead smarter?
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
      <footer className="border-t border-border/50 py-16 px-6 bg-secondary/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full border-2 border-foreground/20 flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="text-lg font-semibold">Oxford Intelligence</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Built to help leaders think clearly in the age of AI.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Stay updated</h3>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm"
                />
                <Button className="button-primary">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Oxford Intelligence. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  tagline,
  description,
  onClick,
  bgImage,
}: {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  onClick: () => void;
  bgImage?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className="glass-card p-10 rounded-3xl text-left group relative overflow-hidden"
    >
      {bgImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <img src={bgImage} alt="" className="w-full h-full object-contain" />
        </div>
      )}
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground/5 mb-6 group-hover:bg-foreground/10 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-sm font-medium text-foreground mb-3 leading-relaxed">{tagline}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
        <div 
          onClick={(e) => e.stopPropagation()}
          className="flex justify-start"
        >
          <ListenButton text={`${tagline} ${description}`} />
        </div>
      </div>
    </button>
  );
};

export default Home;
