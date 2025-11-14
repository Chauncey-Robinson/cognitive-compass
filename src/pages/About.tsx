import Navigation from "@/components/Navigation";

const About = () => {
  const values = [
    {
      title: "Clarity",
      description: "We cut through complexity to reveal what matters.",
    },
    {
      title: "Rigor",
      description: "Every insight is grounded in research and tested in practice.",
    },
    {
      title: "Responsibility",
      description: "We build tools that enhance human capability, not replace it.",
    },
    {
      title: "Depth",
      description: "Surface-level understanding isn't enough. We go deeper.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="fade-in mb-24">
            <h1 className="text-hero mb-12">
              About Oxford Intelligence
            </h1>
            <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
              <p>
                Oxford Intelligence is on a mission to upgrade global cognitive capacity. 
                We believe that artificial intelligence should amplify human intelligence, 
                not replace it.
              </p>
              <p>
                Built on a foundation of philosophy and machine intelligence research, 
                our platform serves enterprises, governments, and policymakers who 
                understand that AI fluency is the new literacy.
              </p>
              <p>
                We design with intention. Every interface, every interaction, 
                every lesson is crafted to feel timeless, modern, and deeply human.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <h2 className="text-display mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="glass-card p-12 rounded-3xl text-center">
            <p className="text-2xl font-light leading-relaxed">
              "We're building the operating system for human intelligence 
              in the age of AI."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
