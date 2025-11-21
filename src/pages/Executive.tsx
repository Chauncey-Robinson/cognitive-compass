import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import OverviewTab from "@/components/executive/OverviewTab";
import DecisionFrameworksTab from "@/components/executive/DecisionFrameworksTab";
import IntelligenceDashboardTab from "@/components/executive/IntelligenceDashboardTab";
import GovernanceBasicsTab from "@/components/executive/GovernanceBasicsTab";
import OrganizationalReadinessTab from "@/components/executive/OrganizationalReadinessTab";

const Executive = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                Executive AI Fluency
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Lead with confidence in the AI era
              </p>
            </div>

            {/* Visual Element */}
            <div className="flex justify-center mb-12 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="glass-card rounded-3xl p-8 max-w-3xl w-full">
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-sm text-muted-foreground">Strategy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <p className="text-sm text-muted-foreground">Decisions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🛡️</div>
                    <p className="text-sm text-muted-foreground">Governance</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">👥</div>
                    <p className="text-sm text-muted-foreground">Leadership</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NAVIGATION TABS */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-muted/30 p-2 rounded-2xl mb-8 h-auto">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="frameworks" 
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  Decision Frameworks
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard" 
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  Intelligence Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="governance" 
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  Governance Basics
                </TabsTrigger>
                <TabsTrigger 
                  value="readiness" 
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  Organizational Readiness
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="frameworks" className="mt-8">
                <DecisionFrameworksTab />
              </TabsContent>

              <TabsContent value="dashboard" className="mt-8">
                <IntelligenceDashboardTab />
              </TabsContent>

              <TabsContent value="governance" className="mt-8">
                <GovernanceBasicsTab />
              </TabsContent>

              <TabsContent value="readiness" className="mt-8">
                <OrganizationalReadinessTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Executive;
