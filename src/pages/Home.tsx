
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, Users, Clock, Shield, PieChart, CheckCircle, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-construction-navy">Construct</span>Pulse
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          The all-in-one construction management platform that puts your projects on autopilot
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg" 
            className="bg-construction-navy hover:bg-construction-darkBlue"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("#features")}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Why ConstructPulse */}
      <section id="why" className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why ConstructPulse?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ConstructPulse streamlines construction project management, eliminating communication gaps, 
            reducing delays, and ensuring your projects are delivered on time and within budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
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

          <Card>
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

          <Card>
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
      </section>

      {/* Features Section */}
      <section id="features" className="py-8">
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
              description: "Get a bird's-eye view of all your project metrics and KPIs in one place",
              icon: <ChartBar className="h-5 w-5" />
            },
            { 
              title: "Team Management", 
              description: "Easily organize your crew, assign roles and track performance",
              icon: <Users className="h-5 w-5" />
            },
            { 
              title: "Task Scheduling", 
              description: "Create, assign, and track tasks with our intuitive interface",
              icon: <Clock className="h-5 w-5" />
            },
            { 
              title: "Safety Compliance", 
              description: "Ensure your site meets all safety regulations and standards",
              icon: <Shield className="h-5 w-5" />
            },
            { 
              title: "Inventory Control", 
              description: "Track materials, equipment, and procurement in real-time",
              icon: <PieChart className="h-5 w-5" />
            },
            { 
              title: "Report Generation", 
              description: "Generate professional reports with just a few clicks",
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
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-8">
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
              price: "$0",
              description: "Perfect for small teams with a single project",
              features: [
                "1 active project",
                "Up to 5 team members",
                "Basic reporting",
                "1GB storage",
                "Community support"
              ]
            },
            {
              title: "Basic",
              price: "$29.99",
              description: "For growing construction businesses",
              features: [
                "Up to 5 active projects",
                "10 team members",
                "Standard reporting",
                "Email support",
                "5GB file storage"
              ]
            },
            {
              title: "Professional",
              price: "$99",
              description: "Ideal for mid-sized construction companies",
              features: [
                "Up to 30 active projects",
                "30 team members",
                "Advanced reporting",
                "Priority support",
                "25GB file storage",
                "Custom reports"
              ],
              recommended: true
            },
            {
              title: "Enterprise",
              price: "$199",
              description: "For large companies with complex requirements",
              features: [
                "Unlimited projects",
                "Unlimited team members",
                "Custom reports",
                "Dedicated account manager",
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
                      <CheckCircle className="h-4 w-4 text-construction-navy" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={plan.recommended ? "w-full bg-construction-navy hover:bg-construction-darkBlue" : "w-full"}
                  variant={plan.recommended ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-construction-navy text-white rounded-lg px-6">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to transform your construction business?</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Join thousands of construction professionals who are already using ConstructPulse to streamline their operations.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-construction-navy hover:bg-white/90"
            onClick={() => navigate("/dashboard")}
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
