import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaybookSidebar } from "@/components/playbook/PlaybookSidebar";
import { UnifiedInsights } from "@/components/playbook/UnifiedInsights";
import { PlaybookChat } from "@/components/playbook/PlaybookChat";
import { UnifiedDashboard } from "@/components/playbook/UnifiedDashboard";
import { TimelineView } from "@/components/playbook/TimelineView";
import { ComparisonTable } from "@/components/playbook/ComparisonTable";
import { PlaybookGrading } from "@/components/playbook/PlaybookGrading";
import { 
  Brain, MessageSquare, BarChart3, Clock, GitCompare, 
  Star, Lightbulb
} from "lucide-react";

const PlaybookPlatform = () => {
  const [activeView, setActiveView] = useState("grades");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Document List */}
      <PlaybookSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Brain className="h-7 w-7 text-primary" />
              AI Playbook Intelligence Platform
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              No-BS analysis of 12 strategy playbooks on Agentic AI
            </p>
          </div>
        </header>

        {/* View Navigation */}
        <div className="border-b bg-card/50 px-6 py-2">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="bg-transparent gap-1">
              <TabsTrigger value="grades" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Playbook Grades
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Role Insights
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex items-center gap-2">
                <GitCompare className="h-4 w-4" />
                Compare
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Ask AI
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeView === "grades" && <PlaybookGrading />}
          {activeView === "insights" && <UnifiedInsights />}
          {activeView === "dashboard" && <UnifiedDashboard />}
          {activeView === "timeline" && <TimelineView />}
          {activeView === "compare" && <ComparisonTable />}
          {activeView === "chat" && <PlaybookChat />}
        </main>
      </div>
    </div>
  );
};

export default PlaybookPlatform;
