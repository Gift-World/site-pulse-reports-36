
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
import Gallery from "./pages/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/labor" element={<Labor />} />
            <Route path="/files" element={<Files />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
