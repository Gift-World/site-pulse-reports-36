
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { LaborForm, LaborResource } from "./LaborForm";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LaborTabProps {
  project: Project;
}

export const LaborTab: React.FC<LaborTabProps> = ({ project }) => {
  const [laborResources, setLaborResources] = useState<LaborResource[]>([
    {
      id: "1",
      name: "Alpine Construction Team",
      type: "Subcontractor",
      role: "Masonry Work",
      rate: 35,
      rateType: "Hourly",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      status: "Active"
    },
    {
      id: "2",
      name: "John Williams",
      type: "Skilled",
      role: "Electrician",
      rate: 28,
      rateType: "Hourly",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      status: "Active"
    },
    {
      id: "3",
      name: "Local Labor Group",
      type: "Unskilled",
      role: "General Labor",
      rate: 18,
      rateType: "Daily",
      workingDays: ["Monday", "Wednesday", "Friday"],
      status: "Active"
    }
  ]);

  const handleAddResource = (resource: LaborResource) => {
    setLaborResources(prevResources => [...prevResources, resource]);
  };

  // Calculate labor distribution based on resource types
  const laborDistribution = [
    { 
      name: 'Subcontractor', 
      count: laborResources.filter(r => r.type === "Subcontractor").length, 
      color: '#0A2463' 
    },
    { 
      name: 'Skilled Labor', 
      count: laborResources.filter(r => r.type === "Skilled").length, 
      color: '#83A2FF' 
    },
    { 
      name: 'General Labor', 
      count: laborResources.filter(r => r.type === "Unskilled").length, 
      color: '#FF5722' 
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? 
      <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge> : 
      <Badge variant="outline" className="bg-gray-100 text-gray-600">Inactive</Badge>;
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Subcontractor":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Subcontractor</Badge>;
      case "Skilled":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Skilled</Badge>;
      case "Unskilled":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Unskilled</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Labor Management</CardTitle>
          <CardDescription>Workforce allocation and tracking</CardDescription>
        </div>
        <LaborForm onAddResource={handleAddResource} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                <Progress value={64.8} className="h-2" />
              </div>
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Labor Budget</span>
                  <span>$450,000 / $650,000</span>
                </div>
                <Progress value={69.2} className="h-2" />
              </div>
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Productivity</span>
                  <span>93%</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
            <TabsTrigger value="skilled">Skilled Labor</TabsTrigger>
            <TabsTrigger value="unskilled">Unskilled Labor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Working Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laborResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getInitials(resource.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{resource.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(resource.type)}</TableCell>
                    <TableCell>{resource.role}</TableCell>
                    <TableCell>${resource.rate}/{resource.rateType.toLowerCase().replace('ly', '')}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {resource.workingDays.map(day => (
                          <span key={day} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                            {day.substring(0, 3)}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(resource.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="subcontractors" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Working Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laborResources
                  .filter(resource => resource.type === "Subcontractor")
                  .map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(resource.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{resource.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>${resource.rate}/{resource.rateType.toLowerCase().replace('ly', '')}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {resource.workingDays.map(day => (
                            <span key={day} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                              {day.substring(0, 3)}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(resource.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="skilled" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Working Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laborResources
                  .filter(resource => resource.type === "Skilled")
                  .map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(resource.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{resource.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>${resource.rate}/{resource.rateType.toLowerCase().replace('ly', '')}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {resource.workingDays.map(day => (
                            <span key={day} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                              {day.substring(0, 3)}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(resource.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="unskilled" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Working Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laborResources
                  .filter(resource => resource.type === "Unskilled")
                  .map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(resource.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{resource.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>${resource.rate}/{resource.rateType.toLowerCase().replace('ly', '')}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {resource.workingDays.map(day => (
                            <span key={day} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                              {day.substring(0, 3)}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(resource.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
