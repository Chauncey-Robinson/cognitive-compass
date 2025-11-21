import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, Target } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

const OptimizePromptsSprint = () => {
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(1);
  const [exercise1Input, setExercise1Input] = useState("");
  const [exercise2Answer, setExercise2Answer] = useState("");
  const [exercise3Input, setExercise3Input] = useState("");
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const longPrompt = "I'm working on a project where I need to analyze customer feedback from our e-commerce platform. We have thousands of reviews and I want to understand what people are saying about our shipping times, product quality, customer service responsiveness, website usability, and pricing. Can you help me figure out the main themes and also tell me which areas need the most improvement based on sentiment analysis? Also, if possible, I'd like some suggestions on how to improve each area. Oh, and can you also format everything in a nice report that I can share with my team?";

  const handleExercise1Submit = () => {
    if (!exercise1Input.trim()) {
      toast.error("Please rewrite the prompt first");
      return;
    }
    
    const wordCount = exercise1Input.trim().split(/\s+/).length;
    const originalWordCount = longPrompt.trim().split(/\s+/).length;
    
    if (wordCount < originalWordCount * 0.6) {
      toast.success("Great! You made it more concise and focused.");
      setCompletedExercises(prev => [...prev, 1]);
      setCurrentExercise(2);
    } else {
      toast.error("Try to make it even shorter while keeping the core request");
    }
  };

  const handleExercise2Submit = () => {
    if (!exercise2Answer) {
      toast.error("Please select an answer");
      return;
    }
    
    if (exercise2Answer === "b") {
      toast.success("Correct! Background stories waste valuable context space.");
      setCompletedExercises(prev => [...prev, 2]);
      setCurrentExercise(3);
    } else {
      toast.error("Not quite. Think about which parts the AI actually needs.");
    }
  };

  const handleExercise3Submit = () => {
    if (!exercise3Input.trim()) {
      toast.error("Please create your prompt template first");
      return;
    }
    
    if (exercise3Input.length > 50) {
      toast.success("Excellent! You've created a reusable prompt template.");
      setCompletedExercises(prev => [...prev, 3]);
      setShowCompletion(true);
    } else {
      toast.error("Add more detail to make it a useful template");
    }
  };

  const handleComplete = () => {
    toast.success("Sprint completed! Moving to next atom...");
    setTimeout(() => {
      navigate("/atoms/4");
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/atoms/context-windows")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Atoms
          </Button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 minutes
              </span>
              <span>•</span>
              <span>Sprint</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Optimize Your Prompts for Context
            </h1>
            
            <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
              <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-1">Objective</div>
                <p className="text-sm text-muted-foreground">
                  Learn to write prompts that use context windows efficiently
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 flex gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`h-2 flex-1 rounded-full transition-all ${
                  completedExercises.includes(num)
                    ? "bg-primary"
                    : currentExercise === num
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Exercise 1 */}
          {currentExercise === 1 && (
            <div className="glass-card rounded-3xl p-8 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Exercise 1 of 3</h2>
                <h3 className="text-xl font-medium text-primary mb-4">
                  Rewrite this long prompt to be more concise
                </h3>
                
                <div className="bg-muted/30 rounded-xl p-4 mb-4 border border-border">
                  <p className="text-sm text-muted-foreground italic">
                    {longPrompt}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Hint:</strong> Focus on the core request. Remove unnecessary details and combine related items.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Improved Prompt
                </label>
                <Textarea
                  value={exercise1Input}
                  onChange={(e) => setExercise1Input(e.target.value)}
                  placeholder="Rewrite the prompt here..."
                  className="min-h-[120px]"
                />
                <div className="text-xs text-muted-foreground mt-2">
                  Word count: {exercise1Input.trim().split(/\s+/).filter(w => w).length} (Original: {longPrompt.trim().split(/\s+/).length})
                </div>
              </div>

              <Button
                onClick={handleExercise1Submit}
                disabled={!exercise1Input.trim()}
                className="w-full button-primary"
                size="lg"
              >
                Submit & Continue
              </Button>
            </div>
          )}

          {/* Exercise 2 */}
          {currentExercise === 2 && (
            <div className="glass-card rounded-3xl p-8 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Exercise 2 of 3</h2>
                <h3 className="text-xl font-medium text-primary mb-4">
                  Identify what context is being wasted here
                </h3>
                
                <div className="bg-muted/30 rounded-xl p-4 mb-6 border border-border">
                  <p className="text-sm text-muted-foreground">
                    "I've been working in marketing for 15 years and have seen many campaigns. 
                    Last year we tried something similar but it didn't work out great. Anyway, 
                    I need help creating a social media post about our new product launch. 
                    The product is a smart water bottle that tracks hydration."
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium mb-3">Which part wastes context space?</p>
                
                {[
                  { id: "a", text: "The mention of the smart water bottle features" },
                  { id: "b", text: "The personal background story and last year's campaign" },
                  { id: "c", text: "The request for a social media post" },
                  { id: "d", text: "All parts are necessary" }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setExercise2Answer(option.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      exercise2Answer === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
                    {option.text}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleExercise2Submit}
                disabled={!exercise2Answer}
                className="w-full button-primary"
                size="lg"
              >
                Submit & Continue
              </Button>
            </div>
          )}

          {/* Exercise 3 */}
          {currentExercise === 3 && (
            <div className="glass-card rounded-3xl p-8 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Exercise 3 of 3</h2>
                <h3 className="text-xl font-medium text-primary mb-4">
                  Create a prompt template for your weekly task
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  Think of a task you do weekly. Create a reusable prompt template that's 
                  concise but includes all necessary context.
                </p>

                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary mb-4">
                  <p className="text-sm">
                    <strong>Example:</strong> "Summarize this week's sales data into 3 key insights 
                    with action items. Format: Bullet points, max 100 words."
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Prompt Template
                </label>
                <Textarea
                  value={exercise3Input}
                  onChange={(e) => setExercise3Input(e.target.value)}
                  placeholder="Create your reusable prompt template here..."
                  className="min-h-[120px]"
                />
              </div>

              <Button
                onClick={handleExercise3Submit}
                disabled={!exercise3Input.trim()}
                className="w-full button-primary"
                size="lg"
              >
                Submit & Complete
              </Button>
            </div>
          )}

          {/* Completion */}
          {showCompletion && (
            <div className="glass-card rounded-3xl p-8 space-y-6 animate-fade-in text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-3">Sprint Complete!</h2>
                <p className="text-muted-foreground text-lg">
                  You've mastered the art of efficient prompt writing. 
                  You now know how to maximize your context window usage.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={handleComplete}
                  className="button-primary flex-1"
                  size="lg"
                >
                  Continue to Next Atom
                </Button>
                <Button
                  onClick={() => navigate("/atoms")}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Back to Atoms
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default OptimizePromptsSprint;
