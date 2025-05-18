
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
import { Plus } from "lucide-react";
import { ReportForm } from "@/components/reports/ReportForm";
import { toast } from "@/hooks/use-toast";

export function ReportTemplateDialog() {
  const handleSubmit = (data: any) => {
    console.log("Report submitted:", data);
    // In a real app, you would send this data to your backend
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
      <DialogTrigger asChild>
        <Button variant="default" className="bg-construction-navy hover:bg-construction-darkBlue">
          <Plus className="mr-2 h-4 w-4" />
          Create New Report
        </Button>
      </DialogTrigger>
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
