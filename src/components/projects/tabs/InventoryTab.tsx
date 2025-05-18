
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InventoryTabProps {
  project: Project;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ project }) => {
  const materialsUsage = [
    { name: 'Concrete', planned: 450, actual: 420 },
    { name: 'Steel', planned: 200, actual: 180 },
    { name: 'Lumber', planned: 300, actual: 320 },
    { name: 'Glass', planned: 120, actual: 100 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Inventory</CardTitle>
        <CardDescription>Materials and supplies for this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Materials Usage</h3>
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
          </div>
          <div className="text-center py-4">
            <Button>Request Additional Materials</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
