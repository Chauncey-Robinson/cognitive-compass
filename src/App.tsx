import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Scan from "./pages/Scan";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import Atoms from "./pages/Atoms";
import AtomDetail from "./pages/AtomDetail";
import Sprints from "./pages/Sprints";
import SprintDetail from "./pages/SprintDetail";
import Tutor from "./pages/Tutor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/atoms" element={<Atoms />} />
          <Route path="/atoms/:id" element={<AtomDetail />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/sprints/:id" element={<SprintDetail />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
