
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onScrollToPricing: () => void;
}

export const HeroSection = ({ onScrollToPricing }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative text-center space-y-6 py-24 px-4">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-construction-navy">Construct</span>Pulse
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mt-6">
          The all-in-one construction management platform that puts your projects on autopilot
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button 
            size="lg" 
            className="bg-construction-navy hover:bg-construction-darkBlue"
            onClick={onScrollToPricing}
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/solutions")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};
