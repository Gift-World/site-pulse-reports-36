
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

const reportTypes = [
  {
    id: "daily",
    name: "Daily Reports",
    description: "Site activity, progress, and safety reports from each day",
    reports: [
      { id: 1, name: "Daily Site Report - May 16, 2025", date: "May 16, 2025", project: "Highrise Apartments" },
      { id: 2, name: "Daily Site Report - May 15, 2025", date: "May 15, 2025", project: "Highrise Apartments" },
      { id: 3, name: "Daily Site Report - May 14, 2025", date: "May 14, 2025", project: "Office Complex" }
    ]
  },
  {
    id: "weekly",
    name: "Weekly Reports",
    description: "Consolidated weekly summaries of project progress",
    reports: [
      { id: 1, name: "Weekly Progress Report - May 10-16, 2025", date: "May 16, 2025", project: "Highrise Apartments" },
      { id: 2, name: "Weekly Progress Report - May 3-9, 2025", date: "May 9, 2025", project: "Office Complex" },
      { id: 3, name: "Weekly Progress Report - Apr 26-May 2, 2025", date: "May 2, 2025", project: "Residential Development" }
    ]
  },
  {
    id: "monthly",
    name: "Monthly Reports",
    description: "Detailed monthly project status and financial reports",
    reports: [
      { id: 1, name: "Monthly Project Report - April 2025", date: "May 1, 2025", project: "All Projects" },
      { id: 2, name: "Monthly Project Report - March 2025", date: "April 1, 2025", project: "All Projects" },
      { id: 3, name: "Monthly Project Report - February 2025", date: "March 1, 2025", project: "All Projects" }
    ]
  },
  {
    id: "safety",
    name: "Safety Reports",
    description: "Safety incident reports, assessments and audits",
    reports: [
      { id: 1, name: "Weekly Safety Audit - May 10-16, 2025", date: "May 16, 2025", project: "All Projects" },
      { id: 2, name: "Safety Incident Report - May 13, 2025", date: "May 13, 2025", project: "Office Complex" },
      { id: 3, name: "Monthly Safety Assessment - April 2025", date: "May 1, 2025", project: "All Projects" }
    ]
  }
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

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
                  
                  {type.id === "weekly" && (
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={generateWeeklyReport}
                    >
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Generate Weekly Report
                    </Button>
                  )}
                  
                  {type.id === "monthly" && (
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={generateMonthlyReport}
                    >
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Generate Monthly Report
                    </Button>
                  )}
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
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default Reports;
