import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const questions = [
  {
    id: 1,
    type: "conceptual",
    question: "What is the primary function of an embedding in AI models?",
    options: [
      "To compress data for storage",
      "To convert text into numerical representations",
      "To encrypt sensitive information",
      "To speed up model training"
    ]
  },
  {
    id: 2,
    type: "conceptual",
    question: "How would you explain a 'context window' to a non-technical colleague?",
    options: [
      "The time it takes for an AI to respond",
      "The amount of information the AI can consider at once",
      "The screen size needed to use AI tools",
      "The memory capacity of the server"
    ]
  },
  {
    id: 3,
    type: "workflow",
    question: "Your team spends 5 hours weekly on a repetitive report. What's your first step to automate it?",
    options: [
      "Buy expensive automation software",
      "Map the current workflow and identify patterns",
      "Hire a data scientist",
      "Continue doing it manually until a perfect solution exists"
    ]
  },
  {
    id: 4,
    type: "conceptual",
    question: "What is a hallucination in AI?",
    options: [
      "When the model generates plausible but incorrect information",
      "A visual error in image generation",
      "A security vulnerability",
      "When the model runs too slowly"
    ]
  },
  {
    id: 5,
    type: "reasoning",
    question: "You notice an AI assistant giving inconsistent answers. What's the most likely cause?",
    options: [
      "The model is broken and needs replacement",
      "Different prompts or contexts are leading to different responses",
      "The internet connection is unstable",
      "The AI is learning and evolving in real-time"
    ]
  },
  {
    id: 6,
    type: "workflow",
    question: "Which task in your role could most benefit from AI assistance?",
    options: [
      "Strategic decision-making requiring human judgment",
      "Drafting routine communications",
      "Building relationships with clients",
      "Creative brainstorming sessions"
    ]
  },
  {
    id: 7,
    type: "conceptual",
    question: "What does 'attention mechanism' mean in transformers?",
    options: [
      "The model's ability to focus on relevant parts of the input",
      "A feature that alerts you to important notifications",
      "The speed at which the model processes data",
      "A security feature that monitors user activity"
    ]
  },
  {
    id: 8,
    type: "reasoning",
    question: "A colleague says AI will replace all jobs. Your response?",
    options: [
      "Agree completely - humans will be obsolete",
      "AI augments human capabilities; the question is how we adapt",
      "Dismiss AI as overhyped technology",
      "Ignore the concern entirely"
    ]
  },
  {
    id: 9,
    type: "workflow",
    question: "How do you currently validate information from AI assistants?",
    options: [
      "I don't - I trust the output completely",
      "Cross-reference with reliable sources and use judgment",
      "I never use AI assistants",
      "I ask the AI if it's correct"
    ]
  },
  {
    id: 10,
    type: "conceptual",
    question: "What is bias in AI models?",
    options: [
      "When models favor certain political views",
      "Systematic patterns in output reflecting training data imbalances",
      "Personal preferences of the developers",
      "Intentional manipulation by companies"
    ]
  },
  {
    id: 11,
    type: "reasoning_exercise",
    question: "Describe a recent decision you made at work. What information did you use, and what was your reasoning process?",
    isOpenEnded: true
  },
  {
    id: 12,
    type: "workflow",
    question: "Your organization wants to adopt AI. What's the most critical first step?",
    options: [
      "Buy the most expensive AI tools available",
      "Assess current workflows and identify high-impact use cases",
      "Send everyone to a general AI training",
      "Wait for competitors to adopt AI first"
    ]
  }
];

const Scan = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate and store results
      const score = calculateScore();
      localStorage.setItem("scanResults", JSON.stringify({ score, answers }));
      navigate("/results");
    }
  };

  const calculateScore = () => {
    const correctAnswers = {
      1: "To convert text into numerical representations",
      2: "The amount of information the AI can consider at once",
      3: "Map the current workflow and identify patterns",
      4: "When the model generates plausible but incorrect information",
      5: "Different prompts or contexts are leading to different responses",
      6: "Drafting routine communications",
      7: "The model's ability to focus on relevant parts of the input",
      8: "AI augments human capabilities; the question is how we adapt",
      9: "Cross-reference with reliable sources and use judgment",
      10: "Systematic patterns in output reflecting training data imbalances",
      12: "Assess current workflows and identify high-impact use cases"
    };

    let score = 0;
    Object.entries(answers).forEach(([id, answer]) => {
      if (correctAnswers[Number(id)] === answer) {
        score += 1;
      }
    });

    return Math.round((score / Object.keys(correctAnswers).length) * 100);
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const canProceed = answers[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {question.type.replace("_", " ").toUpperCase()}
          </div>
          
          <h1 className="mb-8 text-2xl font-bold text-card-foreground">
            {question.question}
          </h1>

          {question.isOpenEnded ? (
            <Textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Share your thinking process..."
              className="min-h-[200px]"
            />
          ) : (
            <RadioGroup
              value={answers[question.id]}
              onValueChange={handleAnswer}
            >
              <div className="space-y-3">
                {question.options?.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 rounded-lg border-2 p-4 transition-all ${
                      answers[question.id] === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} className="mt-0.5" />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-sm leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-primary hover:bg-primary/90"
            >
              {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
