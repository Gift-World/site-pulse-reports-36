
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Download, 
  Calendar, 
  Truck, 
  Fuel, 
  BarChart3,
  LineChart
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface PlantTabProps {
  project: Project;
}

export const PlantTab: React.FC<PlantTabProps> = ({ project }) => {
  const [showOdometerDialog, setShowOdometerDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [readingType, setReadingType] = useState<"miles" | "hours">("miles");
  const [reading, setReading] = useState<string>("");
  const [fuelAdded, setFuelAdded] = useState<string>("");
  
  const fuelUsageData = [
    { name: 'May 1', 'Excavator': 15, 'Bulldozer': 20, 'Crane': 12 },
    { name: 'May 3', 'Excavator': 18, 'Bulldozer': 22, 'Crane': 13 },
    { name: 'May 5', 'Excavator': 22, 'Bulldozer': 25, 'Crane': 15 },
    { name: 'May 7', 'Excavator': 25, 'Bulldozer': 27, 'Crane': 18 },
    { name: 'May 9', 'Excavator': 20, 'Bulldozer': 24, 'Crane': 14 },
    { name: 'May 11', 'Excavator': 24, 'Bulldozer': 29, 'Crane': 16 },
    { name: 'May 13', 'Excavator': 27, 'Bulldozer': 32, 'Crane': 19 },
    { name: 'May 15', 'Excavator': 24, 'Bulldozer': 28, 'Crane': 17 },
  ];
  
  const equipmentList = [
    { id: 'ex-001', name: 'Excavator (Large)', type: 'hours', lastReading: '125', status: 'active' },
    { id: 'bd-002', name: 'Bulldozer', type: 'hours', lastReading: '98', status: 'active' },
    { id: 'tc-003', name: 'Tower Crane', type: 'hours', lastReading: '254', status: 'active' },
    { id: 'tr-004', name: 'Dump Truck', type: 'miles', lastReading: '1,540', status: 'active' },
    { id: 'sm-005', name: 'Concrete Mixer', type: 'hours', lastReading: '75', status: 'maintenance' }
  ];
  
  const handleOdometerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Reading Recorded",
      description: `${readingType === "miles" ? "Odometer" : "Hour meter"} reading of ${reading} for ${selectedEquipment} has been recorded.`
    });
    
    setShowOdometerDialog(false);
    setReading("");
    setFuelAdded("");
  };
  
  const openOdometerDialog = (equipment: any) => {
    setSelectedEquipment(equipment.name);
    setReadingType(equipment.type as "miles" | "hours");
    setShowOdometerDialog(true);
  };
  
  const generateReport = () => {
    toast({
      title: "Equipment Report Generated",
      description: "Equipment usage and fuel consumption report has been created."
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Plant & Equipment</CardTitle>
            <CardDescription>Heavy machinery and equipment for this project</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateReport}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Excavators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-sm text-muted-foreground mt-1">2 active, 1 maintenance</p>
                <div className="mt-2">
                  <Progress value={66} className="h-2" />
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
                  <Progress value={82} className="h-2" />
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
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">75% utilization</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Equipment Odometer/Hour Readings</CardTitle>
              <CardDescription>
                Track equipment usage and fuel consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last Reading</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipmentList.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell className="font-medium">{equipment.name}</TableCell>
                      <TableCell>{equipment.type === "miles" ? "Odometer (mi)" : "Hour Meter (hrs)"}</TableCell>
                      <TableCell>{equipment.lastReading} {equipment.type}</TableCell>
                      <TableCell>May 16, 2025</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={equipment.status === "active" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-yellow-50 text-yellow-700"}
                        >
                          {equipment.status === "active" ? "Active" : "Maintenance"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openOdometerDialog(equipment)}
                          disabled={equipment.status !== "active"}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Add Reading
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Dialog open={showOdometerDialog} onOpenChange={setShowOdometerDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record Equipment Usage</DialogTitle>
                    <DialogDescription>
                      Enter the current {readingType === "miles" ? "odometer" : "hour meter"} reading for {selectedEquipment}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleOdometerSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reading">
                        Current {readingType === "miles" ? "Odometer Reading (miles)" : "Hour Meter Reading (hours)"}
                      </Label>
                      <Input
                        id="reading"
                        placeholder={`Enter ${readingType}`}
                        type="number"
                        value={reading}
                        onChange={(e) => setReading(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fuel">Fuel Added (liters)</Label>
                      <Input
                        id="fuel"
                        placeholder="Enter fuel amount"
                        type="number"
                        value={fuelAdded}
                        onChange={(e) => setFuelAdded(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowOdometerDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Reading</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Fuel Consumption Analysis</CardTitle>
                <CardDescription>Daily fuel usage by equipment</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="View by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={fuelUsageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Excavator" stroke="#0A2463" />
                    <Line type="monotone" dataKey="Bulldozer" stroke="#3E92CC" />
                    <Line type="monotone" dataKey="Crane" stroke="#D8315B" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4" /> 
                  <span>Total fuel consumption: 580 liters this month</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="border rounded-md p-4">
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
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">On site</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tower Crane</TableCell>
                  <TableCell>Apr 22, 2025</TableCell>
                  <TableCell>Nov 30, 2025</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">On site</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Concrete Pump</TableCell>
                  <TableCell>Jun 5, 2025</TableCell>
                  <TableCell>Jun 25, 2025</TableCell>
                  <TableCell><Badge variant="outline" className="bg-yellow-50 text-yellow-700">Scheduled</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
