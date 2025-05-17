
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Plus, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";

const projects: Project[] = [
  {
    id: 1,
    name: "Riverfront Commercial Complex",
    description: "12-story commercial building with underground parking",
    status: "In Progress",
    progress: 65,
    team: 28,
    dueDate: "Dec 15, 2025",
    location: "Riverside Business District",
    client: "Riverview Developments Ltd.",
    budget: {
      total: 25000000,
      spent: 16250000,
      remaining: 8750000
    },
    tasks: {
      total: 312,
      completed: 203,
      overdue: 5
    },
    materials: {
      allocated: 5800000,
      used: 3770000
    },
    contacts: [
      {
        name: "Michael Chen",
        role: "Project Manager",
        phone: "555-123-4567",
        email: "mchen@riverviewdev.com"
      },
      {
        name: "Sarah Johnson",
        role: "Client Representative",
        phone: "555-987-6543",
        email: "sjohnson@riverviewdev.com"
      }
    ],
    milestones: [
      {
        name: "Foundation Completed",
        dueDate: "Feb 28, 2025",
        status: "Completed"
      },
      {
        name: "Structural Steel",
        dueDate: "Jun 15, 2025",
        status: "Completed"
      },
      {
        name: "Building Envelope",
        dueDate: "Sep 30, 2025",
        status: "In Progress"
      },
      {
        name: "Interior Finishes",
        dueDate: "Nov 30, 2025",
        status: "Pending"
      }
    ],
    notes: "Currently ahead of schedule. Budget review meeting scheduled for next month. Safety inspection passed with excellent remarks."
  },
  {
    id: 2,
    name: "Parkview Residential Towers",
    description: "Twin 20-story residential towers with amenities",
    status: "In Progress",
    progress: 42,
    team: 35,
    dueDate: "Mar 30, 2026",
    location: "Northern Heights District",
    client: "Parkway Housing Corporation",
    budget: {
      total: 35000000,
      spent: 14700000,
      remaining: 20300000
    },
    tasks: {
      total: 450,
      completed: 189,
      overdue: 12
    },
    materials: {
      allocated: 12800000,
      used: 5376000
    },
    contacts: [
      {
        name: "David Wong",
        role: "Site Manager",
        phone: "555-234-5678",
        email: "dwong@parkwayhousing.com"
      },
      {
        name: "Lisa Fernandez",
        role: "Architectural Lead",
        phone: "555-345-6789",
        email: "lfernandez@parkwayhousing.com"
      }
    ],
    milestones: [
      {
        name: "Site Preparation",
        dueDate: "Oct 15, 2024",
        status: "Completed"
      },
      {
        name: "Tower A Foundation",
        dueDate: "Jan 20, 2025",
        status: "Completed"
      },
      {
        name: "Tower B Foundation",
        dueDate: "Mar 15, 2025",
        status: "Completed"
      },
      {
        name: "Tower A Core Structure",
        dueDate: "Aug 30, 2025",
        status: "In Progress"
      },
      {
        name: "Tower B Core Structure",
        dueDate: "Oct 15, 2025",
        status: "Pending"
      }
    ],
    notes: "Experiencing some delays due to material shortages. Cost mitigation strategy in place. Community relations team addressing resident concerns about construction noise."
  },
  {
    id: 3,
    name: "Downtown Hotel Renovation",
    description: "Complete renovation of historic 8-story hotel",
    status: "Planning",
    progress: 10,
    team: 15,
    dueDate: "Aug 22, 2025",
    location: "City Center",
    client: "Heritage Hotels Inc.",
    budget: {
      total: 12500000,
      spent: 1250000,
      remaining: 11250000
    },
    tasks: {
      total: 280,
      completed: 28,
      overdue: 0
    },
    materials: {
      allocated: 4300000,
      used: 430000
    },
    contacts: [
      {
        name: "Robert Garcia",
        role: "Renovation Specialist",
        phone: "555-456-7890",
        email: "rgarcia@heritagehotels.com"
      },
      {
        name: "Emma Lee",
        role: "Historical Preservation Consultant",
        phone: "555-567-8901",
        email: "elee@heritagehotels.com"
      }
    ],
    milestones: [
      {
        name: "Permit Approvals",
        dueDate: "Jun 10, 2025",
        status: "In Progress"
      },
      {
        name: "Interior Demolition",
        dueDate: "Jul 30, 2025",
        status: "Pending"
      }
    ],
    notes: "Working closely with historical preservation board to ensure all renovations maintain the building's historical integrity. Specialized materials on order."
  },
  {
    id: 4,
    name: "City Center Shopping Mall",
    description: "3-level shopping mall with food court and cinema",
    status: "Completed",
    progress: 100,
    team: 0,
    dueDate: "Completed Apr 2025",
    location: "Westside Commercial District",
    client: "Metro Retail Developments",
    budget: {
      total: 18500000,
      spent: 17800000,
      remaining: 700000
    },
    tasks: {
      total: 325,
      completed: 325,
      overdue: 0
    },
    materials: {
      allocated: 7200000,
      used: 7200000
    },
    contacts: [
      {
        name: "Jennifer Smith",
        role: "Project Coordinator",
        phone: "555-678-9012",
        email: "jsmith@metroretail.com"
      }
    ],
    milestones: [
      {
        name: "Project Completion",
        dueDate: "Apr 15, 2025",
        status: "Completed"
      }
    ],
    notes: "Project completed on schedule and under budget. Final client walkthrough resulted in excellent feedback. Warranty period in effect for 12 months."
  }
];

const Projects = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your construction projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{project.name}</CardTitle>
                <Badge
                  variant={
                    project.status === "Completed" ? "outline" :
                    project.status === "In Progress" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress
                    value={project.progress}
                    className="h-2"
                    indicatorClassName={
                      project.progress === 100 ? "bg-construction-green" :
                      project.progress > 50 ? "bg-construction-blue" : "bg-construction-orange"
                    }
                  />
                </div>
                
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{project.team} Team members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{project.dueDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { projects }; // Export the projects data
export default Projects;
