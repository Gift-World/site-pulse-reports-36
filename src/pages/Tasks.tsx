import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ClipboardCheck, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle,
  Filter,
  UserPlus,
  CalendarIcon,
  Building
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/types/task";
import { Project } from "@/types/project";
import TaskAssignmentModal from "@/components/tasks/TaskAssignmentModal";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Sample projects for the select dropdown
const sampleProjects: Project[] = [
  {
    id: 1,
    name: "Building A Construction",
    description: "15-story residential building project",
    status: "In Progress",
    progress: 45,
    team: 12,
    dueDate: "December 20, 2025",
    location: "Downtown"
  },
  {
    id: 2,
    name: "Building B Construction",
    description: "Commercial shopping complex project",
    status: "Planning",
    progress: 15,
    team: 8,
    dueDate: "August 10, 2026",
    location: "Westside"
  },
  {
    id: 3,
    name: "Bridge Renovation",
    description: "Historical bridge renovation project",
    status: "In Progress",
    progress: 30,
    team: 18,
    dueDate: "July 5, 2025",
    location: "Riverfront"
  }
];

// Initial tasks will be loaded from localStorage or default to these
const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Complete foundation inspection for Building B",
    description: "Verify concrete curing and structural integrity",
    status: "Completed",
    priority: "High",
    assignee: "David Lee",
    dueDate: "May 14, 2025",
    progress: 100,
    startDate: "May 10, 2025",
    endDate: "May 14, 2025"
  },
  {
    id: 2,
    title: "Install electrical conduits on 3rd floor",
    description: "Run main electrical conduits according to plan E-301",
    status: "In Progress",
    priority: "Medium",
    assignee: "Robert Wilson",
    dueDate: "May 18, 2025",
    progress: 65,
    startDate: "May 12, 2025",
    endDate: ""
  },
  {
    id: 3,
    title: "Review updated architectural drawings",
    description: "Check revisions to floor plans for Building A",
    status: "In Progress",
    priority: "High",
    assignee: "Jennifer Chen",
    dueDate: "May 17, 2025",
    progress: 30,
    startDate: "May 15, 2025",
    endDate: ""
  },
  {
    id: 4,
    title: "Order additional steel reinforcement",
    description: "Secure materials for the next phase of construction",
    status: "Pending",
    priority: "Medium",
    assignee: "Emily Davis",
    dueDate: "May 20, 2025",
    progress: 0,
    startDate: "May 18, 2025",
    endDate: ""
  },
  {
    id: 5,
    title: "Weekly safety training for new workers",
    description: "Conduct orientation and safety briefing for new team members",
    status: "Overdue",
    priority: "High",
    assignee: "Michael Robinson",
    dueDate: "May 15, 2025",
    progress: 0,
    startDate: "May 15, 2025",
    endDate: ""
  },
  {
    id: 6,
    title: "Schedule city inspection for plumbing",
    description: "Arrange for municipal inspector to review completed plumbing work",
    status: "Pending",
    priority: "Low",
    assignee: "Sarah Johnson",
    dueDate: "May 22, 2025",
    progress: 0,
    startDate: "May 20, 2025",
    endDate: ""
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-construction-green" />;
    case "In Progress":
      return <Clock className="h-4 w-4 text-construction-blue" />;
    case "Pending":
      return <Clock className="h-4 w-4 text-construction-gray" />;
    case "Overdue":
      return <XCircle className="h-4 w-4 text-construction-red" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge variant="outline" className="bg-green-50 text-construction-green">Completed</Badge>;
    case "In Progress":
      return <Badge variant="default" className="bg-construction-blue">In Progress</Badge>;
    case "Pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "Overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return <Badge variant="outline" className="border-construction-red text-construction-red">High</Badge>;
    case "Medium":
      return <Badge variant="outline" className="border-construction-orange text-construction-orange">Medium</Badge>;
    case "Low":
      return <Badge variant="outline" className="border-construction-blue text-construction-blue">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

// Form schema for new task
const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["Pending", "In Progress", "Completed", "Overdue"]),
  priority: z.enum(["Low", "Medium", "High"]),
  assignee: z.string().min(1, "Assignee is required"),
  projectId: z.number().optional(),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

