import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, Target, Users, ArrowRight, CheckCircle } from "lucide-react";
import ExecutiveDashboardPreview from "@/components/ExecutiveDashboardPreview";
import PageTransition from "@/components/PageTransition";
import ListenButton from "@/components/ListenButton";

const Home = () => {
  const navigate = useNavigate();


  const modules = [
    {
      icon: Brain,
      title: "Intelligence Scan",
      description: "A fast checkup that shows your AI level and what to do next.",
      link: "/intelligence-scan",
      audio: "A fast checkup that shows your AI level and what to do next."
    },
    {
      icon: Zap,
      title: "Cognitive Atoms",
      description: "15-second lessons that explain how AI thinks and works.",
      link: "/atoms",
      audio: "15-second lessons that explain how AI thinks and works."
    },
    {
      icon: Target,
      title: "Applied Sprints",
      description: "Step-by-step guides to automate reports and redesign workflows.",
      link: "/sprints",
      audio: "Step-by-step guides to automate reports and redesign workflows."
    },
    {
      icon: Users,
      title: "Executive Mode",
      description: "Clear explanations of strategy, risk, and planning.",
      link: "/executive",
      audio: "Clear explanations of strategy, risk, and planning."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-56 pb-32 px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in tracking-tight leading-tight">
              Lead smarter with AI.
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground mb-12 font-light animate-fade-in max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '100ms' }}>
              Simple tools. Fast lessons. Real results.
            </p>
            <Button
              onClick={() => navigate("/intelligence-scan")}
              size="lg"
              className="button-primary animate-fade-in text-lg px-10 py-7 h-auto rounded-full mb-6"
              style={{ animationDelay: '200ms' }}
            >
              Start Your Intelligence Scan
            </Button>
            <p className="text-sm text-muted-foreground animate-fade-in font-light" style={{ animationDelay: '300ms' }}>
              For busy people who want AI to feel easy—not confusing.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-6 bg-muted/10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl md:text-5xl font-semibold mb-20 text-center leading-tight">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <div
                className="glass-card p-10 rounded-3xl animate-fade-in hover:shadow-lg transition-all"
                style={{ animationDelay: '0ms' }}
              >
                <div className="text-6xl font-bold text-primary/15 mb-6">
                  01
                </div>
                <h3 className="text-2xl font-semibold mb-4 leading-tight">Check your skills</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Take a quick 20-minute AI checkup. See your strengths, weak spots, and what to learn next.
                </p>
              </div>
              <div
                className="glass-card p-10 rounded-3xl animate-fade-in hover:shadow-lg transition-all"
                style={{ animationDelay: '100ms' }}
              >
                <div className="text-6xl font-bold text-primary/15 mb-6">
                  02
                </div>
                <h3 className="text-2xl font-semibold mb-4 leading-tight">Learn tiny lessons</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Watch 15-second micro-lessons that explain AI in plain English.
                </p>
              </div>
              <div
                className="glass-card p-10 rounded-3xl animate-fade-in hover:shadow-lg transition-all"
                style={{ animationDelay: '200ms' }}
              >
                <div className="text-6xl font-bold text-primary/15 mb-6">
                  03
                </div>
                <h3 className="text-2xl font-semibold mb-4 leading-tight">Use it at work</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Follow step-by-step guides to automate tasks and fix workflows.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button
                onClick={() => navigate("/about")}
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 h-auto rounded-full"
              >
                See how it works
              </Button>
            </div>
          </div>
        </section>


        {/* Module Cards */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.title}
                    onClick={() => navigate(module.link)}
                    className="glass-card p-10 rounded-3xl text-left transition-all hover:shadow-xl hover:scale-[1.02] group animate-fade-in relative"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <ListenButton text={module.audio} label="Listen" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-semibold mb-4 leading-tight">{module.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <ExecutiveDashboardPreview />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-border/50 bg-muted/5">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Oxford Intelligence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built to help leaders think clearly in the age of AI.
                </p>
              </div>

              {/* Email Sign-up */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Stay Updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button size="sm" className="button-primary">
                    Sign Up
                  </Button>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-8">
                <div>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </button>
                </div>
                <div>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                © 2024 Oxford Intelligence. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Home;
