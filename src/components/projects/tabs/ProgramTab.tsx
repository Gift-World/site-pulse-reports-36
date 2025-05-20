
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileDown,
  FileText,
  FileSpreadsheet,
  Import,
  ChartGantt,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { FileUploader } from "@/components/reports/FileUploader";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TaskImport from "@/components/tasks/TaskImport";

interface ProgramTabProps {
  project: Project;
}

// Task statuses and their corresponding colors
const taskStatuses = {
  notStarted: { label: "Not Started", color: "bg-muted" },
  inProgress: { label: "In Progress", color: "bg-construction-blue" },
  completed: { label: "Completed", color: "bg-green-500" },
  delayed: { label: "Delayed", color: "bg-yellow-500" },
  onHold: { label: "On Hold", color: "bg-red-500" }
};

// Mock project tasks
const projectTasks = [
  {
    id: 1,
    title: "Site Preparation",
    description: "Clear site and prepare for excavation",
    startDate: new Date(2025, 1, 15),
    endDate: new Date(2025, 1, 28),
    status: "completed",
    assignee: "John Doe",
    completion: 100
  },
  {
    id: 2,
    title: "Foundation Work",
    description: "Excavation and foundation pouring",
    startDate: new Date(2025, 1, 28),
    endDate: new Date(2025, 3, 15),
    status: "completed",
    assignee: "Mike Johnson",
    completion: 100
  },
  {
    id: 3,
    title: "Structural Work",
    description: "Steel erection and concrete work",
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 7, 15),
    status: "inProgress",
    assignee: "Sarah Williams",
    completion: 45
  },
  {
    id: 4,
    title: "Building Envelope",
    description: "Exterior walls, roofing, and windows",
    startDate: new Date(2025, 7, 20),
    endDate: new Date(2025, 9, 30),
    status: "notStarted",
    assignee: "Robert Chen",
    completion: 0
  },
  {
    id: 5,
    title: "Electrical Work",
    description: "Electrical wiring and fixtures",
    startDate: new Date(2025, 6, 1),
    endDate: new Date(2025, 8, 15),
    status: "notStarted",
    assignee: "Lisa Kim",
    completion: 0
  },
  {
    id: 6,
    title: "Plumbing Installation",
    description: "Plumbing system installation",
    startDate: new Date(2025, 6, 1),
    endDate: new Date(2025, 8, 15),
    status: "notStarted",
    assignee: "David Garcia",
    completion: 0
  },
  {
    id: 7,
    title: "Interior Finishes",
    description: "Drywall, painting, flooring",
    startDate: new Date(2025, 8, 15),
    endDate: new Date(2025, 10, 30),
    status: "notStarted",
    assignee: "Emily Taylor",
    completion: 0
  },
  {
    id: 8,
    title: "Site Drainage Installation",
    description: "Drainage system installation",
    startDate: new Date(2025, 4, 10),
    endDate: new Date(2025, 4, 25),
    status: "delayed",
    assignee: "Mark Wilson",
    completion: 15
  }
];

// Days of the current week
const getDaysOfWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  
  const monday = new Date(today.setDate(diff));
  
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    daysOfWeek.push(date);
  }
  
  return daysOfWeek;
};

// Get tasks for a specific date
const getTasksForDate = (date: Date, tasks: any[]) => {
  const dateStr = date.toISOString().split('T')[0];
  return tasks.filter(task => {
    const taskStart = new Date(task.startDate).toISOString().split('T')[0];
    const taskEnd = new Date(task.endDate).toISOString().split('T')[0];
    return dateStr >= taskStart && dateStr <= taskEnd;
  });
};

// Critical path mock data
const criticalPathTasks = [
  {
    id: 1,
    name: "Site Preparation",
    duration: "14 days",
    startDate: "Feb 15, 2025",
    endDate: "Feb 28, 2025",
    status: "completed",
    slack: "0 days",
    isCritical: true,
    previouslyNonCritical: false
  },
  {
    id: 2,
    name: "Foundation Work",
    duration: "45 days",
    startDate: "Feb 28, 2025",
    endDate: "Apr 15, 2025",
    status: "completed",
    slack: "0 days",
    isCritical: true,
    previouslyNonCritical: false
  },
  {
    id: 3,
    name: "Structural Work",
    duration: "118 days",
    startDate: "Apr 20, 2025",
    endDate: "Aug 15, 2025",
    status: "inProgress",
    slack: "0 days",
    isCritical: true,
    previouslyNonCritical: false
  },
  {
    id: 4,
    name: "Site Drainage Installation",
    duration: "15 days",
    startDate: "May 10, 2025",
    endDate: "May 25, 2025",
    status: "delayed",
    slack: "0 days",
    isCritical: true,
    previouslyNonCritical: true,
    criticalChange: "Became critical due to delays"
  },
  {
    id: 5,
    name: "Electrical Work",
    duration: "76 days",
    startDate: "Jun 1, 2025",
    endDate: "Aug 15, 2025",
    status: "notStarted",
    slack: "0 days",
    isCritical: true,
    previouslyNonCritical: false
  },
  {
    id: 7,
    name: "Interior Finishes",
    duration: "76 days",
    startDate: "Aug 15, 2025",
    endDate: "Oct 30, 2025",
    status: "notStarted",
    slack: "0 days",
    isCritical: true,
    previouslyNonCritical: false
  }
];

