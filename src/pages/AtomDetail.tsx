import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import modelsIcon from "@/assets/atoms/models-icon.png";
import tokensIcon from "@/assets/atoms/tokens-icon.png";
import contextWindowsIcon from "@/assets/atoms/context-windows-icon.png";
import embeddingsIcon from "@/assets/atoms/embeddings-icon.png";
import biasIcon from "@/assets/atoms/bias-icon.png";
import attentionIcon from "@/assets/atoms/attention-icon.png";
import evaluationIcon from "@/assets/atoms/evaluation-icon.png";
import compressionIcon from "@/assets/atoms/compression-icon.png";
import predictionIcon from "@/assets/atoms/prediction-icon.png";
import fineTuningIcon from "@/assets/atoms/fine-tuning-icon.png";
import temperatureIcon from "@/assets/atoms/temperature-icon.png";
import hallucinationIcon from "@/assets/atoms/hallucination-icon.png";

const atomIcons: Record<string, string> = {
  "1": modelsIcon,
  "2": embeddingsIcon,
  "3": contextWindowsIcon,
  "4": hallucinationIcon,
  "5": biasIcon,
  "6": attentionIcon,
  "7": predictionIcon,
  "8": fineTuningIcon,
  "9": tokensIcon,
  "10": temperatureIcon,
  "15": evaluationIcon,
};

const atomContent: Record<string, { title: string; content: string; keyTakeaway: string }> = {
  "1": {
    title: "How Models Really Work",
    content: "Modern AI models are massive pattern-matching systems trained on billions of text examples. They learn statistical relationships between words and concepts, then use those patterns to predict the most likely next words in a sequence. Think of it like an extremely sophisticated autocomplete that understands context, grammar, and meaning — not through rules, but through exposure to vast amounts of human language.",
    keyTakeaway: "AI doesn't 'understand' like humans — it recognizes patterns from training data."
  },
  "2": {
    title: "Understanding Embeddings",
    content: "Embeddings convert words into numerical vectors (lists of numbers) that capture meaning. Words with similar meanings get similar numbers. For example, 'king' and 'queen' would have vectors close together in mathematical space, while 'king' and 'bicycle' would be far apart. This lets models do math with meaning — enabling them to understand relationships, analogies, and context.",
    keyTakeaway: "Embeddings turn language into math, making AI possible."
  },
  "3": {
    title: "Context Windows Explained",
    content: "A context window is the maximum amount of text an AI can 'see' at once — typically measured in tokens (roughly 4 characters per token). If you exceed this limit, the model forgets earlier parts of the conversation. Current models range from 4,000 to 200,000+ tokens. This is why long documents sometimes lose coherence: the model literally can't remember what it read 50 pages ago.",
    keyTakeaway: "AI has limited working memory — it can't remember everything you tell it."
  },
  "16": {
    title: "Build Personal Assistant",
    content: "Learn how to create a personalized AI assistant tailored to your specific needs and workflow. This atom guides you through understanding your requirements, selecting the right tools, and configuring an assistant that amplifies your productivity.",
    keyTakeaway: "Personal AI assistants can be customized to match your unique working style."
  },
  "17": {
    title: "Create Role-Specific Tool",
    content: "Discover how to develop AI tools designed for specific roles within your organization. From sales automation to HR workflows, learn the principles of building focused solutions that address particular job functions effectively.",
    keyTakeaway: "Role-specific AI tools deliver higher ROI than generic solutions."
  },
  "18": {
    title: "Rewrite SOP",
    content: "Master the art of transforming traditional Standard Operating Procedures into AI-enhanced workflows. Learn how to identify automation opportunities, redesign processes for AI integration, and maintain compliance while increasing efficiency.",
    keyTakeaway: "Modern SOPs should be designed with AI capabilities in mind."
  }
};

const AtomDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const atom = id ? atomContent[id] : null;

  if (!atom) {
    return <div>Atom not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/atoms")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Atoms
        </Button>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          {atomIcons[id] && (
            <div className="mb-6 flex justify-center">
              <img 
                src={atomIcons[id]} 
                alt="" 
                className="w-20 h-20 object-contain opacity-90"
              />
            </div>
          )}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-card-foreground mb-4">
              {atom.title}
            </h1>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-foreground leading-relaxed">
              {atom.content}
            </p>
          </div>

          <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-card-foreground mb-1">Key Takeaway</div>
                <p className="text-sm text-muted-foreground">{atom.keyTakeaway}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => navigate("/atoms")}
              variant="outline"
              className="flex-1"
            >
              View All Atoms
            </Button>
            <Button
              onClick={() => {
                const nextId = Number(id) + 1;
                if (atomContent[nextId.toString()]) {
                  navigate(`/atoms/${nextId}`);
                } else {
                  navigate("/atoms");
                }
              }}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Next Atom
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomDetail;
