import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { ReportList } from "@/components/reports/ReportList";
import { ReportViewDialog } from "@/components/reports/ReportViewDialog";
import { generateSampleReportContent, downloadReport } from "@/components/reports/ReportUtils";
import { toast } from "@/hooks/use-toast";

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
    const reportContent = generateSampleReportContent(report);
    downloadReport({
      name: report.name,
      content: reportContent
    });
    
    toast({
      title: "Report Downloaded",
      description: `"${report.name}" has been downloaded.`
    });
  };

  return (
    <div className="space-y-6">
      <ReportHeader 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

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
                <ReportList 
                  reports={type.reports}
                  onViewReport={handleViewReport}
                  onDownloadReport={handleDownloadReport}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <ReportViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        report={currentReport}
        onDownload={() => {
          if (currentReport.content) {
            downloadReport({
              name: currentReport.name,
              content: currentReport.content
            });
            toast({
              title: "Report Downloaded",
              description: `"${currentReport.name}" has been downloaded.`
            });
          }
        }}
      />
    </div>
  );
};

export default Reports;
