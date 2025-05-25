import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  User, 
  BarChart3 
} from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import TaskCalendar from "@/components/tasks/TaskCalendar";
import TaskTimeline from "@/components/tasks/TaskTimeline";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  dueDate: Date;
  priority: "low" | "medium" | "high";
  assignee: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create the initial design for the project homepage",
    status: "in-progress",
    dueDate: new Date("2023-12-15"),
    priority: "high",
    assignee: "john-doe",
  },
  {
    id: "2",
    title: "Implement User Authentication",
    description: "Set up user authentication and authorization",
    status: "completed",
    dueDate: new Date("2023-12-20"),
    priority: "high",
    assignee: "jane-smith",
  },
  {
    id: "3",
    title: "Database Setup",
    description: "Configure and set up the project database",
    status: "completed",
    dueDate: new Date("2023-12-22"),
    priority: "medium",
    assignee: "mike-johnson",
  },
  {
    id: "4",
    title: "Develop Task Management Module",
    description: "Create the task management module with CRUD operations",
    status: "in-progress",
    dueDate: new Date("2024-01-05"),
    priority: "medium",
    assignee: "john-doe",
  },
  {
    id: "5",
    title: "Testing and Bug Fixing",
    description: "Perform thorough testing and fix any identified bugs",
    status: "pending",
    dueDate: new Date("2024-01-10"),
    priority: "high",
    assignee: "jane-smith",
  },
  {
    id: "6",
    title: "Deploy Application",
    description: "Deploy the application to the production environment",
    status: "pending",
    dueDate: new Date("2024-01-15"),
    priority: "high",
    assignee: "mike-johnson",
  },
  {
    id: "7",
    title: "Design Task List",
    description: "Create the initial design for the project task list",
    status: "overdue",
    dueDate: new Date("2023-11-15"),
    priority: "high",
    assignee: "john-doe",
  },
];

export function TasksTab() {
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date>();
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const filteredTasks = tasks.filter((task) => {
    const searchTermMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "all" || task.status === statusFilter;
    const assigneeMatch = assigneeFilter === "all" || task.assignee === assigneeFilter;

    return searchTermMatch && statusMatch && assigneeMatch;
  });

  const handleCreateTask = () => {
    if (!newTaskTitle || !newTaskDescription || !newTaskDueDate || !newTaskAssignee) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask: Task = {
      id: String(tasks.length + 1),
      title: newTaskTitle,
      description: newTaskDescription,
      status: "pending",
      dueDate: newTaskDueDate,
      priority: newTaskPriority as "low" | "medium" | "high",
      assignee: newTaskAssignee,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskDueDate(undefined);
    setNewTaskPriority("medium");
    setNewTaskAssignee("");
    setShowNewTaskForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Project Tasks</h3>
          <p className="text-sm text-muted-foreground">
            Manage and track all project tasks
          </p>
        </div>
        <Button onClick={() => setShowNewTaskForm(!showNewTaskForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === "completed").length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === "in-progress").length}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === "overdue").length}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{Math.round((tasks.filter(t => t.status === "completed").length / tasks.length) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Task Form */}
      {showNewTaskForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Task Title</label>
                <Input 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Assignee</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                >
                  <option value="">Select assignee</option>
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                  <option value="mike-johnson">Mike Johnson</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Enter task description"
                className="min-h-[80px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newTaskDueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTaskDueDate ? format(newTaskDueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTaskDueDate}
                      onSelect={setNewTaskDueDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateTask}>Create Task</Button>
              <Button variant="outline" onClick={() => setShowNewTaskForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select 
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          
          <select 
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            <option value="all">All Assignees</option>
            <option value="john-doe">John Doe</option>
            <option value="jane-smith">Jane Smith</option>
            <option value="mike-johnson">Mike Johnson</option>
          </select>
        </div>
      </div>

      {/* Task Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <TaskList tasks={filteredTasks} />
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <TaskCalendar tasks={filteredTasks} />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-6">
          <TaskTimeline tasks={filteredTasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
