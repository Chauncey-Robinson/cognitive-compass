import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

const atoms = [
  { title: "Models", description: "How AI systems learn from data" },
  { title: "Tokens", description: "The fundamental units of text processing" },
  { title: "Context windows", description: "Memory limits in AI conversations" },
  { title: "Embeddings", description: "Mathematical representations of meaning" },
  { title: "Bias", description: "How training data shapes outputs" },
  { title: "Attention", description: "The mechanism behind transformers" },
  { title: "Evaluation", description: "Measuring AI performance" },
  { title: "Compression", description: "Efficient information encoding" },
  { title: "Prediction", description: "How models generate responses" },
  { title: "Fine-tuning", description: "Customizing models for specific tasks" },
  { title: "Temperature", description: "Controlling output randomness" },
  { title: "Hallucination", description: "When AI generates false information" },
];

const CognitiveAtoms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center fade-in">
          <h1 className="text-hero mb-6">
            Understand AI in 15 seconds.
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-16 font-light">
            Ultra-short lessons on what actually matters.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {atoms.map((atom, index) => (
              <button
                key={index}
                onClick={() => navigate(`/atoms/${index + 1}`)}
                className="glass-card p-8 rounded-2xl text-left hover:scale-[1.02] transition-all duration-300 group fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{atom.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    15s
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {atom.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl text-center mt-16">
          <Button
            onClick={() => navigate("/atoms/1")}
            className="button-primary"
          >
            Explore Atoms →
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CognitiveAtoms;
