
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Team from "./pages/Team";
import Chat from "./pages/Chat";
import Safety from "./pages/Safety";
import Tasks from "./pages/Tasks";
import Inventory from "./pages/Inventory";
import Labor from "./pages/Labor";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Files from "./pages/Files";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import Solutions from "./pages/Solutions";
import AllMaterials from "./pages/AllMaterials";
import Settings, { CurrencyProvider } from "./pages/Settings";
import Budgets from "./pages/Budgets";
import SafetyMetrics from "./pages/SafetyMetrics";
import ProjectProgress from "./pages/ProjectProgress";
import { InventoryProvider } from "./contexts/InventoryContext";

const App = () => {
  // Move the QueryClient initialization inside the component function
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CurrencyProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/safety-metrics" element={<SafetyMetrics />} />
                <Route path="/project-progress" element={<ProjectProgress />} />
                <Route path="/team" element={<Team />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/materials" element={<AllMaterials />} />
                <Route path="/labor" element={<Labor />} />
                <Route path="/files" element={<Files />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/faq" element={<FAQ />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CurrencyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