const criticalPathChanges = [
  {
    title: "Site Drainage is now on Critical Path",
    description: "The Site Drainage Installation has fallen behind schedule and is now on the critical path. This could potentially delay the overall project completion.",
    impact: "negative",
    recommendation: "Allocate additional resources to complete this task as soon as possible."
  },
  {
    title: "Structural Work ahead of schedule",
    description: "The Structural Work is progressing ahead of schedule, which provides some buffer for potential future delays.",
    impact: "positive",
    recommendation: "Maintain current pace and resource allocation."
  }
];

// Task form schema validation
const TaskFormSchema = z.object({
  title: z.string().min(2, { message: "Task name is required" }),
  description: z.string().min(2, { message: "Task description is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  assignee: z.string().min(2, { message: "Assignee is required" }),
  status: z.enum(["notStarted", "inProgress", "completed", "delayed", "onHold"]),
  priority: z.enum(["High", "Medium", "Low"]),
});

export const ProgramTab: React.FC<ProgramTabProps> = ({ project }) => {
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState(projectTasks);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [taskViewMode, setTaskViewMode] = useState("day");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [programTab, setProgramTab] = useState("calendar");
  const [importType, setImportType] = useState<string>("excel");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const daysOfWeek = getDaysOfWeek();

  // Form for new task
  const taskForm = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      assignee: "",
      status: "notStarted",
      priority: "Medium",
    },
  });

  // Function to get tasks for the selected time period
  const getFilteredTasks = () => {
    if (taskViewMode === "day" && selectedDate) {
      return getTasksForDate(selectedDate, tasks);
    } else if (taskViewMode === "week") {
      let weekTasks: any[] = [];
      daysOfWeek.forEach(day => {
        const tasksForDay = getTasksForDate(day, tasks);
        weekTasks = [...weekTasks, ...tasksForDay.filter(t => 
          !weekTasks.find(wt => wt.id === t.id)
        )];
      });
      return weekTasks;
    } else if (taskViewMode === "month" && selectedDate) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      return tasks.filter(task => {
        const taskStart = new Date(task.startDate);
        const taskEnd = new Date(task.endDate);
        return (
          (taskStart.getFullYear() === year && taskStart.getMonth() === month) ||
          (taskEnd.getFullYear() === year && taskEnd.getMonth() === month) ||
          (taskStart <= new Date(year, month, 1) && taskEnd >= new Date(year, month + 1, 0))
        );
      });
    }
    return tasks;
  };

  // Function to update task status
  const updateTaskStatus = (taskId: number, newStatus: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const completion = newStatus === "completed" ? 100 : 
                           newStatus === "notStarted" ? 0 : task.completion;
        return { ...task, status: newStatus, completion };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    toast({
      title: "Task Updated",
      description: `Task status has been updated to ${taskStatuses[newStatus as keyof typeof taskStatuses].label}`
    });
    
    setShowUpdateDialog(false);
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowUpdateDialog(true);
  };

  const exportTasks = () => {
    toast({
      title: "Tasks Exported",
      description: "Project tasks have been exported to Excel"
    });
  };

  // Function to handle program import
  const handleProgramImport = (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    toast({
      title: "Program Import Started",
      description: `Importing ${file.name}...`
    });
    
    // Simulate successful import after a delay
    setTimeout(() => {
      toast({
        title: "Program Import Completed",
        description: "Program of works has been successfully imported"
      });
    }, 2000);
  };

  const getBadgeForStatus = (status: string) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "inProgress":
        return <Badge className="bg-construction-blue">In Progress</Badge>;
      case "delayed":
        return <Badge className="bg-yellow-500">Delayed</Badge>;
      case "onHold":
        return <Badge className="bg-red-500">On Hold</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  // Calendar date modifiers to highlight dates with tasks
  const dateHasTask = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.some(task => {
      const taskStart = new Date(task.startDate).toISOString().split('T')[0];
      const taskEnd = new Date(task.endDate).toISOString().split('T')[0];
      return dateStr >= taskStart && dateStr <= taskEnd;
    });
  };

  // Handler for creating new task
  const onSubmitNewTask = (data: z.infer<typeof TaskFormSchema>) => {
    // Generate a new task id
    const newTaskId = Math.max(0, ...tasks.map(task => task.id)) + 1;
    
    // Calculate completion based on status
    const completion = data.status === "completed" ? 100 : data.status === "notStarted" ? 0 : 0;
    
    // Create new task
    const newTask = {
      id: newTaskId,
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
      assignee: data.assignee,
      completion: completion,
      priority: data.priority
    };
    
    // Add task to state
    setTasks([...tasks, newTask]);
    
    // Close dialog and reset form
    setShowNewTaskDialog(false);
    taskForm.reset();
    
    toast({
      title: "Task Created",
      description: `New task "${data.title}" has been created`
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Tasks Schedule</CardTitle>
            <CardDescription>Project schedule and work breakdown</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={taskViewMode} onValueChange={setTaskViewMode}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportTasks}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Upcoming Tasks Section Moved to Top */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Upcoming Tasks (Next 7 Days)</CardTitle>
            <Button onClick={() => setShowNewTaskDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter(task => {
                    const today = new Date();
                    const nextWeek = new Date();
                    nextWeek.setDate(today.getDate() + 7);
                    
                    const taskStart = new Date(task.startDate);
                    const taskEnd = new Date(task.endDate);
                    
                    return (taskStart >= today && taskStart <= nextWeek) || 
                           (taskEnd >= today && taskEnd <= nextWeek) ||
                           (taskStart <= today && taskEnd >= nextWeek);
                  })
                  .map(task => (
                    <TableRow 
                      key={task.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleTaskClick(task)}
                    >
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{new Date(task.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(task.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{getBadgeForStatus(task.status)}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Tabs defaultValue="calendar" value={programTab} onValueChange={setProgramTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="critical-path">Critical Path</TabsTrigger>
            <TabsTrigger value="import">Import Program</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  modifiers={{
                    hasTask: (date) => dateHasTask(date)
                  }}
                  modifiersClassNames={{
                    hasTask: "bg-construction-blue/20 font-bold relative before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:h-1 before:w-1 before:rounded-full before:bg-construction-blue"
                  }}
                  components={{
                    DayContent: ({ date }) => {
                      const hasTask = dateHasTask(date);
                      return (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {date.getDate()}
                          {hasTask && (
                            <span className="absolute -top-1 -right-1 flex h-2 w-2 items-center justify-center rounded-full bg-construction-blue"></span>
                          )}
                        </div>
                      );
                    }
                  }}
                />
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Legend:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-construction-blue"></div>
                      <span className="text-sm">Active tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Delayed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">On Hold</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-3">
                  {taskViewMode === "day" ? "Tasks for " + (selectedDate?.toLocaleDateString() || "Today") : 
                   taskViewMode === "week" ? "This Week's Tasks" : "This Month's Tasks"}
                </h3>
                <div className="space-y-4">
                  {getFilteredTasks().length > 0 ? (
                    getFilteredTasks().map(task => (
                      <div 
                        key={task.id} 
                        className={`border-l-4 ${taskStatuses[task.status as keyof typeof taskStatuses].color} border-l p-3 rounded-md cursor-pointer hover:bg-gray-50`}
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div>
                            {getBadgeForStatus(task.status)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                      <p>No tasks scheduled for this time period</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="relative pl-8 pt-8">
                  <div className="absolute left-[-8px] top-[32px] h-full w-0.5 bg-border"></div>
                  
                  {tasks.map((task, index) => (
                    <Collapsible key={task.id} className="relative pb-8">
                      <div className="flex items-start">
                        <div className={`absolute left-[-16px] top-0 h-8 w-8 rounded-full ${taskStatuses[task.status as keyof typeof taskStatuses].color} flex items-center justify-center`}>
                          {task.status === "completed" ? 
                            <CheckCircle className="h-5 w-5 text-white" /> : 
                            <span className="text-white font-bold">{index + 1}</span>
                          }
                        </div>
                        <div className="border rounded-md p-4 ml-2 w-full">
                          <CollapsibleTrigger className="flex justify-between w-full cursor-pointer">
                            <div className="flex-1">
                              <h3 className="font-medium">{task.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              {getBadgeForStatus(task.status)}
                              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pt-2 mt-2 border-t">
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Assigned to:</span>
                                <span>{task.assignee}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="text-xs text-muted-foreground mb-1">Progress: {task.completion}%</div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    task.status === "completed" ? "bg-green-500" : 
                                    task.status === "inProgress" ? "bg-construction-blue" :
                                    task.status === "delayed" ? "bg-yellow-500" :
                                    task.status === "onHold" ? "bg-red-500" : "bg-muted-foreground"
                                  }`} 
                                  style={{ width: `${task.completion}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="mt-4 text-right">
                              <Button variant="outline" size="sm" onClick={() => handleTaskClick(task)}>
                                Update Status
                              </Button>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="critical-path" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Critical Path Analysis</CardTitle>
                  <CardDescription>Comparison between original and current critical path</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-medium mb-2">Key Issues</h3>
                      {criticalPathChanges.map((change, index) => (
                        <div key={index} className={`p-4 rounded-md mb-3 ${change.impact === 'negative' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                          <h4 className="font-medium">{change.title}</h4>
                          <p className="text-sm mt-1">{change.description}</p>
                          <div className="mt-2">
                            <span className="text-sm font-medium">Recommendation: </span>
                            <span className="text-sm">{change.recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task Name</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Slack</TableHead>
                          <TableHead>Changes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {criticalPathTasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.name}</TableCell>
                            <TableCell>{task.duration}</TableCell>
                            <TableCell>{task.startDate}</TableCell>
                            <TableCell>{task.endDate}</TableCell>
                            <TableCell>{getBadgeForStatus(task.status)}</TableCell>
                            <TableCell>{task.slack}</TableCell>
                            <TableCell>
                              {task.previouslyNonCritical && (
                                <Badge variant="destructive" className="whitespace-nowrap">
                                  New to Critical Path
                                </Badge>
                              )}
                              {task.criticalChange && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {task.criticalChange}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-md p-4">
                        <h3 className="text-base font-medium mb-2">Critical Path Visualization</h3>
                        <div className="flex items-center justify-center h-52 bg-gray-100 rounded-md">
                          <ChartGantt className="h-12 w-12 text-muted-foreground" />
                          <span className="ml-2 text-muted-foreground">Interactive Gantt Chart</span>
                        </div>
                        <div className="mt-4 text-sm">
                          <p>View the critical path in a visual timeline format.</p>
                          <Button variant="outline" className="mt-2">
                            Open Full Gantt Chart
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="text-base font-medium mb-2">Project Impact Analysis</h3>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Original Completion Date:</span>
                              <span className="font-medium">Oct 30, 2025</span>
                            </div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Current Projected Completion:</span>
                              <span className="font-medium">Nov 12, 2025</span>
                            </div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Schedule Variance:</span>
                              <span className="font-medium text-red-500">+13 days</span>
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              <li>Allocate additional resources to Site Drainage Installation</li>
                              <li>Review resource allocation for upcoming critical tasks</li>
                              <li>Schedule a coordination meeting with subcontractors</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-6">
            <TaskImport onImport={(importedTasks) => {
              // Handle the imported tasks
              toast({
                title: "Tasks Imported",
                description: `${importedTasks.length} tasks have been imported.`
              });
            }} />
          </TabsContent>
        </Tabs>

        {/* Task Status Update Dialog */}
        <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Task Status</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedTask.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Current Status</Label>
                    <div className="mt-1">{getBadgeForStatus(selectedTask.status)}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Update Status To</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => updateTaskStatus(selectedTask.id, "notStarted")}
                      >
                        <div className="h-3 w-3 rounded-full bg-muted mr-2"></div>
                        Not Started
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => updateTaskStatus(selectedTask.id, "inProgress")}
                      >
                        <Play className="h-3 w-3 text-construction-blue mr-2" />
                        In Progress
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => updateTaskStatus(selectedTask.id, "onHold")}
                      >
                        <Pause className="h-3 w-3 text-red-500 mr-2" />
                        On Hold
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => updateTaskStatus(selectedTask.id, "delayed")}
                      >
                        <AlertCircle className="h-3 w-3 text-yellow-500 mr-2" />
                        Delayed
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start col-span-2"
                        onClick={() => updateTaskStatus(selectedTask.id, "completed")}
                      >
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        Completed
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="completion">Completion Percentage</Label>
                    <Input 
                      id="completion" 
                      type="number" 
                      min="0" 
                      max="100" 
                      defaultValue={selectedTask.completion} 
                      onChange={(e) => {
                        setSelectedTask({
                          ...selectedTask,
                          completion: parseInt(e.target.value) || 0
                        });
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    const updatedTasks = tasks.map(task => {
                      if(task.id === selectedTask.id) {
                        return {
                          ...task,
                          completion: selectedTask.completion
                        };
                      }
                      return task;
                    });
                    setTasks(updatedTasks);
                    setShowUpdateDialog(false);
                    toast({
                      title: "Task Updated",
                      description: "Task completion percentage has been updated"
                    });
                  }}>
                    Update Task
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* New Task Dialog */}
        <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <Form {...taskForm}>
              <form onSubmit={taskForm.handleSubmit(onSubmitNewTask)} className="space-y-6">
                <FormField
                  control={taskForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={taskForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter task description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={taskForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a start date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={taskForm.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick an end date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={taskForm.control}
                    name="assignee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assignee</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter assignee name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={taskForm.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={taskForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="notStarted">Not Started</SelectItem>
                          <SelectItem value="inProgress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                          <SelectItem value="onHold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowNewTaskDialog(false);
                      taskForm.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
