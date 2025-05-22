
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Globe, Phone, ChevronRight, Square } from "lucide-react";

interface HeroSectionProps {
  onScrollToPricing: () => void;
}

export const HeroSection = ({ onScrollToPricing }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[90vh] flex items-center bg-construction-navy">
      {/* Main content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-20 px-4 py-16">
        {/* Left column - Text content */}
        <div className="space-y-8 text-white">
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center text-construction-navy mr-3">
              <Square className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">SitePlan<span className="text-construction-orange">n</span></span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase">
              Build<br />
              <span className="text-construction-orange">Excellence</span>
            </h1>
            
            <p className="text-white/90 text-xl max-w-xl">
              Your trusted partner for exceptional construction solutions. 
              Quality, reliability, and innovation in every project.
            </p>
            
            <div className="pt-8 flex flex-wrap gap-4">
              <Button 
                onClick={onScrollToPricing} 
                size="lg" 
                className="bg-construction-orange hover:bg-construction-orange/90 text-white px-12 py-6 text-lg h-auto rounded-md"
              >
                GET IN TOUCH <ChevronRight className="ml-1" />
              </Button>
              
              <Button 
                onClick={() => navigate("/projects")} 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-12 py-6 text-lg h-auto rounded-md"
              >
                OUR PROJECTS
              </Button>
            </div>
          </div>
          
          <div className="pt-10 space-y-6">
            <h3 className="text-white text-xl font-bold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-construction-orange" />
                <span>siteplann.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-construction-orange" />
                <span>+123-456-7890</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Content */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative">
            <div className="absolute -top-20 -right-12 h-64 w-64 bg-construction-darkBlue rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-12 h-64 w-64 bg-construction-orange rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-xl">
              <div className="space-y-8">
                <div className="flex items-center justify-center">
                  <Square className="h-16 w-16 text-construction-orange" />
                </div>
                
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white">Ready to transform your construction business?</h2>
                  <p className="text-white/70">Join thousands of professionals who trust SitePlan<span className="text-construction-orange">n</span></p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-bold text-white">500+</h3>
                    <p className="text-white/70 text-sm">Projects Completed</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <h3 className="text-lg font-bold text-white">98%</h3>
                    <p className="text-white/70 text-sm">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-construction-darkBlue to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-construction-darkBlue z-0"></div>
    </div>
  );
};
