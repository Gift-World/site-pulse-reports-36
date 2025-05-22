
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Globe, Phone } from "lucide-react";

interface HeroSectionProps {
  onScrollToPricing: () => void;
}

export const HeroSection = ({ onScrollToPricing }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Blue vertical accent */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-construction-navy z-10"></div>
      
      {/* Main content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-20 px-4 py-16">
        {/* Left column - Text content */}
        <div className="space-y-8">
          <div className="flex items-center text-white mb-6">
            <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center text-construction-navy font-bold mr-3">
              SP
            </div>
            <span className="text-xl font-bold">SitePlann</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase">
              Construction<br />
              <span className="text-white">Company</span>
            </h1>
            
            <p className="text-white text-xl max-w-xl">
              Build with confidence! Quality, reliability, and innovation—your trusted 
              partner for exceptional construction solutions
            </p>
            
            <div className="pt-8">
              <Button 
                onClick={onScrollToPricing} 
                size="lg" 
                className="bg-construction-navy hover:bg-construction-darkBlue text-white px-12 py-6 text-lg h-auto rounded-md"
              >
                GET IN TOUCH
              </Button>
            </div>
          </div>
          
          <div className="pt-16 space-y-6">
            <h3 className="text-white text-xl font-bold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <Globe className="h-5 w-5 text-construction-orange" />
                <span>siteplann.com</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Phone className="h-5 w-5 text-construction-orange" />
                <span>+123-456-7890</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Image stack */}
        <div className="hidden lg:flex flex-col items-center justify-center relative">
          {/* Stacked construction images with rounded corners */}
          <div className="absolute top-12 right-12 w-72 h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl transform rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Construction crane" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-56 right-4 w-72 h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl transform -rotate-3">
            <img 
              src="https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Construction worker" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-96 right-20 w-72 h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl transform rotate-12">
            <img 
              src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Building construction" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
