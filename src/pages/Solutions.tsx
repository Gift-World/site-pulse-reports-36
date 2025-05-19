
import React from "react";
import { Construction, Building, Users, Shield, Book, List, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Solutions = () => {
  const navigate = useNavigate();
  
  const solutions = [
    {
      icon: <Construction className="h-5 w-5" />,
      title: "Site Management",
      description: "Centralized management of construction sites for project managers and supervisors",
      stakeholders: "Project Managers, Site Supervisors"
    },
    {
      icon: <Building className="h-5 w-5" />,
      title: "Project Tracking",
      description: "Real-time updates on project progress, tasks, and milestones",
      stakeholders: "Project Managers, Clients, Executives"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Coordination",
      description: "Streamlined communication and task assignment for all team members",
      stakeholders: "Workers, Subcontractors, Supervisors"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Safety Compliance",
      description: "Digital checklists and incident reporting to maintain safety standards",
      stakeholders: "Safety Officers, All Site Personnel"
    },
    {
      icon: <List className="h-5 w-5" />,
      title: "Inventory Management",
      description: "Track materials, equipment, and procurement in real-time",
      stakeholders: "Procurement Teams, Site Managers, Suppliers"
    },
    {
      icon: <Book className="h-5 w-5" />,
      title: "Documentation",
      description: "Centralized storage for plans, permits, and compliance documents",
      stakeholders: "Administrative Staff, Inspectors, Project Managers"
    },
    {
      icon: <Info className="h-5 w-5" />,
      title: "Reporting & Analytics",
      description: "Comprehensive data insights for project performance and optimization",
      stakeholders: "Executives, Project Managers, Clients"
    }
  ];

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">ConstructPulse Solutions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive tools for everyone on your construction site
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution, index) => (
          <div 
            key={index} 
            className="border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-construction-navy/10 rounded-md text-construction-navy">
                {solution.icon}
              </div>
              <h3 className="text-lg font-medium">{solution.title}</h3>
            </div>
            <p className="text-muted-foreground mb-3">{solution.description}</p>
            <div className="text-sm font-medium text-construction-navy">
              For: {solution.stakeholders}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button 
          onClick={() => navigate("/")} 
          className="bg-construction-navy hover:bg-construction-darkBlue"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Solutions;
