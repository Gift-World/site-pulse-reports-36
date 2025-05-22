
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="mb-8">
        <p className="text-muted-foreground">
          Find answers to commonly asked questions about SitePlann. If you can't find what you're looking for, 
          please contact our support team at support@siteplann.com.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">What is SitePlann?</AccordionTrigger>
          <AccordionContent className="pb-4">
            SitePlann is a comprehensive construction management platform designed to streamline project workflows, 
            improve team coordination, and enhance overall efficiency on construction sites. It offers features for project management, 
            task scheduling, inventory tracking, safety compliance, reporting, and more.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">How do I get started with SitePlann?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Getting started is easy. Simply sign up for an account on our website, choose your subscription plan, 
            and follow the guided setup process. You'll be able to create your first project, add team members, 
            and start utilizing our features right away. We also offer onboarding support and tutorials to help you get familiar with the platform.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">What subscription plans do you offer?</AccordionTrigger>
          <AccordionContent className="pb-4">
            SitePlann offers four subscription tiers:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Free:</strong> For small teams with a single project (up to 5 team members, 1 active project, 5GB storage)</li>
              <li><strong>Basic ($29.99/month):</strong> For growing businesses (up to 10 team members, 5 active projects, 15GB storage)</li>
              <li><strong>Professional ($99/month):</strong> For mid-sized companies (up to 30 team members, 30 active projects, 50GB storage)</li>
              <li><strong>Enterprise ($199/month):</strong> For large organizations (unlimited team members and projects, 100GB storage, dedicated support)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">Can I access SitePlann on mobile devices?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Yes, SitePlann is fully responsive and can be accessed on any device with a web browser. 
            We also offer dedicated mobile apps for iOS and Android, allowing your team to stay connected 
            and productive even when they're on the go or at construction sites without desktop access.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">How secure is my data on SitePlann?</AccordionTrigger>
          <AccordionContent className="pb-4">
            We take data security very seriously. SitePlann uses industry-standard encryption for all data in transit 
            and at rest. We implement strict access controls, regular security audits, and comply with relevant data 
            protection regulations. Your project information is backed up regularly, and we maintain comprehensive 
            disaster recovery procedures.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">Can I customize reports in SitePlann?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Absolutely! SitePlann offers a variety of report templates (daily site reports, safety reports, 
            weather reports, meeting minutes, etc.) that can be customized to suit your needs. You can select 
            which data fields to include, add company branding, and export reports in multiple formats. 
            The Professional and Enterprise plans also offer advanced reporting capabilities with custom fields and analytics.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-7" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">How does the inventory tracking system work?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Our inventory management system allows you to track materials, equipment, and tools across all your projects and yards. 
            You can record deliveries, transfers between sites, consumption, and returns. The system provides real-time visibility 
            into your inventory levels, generates alerts for low stock, and produces detailed reports to help optimize your procurement 
            and resource allocation.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-8" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">Can consultants and subcontractors access the platform?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Yes, SitePlann supports collaboration with external partners. You can invite consultants, subcontractors, 
            and clients to specific projects with customized permission levels. This ensures they only have access to the 
            information that's relevant to their role, while maintaining security and confidentiality for sensitive data.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-9" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">What kind of support does SitePlann offer?</AccordionTrigger>
          <AccordionContent className="pb-4">
            We offer multiple support channels including:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Email support for all plans</li>
              <li>Live chat support for Basic plans and above</li>
              <li>Priority phone support for Professional plans and above</li>
              <li>Dedicated account manager for Enterprise plans</li>
            </ul>
            Additionally, our Help Center provides comprehensive documentation, video tutorials, and best practice guides.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-10" className="border rounded-md px-4">
          <AccordionTrigger className="text-lg font-medium py-4">Can I export my data from SitePlann?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Yes, you can export your data at any time in various formats including CSV, Excel, and PDF. 
            This applies to project information, reports, inventory records, and other data stored in the system. 
            If you decide to discontinue using SitePlann, we provide tools to help you extract all your 
            information for migration to another system or for your records.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
