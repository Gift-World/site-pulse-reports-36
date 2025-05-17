
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
  ChartBar, 
  ShieldAlert, 
  ClipboardCheck, 
  FolderOpen, 
  Package,
  UserPlus,
  Home,
  Files,
  Image
} from "lucide-react";

const navItems = [
  { 
    path: "/", 
    name: "Home", 
    icon: <Home className="h-5 w-5" /> 
  },
  { 
    path: "/dashboard", 
    name: "Dashboard", 
    icon: <ChartBar className="h-5 w-5" /> 
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
    path: "/tasks", 
    name: "Tasks", 
    icon: <ClipboardCheck className="h-5 w-5" /> 
  },
  { 
    path: "/reports", 
    name: "Reports", 
    icon: <FileText className="h-5 w-5" /> 
  },
  { 
    path: "/gallery", 
    name: "Gallery", 
    icon: <Image className="h-5 w-5" /> 
  },
  { 
    path: "/safety", 
    name: "Safety", 
    icon: <ShieldAlert className="h-5 w-5" /> 
  },
  { 
    path: "/inventory", 
    name: "Inventory", 
    icon: <Package className="h-5 w-5" /> 
  },
  { 
    path: "/labor", 
    name: "Labor", 
    icon: <UserPlus className="h-5 w-5" /> 
  },
  { 
    path: "/files", 
    name: "Files", 
    icon: <Files className="h-5 w-5" /> 
  },
  { 
    path: "/chat", 
    name: "Chat", 
    icon: <MessageSquare className="h-5 w-5" /> 
  }
];

export function MainSidebar() {
  const { open } = useSidebar();
  const isCollapsed = !open;
  
  return (
    <Sidebar
      className={cn(
        "border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        "bg-construction-navy text-white"
      )}
    >
      {/* Logo Area */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center text-construction-navy font-bold">
              CP
            </div>
            <span className="ml-2 font-bold text-lg text-white">ConstructPulse</span>
          </div>
        )}
        <SidebarTrigger className="ml-auto text-white hover:bg-construction-navy hover:text-white" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs uppercase font-semibold text-white/70 px-4 py-2", isCollapsed && "sr-only")}>
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
                            ? "bg-white text-construction-navy" 
                            : "text-white hover:bg-white/10 hover:text-white"
                        )
                      }
                      end={item.path === "/" || item.path === "/dashboard"}
                    >
                      {item.icon}
                      {!isCollapsed && <span>{item.name}</span>}
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
