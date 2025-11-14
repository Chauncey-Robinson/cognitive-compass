import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Tutor = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Tutor. I use Socratic questioning to help you develop deeper understanding. What would you like to explore today?"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response with Socratic questioning
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiResponse = generateSocraticResponse(input);
    setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
  };

  const generateSocraticResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("embedding") || lowerInput.includes("vector")) {
      return "Interesting question about embeddings. Let me guide you: What do you think happens to the meaning of a word when we convert it into numbers? And why might words with similar meanings end up with similar numbers?";
    } else if (lowerInput.includes("hallucination") || lowerInput.includes("wrong")) {
      return "Good observation about AI accuracy. Consider this: If an AI model has never seen information about a specific topic, what do you think it does when asked about it? Does it admit ignorance, or try to generate something plausible?";
    } else if (lowerInput.includes("bias") || lowerInput.includes("fair")) {
      return "This is a crucial topic. Let's think through it: Where does an AI model learn its patterns from? If the training data reflects certain societal biases, what might happen to the model's outputs?";
    } else if (lowerInput.includes("automate") || lowerInput.includes("workflow")) {
      return "Great question about automation. Before we dive in, help me understand: What parts of your current workflow are most repetitive? And what decisions in that workflow require human judgment versus pattern recognition?";
    } else {
      return "That's a thought-provoking question. Let me ask you this: What's your current understanding of this concept? And what specific aspect confuses you most? Understanding your starting point helps me guide you better.";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="mx-auto max-w-4xl h-full flex flex-col">
          <div className="px-6 py-8 border-b border-border">
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Tutor</h1>
            <p className="text-muted-foreground">
              Socratic questioning and concept correction
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="rounded-full bg-primary/10 p-2 h-fit">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="rounded-full bg-secondary p-2 h-fit">
                    <User className="h-5 w-5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-border p-6">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask a question..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
