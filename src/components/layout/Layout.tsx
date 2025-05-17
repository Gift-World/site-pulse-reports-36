
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <MainSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
