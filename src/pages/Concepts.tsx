import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const Concepts = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Micro-Concepts
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              This module is being built. Check back soon.
            </p>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              className="button-primary"
            >
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Concepts;
