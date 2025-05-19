
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HelpCenter = () => {
  return (
    <section id="help-center" className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Help Center</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to your questions and learn how to get the most out of ConstructPulse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-construction-navy/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-construction-navy" />
              </div>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Browse our comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Step-by-step instructions for all features, from basic setup to advanced workflows.
              </p>
              <Button variant="outline" className="w-full">View Documentation</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-construction-navy/10 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-construction-navy" />
              </div>
              <CardTitle>FAQs</CardTitle>
              <CardDescription>
                Answers to commonly asked questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Find quick answers to the most common questions about using ConstructPulse.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/faq">View FAQs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-construction-navy/10 flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-construction-navy" />
              </div>
              <CardTitle>Support</CardTitle>
              <CardDescription>
                Get help from our customer support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Contact our support team via email, chat, or phone for personalized assistance.
              </p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
