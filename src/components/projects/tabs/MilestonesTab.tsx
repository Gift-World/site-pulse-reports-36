
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MilestonesTabProps {
  project: Project;
}

export const MilestonesTab: React.FC<MilestonesTabProps> = ({ project }) => {
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
  );
};
