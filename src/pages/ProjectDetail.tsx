
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Calendar, Building, User, Banknote, ClipboardCheck, Package, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "./Projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === Number(id));
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>
    );
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="outline" className="bg-green-50 text-construction-green">Completed</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-50 text-construction-blue">In Progress</Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-50 text-construction-orange">Pending</Badge>;
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <Badge
                variant={
                  project.status === "Completed" ? "outline" :
                  project.status === "In Progress" ? "default" : "secondary"
                }
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {project.description}
            </p>
          </div>
          
          {project.status !== "Completed" && (
            <Button>
              Edit Project
            </Button>
          )}
        </div>
      </div>
      
      {/* Key Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {project.progress}%
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                ${project.budget?.spent.toLocaleString()}
                <span className="text-sm text-muted-foreground font-normal ml-2">
                  of ${project.budget?.total.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={(project.budget?.spent || 0) / (project.budget?.total || 1) * 100} 
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                ${project.budget?.remaining.toLocaleString()} remaining
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {project.tasks?.completed}
                <span className="text-sm text-muted-foreground font-normal ml-2">
                  of {project.tasks?.total} tasks
                </span>
              </div>
              <Progress 
                value={(project.tasks?.completed || 0) / (project.tasks?.total || 1) * 100} 
                className="h-2"
                indicatorClassName="bg-construction-green"
              />
              {project.tasks?.overdue ? (
                <p className="text-sm text-construction-red">
                  {project.tasks.overdue} overdue tasks
                </p>
              ) : (
                <p className="text-sm text-construction-green">
                  No overdue tasks
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Client</h3>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.client}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Team Size</h3>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.team} members</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.dueDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Budget</h3>
                    <div className="flex items-center">
                      <Banknote className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>${project.budget?.total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tasks</h3>
                    <div className="flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.tasks?.total} total tasks</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Materials Budget</h3>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>${project.materials?.allocated.toLocaleString()} allocated</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {project.notes && (
                <>
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-1 text-construction-blue" />
                      <p>{project.notes}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Contacts</CardTitle>
                <CardDescription>Key people for this project</CardDescription>
              </CardHeader>
              <CardContent>
                {project.contacts?.length ? (
                  <div className="space-y-4">
                    {project.contacts.map((contact, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground mb-1">{contact.role}</div>
                        <div className="text-sm">{contact.email}</div>
                        <div className="text-sm">{contact.phone}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center py-4">
                    No contacts available
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Key Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Key Milestones</CardTitle>
                <CardDescription>Major project milestones</CardDescription>
              </CardHeader>
              <CardContent>
                {project.milestones?.length ? (
                  <div className="space-y-4">
                    {project.milestones.slice(0, 3).map((milestone, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-sm text-muted-foreground">{milestone.dueDate}</div>
                        </div>
                        {getStatusBadge(milestone.status)}
                      </div>
                    ))}
                    {project.milestones.length > 3 && (
                      <Button variant="ghost" className="w-full" onClick={() => document.querySelector('[data-value="milestones"]')?.click()}>
                        View All Milestones
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center py-4">
                    No milestones available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>All milestones for this project</CardDescription>
            </CardHeader>
            <CardContent>
              {project.milestones?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Milestone</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.milestones.map((milestone, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{milestone.name}</TableCell>
                        <TableCell>{milestone.dueDate}</TableCell>
                        <TableCell>{getStatusBadge(milestone.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-muted-foreground text-center py-4">
                  No milestones available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
              <CardDescription>All team members working on this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Team details coming soon</p>
                <p className="text-sm text-muted-foreground mt-2">Current team size: {project.team} members</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <CardDescription>Contract, specifications, drawings and other documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Document management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
