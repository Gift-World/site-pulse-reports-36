import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Project } from "@/types/project";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { EditProjectForm } from "@/components/projects/EditProjectForm";
import { toast } from "@/hooks/use-toast";

// Export the projects data so it can be imported by ProjectDetail
export const initialProjects: Project[] = [
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

export const projects = initialProjects;

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  
  const filteredProjects = projectsList.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditProject = (projectId: number) => {
    const project = projectsList.find(p => p.id === projectId);
    if (project) {
      setEditingProject(project);
    }
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjectsList(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: number, projectName: string) => {
    // In a real app, this would require admin approval
    toast({
      title: "Admin Approval Required",
      description: "Delete request sent to admin for approval.",
    });
    
    // Simulate admin approval and delete
    setTimeout(() => {
      setProjectsList(prev => prev.filter(p => p.id !== projectId));
      toast({
        title: "Project Deleted",
        description: `Project "${projectName}" has been permanently deleted.`,
        variant: "destructive",
      });
    }, 2000);
  };

  const getBudgetSpendPercentage = (project: Project) => {
    if (!project.budget || project.budget.total === 0) return 0;
    return Math.round((project.budget.spent / project.budget.total) * 100);
  };

  const getBudgetSpendColor = (percentage: number) => {
    if (percentage <= 50) return "bg-green-600";
    if (percentage <= 75) return "bg-yellow-600";
    if (percentage <= 90) return "bg-orange-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your construction projects
          </p>
        </div>
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <NewProjectForm onComplete={() => setIsNewProjectOpen(false)} />
          </DialogContent>
        </Dialog>
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
        {filteredProjects.map((project) => {
          const budgetSpendPercentage = getBudgetSpendPercentage(project);
          const budgetSpendColor = getBudgetSpendColor(budgetSpendPercentage);
          
          return (
            <Card key={project.id} className="hover:shadow-lg transition-shadow relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditProject(project.id);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => e.preventDefault()}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{project.name}"? This action requires admin approval and cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteProject(project.id, project.name)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Request Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
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
                <div className="space-y-3">
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
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Spent</span>
                      <span>{budgetSpendPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${budgetSpendColor}`}
                        style={{ width: `${budgetSpendPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Budget: ${(project.budget!.total / 1000000).toFixed(1)}M</span>
                    <span>Team: {project.team} members</span>
                  </div>
                  
                  <div className="pt-2">
                    <Link to={`/app/projects/${project.id}`}>
                      <Button className="w-full" variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details below.
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <EditProjectForm 
              project={editingProject} 
              onComplete={handleUpdateProject}
              onCancel={() => setEditingProject(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
