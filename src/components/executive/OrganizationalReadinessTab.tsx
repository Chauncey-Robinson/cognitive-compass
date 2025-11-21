import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

const OrganizationalReadinessTab = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Does your organization have a clear AI strategy with defined goals?",
      options: [
        { text: "Yes, fully documented and communicated", score: 5 },
        { text: "In progress, partially defined", score: 3 },
        { text: "No clear strategy yet", score: 1 }
      ]
    },
    {
      question: "How would you rate executive leadership's understanding of AI capabilities and limitations?",
      options: [
        { text: "Strong understanding across the team", score: 5 },
        { text: "Some understand, others learning", score: 3 },
        { text: "Limited understanding", score: 1 }
      ]
    },
    {
      question: "Do you have dedicated budget allocated for AI initiatives?",
      options: [
        { text: "Yes, with clear allocation process", score: 5 },
        { text: "Some budget, case-by-case approval", score: 3 },
        { text: "No dedicated AI budget", score: 1 }
      ]
    },
    {
      question: "What is the current skill level of your technical teams regarding AI?",
      options: [
        { text: "Strong AI/ML capabilities in-house", score: 5 },
        { text: "Basic understanding, learning in progress", score: 3 },
        { text: "Limited to no AI expertise", score: 1 }
      ]
    },
    {
      question: "Does your organization have governance policies for AI deployment?",
      options: [
        { text: "Yes, comprehensive policies in place", score: 5 },
        { text: "Basic policies, still developing", score: 3 },
        { text: "No formal AI governance", score: 1 }
      ]
    },
    {
      question: "How mature is your data infrastructure?",
      options: [
        { text: "Well-organized, accessible, high quality", score: 5 },
        { text: "Exists but needs improvement", score: 3 },
        { text: "Fragmented or low quality", score: 1 }
      ]
    },
    {
      question: "What is your organization's appetite for experimentation and risk?",
      options: [
        { text: "Encourages innovation and accepts calculated risks", score: 5 },
        { text: "Cautious but willing to pilot", score: 3 },
        { text: "Risk-averse, slow to adopt", score: 1 }
      ]
    },
    {
      question: "Do you have processes for measuring ROI on AI investments?",
      options: [
        { text: "Yes, systematic measurement in place", score: 5 },
        { text: "Tracking some metrics", score: 3 },
        { text: "No measurement process", score: 1 }
      ]
    },
    {
      question: "How aligned are different departments on AI priorities?",
      options: [
        { text: "Strong alignment and collaboration", score: 5 },
        { text: "Some alignment, working on it", score: 3 },
        { text: "Siloed, minimal collaboration", score: 1 }
      ]
    },
    {
      question: "Does your organization have experience deploying AI in production?",
      options: [
        { text: "Multiple successful deployments", score: 5 },
        { text: "1-2 pilot projects", score: 3 },
        { text: "No production AI yet", score: 1 }
      ]
    },
    {
      question: "How prepared is your organization for AI-related regulatory compliance?",
      options: [
        { text: "Well-prepared, monitoring regulations", score: 5 },
        { text: "Aware but still preparing", score: 3 },
        { text: "Not yet addressed", score: 1 }
      ]
    },
    {
      question: "Do you have a change management plan for AI adoption?",
      options: [
        { text: "Yes, comprehensive plan in place", score: 5 },
        { text: "Basic plan, still developing", score: 3 },
        { text: "No formal change management", score: 1 }
      ]
    },
    {
      question: "How strong is your cybersecurity posture for AI systems?",
      options: [
        { text: "Robust security measures in place", score: 5 },
        { text: "Basic security, improving", score: 3 },
        { text: "Needs significant improvement", score: 1 }
      ]
    },
    {
      question: "What is your vendor management maturity for AI tools?",
      options: [
        { text: "Structured evaluation and management", score: 5 },
        { text: "Ad hoc vendor selection", score: 3 },
        { text: "No formal vendor process", score: 1 }
      ]
    },
    {
      question: "How engaged is your board of directors with AI strategy?",
      options: [
        { text: "Highly engaged, regular updates", score: 5 },
        { text: "Periodic updates, growing interest", score: 3 },
        { text: "Limited board engagement", score: 1 }
      ]
    }
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 5;
    return Math.round((total / maxScore) * 100);
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: "Advanced", color: "text-green-600", description: "Your organization is well-positioned for AI transformation" };
    if (score >= 60) return { level: "Developing", color: "text-yellow-600", description: "Good foundation, focus on key gaps" };
    if (score >= 40) return { level: "Emerging", color: "text-orange-600", description: "Building blocks in place, significant work needed" };
    return { level: "Early Stage", color: "text-red-600", description: "Start with foundational capabilities" };
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const readiness = getReadinessLevel(score);

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Your Readiness Assessment Results
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-10 text-center">
          <div className="mb-8">
            <div className="text-7xl font-bold mb-2">{score}</div>
            <div className={`text-2xl font-semibold mb-2 ${readiness.color}`}>
              {readiness.level}
            </div>
            <p className="text-muted-foreground text-lg">
              {readiness.description}
            </p>
          </div>

          <Progress value={score} className="h-4 mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-primary">
              Download Full Report
            </Button>
            <Button size="lg" variant="outline">
              Schedule Expert Consultation
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
          <div className="space-y-3">
            {score >= 60 ? (
              <>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Focus on scaling existing AI initiatives across departments</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Strengthen governance and risk management frameworks</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Develop advanced AI capabilities in strategic areas</span>
                </p>
              </>
            ) : (
              <>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Build executive alignment on AI strategy and goals</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Start with low-risk pilot projects to build confidence</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Invest in foundational data and governance capabilities</span>
                </p>
              </>
            )}
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={resetAssessment}>
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Organizational Readiness Assessment
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          15 questions to evaluate your organization's preparedness for AI transformation
        </p>
      </div>

      {/* Progress */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="glass-card rounded-3xl p-10">
        <h3 className="text-2xl font-semibold mb-8">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-lg">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationalReadinessTab;
