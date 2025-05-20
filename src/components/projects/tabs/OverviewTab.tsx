
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, Building, Users, Calendar, Banknote, ClipboardCheck, Package, FileText, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface OverviewTabProps {
  project: Project;
  setActiveTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ project, setActiveTab }) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(project.notes || "");
  
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

  const handleSaveNotes = () => {
    // In a real app, we would save this to the database
    setIsEditingNotes(false);
    toast({
      title: "Notes Saved",
      description: "Project notes have been updated."
    });
  };

  return (
    <div className="space-y-4">
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
          
          {(notes || project.notes) && (
            <>
              <Separator className="my-6" />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                  {!isEditingNotes ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditingNotes(true)}
                      className="h-6 w-6 p-0"
                    >
                      <Pen className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSaveNotes}
                      className="text-xs"
                    >
                      Save
                    </Button>
                  )}
                </div>
                {!isEditingNotes ? (
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-1 text-construction-blue" />
                    <p>{notes}</p>
                  </div>
                ) : (
                  <Textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                )}
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
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-4">
                No milestones available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
