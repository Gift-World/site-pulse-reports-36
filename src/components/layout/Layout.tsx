
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isTermsPrivacyFaqPage = ["/terms-of-service", "/privacy-policy", "/faq"].includes(location.pathname);
  
  // Don't show sidebar on home, terms, privacy, or FAQ pages
  const showSidebar = !isHomePage && !isTermsPrivacyFaqPage;
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden flex-col">
        <div className="flex flex-1 w-full overflow-hidden">
          {showSidebar && <MainSidebar />}
          <div className={`flex flex-1 flex-col overflow-hidden ${showSidebar ? "ml-16 md:ml-64" : ""}`}>
            <Header />
            <main className={`flex-1 overflow-auto ${showSidebar ? "p-4 md:p-6" : "p-0"}`}>
              <Outlet />
            </main>
          </div>
        </div>
        {(isHomePage || isTermsPrivacyFaqPage) && <Footer />}
      </div>
    </SidebarProvider>
  );
}
