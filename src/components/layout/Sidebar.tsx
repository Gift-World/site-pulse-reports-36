
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Chart, 
  ShieldAlert, 
  ClipboardCheck, 
  FolderOpen, 
  ChartBar
} from "lucide-react";

const navItems = [
  { 
    path: "/", 
    name: "Dashboard", 
    icon: <ChartBar className="h-5 w-5" /> 
  },
  { 
    path: "/reports", 
    name: "Reports", 
    icon: <FileText className="h-5 w-5" /> 
  },
  { 
    path: "/projects", 
    name: "Projects", 
    icon: <FolderOpen className="h-5 w-5" /> 
  },
  { 
    path: "/team", 
    name: "Team", 
    icon: <Users className="h-5 w-5" /> 
  },
  { 
    path: "/communication", 
    name: "Communication", 
    icon: <MessageSquare className="h-5 w-5" /> 
  },
  { 
    path: "/safety", 
    name: "Safety", 
    icon: <ShieldAlert className="h-5 w-5" /> 
  },
  { 
    path: "/tasks", 
    name: "Tasks", 
    icon: <ClipboardCheck className="h-5 w-5" /> 
  }
];

export function MainSidebar() {
  const { collapsed } = useSidebar();
  
  return (
    <Sidebar
      className={cn(
        "border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible
    >
      {/* Logo Area */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-construction-blue flex items-center justify-center text-white font-bold">
              CP
            </div>
            <span className="ml-2 font-bold text-lg text-construction-blue">ConstructPulse</span>
          </div>
        )}
        <SidebarTrigger className="ml-auto" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs uppercase font-semibold text-muted-foreground px-4 py-2", collapsed && "sr-only")}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive 
                            ? "bg-construction-blue text-white" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )
                      }
                      end={item.path === "/"}
                    >
                      {item.icon}
                      {!collapsed && <span>{item.name}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
