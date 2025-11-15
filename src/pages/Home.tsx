import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, Target, Users, ArrowRight, CheckCircle } from "lucide-react";
import ExecutiveDashboardPreview from "@/components/ExecutiveDashboardPreview";
import PageTransition from "@/components/PageTransition";
import ListenButton from "@/components/ListenButton";

const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Scan your skills",
      description: "Take a 20-minute AI checkup: reasoning, workflows, readiness.",
      link: "/scan"
    },
    {
      number: "02",
      title: "Learn tiny skills",
      description: "15-second lessons that explain AI simply.",
      link: "/atoms"
    },
    {
      number: "03",
      title: "Apply it",
      description: "Automate tasks, redesign workflows, and build assistants.",
      link: "/sprints"
    }
  ];

  const modules = [
    {
      icon: Brain,
      title: "Intelligence Scan",
      tagline: "Check your AI readiness.",
      description: "A 20-minute diagnostic that shows strengths, gaps, and your AI maturity score.",
      link: "/intelligence-scan",
      audio: "Check your AI readiness. A 20-minute diagnostic that shows strengths, gaps, and your AI maturity score."
    },
    {
      icon: Zap,
      title: "Cognitive Atoms",
      tagline: "Tiny lessons that make AI make sense.",
      description: "Short, fun, clear micro-lessons on how models work, how they think, and how to use them.",
      link: "/atoms",
      audio: "Tiny lessons that make AI make sense. Short, fun, clear micro-lessons on how models work, how they think, and how to use them."
    },
    {
      icon: Target,
      title: "Applied Sprints",
      tagline: "Hands-on skills you can use today.",
      description: "Step-by-step guides to automate reports, build assistants, redesign workflows, and save hours weekly.",
      link: "/sprints",
      audio: "Hands-on skills you can use today. Step-by-step guides to automate reports, build assistants, redesign workflows, and save hours weekly."
    },
    {
      icon: Users,
      title: "Executive Mode",
      tagline: "Strategy, governance, and transformation.",
      description: "Strategy, governance, risk, culture, and AI planning—all explained simply.",
      link: "/executive",
      audio: "Strategy, governance, and transformation. Strategy, governance, risk, culture, and AI planning—all explained simply."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-40 pb-32 px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in tracking-tight leading-tight">
              Lead smarter with AI.
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground mb-16 font-light animate-fade-in max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '100ms' }}>
              Simple tools that help leaders think clearer and move faster.
            </p>
            <Button
              onClick={() => navigate("/intelligence-scan")}
              size="lg"
              className="button-primary animate-fade-in text-lg px-10 py-7 h-auto rounded-full"
              style={{ animationDelay: '200ms' }}
            >
              Start Your Intelligence Scan
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 px-6 bg-muted/10">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl md:text-5xl font-semibold mb-20 leading-tight">
              Everything you need to use AI with confidence.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 text-xl font-light">
                <CheckCircle className="h-7 w-7 text-primary flex-shrink-0" />
                <span>Learn fast</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xl font-light">
                <CheckCircle className="h-7 w-7 text-primary flex-shrink-0" />
                <span>Decide better</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xl font-light">
                <CheckCircle className="h-7 w-7 text-primary flex-shrink-0" />
                <span>Help your team move quicker</span>
              </div>
            </div>
          </div>
        </section>

        {/* Three-Step Journey */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="glass-card p-10 rounded-3xl animate-fade-in hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-6xl font-bold text-primary/15 mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 leading-tight">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => navigate("/about")}
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 h-auto"
              >
                See how it works
              </Button>
            </div>
          </div>
        </section>

        {/* Module Cards */}
        <section className="py-32 px-6 bg-muted/10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.title}
                    onClick={() => navigate(module.link)}
                    className="glass-card p-10 rounded-3xl text-left transition-all hover:shadow-xl hover:scale-[1.02] group animate-fade-in relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <ListenButton text={module.audio} />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-primary mb-2">{module.tagline}</p>
                    <h3 className="text-2xl font-semibold mb-4">{module.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
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
