
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
      
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>By accessing or using SitePlann ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
          <p>SitePlann is a construction management platform that provides tools for project management, team coordination, task scheduling, inventory management, safety compliance, and reporting.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">3. User Accounts</h2>
          <p>To use certain features of the Service, you must register for an account. You agree to provide accurate information and keep it updated. You are responsible for maintaining the security of your account and password.</p>
          <p>You may not share your account credentials with others or allow multiple users to use your account. You are responsible for all activities that occur under your account.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">4. Subscription and Fees</h2>
          <p>SitePlann offers various subscription plans. You agree to pay the fees associated with your chosen subscription plan. Fees are non-refundable except as required by law or as explicitly stated in these terms.</p>
          <p>We reserve the right to change our fees at any time with reasonable notice before changes take effect.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">5. Data and Privacy</h2>
          <p>Our Privacy Policy explains how we collect, use, and protect your information. By using SitePlann, you agree to our data practices as described in our Privacy Policy.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">6. User Content</h2>
          <p>You retain ownership of any content you upload to the Service. However, by uploading content, you grant SitePlann a worldwide, non-exclusive license to use, store, and display that content for the purpose of providing the Service.</p>
          <p>You agree not to upload content that infringes on anyone's rights or violates any laws.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">7. Prohibited Uses</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Reverse engineer or attempt to extract the source code of the Service</li>
            <li>Use the Service to store or transmit harmful code</li>
            <li>Use automated systems to access the Service without our permission</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">8. Termination</h2>
          <p>We may terminate or suspend your account at any time, without prior notice, for conduct that we determine violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
          <p>We may modify these Terms at any time. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use of the Service after changes take effect constitutes your acceptance of the revised Terms.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">10. Disclaimer of Warranties</h2>
          <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">11. Limitation of Liability</h2>
          <p>IN NO EVENT SHALL SITEPLANN BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">12. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we are based, without regard to its conflict of law provisions.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">13. Contact</h2>
          <p>If you have any questions about these Terms, please contact us at legal@siteplann.com.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
