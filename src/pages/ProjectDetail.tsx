
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { projects } from "./Projects";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { CompletedProjectView } from "@/components/projects/CompletedProjectView";
import { InProgressProjectView } from "@/components/projects/InProgressProjectView";

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

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />
      
      {project.status === "Completed" ? (
        <CompletedProjectView project={project} />
      ) : (
        <InProgressProjectView project={project} />
      )}
    </div>
  );
};

export default ProjectDetail;
