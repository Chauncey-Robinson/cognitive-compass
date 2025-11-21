import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Circle, Clock, Search } from "lucide-react";
import PageTransition from "@/components/PageTransition";

type DifficultyLevel = "Foundational" | "Intermediate" | "Advanced";
type CompletionStatus = "not-started" | "completed";

interface Atom {
  id: number;
  title: string;
  emoji: string;
  preview: string;
  duration: string;
  difficulty: DifficultyLevel;
  completed: boolean;
  route: string;
}

const atoms: Atom[] = [
  {
    id: 1,
    title: "Models",
    emoji: "🧠",
    preview: "What AI models actually are",
    duration: "20 sec",
    difficulty: "Foundational",
    completed: true,
    route: "/atoms/1"
  },
  {
    id: 2,
    title: "Tokens",
    emoji: "🔤",
    preview: "How AI 'reads' text",
    duration: "20 sec",
    difficulty: "Foundational",
    completed: true,
    route: "/atoms/9"
  },
  {
    id: 3,
    title: "Context Windows",
    emoji: "📏",
    preview: "AI's short-term memory limit",
    duration: "20 sec",
    difficulty: "Foundational",
    completed: true,
    route: "/atoms/context-windows"
  },
  {
    id: 4,
    title: "Embeddings",
    emoji: "🎯",
    preview: "How AI understands meaning",
    duration: "20 sec",
    difficulty: "Intermediate",
    completed: true,
    route: "/atoms/2"
  },
  {
    id: 5,
    title: "Attention",
    emoji: "👀",
    preview: "How AI knows what matters",
    duration: "20 sec",
    difficulty: "Intermediate",
    completed: false,
    route: "/atoms/6"
  },
  {
    id: 6,
    title: "Prediction",
    emoji: "🎲",
    preview: "How AI generates responses",
    duration: "20 sec",
    difficulty: "Intermediate",
    completed: false,
    route: "/atoms/7"
  },
  {
    id: 7,
    title: "Compression",
    emoji: "🗜️",
    preview: "How AI stores knowledge",
    duration: "20 sec",
    difficulty: "Advanced",
    completed: false,
    route: "/atoms/11"
  },
  {
    id: 8,
    title: "Bias",
    emoji: "⚖️",
    preview: "Why AI has opinions",
    duration: "20 sec",
    difficulty: "Foundational",
    completed: true,
    route: "/atoms/5"
  },
  {
    id: 9,
    title: "Hallucinations",
    emoji: "🌫️",
    preview: "When AI makes things up",
    duration: "20 sec",
    difficulty: "Foundational",
    completed: false,
    route: "/atoms/4"
  },
  {
    id: 10,
    title: "Fine-tuning",
    emoji: "🎨",
    preview: "Customizing AI for your needs",
    duration: "20 sec",
    difficulty: "Advanced",
    completed: false,
    route: "/atoms/8"
  },
  {
    id: 11,
    title: "Prompting",
    emoji: "💬",
    preview: "Talking to AI effectively",
    duration: "20 sec",
    difficulty: "Foundational",
    completed: true,
    route: "/atoms/12"
  },
  {
    id: 12,
    title: "RAG (Retrieval)",
    emoji: "📚",
    preview: "Giving AI access to your data",
    duration: "20 sec",
    difficulty: "Advanced",
    completed: false,
    route: "/atoms/11"
  }
];

const Concepts = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter atoms based on selections
  const filteredAtoms = atoms.filter(atom => {
    const matchesDifficulty = selectedDifficulty === "All" || atom.difficulty === selectedDifficulty;
    const matchesStatus = 
      selectedStatus === "All" ||
      (selectedStatus === "Completed" && atom.completed) ||
      (selectedStatus === "Not Started" && !atom.completed);
    const matchesSearch = 
      atom.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atom.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDifficulty && matchesStatus && matchesSearch;
  });

  // Calculate progress
  const foundationalAtoms = atoms.filter(a => a.difficulty === "Foundational");
  const completedFoundational = foundationalAtoms.filter(a => a.completed).length;
  const totalCompleted = atoms.filter(a => a.completed).length;

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "Foundational":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                  <div className="relative text-8xl">🧬</div>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                AI Concepts, Decoded
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                15-second explanations that actually make sense
              </p>
            </div>

            {/* Progress Bar */}
            <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold mb-1">
                    You've completed {completedFoundational} of {foundationalAtoms.length} foundational atoms
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {totalCompleted} of {atoms.length} total concepts mastered
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {Math.round((totalCompleted / atoms.length) * 100)}% Complete
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
                  placeholder="Search concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <div className="flex gap-2">
                  {["All", "Foundational", "Intermediate", "Advanced"].map((difficulty) => (
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
                <div className="w-px bg-border" />
                <div className="flex gap-2">
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

            {/* ATOMS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAtoms.map((atom, index) => (
                <button
                  key={atom.id}
                  onClick={() => navigate(atom.route)}
                  className="glass-card rounded-3xl p-6 text-left transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group animate-fade-in relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Completion Indicator */}
                  <div className="absolute top-4 right-4">
                    {atom.completed ? (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground/30" />
                    )}
                  </div>

                  {/* Emoji Icon */}
                  <div className="text-5xl mb-4">{atom.emoji}</div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2">{atom.title}</h3>

                  {/* Preview */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {atom.preview}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {atom.duration}
                    </Badge>
                    <Badge className={getDifficultyColor(atom.difficulty)}>
                      {atom.difficulty}
                    </Badge>
                  </div>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm text-primary font-medium">
                      Learn more →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Empty State */}
            {filteredAtoms.length === 0 && (
              <div className="text-center py-20 animate-fade-in">
                <p className="text-2xl text-muted-foreground mb-4">No atoms found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
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

export default Concepts;
