import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Mail, Bot, FileCheck, Tags } from "lucide-react";

const sprintsData = [
  {
    id: 1,
    title: "Automate a Weekly Report",
    description: "Learn to transform raw data into a structured weekly report using AI",
    icon: FileText,
    difficulty: "Beginner",
    duration: "10 min"
  },
  {
    id: 2,
    title: "Rewrite Customer Emails",
    description: "Practice improving tone, clarity, and professionalism in communications",
    icon: Mail,
    difficulty: "Beginner",
    duration: "8 min"
  },
  {
    id: 3,
    title: "Build a Simple Assistant",
    description: "Create a domain-specific AI assistant for your team",
    icon: Bot,
    difficulty: "Intermediate",
    duration: "15 min"
  },
  {
    id: 4,
    title: "Summarize Meeting Notes",
    description: "Extract key decisions and action items from meeting transcripts",
    icon: FileCheck,
    difficulty: "Beginner",
    duration: "7 min"
  },
  {
    id: 5,
    title: "Classify Customer Messages",
    description: "Build a system to categorize and route support requests",
    icon: Tags,
    difficulty: "Intermediate",
    duration: "12 min"
  }
];

const Sprints = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Applied Sprints</h1>
          <p className="text-lg text-muted-foreground">
            Hands-on mini-tasks to build practical AI capabilities
          </p>
        </div>

        <div className="space-y-6">
          {sprintsData.map((sprint) => (
            <SprintCard key={sprint.id} sprint={sprint} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SprintCard = ({ sprint }: { sprint: typeof sprintsData[0] }) => {
  const navigate = useNavigate();
  const Icon = sprint.icon;

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all">
      <div className="flex items-start gap-6">
        <div className="rounded-xl bg-primary/10 p-4 text-primary">
          <Icon className="h-8 w-8" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-card-foreground">
              {sprint.title}
            </h3>
            <div className="flex gap-2">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {sprint.difficulty}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {sprint.duration}
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">
            {sprint.description}
          </p>
          
          <Button
            onClick={() => navigate(`/sprints/${sprint.id}`)}
            className="bg-primary hover:bg-primary/90"
          >
            Start Sprint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sprints;
