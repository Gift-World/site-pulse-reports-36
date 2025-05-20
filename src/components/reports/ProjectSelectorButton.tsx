
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProjectSelectorButtonProps {
  selectedProject: string;
  onOpenSelector: () => void;
  label?: string;
}

export const ProjectSelectorButton = ({ 
  selectedProject, 
  onOpenSelector,
  label = "Project" 
}: ProjectSelectorButtonProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="project">{label}</Label>
      <div className="flex gap-2 items-center">
        <Input 
          id="project" 
          value={selectedProject} 
          placeholder="Select a project"
          readOnly
          className="flex-1"
        />
        <Button 
          variant="outline" 
          onClick={onOpenSelector}
        >
          Select
        </Button>
      </div>
    </div>
  );
};
