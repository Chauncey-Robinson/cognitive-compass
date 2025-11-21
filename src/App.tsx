import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import IntelligenceScan from "./pages/IntelligenceScan";
import CognitiveAtoms from "./pages/CognitiveAtoms";
import AppliedSprints from "./pages/AppliedSprints";
import Executive from "./pages/Executive";
import AIBasics from "./pages/AIBasics";
import Concepts from "./pages/Concepts";
import ContextWindowsAtom from "./pages/ContextWindowsAtom";
import OptimizePromptsSprint from "./pages/OptimizePromptsSprint";
import HowItWorks from "./pages/HowItWorks";
import ExecutiveDetail from "./pages/ExecutiveDetail";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
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
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/intelligence-scan" element={<IntelligenceScan />} />
            <Route path="/ai-basics" element={<AIBasics />} />
            <Route path="/atoms" element={<CognitiveAtoms />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/sprints" element={<AppliedSprints />} />
            <Route path="/executive" element={<Executive />} />
            <Route path="/executive/:id" element={<ExecutiveDetail />} />
            <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/results" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/atoms/context-windows" element={<ContextWindowsAtom />} />
            <Route path="/atoms/:id" element={<AtomDetail />} />
            <Route path="/sprints/optimize-prompts" element={<OptimizePromptsSprint />} />
            <Route path="/sprints/:id" element={<SprintDetail />} />
            <Route path="/report-sprint" element={<SprintDetail />} />
            <Route path="/workflow-sprint" element={<SprintDetail />} />
            <Route path="/assistant-sprint" element={<SprintDetail />} />
            <Route path="/role-tool-sprint" element={<SprintDetail />} />
            <Route path="/sop-sprint" element={<SprintDetail />} />
            <Route path="/tutor" element={<Tutor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
