import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IntelligenceScan from "./pages/IntelligenceScan";
import CognitiveAtoms from "./pages/CognitiveAtoms";
import AppliedSprints from "./pages/AppliedSprints";
import Executive from "./pages/Executive";
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intelligence-scan" element={<IntelligenceScan />} />
          <Route path="/atoms" element={<CognitiveAtoms />} />
          <Route path="/sprints" element={<AppliedSprints />} />
          <Route path="/executive" element={<Executive />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/atoms/:id" element={<AtomDetail />} />
          <Route path="/sprints/:id" element={<SprintDetail />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
