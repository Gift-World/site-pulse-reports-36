
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  FileSpreadsheet,
  Briefcase,
  Users,
  CheckSquare,
  ShieldAlert,
  PackageOpen,
  HardHat,
  Settings,
  Files,
  MessagesSquare
} from "lucide-react";

export function MainSidebar() {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Sidebar className="border-r w-64" collapsible="icon">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">SitePlan<span className="text-construction-orange">n</span></span>
        </Link>
        <SidebarTrigger />
      </div>
      
      <SidebarContent className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/dashboard") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/dashboard" className="flex items-center">
                <LayoutDashboard className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/projects") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/projects" className="flex items-center">
                <Briefcase className="h-5 w-5 mr-3" />
                <span>Projects</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/tasks") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/tasks" className="flex items-center">
                <CheckSquare className="h-5 w-5 mr-3" />
                <span>Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/team") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/team" className="flex items-center">
                <Users className="h-5 w-5 mr-3" />
                <span>Team</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/reports") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/reports" className="flex items-center">
                <FileSpreadsheet className="h-5 w-5 mr-3" />
                <span>Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/safety") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/safety" className="flex items-center">
                <ShieldAlert className="h-5 w-5 mr-3" />
                <span>Safety</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/inventory") || isActive("/app/materials") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/inventory" className="flex items-center">
                <PackageOpen className="h-5 w-5 mr-3" />
                <span>Inventory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/labor") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/labor" className="flex items-center">
                <HardHat className="h-5 w-5 mr-3" />
                <span>Labor</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/files") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/files" className="flex items-center">
                <Files className="h-5 w-5 mr-3" />
                <span>Files</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/chat") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/chat" className="flex items-center">
                <MessagesSquare className="h-5 w-5 mr-3" />
                <span>Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={isActive("/app/settings") ? "bg-muted font-medium text-primary" : ""}
            >
              <Link to="/app/settings" className="flex items-center">
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
