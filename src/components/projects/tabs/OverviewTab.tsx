
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, Building, Users, Calendar, Banknote, ClipboardCheck, Package, FileText, Pen, Phone, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    setIsEditingNotes(false);
    toast({
      title: "Notes Saved",
      description: "Project notes have been updated."
    });
  };

  // Key project contacts
  const keyContacts = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      email: "sarah.j@company.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg",
      initials: "SJ",
      bio: "Overseeing project execution and stakeholder coordination. 10+ years in construction management."
    },
    {
      name: "David Lee",
      role: "Site Engineer",
      email: "david.l@company.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg",
      initials: "DL",
      bio: "Responsible for technical aspects and quality control. Structural engineering specialist."
    },
    {
      name: "Michael Robinson",
      role: "Safety Officer",
      email: "michael.r@company.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg",
      initials: "MR",
      bio: "Ensuring compliance with safety regulations and protocols. Certified safety professional."
    }
  ];

  return (
    <TooltipProvider>
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
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center cursor-pointer hover:text-construction-blue transition-colors">
                        <User className="h-4 w-4 mr-2 text-construction-blue" />
                        <span>{project.client}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Client Information</h4>
                        <p className="text-sm text-muted-foreground">
                          Primary client for {project.name}. All major decisions and approvals are coordinated through this client.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          <span>client@{project.client?.toLowerCase().replace(/\s+/g, '')}.com</span>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center cursor-pointer hover:text-construction-blue transition-colors">
                        <Building className="h-4 w-4 mr-2 text-construction-blue" />
                        <span>{project.location}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Project Location</h4>
                        <p className="text-sm text-muted-foreground">
                          Primary construction site location. All on-site activities are coordinated from this address.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>Site coordinates available in project documents</span>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Team Size</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-pointer">
                        <Users className="h-4 w-4 mr-2 text-construction-blue" />
                        <span>{project.team} members</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total active team members assigned to this project</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-pointer">
                        <Calendar className="h-4 w-4 mr-2 text-construction-blue" />
                        <span>{project.dueDate}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Project completion deadline</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Budget</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center cursor-pointer hover:text-construction-blue transition-colors">
                        <Banknote className="h-4 w-4 mr-2 text-construction-blue" />
                        <span>${project.budget?.total.toLocaleString()}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Budget Breakdown</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Total Budget:</span>
                            <span className="font-medium">${project.budget?.total.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Spent:</span>
                            <span className="text-red-600">${project.budget?.spent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Remaining:</span>
                            <span className="text-green-600">${project.budget?.remaining.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Tasks</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-pointer">
                        <ClipboardCheck className="h-4 w-4 mr-2 text-construction-blue" />
                        <span>{project.tasks?.total} total tasks</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to view detailed task breakdown</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Materials Budget</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-pointer">
                        <Package className="h-4 w-4 mr-2 text-construction-blue" />
                        <span>${project.materials?.allocated.toLocaleString()} allocated</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Materials budget allocation for this project</p>
                    </TooltipContent>
                  </Tooltip>
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
          {/* Key Project Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Key Project Contacts</CardTitle>
              <CardDescription>Primary personnel for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyContacts.map((contact, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-construction-blue font-medium">{contact.role}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {contact.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{contact.name}</h4>
                            <p className="text-sm text-construction-blue">{contact.role}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.bio}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
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
    </TooltipProvider>
  );
};
