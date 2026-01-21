import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlaybookSidebar } from "@/components/playbook/PlaybookSidebar";
import { UnifiedInsights } from "@/components/playbook/UnifiedInsights";
import { PlaybookChat } from "@/components/playbook/PlaybookChat";
import { UnifiedDashboard } from "@/components/playbook/UnifiedDashboard";
import { TimelineView } from "@/components/playbook/TimelineView";
import { ComparisonTable } from "@/components/playbook/ComparisonTable";
import { PlaybookGrading } from "@/components/playbook/PlaybookGrading";
import { ContradictionFinder } from "@/components/playbook/ContradictionFinder";
import { RuthlessModeProvider, useRuthlessMode } from "@/contexts/RuthlessMode";
import { 
  MessageSquare, BarChart3, Clock, GitCompare, 
  Star, Lightbulb, AlertTriangle, Zap
} from "lucide-react";

function PlaybookPlatformContent() {
  const [activeView, setActiveView] = useState("grades");
  const { isRuthless, toggleRuthless } = useRuthlessMode();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Document List */}
      {!isRuthless && <PlaybookSidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header - Minimal, one primary focus */}
        <header className="border-b border-border/50 bg-background px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary-focus">
                What the Experts Say
              </h1>
              {!isRuthless && (
                <p className="text-meta mt-1">
                  12 perspectives from leading firms
                </p>
              )}
            </div>
            
            {/* Ruthless Mode Toggle */}
            <div className="flex items-center gap-3">
              <Label htmlFor="ruthless-mode" className="text-meta flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Ruthless Mode
              </Label>
              <Switch
                id="ruthless-mode"
                checked={isRuthless}
                onCheckedChange={toggleRuthless}
              />
            </div>
          </div>
        </header>

        {/* View Navigation - Muted, secondary */}
        <div className="border-b border-border/30 bg-background px-8 py-3">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="bg-transparent gap-2 h-auto p-0">
              <TabsTrigger 
                value="grades" 
                className="flex items-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md"
              >
                <Star className="h-4 w-4" />
                {!isRuthless && "Quality"}
              </TabsTrigger>
              <TabsTrigger 
                value="contradictions" 
                className="flex items-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md"
              >
                <AlertTriangle className="h-4 w-4" />
                {!isRuthless && "Disagreements"}
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="flex items-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md"
              >
                <Lightbulb className="h-4 w-4" />
                {!isRuthless && "Takeaways"}
              </TabsTrigger>
              {!isRuthless && (
                <>
                  <TabsTrigger 
                    value="dashboard" 
                    className="flex items-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="timeline" 
                    className="flex items-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md"
                  >
                    <Clock className="h-4 w-4" />
                    History
                  </TabsTrigger>
                  <TabsTrigger 
                    value="compare" 
                    className="flex items-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md"
                  >
                    <GitCompare className="h-4 w-4" />
                    Side by Side
                  </TabsTrigger>
                  <TabsTrigger 
                    value="chat" 
                    className="flex items-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Ask
                  </TabsTrigger>
                </>
              )}
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content - Generous whitespace */}
        <main className="flex-1 overflow-auto px-8 py-8 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            {activeView === "grades" && <PlaybookGrading />}
            {activeView === "insights" && <UnifiedInsights />}
            {activeView === "dashboard" && !isRuthless && <UnifiedDashboard />}
            {activeView === "timeline" && !isRuthless && <TimelineView />}
            {activeView === "compare" && !isRuthless && <ComparisonTable />}
            {activeView === "contradictions" && <ContradictionFinder />}
            {activeView === "chat" && !isRuthless && <PlaybookChat />}
          </div>
        </main>
      </div>
    </div>
  );
}

const PlaybookPlatform = () => {
  return (
    <RuthlessModeProvider>
      <PlaybookPlatformContent />
    </RuthlessModeProvider>
  );
};

export default PlaybookPlatform;