const Tasks = () => {
  // Load tasks from localStorage on initial render
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  };
  
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  
  const { toast } = useToast();
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      assignee: "",
      projectId: undefined,
      dueDate: new Date(),
      startDate: new Date(),
      endDate: undefined,
    },
  });

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== "all" && task.status.toLowerCase() !== statusFilter) {
      return false;
    }
    if (assigneeFilter !== "all" && !task.assignee.toLowerCase().includes(assigneeFilter)) {
      return false;
    }
    return true;
  });

  const handleOpenAssignModal = (task: Task) => {
    setSelectedTask(task);
    setAssignModalOpen(true);
  };

  const handleAssignTask = (taskId: number, assignee: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, assignee } : task
    );
    setTasks(updatedTasks);
    // Update localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const onSubmitTask = (data: TaskFormValues) => {
    // Determine project name if a project ID is provided
    let projectName = undefined;
    let projectId = undefined;
    
    if (data.projectId) {
      const selectedProject = sampleProjects.find(p => p.id === data.projectId);
      if (selectedProject) {
        projectName = selectedProject.name;
        projectId = selectedProject.id;
      }
    } else if (data.projectId === undefined) {
      projectName = "Random Task"; // Default for tasks with no project
    }

    const newTask: Task = {
      id: Math.max(0, ...tasks.map(task => task.id)) + 1,
      title: data.title,
      description: data.description || "",
      status: data.status,
      priority: data.priority,
      assignee: data.assignee,
      dueDate: format(data.dueDate, "MMM d, yyyy"),
      progress: data.status === "In Progress" ? 0 : data.status === "Completed" ? 100 : 0,
      startDate: format(data.startDate, "MMM d, yyyy"),
      endDate: data.endDate ? format(data.endDate, "MMM d, yyyy") : "",
      projectId: projectId,
      projectName: projectName
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    // Update localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    setShowAddTaskDialog(false);
    form.reset();

    toast({
      title: "Task created",
      description: "The task has been successfully created.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track construction tasks
          </p>
        </div>
        <Button onClick={() => setShowAddTaskDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>View and manage project tasks</CardDescription>
            </div>
            
            {/* Only show filters in the main Tasks tab */}
            <div className="flex flex-wrap gap-3">
              <Select 
                defaultValue="all"
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                defaultValue="all"
                value={assigneeFilter}
                onValueChange={setAssigneeFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  <SelectItem value="david lee">David Lee</SelectItem>
                  <SelectItem value="robert wilson">Robert Wilson</SelectItem>
                  <SelectItem value="sarah johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="jennifer chen">Jennifer Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="board">Board View</TabsTrigger>
              <TabsTrigger value="criticalPath">Critical Path</TabsTrigger>
              <TabsTrigger value="importProgram">Import Program</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="border rounded-md p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          {getStatusIcon(task.status)}
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            {task.projectName && (
                              <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <Building className="h-3 w-3 mr-1" />
                                {task.projectName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {getStatusBadge(task.status)}
                          {getPriorityBadge(task.priority)}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground mr-1">Assignee:</span>
                          <span>{task.assignee}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-1"
                            onClick={() => handleOpenAssignModal(task)}
                          >
                            <UserPlus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground mr-1">Start:</span>
                          <span>{task.startDate}</span>
                        </div>
                        {task.endDate && (
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground mr-1">End:</span>
                            <span>{task.endDate}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground mr-1">Due:</span>
                          <span>{task.dueDate}</span>
                        </div>
                        {task.status === "In Progress" && (
                          <div className="w-full md:w-40">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="board">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["Pending", "In Progress", "Completed", "Overdue"].map((status) => (
                  <div key={status} className="space-y-4">
                    <div className="font-medium flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span>{status}</span>
                      <span className="bg-muted rounded-full px-2 py-0.5 text-xs">
                        {tasks.filter(t => t.status === status).length}
                      </span>
                    </div>
                    {tasks
                      .filter(task => task.status === status)
                      .map(task => (
                        <Card key={task.id} className="shadow-sm">
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 space-y-2">
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-muted-foreground">Start: {task.startDate}</div>
                              {getPriorityBadge(task.priority)}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs">Due: {task.dueDate}</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs">Assignee: {task.assignee}</div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6"
                                onClick={() => handleOpenAssignModal(task)}
                              >
                                <UserPlus className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="criticalPath">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">Critical Path Management</h3>
                <p className="text-muted-foreground">
                  Visualize and manage the critical path for your project timeline
                </p>
                <div className="mt-6 p-8 border border-dashed rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Critical path visualization will be displayed here</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="importProgram">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">Import Program</h3>
                <p className="text-muted-foreground">
                  Import project schedules and programs from external sources
                </p>
                <div className="mt-6 p-8 border border-dashed rounded-lg flex items-center justify-center">
                  <Button variant="outline" className="mr-4">Import from MS Project</Button>
                  <Button variant="outline" className="mr-4">Import from Primavera P6</Button>
                  <Button variant="outline">Import CSV</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Task Assignment Modal */}
      {selectedTask && (
        <TaskAssignmentModal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          task={selectedTask}
          onAssign={handleAssignTask}
        />
      )}

      {/* Add Task Dialog */}
      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your project.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitTask)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter task description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Associated Project</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} 
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Random Task (No Project)</SelectItem>
                        {sampleProjects.map(project => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="David Lee">David Lee</SelectItem>
                        <SelectItem value="Robert Wilson">Robert Wilson</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Jennifer Chen">Jennifer Chen</SelectItem>
                        <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                        <SelectItem value="Michael Robinson">Michael Robinson</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date <span className="text-destructive">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
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
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddTaskDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
