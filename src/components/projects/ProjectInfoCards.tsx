
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/types/project";
import { TrendingUp, Clock, Banknote, ShieldAlert, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectInfoCardsProps {
  project: Project;
}

export const ProjectInfoCards: React.FC<ProjectInfoCardsProps> = ({ project }) => {
  const getProgressColorClass = (progress: number) => {
    if (progress === 100) return "progress-gradient-good";
    if (progress >= 75) return "progress-gradient-good";
    if (progress >= 50) return "progress-gradient-warning";
    return "progress-gradient-danger";
  };
  
  const safetyData = [
    { name: 'Safe', value: 96, color: '#34A853' },
    { name: 'Hazards', value: 4, color: '#EA4335' }
  ];
  
  const budgetData = [
    { name: 'Spent', value: project.budget?.spent || 0, color: '#0A2463' },
    { name: 'Remaining', value: project.budget?.remaining || 0, color: '#83A2FF' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="info-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-construction-blue" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              {project.progress}%
            </div>
            <Progress 
              value={project.progress} 
              className="h-3 rounded-full overflow-hidden"
              indicatorClassName={getProgressColorClass(project.progress)}
            />
            <div className="text-sm text-muted-foreground">
              {project.progress >= 50 ? "On track" : "Needs attention"}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="info-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Clock className="h-4 w-4 mr-2 text-construction-blue" />
            Time Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              {project.timelapse}%
            </div>
            <Progress 
              value={project.timelapse} 
              className="h-3 rounded-full overflow-hidden"
              indicatorClassName={
                project.timelapse === 100 ? "bg-construction-green" :
                project.timelapse >= project.progress ? "bg-construction-orange" : 
                "bg-construction-blue"
              }
            />
            <div className="text-sm text-muted-foreground flex items-center">
              {project.timelapse && project.timelapse > project.progress + 10 ? (
                <>
                  <AlertTriangle className="h-3 w-3 mr-1 text-construction-orange" />
                  Behind schedule
                </>
              ) : project.timelapse && project.timelapse < project.progress ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1 text-construction-green" />
                  Ahead of schedule
                </>
              ) : (
                "On schedule"
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="info-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Banknote className="h-4 w-4 mr-2 text-construction-blue" />
            Budget Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">
                ${project.budget?.spent.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground text-right">
                of ${project.budget?.total.toLocaleString()}
              </div>
            </div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={30}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={(props) => {
                      const { payload } = props;
                      if (!payload || !payload.length) return null;
                      return (
                        <div className="bg-white p-2 border rounded shadow text-xs">
                          <p>{`${payload[0].name}: $${payload[0].value.toLocaleString()}`}</p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-construction-green">
              ${project.budget?.remaining.toLocaleString()} remaining
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="info-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2 text-construction-blue" />
            Safety Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              96%
              <span className="text-sm text-muted-foreground font-normal ml-2">
                Safety compliance
              </span>
            </div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={safetyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={30}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {safetyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={(props) => {
                      const { payload } = props;
                      if (!payload || !payload.length) return null;
                      return (
                        <div className="bg-white p-2 border rounded shadow text-xs">
                          <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-construction-green">
              2 fewer incidents than last month
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
