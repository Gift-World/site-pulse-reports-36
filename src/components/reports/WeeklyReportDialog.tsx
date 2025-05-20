
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectSelectorButton } from "./ProjectSelectorButton";
import { ReportFormatSelector } from "./ReportFormatSelector";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { Project } from "@/types/project";
import { toast } from "@/hooks/use-toast";
import { FileDown } from "lucide-react";

interface WeeklyReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: Project[];
}

export const WeeklyReportDialog = ({ open, onOpenChange, projects }: WeeklyReportDialogProps) => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);
  const [format, setFormat] = useState("pdf");

  const handleProjectSelect = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project.name);
    }
    setProjectSelectorOpen(false);
  };

  const generateReport = () => {
    if (!selectedProject) {
      toast({
        title: "Project selection required",
        description: "Please select a project to generate a weekly report.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Weekly Report Generated",
      description: `Weekly report for ${selectedProject} has been created in ${format.toUpperCase()} format.`,
    });
    onOpenChange(false);
    setSelectedProject("");
    setFormat("pdf");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[450px] max-h-[80vh] w-[90vw]">
          <DialogHeader>
            <DialogTitle>Generate Weekly Report</DialogTitle>
            <DialogDescription>
              Generate a consolidated weekly report from daily reports.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[300px] pr-4">
            <div className="grid gap-4 py-4">
              <ProjectSelectorButton 
                selectedProject={selectedProject}
                onOpenSelector={() => setProjectSelectorOpen(true)}
              />
              
              <ReportFormatSelector 
                formatValue={format} 
                onFormatChange={setFormat} 
                id="weekly"
              />
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button onClick={generateReport}>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ProjectSelector
        open={projectSelectorOpen}
        onOpenChange={setProjectSelectorOpen}
        title="Select Project for Weekly Report"
        description="Choose a project to generate a weekly report for."
        projects={projects}
        onSelectProject={handleProjectSelect}
        actionText="Select Project"
        cancelText="Cancel"
      />
    </>
  );
};
