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
  Send, MessageSquare, Bot, User, Loader2, 
  Sparkles, HelpCircle, History, Trash2, Clock
} from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
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

export function PlaybookChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
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

  // Group history by conversation sessions (messages within 30 mins of each other)
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
            date: format(new Date(currentSession[0].created_at), "MMM d, yyyy h:mm a"),
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
        date: format(new Date(currentSession[0].created_at), "MMM d, yyyy h:mm a"),
        messages: currentSession,
      });
    }
    
    return sessions.reverse(); // Most recent first
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
    // Just clear local messages, don't delete from DB
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "Started a new conversation.",
    });
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
        body: { 
          message: text,
          role: "general",
          history: messages.slice(-10),
        },
      });

      if (response.error) {
        throw response.error;
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.data?.response || "I couldn't generate a response. Please try again.",
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

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-220px)]">
      {/* Chat Area */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Ask Questions About the Playbooks
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                History
              </Button>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {showHistory ? (
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Conversation History</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>
                    Back to Chat
                  </Button>
                </div>
                {groupedHistory.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>No conversation history yet.</p>
                    <p className="text-sm">Start asking questions to build your history.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {groupedHistory.map((session, idx) => (
                      <div
                        key={idx}
                        className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => loadSession(session.messages)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{session.date}</span>
                          <Badge variant="outline" className="text-xs">
                            {session.messages.length} messages
                          </Badge>
                        </div>
                        <p className="text-sm line-clamp-2">
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
                          {message.created_at && (
                            <p className={`text-[10px] mt-1 ${
                              message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              {format(new Date(message.created_at), "h:mm a")}
                            </p>
                          )}
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
            </>
          )}
        </CardContent>
      </Card>

      {/* Example Questions */}
      <Card>
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
