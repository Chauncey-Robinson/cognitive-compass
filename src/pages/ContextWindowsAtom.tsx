import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, ArrowRight } from "lucide-react";
import ListenButton from "@/components/ListenButton";
import PageTransition from "@/components/PageTransition";
import contextWindowsIcon from "@/assets/atoms/context-windows-icon.png";

const ContextWindowsAtom = () => {
  const navigate = useNavigate();
  const [fillLevel, setFillLevel] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  const contextItems = [
    "Hello, I need help...",
    "My project involves...",
    "The deadline is...",
    "Our team consists of...",
    "Previous experience shows...",
    "The budget for this...",
    "Client requirements are...",
    "Technical specifications...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFillLevel((prev) => {
        if (prev >= 100) {
          // Reset and scroll off old content
          setItems((prevItems) => {
            const newItems = prevItems.slice(1);
            return newItems;
          });
          return 90;
        }
        return prev + 12.5;
      });

      if (fillLevel < 100 && items.length < 8) {
        setItems((prev) => [...prev, contextItems[prev.length]]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [fillLevel, items.length]);

  const explanationText = "A context window is like an AI's short-term memory. It's the amount of text the AI can 'see' at once - typically 4,000 to 128,000 words. Everything you say, and everything it responds with, uses up this space. When it's full, the AI 'forgets' the earliest parts of your conversation.";

  return (
    <PageTransition>
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

          <div className="glass-card rounded-3xl p-8 shadow-xl">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <img 
                src={contextWindowsIcon} 
                alt="" 
                className="w-20 h-20 object-contain opacity-90"
              />
            </div>

            {/* Title and Meta */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  20 seconds
                </span>
                <span>•</span>
                <span>Atom 3 of 50</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">
                What is a Context Window?
              </h1>
              <div className="h-1 w-20 bg-primary rounded-full mb-6" />
              
              <div className="w-full md:w-auto mb-6">
                <ListenButton text={explanationText} />
              </div>
            </div>

            {/* Explanation */}
            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-foreground/90 leading-relaxed text-lg">
                {explanationText}
              </p>
            </div>

            {/* Visual Animation */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Watch it in action:
              </h3>
              <div className="relative bg-muted/30 rounded-2xl border-2 border-border overflow-hidden" style={{ height: '320px' }}>
                {/* Fill indicator */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-primary/10 transition-all duration-700 ease-out"
                  style={{ height: `${fillLevel}%` }}
                />
                
                {/* Content items */}
                <div className="absolute inset-0 p-6 overflow-hidden flex flex-col justify-end gap-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className={`bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border text-sm transition-all duration-500 ${
                        index === 0 && fillLevel >= 100 ? 'opacity-30 -translate-y-2' : 'opacity-100'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Capacity label */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border text-xs font-medium">
                  {fillLevel.toFixed(0)}% full
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Notice how old messages fade away as the window fills up
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Key Takeaway</div>
                  <p className="text-sm text-muted-foreground">
                    AI has limited working memory — it can't remember everything you tell it.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/sprints/optimize-prompts")}
                size="lg"
                className="button-primary flex-1 group"
              >
                See it in action
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate("/atoms")}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                View All Atoms
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContextWindowsAtom;
