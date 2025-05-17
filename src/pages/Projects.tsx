
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Plus, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    name: "Riverfront Commercial Complex",
    description: "12-story commercial building with underground parking",
    status: "In Progress",
    progress: 65,
    team: 28,
    dueDate: "Dec 15, 2025"
  },
  {
    id: 2,
    name: "Parkview Residential Towers",
    description: "Twin 20-story residential towers with amenities",
    status: "In Progress",
    progress: 42,
    team: 35,
    dueDate: "Mar 30, 2026"
  },
  {
    id: 3,
    name: "Downtown Hotel Renovation",
    description: "Complete renovation of historic 8-story hotel",
    status: "Planning",
    progress: 10,
    team: 15,
    dueDate: "Aug 22, 2025"
  },
  {
    id: 4,
    name: "City Center Shopping Mall",
    description: "3-level shopping mall with food court and cinema",
    status: "Completed",
    progress: 100,
    team: 0,
    dueDate: "Completed Apr 2025"
  }
];

const Projects = () => {
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
                    indicatorColor={
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
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
