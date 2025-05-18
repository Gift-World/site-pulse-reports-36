
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PlantTabProps {
  project: Project;
}

export const PlantTab: React.FC<PlantTabProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plant & Equipment</CardTitle>
        <CardDescription>Heavy machinery and equipment for this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Excavators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-sm text-muted-foreground mt-1">2 active, 1 maintenance</p>
                <div className="mt-2">
                  <Progress value={66} className="h-2" indicatorClassName="progress-gradient-warning" />
                  <div className="text-xs text-muted-foreground mt-1">66% utilization</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Cranes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground mt-1">Active on site</p>
                <div className="mt-2">
                  <Progress value={82} className="h-2" indicatorClassName="progress-gradient-good" />
                  <div className="text-xs text-muted-foreground mt-1">82% utilization</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bulldozers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-sm text-muted-foreground mt-1">All active</p>
                <div className="mt-2">
                  <Progress value={75} className="h-2" indicatorClassName="progress-gradient-good" />
                  <div className="text-xs text-muted-foreground mt-1">75% utilization</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="border rounded-md p-4 mt-6">
            <h3 className="text-lg font-medium mb-3">Equipment Schedule</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Excavator (Large)</TableCell>
                  <TableCell>May 10, 2025</TableCell>
                  <TableCell>Aug 15, 2025</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-construction-green">On site</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tower Crane</TableCell>
                  <TableCell>Apr 22, 2025</TableCell>
                  <TableCell>Nov 30, 2025</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-construction-green">On site</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Concrete Pump</TableCell>
                  <TableCell>Jun 5, 2025</TableCell>
                  <TableCell>Jun 25, 2025</TableCell>
                  <TableCell><Badge variant="outline" className="bg-yellow-50 text-construction-orange">Scheduled</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
