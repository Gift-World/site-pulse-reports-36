
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Users, 
  Search, 
  Calendar as CalendarIcon,
  Filter,
  UserPlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LaborResource {
  id: number;
  name: string;
  type: "Subcontractor" | "Direct Labor" | "Casual";
  role: string;
  hourlyRate: number;
  status: "On Site" | "Off Site" | "Scheduled";
  assignedTo: string;
  startDate: Date;
  endDate?: Date;
}

const laborResources: LaborResource[] = [
  {
    id: 1,
    name: "Alpine Construction Team",
    type: "Subcontractor",
    role: "Masonry Work",
    hourlyRate: 35,
    status: "On Site",
    assignedTo: "Building A - Foundation",
    startDate: new Date(2025, 4, 10),
    endDate: new Date(2025, 4, 30)
  },
  {
    id: 2,
    name: "StructTech Crew",
    type: "Subcontractor",
    role: "Steel Erection",
    hourlyRate: 42,
    status: "Scheduled",
    assignedTo: "Building B - Framework",
    startDate: new Date(2025, 4, 25),
    endDate: new Date(2025, 5, 15)
  },
  {
    id: 3,
    name: "John Williams",
    type: "Direct Labor",
    role: "Site Foreman",
    hourlyRate: 28,
    status: "On Site",
    assignedTo: "Overall Site",
    startDate: new Date(2025, 4, 1),
  },
  {
    id: 4,
    name: "ElectroSystems Team",
    type: "Subcontractor",
    role: "Electrical Work",
    hourlyRate: 38,
    status: "Off Site",
    assignedTo: "Building A - Wiring",
    startDate: new Date(2025, 5, 5),
    endDate: new Date(2025, 5, 20)
  },
  {
    id: 5,
    name: "Local Labor Group",
    type: "Casual",
    role: "General Labor",
    hourlyRate: 18,
    status: "On Site",
    assignedTo: "Material Handling",
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 22)
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Site":
      return <Badge variant="outline" className="bg-green-50 text-construction-green">On Site</Badge>;
    case "Off Site":
      return <Badge variant="outline" className="bg-gray-100 text-gray-600">Off Site</Badge>;
    case "Scheduled":
      return <Badge variant="outline" className="bg-blue-50 text-construction-blue">Scheduled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "Subcontractor":
      return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Subcontractor</Badge>;
    case "Direct Labor":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Direct Labor</Badge>;
    case "Casual":
      return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Casual</Badge>;
    default:
      return <Badge variant="secondary">{type}</Badge>;
  }
};

const Labor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const filteredResources = laborResources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Labor</h1>
          <p className="text-muted-foreground">
            Manage workforce and labor scheduling
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Workforce</CardTitle>
            <CardDescription>Current project resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{laborResources.length}</p>
                <p className="text-sm text-muted-foreground">labor resources</p>
              </div>
              <Users className="h-8 w-8 text-construction-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">On Site Today</CardTitle>
            <CardDescription>Active resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {laborResources.filter(r => r.status === "On Site").length}
                </p>
                <p className="text-sm text-muted-foreground">teams/individuals</p>
              </div>
              <div className="flex -space-x-2">
                {laborResources
                  .filter(r => r.status === "On Site")
                  .slice(0, 3)
                  .map((resource, i) => (
                    <Avatar key={i} className="border-2 border-background w-7 h-7">
                      <AvatarFallback className="text-xs">
                        {resource.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Schedule</CardTitle>
            <CardDescription>Upcoming resource changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {laborResources.filter(r => r.status === "Scheduled").length}
                </p>
                <p className="text-sm text-muted-foreground">scheduled resources</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-construction-orange" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Labor Resources</CardTitle>
          <CardDescription>
            Manage your workforce, subcontractors and labor scheduling
          </CardDescription>
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn(
                  "justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
              <TabsTrigger value="direct">Direct Labor</TabsTrigger>
              <TabsTrigger value="casuals">Casuals</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.name}</TableCell>
                      <TableCell>{getTypeBadge(resource.type)}</TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>${resource.hourlyRate}/hr</TableCell>
                      <TableCell>{getStatusBadge(resource.status)}</TableCell>
                      <TableCell>{resource.assignedTo}</TableCell>
                      <TableCell>
                        {format(resource.startDate, "MMM d")}
                        {resource.endDate && ` - ${format(resource.endDate, "MMM d")}`}
                        {!resource.endDate && " - Ongoing"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="subcontractors">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources
                    .filter(resource => resource.type === "Subcontractor")
                    .map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>${resource.hourlyRate}/hr</TableCell>
                        <TableCell>{getStatusBadge(resource.status)}</TableCell>
                        <TableCell>{resource.assignedTo}</TableCell>
                        <TableCell>
                          {format(resource.startDate, "MMM d")}
                          {resource.endDate && ` - ${format(resource.endDate, "MMM d")}`}
                          {!resource.endDate && " - Ongoing"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="direct">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources
                    .filter(resource => resource.type === "Direct Labor")
                    .map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>${resource.hourlyRate}/hr</TableCell>
                        <TableCell>{getStatusBadge(resource.status)}</TableCell>
                        <TableCell>{resource.assignedTo}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="casuals">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources
                    .filter(resource => resource.type === "Casual")
                    .map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>${resource.hourlyRate}/hr</TableCell>
                        <TableCell>{getStatusBadge(resource.status)}</TableCell>
                        <TableCell>{resource.assignedTo}</TableCell>
                        <TableCell>
                          {format(resource.startDate, "MMM d")}
                          {resource.endDate && ` - ${format(resource.endDate, "MMM d")}`}
                          {!resource.endDate && " - Ongoing"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Labor;
