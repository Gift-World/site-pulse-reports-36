import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils"
import { CalendarIcon, CheckCircle, ChevronDown, GripVertical, Plus, Search, XCircle, List, Calendar as CalendarIcon2, Route, FileText } from "lucide-react";
import { format } from "date-fns"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
  assignee: string;
  progress: number;
  startDate: string;
  endDate: string;
  dependencies?: number[];
  isCritical?: boolean;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design Homepage",
    description: "Create the initial design for the project homepage",
    status: "In Progress",
    dueDate: "Dec 15, 2023",
    priority: "High",
    assignee: "john-doe",
    progress: 65,
    startDate: "Dec 10, 2023",
    endDate: "",
    dependencies: [],
    isCritical: true
  },
  {
    id: 2,
    title: "Implement User Authentication",
    description: "Set up user authentication and authorization",
    status: "Completed",
    dueDate: "Dec 20, 2023",
    priority: "High",
    assignee: "jane-smith",
    progress: 100,
    startDate: "Dec 15, 2023",
    endDate: "Dec 20, 2023",
    dependencies: [1],
    isCritical: true
  },
  {
    id: 3,
    title: "Database Setup",
    description: "Configure and set up the project database",
    status: "Completed",
    dueDate: "Dec 22, 2023",
    priority: "Medium",
    assignee: "mike-johnson",
    progress: 100,
    startDate: "Dec 18, 2023",
    endDate: "Dec 22, 2023",
    dependencies: [],
    isCritical: false
  },
  {
    id: 4,
    title: "Frontend Development",
    description: "Develop the frontend components and pages",
    status: "In Progress",
    dueDate: "Jan 5, 2024",
    priority: "High",
    assignee: "sarah-wilson",
    progress: 45,
    startDate: "Dec 20, 2023",
    endDate: "",
    dependencies: [1, 2],
    isCritical: true
  },
  {
    id: 5,
    title: "Testing & QA",
    description: "Comprehensive testing of all features",
    status: "Not Started",
    dueDate: "Jan 10, 2024",
    priority: "Medium",
    assignee: "alex-brown",
    progress: 0,
    startDate: "Jan 8, 2024",
    endDate: "",
    dependencies: [4],
    isCritical: true
  }
];

const statusColors: { [key: string]: string } = {
  "Not Started": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Completed": "bg-green-100 text-green-700",
  "On Hold": "bg-yellow-100 text-yellow-700",
  "Cancelled": "bg-red-100 text-red-700",
};

const priorityColors: { [key: string]: string } = {
  "High": "bg-red-100 text-red-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Low": "bg-green-100 text-green-700",
};

// Task form schema
const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["Not Started", "In Progress", "Completed", "On Hold"]),
  priority: z.enum(["Low", "Medium", "High"]),
  assignee: z.string().min(1, "Assignee is required"),
  dueDate: z.date({ required_error: "Due date is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
});

