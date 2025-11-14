import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

const atomsData = [
  {
    id: 1,
    title: "How Models Really Work",
    description: "Understand the fundamental architecture behind modern AI systems",
    duration: "15s",
    category: "Fundamentals"
  },
  {
    id: 2,
    title: "Understanding Embeddings",
    description: "Learn how AI converts text into mathematical representations",
    duration: "20s",
    category: "Core Concepts"
  },
  {
    id: 3,
    title: "Context Windows Explained",
    description: "Discover why AI can only remember a limited amount of information",
    duration: "15s",
    category: "Core Concepts"
  },
  {
    id: 4,
    title: "Hallucinations & Limitations",
    description: "Why AI sometimes generates plausible but incorrect information",
    duration: "20s",
    category: "Critical Knowledge"
  },
  {
    id: 5,
    title: "Bias in AI Systems",
    description: "How training data shapes model behavior and outputs",
    duration: "15s",
    category: "Critical Knowledge"
  },
  {
    id: 6,
    title: "Attention Mechanism",
    description: "The breakthrough that powers transformer models",
    duration: "20s",
    category: "Architecture"
  },
  {
    id: 7,
    title: "Prediction & Uncertainty",
    description: "How models estimate confidence in their outputs",
    duration: "15s",
    category: "Advanced"
  },
  {
    id: 8,
    title: "Fine-tuning vs Prompting",
    description: "Different approaches to customizing AI behavior",
    duration: "20s",
    category: "Application"
  },
  {
    id: 9,
    title: "Token Economics",
    description: "Why AI pricing is based on tokens, not words",
    duration: "15s",
    category: "Practical"
  },
  {
    id: 10,
    title: "Temperature & Sampling",
    description: "Control creativity and randomness in AI outputs",
    duration: "20s",
    category: "Advanced"
  },
  {
    id: 11,
    title: "RAG Systems",
    description: "Retrieval-Augmented Generation for accurate responses",
    duration: "20s",
    category: "Architecture"
  },
  {
    id: 12,
    title: "Chain of Thought",
    description: "Teaching AI to reason step-by-step",
    duration: "15s",
    category: "Techniques"
  },
  {
    id: 13,
    title: "Model Size Trade-offs",
    description: "Balancing capability, cost, and speed",
    duration: "15s",
    category: "Practical"
  },
  {
    id: 14,
    title: "Zero-shot vs Few-shot",
    description: "Different approaches to teaching AI new tasks",
    duration: "20s",
    category: "Techniques"
  },
  {
    id: 15,
    title: "AI Evaluation Methods",
    description: "How to measure and validate AI performance",
    duration: "20s",
    category: "Advanced"
  },
  {
    id: 16,
    title: "Build Personal Assistant",
    description: "Create a personalized AI assistant tailored to your workflow",
    duration: "20s",
    category: "Application"
  },
  {
    id: 17,
    title: "Create Role-Specific Tool",
    description: "Develop AI tools designed for specific roles in your organization",
    duration: "20s",
    category: "Application"
  },
  {
    id: 18,
    title: "Rewrite SOP",
    description: "Transform traditional SOPs into AI-enhanced workflows",
    duration: "20s",
    category: "Practical"
  }
];

const Atoms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Cognitive Atoms</h1>
          <p className="text-lg text-muted-foreground">
            Ultra-short lessons on AI fundamentals. Each atom takes 15-20 seconds to complete.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {atomsData.map((atom) => (
            <AtomCard key={atom.id} atom={atom} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AtomCard = ({ atom }: { atom: typeof atomsData[0] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {atom.category}
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {atom.duration}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
        {atom.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {atom.description}
      </p>
      
      <Button
        onClick={() => navigate(`/atoms/${atom.id}`)}
        variant="outline"
        size="sm"
        className="w-full"
      >
        Learn
      </Button>
    </div>
  );
};

export default Atoms;
