import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, Users, Clock, Shield, PieChart, CheckCircle, Book, List, Slack, Trello, Calendar, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HelpCenter } from "@/components/home/HelpCenter";
import { SolutionsList } from "@/components/home/SolutionsList";
import { useCurrency } from "./Settings";
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
    <div className="space-y-12">
      {/* Hero Section with Construction Background */}
      <HeroSection onScrollToPricing={() => scrollToSection(pricingRef)} />

      {/* Why SitePlann */}
      <div ref={featuresRef}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why SitePlann?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SitePlann streamlines construction project management, eliminating communication gaps, 
              reducing delays, and ensuring your projects are delivered on time and within budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center rounded-lg opacity-10"></div>
              <Card className="relative z-10 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-construction-navy/10 flex items-center justify-center mb-2">
                    <Clock className="text-construction-navy h-6 w-6" />
                  </div>
                  <CardTitle>Save Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Reduce administrative work by up to 60% with automated reporting and task management</p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center rounded-lg opacity-10"></div>
              <Card className="relative z-10 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-construction-navy/10 flex items-center justify-center mb-2">
                    <PieChart className="text-construction-navy h-6 w-6" />
                  </div>
                  <CardTitle>Cut Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Lower project costs by 15-20% through improved resource planning and inventory management</p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center rounded-lg opacity-10"></div>
              <Card className="relative z-10 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-lg bg-construction-navy/10 flex items-center justify-center mb-2">
                    <CheckCircle className="text-construction-navy h-6 w-6" />
                  </div>
                  <CardTitle>Increase Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Maintain higher quality standards with comprehensive safety checks and detailed quality control</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your construction projects from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Real-time Dashboard", 
                description: "Track KPIs, monitor progress against timeline and budget, and identify potential issues with customizable views. Our interactive charts focus on metrics that matter most to your team and stakeholders.", 
                icon: <ChartBar className="h-5 w-5" />
              },
              { 
                title: "Team Management", 
                description: "Effortlessly assign team members to specific tasks while tracking performance and optimizing resource allocation across projects. Our communication features ensure accountability and reduce delays throughout construction operations.", 
                icon: <Users className="h-5 w-5" />
              },
              { 
                title: "Task Scheduling", 
                description: "Create task dependencies, set critical paths, and automatically adjust timelines when changes occur with intelligent algorithms. Our system identifies resource conflicts before they happen and keeps your team informed about upcoming work.", 
                icon: <Clock className="h-5 w-5" />
              },
              { 
                title: "Safety Compliance", 
                description: "Conduct digital safety inspections, document hazards, and track incident reports from one centralized platform. Our system automatically generates safety documentation for regulatory submissions and provides instant access to records during audits.", 
                icon: <Shield className="h-5 w-5" />
              },
              { 
                title: "Inventory Control", 
                description: "Track materials from procurement to installation and monitor equipment usage across job sites with automatic purchase order generation. Our analytics identify opportunities to negotiate better pricing with suppliers and optimize procurement strategies.", 
                icon: <PieChart className="h-5 w-5" />
              },
              { 
                title: "Report Generation", 
                description: "Transform raw data into actionable insights with customized reports for different stakeholders and scheduled automatic distribution. Export in multiple formats including PDF, Excel, and interactive web dashboards for comprehensive project visibility.", 
                icon: <CheckCircle className="h-5 w-5" />
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="bg-construction-navy text-white p-2 rounded-md inline-block mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Center Section */}
      <HelpCenter />

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                ]
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
                ]
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
                recommended: true
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
                ]
              }
            ].map((plan, index) => (
              <Card key={index} className={plan.recommended ? "border-construction-navy relative shadow-md" : ""}>
                {plan.recommended && (
                  <div className="absolute top-0 w-full text-center transform -translate-y-1/2">
                    <span className="bg-construction-navy text-white px-4 py-1 text-sm rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className={plan.recommended ? "pt-8 bg-construction-navy text-white rounded-t-lg" : ""}>
                  <CardTitle className={plan.recommended ? "text-white" : ""}>{plan.title}</CardTitle>
                  <div className="flex items-end gap-1">
                    <span className={`text-3xl font-bold ${plan.recommended ? "text-white" : ""}`}>{plan.price}</span>
                    <span className={`${plan.recommended ? "text-white/80" : "text-muted-foreground"} mb-1`}>/month</span>
                  </div>
                  <CardDescription className={plan.recommended ? "text-white/80" : ""}>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-construction-navy flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={plan.recommended ? "w-full bg-construction-navy hover:bg-construction-darkBlue" : "w-full"}
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

      {/* CTA Section */}
      <section className="py-16 bg-construction-navy text-white rounded-lg px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="text-center space-y-6 relative z-10">
          <h2 className="text-3xl font-bold">Ready to transform your construction business?</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Join thousands of construction professionals who are already using ConstructPulse to streamline their operations.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-construction-navy hover:bg-white/90"
            onClick={() => navigate("/settings")}
          >
            Get Started Today
          </Button>
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
    </div>
  );
};

export default Home;