const TasksTab = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Not Started",
      priority: "Medium",
      assignee: "",
      dueDate: new Date(),
      startDate: new Date(),
    },
  });

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalPathTasks = tasks.filter(task => task.isCritical);

  const onSubmitTask = (data: any) => {
    const newTask: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: data.title,
      description: data.description || "",
      status: data.status,
      priority: data.priority,
      assignee: data.assignee,
      dueDate: format(data.dueDate, "MMM d, yyyy"),
      startDate: format(data.startDate, "MMM d, yyyy"),
      endDate: "",
      progress: data.status === "In Progress" ? 25 : data.status === "Completed" ? 100 : 0,
      dependencies: [],
      isCritical: data.priority === "High"
    };

    setTasks([...tasks, newTask]);
    setShowAddTaskDialog(false);
    form.reset();
    
    toast({
      title: "Task Created",
      description: "The task has been successfully added to the list.",
    });
  };

  const TaskListView = () => (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddTaskDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </div>

      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <GripVertical className="w-4 h-4" />
              </TableHead>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Due Date</TableHead>
              <TableHead className="hidden lg:table-cell">Priority</TableHead>
              <TableHead className="hidden xl:table-cell">Assignee</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium w-[50px]">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground sm:hidden">
                      {task.status} • {task.dueDate}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className={statusColors[task.status]}>{task.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {task.dueDate}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                </TableCell>
                <TableCell className="hidden xl:table-cell">{task.assignee}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const TaskCalendarView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Task Calendar</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h4 className="font-medium">Tasks for {date ? format(date, "PPP") : "Selected Date"}</h4>
            {tasks.filter(task => {
              if (!date) return false;
              const taskDate = new Date(task.dueDate);
              return taskDate.toDateString() === date.toDateString();
            }).map(task => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">{task.title}</h5>
                  <Badge className={statusColors[task.status]}>{task.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={priorityColors[task.priority]} variant="outline">{task.priority}</Badge>
                  <span className="text-sm text-muted-foreground">Assigned to: {task.assignee}</span>
                </div>
              </div>
            ))}
            {tasks.filter(task => {
              if (!date) return false;
              const taskDate = new Date(task.dueDate);
              return taskDate.toDateString() === date.toDateString();
            }).length === 0 && (
              <p className="text-muted-foreground">No tasks scheduled for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ProgramOfWorksView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Program of Works</h3>
          <p className="text-sm text-muted-foreground">Upload and manage project program of works</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" /> Upload Program
        </Button>
      </div>
      
      <div className="border rounded-lg p-6 text-center">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h4 className="font-medium mb-2">No Program of Works Uploaded</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Upload your project's program of works to track activities and milestones
        </p>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Upload Program File
        </Button>
      </div>
    </div>
  );

  const CriticalPathView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Critical Path Analysis</h3>
          <p className="text-sm text-muted-foreground">Tasks that directly impact project completion timeline</p>
        </div>
        <Button variant="outline">
          <Route className="w-4 h-4 mr-2" /> Recalculate Path
        </Button>
      </div>
      
      <div className="space-y-4">
        {criticalPathTasks.map((task, index) => (
          <div key={task.id} className="relative">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-red-50 border-red-200">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={statusColors[task.status]}>{task.status}</Badge>
                  <Badge className={priorityColors[task.priority]} variant="outline">{task.priority}</Badge>
                  <span className="text-sm text-muted-foreground">Due: {task.dueDate}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="text-sm text-muted-foreground">Assigned to:</span>
                <p className="font-medium">{task.assignee}</p>
              </div>
            </div>
            {index < criticalPathTasks.length - 1 && (
              <div className="absolute left-8 -bottom-2 w-0.5 h-4 bg-red-300"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900">Critical Path Summary</h4>
        <p className="text-sm text-blue-700 mt-1">
          Total critical path duration: {criticalPathTasks.length * 5} days | 
          Tasks at risk: {criticalPathTasks.filter(t => t.status === "Not Started" || t.progress < 50).length} | 
          Completion risk: {criticalPathTasks.filter(t => t.status === "Not Started" || t.progress < 50).length > 2 ? "High" : "Low"}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List View</span>
            <span className="sm:hidden">List</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon2 className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar</span>
            <span className="sm:hidden">Cal</span>
          </TabsTrigger>
          <TabsTrigger value="program" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Program</span>
            <span className="sm:hidden">Prog</span>
          </TabsTrigger>
          <TabsTrigger value="critical" className="flex items-center gap-2">
            <Route className="h-4 w-4" />
            <span className="hidden sm:inline">Critical Path</span>
            <span className="sm:hidden">Critical</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <TaskListView />
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <TaskCalendarView />
        </TabsContent>
        
        <TabsContent value="program" className="mt-6">
          <ProgramOfWorksView />
        </TabsContent>
        
        <TabsContent value="critical" className="mt-6">
          <CriticalPathView />
        </TabsContent>
      </Tabs>

      {/* Add Task Dialog */}
      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
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
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Not Started">Not Started</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
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
                        <SelectItem value="john-doe">John Doe</SelectItem>
                        <SelectItem value="jane-smith">Jane Smith</SelectItem>
                        <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                        <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                        <SelectItem value="alex-brown">Alex Brown</SelectItem>
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
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
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
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
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

export default TasksTab;
