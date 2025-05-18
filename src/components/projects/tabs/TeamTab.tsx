
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface TeamTabProps {
  project: Project;
}

export const TeamTab: React.FC<TeamTabProps> = ({ project }) => {
  const laborDistribution = [
    { name: 'Engineers', count: 8, color: '#0A2463' },
    { name: 'Skilled Labor', count: 12, color: '#83A2FF' },
    { name: 'General Labor', count: 5, color: '#FF5722' },
    { name: 'Supervisors', count: 3, color: '#34A853' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Team</CardTitle>
        <CardDescription>All team members working on this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Team Composition</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={laborDistribution}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" name="Staff Count">
                    {laborDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="text-center py-4 border-t">
            <p className="text-muted-foreground">Team member details coming soon</p>
            <p className="text-sm text-muted-foreground mt-2">Current team size: {project.team} members</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
