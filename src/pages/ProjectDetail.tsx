
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Building, 
  User, 
  Banknote, 
  ClipboardCheck, 
  Package, 
  FileText,
  ShieldAlert,
  UserPlus,
  Image,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "./Projects";
import { 
  ChartContainer,
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const project = projects.find(p => p.id === Number(id));
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>
    );
  }

  const safetyData = [
    { name: 'Safe', value: 96, color: '#34A853' },
    { name: 'Hazards', value: 4, color: '#EA4335' }
  ];
  
  const budgetData = [
    { name: 'Spent', value: project.budget?.spent || 0, color: '#0A2463' },
    { name: 'Remaining', value: project.budget?.remaining || 0, color: '#83A2FF' }
  ];
  
  const laborDistribution = [
    { name: 'Engineers', count: 8, color: '#0A2463' },
    { name: 'Skilled Labor', count: 12, color: '#83A2FF' },
    { name: 'General Labor', count: 5, color: '#FF5722' },
    { name: 'Supervisors', count: 3, color: '#34A853' }
  ];
  
  const materialsUsage = [
    { name: 'Concrete', planned: 450, actual: 420 },
    { name: 'Steel', planned: 200, actual: 180 },
    { name: 'Lumber', planned: 300, actual: 320 },
    { name: 'Glass', planned: 120, actual: 100 }
  ];
  
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

  const getProgressColorClass = (progress: number) => {
    if (progress === 100) return "progress-gradient-good";
    if (progress >= 75) return "progress-gradient-good";
    if (progress >= 50) return "progress-gradient-warning";
    return "progress-gradient-danger";
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <Badge
                variant={
                  project.status === "Completed" ? "outline" :
                  project.status === "In Progress" ? "default" : "secondary"
                }
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {project.description}
            </p>
          </div>
          
          {project.status !== "Completed" && (
            <Button>
              Edit Project
            </Button>
          )}
        </div>
      </div>
      
      {/* Key Info Cards with Enhanced Graphics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="info-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-construction-blue" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {project.progress}%
              </div>
              <Progress 
                value={project.progress} 
                className="h-3 rounded-full overflow-hidden"
                indicatorClassName={getProgressColorClass(project.progress)}
              />
              <div className="text-sm text-muted-foreground">
                {project.progress >= 50 ? "On track" : "Needs attention"}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="info-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Banknote className="h-4 w-4 mr-2 text-construction-blue" />
              Budget Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">
                  ${project.budget?.spent.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  of ${project.budget?.total.toLocaleString()}
                </div>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={30}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={(props) => {
                        const { payload } = props;
                        if (!payload || !payload.length) return null;
                        return (
                          <div className="bg-white p-2 border rounded shadow text-xs">
                            <p>{`${payload[0].name}: $${payload[0].value.toLocaleString()}`}</p>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-construction-green">
                ${project.budget?.remaining.toLocaleString()} remaining
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="info-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <ClipboardCheck className="h-4 w-4 mr-2 text-construction-blue" />
              Tasks Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {project.tasks?.completed}
                <span className="text-sm text-muted-foreground font-normal ml-2">
                  of {project.tasks?.total} tasks
                </span>
              </div>
              
              <Progress 
                value={(project.tasks?.completed || 0) / (project.tasks?.total || 1) * 100} 
                className="h-3 rounded-full overflow-hidden"
                indicatorClassName="progress-gradient-good"
              />
              
              {project.tasks?.overdue ? (
                <p className="text-sm text-construction-red flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {project.tasks.overdue} overdue tasks
                </p>
              ) : (
                <p className="text-sm text-construction-green flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  No overdue tasks
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="info-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <ShieldAlert className="h-4 w-4 mr-2 text-construction-blue" />
              Safety Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                96%
                <span className="text-sm text-muted-foreground font-normal ml-2">
                  Safety compliance
                </span>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safetyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={30}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {safetyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={(props) => {
                        const { payload } = props;
                        if (!payload || !payload.length) return null;
                        return (
                          <div className="bg-white p-2 border rounded shadow text-xs">
                            <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-construction-green">
                2 fewer incidents than last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content with Additional Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="plant">Plant & Equipment</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="safety">Safety Reports</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="program">Program of Works</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Client</h3>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.client}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Team Size</h3>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.team} members</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.dueDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Budget</h3>
                    <div className="flex items-center">
                      <Banknote className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>${project.budget?.total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tasks</h3>
                    <div className="flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>{project.tasks?.total} total tasks</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Materials Budget</h3>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-construction-blue" />
                      <span>${project.materials?.allocated.toLocaleString()} allocated</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {project.notes && (
                <>
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-1 text-construction-blue" />
                      <p>{project.notes}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Contacts</CardTitle>
                <CardDescription>Key people for this project</CardDescription>
              </CardHeader>
              <CardContent>
                {project.contacts?.length ? (
                  <div className="space-y-4">
                    {project.contacts.map((contact, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground mb-1">{contact.role}</div>
                        <div className="text-sm">{contact.email}</div>
                        <div className="text-sm">{contact.phone}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center py-4">
                    No contacts available
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Key Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Key Milestones</CardTitle>
                <CardDescription>Major project milestones</CardDescription>
              </CardHeader>
              <CardContent>
                {project.milestones?.length ? (
                  <div className="space-y-4">
                    {project.milestones.slice(0, 3).map((milestone, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-sm text-muted-foreground">{milestone.dueDate}</div>
                        </div>
                        {getStatusBadge(milestone.status)}
                      </div>
                    ))}
                    {project.milestones.length > 3 && (
                      <Button 
                        variant="ghost" 
                        className="w-full" 
                        onClick={() => setActiveTab("milestones")}
                      >
                        View All Milestones
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center py-4">
                    No milestones available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>All milestones for this project</CardDescription>
            </CardHeader>
            <CardContent>
              {project.milestones?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Milestone</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.milestones.map((milestone, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{milestone.name}</TableCell>
                        <TableCell>{milestone.dueDate}</TableCell>
                        <TableCell>{getStatusBadge(milestone.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-muted-foreground text-center py-4">
                  No milestones available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
              <CardDescription>All team members working on this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Team Composition</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={laborDistribution}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="count" name="Staff Count">
                          {laborDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="text-center py-4 border-t">
                  <p className="text-muted-foreground">Team member details coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">Current team size: {project.team} members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
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
        </TabsContent>
        
        <TabsContent value="labor">
          <Card>
            <CardHeader>
              <CardTitle>Labor Management</CardTitle>
              <CardDescription>Workforce allocation and tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Progress value={64.8} className="h-2" indicatorClassName="progress-gradient-warning" />
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Labor Budget</span>
                        <span>$450,000 / $650,000</span>
                      </div>
                      <Progress value={69.2} className="h-2" indicatorClassName="progress-gradient-warning" />
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Productivity</span>
                        <span>93%</span>
                      </div>
                      <Progress value={93} className="h-2" indicatorClassName="progress-gradient-good" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plant">
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
        </TabsContent>
        
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Project Gallery</CardTitle>
              <CardDescription>Photos and visual documentation</CardDescription>
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
                <Button>
                  Upload New Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety">
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
        </TabsContent>
        
        <TabsContent value="program">
          <Card>
            <CardHeader>
              <CardTitle>Program of Works</CardTitle>
              <CardDescription>Project schedule and work breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-3">Project Timeline</h3>
                  <div className="space-y-4">
                    <div className="relative pl-8 pb-8 border-l-2 border-construction-blue">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-construction-blue"></div>
                      <div className="font-medium text-construction-blue">Project Start</div>
                      <div className="text-sm text-muted-foreground">Feb 15, 2025</div>
                      <div className="text-sm mt-1">Site preparation and mobilization</div>
                    </div>
                    <div className="relative pl-8 pb-8 border-l-2 border-construction-blue">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-construction-blue"></div>
                      <div className="font-medium text-construction-blue">Phase 1: Foundation</div>
                      <div className="text-sm text-muted-foreground">Feb 28 - Apr 15, 2025</div>
                      <div className="text-sm mt-1">Excavation and foundation work</div>
                      <Badge className="mt-2">Completed</Badge>
                    </div>
                    <div className="relative pl-8 pb-8 border-l-2 border-construction-blue">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-construction-blue"></div>
                      <div className="font-medium text-construction-blue">Phase 2: Structural Work</div>
                      <div className="text-sm text-muted-foreground">Apr 20 - Aug 15, 2025</div>
                      <div className="text-sm mt-1">Steel erection and concrete work</div>
                      <Badge variant="default" className="mt-2">In Progress</Badge>
                    </div>
                    <div className="relative pl-8 pb-8 border-l-2 border-muted">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                      <div className="font-medium">Phase 3: Building Envelope</div>
                      <div className="text-sm text-muted-foreground">Aug 20 - Oct 30, 2025</div>
                      <div className="text-sm mt-1">Exterior walls, roofing, and windows</div>
                      <Badge variant="secondary" className="mt-2">Pending</Badge>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                      <div className="font-medium">Project Completion</div>
                      <div className="text-sm text-muted-foreground">Dec 15, 2025</div>
                      <div className="text-sm mt-1">Final inspections and handover</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button>View Detailed Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <CardDescription>Contract, specifications, drawings and other documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                          <span>Technical Specifications</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                          <span>Material Requirements</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                          <span>Quality Standards</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contracts & Legal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                          <span>Main Contract</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                          <span>Subcontractor Agreements</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                          <span>Insurance Documents</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 text-center">
                <Button>
                  Upload New Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
