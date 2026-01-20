import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"employee" | "executive" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleGoogleSignUp = async () => {
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    // Store role before OAuth redirect
    localStorage.setItem("userRole", selectedRole);
    setIsSubmitting(true);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/scan`
      }
    });
    
    if (error) {
      toast.error("Sign up failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Get Started</h1>
          <p className="text-muted-foreground">Begin your intelligence journey</p>
        </div>

        <div className="space-y-6">
          {/* Role Selection */}
          <div>
            <Label className="text-base mb-3 block">Select Your Role</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole("employee")}
                disabled={isSubmitting}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRole === "employee"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Users className="h-8 w-8 mb-3 mx-auto text-primary" />
                <div className="font-semibold text-foreground">Employee</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Access atoms & sprints
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("executive")}
                disabled={isSubmitting}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRole === "executive"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Briefcase className="h-8 w-8 mb-3 mx-auto text-primary" />
                <div className="font-semibold text-foreground">Executive</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Strategy insights
                </div>
              </button>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignUp}
            className="w-full h-12 text-base"
            disabled={!selectedRole || isSubmitting}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isSubmitting ? "Signing up..." : "Continue with Google"}
          </Button>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-primary hover:underline"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </p>

        <p className="text-center mt-4 text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signup;
