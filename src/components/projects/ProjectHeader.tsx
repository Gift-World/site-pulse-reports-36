
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="ghost" className="mb-4" onClick={() => navigate('/app/projects')}>
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
      </div>
    </div>
  );
};
