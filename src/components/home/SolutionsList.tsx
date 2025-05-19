
import React from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Construction, Building, Users, Shield, Book, List, Info } from "lucide-react";

interface SolutionsListProps {
  children: React.ReactNode;
}

export const SolutionsList = ({ children }: SolutionsListProps) => {
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
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="center">
        <div className="p-4 bg-construction-navy text-white">
          <h4 className="text-lg font-bold mb-1">ConstructPulse Solutions</h4>
          <p className="text-sm text-white/80">
            Comprehensive tools for everyone on your construction site
          </p>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="p-3 hover:bg-slate-50 rounded-md transition-colors flex items-start gap-3 border-b last:border-b-0"
            >
              <div className="p-2 bg-construction-navy/10 rounded-md text-construction-navy">
                {solution.icon}
              </div>
              <div>
                <h5 className="font-medium text-sm">{solution.title}</h5>
                <p className="text-sm text-muted-foreground mb-1">{solution.description}</p>
                <div className="text-xs font-medium text-construction-navy">
                  For: {solution.stakeholders}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
