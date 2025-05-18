
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface SafetyTabProps {
  project: Project;
}

export const SafetyTab: React.FC<SafetyTabProps> = ({ project }) => {
  const safetyData = [
    { name: 'Safe', value: 96, color: '#34A853' },
    { name: 'Hazards', value: 4, color: '#EA4335' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Safety Reports</CardTitle>
        <CardDescription>Safety metrics and incident reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Safety Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-construction-green">96%</div>
                <Progress value={96} className="h-2 mt-2" indicatorClassName="progress-gradient-good" />
                <p className="text-xs text-green-600 mt-1">+2% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Incident-Free Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-construction-blue">45</div>
                <p className="text-xs text-construction-blue mt-2">Last incident: Apr 3, 2025</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Safety Training</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">100%</div>
                <Progress value={100} className="h-2 mt-2" indicatorClassName="progress-gradient-good" />
                <p className="text-xs text-amber-600 mt-1">All staff certified</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Safety Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>May 15, 2025</TableCell>
                    <TableCell>Near Miss</TableCell>
                    <TableCell>Unsecured tools on scaffolding</TableCell>
                    <TableCell><Badge variant="outline" className="bg-green-50 text-construction-green">Resolved</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 12, 2025</TableCell>
                    <TableCell>Hazard</TableCell>
                    <TableCell>Incomplete safety railing on 3rd floor</TableCell>
                    <TableCell><Badge variant="outline" className="bg-green-50 text-construction-green">Resolved</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 8, 2025</TableCell>
                    <TableCell>Good Practice</TableCell>
                    <TableCell>Team consistently using fall protection equipment</TableCell>
                    <TableCell><Badge variant="outline" className="bg-blue-50 text-construction-blue">Noted</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
