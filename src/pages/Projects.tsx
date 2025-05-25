
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
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    budget: 25000000,
    spent: 12500000,
    progress: 65,
    location: "Downtown",
    client: "Metro Development Corp",
    manager: "John Smith"
  },
  {
    id: 2,
    name: "Residential Tower A",
    description: "Luxury apartment complex with 200 units",
    status: "In Progress",
    startDate: "2024-02-01",
    endDate: "2025-06-30",
    budget: 18000000,
    spent: 7200000,
    progress: 40,
    location: "Westside",
    client: "Urban Living LLC",
    manager: "Sarah Johnson"
  },
  {
    id: 3,
    name: "Shopping Center Renovation",
    description: "Complete renovation of existing shopping center",
    status: "Completed",
    startDate: "2023-08-01",
    endDate: "2024-03-15",
    budget: 8500000,
    spent: 8200000,
    progress: 100,
    location: "Suburbs",
    client: "Retail Properties Inc",
    manager: "Mike Davis"
  },
  {
    id: 4,
    name: "Industrial Warehouse",
    description: "Large distribution center with loading docks",
    status: "Planning",
    startDate: "2024-06-01",
    endDate: "2025-02-28",
    budget: 15000000,
    spent: 0,
    progress: 0,
    location: "Industrial Park",
    client: "Logistics Solutions",
    manager: "Emily Chen"
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
                    <span>Budget: ${(project.budget / 1000000).toFixed(1)}M</span>
                    <span>Manager: {project.manager}</span>
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
