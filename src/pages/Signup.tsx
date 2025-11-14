import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"employee" | "executive" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store role in localStorage for demo purposes
    if (selectedRole) {
      localStorage.setItem("userRole", selectedRole);
      navigate("/scan");
    }
  };

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
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRole === "employee"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
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
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRole === "executive"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
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
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!selectedRole}
          >
            Create Account & Start Scan
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-primary hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
