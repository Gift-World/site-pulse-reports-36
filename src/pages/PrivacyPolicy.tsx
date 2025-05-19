
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
      
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <section>
          <p className="text-muted-foreground">Last Updated: May 19, 2025</p>
          <p>This Privacy Policy explains how ConstructPulse ("we", "us", or "our") collects, uses, and discloses information about you when you use our website, mobile application, and other online products and services (collectively, the "Services").</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-4">Information You Provide to Us</h3>
          <p>We collect information you provide directly to us when you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create an account or user profile</li>
            <li>Fill in forms or fields on our Services</li>
            <li>Upload documents, images, or other files</li>
            <li>Communicate with us or other users</li>
            <li>Sign up for newsletters or promotions</li>
            <li>Complete surveys or questionnaires</li>
            <li>Submit support requests</li>
            <li>Provide feedback</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-4">Information We Collect Automatically</h3>
          <p>When you use our Services, we automatically collect certain information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Log Information: Server logs, IP address, browser type, pages visited</li>
            <li>Device Information: Hardware model, operating system, unique device identifiers</li>
            <li>Usage Information: How you use our Services, features you engage with</li>
            <li>Location Information: General location based on IP address</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our Services</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative messages, updates, and security alerts</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Provide customer service and technical support</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent security incidents</li>
            <li>Personalize and improve your experience</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Sharing of Information</h2>
          <p>We may share information about you as follows:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>With Other Users:</strong> Information you share with other users through the Services</li>
            <li><strong>With Vendors and Service Providers:</strong> Third parties that perform services on our behalf</li>
            <li><strong>For Legal Reasons:</strong> To comply with laws, respond to legal requests, protect rights</li>
            <li><strong>With Your Consent:</strong> With third parties when you have given us your consent</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Data Retention</h2>
          <p>We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying legal, accounting, or reporting requirements, or to resolve disputes.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accessing, correcting, or deleting your information</li>
            <li>Withdrawing consent</li>
            <li>Opting out of marketing communications</li>
            <li>Requesting a copy of your information</li>
          </ul>
          <p>To exercise these rights, please contact us using the information below.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Security</h2>
          <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no security system is impenetrable, and we cannot guarantee the security of our systems or your information.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Children's Privacy</h2>
          <p>Our Services are not directed to children under 16, and we do not knowingly collect personal information from children under 16. If you learn that a child has provided us with personal information, please contact us.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and, where appropriate, by email.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
          <p>Email: privacy@constructpulse.com</p>
          <p>Address: 123 Construction Way, Building 4, Suite 500, Metropolis, CA 90001</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
