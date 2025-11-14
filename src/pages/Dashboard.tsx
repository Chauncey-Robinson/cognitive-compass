import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, MessageSquare, BarChart3, LogOut, BookOpen } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Oxford Intelligence</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground">Continue your intelligence journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            label="Intelligence Score"
            value="75%"
            trend="+5%"
          />
          <StatCard
            label="Atoms Completed"
            value="8/15"
            trend="53%"
          />
          <StatCard
            label="Sprints Finished"
            value="2/5"
            trend="40%"
          />
          <StatCard
            label="Reasoning Quality"
            value="Good"
            trend="Improving"
          />
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NavigationCard
            icon={<Brain className="h-8 w-8" />}
            title="Cognitive Atoms"
            description="Learn AI fundamentals in 15-20 second lessons"
            buttonText="Browse Atoms"
            onClick={() => navigate("/atoms")}
          />
          <NavigationCard
            icon={<Zap className="h-8 w-8" />}
            title="Applied Sprints"
            description="Hands-on tasks to build real AI capabilities"
            buttonText="Start Sprint"
            onClick={() => navigate("/sprints")}
          />
          <NavigationCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="AI Tutor"
            description="Get Socratic guidance and concept correction"
            buttonText="Open Tutor"
            onClick={() => navigate("/tutor")}
          />
          <NavigationCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Intelligence Graph"
            description="View your complete cognitive profile"
            buttonText="View Graph"
            onClick={() => navigate("/results")}
          />
          <NavigationCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Retake Scan"
            description="Assess your progress with a new scan"
            buttonText="Start Scan"
            onClick={() => navigate("/scan")}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ 
  label, 
  value, 
  trend 
}: { 
  label: string; 
  value: string; 
  trend: string;
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className="text-2xl font-bold text-card-foreground mb-1">{value}</div>
      <div className="text-xs text-primary">{trend}</div>
    </div>
  );
};

const NavigationCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  buttonText: string; 
  onClick: () => void;
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col">
      <div className="rounded-lg bg-primary/10 p-3 w-fit text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 flex-1">{description}</p>
      <Button
        onClick={onClick}
        variant="outline"
        className="w-full"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default Dashboard;
