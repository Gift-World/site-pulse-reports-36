import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Bell, 
  ClipboardCheck, 
  FileText, 
  AlertCircle,
  Calendar,
  ShieldCheck,
  ChartLine
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const projectProgress = 68;

const progressData = [
  { name: "Week 1", completed: 10, planned: 12 },
  { name: "Week 2", completed: 18, planned: 22 },
  { name: "Week 3", completed: 25, planned: 30 },
  { name: "Week 4", completed: 32, planned: 35 },
  { name: "Week 5", completed: 45, planned: 50 },
  { name: "Week 6", completed: 55, planned: 65 },
  { name: "Week 7", completed: 68, planned: 75 },
];

const safetyData = [
  { name: "Mon", incidents: 0, nearMisses: 1 },
  { name: "Tue", incidents: 0, nearMisses: 0 },
  { name: "Wed", incidents: 1, nearMisses: 2 },
  { name: "Thu", incidents: 0, nearMisses: 1 },
  { name: "Fri", incidents: 0, nearMisses: 0 },
  { name: "Sat", incidents: 0, nearMisses: 0 },
];

const recentActivities = [
  {
    id: 1,
    title: "Daily report submitted",
    description: "Site Manager uploaded the daily report for Building A",
    time: "Today, 10:30 AM",
    icon: FileText
  },
  {
    id: 2,
    title: "Safety incident reported",
    description: "Minor injury reported at the south entrance area",
    time: "Today, 9:15 AM",
    icon: AlertCircle
  },
  {
    id: 3,
    title: "Task completed",
    description: "Foundation inspection completed for Building B",
    time: "Yesterday, 4:45 PM",
    icon: ClipboardCheck
  },
  {
    id: 4,
    title: "Meeting scheduled",
    description: "Weekly progress meeting scheduled for Friday",
    time: "Yesterday, 2:30 PM",
    icon: Calendar
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to ConstructPulse. Monitor your construction project progress and activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Progress</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last week
            </p>
            <Progress 
              value={projectProgress} 
              className="mt-3 h-2 bg-secondary [&>div]:bg-construction-blue" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              5 high priority
            </p>
            <div className="mt-3 flex gap-1">
              <div className="h-2 flex-1 rounded-full bg-construction-red" />
              <div className="h-2 flex-1 rounded-full bg-construction-orange" />
              <div className="h-2 flex-1 rounded-full bg-construction-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              1 incident this week
            </p>
            <Progress 
              value={95} 
              className="mt-3 h-2 bg-secondary [&>div]:bg-construction-green" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <ChartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">
              68% of budget used
            </p>
            <Progress 
              value={68} 
              className="mt-3 h-2 bg-secondary [&>div]:bg-construction-orange" 
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>
              Weekly task completion vs. planned progress
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={progressData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="planned"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.1}
                    strokeDasharray="5 5"
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#1A73E8"
                    fill="#1A73E8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Safety Report</CardTitle>
            <CardDescription>
              Weekly safety incidents and near misses
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={safetyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="incidents" fill="#EA4335" />
                  <Bar dataKey="nearMisses" fill="#FF5722" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from the project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="rounded-full bg-muted p-2">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Important Notices</CardTitle>
            <CardDescription>
              Critical information and announcements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="alerts">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              <TabsContent value="alerts" className="space-y-4 mt-4">
                <Alert>
                  <Bell className="h-4 w-4" />
                  <AlertTitle>Weather Advisory</AlertTitle>
                  <AlertDescription>
                    Heavy rain forecasted for the next 48 hours. Secure all materials and equipment.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Material Delivery</AlertTitle>
                  <AlertDescription>
                    Concrete delivery scheduled for tomorrow at 8:00 AM. Ensure access roads are clear.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              <TabsContent value="upcoming" className="space-y-4 mt-4">
                <Alert>
                  <Calendar className="h-4 w-4" />
                  <AlertTitle>Client Visit</AlertTitle>
                  <AlertDescription>
                    Client representatives will visit the site on Friday at 2:00 PM.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Calendar className="h-4 w-4" />
                  <AlertTitle>Inspection</AlertTitle>
                  <AlertDescription>
                    Electrical system inspection scheduled for Thursday at 10:00 AM.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
