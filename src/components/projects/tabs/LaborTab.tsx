
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
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText, MoreHorizontal, Pencil, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  
  const [editResource, setEditResource] = useState<LaborResource | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddResource = (resource: LaborResource) => {
    setLaborResources(prevResources => [...prevResources, resource]);
  };
  
  const handleUpdateResource = (updatedResource: LaborResource) => {
    setLaborResources(prevResources => 
      prevResources.map(resource => 
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );
    setEditResource(null);
  };
  
  const handleEditResource = (resource: LaborResource) => {
    setEditResource(resource);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteResource = (resourceId: string) => {
    setLaborResources(prevResources => 
      prevResources.filter(resource => resource.id !== resourceId)
    );
    toast.success("Resource removed successfully");
  };

  // Function to export data to Excel (CSV)
  const exportToExcel = () => {
    const headers = ["Name", "Type", "Role", "Rate", "Rate Type", "Working Days", "Status"];
    
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    
    laborResources.forEach(resource => {
      const row = [
        `"${resource.name}"`,
        `"${resource.type}"`,
        `"${resource.role}"`,
        resource.rate,
        `"${resource.rateType}"`,
        `"${resource.workingDays.join(", ")}"`,
        `"${resource.status}"`
      ];
      
      csvContent += row.join(",") + "\n";
    });
    
    // Create a download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${project.name}_labor_resources.csv`);
    link.style.display = "none";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Labor resources exported to Excel");
  };

  // Function to export to PDF
  const exportToPDF = () => {
    // This would typically use a library like jspdf or pdfmake
    // For now we'll just show a toast message
    toast.info("PDF export functionality coming soon");
  };
  
  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Process CSV/Excel file
          const text = e.target?.result as string;
          const rows = text.split('\n');
          const headers = rows[0].split(',');
          
          // Skip header row and process data rows
          const newResources: LaborResource[] = [];
          
          for (let i = 1; i < rows.length; i++) {
            if (!rows[i].trim()) continue;
            
            const values = rows[i].split(',');
            const resource: LaborResource = {
              id: Date.now().toString() + i,
              name: values[0]?.replace(/"/g, '') || '',
              type: (values[1]?.replace(/"/g, '') || 'Skilled') as "Subcontractor" | "Skilled" | "Unskilled",
              role: values[2]?.replace(/"/g, '') || '',
              rate: parseFloat(values[3]) || 0,
              rateType: (values[4]?.replace(/"/g, '') || 'Hourly') as "Hourly" | "Daily" | "Weekly",
              workingDays: values[5]?.replace(/"/g, '').split(', ') || [],
              status: (values[6]?.replace(/"/g, '') || 'Active') as "Active" | "Inactive"
            };
            
            newResources.push(resource);
          }
          
          if (newResources.length > 0) {
            setLaborResources(prev => [...prev, ...newResources]);
            toast.success(`Imported ${newResources.length} labor resources`);
          } else {
            toast.error("No valid data found in the file");
          }
          
        } catch (error) {
          console.error("Error processing file:", error);
          toast.error("Error processing file. Please check the format and try again.");
        }
      };
      
      reader.readAsText(file);
      
      // Reset the file input
      event.target.value = '';
    }
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

  // Render a table row with actions
  const renderTableRow = (resource: LaborResource) => (
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
      <TableCell>
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditResource(resource)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => handleDeleteResource(resource.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Labor Management</CardTitle>
          <CardDescription>Workforce allocation and tracking</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              accept=".csv,.xlsx,.xls"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleFileUpload}
            />
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToExcel}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                <FileText className="mr-2 h-4 w-4" />
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LaborForm onAddResource={handleAddResource} />
        </div>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laborResources.map(resource => renderTableRow(resource))}
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
                  <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditResource(resource)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteResource(resource.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
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
                  <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditResource(resource)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteResource(resource.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
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
                  <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditResource(resource)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteResource(resource.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Edit Resource Dialog */}
      {editResource && (
        <LaborForm 
          onUpdateResource={handleUpdateResource}
          editingResource={editResource}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}
    </Card>
  );
};
