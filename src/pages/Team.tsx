
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg",
    initials: "SJ"
  },
  {
    id: 2,
    name: "David Lee",
    role: "Site Engineer",
    email: "david.l@example.com",
    avatar: "/placeholder.svg",
    initials: "DL"
  },
  {
    id: 3,
    name: "Michael Robinson",
    role: "Safety Officer",
    email: "michael.r@example.com",
    avatar: "/placeholder.svg",
    initials: "MR"
  },
  {
    id: 4,
    name: "Jennifer Chen",
    role: "Architect",
    email: "jennifer.c@example.com",
    avatar: "/placeholder.svg",
    initials: "JC"
  },
  {
    id: 5,
    name: "Robert Wilson",
    role: "Construction Manager",
    email: "robert.w@example.com",
    avatar: "/placeholder.svg",
    initials: "RW"
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Procurement Specialist",
    email: "emily.d@example.com",
    avatar: "/placeholder.svg",
    initials: "ED"
  }
];

const Team = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your project team and their roles
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{member.name}</CardTitle>
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
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Message</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;
