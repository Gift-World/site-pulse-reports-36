
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface MaterialDistributionChartProps {
  materialDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const MaterialDistributionChart: React.FC<MaterialDistributionChartProps> = ({ materialDistribution }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Material Distribution</CardTitle>
        <CardDescription>By material type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={materialDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {materialDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
