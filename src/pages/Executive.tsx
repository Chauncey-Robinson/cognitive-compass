import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ExecutiveModeSection from "@/components/ExecutiveModeSection";

const Executive = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center mb-16">
          <h1 className="text-hero mb-6">
            The AI fluency operating system<br />for leaders.
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 font-light">
            Strategic intelligence for executives.
          </p>
        </div>

        <ExecutiveModeSection />

        <div className="mx-auto max-w-7xl mt-24">
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
