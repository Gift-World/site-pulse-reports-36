
import React from "react";
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

export function ReportTemplateDialog() {
  const handleSubmit = (data: any) => {
    console.log("Report submitted:", data);
    toast({
      title: "Report Created",
      description: `Daily site report has been created for ${data.projectName}.`,
    });
  };

  const generateWeeklyReport = () => {
    // This would fetch daily reports and aggregate them
    toast({
      title: "Weekly Report Generated",
      description: "Weekly report has been created from the daily reports.",
    });
  };

  const generateMonthlyReport = () => {
    // This would fetch daily reports and aggregate them
    toast({
      title: "Monthly Report Generated",
      description: "Monthly report has been created from the daily reports.",
    });
  };

  return (
    <Dialog>
      <div className="flex gap-2">
        <DialogTrigger asChild>
          <Button variant="default" className="bg-construction-navy hover:bg-construction-darkBlue">
            <Plus className="mr-2 h-4 w-4" />
            Create New Report
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
            Fill out the form below to create a new daily site report.
          </DialogDescription>
        </DialogHeader>
        <ReportForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
