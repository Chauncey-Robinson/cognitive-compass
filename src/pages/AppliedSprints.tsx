import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Mail, Workflow, Bot, FileEdit, Settings } from "lucide-react";

const sprints = [
  {
    icon: <FileText className="h-7 w-7" />,
    title: "Automate a weekly report",
    description: "Transform raw data into structured insights",
    duration: "10 min",
  },
  {
    icon: <Mail className="h-7 w-7" />,
    title: "Rebuild a customer email",
    description: "Improve tone, clarity, and professionalism",
    duration: "8 min",
  },
  {
    icon: <Workflow className="h-7 w-7" />,
    title: "Redesign a workflow",
    description: "Map and optimize a core process",
    duration: "15 min",
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: "Build a personal AI assistant",
    description: "Create a domain-specific helper",
    duration: "12 min",
  },
  {
    icon: <FileEdit className="h-7 w-7" />,
    title: "Create a role-specific tool",
    description: "Design custom AI functionality",
    duration: "15 min",
  },
  {
    icon: <Settings className="h-7 w-7" />,
    title: "Rewrite SOPs with AI",
    description: "Modernize standard operating procedures",
    duration: "10 min",
  },
];

const AppliedSprints = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center fade-in">
          <h1 className="text-hero mb-6">
            Learn by doing.<br />Not watching.
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-16 font-light">
            10–20 minute micro-challenges that remake your workflow.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="space-y-4">
            {sprints.map((sprint, index) => (
              <button
                key={index}
                onClick={() => navigate(`/sprints/${index + 1}`)}
                className="glass-card w-full p-8 rounded-2xl text-left hover:scale-[1.01] transition-all duration-300 group fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                    {sprint.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-semibold">{sprint.title}</h3>
                      <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-foreground/5">
                        {sprint.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {sprint.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl text-center mt-16">
          <Button
            onClick={() => navigate("/sprints/1")}
            className="button-primary"
          >
            Start a Sprint →
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AppliedSprints;
