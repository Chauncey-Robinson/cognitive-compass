import { Button } from "@/components/ui/button";
import { Shield, FileText, Scale, Globe, PieChart } from "lucide-react";

const GovernanceBasicsTab = () => {
  const lessons = [
    {
      icon: Shield,
      title: "Data Privacy & AI",
      duration: "5 min read",
      description: "Navigate GDPR, CCPA, and emerging data protection regulations for AI systems. Learn what leaders need to know about data governance.",
      topics: ["Privacy by design principles", "Data minimization strategies", "Cross-border data flows", "Consent management"]
    },
    {
      icon: FileText,
      title: "Model Risk Management",
      duration: "5 min read",
      description: "Understand how to identify, measure, and mitigate risks from AI model deployment in production environments.",
      topics: ["Model validation frameworks", "Performance monitoring", "Bias detection", "Version control"]
    },
    {
      icon: Scale,
      title: "Ethical AI Principles",
      duration: "5 min read",
      description: "Build an ethical framework for AI deployment that aligns with your organizational values and stakeholder expectations.",
      topics: ["Fairness and equity", "Transparency requirements", "Accountability structures", "Human oversight"]
    },
    {
      icon: Globe,
      title: "Compliance Landscape",
      duration: "5 min read",
      description: "Stay current with the EU AI Act, US executive orders, and industry-specific regulations affecting AI deployment.",
      topics: ["EU AI Act overview", "US regulatory framework", "Industry standards", "Audit requirements"]
    },
    {
      icon: PieChart,
      title: "Board Reporting",
      duration: "5 min read",
      description: "Create board-ready AI reports that communicate strategy, risks, and opportunities clearly and concisely.",
      topics: ["Key metrics to track", "Risk presentation", "Investment justification", "Strategic roadmaps"]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          AI Governance Essentials
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Quick, practical lessons on governing AI responsibly. Each topic is a 5-minute read 
          with downloadable frameworks you can implement immediately.
        </p>
      </div>

      <div className="space-y-6">
        {lessons.map((lesson, index) => {
          const Icon = lesson.icon;
          return (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 lg:w-1/3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-2/3 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {lesson.description}
                  </p>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Topics covered:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lesson.topics.map((topic, tIndex) => (
                        <div key={tIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm">
                      Read Lesson
                    </Button>
                    <Button variant="ghost" size="sm">
                      Download Framework
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resources Box */}
      <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20">
        <h3 className="text-lg font-semibold mb-2">
          Complete Governance Toolkit
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Download all frameworks, templates, and checklists in one comprehensive package.
        </p>
        <Button variant="outline">
          Download Complete Toolkit
        </Button>
      </div>
    </div>
  );
};

export default GovernanceBasicsTab;
