
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, CheckCircle, ChevronDown, GripVertical, Plus, Search, XCircle, List, Calendar as CalendarIcon2, Route } from "lucide-react";
import { format } from "date-fns"

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

const TasksTab = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalPathTasks = tasks.filter(task => task.isCritical);

  const TaskListView = () => (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="relative w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
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
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium w-[50px]">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                </TableCell>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge className={statusColors[task.status]}>{task.status}</Badge>
                </TableCell>
                <TableCell>
                  {task.dueDate}
                </TableCell>
                <TableCell>
                  <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
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
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="list" className="flex items-center gap-2">
          <List className="h-4 w-4" />
          List View
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <CalendarIcon2 className="h-4 w-4" />
          Calendar View
        </TabsTrigger>
        <TabsTrigger value="critical" className="flex items-center gap-2">
          <Route className="h-4 w-4" />
          Critical Path
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="list" className="mt-6">
        <TaskListView />
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-6">
        <TaskCalendarView />
      </TabsContent>
      
      <TabsContent value="critical" className="mt-6">
        <CriticalPathView />
      </TabsContent>
    </Tabs>
  );
};

export default TasksTab;
