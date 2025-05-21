
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MaterialUsageChartProps {
  materialsUsage: Array<{
    name: string;
    planned: number;
    actual: number;
  }>;
}

export const MaterialUsageChart: React.FC<MaterialUsageChartProps> = ({ materialsUsage }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Materials Usage</CardTitle>
        <CardDescription>Planned vs Actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={materialsUsage}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" name="Planned Usage" fill="#0A2463" />
              <Bar dataKey="actual" name="Actual Usage" fill="#FF5722" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
