
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Plus, Calendar, Image, ArrowDown } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { ReportTemplateDialog } from "@/components/reports/ReportTemplateDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const reportTypes = [
  {
    id: "daily",
    name: "Daily Reports",
    description: "Site activity, progress, and safety reports from each day",
    reports: [
      { id: 1, name: "Daily Site Report for Highrise Apartments - May 16, 2025", date: "May 16, 2025", project: "Highrise Apartments" },
      { id: 2, name: "Daily Site Report for Highrise Apartments - May 15, 2025", date: "May 15, 2025", project: "Highrise Apartments" },
      { id: 3, name: "Daily Site Report for Office Complex - May 14, 2025", date: "May 14, 2025", project: "Office Complex" }
    ]
  },
  {
    id: "weekly",
    name: "Weekly Reports",
    description: "Consolidated weekly summaries of project progress",
    reports: [
      { id: 1, name: "Weekly Progress Report for Highrise Apartments - May 10-16, 2025", date: "May 16, 2025", project: "Highrise Apartments" },
      { id: 2, name: "Weekly Progress Report for Office Complex - May 3-9, 2025", date: "May 9, 2025", project: "Office Complex" },
      { id: 3, name: "Weekly Progress Report for Residential Development - Apr 26-May 2, 2025", date: "May 2, 2025", project: "Residential Development" }
    ]
  },
  {
    id: "monthly",
    name: "Monthly Reports",
    description: "Detailed monthly project status and financial reports",
    reports: [
      { id: 1, name: "Monthly Project Report for Highrise Apartments - April 2025", date: "May 1, 2025", project: "Highrise Apartments" },
      { id: 2, name: "Monthly Project Report for Office Complex - March 2025", date: "April 1, 2025", project: "Office Complex" },
      { id: 3, name: "Monthly Project Report for Residential Development - February 2025", date: "March 1, 2025", project: "Residential Development" }
    ]
  },
  {
    id: "safety",
    name: "Safety Reports",
    description: "Safety incident reports, assessments and audits",
    reports: [
      { id: 1, name: "Weekly Safety Audit for All Projects - May 10-16, 2025", date: "May 16, 2025", project: "All Projects" },
      { id: 2, name: "Safety Incident Report for Office Complex - May 13, 2025", date: "May 13, 2025", project: "Office Complex" },
      { id: 3, name: "Monthly Safety Assessment for Highrise Apartments - April 2025", date: "May 1, 2025", project: "Highrise Apartments" }
    ]
  }
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<{name: string; content?: string}>({name: ""});

  const handleViewReport = (report: {id: number; name: string; date: string; project: string}) => {
    // In a real app, you would fetch the report content from an API
    const reportContent = generateSampleReportContent(report);
    setCurrentReport({
      name: report.name,
      content: reportContent
    });
    setViewDialogOpen(true);
  };

  const handleDownloadReport = (report: {id: number; name: string; date: string; project: string}) => {
    // In a real app, you would generate and download the actual file
    // This is a simulation of a download
    const reportContent = generateSampleReportContent(report);
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: `"${report.name}" has been downloaded.`
    });
  };

  const generateSampleReportContent = (report: {id: number; name: string; date: string; project: string}) => {
    return `# ${report.name}
Project: ${report.project}
Date: ${report.date}

## Summary
This is a sample report for demonstration purposes.

## Project Progress
- Foundation work: 100% complete
- Structural framing: 75% complete
- Electrical: 45% complete
- Plumbing: 50% complete

## Weather Conditions
Clear skies, temperature 72°F, no precipitation

## Labor Hours
- Carpenters: 64 hours
- Electricians: 32 hours
- Plumbers: 40 hours
- General Labor: 80 hours

## Materials Used
- Concrete: 12 cubic yards
- Steel: 2.5 tons
- Lumber: 1,200 board feet

## Safety Incidents
No incidents reported.

## Notes
Work progressing according to schedule. No major issues to report.
`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Create, view and download project reports
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <ReportTemplateDialog />
        </div>
      </div>

      <Tabs defaultValue="daily" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        {reportTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {type.reports.map((report) => (
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
                        onClick={() => handleViewReport(report)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport(report)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{currentReport.name}</DialogTitle>
            <DialogDescription>
              Report details
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] mt-4">
            <div className="whitespace-pre-wrap font-mono text-sm p-4">
              {currentReport.content}
            </div>
          </ScrollArea>
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              onClick={() => handleDownloadReport({
                id: 0,
                name: currentReport.name,
                date: "",
                project: ""
              })}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
