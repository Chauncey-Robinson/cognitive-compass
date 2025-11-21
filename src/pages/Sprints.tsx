import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Circle, Clock, Users, Search, FileText, Mail, Bot, FileCheck, Tags, TrendingUp } from "lucide-react";
import PageTransition from "@/components/PageTransition";

type Category = "Productivity" | "Communication" | "Strategy";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface Sprint {
  id: string;
  title: string;
  category: Category;
  duration: string;
  difficulty: Difficulty;
  preview: string;
  tools: string[];
  completed: boolean;
  completedBy: number;
  route: string;
}

const sprints: Sprint[] = [
  // Productivity Automation
  {
    id: "report-sprint",
    title: "Automate Your Weekly Report",
    category: "Productivity",
    duration: "12 min",
    difficulty: "Beginner",
    preview: "Turn a manual report into a one-click automation",
    tools: ["ChatGPT", "Google Sheets"],
    completed: true,
    completedBy: 247,
    route: "/sprints/report-sprint"
  },
  {
    id: "assistant-sprint",
    title: "Build a Personal AI Assistant",
    category: "Productivity",
    duration: "15 min",
    difficulty: "Intermediate",
    preview: "Create a custom GPT that knows your preferences",
    tools: ["ChatGPT", "Custom Instructions"],
    completed: false,
    completedBy: 189,
    route: "/sprints/assistant-sprint"
  },
  {
    id: "sop-sprint",
    title: "Rewrite Your SOPs with AI",
    category: "Productivity",
    duration: "10 min",
    difficulty: "Beginner",
    preview: "Update outdated processes in minutes, not days",
    tools: ["Claude", "Google Docs"],
    completed: true,
    completedBy: 312,
    route: "/sprints/sop-sprint"
  },
  // Communication Skills
  {
    id: "email-sprint",
    title: "Rewrite Customer Emails for Clarity",
    category: "Communication",
    duration: "8 min",
    difficulty: "Beginner",
    preview: "Transform jargon into clear communication",
    tools: ["ChatGPT"],
    completed: false,
    completedBy: 421,
    route: "/sprints/2"
  },
  {
    id: "briefing-sprint",
    title: "Create Executive Briefing Templates",
    category: "Communication",
    duration: "12 min",
    difficulty: "Intermediate",
    preview: "AI-powered one-pagers that leaders actually read",
    tools: ["Claude", "Notion"],
    completed: false,
    completedBy: 156,
    route: "/sprints/4"
  },
  // Strategic Analysis
  {
    id: "competitive-sprint",
    title: "Competitive Intelligence Dashboard",
    category: "Strategy",
    duration: "15 min",
    difficulty: "Advanced",
    preview: "Automate competitor monitoring with AI",
    tools: ["Perplexity", "Google Sheets"],
    completed: false,
    completedBy: 98,
    route: "/sprints/5"
  }
];

