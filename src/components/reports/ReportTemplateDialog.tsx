
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function ReportTemplateDialog() {
  const [reportType, setReportType] = useState("daily");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSubmit = (data: any) => {
    console.log("Report submitted:", data);
    toast({
      title: `${getReportTitle(reportType)} Created`,
      description: `${getReportTitle(reportType)} has been created for ${data.projectName}.`,
    });
    setDialogOpen(false);
  };

  const generateWeeklyReport = () => {
    toast({
      title: "Weekly Report Generated",
      description: "Weekly report has been created from the daily reports.",
    });
  };

  const generateMonthlyReport = () => {
    toast({
      title: "Monthly Report Generated",
      description: "Monthly report has been created from the daily reports.",
    });
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex flex-col sm:flex-row gap-2">
        <DialogTrigger asChild>
          <Button variant="default" className="bg-construction-navy hover:bg-construction-darkBlue">
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </DialogTrigger>
        <Button 
          variant="outline" 
          onClick={generateWeeklyReport}
          className="border-construction-navy text-construction-navy hover:bg-construction-navy hover:text-white"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Generate Weekly Report
        </Button>
        <Button 
          variant="outline" 
          onClick={generateMonthlyReport}
          className="border-construction-navy text-construction-navy hover:bg-construction-navy hover:text-white"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Generate Monthly Report
        </Button>
      </div>
      <DialogContent className="max-w-4xl">
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
  );
}
