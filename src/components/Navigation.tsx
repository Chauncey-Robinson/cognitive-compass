import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Intelligence Scan", path: "/intelligence-scan" },
    { label: "Atoms", path: "/atoms" },
    { label: "Sprints", path: "/sprints" },
    { label: "Executive", path: "/executive" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-14' : 'h-20'}`}>
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full border-2 border-foreground/20 group-hover:border-foreground/40 transition-colors" />
            <span className="text-lg font-semibold tracking-tight">
              Oxford Intelligence
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-sm transition-colors ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </button>
            <Button
              onClick={() => navigate("/scan")}
              className="button-primary"
            >
              Start Scan
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
