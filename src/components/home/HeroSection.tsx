import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onScrollToPricing: () => void;
}

export const HeroSection = ({ onScrollToPricing }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 text-center z-10">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-6xl md:text-7xl font-bold text-construction-navy">
            SitePlan<span className="text-construction-orange">n</span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
          The all-in-one construction management platform that puts your 
          projects on autopilot
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={onScrollToPricing} 
            size="lg" 
            className="bg-construction-navy hover:bg-construction-navy/90 text-white px-8 py-6 text-lg h-auto"
          >
            Get Started
          </Button>
          
          <Button 
            onClick={() => navigate("/solutions")} 
            size="lg" 
            variant="outline" 
            className="border-construction-navy text-construction-navy hover:bg-construction-navy/10 px-8 py-6 text-lg h-auto"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
