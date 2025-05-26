import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ChevronUp } from "lucide-react";
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative w-full">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="flex items-center justify-center w-full bg-white border-t py-3 hover:bg-gray-50 transition-colors">
            <ChevronUp className={`h-5 w-5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
            <span className="ml-2 text-sm text-muted-foreground">
              {open ? "Close Footer" : "Open Footer"}
            </span>
          </button>
        </DrawerTrigger>
        
        <DrawerContent className="max-h-[85vh] overflow-auto">
          <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <Link to="/" className="flex items-center mb-4">
                    <h2 className="text-2xl font-bold tracking-tight">
                      <span className="text-construction-navy">Site</span>Plann
                    </h2>
                  </Link>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    The all-in-one construction management platform that puts your projects on autopilot
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <a href="https://www.tiktok.com/@siteplann?_t=ZM-8wfvBN6KI6f&_r=1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-construction-navy">
                      <span className="sr-only">TikTok</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.866-1.343-1.977-1.343-3.104V1h-3.94v13.2c0 .566-.325 1.056-.8 1.29a2.436 2.436 0 0 1-1.084.26c-1.347 0-2.441-1.094-2.441-2.44s1.094-2.44 2.441-2.44c.268 0 .526.043.768.124V7.055a6.34 6.34 0 0 0-.768-.047c-3.506 0-6.35 2.843-6.35 6.35s2.844 6.35 6.35 6.35 6.35-2.843 6.35-6.35V8.916a9.085 9.085 0 0 0 5.311 1.683V6.667a5.26 5.26 0 0 1-1.914-1.105z"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/siteplann-ltd/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-construction-navy">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-construction-navy">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-construction-navy">Dashboard</Link></li>
                    <li><Link to="/projects" className="text-sm text-muted-foreground hover:text-construction-navy">Projects</Link></li>
                    <li><Link to="/tasks" className="text-sm text-muted-foreground hover:text-construction-navy">Task Management</Link></li>
                    <li><Link to="/reports" className="text-sm text-muted-foreground hover:text-construction-navy">Reports</Link></li>
                    <li><Link to="/inventory" className="text-sm text-muted-foreground hover:text-construction-navy">Inventory</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-construction-navy">FAQ</Link></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-construction-navy">Documentation</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-construction-navy">Contact Support</a></li>
                    <li><Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-construction-navy">Terms of Service</Link></li>
                    <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-construction-navy">Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  &copy; {currentYear} SitePlann. All rights reserved.
                </p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-construction-navy">
                    Terms of Service
                  </Link>
                  <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-construction-navy">
                    Privacy Policy
                  </Link>
                  <Link to="/faq" className="text-sm text-muted-foreground hover:text-construction-navy">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
