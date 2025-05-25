
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { projects } from "./Projects";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ProjectProgress = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("month");

  // Generate mock progress data for each project over time
  const generateProgressData = (projectId: number, timeframe: string) => {
    const dataPoints = timeframe === "week" ? 12 : timeframe === "month" ? 12 : 4;
    const data = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const progress = Math.min(100, (i + 1) * (100 / dataPoints) + Math.random() * 10);
      data.push({
        period: timeframe === "week" ? `Week ${i + 1}` :
                timeframe === "month" ? `Month ${i + 1}` :
                `Q${i + 1}`,
        progress: Math.round(progress)
      });
    }
    return data;
  };

  const getProgressTrend = (data: any[]) => {
    if (data.length < 2) return "stable";
    const lastTwo = data.slice(-2);
    const trend = lastTwo[1].progress - lastTwo[0].progress;
    return trend > 0 ? "up" : trend < 0 ? "down" : "stable";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "default";
      case "Planning": return "secondary";
      case "Completed": return "outline";
      case "On Hold": return "destructive";
      default: return "secondary";
    }
  };

  const formatTooltipValue = (value: any, name: string) => {
    if (typeof value === 'number') {
      return [`${value.toFixed(1)}%`, name];
    }
    return [value, name];
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
            Track progress across all projects over time
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Time Period:</span>
        <div className="flex gap-2">
          {(["week", "month", "year"] as const).map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period === "week" ? "Weekly" : period === "month" ? "Monthly" : "Yearly"}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => {
          const progressData = generateProgressData(project.id, timeframe);
          const trend = getProgressTrend(progressData);
          const currentProgress = progressData[progressData.length - 1]?.progress || 0;
          const previousProgress = progressData[progressData.length - 2]?.progress || 0;
          const progressChange = currentProgress - previousProgress;

          return (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {project.name}
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {trend === "up" ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : trend === "down" ? (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    ) : (
                      <Calendar className="h-5 w-5 text-gray-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      trend === "up" ? "text-green-600" : 
                      trend === "down" ? "text-red-600" : "text-gray-600"
                    }`}>
                      {progressChange > 0 ? '+' : ''}{progressChange.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Current Progress</p>
                    <p className="text-2xl font-bold">{project.progress}%</p>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                    <p className="text-lg font-semibold">{project.dueDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                    <p className="text-lg font-semibold">{project.team} members</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                    <p className="text-lg font-semibold">
                      {project.tasks?.completed || 0}/{project.tasks?.total || 0}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Progress Over Time ({timeframe}ly)</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={formatTooltipValue}
                          labelFormatter={(label) => `Period: ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="progress" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          name="Progress (%)"
                          dot={{ fill: "#2563eb", r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {project.status !== "Completed" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Progress Insight:</strong> {
                        trend === "up" ? `Project is progressing well with ${progressChange.toFixed(1)}% improvement this ${timeframe}.` :
                        trend === "down" ? `Project progress has slowed by ${Math.abs(progressChange).toFixed(1)}% this ${timeframe}. Consider reviewing timelines.` :
                        `Project progress is stable. Monitor closely to ensure continued momentum.`
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectProgress;
