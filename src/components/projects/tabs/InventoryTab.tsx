import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileDown, 
  Calendar, 
  ArrowRightLeft, 
  BarChart4, 
  FileText,
  Warehouse,
  Truck,
  Box,
  FileSpreadsheet,
  File
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { MaterialRequestForm } from "@/components/inventory/MaterialRequestForm";
import { useNavigate } from "react-router-dom";
import { RequisitionForm } from "@/components/inventory/RequisitionForm";
import { TransferRequestForm } from "@/components/inventory/TransferRequestForm";
import { useNotifications } from "@/hooks/use-notifications";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface InventoryTabProps {
  project: Project;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ project }) => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  
  const materialsUsage = [
    { name: 'Concrete', planned: 450, actual: 420 },
    { name: 'Steel', planned: 200, actual: 180 },
    { name: 'Lumber', planned: 300, actual: 320 },
    { name: 'Glass', planned: 120, actual: 100 }
  ];
  
  const materialDistribution = [
    { name: 'Concrete', value: 420, color: '#0A2463' },
    { name: 'Steel', value: 180, color: '#3E92CC' },
    { name: 'Lumber', value: 320, color: '#D8315B' },
    { name: 'Glass', value: 100, color: '#1E1B18' },
    { name: 'Other', value: 150, color: '#FFFAFF' }
  ];
  
  const [activeTab, setActiveTab] = useState("usage");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  
  const generateInventoryReport = (format: "excel" | "pdf") => {
    const formatName = format === "excel" ? "Excel" : "PDF";
    addNotification({
      title: `Inventory Report Generated`,
      message: `Inventory report for ${project.name} has been created as ${formatName}.`,
      type: "system"
    });
  };
  
  const viewAllMaterials = () => {
    navigate('/materials');
  };
  
  const viewYardInventory = () => {
    navigate('/inventory');
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Project Inventory</CardTitle>
            <CardDescription>Materials and supplies for this project</CardDescription>
          </div>
          <div className="flex flex-wrap gap-3">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Report Format</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => generateInventoryReport("excel")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Generate Excel Report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => generateInventoryReport("pdf")}>
                  <File className="mr-2 h-4 w-4" />
                  Generate PDF Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-2">
            <TabsTrigger value="usage">
              <BarChart4 className="h-4 w-4 mr-2" />
              Material Usage
            </TabsTrigger>
            <TabsTrigger value="requisition">
              <FileText className="h-4 w-4 mr-2" />
              Requisitions
            </TabsTrigger>
            <TabsTrigger value="transfer">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transfers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Material Tracking</CardTitle>
                <CardDescription>Current inventory levels</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Cement</TableCell>
                      <TableCell>120</TableCell>
                      <TableCell>Bags</TableCell>
                      <TableCell>May 15, 2025</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">In Stock</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Steel Bars (12mm)</TableCell>
                      <TableCell>85</TableCell>
                      <TableCell>Pieces</TableCell>
                      <TableCell>May 14, 2025</TableCell>
                      <TableCell><Badge variant="outline" className="bg-yellow-50 text-yellow-700">Low Stock</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bricks</TableCell>
                      <TableCell>3,500</TableCell>
                      <TableCell>Pieces</TableCell>
                      <TableCell>May 16, 2025</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">In Stock</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Paint (White)</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>Gallons</TableCell>
                      <TableCell>May 10, 2025</TableCell>
                      <TableCell><Badge variant="destructive">Out of Stock</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-center gap-4">
                  <Button onClick={viewAllMaterials}>View All Materials</Button>
                  <Button variant="outline" onClick={viewYardInventory}>
                    <Warehouse className="mr-2 h-4 w-4" />
                    View Yard Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requisition" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Weekly Requisitions</CardTitle>
                  <CardDescription>Material and labor requests</CardDescription>
                </div>
                <RequisitionForm />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Requisition #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>REQ-2025-056</TableCell>
                      <TableCell>May 16, 2025</TableCell>
                      <TableCell>12 items</TableCell>
                      <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Pending</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>REQ-2025-048</TableCell>
                      <TableCell>May 9, 2025</TableCell>
                      <TableCell>8 items</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>REQ-2025-041</TableCell>
                      <TableCell>May 2, 2025</TableCell>
                      <TableCell>15 items</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Delivered</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="font-medium text-lg mb-4">Labor Requisition</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Requisition #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Labor Type</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>LAB-2025-023</TableCell>
                        <TableCell>May 16, 2025</TableCell>
                        <TableCell>Masons</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Pending</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>LAB-2025-022</TableCell>
                        <TableCell>May 15, 2025</TableCell>
                        <TableCell>Electricians</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="text-center py-4 mt-4">
                  <MaterialRequestForm />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transfer" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Material Transfers</CardTitle>
                  <CardDescription>Transfer requests between yard and site</CardDescription>
                </div>
                <TransferRequestForm />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>TRN-2025-034</TableCell>
                      <TableCell>May 16, 2025</TableCell>
                      <TableCell>Main Yard</TableCell>
                      <TableCell>Highrise Site</TableCell>
                      <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Pending</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TRN-2025-028</TableCell>
                      <TableCell>May 12, 2025</TableCell>
                      <TableCell>Office Complex</TableCell>
                      <TableCell>Highrise Site</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Delivered</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TRN-2025-021</TableCell>
                      <TableCell>May 8, 2025</TableCell>
                      <TableCell>Main Yard</TableCell>
                      <TableCell>Highrise Site</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Delivered</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-4">Equipment Transfer History</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Equipment</TableHead>
                        <TableHead>Transfer Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Concrete Mixer</TableCell>
                        <TableCell>May 10, 2025</TableCell>
                        <TableCell>May 20, 2025</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">On Site</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Excavator (Small)</TableCell>
                        <TableCell>May 5, 2025</TableCell>
                        <TableCell>May 25, 2025</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">On Site</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
