
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { projects } from "./Projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const ProjectProgress = () => {
  const navigate = useNavigate();

  // Generate weekly progress data for each project
  const generateWeeklyData = (progress: number) => {
    const weeks = [];
    const increment = progress / 20; // Spread progress over 20 weeks
    for (let i = 0; i <= 20; i++) {
      weeks.push({
        week: `Week ${i + 1}`,
        progress: Math.min(progress, i * increment)
      });
    }
    return weeks;
  };

  // Generate monthly data
  const generateMonthlyData = (progress: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month, index) => ({
      month,
      progress: Math.min(progress, (progress / 6) * (index + 1))
    }));
  };

  // Generate yearly data
  const generateYearlyData = (progress: number) => {
    const years = ["2023", "2024", "2025"];
    return years.map((year, index) => ({
      year,
      progress: Math.min(progress, (progress / 3) * (index + 1))
    }));
  };

  const getProgressTrend = (current: number, timelapse: number) => {
    if (current > timelapse) return { trend: "ahead", color: "text-green-600", icon: TrendingUp };
    if (current < timelapse - 10) return { trend: "behind", color: "text-red-600", icon: Clock };
    return { trend: "ontrack", color: "text-blue-600", icon: TrendingUp };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Progress</h1>
          <p className="text-muted-foreground">
            Detailed progress tracking for all projects
          </p>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
          <TabsTrigger value="yearly">Yearly Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {projects.map((project) => {
            const progressTrend = getProgressTrend(project.progress, project.timelapse || 0);
            const TrendIcon = progressTrend.icon;

            return (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {project.name}
                        <Badge variant={project.status === "Completed" ? "outline" : "default"}>
                          {project.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendIcon className={`h-5 w-5 ${progressTrend.color}`} />
                      <Badge 
                        variant={progressTrend.trend === "ahead" ? "outline" : 
                                progressTrend.trend === "behind" ? "destructive" : "secondary"}
                      >
                        {progressTrend.trend === "ahead" ? "Ahead of Schedule" :
                         progressTrend.trend === "behind" ? "Behind Schedule" : "On Track"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                      <p className="text-2xl font-bold">{project.progress}%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Time Progress</p>
                      <p className="text-2xl font-bold">{project.timelapse || 0}%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                      <p className="text-lg font-semibold">{project.dueDate}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                      <p className="text-2xl font-bold">{project.team}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress 
                      value={project.progress} 
                      className="h-3"
                      indicatorClassName={
                        project.progress === 100 ? "bg-green-500" :
                        project.progress > 75 ? "bg-blue-500" : 
                        project.progress > 50 ? "bg-yellow-500" : "bg-red-500"
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Time Progress</span>
                      <span>{project.timelapse || 0}%</span>
                    </div>
                    <Progress 
                      value={project.timelapse || 0} 
                      className="h-3"
                      indicatorClassName="bg-gray-400"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name} - Weekly Progress</CardTitle>
                <CardDescription>Progress tracking over the past 20 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateWeeklyData(project.progress)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Progress']} />
                      <Line type="monotone" dataKey="progress" stroke="#1A73E8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name} - Monthly Progress</CardTitle>
                <CardDescription>Progress tracking over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={generateMonthlyData(project.progress)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Progress']} />
                      <Bar dataKey="progress" fill="#1A73E8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="yearly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Progress Overview</CardTitle>
              <CardDescription>Progress comparison across all projects by year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={generateYearlyData(65)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Average Progress']} />
                    <Bar dataKey="progress" fill="#1A73E8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectProgress;
