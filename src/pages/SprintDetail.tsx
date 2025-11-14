import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const sprintInstructions: Record<string, { title: string; instructions: string; sampleInput: string }> = {
  "1": {
    title: "Automate a Weekly Report",
    instructions: "Paste your raw weekly data below (e.g., sales figures, project updates, metrics). The AI will structure it into a professional weekly report with sections for highlights, challenges, and next steps.",
    sampleInput: "Sales this week: 45 units. Customer complaints: 3. New leads: 12. Team completed project A milestone 2. Server downtime on Tuesday for 2 hours."
  },
  "2": {
    title: "Rewrite Customer Emails",
    instructions: "Paste a customer email that needs improvement. The AI will rewrite it for better tone, clarity, and professionalism while maintaining the core message.",
    sampleInput: "Hey, the thing you sent doesn't work. Fix it ASAP or I want my money back. This is ridiculous."
  },
  "3": {
    title: "Build a Simple Assistant",
    instructions: "Describe your domain and the types of questions your assistant should answer. The AI will help you structure a custom assistant for your team.",
    sampleInput: "I need an assistant for our HR team that can answer questions about vacation policies, expense reimbursement, and remote work guidelines."
  }
};

const SprintDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sprint = id ? sprintInstructions[id] : null;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!sprint) {
    return <div>Sprint not found</div>;
  }

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock output based on sprint type
    let mockOutput = "";
    if (id === "1") {
      mockOutput = "**Weekly Report - Week of [Date]**\n\n**Highlights:**\n• Achieved 45 unit sales, meeting weekly target\n• Successfully reached milestone 2 on Project A\n• Generated 12 new qualified leads\n\n**Challenges:**\n• Experienced 2-hour server downtime on Tuesday\n• Received 3 customer complaints requiring follow-up\n\n**Next Steps:**\n• Address technical infrastructure to prevent future downtime\n• Review complaint patterns and implement preventive measures\n• Continue lead nurturing process for 12 new prospects";
    } else if (id === "2") {
      mockOutput = "Subject: Product Issue - Request for Assistance\n\nDear Support Team,\n\nI hope this message finds you well. I recently received the product I ordered, but unfortunately, it isn't functioning as expected.\n\nI would greatly appreciate your assistance in resolving this issue at your earliest convenience. If a resolution isn't possible, I would like to discuss refund options.\n\nThank you for your attention to this matter. I look forward to your prompt response.\n\nBest regards";
    } else if (id === "3") {
      mockOutput = "**HR Assistant Configuration**\n\n**Assistant Name:** HR Help Desk\n\n**Core Capabilities:**\n1. Vacation Policy Guidance\n   - Answer questions about accrual rates\n   - Explain approval processes\n   - Clarify blackout dates\n\n2. Expense Reimbursement\n   - Eligible expense categories\n   - Submission procedures\n   - Processing timelines\n\n3. Remote Work Guidelines\n   - Eligibility criteria\n   - Equipment policies\n   - Communication expectations\n\n**Sample Prompts:**\n• 'How many vacation days do I accrue per year?'\n• 'What's the process for expense reimbursement?'\n• 'Am I eligible for remote work?'";
    }
    
    setOutput(mockOutput);
    setIsProcessing(false);
    toast.success("Sprint completed successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/sprints")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sprints
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">{sprint.title}</h1>
          <p className="text-muted-foreground">{sprint.instructions}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Input
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={sprint.sampleInput}
              className="min-h-[150px]"
            />
          </div>

          <Button
            onClick={handleProcess}
            disabled={!input || isProcessing}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isProcessing ? "Processing..." : "Process with AI"}
          </Button>

          {output && (
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-card-foreground">AI Output</span>
              </div>
              <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SprintDetail;
