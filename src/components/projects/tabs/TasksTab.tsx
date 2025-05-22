
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TasksTabProps {
  project: Project;
}

export const TasksTab: React.FC<TasksTabProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Project Tasks</CardTitle>
          <CardDescription>Manage and track tasks for this project</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="p-8 text-center text-muted-foreground">
          <p>No tasks have been added to this project yet.</p>
          <p className="mt-2">Click the "Add Task" button to create your first task.</p>
        </div>
      </CardContent>
    </Card>
  );
};
