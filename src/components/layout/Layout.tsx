
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { MainSidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
import { NotificationProvider } from "@/hooks/use-notifications";
import { InventoryProvider } from "@/contexts/InventoryContext";

// Create a context to expose the sidebar toggle functionality
export const LayoutContext = React.createContext<{
  toggleSidebar: () => void;
}>({
  toggleSidebar: () => {},
});

export function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Show sidebar only on non-home pages and app routes
  const showSidebar = !isHomePage && location.pathname.startsWith("/app");
  
  // Create a function to toggle sidebar that we'll expose through context
  const toggleSidebar = () => {
    const sidebarContext = document.querySelector('[data-sidebar="sidebar"]');
    if (sidebarContext) {
      // If sidebar exists in DOM, use its built-in toggle mechanism
      const trigger = sidebarContext.querySelector('[data-sidebar="trigger"]');
      if (trigger && trigger instanceof HTMLButtonElement) {
        trigger.click();
      }
    }
  };
  
  return (
    <SidebarProvider>
      <NotificationProvider>
        <InventoryProvider>
          <LayoutContext.Provider value={{ toggleSidebar }}>
            <div className="flex h-screen w-full overflow-hidden flex-col">
              <div className="flex flex-1 w-full overflow-hidden">
                {showSidebar && <MainSidebar />}
                <div className={`flex flex-1 flex-col overflow-hidden ${isHomePage ? "ml-0" : ""}`}>
                  {!isHomePage && location.pathname.startsWith("/app") && <Header />}
                  <main className={`flex-1 overflow-auto ${isHomePage ? "p-0" : location.pathname.startsWith("/app") ? "p-4 md:p-6" : "p-0"}`}>
                    <Outlet />
                  </main>
                </div>
              </div>
              <Footer />
            </div>
          </LayoutContext.Provider>
        </InventoryProvider>
      </NotificationProvider>
    </SidebarProvider>
  );
}
