import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import SettingsNotifications from "./pages/SettingsNotifications";
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
import ExecutiveBrief from "./pages/ExecutiveBrief";
import PlaybookPlatform from "./pages/PlaybookPlatform";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <PageTransition>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PlaybookPlatform />} />
              <Route path="/home" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              
              {/* Protected routes */}
              <Route path="/settings/notifications" element={
                <ProtectedRoute><SettingsNotifications /></ProtectedRoute>
              } />
              <Route path="/intelligence-scan" element={
                <ProtectedRoute><IntelligenceScan /></ProtectedRoute>
              } />
              <Route path="/ai-basics" element={
                <ProtectedRoute><AIBasics /></ProtectedRoute>
              } />
              <Route path="/atoms" element={
                <ProtectedRoute><CognitiveAtoms /></ProtectedRoute>
              } />
              <Route path="/concepts" element={
                <ProtectedRoute><Concepts /></ProtectedRoute>
              } />
              <Route path="/sprints" element={
                <ProtectedRoute><AppliedSprints /></ProtectedRoute>
              } />
              <Route path="/executive" element={
                <ProtectedRoute><Executive /></ProtectedRoute>
              } />
              <Route path="/executive/:id" element={
                <ProtectedRoute><ExecutiveDetail /></ProtectedRoute>
              } />
              <Route path="/executive/dashboard" element={
                <ProtectedRoute><ExecutiveDashboard /></ProtectedRoute>
              } />
              <Route path="/executive/brief" element={
                <ProtectedRoute><ExecutiveBrief /></ProtectedRoute>
              } />
              <Route path="/scan" element={
                <ProtectedRoute><Scan /></ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute><Results /></ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
              <Route path="/atoms/context-windows" element={
                <ProtectedRoute><ContextWindowsAtom /></ProtectedRoute>
              } />
              <Route path="/atoms/:id" element={
                <ProtectedRoute><AtomDetail /></ProtectedRoute>
              } />
              <Route path="/sprints/optimize-prompts" element={
                <ProtectedRoute><OptimizePromptsSprint /></ProtectedRoute>
              } />
              <Route path="/sprints/:id" element={
                <ProtectedRoute><SprintDetail /></ProtectedRoute>
              } />
              <Route path="/report-sprint" element={
                <ProtectedRoute><SprintDetail /></ProtectedRoute>
              } />
              <Route path="/workflow-sprint" element={
                <ProtectedRoute><SprintDetail /></ProtectedRoute>
              } />
              <Route path="/assistant-sprint" element={
                <ProtectedRoute><SprintDetail /></ProtectedRoute>
              } />
              <Route path="/role-tool-sprint" element={
                <ProtectedRoute><SprintDetail /></ProtectedRoute>
              } />
              <Route path="/sop-sprint" element={
                <ProtectedRoute><SprintDetail /></ProtectedRoute>
              } />
              <Route path="/tutor" element={
                <ProtectedRoute><Tutor /></ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
