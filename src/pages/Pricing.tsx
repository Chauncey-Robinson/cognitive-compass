import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic tutor",
        "1 simulation/month",
        "Community access",
      ],
      cta: "Start Free",
      primary: false,
    },
    {
      name: "Premium",
      price: "$49",
      period: "/mo",
      features: [
        "Unlimited tutor",
        "All simulations",
        "AIS score",
        "OI Review",
      ],
      cta: "Start 7-Day Free Trial",
      primary: true,
    },
    {
      name: "Pro",
      price: "$149",
      period: "/mo",
      features: [
        "Everything in Premium",
        "1:1 coach",
        "Custom simulations",
        "Priority support",
      ],
      cta: "Start 7-Day Free Trial",
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center fade-in mb-16">
          <h1 className="text-hero mb-6">
            Pricing
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
            Choose the plan that fits your needs.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`glass-card p-10 rounded-3xl fade-in-up ${
                  plan.primary ? "ring-2 ring-foreground/20" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 tracking-wide uppercase">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={plan.primary ? "button-primary w-full" : "button-secondary w-full"}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="glass-card p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-semibold mb-4">Enterprise</h3>
            <p className="text-muted-foreground text-lg mb-8">
              For teams of 50+
            </p>
            <Button className="button-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
