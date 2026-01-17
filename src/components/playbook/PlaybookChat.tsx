import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, MessageSquare, Bot, User, Loader2, 
  Sparkles, HelpCircle 
} from "lucide-react";
import type { RoleType } from "@/pages/PlaybookPlatform";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface PlaybookChatProps {
  role: RoleType;
}

const EXAMPLE_QUESTIONS = [
  "What do all firms agree on about agentic AI?",
  "How is consulting firms' approach different from tech companies?",
  "What are the biggest risks mentioned across all playbooks?",
  "Which industries should prioritize agentic AI according to these reports?",
  "What implementation patterns do McKinsey, BCG, and Bain recommend?",
  "What ROI timelines are suggested for agentic AI implementations?",
  "How do the playbooks define 'agentic AI'?",
  "What governance frameworks are recommended?",
];

export function PlaybookChat({ role }: PlaybookChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke("playbook-chat", {
        body: { 
          message: text,
          role: role,
          history: messages.slice(-10), // Last 10 messages for context
        },
      });

      if (response.error) {
        throw response.error;
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.data?.response || "I couldn't generate a response. Please try again.",
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save to database
      await supabase.from("playbook_chat_messages").insert([
        { role: "user", content: text, context_role: role },
        { role: "assistant", content: assistantMessage.content, context_role: role },
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);
      
      if (error.message?.includes("429") || error.status === 429) {
        toast({
          title: "Rate Limit Reached",
          description: "Please wait a moment before sending another message.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to get a response. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const roleColors = {
    CEO: "border-blue-500/30 bg-blue-500/5",
    CTO: "border-green-500/30 bg-green-500/5",
    MBA: "border-purple-500/30 bg-purple-500/5",
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-220px)]">
      {/* Chat Area */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Ask Questions About the Playbooks
            <Badge variant="outline" className="ml-2">{role} Context</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Bot className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  Start a Conversation
                </h3>
                <p className="text-sm text-muted-foreground/70 max-w-md mt-2">
                  Ask questions about the 12 strategy playbooks. The AI will synthesize 
                  insights from all documents to provide comprehensive answers.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-xl px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about agentic AI strategies across all playbooks..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Questions */}
      <Card className={`border ${roleColors[role]}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Example Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {EXAMPLE_QUESTIONS.map((question, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-primary/5"
                onClick={() => sendMessage(question)}
                disabled={isLoading}
              >
                <Sparkles className="h-3 w-3 mr-2 shrink-0 text-primary" />
                <span className="line-clamp-2">{question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
