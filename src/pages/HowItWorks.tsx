import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Sparkles, X, CheckCircle, ArrowRight, Brain, Zap, Target, TrendingUp } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const HowItWorks = () => {
  const navigate = useNavigate();

  const traditionalProblems = [
    "20-40 hour courses",
    "Completion certificates, not competence",
    "Designed for engineers",
    "No practical application",
    "Boring video lectures",
    "Outdated within months"
  ];

  const fluencyBenefits = [
    "15-second atoms, 10-minute sprints",
    "Measured by decision-making ability",
    "Built for executives and everyday users",
    "Applied skills from day one",
    "Interactive micro-learning",
    "Updated weekly with AI trends"
  ];

  const journeySteps = [
    { icon: Brain, label: "Atom", description: "Learn one concept in 15 seconds" },
    { icon: Zap, label: "Sprint", description: "Apply it in 10 minutes" },
    { icon: Target, label: "Dashboard", description: "Track your impact" },
    { icon: TrendingUp, label: "Fluency", description: "Lead with confidence" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                How It Works
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The difference between traditional AI training and the Fluency AI method
              </p>
            </div>

            {/* Comparison Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              
              {/* LEFT COLUMN - Traditional */}
              <div className="glass-card rounded-3xl p-10 border-2 border-muted/30 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold text-muted-foreground">
                    Traditional AI Training
                  </h2>
                </div>

                <div className="space-y-4 mb-8">
                  {traditionalProblems.map((problem, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{problem}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-6 border-t border-muted/30">
                  <p className="text-6xl mb-3">😞</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Time-consuming, ineffective, disconnected
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN - Fluency AI */}
              <div className="glass-card rounded-3xl p-10 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent animate-fade-in shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    Fluency AI Method
                  </h2>
                </div>

                <div className="space-y-4 mb-8">
                  {fluencyBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 animate-fade-in"
                      style={{ animationDelay: `${index * 50 + 100}ms` }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-6 border-t border-primary/20">
                  <p className="text-6xl mb-3">✨</p>
                  <p className="text-sm font-medium">
                    Fast, practical, always current
                  </p>
                </div>
              </div>
            </div>

            {/* Journey Flow Diagram */}
            <div className="glass-card rounded-3xl p-10 mb-16 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-3xl font-bold text-center mb-10">
                Your Journey to AI Fluency
              </h2>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {journeySteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-4">
                      <div className="text-center flex-1">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{step.label}</h3>
                        <p className="text-sm text-muted-foreground max-w-[140px]">
                          {step.description}
                        </p>
                      </div>
                      
                      {index < journeySteps.length - 1 && (
                        <ArrowRight className="hidden md:block w-8 h-8 text-primary/40 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call to Actions */}
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold mb-8">
                Ready to get started?
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => navigate("/atoms")}
                  size="lg"
                  className="button-primary text-lg px-12 py-7 h-auto rounded-full min-w-[280px]"
                >
                  Start Your First Atom
                </Button>
                
                <Button
                  onClick={() => navigate("/about")}
                  variant="outline"
                  size="lg"
                  className="text-lg px-12 py-7 h-auto rounded-full min-w-[280px]"
                >
                  Watch 2-Minute Demo
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                No credit card required • Start learning in 60 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HowItWorks;
