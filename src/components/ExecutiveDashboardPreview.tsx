import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Target, Users } from "lucide-react";

const metrics = [
  {
    label: "Intelligence Velocity",
    value: 47,
    suffix: "%",
    prefix: "+",
    icon: TrendingUp,
  },
  {
    label: "Automation Score",
    value: 82,
    suffix: "/100",
    prefix: "",
    icon: Target,
  },
  {
    label: "Team Readiness",
    value: 76,
    suffix: "%",
    prefix: "",
    icon: Users,
  },
];

const useCountUp = (end: number, duration: number = 800, isVisible: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return count;
};

const ExecutiveDashboardPreview = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="glass-card p-8 rounded-3xl">
      <h2 className="text-2xl font-semibold mb-6">A simple view of what matters.</h2>
      
      <div className="bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-2xl p-8">
        <p className="text-muted-foreground text-lg mb-6 text-center">Intelligence Metrics</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const animatedValue = useCountUp(metric.value, 800, isVisible);
            
            return (
              <div
                key={metric.label}
                className="bg-background/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default border border-border/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {metric.label}
                  </p>
                </div>
                <p className="text-3xl font-bold">
                  {metric.prefix}{animatedValue}{metric.suffix}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/executive/dashboard")}
            variant="outline"
            className="bg-background/80 hover:bg-background"
          >
            View sample dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboardPreview;
