import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Mail, Workflow, Bot, FileEdit, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const sprints = [
  {
    icon: <FileText className="h-7 w-7" />,
    title: "Automate a weekly report",
    description: "Transform raw data into structured insights",
    duration: "10 min",
    modalDescription: "Learn to transform raw data into a structured weekly report using AI. This sprint guides you through data structuring, insights extraction, and automated formatting.",
    route: "/report-sprint",
  },
  {
    icon: <Mail className="h-7 w-7" />,
    title: "Rebuild a customer email",
    description: "Improve tone, clarity, and professionalism",
    duration: "8 min",
    modalDescription: "Practice improving tone, clarity, and professionalism in customer communications. This sprint focuses on rewriting techniques and communication best practices.",
    route: "/email-sprint",
  },
  {
    icon: <Workflow className="h-7 w-7" />,
    title: "Redesign a workflow",
    description: "Map and optimize a core process",
    duration: "15 min",
    modalDescription: "Map and optimize a core business process using AI-powered analysis. This sprint helps you identify bottlenecks and design more efficient workflows.",
    route: "/workflow-sprint",
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: "Build a personal AI assistant",
    description: "Create a domain-specific helper",
    duration: "12 min",
    modalDescription: "Create an intelligent helper tailored to your role. This sprint walks you through defining behaviors, responses, and constraints.",
    route: "/assistant-sprint",
  },
  {
    icon: <FileEdit className="h-7 w-7" />,
    title: "Create a role-specific tool",
    description: "Design custom AI functionality",
    duration: "15 min",
    modalDescription: "Design a lightweight AI tool that automates a task unique to your team. Build it step-by-step with guided instructions.",
    route: "/role-tool-sprint",
  },
  {
    icon: <Settings className="h-7 w-7" />,
    title: "Rewrite SOPs with AI",
    description: "Modernize standard operating procedures",
    duration: "10 min",
    modalDescription: "Modernize outdated processes using AI-enhanced clarity, structure, and error-proofing. Quickly transform old SOPs into usable assets.",
    route: "/sop-sprint",
  },
];

const AppliedSprints = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<number | null>(null);

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
              <Dialog key={index} open={openDialog === index} onOpenChange={(open) => setOpenDialog(open ? index : null)}>
                <DialogTrigger asChild>
                  <button
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
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{sprint.title}</DialogTitle>
                    <DialogDescription className="text-base pt-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-muted-foreground text-sm mb-4">
                        {sprint.duration}
                      </span>
                      <p className="text-foreground/80 leading-relaxed">
                        {sprint.modalDescription}
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="pt-4">
                    <Button
                      onClick={() => {
                        setOpenDialog(null);
                        navigate(sprint.route);
                      }}
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                    >
                      Start Sprint →
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl text-center mt-16">
          <Button
            onClick={() => setOpenDialog(0)}
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
