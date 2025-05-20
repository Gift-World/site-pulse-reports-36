
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldAlert, FileText, Clipboard, AlertCircle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IncidentReportForm } from "@/components/safety/IncidentReportForm";
import { SafetyReportForm } from "@/components/safety/SafetyReportForm";
import { SafetyInspectionForm } from "@/components/safety/SafetyInspectionForm";
import { SafetyBulletinForm } from "@/components/safety/SafetyBulletinForm";
import { SafetyBulletinBoard } from "@/components/safety/SafetyBulletinBoard";

const safetyStats = {
  score: 95,
  incidents: 1,
  nearMisses: 3,
  inspectionsDue: 2,
  daysWithoutIncident: 14
};

// Safety Officer information
const safetyOfficer = {
  name: "Robert Wilson",
  title: "Safety Officer",
  email: "robert.wilson@example.com",
  phone: "(555) 987-6543",
  avatar: "RW",
  certification: "OSHA Certified Safety Professional"
};

const recentIncidents = [
  {
    id: 1,
    date: "May 13, 2025",
    title: "Minor Injury",
    description: "Worker sustained minor cut while handling materials",
    severity: "Low",
    location: "Building A - Floor 3",
    reported: "Michael Robinson"
  },
  {
    id: 2,
    date: "May 2, 2025",
    title: "Near Miss",
    description: "Unsecured tool nearly fell from scaffolding",
    severity: "Medium",
    location: "Building B - Exterior",
    reported: "David Lee"
  },
  {
    id: 3,
    date: "April 29, 2025",
    title: "Equipment Malfunction",
    description: "Crane safety mechanism activated during routine operation",
    severity: "Medium",
    location: "Central Site",
    reported: "Robert Wilson"
  }
];

const upcomingInspections = [
  {
    id: 1,
    date: "May 18, 2025",
    title: "Electrical Safety Inspection",
    inspector: "External Contractor",
    location: "All Buildings",
    status: "Scheduled"
  },
  {
    id: 2,
    date: "May 20, 2025",
    title: "Scaffolding Safety Check",
    inspector: "Michael Robinson",
    location: "Building A",
    status: "Pending"
  }
];

const Safety = () => {
  const [incidentFormOpen, setIncidentFormOpen] = useState(false);
  const [safetyReportFormOpen, setSafetyReportFormOpen] = useState(false);
  const [inspectionFormOpen, setInspectionFormOpen] = useState(false);
  const [bulletinFormOpen, setBulletinFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("incidents");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safety Management</h1>
          <p className="text-muted-foreground">
            Monitor and improve site safety metrics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => setSafetyReportFormOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Safety Reports
          </Button>
          <Button onClick={() => setIncidentFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* Safety Officer Profile */}
      <Card className="border-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-blue-200">
              <AvatarFallback className="bg-blue-200 text-blue-700">{safetyOfficer.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{safetyOfficer.name}</h3>
              <p className="text-sm text-blue-700 font-medium">{safetyOfficer.title}</p>
              <div className="mt-1 text-sm text-muted-foreground">
                <p>{safetyOfficer.email}</p>
                <p>{safetyOfficer.phone}</p>
                <p className="mt-1"><Badge variant="outline" className="bg-green-50">{safetyOfficer.certification}</Badge></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Safety Overview</CardTitle>
            <CardDescription>Current safety metrics and statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Overall Safety Score</span>
                <span className="font-bold text-lg">{safetyStats.score}%</span>
              </div>
              <Progress 
                value={safetyStats.score} 
                className="h-2" 
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="stat-card">
                <div className="stat-label">Incidents (Month)</div>
                <div className="stat-value">{safetyStats.incidents}</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-label">Near Misses</div>
                <div className="stat-value">{safetyStats.nearMisses}</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-label">Inspections Due</div>
                <div className="stat-value">{safetyStats.inspectionsDue}</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-label">Days Without Incident</div>
                <div className="stat-value">{safetyStats.daysWithoutIncident}</div>
              </Card>
            </div>
            <Alert>
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Safety Reminder</AlertTitle>
              <AlertDescription>
                All workers must complete the updated safety training by May 25, 2025.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common safety tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" onClick={() => setIncidentFormOpen(true)}>
              <ShieldAlert className="mr-2 h-4 w-4" />
              Report New Incident
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setSafetyReportFormOpen(true)}>
              <FileText className="mr-2 h-4 w-4" />
              Create Safety Report
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setInspectionFormOpen(true)}>
              <Clipboard className="mr-2 h-4 w-4" />
              Schedule Safety Inspection
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setBulletinFormOpen(true)}>
              <AlertCircle className="mr-2 h-4 w-4" />
              Create Safety Bulletin
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="incidents">Recent Incidents</TabsTrigger>
          <TabsTrigger value="inspections">Upcoming Inspections</TabsTrigger>
          <TabsTrigger value="bulletin">Safety Bulletin</TabsTrigger>
        </TabsList>
        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>
                Safety incidents reported in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <p className="font-medium">{incident.title}</p>
                          <p className="text-sm text-muted-foreground">{incident.date}</p>
                        </div>
                        <Badge 
                          variant={
                            incident.severity === "Low" ? "outline" :
                            incident.severity === "Medium" ? "secondary" : "destructive"
                          }
                        >
                          {incident.severity} Severity
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{incident.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <div>Location: {incident.location}</div>
                        <div>Reported by: {incident.reported}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Incidents</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="inspections">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Inspections</CardTitle>
              <CardDescription>
                Scheduled safety inspections and audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInspections.map((inspection) => (
                  <div key={inspection.id} className="border rounded-lg p-4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div>
                        <p className="font-medium">{inspection.title}</p>
                        <p className="text-sm text-muted-foreground">{inspection.date}</p>
                      </div>
                      <Badge 
                        variant={
                          inspection.status === "Scheduled" ? "outline" : "secondary"
                        }
                      >
                        {inspection.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      <div>Inspector: {inspection.inspector}</div>
                      <div>Location: {inspection.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Inspections</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="bulletin">
          <SafetyBulletinBoard />
        </TabsContent>
      </Tabs>

      {/* Form Dialogs */}
      <IncidentReportForm 
        open={incidentFormOpen} 
        onOpenChange={setIncidentFormOpen} 
      />
      
      <SafetyReportForm
        open={safetyReportFormOpen}
        onOpenChange={setSafetyReportFormOpen}
      />
      
      <SafetyInspectionForm
        open={inspectionFormOpen}
        onOpenChange={setInspectionFormOpen}
      />
      
      <SafetyBulletinForm
        open={bulletinFormOpen}
        onOpenChange={setBulletinFormOpen}
      />
    </div>
  );
};

export default Safety;
