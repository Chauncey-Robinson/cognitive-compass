import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, Shield, Users, Target, TrendingUp, DollarSign, ArrowRight } from "lucide-react";

const features = [
  {
    id: 'judgment',
    title: 'Judgment frameworks',
    subtitle: 'Decision-making systems for AI adoption',
    detail: 'Teach leaders how to evaluate AI recommendations, weigh uncertainty, and decide when to trust, override, or escalate. Includes checklists and decision trees for common scenarios.',
    icon: Scale,
  },
  {
    id: 'governance',
    title: 'AI governance and policy',
    subtitle: 'Risk management and compliance structures',
    detail: 'Lightweight governance templates: model approval flow, risk register, human-in-the-loop checkpoints, and audit trails aligned with common regulations.',
    icon: Shield,
  },
  {
    id: 'culture',
    title: 'Cultural transformation',
    subtitle: 'Organizational change management',
    detail: 'Playbooks for shifting team behavior: communication plans, incentives, pilot programs, and rituals that normalize AI use without fear or chaos.',
    icon: Users,
  },
  {
    id: 'scenarios',
    title: 'Scenario modeling',
    subtitle: 'Strategic planning and forecasting',
    detail: 'Interactive scenarios where leaders test strategies under different market, regulatory, and competitive conditions powered by AI simulation.',
    icon: Target,
  },
  {
    id: 'competitive',
    title: 'Competitive intelligence',
    subtitle: 'Market analysis and positioning',
    detail: 'AI-assisted landscape scans, pattern detection in competitor moves, and positioning maps that help executives see around corners.',
    icon: TrendingUp,
  },
  {
    id: 'roi',
    title: 'Automation ROI mapping',
    subtitle: 'Investment prioritization and impact analysis',
    detail: 'A simple framework that ranks automation opportunities by cost, risk, and impact – and outputs a 12–18 month AI investment roadmap.',
    icon: DollarSign,
  }
];

const ExecutiveModeSection = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState(features[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const [detailKey, setDetailKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Trigger crossfade animation when selection changes
    setDetailKey(prev => prev + 1);
  }, [selectedFeatureId]);

  const selectedFeature = features.find(f => f.id === selectedFeatureId) || features[0];
  const Icon = selectedFeature.icon;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          const isSelected = feature.id === selectedFeatureId;
          
          return (
            <button
              key={feature.id}
              onClick={() => setSelectedFeatureId(feature.id)}
              className={`glass-card p-8 rounded-2xl text-left transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 500ms ease-out ${index * 200}ms, transform 500ms ease-out ${index * 200}ms, box-shadow 300ms ease, background-color 300ms ease`,
              }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-colors ${
                isSelected ? 'bg-primary/20' : 'bg-foreground/5'
              }`}>
                <FeatureIcon className={`h-7 w-7 ${isSelected ? 'text-primary' : ''}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail Panel with Crossfade */}
      <div className="mx-auto max-w-3xl">
        <div 
          key={detailKey}
          className="glass-card p-8 md:p-10 rounded-2xl border border-border/50"
          style={{
            animation: 'fadeIn 400ms ease-out',
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">{selectedFeature.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedFeature.subtitle}</p>
            </div>
          </div>
          
          <p className="text-foreground leading-relaxed mb-6">
            {selectedFeature.detail}
          </p>
          
          <button
            onClick={() => navigate(`/executive/${selectedFeature.id}`)}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            Learn more
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ExecutiveModeSection;
