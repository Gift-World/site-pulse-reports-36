
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, Users, Clock, Shield, PieChart, CheckCircle, Book, List, Slack, Trello, Calendar, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HelpCenter } from "@/components/home/HelpCenter";
import { SolutionsList } from "@/components/home/SolutionsList";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { HeroSection } from "@/components/home/HeroSection";

const Home = () => {
  const navigate = useNavigate();
  const pricingRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { currency, currencySymbol } = useCurrency();
  const { toast } = useToast();
  
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = () => {
    if (!subscribeEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you for subscribing!",
      description: `We've received your request for the ${selectedPlan} plan. We'll contact you shortly.`,
    });

    setSubscribeDialogOpen(false);
    setSubscribeEmail("");

    if (selectedPlan !== "Free") {
      navigate("/settings?tab=payment");
    }
  };

  const handleGetStarted = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setSubscribeDialogOpen(true);
  };

  const getCurrencyPrice = (usdPrice: string): string => {
    const numericPrice = parseFloat(usdPrice.replace("$", ""));

    switch(currency) {
      case "EUR": return `€${(numericPrice * 0.91).toFixed(2)}`;
      case "GBP": return `£${(numericPrice * 0.78).toFixed(2)}`;
      case "JPY": return `¥${Math.round(numericPrice * 150)}`;
      case "CAD": return `C$${(numericPrice * 1.34).toFixed(2)}`;
      case "AUD": return `A$${(numericPrice * 1.5).toFixed(2)}`;
      case "USD":
      default: return `$${numericPrice.toFixed(2)}`;
    }
  };

  return (
    <div className="space-y-12 overflow-hidden">
      {/* Enhanced Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-construction-navy/5 via-transparent to-construction-blue/5 pointer-events-none"></div>
        <div className="animate-in fade-in-0 duration-1000">
          <HeroSection onScrollToPricing={() => scrollToSection(pricingRef)} />
        </div>
      </div>

      {/* Enhanced Why SitePlann Section */}
      <div ref={featuresRef} className="animate-in fade-in-0 duration-1000 delay-300">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-construction-navy to-construction-blue bg-clip-text text-transparent">
              Why SitePlann?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              SitePlann streamlines construction project management, eliminating communication gaps, 
              reducing delays, and ensuring your projects are delivered on time and within budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Save Time",
                description: "Reduce administrative work by up to 60% with automated reporting and task management",
                icon: Clock,
                bgImage: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                delay: "delay-100"
              },
              {
                title: "Cut Costs", 
                description: "Lower project costs by 15-20% through improved resource planning and inventory management",
                icon: PieChart,
                bgImage: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                delay: "delay-200"
              },
              {
                title: "Increase Quality",
                description: "Maintain higher quality standards with comprehensive safety checks and detailed quality control",
                icon: CheckCircle,
                bgImage: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                delay: "delay-300"
              }
            ].map((item, index) => (
              <div key={index} className={`relative group animate-in slide-in-from-bottom-4 duration-700 ${item.delay}`}>
                <div className="absolute inset-0 z-0 bg-cover bg-center rounded-xl opacity-5 group-hover:opacity-10 transition-opacity duration-300" style={{backgroundImage: `url(${item.bgImage})`}}></div>
                <Card className="relative z-10 bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="p-3 w-14 h-14 rounded-xl bg-gradient-to-br from-construction-navy to-construction-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="text-white h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-in fade-in-0 duration-1000">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-construction-navy to-construction-blue bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Everything you need to manage your construction projects from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Real-time Dashboard", 
                description: "Track KPIs, monitor progress against timeline and budget, and identify potential issues with customizable views. Our interactive charts focus on metrics that matter most to your team and stakeholders.", 
                icon: <ChartBar className="h-6 w-6" />,
                delay: "delay-100"
              },
              { 
                title: "Team Management", 
                description: "Effortlessly assign team members to specific tasks while tracking performance and optimizing resource allocation across projects. Our communication features ensure accountability and reduce delays throughout construction operations.", 
                icon: <Users className="h-6 w-6" />,
                delay: "delay-200"
              },
              { 
                title: "Task Scheduling", 
                description: "Create task dependencies, set critical paths, and automatically adjust timelines when changes occur with intelligent algorithms. Our system identifies resource conflicts before they happen and keeps your team informed about upcoming work.", 
                icon: <Clock className="h-6 w-6" />,
                delay: "delay-300"
              },
              { 
                title: "Safety Compliance", 
                description: "Conduct digital safety inspections, document hazards, and track incident reports from one centralized platform. Our system automatically generates safety documentation for regulatory submissions and provides instant access to records during audits.", 
                icon: <Shield className="h-6 w-6" />,
                delay: "delay-100"
              },
              { 
                title: "Inventory Control", 
                description: "Track materials from procurement to installation and monitor equipment usage across job sites with automatic purchase order generation. Our analytics identify opportunities to negotiate better pricing with suppliers and optimize procurement strategies.", 
                icon: <PieChart className="h-6 w-6" />,
                delay: "delay-200"
              },
              { 
                title: "Report Generation", 
                description: "Transform raw data into actionable insights with customized reports for different stakeholders and scheduled automatic distribution. Export in multiple formats including PDF, Excel, and interactive web dashboards for comprehensive project visibility.", 
                icon: <CheckCircle className="h-6 w-6" />,
                delay: "delay-300"
              },
            ].map((feature, index) => (
              <Card key={index} className={`hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 duration-700 ${feature.delay} bg-white/80 backdrop-blur-sm border-0 shadow-lg`}>
                <CardHeader className="pb-4">
                  <div className="bg-gradient-to-br from-construction-navy to-construction-blue text-white p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-construction-navy transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Help Center Section */}
      <div className="animate-in fade-in-0 duration-1000">
        <HelpCenter />
      </div>

      {/* Enhanced Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-20 px-4 bg-gradient-to-br from-construction-navy/5 via-transparent to-construction-blue/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-in fade-in-0 duration-1000">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-construction-navy to-construction-blue bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Choose the plan that's right for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Free",
                price: `${currencySymbol}0`,
                description: "Perfect for small teams with a single project",
                features: [
                  "1 active project",
                  "Up to 5 team members",
                  "Upload and share documents (limited to 1GB)",
                  "Email notifications for tasks and updates",
                  "5GB storage limit"
                ],
                delay: "delay-100"
              },
              {
                title: "Basic",
                price: getCurrencyPrice("$39.99"),
                description: "For growing construction businesses",
                features: [
                  "Up to 5 active projects",
                  "10 team members",
                  "Gantt chart view",
                  "Calendar integration",
                  "Standard reporting",
                  "Email support",
                  "15GB file storage"
                ],
                delay: "delay-200"
              },
              {
                title: "Professional",
                price: getCurrencyPrice("$99"),
                description: "Ideal for mid-sized construction companies",
                features: [
                  "Up to 30 active projects",
                  "30 team members",
                  "Gantt chart view",
                  "Calendar integration",
                  "Task automation & reminders",
                  "Advanced reporting mechanisms",
                  "Priority email support",
                  "50GB file storage",
                  "Custom reports"
                ],
                recommended: true,
                delay: "delay-300"
              },
              {
                title: "Enterprise",
                price: getCurrencyPrice("$199"),
                description: "For large companies with complex requirements",
                features: [
                  "Unlimited projects",
                  "Unlimited team members",
                  "Gantt chart view",
                  "Calendar integration",
                  "Task automation & reminders",
                  "Slack integration",
                  "Trello integration",
                  "Custom advanced reports",
                  "Priority support",
                  "100GB file storage",
                  "API access",
                  "Advanced analytics"
                ],
                delay: "delay-400"
              }
            ].map((plan, index) => (
              <Card key={index} className={`${plan.recommended ? "border-2 border-construction-navy relative shadow-xl scale-105 bg-white" : "hover:shadow-xl bg-white/90 backdrop-blur-sm border-0 shadow-lg"} hover:-translate-y-2 transition-all duration-300 animate-in slide-in-from-bottom-4 duration-700 ${plan.delay}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 w-full text-center transform">
                    <span className="bg-gradient-to-r from-construction-navy to-construction-blue text-white px-6 py-2 text-sm rounded-full shadow-lg font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className={plan.recommended ? "pt-8 bg-gradient-to-br from-construction-navy to-construction-blue text-white rounded-t-lg" : ""}>
                  <CardTitle className={`text-xl font-bold ${plan.recommended ? "text-white" : ""}`}>{plan.title}</CardTitle>
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-bold ${plan.recommended ? "text-white" : ""}`}>{plan.price}</span>
                    <span className={`${plan.recommended ? "text-white/80" : "text-muted-foreground"} mb-1 text-lg`}>/month</span>
                  </div>
                  <CardDescription className={`${plan.recommended ? "text-white/80" : ""} text-base`}>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-construction-navy flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.recommended ? "bg-construction-navy hover:bg-construction-darkBlue shadow-lg" : "hover:bg-construction-navy hover:text-white"} transition-all duration-300 py-6 text-base font-semibold`}
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => handleGetStarted(plan.title)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Email Collection Dialog */}
      <Dialog open={subscribeDialogOpen} onOpenChange={setSubscribeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe to {selectedPlan} Plan</DialogTitle>
            <DialogDescription>
              Enter your email to get started with our {selectedPlan} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subscribeEmail">Email</Label>
              <Input
                id="subscribeEmail"
                placeholder="your.email@example.com"
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubscribeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubscribe}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @keyframes fade-in-0 {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-in-from-bottom-4 {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .fade-in-0 {
          animation: fade-in-0 0.6s ease-out;
        }
        
        .slide-in-from-bottom-4 {
          animation: slide-in-from-bottom-4 0.8s ease-out;
        }
        
        .duration-300 {
          animation-duration: 0.3s;
        }
        
        .duration-700 {
          animation-duration: 0.7s;
        }
        
        .duration-1000 {
          animation-duration: 1s;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
