import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { 
  Send, Bot, User, Loader2, History, Trash2, Clock, ChevronDown
} from "lucide-react";
import { format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

const EXAMPLE_QUESTIONS = [
  "What do all firms agree on about agentic AI?",
  "What are the biggest risks mentioned?",
  "What ROI timelines are suggested?",
  "What governance frameworks are recommended?",
];

export function PlaybookChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch conversation history
  const { data: historyData, refetch: refetchHistory } = useQuery({
    queryKey: ["playbook-chat-history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("playbook_chat_messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(100);
      
      if (error) throw error;
      return data;
    },
  });

  // Group history by conversation sessions
  const groupedHistory = historyData ? groupBySession(historyData) : [];

  function groupBySession(messages: any[]) {
    if (!messages.length) return [];
    
    const sessions: { date: string; messages: any[] }[] = [];
    let currentSession: any[] = [];
    let lastTime: Date | null = null;
    
    messages.forEach((msg) => {
      const msgTime = new Date(msg.created_at);
      
      if (lastTime && (msgTime.getTime() - lastTime.getTime()) > 30 * 60 * 1000) {
        if (currentSession.length) {
          sessions.push({
            date: format(new Date(currentSession[0].created_at), "MMM d, h:mm a"),
            messages: currentSession,
          });
        }
        currentSession = [msg];
      } else {
        currentSession.push(msg);
      }
      lastTime = msgTime;
    });
    
    if (currentSession.length) {
      sessions.push({
        date: format(new Date(currentSession[0].created_at), "MMM d, h:mm a"),
        messages: currentSession,
      });
    }
    
    return sessions.reverse();
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadSession = (sessionMessages: any[]) => {
    const formattedMessages: Message[] = sessionMessages.map(msg => ({
      id: msg.id,
      role: msg.role as "user" | "assistant",
      content: msg.content,
      created_at: msg.created_at,
    }));
    setMessages(formattedMessages);
    setShowHistory(false);
  };

  const clearHistory = async () => {
    setMessages([]);
    toast({ title: "Chat Cleared", description: "Started a new conversation." });
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke("playbook-chat", {
        body: { message: text, role: "general", history: messages.slice(-10) },
      });

      if (response.error) throw response.error;

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.data?.response || "I couldn't generate a response.",
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      await supabase.from("playbook_chat_messages").insert([
        { role: "user", content: text, context_role: "general" },
        { role: "assistant", content: assistantMessage.content, context_role: "general" },
      ]);
      
      refetchHistory();
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: error.message?.includes("429") ? "Rate Limit" : "Error",
        description: error.message?.includes("429") 
          ? "Please wait before sending another message."
          : "Failed to get a response.",
        variant: "destructive",
      });
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <h2 className="text-primary-focus">Ask AI</h2>
        <p className="text-meta">
          Query insights across all 12 Expert Positions.
        </p>
      </div>

      {/* Chat Area */}
      <Card className="border-0 shadow-sm bg-background">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-foreground/80">Conversation</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="text-xs text-muted-foreground"
              >
                <History className="h-3.5 w-3.5 mr-1" />
                History
              </Button>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-xs text-muted-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {showHistory ? (
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground/80">History</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)} className="text-xs">
                    Back
                  </Button>
                </div>
                {groupedHistory.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <History className="h-8 w-8 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No history yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {groupedHistory.map((session, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border/50"
                        onClick={() => loadSession(session.messages)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{session.date}</span>
                          <Badge variant="outline" className="text-[10px] border-border/50">
                            {session.messages.length} msgs
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80 line-clamp-1">
                          {session.messages.find(m => m.role === "user")?.content || "No messages"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          ) : (
            <>
              <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Bot className="h-10 w-10 text-muted-foreground/20 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Ask a question to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                            <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-3 ${
                            message.role === "user"
                              ? "bg-foreground text-background"
                              : "bg-muted/30 border border-border/50"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                          <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center shrink-0">
                            <User className="h-3.5 w-3.5 text-background" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                          <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="bg-muted/30 border border-border/50 rounded-lg px-4 py-3">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about agentic AI strategies..."
                    className="flex-1 bg-muted/20 border-border/50"
                    disabled={isLoading}
                  />
                  <Button onClick={() => sendMessage()} disabled={isLoading || !input.trim()} size="icon">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Example Questions - Collapsed */}
      <Collapsible open={showExamples} onOpenChange={setShowExamples}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center">
          <ChevronDown className={`h-4 w-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
          Example questions
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-2 gap-2">
            {EXAMPLE_QUESTIONS.map((question, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto py-2 px-3 text-xs text-muted-foreground hover:text-foreground border-border/50"
                onClick={() => sendMessage(question)}
                disabled={isLoading}
              >
                {question}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}