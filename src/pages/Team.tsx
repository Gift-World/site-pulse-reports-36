
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, UserPlus, MessageCircle, UserX, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// Sample data for projects
const projects = [
  { id: 1, name: "Central Business District Tower" },
  { id: 2, name: "Riverside Commercial Complex" },
  { id: 3, name: "Oakwood Residential Development" },
  { id: 4, name: "Harbor Bridge Reconstruction" },
];

// Enhanced team members data with project assignments
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg",
    initials: "SJ",
    projects: [1, 2],
    phone: "+1 (555) 123-4567",
    department: "Management",
    bio: "Experienced project manager with over 10 years in commercial construction."
  },
  {
    id: 2,
    name: "David Lee",
    role: "Site Engineer",
    email: "david.l@example.com",
    avatar: "/placeholder.svg",
    initials: "DL",
    projects: [1, 3],
    phone: "+1 (555) 234-5678",
    department: "Engineering",
    bio: "Civil engineer specializing in structural design and site planning."
  },
  {
    id: 3,
    name: "Michael Robinson",
    role: "Safety Officer",
    email: "michael.r@example.com",
    avatar: "/placeholder.svg",
    initials: "MR",
    projects: [1, 2, 4],
    phone: "+1 (555) 345-6789",
    department: "Health & Safety",
    bio: "Certified safety professional focused on maintaining high safety standards."
  },
  {
    id: 4,
    name: "Jennifer Chen",
    role: "Architect",
    email: "jennifer.c@example.com",
    avatar: "/placeholder.svg",
    initials: "JC",
    projects: [2, 3],
    phone: "+1 (555) 456-7890",
    department: "Design",
    bio: "Award-winning architect with expertise in sustainable commercial buildings."
  },
  {
    id: 5,
    name: "Robert Wilson",
    role: "Construction Manager",
    email: "robert.w@example.com",
    avatar: "/placeholder.svg",
    initials: "RW",
    projects: [3, 4],
    phone: "+1 (555) 567-8901",
    department: "Operations",
    bio: "Seasoned construction manager specializing in complex project coordination."
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Procurement Specialist",
    email: "emily.d@example.com",
    avatar: "/placeholder.svg",
    initials: "ED",
    projects: [1, 4],
    phone: "+1 (555) 678-9012",
    department: "Procurement",
    bio: "Expert in construction materials sourcing and supply chain management."
  }
];

const Team = () => {
  const navigate = useNavigate();
  const [teamMembersList, setTeamMembersList] = useState(teamMembers);
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  // Filter members based on selected project
  const filteredMembers = selectedProject === "all" 
    ? teamMembersList 
    : teamMembersList.filter(member => member.projects.includes(parseInt(selectedProject)));

  // Handle view profile button click
  const handleViewProfile = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setShowProfileDialog(true);
  };

  // Handle message button click
  const handleMessage = (member: typeof teamMembers[0]) => {
    // Store the member we want to message in session storage to retrieve in chat
    sessionStorage.setItem("chatWithMember", JSON.stringify(member));
    navigate("/chat");
  };

  // Handle edit button click
  const handleEdit = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setShowEditDialog(true);
  };

  // Handle delete button click
  const handleDelete = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setShowDeleteConfirm(true);
  };

  // Save edited member
  const handleSaveEdit = () => {
    if (selectedMember) {
      const updatedMembers = teamMembersList.map(member => 
        member.id === selectedMember.id ? selectedMember : member
      );
      setTeamMembersList(updatedMembers);
      setShowEditDialog(false);
      toast({
        title: "Team member updated",
        description: `${selectedMember.name}'s information has been updated.`,
      });
    }
  };

  // Confirm delete member
  const handleConfirmDelete = () => {
    if (selectedMember) {
      const updatedMembers = teamMembersList.filter(member => member.id !== selectedMember.id);
      setTeamMembersList(updatedMembers);
      setShowDeleteConfirm(false);
      toast({
        title: "Team member removed",
        description: `${selectedMember.name} has been removed from the team.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage all team members in your projects/organization
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Project filter tabs */}
      <Tabs defaultValue="all" value={selectedProject} onValueChange={setSelectedProject}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Members</TabsTrigger>
          {projects.map(project => (
            <TabsTrigger key={project.id} value={project.id.toString()}>
              {project.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedProject} className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex justify-between items-start">
                    {member.name}
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(member)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>{member.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Badge variant="secondary">{member.role}</Badge>
                      <div className="mt-2 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewProfile(member)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMessage(member)}
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs text-muted-foreground mb-1">Project assignments:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.projects.map(projectId => {
                        const project = projects.find(p => p.id === projectId);
                        return project ? (
                          <Badge key={projectId} variant="outline" className="text-xs">
                            {project.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Profile Dialog */}
      {selectedMember && (
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Team Member Profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback className="text-xl">{selectedMember.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{selectedMember.name}</h2>
                  <p className="text-muted-foreground">{selectedMember.role}</p>
                </div>
              </div>
              
              <div className="grid gap-2">
                <div>
                  <h3 className="font-medium text-sm">Department</h3>
                  <p>{selectedMember.department}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Email</h3>
                  <p>{selectedMember.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Phone</h3>
                  <p>{selectedMember.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Bio</h3>
                  <p className="text-sm text-muted-foreground">{selectedMember.bio}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Projects</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedMember.projects.map(projectId => {
                      const project = projects.find(p => p.id === projectId);
                      return project ? (
                        <Badge key={projectId} variant="secondary" className="text-xs">
                          {project.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowProfileDialog(false)}
              >
                Close
              </Button>
              <Button onClick={() => {
                setShowProfileDialog(false);
                handleMessage(selectedMember);
              }}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {selectedMember && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
              <DialogDescription>
                Update the details for {selectedMember.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={selectedMember.name}
                  onChange={(e) => setSelectedMember({...selectedMember, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  value={selectedMember.role}
                  onChange={(e) => setSelectedMember({...selectedMember, role: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={selectedMember.email}
                  onChange={(e) => setSelectedMember({...selectedMember, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={selectedMember.phone}
                  onChange={(e) => setSelectedMember({...selectedMember, phone: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input
                  id="department"
                  value={selectedMember.department}
                  onChange={(e) => setSelectedMember({...selectedMember, department: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="bio" className="text-right pt-2">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={selectedMember.bio}
                  onChange={(e) => setSelectedMember({...selectedMember, bio: e.target.value})}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projects" className="text-right">
                  Projects
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  {projects.map(project => (
                    <Badge 
                      key={project.id} 
                      variant={selectedMember.projects.includes(project.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const updatedProjects = selectedMember.projects.includes(project.id)
                          ? selectedMember.projects.filter(id => id !== project.id)
                          : [...selectedMember.projects, project.id];
                        setSelectedMember({...selectedMember, projects: updatedProjects});
                      }}
                    >
                      {project.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedMember && (
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Removal</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove {selectedMember.name} from the team? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-4 py-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedMember.avatar} />
                <AvatarFallback>{selectedMember.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedMember.name}</p>
                <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Team Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Team;
