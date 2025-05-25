
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Project } from "@/types/project";

// Export the projects data so it can be imported by ProjectDetail
export const projects: Project[] = [
  {
    id: 1,
    name: "Downtown Office Complex",
    description: "Modern 15-story office building with retail space",
    status: "In Progress",
    progress: 65,
    timelapse: 70,
    team: 12,
    dueDate: "2024-12-31",
    location: "Downtown",
    client: "Metro Development Corp",
    budget: {
      total: 25000000,
      spent: 12500000,
      remaining: 12500000
    },
    tasks: {
      total: 150,
      completed: 98,
      overdue: 5
    },
    materials: {
      allocated: 85,
      used: 65
    },
    contacts: [
      { name: "John Smith", role: "Project Manager", phone: "+1-555-0123", email: "john.smith@metro.com" },
      { name: "Sarah Johnson", role: "Site Engineer", phone: "+1-555-0124", email: "sarah.j@metro.com" }
    ],
    milestones: [
      { name: "Foundation Complete", dueDate: "2024-03-15", status: "Completed" },
      { name: "Structure Complete", dueDate: "2024-08-30", status: "In Progress" },
      { name: "Final Inspection", dueDate: "2024-12-15", status: "Pending" }
    ]
  },
  {
    id: 2,
    name: "Residential Tower A",
    description: "Luxury apartment complex with 200 units",
    status: "In Progress",
    progress: 40,
    timelapse: 45,
    team: 18,
    dueDate: "2025-06-30",
    location: "Westside",
    client: "Urban Living LLC",
    budget: {
      total: 18000000,
      spent: 7200000,
      remaining: 10800000
    },
    tasks: {
      total: 200,
      completed: 80,
      overdue: 3
    },
    materials: {
      allocated: 60,
      used: 35
    },
    contacts: [
      { name: "Sarah Johnson", role: "Project Manager", phone: "+1-555-0125", email: "sarah.johnson@urban.com" }
    ],
    milestones: [
      { name: "Site Preparation", dueDate: "2024-02-28", status: "Completed" },
      { name: "Foundation Work", dueDate: "2024-09-15", status: "In Progress" }
    ]
  },
  {
    id: 3,
    name: "Shopping Center Renovation",
    description: "Complete renovation of existing shopping center",
    status: "Completed",
    progress: 100,
    timelapse: 100,
    team: 8,
    dueDate: "2024-03-15",
    location: "Suburbs",
    client: "Retail Properties Inc",
    budget: {
      total: 8500000,
      spent: 8200000,
      remaining: 300000
    },
    tasks: {
      total: 120,
      completed: 120,
      overdue: 0
    },
    materials: {
      allocated: 100,
      used: 98
    },
    contacts: [
      { name: "Mike Davis", role: "Project Manager", phone: "+1-555-0126", email: "mike.davis@retail.com" }
    ],
    milestones: [
      { name: "Demolition Complete", dueDate: "2023-10-15", status: "Completed" },
      { name: "Renovation Complete", dueDate: "2024-03-01", status: "Completed" }
    ],
    defectsLiability: {
      lapseDate: "2024-03-15",
      endDate: "2025-03-15"
    }
  },
  {
    id: 4,
    name: "Industrial Warehouse",
    description: "Large distribution center with loading docks",
    status: "Planning",
    progress: 0,
    timelapse: 0,
    team: 0,
    dueDate: "2025-02-28",
    location: "Industrial Park",
    client: "Logistics Solutions",
    budget: {
      total: 15000000,
      spent: 0,
      remaining: 15000000
    },
    tasks: {
      total: 180,
      completed: 0,
      overdue: 0
    },
    materials: {
      allocated: 0,
      used: 0
    },
    contacts: [
      { name: "Emily Chen", role: "Project Manager", phone: "+1-555-0127", email: "emily.chen@logistics.com" }
    ],
    milestones: [
      { name: "Permits Approved", dueDate: "2024-06-01", status: "Pending" },
      { name: "Ground Breaking", dueDate: "2024-07-01", status: "Pending" }
    ]
  }
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your construction projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Link key={project.id} to={`/app/projects/${project.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
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
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Budget: ${(project.budget.total / 1000000).toFixed(1)}M</span>
                    <span>Team: {project.team} members</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
