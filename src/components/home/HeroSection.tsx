
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Globe, Phone, ChevronRight } from "lucide-react";

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
            <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center text-construction-navy font-bold mr-3">
              SP
            </div>
            <span className="text-xl font-bold">SitePlann</span>
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
        
        {/* Right column - Creative image grid */}
        <div className="hidden lg:flex items-center justify-center relative">
          {/* Grid container */}
          <div className="grid grid-cols-6 grid-rows-6 gap-3 h-full w-full">
            {/* Large center image */}
            <div className="col-span-4 row-span-4 col-start-2 row-start-2 relative z-30">
              <div className="h-full w-full rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/lovable-uploads/b5a9484a-acf7-45fe-801f-d96772aacd1c.png" 
                  alt="Construction workers at site" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            {/* Top right image */}
            <div className="col-span-2 row-span-3 col-start-5 row-start-1 relative z-20">
              <div className="h-full w-full rounded-lg overflow-hidden shadow-xl border-4 border-white transform rotate-3">
                <img 
                  src="/lovable-uploads/c39d8583-9621-4aad-95c6-ffd38ef442c8.png" 
                  alt="Construction crane" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            {/* Bottom left image */}
            <div className="col-span-3 row-span-3 col-start-1 row-start-4 relative z-10">
              <div className="h-full w-full rounded-lg overflow-hidden shadow-xl border-4 border-white transform -rotate-6">
                <img 
                  src="/lovable-uploads/277d781e-99be-47e7-a912-e42b62f83e95.png" 
                  alt="Building construction" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-12 right-20 h-16 w-16 bg-construction-orange rounded-full opacity-20"></div>
            <div className="absolute bottom-20 left-10 h-24 w-24 bg-white rounded-full opacity-10"></div>
            <div className="absolute top-1/2 right-4 h-32 w-4 bg-construction-orange opacity-20"></div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-construction-darkBlue to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-construction-darkBlue z-0"></div>
    </div>
  );
};
