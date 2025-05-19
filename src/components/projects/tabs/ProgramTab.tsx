
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
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileDown
} from "lucide-react";

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

export const ProgramTab: React.FC<ProgramTabProps> = ({ project }) => {
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState(projectTasks);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [taskViewMode, setTaskViewMode] = useState("day");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const daysOfWeek = getDaysOfWeek();

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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Program of Works</CardTitle>
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
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar" value={viewMode} onValueChange={setViewMode} className="mb-6">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
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
                    <div key={task.id} className="relative pb-8 cursor-pointer" onClick={() => handleTaskClick(task)}>
                      <div className={`absolute left-[-16px] top-0 h-8 w-8 rounded-full ${taskStatuses[task.status as keyof typeof taskStatuses].color} flex items-center justify-center`}>
                        {task.status === "completed" ? 
                          <CheckCircle className="h-5 w-5 text-white" /> : 
                          <span className="text-white font-bold">{index + 1}</span>
                        }
                      </div>
                      <div className="border rounded-md p-4 ml-2">
                        <div className="flex justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getBadgeForStatus(task.status)}
                          </div>
                        </div>
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Tasks (Next 7 Days)</CardTitle>
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
      </CardContent>
    </Card>
  );
};
