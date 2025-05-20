
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface Report {
  id: number;
  name: string;
  date: string;
  project: string;
}

interface ReportListProps {
  reports: Report[];
  onViewReport: (report: Report) => void;
  onDownloadReport: (report: Report) => void;
}

export const ReportList = ({ reports, onViewReport, onDownloadReport }: ReportListProps) => {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div 
          key={report.id} 
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="p-2 rounded-md bg-muted">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{report.name}</p>
              <div className="flex items-center gap-4">
                <p className="text-xs text-muted-foreground">Generated on {report.date}</p>
                <p className="text-xs text-muted-foreground">Project: {report.project}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewReport(report)}
            >
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDownloadReport(report)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
