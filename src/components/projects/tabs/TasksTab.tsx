import React, { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { Task, Subtask } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Calendar as CalendarIcon, ListFilter, Calendar } from "lucide-react";
import TaskCalendar from "@/components/tasks/TaskCalendar";
import TaskList from "@/components/tasks/TaskList";
import TaskExport from "@/components/tasks/TaskExport";
import TaskTimeline from "@/components/tasks/TaskTimeline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO, addDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TasksTabProps {
  project: Project;
}

// Sample tasks for the project
const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Site clearing and preparation",
    description: "Remove debris and prepare the site for construction",
    status: "Completed",
    priority: "High",
    assignee: "David Lee",
    dueDate: "May 5, 2025",
    progress: 100,
    startDate: "May 1, 2025",
    endDate: "May 5, 2025",
    projectId: 1,
    projectName: "Building A Construction",
    subtasks: [
      {
        id: 101,
        title: "Remove existing vegetation",
        status: "Completed",
        progress: 100,
        assignee: "Carlos Rodriguez"
      },
      {
        id: 102,
        title: "Level ground surface",
        status: "Completed",
        progress: 100,
        assignee: "Mike Johnson"
      }
    ],
    order: 0
  },
  {
    id: 2,
    title: "Foundation excavation",
    description: "Dig foundation trenches according to architectural plans",
    status: "In Progress",
    priority: "High",
    assignee: "Robert Wilson",
    dueDate: "May 20, 2025",
    progress: 65,
    startDate: "May 10, 2025",
    endDate: "",
    projectId: 1,
    projectName: "Building A Construction",
    subtasks: [
      {
        id: 201,
        title: "Mark excavation boundaries",
        status: "Completed",
        progress: 100,
        assignee: "Sarah Johnson"
      },
      {
        id: 202,
        title: "Excavate to required depth",
        status: "In Progress",
        progress: 75,
        assignee: "Robert Wilson"
      }
    ],
    order: 1
  },
  {
    id: 3,
    title: "Rebar installation",
    description: "Place reinforcement bars for the foundation",
    status: "Pending",
    priority: "Medium",
    assignee: "Jennifer Chen",
    dueDate: "May 25, 2025",
    progress: 0,
    startDate: "May 21, 2025",
    endDate: "",
    projectId: 1,
    projectName: "Building A Construction",
    order: 2
  }
];

// Form schema for task creation
const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["Pending", "In Progress", "Completed", "Overdue"]),
  priority: z.enum(["Low", "Medium", "High"]),
  assignee: z.string().min(1, "Assignee is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  startDate: z.date({
    required_error: "Start date is required",
  })
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TasksTab({ project }: TasksTabProps) {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [exportTimeframe, setExportTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");
  const { toast } = useToast();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      assignee: "",
      dueDate: new Date(),
      startDate: new Date(),
    },
  });

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== "all" && task.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (priorityFilter !== "all" && task.priority.toLowerCase() !== priorityFilter.toLowerCase()) {
      return false;
    }
    if (assigneeFilter !== "all" && !task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort tasks by their order property
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  const handleAddTask = (data: TaskFormValues) => {
    const newTask: Task = {
      id: Math.max(0, ...tasks.map(task => task.id)) + 1,
      title: data.title,
      description: data.description || "",
      status: data.status,
      priority: data.priority,
      assignee: data.assignee,
      dueDate: format(data.dueDate, "MMM d, yyyy"),
      progress: data.status === "Completed" ? 100 : data.status === "In Progress" ? 20 : 0,
      startDate: format(data.startDate, "MMM d, yyyy"),
      endDate: "",
      projectId: project.id,
      projectName: project.name,
      subtasks: [],
      order: tasks.length // Add to the end by default
    };

    setTasks([...tasks, newTask]);
    setShowAddTaskModal(false);
    form.reset();

    toast({
      title: "Task created",
      description: "The task has been successfully added to the project.",
    });
  };

  const handleTaskReorder = (reorderedTasks: Task[]) => {
    // Update all tasks with the new order
    const updatedTasks = tasks.map(task => {
      const reorderedTask = reorderedTasks.find(t => t.id === task.id);
      if (reorderedTask) {
        return { ...task, order: reorderedTask.order };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };

  const handleAddSubtask = (taskId: number, subtaskData: any) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newSubtask: Subtask = {
          id: Date.now(), // Use timestamp as ID for simplicity
          title: subtaskData.title,
          status: subtaskData.status,
          progress: subtaskData.progress,
          assignee: subtaskData.assignee
        };
        
        return {
          ...task,
          subtasks: [...(task.subtasks || []), newSubtask]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    toast({
      title: "Subtask added",
      description: `Added "${subtaskData.title}" to the task.`,
    });
  };

  const handleAssignTask = (taskId: number) => {
    // This would open the assignment dialog in a real implementation
    toast({
      title: "Task Assignment",
      description: "Task assignment functionality would open here.",
    });
  };

  const handleDeleteTask = (taskId: number) => {
    // Filter out the task to be deleted
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    
    toast({
      title: "Task deleted",
      description: "The task has been removed from the project.",
    });
  };
  
  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    
    setTasks(updatedTasks);
    
    toast({
      title: "Task updated",
      description: "The task has been successfully updated.",
    });
  };

  // Get unique assignees for filter dropdown
  const uniqueAssignees = Array.from(
    new Set(tasks.map(task => task.assignee))
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Project Tasks</CardTitle>
          </div>
          <Button onClick={() => setShowAddTaskModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="mb-2">
                <TabsTrigger value="list">
                  <ListFilter className="mr-2 h-4 w-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendar View
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Timeline
                </TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap gap-2">
                <Select 
                  defaultValue="all"
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  defaultValue="all"
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  defaultValue="all"
                  value={assigneeFilter}
                  onValueChange={setAssigneeFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    {uniqueAssignees.map(assignee => (
                      <SelectItem key={assignee} value={assignee.toLowerCase()}>
                        {assignee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="list" className="pt-4">
              <TaskList 
                tasks={sortedTasks} 
                onReorder={handleTaskReorder}
                onAddSubtask={handleAddSubtask}
                onAssignTask={handleAssignTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            </TabsContent>
            
            <TabsContent value="calendar" className="pt-4">
              <TaskCalendar tasks={tasks} />
              <TaskExport 
                tasks={tasks}
                selectedDate={selectedDate}
                timeframe={exportTimeframe}
                onTimeframeChange={setExportTimeframe}
              />
            </TabsContent>
            
            <TabsContent value="timeline" className="pt-4">
              <TaskTimeline tasks={sortedTasks} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Add Task Modal */}
      <Dialog open={showAddTaskModal} onOpenChange={setShowAddTaskModal}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for the project.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddTask)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
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
                        <SelectItem value="Michael Robinson">Michael Robinson</SelectItem>
                      </SelectContent>
                    </Select>
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
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
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
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddTaskModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Task</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
