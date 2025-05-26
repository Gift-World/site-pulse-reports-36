
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SupportContactForm } from "./SupportContactForm";

export const HelpCenter = () => {
  return (
    <section id="help-center" className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-in fade-in-0 duration-1000">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-construction-navy to-construction-blue bg-clip-text text-transparent">
            Help Center
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Find answers to your questions and learn how to get the most out of SitePlann
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 duration-700 delay-100 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-construction-navy to-construction-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl font-bold group-hover:text-construction-navy transition-colors duration-300">Documentation</CardTitle>
              <CardDescription className="text-base">
                Browse our comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 leading-relaxed">
                Step-by-step instructions for all features, from basic setup to advanced workflows.
              </p>
              <Button variant="outline" className="w-full hover:bg-construction-navy hover:text-white transition-all duration-300">
                View Documentation
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 duration-700 delay-200 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-construction-navy to-construction-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl font-bold group-hover:text-construction-navy transition-colors duration-300">FAQs</CardTitle>
              <CardDescription className="text-base">
                Answers to commonly asked questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 leading-relaxed">
                Find quick answers to the most common questions about using SitePlann.
              </p>
              <Button variant="outline" className="w-full hover:bg-construction-navy hover:text-white transition-all duration-300" asChild>
                <Link to="/faq">View FAQs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 duration-700 delay-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-construction-navy to-construction-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Info className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl font-bold group-hover:text-construction-navy transition-colors duration-300">Support</CardTitle>
              <CardDescription className="text-base">
                Get help from our customer support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 leading-relaxed">
                Contact our support team via email for personalized assistance with any issues.
              </p>
              <SupportContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
