
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface LaborTabProps {
  project: Project;
}

export const LaborTab: React.FC<LaborTabProps> = ({ project }) => {
  const laborDistribution = [
    { name: 'Engineers', count: 8, color: '#0A2463' },
    { name: 'Skilled Labor', count: 12, color: '#83A2FF' },
    { name: 'General Labor', count: 5, color: '#FF5722' },
    { name: 'Supervisors', count: 3, color: '#34A853' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Labor Management</CardTitle>
        <CardDescription>Workforce allocation and tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Labor Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={laborDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({name, count}) => `${name}: ${count}`}
                  >
                    {laborDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Resource Allocation</h3>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Labor Hours</span>
                  <span>3,240 / 5,000 hrs</span>
                </div>
                <Progress value={64.8} className="h-2" indicatorClassName="progress-gradient-warning" />
              </div>
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Labor Budget</span>
                  <span>$450,000 / $650,000</span>
                </div>
                <Progress value={69.2} className="h-2" indicatorClassName="progress-gradient-warning" />
              </div>
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Productivity</span>
                  <span>93%</span>
                </div>
                <Progress value={93} className="h-2" indicatorClassName="progress-gradient-good" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
