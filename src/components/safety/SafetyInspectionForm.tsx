
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
import { Project } from "@/types/project";

interface SafetyInspectionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SafetyInspectionForm({ open, onOpenChange }: SafetyInspectionFormProps) {
  const [inspectionDate, setInspectionDate] = useState<Date>(new Date());
  const [inspectionType, setInspectionType] = useState("routine");
  const [inspector, setInspector] = useState("");
  const [notes, setNotes] = useState("");
  const [siteType, setSiteType] = useState("specific");
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  
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
        description: "Please select a project for the inspection.",
        variant: "destructive",
      });
      return;
    }
    
    if (!inspector.trim()) {
      toast({
        title: "Inspector name required",
        description: "Please provide the name of the inspector.",
        variant: "destructive",
      });
      return;
    }
    
    const projectText = siteType === "specific" ? selectedProject : "All Sites";
    
    toast({
      title: "Safety Inspection Scheduled",
      description: `${inspectionType} inspection scheduled for ${projectText} on ${inspectionDate.toLocaleDateString()}.`,
    });
    
    // Reset form
    setInspectionDate(new Date());
    setInspectionType("routine");
    setInspector("");
    setNotes("");
    setSiteType("specific");
    setSelectedProject("");
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
            <DialogTitle>Schedule Safety Inspection</DialogTitle>
            <DialogDescription>
              Plan and schedule a new safety inspection.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] pr-4">
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Site Selection</Label>
                <RadioGroup value={siteType} onValueChange={setSiteType} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specific" id="specific-site" />
                    <Label htmlFor="specific-site">Specific Site</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-sites" />
                    <Label htmlFor="all-sites">All Sites</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {siteType === "specific" && (
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="project" 
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
                <Label>Inspection Date</Label>
                <DatePicker
                  date={inspectionDate}
                  onDateChange={setInspectionDate}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspection-type">Inspection Type</Label>
                <Select value={inspectionType} onValueChange={setInspectionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspection type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine Inspection</SelectItem>
                    <SelectItem value="follow-up">Follow-up Inspection</SelectItem>
                    <SelectItem value="regulatory">Regulatory Compliance</SelectItem>
                    <SelectItem value="incident">Post-Incident Inspection</SelectItem>
                    <SelectItem value="surprise">Surprise Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspector">Inspector Name</Label>
                <Input 
                  id="inspector" 
                  value={inspector} 
                  onChange={(e) => setInspector(e.target.value)} 
                  placeholder="Name of the safety inspector"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  placeholder="Any specific areas to focus on, or notes for the inspector"
                />
              </div>
            </form>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Schedule Inspection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ProjectSelector
        open={projectSelectorOpen}
        onOpenChange={setProjectSelectorOpen}
        title="Select Project for Inspection"
        description="Choose a project for the safety inspection."
        projects={sampleProjects}
        onSelectProject={handleProjectSelect}
        actionText="Select Project"
        cancelText="Cancel"
      />
    </>
  );
}
