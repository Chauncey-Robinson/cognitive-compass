import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaybookSidebar } from "@/components/playbook/PlaybookSidebar";
import { RoleInsights } from "@/components/playbook/RoleInsights";
import { PlaybookChat } from "@/components/playbook/PlaybookChat";
import { AnalysisDashboard } from "@/components/playbook/AnalysisDashboard";
import { TimelineView } from "@/components/playbook/TimelineView";
import { ComparisonTable } from "@/components/playbook/ComparisonTable";
import { PlaybookGrading } from "@/components/playbook/PlaybookGrading";
import { PersonaDeepDive } from "@/components/playbook/PersonaDeepDive";
import { 
  Brain, MessageSquare, BarChart3, Clock, GitCompare, 
  Star, User, AlertTriangle 
} from "lucide-react";

export type RoleType = "CEO" | "CTO" | "MBA";

const PlaybookPlatform = () => {
  const [activeRole, setActiveRole] = useState<RoleType>("CEO");
  const [activeView, setActiveView] = useState("grades");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Document List */}
      <PlaybookSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Brain className="h-7 w-7 text-primary" />
                AI Playbook Intelligence Platform
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                No-BS analysis of 12 strategy playbooks on Agentic AI
              </p>
            </div>
            
            {/* Role Tabs */}
            <Tabs value={activeRole} onValueChange={(v) => setActiveRole(v as RoleType)}>
              <TabsList className="bg-muted">
                <TabsTrigger value="CEO" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  CEO View
                </TabsTrigger>
                <TabsTrigger value="CTO" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  CTO View
                </TabsTrigger>
                <TabsTrigger value="MBA" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  MBA Student
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
              <TabsTrigger value="persona" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                What You Need
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Key Insights
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
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
          {activeView === "persona" && <PersonaDeepDive />}
          {activeView === "insights" && <RoleInsights role={activeRole} />}
          {activeView === "dashboard" && <AnalysisDashboard role={activeRole} />}
          {activeView === "timeline" && <TimelineView />}
          {activeView === "compare" && <ComparisonTable />}
          {activeView === "chat" && <PlaybookChat role={activeRole} />}
        </main>
      </div>
    </div>
  );
};

export default PlaybookPlatform;
