
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import ProjectProgress from "@/pages/ProjectProgress";
import ProjectBudgets from "@/pages/ProjectBudgets";
import Tasks from "@/pages/Tasks";
import Team from "@/pages/Team";
import Gallery from "@/pages/Gallery";
import Reports from "@/pages/Reports";
import Safety from "@/pages/Safety";
import SafetyMetrics from "@/pages/SafetyMetrics";
import Communication from "@/pages/Communication";
import Chat from "@/pages/Chat";
import Solutions from "@/pages/Solutions";
import FAQ from "@/pages/FAQ";
import Files from "@/pages/Files";
import Settings from "@/pages/Settings";
import Labor from "@/pages/Labor";
import Budgets from "@/pages/Budgets";
import Inventory from "@/pages/Inventory";
import AllMaterials from "@/pages/AllMaterials";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="project-progress" element={<ProjectProgress />} />
          <Route path="project-budgets" element={<ProjectBudgets />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="team" element={<Team />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="reports" element={<Reports />} />
          <Route path="safety" element={<Safety />} />
          <Route path="safety-metrics" element={<SafetyMetrics />} />
          <Route path="communication" element={<Communication />} />
          <Route path="chat" element={<Chat />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="files" element={<Files />} />
          <Route path="settings" element={<Settings />} />
          <Route path="labor" element={<Labor />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="materials" element={<AllMaterials />} />
        </Route>
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
