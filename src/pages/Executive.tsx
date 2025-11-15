import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ExecutiveModeSection from "@/components/ExecutiveModeSection";
import ExecutiveDashboardPreview from "@/components/ExecutiveDashboardPreview";

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
          <ExecutiveDashboardPreview />
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
