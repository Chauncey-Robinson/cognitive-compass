import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";

// Input validation schema
const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(128, "Password too long"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"employee" | "executive" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    // Validate input
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    const { error } = await signUp(formData.email.trim(), formData.password);

    if (error) {
      // Handle specific error cases with user-friendly messages
      if (error.message.includes("User already registered")) {
        toast.error("An account with this email already exists. Please sign in instead.");
      } else if (error.message.includes("Password")) {
        toast.error("Password does not meet requirements. Please use at least 6 characters.");
      } else {
        toast.error("Sign up failed. Please try again.");
      }
      setIsSubmitting(false);
      return;
    }

    // Store role in localStorage for use after email verification
    localStorage.setItem("userRole", selectedRole);
    localStorage.setItem("userName", formData.name.trim());
    
    toast.success("Account created! You can now sign in.");
    navigate("/scan");
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Begin your intelligence journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isSubmitting}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isSubmitting}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!selectedRole || isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account & Start Scan"}
          </Button>
        </form>

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
      </div>
    </div>
  );
};

export default Signup;
