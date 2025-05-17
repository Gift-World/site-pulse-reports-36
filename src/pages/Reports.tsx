
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Plus, Calendar, Image } from "lucide-react";

const reportTypes = [
  {
    id: "daily",
    name: "Daily Reports",
    description: "Site activity, progress, and safety reports from each day",
    reports: [
      { id: 1, name: "Daily Site Report - May 16, 2025", date: "May 16, 2025" },
      { id: 2, name: "Daily Site Report - May 15, 2025", date: "May 15, 2025" },
      { id: 3, name: "Daily Site Report - May 14, 2025", date: "May 14, 2025" }
    ]
  },
  {
    id: "weekly",
    name: "Weekly Reports",
    description: "Consolidated weekly summaries of project progress",
    reports: [
      { id: 1, name: "Weekly Progress Report - May 10-16, 2025", date: "May 16, 2025" },
      { id: 2, name: "Weekly Progress Report - May 3-9, 2025", date: "May 9, 2025" },
      { id: 3, name: "Weekly Progress Report - Apr 26-May 2, 2025", date: "May 2, 2025" }
    ]
  },
  {
    id: "monthly",
    name: "Monthly Reports",
    description: "Detailed monthly project status and financial reports",
    reports: [
      { id: 1, name: "Monthly Project Report - April 2025", date: "May 1, 2025" },
      { id: 2, name: "Monthly Project Report - March 2025", date: "April 1, 2025" },
      { id: 3, name: "Monthly Project Report - February 2025", date: "March 1, 2025" }
    ]
  },
  {
    id: "safety",
    name: "Safety Reports",
    description: "Safety incident reports, assessments and audits",
    reports: [
      { id: 1, name: "Weekly Safety Audit - May 10-16, 2025", date: "May 16, 2025" },
      { id: 2, name: "Safety Incident Report - May 13, 2025", date: "May 13, 2025" },
      { id: 3, name: "Monthly Safety Assessment - April 2025", date: "May 1, 2025" }
    ]
  }
];

const Reports = () => {
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
          <Button className="bg-construction-navy hover:bg-construction-darkBlue">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
          <Button variant="default" className="bg-construction-navy hover:bg-construction-darkBlue">
            <Plus className="mr-2 h-4 w-4" />
            Create New Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
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
                <CardTitle>{type.name}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
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
                        <p className="text-xs text-muted-foreground">Generated on {report.date}</p>
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
