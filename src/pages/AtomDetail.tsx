import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import ListenButton from "@/components/ListenButton";
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
  "11": compressionIcon,
  "12": predictionIcon,
  "13": modelsIcon,
  "14": tokensIcon,
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
  "4": {
    title: "Hallucinations & Limitations",
    content: "AI hallucinations occur when models generate plausible-sounding but incorrect or fabricated information. This happens because models predict what words should come next based on patterns, not facts. They don't know when they don't know something. Always verify critical information, especially dates, statistics, and technical details. Hallucinations are more common when models are asked about obscure topics or recent events outside their training data.",
    keyTakeaway: "AI confidently generates false information — always verify critical facts."
  },
  "5": {
    title: "Bias in AI Systems",
    content: "AI models learn biases present in their training data. If historical data reflects societal biases around gender, race, or culture, the model will reproduce and sometimes amplify those biases. This affects hiring tools, loan applications, content moderation, and more. Understanding this limitation is crucial for responsible AI deployment. Mitigation requires diverse training data, careful evaluation, and human oversight in high-stakes decisions.",
    keyTakeaway: "AI inherits and amplifies biases from its training data."
  },
  "6": {
    title: "Attention Mechanism",
    content: "The attention mechanism is the breakthrough that powers modern AI. It lets models focus on relevant parts of the input when generating each word. For example, when translating 'The cat sat on the mat' to French, the model pays attention to 'cat' when deciding the gender of pronouns. This selective focus enables models to handle long sequences and maintain context better than older approaches.",
    keyTakeaway: "Attention lets AI focus on what matters, enabling context understanding."
  },
  "7": {
    title: "Prediction & Uncertainty",
    content: "AI models don't just predict the next word — they estimate probabilities for thousands of possibilities. Each prediction comes with a confidence score. Higher uncertainty often signals the model is guessing. Some systems expose these probabilities, letting you gauge reliability. Understanding prediction uncertainty helps you know when to trust AI outputs and when to seek human verification.",
    keyTakeaway: "AI predictions come with confidence scores — higher uncertainty means less trust."
  },
  "8": {
    title: "Fine-tuning vs Prompting",
    content: "Fine-tuning means retraining a model on specific data to specialize its behavior — expensive but powerful. Prompting means giving the model instructions in natural language — cheap and flexible but less consistent. For most business tasks, smart prompting is enough. Fine-tuning makes sense for highly specialized domains, regulated industries, or when you need maximum consistency across thousands of similar tasks.",
    keyTakeaway: "Prompting is fast and cheap; fine-tuning is powerful but expensive."
  },
  "9": {
    title: "Token Economics",
    content: "AI pricing is based on tokens, not words. A token is roughly 4 characters or ¾ of a word in English. Both input (what you send) and output (what the model generates) count. Longer prompts and responses cost more. This is why concise prompts and limiting output length matter for cost control. Understanding token economics helps you optimize AI spending without sacrificing quality.",
    keyTakeaway: "AI costs are measured in tokens — shorter prompts save money."
  },
  "10": {
    title: "Temperature & Sampling",
    content: "Temperature controls AI creativity and randomness. Low temperature (0.0-0.3) makes outputs focused and deterministic — good for factual tasks. High temperature (0.7-1.0) increases variety and creativity — good for brainstorming. At temperature 0, the model always picks the most likely next word. At 1.0, it samples from the full probability distribution. Adjusting temperature is one of the simplest ways to tune AI behavior.",
    keyTakeaway: "Temperature controls creativity: low for facts, high for ideas."
  },
  "11": {
    title: "RAG Systems",
    content: "Retrieval-Augmented Generation (RAG) combines AI models with external knowledge sources. Instead of relying solely on training data, RAG systems first search a database or documents for relevant information, then use that context to generate responses. This dramatically reduces hallucinations and keeps information current. RAG is the standard approach for building AI systems that need accurate, up-to-date, or company-specific knowledge.",
    keyTakeaway: "RAG combines search with generation for accurate, current responses."
  },
  "12": {
    title: "Chain of Thought",
    content: "Chain of Thought prompting asks AI to show its reasoning steps before giving an answer. Instead of jumping to conclusions, the model thinks through the problem step-by-step. This dramatically improves performance on complex reasoning, math, and logic tasks. Simply adding 'Let's think step by step' to your prompt can boost accuracy by 20-50% on difficult problems.",
    keyTakeaway: "Asking AI to show its work improves reasoning and accuracy."
  },
  "13": {
    title: "Model Size Trade-offs",
    content: "Larger models are smarter but slower and more expensive. Small models (7B parameters) are fast and cheap but struggle with complex tasks. Large models (70B+ parameters) handle nuance and reasoning but cost 10-50x more per token. The best practice: use small models for simple, high-volume tasks (classification, extraction) and large models for complex reasoning and writing. Match model size to task difficulty.",
    keyTakeaway: "Bigger isn't always better — match model size to task complexity."
  },
  "14": {
    title: "Zero-shot vs Few-shot",
    content: "Zero-shot means asking AI to perform a task with no examples — just instructions. Few-shot means giving 2-5 examples before asking. Few-shot dramatically improves consistency and accuracy for specialized tasks. For example, if extracting data from invoices, showing the model 3 examples of correct extractions yields better results than detailed instructions alone. Few-shot learning is your best tool for improving output quality without fine-tuning.",
    keyTakeaway: "Showing examples (few-shot) beats instructions alone (zero-shot)."
  },
  "15": {
    title: "AI Evaluation Methods",
    content: "Evaluating AI is harder than it seems. For factual tasks, you can compare outputs to ground truth. For creative tasks, human evaluation is often necessary. Common metrics include accuracy, precision, recall, and F1 score. For text generation, BLEU and ROUGE measure similarity to reference texts. The best evaluation combines automated metrics with regular human review. Always test on data the model hasn't seen during training.",
    keyTakeaway: "AI evaluation requires both automated metrics and human judgment."
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

  const lessonText = atom.content;

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
            <div className="h-1 w-20 bg-primary rounded-full mb-4" />
            <div className="w-full md:w-auto">
              <ListenButton text={lessonText} />
            </div>
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