const Sprints = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter sprints
  const filteredSprints = sprints.filter(sprint => {
    const matchesCategory = selectedCategory === "All" || sprint.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || sprint.difficulty === selectedDifficulty;
    const matchesStatus = 
      selectedStatus === "All" ||
      (selectedStatus === "Completed" && sprint.completed) ||
      (selectedStatus === "Not Started" && !sprint.completed);
    const matchesSearch = 
      sprint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sprint.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesStatus && matchesSearch;
  });

  // Calculate progress
  const completedSprints = sprints.filter(s => s.completed).length;
  const totalSprints = sprints.length;

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case "Productivity":
        return FileText;
      case "Communication":
        return Mail;
      case "Strategy":
        return TrendingUp;
    }
  };

  // Group sprints by category
  const sprintsByCategory = {
    Productivity: filteredSprints.filter(s => s.category === "Productivity"),
    Communication: filteredSprints.filter(s => s.category === "Communication"),
    Strategy: filteredSprints.filter(s => s.category === "Strategy")
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                10-Minute Skills That Ship
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Stop learning about AI. Start using it.
              </p>
              <Button
                onClick={() => navigate(sprints[0].route)}
                size="lg"
                className="button-primary text-lg px-12 py-7 h-auto rounded-full"
              >
                Start Your First Sprint
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold mb-1">
                    {completedSprints} of {totalSprints} sprints completed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Keep going! Each sprint builds real skills.
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {Math.round((completedSprints / totalSprints) * 100)}% Complete
                </Badge>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search sprints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <div className="flex gap-2">
                  <span className="text-sm font-medium self-center text-muted-foreground">Category:</span>
                  {["All", "Productivity", "Communication", "Strategy"].map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className={selectedCategory === category ? "button-primary" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <div className="w-px bg-border hidden sm:block" />
                <div className="flex gap-2">
                  <span className="text-sm font-medium self-center text-muted-foreground">Difficulty:</span>
                  {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                    <Button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      className={selectedDifficulty === difficulty ? "button-primary" : ""}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
                <div className="w-px bg-border hidden sm:block" />
                <div className="flex gap-2">
                  <span className="text-sm font-medium self-center text-muted-foreground">Status:</span>
                  {["All", "Completed", "Not Started"].map((status) => (
                    <Button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      className={selectedStatus === status ? "button-primary" : ""}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* SPRINTS BY CATEGORY */}
            {selectedCategory === "All" ? (
              // Show all categories
              Object.entries(sprintsByCategory).map(([category, categorySprints], catIndex) => {
                if (categorySprints.length === 0) return null;
                const CategoryIcon = getCategoryIcon(category as Category);
                
                return (
                  <div key={category} className="mb-12 animate-fade-in" style={{ animationDelay: `${catIndex * 100}ms` }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold">{category} Automation</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySprints.map((sprint, index) => (
                        <SprintCard 
                          key={sprint.id} 
                          sprint={sprint} 
                          getDifficultyColor={getDifficultyColor}
                          navigate={navigate}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              // Show filtered category
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSprints.map((sprint, index) => (
                  <SprintCard 
                    key={sprint.id} 
                    sprint={sprint} 
                    getDifficultyColor={getDifficultyColor}
                    navigate={navigate}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredSprints.length === 0 && (
              <div className="text-center py-20 animate-fade-in">
                <p className="text-2xl text-muted-foreground mb-4">No sprints found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSelectedStatus("All");
                    setSearchQuery("");
                  }}
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// Sprint Card Component
const SprintCard = ({ 
  sprint, 
  getDifficultyColor, 
  navigate,
  index 
}: { 
  sprint: Sprint; 
  getDifficultyColor: (difficulty: Difficulty) => string;
  navigate: (route: string) => void;
  index: number;
}) => {
  return (
    <button
      onClick={() => navigate(sprint.route)}
      className="glass-card rounded-3xl p-6 text-left transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group animate-fade-in relative"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Completion Indicator */}
      <div className="absolute top-4 right-4">
        {sprint.completed ? (
          <CheckCircle className="w-6 h-6 text-primary" />
        ) : (
          <Circle className="w-6 h-6 text-muted-foreground/30" />
        )}
      </div>

      {/* Category Tag */}
      <Badge variant="secondary" className="mb-4">
        {sprint.category}
      </Badge>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 pr-8">{sprint.title}</h3>

      {/* Preview */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {sprint.preview}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap gap-1 mb-4">
        {sprint.tools.map((tool) => (
          <span key={tool} className="text-xs bg-muted px-2 py-1 rounded">
            {tool}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {sprint.duration}
        </Badge>
        <Badge className={getDifficultyColor(sprint.difficulty)}>
          {sprint.difficulty}
        </Badge>
      </div>

      {/* Completion Count */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <Users className="w-3 h-3" />
        <span>✓ {sprint.completedBy} completed</span>
      </div>

      {/* Start Button */}
      <Button className="w-full button-primary">
        Start Sprint
      </Button>
    </button>
  );
};

export default Sprints;
