import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import ListenButton from "@/components/ListenButton";

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
  },
  "4": {
    title: "Summarize Meeting Notes",
    instructions: "Paste meeting notes or transcript below. The AI will extract key decisions, action items, and next steps into a structured summary.",
    sampleInput: "Meeting about Q4 planning. Discussed budget allocation. Sarah will lead the marketing campaign. Need to hire 2 engineers by October. Revenue target is $500K. John raised concerns about timeline. Decided to meet again next Tuesday."
  },
  "5": {
    title: "Classify Customer Messages",
    instructions: "Paste customer support messages below. The AI will categorize them and suggest routing to the appropriate team.",
    sampleInput: "My order never arrived. I've been waiting 3 weeks and no one responds to my emails. Order #12345."
  },
  "report-sprint": {
    title: "Automate a Weekly Report",
    instructions: "Paste your raw weekly data below (e.g., sales figures, project updates, metrics). The AI will structure it into a professional weekly report with sections for highlights, challenges, and next steps.",
    sampleInput: "Sales this week: 45 units. Customer complaints: 3. New leads: 12. Team completed project A milestone 2. Server downtime on Tuesday for 2 hours."
  },
  "workflow-sprint": {
    title: "Redesign a Workflow",
    instructions: "Describe your current workflow process that needs optimization. The AI will analyze it and suggest improvements using AI automation.",
    sampleInput: "Current process: Customer submits form → Manual review by manager → Data entry into spreadsheet → Email to accounting → Wait for approval → Send confirmation. Takes 2-3 days."
  },
  "assistant-sprint": {
    title: "Build a Personal AI Assistant",
    instructions: "Describe your domain and the types of questions your assistant should answer. The AI will help you structure a custom assistant for your team.",
    sampleInput: "I need an assistant for our HR team that can answer questions about vacation policies, expense reimbursement, and remote work guidelines."
  },
  "role-tool-sprint": {
    title: "Create a Role-Specific Tool",
    instructions: "Describe the specific role and repetitive task that needs automation. The AI will help you design a custom tool.",
    sampleInput: "Sales team needs a tool to automatically generate personalized follow-up emails based on client interaction notes and deal stage."
  },
  "sop-sprint": {
    title: "Rewrite an SOP",
    instructions: "Paste your current Standard Operating Procedure below. The AI will analyze it and suggest an AI-enhanced version with automation opportunities, clearer steps, and improved efficiency.",
    sampleInput: "Customer Onboarding SOP: 1. Receive signed contract 2. Manually create account in system 3. Send welcome email with login 4. Schedule kickoff call 5. Assign account manager 6. Create project folder 7. Send training materials. Takes 2-3 days."
  }
};

const SprintDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = window.location.pathname;
  
  // Extract sprint ID from either /sprints/:id or direct routes like /assistant-sprint
  const sprintId = id || location.replace('/', '');
  const sprint = sprintId ? sprintInstructions[sprintId] : null;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!sprint) {
    return <div>Sprint not found</div>;
  }

  const lessonText = sprint.instructions;

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock output based on sprint type
    let mockOutput = "";
    if (sprintId === "1" || sprintId === "report-sprint") {
      mockOutput = "**Weekly Report - Week of [Date]**\n\n**Highlights:**\n• Achieved 45 unit sales, meeting weekly target\n• Successfully reached milestone 2 on Project A\n• Generated 12 new qualified leads\n\n**Challenges:**\n• Experienced 2-hour server downtime on Tuesday\n• Received 3 customer complaints requiring follow-up\n\n**Next Steps:**\n• Address technical infrastructure to prevent future downtime\n• Review complaint patterns and implement preventive measures\n• Continue lead nurturing process for 12 new prospects";
    } else if (sprintId === "2") {
      mockOutput = "Subject: Product Issue - Request for Assistance\n\nDear Support Team,\n\nI hope this message finds you well. I recently received the product I ordered, but unfortunately, it isn't functioning as expected.\n\nI would greatly appreciate your assistance in resolving this issue at your earliest convenience. If a resolution isn't possible, I would like to discuss refund options.\n\nThank you for your attention to this matter. I look forward to your prompt response.\n\nBest regards";
    } else if (sprintId === "3" || sprintId === "assistant-sprint") {
      mockOutput = "**HR Assistant Configuration**\n\n**Assistant Name:** HR Help Desk\n\n**Core Capabilities:**\n1. Vacation Policy Guidance\n   - Answer questions about accrual rates\n   - Explain approval processes\n   - Clarify blackout dates\n\n2. Expense Reimbursement\n   - Eligible expense categories\n   - Submission procedures\n   - Processing timelines\n\n3. Remote Work Guidelines\n   - Eligibility criteria\n   - Equipment policies\n   - Communication expectations\n\n**Sample Prompts:**\n• 'How many vacation days do I accrue per year?'\n• 'What's the process for expense reimbursement?'\n• 'Am I eligible for remote work?'";
    } else if (sprintId === "4") {
      mockOutput = "**Meeting Summary**\n\n**Key Decisions:**\n• Q4 planning approved\n• Sarah assigned as marketing campaign lead\n• Revenue target set at $500K\n\n**Action Items:**\n• Hire 2 engineers by October (Owner: Hiring Manager)\n• Schedule follow-up meeting for next Tuesday (Owner: All)\n• Address timeline concerns raised by John (Owner: Project Lead)\n\n**Outstanding Issues:**\n• Timeline feasibility needs review\n• Budget allocation details to be finalized";
    } else if (sprintId === "5") {
      mockOutput = "**Message Classification**\n\n**Category:** Shipping & Delivery Issue\n**Priority:** High\n**Sentiment:** Frustrated\n**Recommended Route:** Customer Support - Shipping Team\n\n**Key Details:**\n• Order #12345\n• 3-week delay\n• No response to previous emails\n• Customer expects resolution\n\n**Suggested Response Template:**\n'We sincerely apologize for the delay with order #12345. We're escalating this immediately to our shipping team for investigation. You'll receive an update within 24 hours with tracking information or a full refund option.'";
    } else if (sprintId === "workflow-sprint") {
      mockOutput = "**Workflow Analysis & Recommendations**\n\n**Current State Issues:**\n• 2-3 day turnaround time\n• Multiple manual handoffs\n• Email-based coordination (prone to delays)\n• Sequential approval process\n\n**AI-Enhanced Workflow:**\n1. Customer submits form → Auto-validation & data extraction (AI)\n2. Automated routing based on form type (Rules engine)\n3. Parallel review: Manager + Accounting team notified simultaneously\n4. Smart approval: Auto-approve standard requests, flag exceptions only\n5. Instant confirmation sent via automated email\n\n**Expected Improvements:**\n• Turnaround: 2-3 days → 2-4 hours\n• Manual steps reduced: 5 → 1\n• Error rate decreased by 60%";
    } else if (sprintId === "role-tool-sprint") {
      mockOutput = "**Sales Follow-Up Tool Design**\n\n**Tool Name:** Smart Follow-Up Generator\n\n**Input Fields:**\n• Client name & company\n• Last interaction date\n• Deal stage (Prospecting, Demo, Negotiation, Closing)\n• Key discussion points\n• Next steps agreed upon\n\n**Output:**\nPersonalized email with:\n• Contextual greeting\n• Reference to previous conversation\n• Value proposition aligned with deal stage\n• Clear call-to-action\n• Professional sign-off\n\n**Sample Output:**\n'Hi [Name], Following up on our demo last Tuesday where we discussed your team's reporting challenges. Based on your feedback about the quarterly review process, I think our automated dashboard feature would save your team 10+ hours per month. Would you be available for a 15-minute call this Thursday to walk through a custom setup for your team?'";
    } else if (sprintId === "sop-sprint") {
      mockOutput = "**AI-Enhanced Customer Onboarding SOP**\n\n**Process Overview:**\nReduce onboarding time from 2-3 days to 2-4 hours through strategic automation.\n\n**Revised Workflow:**\n\n**Step 1: Contract Received (Automated)**\n• AI extracts key data from signed contract (company name, contact info, plan type)\n• System auto-creates account with appropriate permissions\n• Triggers welcome sequence\n\n**Step 2: Instant Welcome (Automated)**\n• Personalized email sent immediately with:\n  - Login credentials (auto-generated)\n  - Quick start guide tailored to plan type\n  - Calendar link for kickoff call\n• Account manager auto-assigned based on region/industry\n\n**Step 3: Kickoff Scheduling (Semi-Automated)**\n• AI suggests optimal meeting times based on team calendars\n• Customer selects time via booking link\n• Meeting auto-added to all calendars with agenda\n\n**Step 4: Resource Provisioning (Automated)**\n• Project folder structure auto-created in cloud storage\n• Training materials delivered via email drip sequence\n• Access permissions configured automatically\n\n**Step 5: Human Touchpoint (Manual)**\n• Account manager reviews account setup\n• Conducts kickoff call\n• Notes any custom requirements\n\n**Efficiency Gains:**\n• Time: 2-3 days → 2-4 hours\n• Manual steps: 7 → 2\n• Customer satisfaction: Improved due to instant response\n• Error rate: Reduced by 70% (no manual data entry)";
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
          <div className="mb-4 w-full md:w-auto">
            <ListenButton text={lessonText} />
          </div>
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
