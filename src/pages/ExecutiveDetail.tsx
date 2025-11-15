import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Scale, Shield, Users, Target, TrendingUp, DollarSign } from "lucide-react";

const featureContent: Record<string, { 
  title: string; 
  subtitle: string; 
  detail: string;
  icon: typeof Scale;
}> = {
  judgment: {
    title: 'Judgment frameworks',
    subtitle: 'Decision-making systems for AI adoption',
    detail: 'Teach leaders how to evaluate AI recommendations, weigh uncertainty, and decide when to trust, override, or escalate. Includes checklists and decision trees for common scenarios.',
    icon: Scale,
  },
  governance: {
    title: 'AI governance and policy',
    subtitle: 'Risk management and compliance structures',
    detail: 'Lightweight governance templates: model approval flow, risk register, human-in-the-loop checkpoints, and audit trails aligned with common regulations.',
    icon: Shield,
  },
  culture: {
    title: 'Cultural transformation',
    subtitle: 'Organizational change management',
    detail: 'Playbooks for shifting team behavior: communication plans, incentives, pilot programs, and rituals that normalize AI use without fear or chaos.',
    icon: Users,
  },
  scenarios: {
    title: 'Scenario modeling',
    subtitle: 'Strategic planning and forecasting',
    detail: 'Interactive scenarios where leaders test strategies under different market, regulatory, and competitive conditions powered by AI simulation.',
    icon: Target,
  },
  competitive: {
    title: 'Competitive intelligence',
    subtitle: 'Market analysis and positioning',
    detail: 'AI-assisted landscape scans, pattern detection in competitor moves, and positioning maps that help executives see around corners.',
    icon: TrendingUp,
  },
  roi: {
    title: 'Automation ROI mapping',
    subtitle: 'Investment prioritization and impact analysis',
    detail: 'A simple framework that ranks automation opportunities by cost, risk, and impact – and outputs a 12–18 month AI investment roadmap.',
    icon: DollarSign,
  }
};

const ExecutiveDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const feature = id ? featureContent[id] : null;

  if (!feature) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Feature not found</h1>
          <Button onClick={() => navigate("/executive")}>
            Back to Executive Mode
          </Button>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/executive")}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Executive Mode
        </Button>

        <div className="glass-card p-10 rounded-2xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 flex-shrink-0">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {feature.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {feature.subtitle}
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed text-lg">
              {feature.detail}
            </p>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-4">
              This is a placeholder page. Full content and interactive features coming soon.
            </p>
            <Button onClick={() => navigate("/pricing")} className="button-primary">
              Explore Executive Mode Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDetail;
