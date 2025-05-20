
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectSelectorButton } from "./ProjectSelectorButton";
import { ReportFormatSelector } from "./ReportFormatSelector";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Project } from "@/types/project";
import { toast } from "@/hooks/use-toast";
import { FileDown } from "lucide-react";

interface MonthlyReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: Project[];
}

export const MonthlyReportDialog = ({ open, onOpenChange, projects }: MonthlyReportDialogProps) => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);
  const [format, setFormat] = useState("pdf");
  const [source, setSource] = useState("daily");

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
        description: "Please select a project to generate a monthly report.",
        variant: "destructive",
      });
      return;
    }
    
    const sourceText = source === "daily" ? "daily reports" : "weekly reports";
    
    toast({
      title: "Monthly Report Generated",
      description: `Monthly report for ${selectedProject} has been created from ${sourceText} in ${format.toUpperCase()} format.`,
    });
    onOpenChange(false);
    setSelectedProject("");
    setFormat("pdf");
    setSource("daily");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[450px] max-h-[80vh] w-[90vw]">
          <DialogHeader>
            <DialogTitle>Generate Monthly Report</DialogTitle>
            <DialogDescription>
              Generate a consolidated monthly report.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[300px] pr-4">
            <div className="grid gap-4 py-4">
              <ProjectSelectorButton 
                selectedProject={selectedProject}
                onOpenSelector={() => setProjectSelectorOpen(true)}
                label="Monthly Project"
              />
              
              <div className="grid gap-2">
                <Label>Source Reports</Label>
                <RadioGroup value={source} onValueChange={setSource}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="monthly-daily" />
                    <Label htmlFor="monthly-daily">Aggregate from Daily Reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="monthly-weekly" />
                    <Label htmlFor="monthly-weekly">Aggregate from Weekly Reports</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <ReportFormatSelector 
                formatValue={format} 
                onFormatChange={setFormat} 
                id="monthly-format"
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
        title="Select Project for Monthly Report"
        description="Choose a project to generate a monthly report for."
        projects={projects}
        onSelectProject={handleProjectSelect}
        actionText="Select Project"
        cancelText="Cancel"
      />
    </>
  );
};
