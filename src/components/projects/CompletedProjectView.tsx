
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ShieldAlert, Banknote, TrendingUp, TrendingDown, Image } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CompletedProjectViewProps {
  project: Project;
}

export const CompletedProjectView: React.FC<CompletedProjectViewProps> = ({ project }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="outline" className="bg-green-50 text-construction-green">Completed</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-50 text-construction-blue">In Progress</Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-50 text-construction-orange">Pending</Badge>;
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Critical Dates Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Dates</CardTitle>
          <CardDescription>Important project timeline milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8 border-l-2 border-construction-blue">
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute left-[-22px] top-0 h-5 w-5 rounded-full bg-construction-navy border-2 border-white"></div>
                <div className="mb-1 text-lg font-medium">Project Start</div>
                <div className="text-sm text-muted-foreground">Feb 15, 2024</div>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-22px] top-0 h-5 w-5 rounded-full bg-construction-green border-2 border-white"></div>
                <div className="mb-1 text-lg font-medium">Project Completion</div>
                <div className="text-sm text-muted-foreground">Apr 15, 2025</div>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-22px] top-0 h-5 w-5 rounded-full bg-construction-orange border-2 border-white"></div>
                <div className="mb-1 text-lg font-medium">Lapse of Defects Liability</div>
                <div className="text-sm text-muted-foreground">{project.defectsLiability?.lapseDate}</div>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-22px] top-0 h-5 w-5 rounded-full bg-construction-red border-2 border-white"></div>
                <div className="mb-1 text-lg font-medium">End of Defects Liability</div>
                <div className="text-sm text-muted-foreground">{project.defectsLiability?.endDate}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-construction-navy" />
              Final Project Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Complete documentation of the project execution, challenges and outcomes
            </p>
            <Button className="w-full">
              Download Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2 text-construction-navy" />
              Final Safety Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive safety analysis and incident documentation
            </p>
            <Button className="w-full">
              Download Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Banknote className="h-5 w-5 mr-2 text-construction-navy" />
              Final Budget Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed financial breakdown with projected vs actual expenses
            </p>
            <Button className="w-full">
              Download Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Final Budget */}
      <Card>
        <CardHeader>
          <CardTitle>Final Budget Analysis</CardTitle>
          <CardDescription>Projected vs Actual Costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    category: "Materials",
                    projected: 7500000,
                    actual: 7200000
                  },
                  {
                    category: "Labor",
                    projected: 6500000,
                    actual: 6300000
                  },
                  {
                    category: "Equipment",
                    projected: 3200000,
                    actual: 3100000
                  },
                  {
                    category: "Subcontractors",
                    projected: 1300000,
                    actual: 1200000
                  }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="projected" name="Projected Cost" fill="#0A2463" />
                <Bar dataKey="actual" name="Actual Cost" fill="#FF5722" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 border rounded-md bg-green-50">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Budget</div>
                <div className="text-xl font-bold">${project.budget?.total.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Spent</div>
                <div className="text-xl font-bold">${project.budget?.spent.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Remaining/Saved</div>
                <div className="text-xl font-bold text-green-600">${project.budget?.remaining.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Key Milestones</CardTitle>
          <CardDescription>Major project achievements and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actual Date</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.milestones?.map((milestone, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{milestone.name}</TableCell>
                  <TableCell>{milestone.dueDate}</TableCell>
                  <TableCell>{milestone.status === "Completed" ? milestone.dueDate : "-"}</TableCell>
                  <TableCell className="text-green-600">On time</TableCell>
                  <TableCell>{getStatusBadge(milestone.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Key Impacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-100">
          <CardHeader className="bg-green-50 rounded-t-lg">
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Positive Impacts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {project.keyImpacts?.positive.map((impact, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  {impact}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardHeader className="bg-red-50 rounded-t-lg">
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
              Negative Impacts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {project.keyImpacts?.negative.map((impact, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  {impact}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Project Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Project Gallery</CardTitle>
          <CardDescription>Visual documentation of the project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-secondary rounded-md flex items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline">
              View All Photos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
