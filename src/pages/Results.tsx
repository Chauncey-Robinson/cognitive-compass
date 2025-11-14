import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("scanResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return <div>Loading...</div>;
  }

  const getLevel = (score: number) => {
    if (score >= 80) return { level: "Advanced", color: "text-green-600" };
    if (score >= 60) return { level: "Intermediate", color: "text-blue-600" };
    if (score >= 40) return { level: "Developing", color: "text-yellow-600" };
    return { level: "Foundational", color: "text-orange-600" };
  };

  const { level, color } = getLevel(results.score);

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Your Intelligence Graph</h1>
          <p className="text-lg text-muted-foreground">
            Here's your cognitive AI profile and personalized learning path
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-primary rounded-2xl p-8 mb-8 text-center">
          <div className="text-white/80 text-sm font-medium mb-2">OVERALL INTELLIGENCE SCORE</div>
          <div className="text-6xl font-bold text-white mb-2">{results.score}%</div>
          <div className={`text-xl font-semibold ${color}`}>{level}</div>
        </div>

        {/* Dimensional Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricCard
            icon={<Brain className="h-6 w-6" />}
            title="Conceptual Understanding"
            score={results.score >= 70 ? 85 : 65}
            description="Grasp of AI fundamentals and mechanisms"
          />
          <MetricCard
            icon={<Zap className="h-6 w-6" />}
            title="Workflow Maturity"
            score={results.score >= 70 ? 75 : 55}
            description="Ability to identify automation opportunities"
          />
          <MetricCard
            icon={<Target className="h-6 w-6" />}
            title="Reasoning Clarity"
            score={results.score >= 70 ? 80 : 60}
            description="Structured thinking and decision-making"
          />
          <MetricCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Automation Readiness"
            score={results.score >= 70 ? 70 : 50}
            description="Preparedness to implement AI solutions"
          />
        </div>

        {/* Recommendations */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">
            Your Personalized Learning Path
          </h2>
          
          <div className="space-y-6">
            <RecommendationSection
              title="Recommended Cognitive Atoms"
              items={[
                "How Models Really Work",
                "Understanding Embeddings",
                "Context Windows Explained",
                "Hallucinations and Model Limitations"
              ]}
            />
            
            <RecommendationSection
              title="Suggested Applied Sprints"
              items={[
                "Automate a Weekly Report",
                "Build a Simple Assistant",
                "Classify Customer Messages"
              ]}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/atoms")}
          >
            Start Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ 
  icon, 
  title, 
  score, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  score: number; 
  description: string;
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <div className="text-2xl font-bold text-card-foreground">{score}%</div>
      </div>
      <h3 className="font-semibold text-card-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const RecommendationSection = ({ 
  title, 
  items 
}: { 
  title: string; 
  items: string[];
}) => {
  return (
    <div>
      <h3 className="font-semibold text-card-foreground mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
