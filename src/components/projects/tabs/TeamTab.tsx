
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface TeamTabProps {
  project: Project;
}

type TeamMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
  initials: string;
  bio?: string;
  designation?: "Skilled" | "Unskilled" | "Supervisor" | "Engineer";
};

export const TeamTab: React.FC<TeamTabProps> = ({ project }) => {
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Project Manager",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg",
      initials: "SJ",
      bio: "Over 10 years of experience managing construction projects.",
      designation: "Supervisor"
    },
    {
      id: 2,
      name: "David Lee",
      role: "Site Engineer",
      email: "david.l@example.com",
      avatar: "/placeholder.svg",
      initials: "DL",
      bio: "Specializes in structural engineering and site planning.",
      designation: "Engineer"
    },
    {
      id: 3,
      name: "Michael Robinson",
      role: "Safety Officer",
      email: "michael.r@example.com",
      avatar: "/placeholder.svg",
      initials: "MR",
      bio: "Certified safety professional with focus on construction sites.",
      designation: "Supervisor"
    },
    {
      id: 4,
      name: "Jennifer Chen",
      role: "Electrician",
      email: "jennifer.c@example.com",
      avatar: "/placeholder.svg",
      initials: "JC",
      bio: "Master electrician with 15 years of commercial experience.",
      designation: "Skilled"
    },
    {
      id: 5,
      name: "Robert Wilson",
      role: "Construction Worker",
      email: "robert.w@example.com",
      avatar: "/placeholder.svg",
      initials: "RW",
      bio: "General construction with focus on concrete work.",
      designation: "Unskilled"
    }
  ]);

  // Calculate labor distribution
  const laborDistribution = [
    { 
      name: 'Engineers', 
      count: teamMembers.filter(m => m.designation === "Engineer").length, 
      color: '#22bff0',
      icon: '🔧'
    },
    { 
      name: 'Skilled Labor', 
      count: teamMembers.filter(m => m.designation === "Skilled").length, 
      color: '#0df539',
      icon: '⚡'
    },
    { 
      name: 'General Labor', 
      count: teamMembers.filter(m => m.designation === "Unskilled").length, 
      color: '#ff9500',
      icon: '👷'
    },
    { 
      name: 'Supervisors', 
      count: teamMembers.filter(m => m.designation === "Supervisor").length, 
      color: '#8b5cf6',
      icon: '👨‍💼'
    }
  ];

  const totalMembers = teamMembers.length;

  const handleAddMember = () => {
    // Mock implementation - would typically save to database
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: "New Team Member",
      role: "Role",
      email: "email@example.com",
      avatar: "/placeholder.svg",
      initials: "NM",
      designation: "Skilled"
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowAddMemberDialog(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Project Team</CardTitle>
          <CardDescription>All team members working on this project</CardDescription>
        </div>
        <Button onClick={() => setShowAddMemberDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Enhanced Team Composition Infographic */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-6">Team Composition</h3>
            
            {/* Circular Progress Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              {laborDistribution.map((category, index) => {
                const percentage = totalMembers > 0 ? (category.count / totalMembers) * 100 : 0;
                const circumference = 2 * Math.PI * 45;
                const strokeDasharray = circumference;
                const strokeDashoffset = circumference - (percentage / 100) * circumference;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-3">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke={category.color}
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-lg font-bold" style={{ color: category.color }}>
                          {category.count}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-construction-blue">{totalMembers}</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-construction-green">{laborDistribution.filter(cat => cat.count > 0).length}</p>
                <p className="text-sm text-muted-foreground">Active Roles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-construction-orange">{laborDistribution.find(cat => cat.name === 'Skilled Labor')?.count || 0}</p>
                <p className="text-sm text-muted-foreground">Skilled Workers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{laborDistribution.find(cat => cat.name === 'Supervisors')?.count || 0}</p>
                <p className="text-sm text-muted-foreground">Supervisors</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-4">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="font-medium">{member.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{member.role}</Badge>
                      <Badge variant="secondary" className="text-xs">{member.designation}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                {member.bio && (
                  <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Team Member Dialog */}
        <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
          <DialogContent className="max-w-[60%] overflow-y-auto max-h-[85vh]">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Add a new team member to this project.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter team member's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Job role/title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select defaultValue="Skilled">
                    <SelectTrigger id="designation">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Skilled">Skilled Labor</SelectItem>
                      <SelectItem value="Unskilled">General Labor</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Engineer">Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio/Information</Label>
                <Textarea id="bio" placeholder="Brief description of team member's experience and skills" />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>
                Add Team Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
