
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { FileUploader } from "@/components/reports/FileUploader";
import { Project } from "@/types/project";

interface SafetyReportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SafetyReportForm({ open, onOpenChange }: SafetyReportFormProps) {
  const [reportDate, setReportDate] = useState<Date>(new Date());
  const [reportType, setReportType] = useState("incident");
  const [reporter, setReporter] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [siteType, setSiteType] = useState("specific");
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [actionsTaken, setActionsTaken] = useState("");
  
  // Sample projects data with all required Project properties
  const sampleProjects: Project[] = [
    { 
      id: 1, 
      name: "Highrise Apartments", 
      description: "A 20-story residential building", 
      status: "In Progress", 
      progress: 65,
      team: 12,
      dueDate: "2025-12-15"
    },
    { 
      id: 2, 
      name: "Office Complex", 
      description: "Modern office spaces with amenities", 
      status: "Planning", 
      progress: 30,
      team: 8,
      dueDate: "2026-03-30"
    },
    { 
      id: 3, 
      name: "Residential Development", 
      description: "Suburban housing development", 
      status: "In Progress", 
      progress: 45,
      team: 15,
      dueDate: "2025-09-20"
    },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (siteType === "specific" && !selectedProject) {
      toast({
        title: "Project selection required",
        description: "Please select a project for the safety report.",
        variant: "destructive",
      });
      return;
    }
    
    if (!reporter.trim()) {
      toast({
        title: "Reporter name required",
        description: "Please provide the name of the person reporting.",
        variant: "destructive",
      });
      return;
    }
    
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description of the safety issue.",
        variant: "destructive",
      });
      return;
    }
    
    const projectText = siteType === "specific" ? selectedProject : "All Sites";
    
    toast({
      title: "Safety Report Created",
      description: `${reportType} report created for ${projectText}.`,
    });
    
    // Reset form
    setReportDate(new Date());
    setReportType("incident");
    setReporter("");
    setDescription("");
    setSeverity("medium");
    setSiteType("specific");
    setSelectedProject("");
    setPhotos([]);
    setActionsTaken("");
    onOpenChange(false);
  };
  
  const handleProjectSelect = (projectId: number) => {
    const project = sampleProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project.name);
    }
    setProjectSelectorOpen(false);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Create Safety Report</DialogTitle>
            <DialogDescription>
              Report a safety incident or hazard.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] pr-4">
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Site Selection</Label>
                <RadioGroup value={siteType} onValueChange={setSiteType} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specific" id="report-specific-site" />
                    <Label htmlFor="report-specific-site">Specific Site</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="report-all-sites" />
                    <Label htmlFor="report-all-sites">All Sites</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {siteType === "specific" && (
                <div className="space-y-2">
                  <Label htmlFor="report-project">Project</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="report-project" 
                      value={selectedProject} 
                      placeholder="Select a project"
                      readOnly
                      className="flex-1"
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setProjectSelectorOpen(true)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Report Date</Label>
                <DatePicker
                  date={reportDate}
                  onDateChange={setReportDate}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incident">Incident Report</SelectItem>
                    <SelectItem value="hazard">Hazard Report</SelectItem>
                    <SelectItem value="near-miss">Near Miss</SelectItem>
                    <SelectItem value="observation">Safety Observation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reporter">Reported By</Label>
                <Input 
                  id="reporter" 
                  value={reporter} 
                  onChange={(e) => setReporter(e.target.value)} 
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe the safety incident, hazard, or observation in detail"
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="actions">Actions Taken</Label>
                <Textarea 
                  id="actions" 
                  value={actionsTaken} 
                  onChange={(e) => setActionsTaken(e.target.value)} 
                  placeholder="Describe any immediate actions taken to address the issue"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Photos/Evidence</Label>
                <FileUploader
                  onFilesSelected={(files) => setPhotos(files)}
                  maxFiles={3}
                  acceptedFileTypes=".jpg,.jpeg,.png,.gif"
                  label="Upload photos"
                />
                <p className="text-sm text-muted-foreground">
                  Upload photos of the incident or hazard (max 3).
                </p>
              </div>
            </form>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ProjectSelector
        open={projectSelectorOpen}
        onOpenChange={setProjectSelectorOpen}
        title="Select Project for Safety Report"
        description="Choose a project for the safety report."
        projects={sampleProjects}
        onSelectProject={handleProjectSelect}
        actionText="Select Project"
        cancelText="Cancel"
      />
    </>
  );
}
