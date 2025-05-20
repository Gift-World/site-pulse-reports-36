
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeeklyReportDialog } from "./WeeklyReportDialog";
import { MonthlyReportDialog } from "./MonthlyReportDialog";
import { Project } from "@/types/project";

export function ReportTemplateDialog() {
  const [reportType, setReportType] = useState("daily");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [weeklyDialogOpen, setWeeklyDialogOpen] = useState(false);
  const [monthlyDialogOpen, setMonthlyDialogOpen] = useState(false);
  
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
          
          <WeeklyReportDialog
            open={weeklyDialogOpen}
            onOpenChange={setWeeklyDialogOpen}
            projects={sampleProjects}
          />
          
          <MonthlyReportDialog
            open={monthlyDialogOpen}
            onOpenChange={setMonthlyDialogOpen}
            projects={sampleProjects}
          />
          
          <Button 
            variant="outline" 
            className="border-construction-navy text-construction-navy hover:bg-construction-navy hover:text-white"
            onClick={() => setWeeklyDialogOpen(true)}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Generate Weekly Report
          </Button>
          
          <Button 
            variant="outline" 
            className="border-construction-navy text-construction-navy hover:bg-construction-navy hover:text-white"
            onClick={() => setMonthlyDialogOpen(true)}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Generate Monthly Report
          </Button>
        </div>
        <DialogContent className="max-w-[60%] max-h-[80vh] w-[90vw]">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Select a report type and fill in the details.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
