
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
  ChartLine,
  Activity,
  DollarSign,
  ChartBar
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
  Legend,
  PieChart,
  Pie,
  Cell,
  LabelList
} from "recharts";

// Sample data representing multiple projects
const projectsData = [
  {
    id: 1,
    name: "Skyline Tower",
    status: "In Progress",
    progress: 75,
    budget: { total: 450000, spent: 320000 },
  },
  {
    id: 2,
    name: "Harbor Bridge",
    status: "In Progress",
    progress: 45,
    budget: { total: 350000, spent: 150000 },
  },
  {
    id: 3,
    name: "City Plaza",
    status: "In Progress",
    progress: 60,
    budget: { total: 250000, spent: 180000 },
  },
  {
    id: 4,
    name: "Mountain Resort",
    status: "On Hold",
    progress: 30,
    budget: { total: 180000, spent: 50000 },
  },
  {
    id: 5,
    name: "Central Park",
    status: "Completed",
    progress: 100,
    budget: { total: 120000, spent: 115000 },
  }
];

// Calculate number of active projects
const activeProjects = projectsData.filter(p => p.status === "In Progress").length;

// Calculate total budget spent
const totalBudgetSpent = projectsData.reduce((sum, project) => sum + project.budget.spent, 0);
const totalBudget = projectsData.reduce((sum, project) => sum + project.budget.total, 0);
const budgetSpentPercentage = Math.round((totalBudgetSpent / totalBudget) * 100);

// Calculate overall progress across active projects
const activeProjectsData = projectsData.filter(p => p.status === "In Progress");
const overallProgress = Math.round(
  activeProjectsData.reduce((sum, project) => sum + project.progress, 0) / 
  (activeProjectsData.length || 1)
);

// Format project data for the horizontal bar chart
const projectProgressData = projectsData.map(project => ({
  name: project.name,
  progress: project.progress,
  status: project.status
}));

// Progress data for all projects over time
const progressData = [
  { month: "Jan", progress: 12 },
  { month: "Feb", progress: 25 },
  { month: "Mar", progress: 30 },
  { month: "Apr", progress: 42 },
  { month: "May", progress: 55 },
  { month: "Jun", progress: 68 },
  { month: "Jul", progress: overallProgress }
];

// Safety data across all sites
const safetyData = [
  { site: "Skyline Tower", incidents: 0, nearMisses: 2 },
  { site: "Harbor Bridge", incidents: 1, nearMisses: 3 },
  { site: "City Plaza", incidents: 0, nearMisses: 1 },
  { site: "Mountain Resort", incidents: 0, nearMisses: 0 },
  { site: "Central Park", incidents: 0, nearMisses: 0 },
];

const taskStatusData = [
  { name: "Completed", value: 68, color: "#1A73E8" },
  { name: "In Progress", value: 22, color: "#FF5722" },
  { name: "Not Started", value: 10, color: "#EEEEEE" }
];

const issuesByPriority = [
  { name: "High", value: 5, color: "#EA4335" },
  { name: "Medium", value: 4, color: "#FF5722" },
  { name: "Low", value: 3, color: "#FFC107" }
];

const budgetDistribution = [
  { name: "Materials", value: 42, color: "#1A73E8" },
  { name: "Labor", value: 30, color: "#34A853" },
  { name: "Equipment", value: 15, color: "#FBBC05" },
  { name: "Other", value: 13, color: "#9e9e9e" }
];

const safetyStats = [
  { name: "Safe Days", value: 36, color: "#34A853" },
  { name: "Near Misses", value: 6, color: "#FBBC05" },
  { name: "Incidents", value: 1, color: "#EA4335" }
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

// Custom fill colors based on project status
const getProjectBarFill = (status) => {
  switch(status) {
    case "Completed": return "#34A853";
    case "In Progress": return "#1A73E8";
    case "On Hold": return "#FF5722";
    default: return "#9e9e9e";
  }
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to SitePlann. Monitor your construction project progress and activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground">
                  {activeProjects > 2 ? "+1 from last month" : "Same as last month"}
                </p>
              </div>
              <div className="h-20 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Active", value: activeProjects, color: "#1A73E8" },
                        { name: "Other", value: projectsData.length - activeProjects, color: "#EEEEEE" }
                      ]}
                      innerRadius={25}
                      outerRadius={35}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {[
                        { name: "Active", value: activeProjects, color: "#1A73E8" },
                        { name: "Other", value: projectsData.length - activeProjects, color: "#EEEEEE" }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Progress 
              value={activeProjects / projectsData.length * 100} 
              className="mt-3 h-2 bg-secondary [&>div]:bg-construction-blue" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-2xl font-bold">${(totalBudgetSpent / 1000).toFixed(1)}K</div>
                <p className="text-xs text-muted-foreground">
                  {budgetSpentPercentage}% of total budget
                </p>
              </div>
              <div className="h-20 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={35}
                      fill="#8884d8"
                      stroke="none"
                    >
                      {budgetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Progress 
              value={budgetSpentPercentage} 
              className="mt-3 h-2 bg-secondary [&>div]:bg-construction-orange" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">
                  {safetyData.reduce((sum, site) => sum + site.incidents, 0)} incidents total
                </p>
              </div>
              <div className="h-20 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safetyStats}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={25}
                      outerRadius={35}
                      stroke="none"
                    >
                      {safetyStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Progress 
              value={95} 
              className="mt-3 h-2 bg-secondary [&>div]:bg-construction-green" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
            <ChartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-2xl font-bold">{overallProgress}%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </div>
              <div className="h-20 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Completed", value: overallProgress, color: "#1A73E8" },
                        { name: "Remaining", value: 100 - overallProgress, color: "#EEEEEE" }
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={35}
                      fill="#8884d8"
                      stroke="none"
                    >
                      {[
                        { name: "Completed", value: overallProgress, color: "#1A73E8" },
                        { name: "Remaining", value: 100 - overallProgress, color: "#EEEEEE" }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Progress 
              value={overallProgress} 
              className="mt-3 h-2 bg-secondary [&>div]:bg-construction-blue" 
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overall Project Progress</CardTitle>
            <CardDescription>
              Progress overview for all projects
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={projectProgressData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 70,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="name" width={70} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                  <Bar dataKey="progress" name="Progress">
                    {projectProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getProjectBarFill(entry.status)} />
                    ))}
                    <LabelList dataKey="progress" position="right" formatter={(value) => `${value}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Safety Report</CardTitle>
            <CardDescription>
              Safety incidents and near misses across all sites
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
                  <XAxis dataKey="site" />
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
