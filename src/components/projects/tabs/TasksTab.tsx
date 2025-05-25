import React, { useState } from "react";
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
import { CalendarIcon, CheckCircle, ChevronDown, GripVertical, Plus, Search, XCircle } from "lucide-react";
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
    endDate: ""
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
    endDate: "Dec 20, 2023"
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
    endDate: "Dec 22, 2023"
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
    endDate: ""
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
    endDate: ""
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

  return (
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
};

export default TasksTab;
