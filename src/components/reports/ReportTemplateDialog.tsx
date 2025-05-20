
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, FileDown } from "lucide-react";
import { ReportForm } from "@/components/reports/ReportForm";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ReportTemplateDialog() {
  const [reportType, setReportType] = useState("daily");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [weeklySheetOpen, setWeeklySheetOpen] = useState(false);
  const [monthlySheetOpen, setMonthlySheetOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [weeklyProjectSelectorOpen, setWeeklyProjectSelectorOpen] = useState(false);
  const [monthlyProjectSelectorOpen, setMonthlyProjectSelectorOpen] = useState(false);
  const [weeklyFormat, setWeeklyFormat] = useState("pdf");
  const [monthlyFormat, setMonthlyFormat] = useState("pdf");
  const [monthlySource, setMonthlySource] = useState("daily");
  
  // Sample projects data - in a real app, you would fetch this from your backend
  const sampleProjects = [
    { id: 1, name: "Highrise Apartments", description: "A 20-story residential building", status: "In Progress", progress: 65 },
    { id: 2, name: "Office Complex", description: "Modern office spaces with amenities", status: "Planning", progress: 30 },
    { id: 3, name: "Residential Development", description: "Suburban housing development", status: "In Progress", progress: 45 },
  ];
  
  const handleSubmit = (data: any) => {
    if (!data.projectName || data.projectName.trim() === "") {
      toast({
        title: "Project name is required",
        description: "Please enter a project name to create a report.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Report submitted:", data);
    const reportTitle = `${getReportTitle(reportType)} for ${data.projectName} - ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    
    toast({
      title: `Report Created`,
      description: `"${reportTitle}" has been created.`,
    });
    setDialogOpen(false);
  };

  const generateWeeklyReport = () => {
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
      description: `Weekly report for ${selectedProject} has been created in ${weeklyFormat.toUpperCase()} format.`,
    });
    setWeeklySheetOpen(false);
    setSelectedProject("");
    setWeeklyFormat("pdf");
  };

  const generateMonthlyReport = () => {
    if (!selectedProject) {
      toast({
        title: "Project selection required",
        description: "Please select a project to generate a monthly report.",
        variant: "destructive",
      });
      return;
    }
    
    const sourceText = monthlySource === "daily" ? "daily reports" : "weekly reports";
    
    toast({
      title: "Monthly Report Generated",
      description: `Monthly report for ${selectedProject} has been created from ${sourceText} in ${monthlyFormat.toUpperCase()} format.`,
    });
    setMonthlySheetOpen(false);
    setSelectedProject("");
    setMonthlyFormat("pdf");
    setMonthlySource("daily");
  };
  
  const getReportTitle = (type: string) => {
    switch(type) {
      case "daily": return "Daily Site Report";
      case "safety": return "Safety Report";
      case "visit": return "Site Visit Report";
      case "weather": return "Weather Report";
      case "meeting": return "Meeting Minutes";
      default: return "Report";
    }
  };

  const handleWeeklyProjectSelect = (projectId: number) => {
    const project = sampleProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project.name);
    }
    setWeeklyProjectSelectorOpen(false);
  };

  const handleMonthlyProjectSelect = (projectId: number) => {
    const project = sampleProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project.name);
    }
    setMonthlyProjectSelectorOpen(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="flex flex-col sm:flex-row gap-2">
          <DialogTrigger asChild>
            <Button variant="default" className="bg-construction-navy hover:bg-construction-darkBlue">
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </DialogTrigger>
          
          <Sheet open={weeklySheetOpen} onOpenChange={setWeeklySheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="border-construction-navy text-construction-navy hover:bg-construction-navy hover:text-white"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Generate Weekly Report
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] max-w-full">
              <SheetHeader>
                <SheetTitle>Generate Weekly Report</SheetTitle>
                <SheetDescription>
                  Generate a consolidated weekly report from daily reports.
                </SheetDescription>
              </SheetHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
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
                      variant="outline" 
                      onClick={() => setWeeklyProjectSelectorOpen(true)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Report Format</Label>
                  <RadioGroup value={weeklyFormat} onValueChange={setWeeklyFormat}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pdf" id="weekly-pdf" />
                      <Label htmlFor="weekly-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="word" id="weekly-word" />
                      <Label htmlFor="weekly-word">Word Document</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <SheetFooter>
                <Button onClick={generateWeeklyReport}>Generate Report</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Sheet open={monthlySheetOpen} onOpenChange={setMonthlySheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="border-construction-navy text-construction-navy hover:bg-construction-navy hover:text-white"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Generate Monthly Report
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] max-w-full">
              <SheetHeader>
                <SheetTitle>Generate Monthly Report</SheetTitle>
                <SheetDescription>
                  Generate a consolidated monthly report.
                </SheetDescription>
              </SheetHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="monthly-project">Project</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="monthly-project" 
                      value={selectedProject} 
                      placeholder="Select a project"
                      readOnly
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setMonthlyProjectSelectorOpen(true)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Source Reports</Label>
                  <RadioGroup value={monthlySource} onValueChange={setMonthlySource}>
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
                
                <div className="grid gap-2">
                  <Label>Report Format</Label>
                  <RadioGroup value={monthlyFormat} onValueChange={setMonthlyFormat}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pdf" id="monthly-format-pdf" />
                      <Label htmlFor="monthly-format-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="word" id="monthly-format-word" />
                      <Label htmlFor="monthly-format-word">Word Document</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <SheetFooter>
                <Button onClick={generateMonthlyReport}>Generate Report</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <DialogContent className="max-w-2xl sm:max-w-[60%]">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Select a report type and fill in the details.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Site Report</SelectItem>
                <SelectItem value="safety">Safety Report</SelectItem>
                <SelectItem value="visit">Site Visit Report</SelectItem>
                <SelectItem value="weather">Weather Report</SelectItem>
                <SelectItem value="meeting">Meeting Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ReportForm 
            onSubmit={handleSubmit} 
            reportType={reportType}
          />
        </DialogContent>
      </Dialog>
      
      {/* Project Selectors as separate dialogs */}
      <ProjectSelector
        open={weeklyProjectSelectorOpen}
        onOpenChange={setWeeklyProjectSelectorOpen}
        title="Select Project for Weekly Report"
        description="Choose a project to generate a weekly report for."
        projects={sampleProjects}
        onSelectProject={handleWeeklyProjectSelect}
        actionText="Select Project"
        cancelText="Cancel"
      />
      
      <ProjectSelector
        open={monthlyProjectSelectorOpen}
        onOpenChange={setMonthlyProjectSelectorOpen}
        title="Select Project for Monthly Report"
        description="Choose a project to generate a monthly report for."
        projects={sampleProjects}
        onSelectProject={handleMonthlyProjectSelect}
        actionText="Select Project"
        cancelText="Cancel"
      />
    </>
  );
}
