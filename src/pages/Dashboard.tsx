import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { 
  Activity, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FolderOpen,
  Shield,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projects } from "./Projects";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Aug", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Sep", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Oct", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Nov", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Dec", uv: 1890, pv: 4800, amt: 2181 },
];

const COLORS = ['#10b981', '#8b5cf6', '#ef4444', '#3b82f6', '#eab308', '#22c55e'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calculate active projects count
  const activeProjectsCount = projects.filter(p => p.status !== "Completed").length;
  
  // Calculate total budget across all projects
  const totalBudget = projects.reduce((sum, project) => {
    return sum + (project.budget?.total || 0);
  }, 0);

  // Calculate total team members across all projects
  const totalTeamMembers = projects.reduce((sum, project) => {
    return sum + project.team;
  }, 0);

  // Calculate total tasks across all projects
  const totalTasks = projects.reduce((sum, project) => {
    return sum + (project.tasks?.total || 0);
  }, 0);

  // Calculate completed tasks across all projects
  const completedTasks = projects.reduce((sum, project) => {
    return sum + (project.tasks?.completed || 0);
  }, 0);

  // Calculate overdue tasks across all projects
  const overdueTasks = projects.reduce((sum, project) => {
    return sum + (project.tasks?.overdue || 0);
  }, 0);

  // Calculate total materials allocated across all projects
  const totalMaterialsAllocated = projects.reduce((sum, project) => {
    return sum + (project.materials?.allocated || 0);
  }, 0);

  // Calculate total materials used across all projects
  const totalMaterialsUsed = projects.reduce((sum, project) => {
    return sum + (project.materials?.used || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden" onClick={() => navigate("/app/projects")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-10 -mt-10 flex items-center justify-center opacity-50">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">{activeProjectsCount}</div>
            <p className="text-xs text-muted-foreground">
              Back to dashboard: /app/dashboard
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden" onClick={() => navigate("/app/project-budgets")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full -mr-10 -mt-10 flex items-center justify-center opacity-50">
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Back to dashboard: /app/dashboard
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden" onClick={() => navigate("/app/safety-metrics")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full -mr-10 -mt-10 flex items-center justify-center opacity-50">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Back to dashboard: /app/dashboard
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden" onClick={() => navigate("/app/project-progress")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -mr-10 -mt-10 flex items-center justify-center opacity-50">
            <Activity className="h-8 w-8 text-purple-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              Back to dashboard: /app/dashboard
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue generated per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#10b981" />
                <Bar dataKey="uv" stackId="a" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Tasks completed vs overdue</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Completed', value: completedTasks },
                    { name: 'Overdue', value: overdueTasks },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest project updates and activities</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ul className="list-none space-y-2">
            <li className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-gray-500" />
              <span>New task added to Riverfront Commercial Complex</span>
              <span className="text-xs text-gray-400 ml-auto">5 min ago</span>
            </li>
            <li className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-gray-500" />
              <span>Parkview Residential Towers budget updated</span>
              <span className="text-xs text-gray-400 ml-auto">30 min ago</span>
            </li>
            <li className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-gray-500" />
              <span>Downtown Hotel Renovation safety inspection completed</span>
              <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
            </li>
            <li className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-gray-500" />
              <span>City Center Shopping Mall construction phase started</span>
              <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
