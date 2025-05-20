
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  Download,
  ShieldCheck,
  FilePlus,
  CalendarPlus,
  Eye,
  ClipboardList,
  ClipboardCheck,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IncidentReportForm } from "@/components/safety/IncidentReportForm";
import { InspectionScheduleForm } from "@/components/safety/InspectionScheduleForm";
import { ObservationForm } from "@/components/safety/ObservationForm";

interface SafetyTabProps {
  project: Project;
}

export const SafetyTab: React.FC<SafetyTabProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [incidentFormOpen, setIncidentFormOpen] = useState(false);
  const [inspectionFormOpen, setInspectionFormOpen] = useState(false);
  const [observationFormOpen, setObservationFormOpen] = useState(false);
  
  const safetyData = [
    { name: 'Safe', value: 96, color: '#34A853' },
    { name: 'Hazards', value: 4, color: '#EA4335' }
  ];
  
  const safetyTrendData = [
    { date: 'Jan', score: 88 },
    { date: 'Feb', score: 90 },
    { date: 'Mar', score: 92 },
    { date: 'Apr', score: 94 },
    { date: 'May', score: 96 },
  ];
  
  const incidentData = [
    { type: "Near Miss", count: 5, color: "#FBBC04" },
    { type: "Minor Injury", count: 2, color: "#EA4335" },
    { type: "Major Incident", count: 0, color: "#C53929" },
  ];
  
  // Sample safety observations data
  const safetyObservations = [
    {
      date: "May 15, 2025",
      type: "Near Miss",
      description: "Unsecured tools on scaffolding",
      status: "Resolved"
    },
    {
      date: "May 12, 2025",
      type: "Hazard",
      description: "Incomplete safety railing on 3rd floor",
      status: "Resolved"
    },
    {
      date: "May 8, 2025",
      type: "Good Practice",
      description: "Team consistently using fall protection equipment",
      status: "Noted"
    },
    {
      date: "May 5, 2025",
      type: "Hazard",
      description: "Electrical cords creating trip hazard",
      status: "Resolved"
    },
    {
      date: "May 3, 2025",
      type: "Near Miss",
      description: "Material nearly fell during crane operation",
      status: "Resolved"
    },
    {
      date: "May 1, 2025",
      type: "Good Practice",
      description: "Daily toolbox talks being conducted consistently",
      status: "Noted"
    }
  ];
  
  const generateSafetyReport = () => {
    toast({
      title: "Safety Report Generated",
      description: "Safety report has been created for download."
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Safety Reports</CardTitle>
            <CardDescription>Safety metrics and incident reports</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateSafetyReport}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <Eye className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="incidents">
              <ClipboardList className="h-4 w-4 mr-2" />
              Incidents
            </TabsTrigger>
            <TabsTrigger value="inspections">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Inspections
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-white to-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Safety Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">96%</div>
                  <Progress value={96} className="h-2 mt-2" />
                  <p className="text-xs text-green-600 mt-1">+2% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Incident-Free Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">45</div>
                  <p className="text-xs text-blue-600 mt-2">Last incident: Apr 3, 2025</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Safety Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <Progress value={100} className="h-2 mt-2" />
                  <p className="text-xs text-amber-600 mt-1">All staff certified</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Safety Score Breakdown</CardTitle>
                  <CardDescription>Current project safety assessment</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={safetyData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {safetyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Safety Score Trend</CardTitle>
                  <CardDescription>Monthly safety performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={safetyTrendData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#34A853" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Recent Safety Observations</CardTitle>
                <Button size="sm" onClick={() => setObservationFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Observation
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px] pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {safetyObservations.map((observation, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{observation.date}</TableCell>
                          <TableCell>{observation.type}</TableCell>
                          <TableCell>{observation.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline" 
                              className={observation.status === "Resolved" 
                                ? "bg-green-50 text-green-700" 
                                : "bg-blue-50 text-blue-700"
                              }>
                              {observation.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="incidents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {incidentData.map((item, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: item.color }}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{item.count}</div>
                    <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Incident Log</CardTitle>
                <CardDescription>Recorded safety incidents and near misses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Apr 3, 2025</TableCell>
                      <TableCell>Minor Injury</TableCell>
                      <TableCell>Level 2, East Wing</TableCell>
                      <TableCell>Worker cut hand on exposed metal</TableCell>
                      <TableCell>J. Smith</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Closed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mar 24, 2025</TableCell>
                      <TableCell>Near Miss</TableCell>
                      <TableCell>Ground Floor</TableCell>
                      <TableCell>Material fell from scaffolding (no injuries)</TableCell>
                      <TableCell>R. Johnson</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Closed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mar 12, 2025</TableCell>
                      <TableCell>Near Miss</TableCell>
                      <TableCell>Loading Bay</TableCell>
                      <TableCell>Vehicle reversed without spotter</TableCell>
                      <TableCell>M. Williams</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Closed</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => setIncidentFormOpen(true)}>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Report New Incident
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inspections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Safety Inspections</CardTitle>
                <CardDescription>Scheduled and completed safety inspections</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Findings</TableHead>
                      <TableHead>Actions Required</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 16, 2025</TableCell>
                      <TableCell>Weekly Safety Audit</TableCell>
                      <TableCell>External Auditor</TableCell>
                      <TableCell>3 minor issues</TableCell>
                      <TableCell>Yes</TableCell>
                      <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">In Progress</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 9, 2025</TableCell>
                      <TableCell>Weekly Safety Audit</TableCell>
                      <TableCell>Safety Officer</TableCell>
                      <TableCell>1 minor issue</TableCell>
                      <TableCell>No</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 5, 2025</TableCell>
                      <TableCell>Equipment Check</TableCell>
                      <TableCell>Maintenance Lead</TableCell>
                      <TableCell>All equipment compliant</TableCell>
                      <TableCell>No</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 23, 2025</TableCell>
                      <TableCell>Weekly Safety Audit</TableCell>
                      <TableCell>Safety Officer</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell><Badge variant="outline" className="bg-yellow-50 text-yellow-700">Scheduled</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => setInspectionFormOpen(true)}>
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Schedule Inspection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Safety Reports</CardTitle>
                <CardDescription>Generated safety reports and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Weekly Safety Report - May 10-16</TableCell>
                      <TableCell>May 16, 2025</TableCell>
                      <TableCell>Weekly Report</TableCell>
                      <TableCell>Safety Manager</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Weekly Safety Report - May 3-9</TableCell>
                      <TableCell>May 9, 2025</TableCell>
                      <TableCell>Weekly Report</TableCell>
                      <TableCell>Safety Manager</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Monthly Safety Summary - April</TableCell>
                      <TableCell>May 1, 2025</TableCell>
                      <TableCell>Monthly Report</TableCell>
                      <TableCell>Project Manager</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Incident Investigation - Vehicle Reversal</TableCell>
                      <TableCell>Mar 14, 2025</TableCell>
                      <TableCell>Incident Report</TableCell>
                      <TableCell>Safety Officer</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Forms */}
        <IncidentReportForm 
          open={incidentFormOpen} 
          onOpenChange={setIncidentFormOpen} 
        />
        
        <InspectionScheduleForm 
          open={inspectionFormOpen} 
          onOpenChange={setInspectionFormOpen} 
        />
        
        <ObservationForm 
          open={observationFormOpen} 
          onOpenChange={setObservationFormOpen} 
        />
      </CardContent>
    </Card>
  );
};
