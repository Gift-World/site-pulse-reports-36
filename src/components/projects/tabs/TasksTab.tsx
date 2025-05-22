
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Task } from "@/types/task";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Filter, 
  Trash2, 
  Edit,
  Calendar as CalendarIcon,
  List 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import TaskCalendar from "@/components/tasks/TaskCalendar";

interface TasksTabProps {
  project: Project;
}

// Sample tasks data - in a real app this would come from an API or store
const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Foundation Work",
    description: "Complete all foundation work for the main building",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
    dueDate: "2025-06-15",
    progress: 35,
    startDate: "2025-05-20",
    projectId: 1
  },
  {
    id: 2,
    title: "Formwork for Bases",
    description: "Install formwork for concrete bases",
    status: "Pending",
    priority: "Medium",
    assignee: "Sarah Johnson",
    dueDate: "2025-06-05",
    progress: 0,
    startDate: "2025-05-28",
    projectId: 1
  },
  {
    id: 3,
    title: "Electrical Planning",
    description: "Finalize electrical layout and wiring plans",
    status: "Completed",
    priority: "Medium",
    assignee: "Mike Wilson",
    dueDate: "2025-05-25",
    progress: 100,
    startDate: "2025-05-15",
    endDate: "2025-05-23",
    projectId: 1
  }
];

// More sample tasks for subtasks demonstration
const initialSubTasks: Record<number, Task[]> = {
  1: [
    {
      id: 101,
      title: "Excavation",
      description: "Excavate foundation area",
      status: "Completed",
      priority: "High",
      assignee: "Construction Team A",
      dueDate: "2025-05-22",
      progress: 100,
      startDate: "2025-05-18",
      endDate: "2025-05-22",
      projectId: 1
    },
    {
      id: 102,
      title: "Concrete Pouring",
      description: "Pour concrete for foundation",
      status: "In Progress",
      priority: "High",
      assignee: "Construction Team B",
      dueDate: "2025-06-10",
      progress: 25,
      startDate: "2025-05-25",
      projectId: 1
    }
  ],
  2: [
    {
      id: 201,
      title: "Material Procurement",
      description: "Order formwork materials",
      status: "Completed",
      priority: "Medium",
      assignee: "Procurement Team",
      dueDate: "2025-05-27",
      progress: 100,
      startDate: "2025-05-20",
      endDate: "2025-05-27",
      projectId: 1
    }
  ]
};

export const TasksTab: React.FC<TasksTabProps> = ({ project }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [subTasks, setSubTasks] = useState<Record<number, Task[]>>(initialSubTasks);
  const [expandedTasks, setExpandedTasks] = useState<Record<number, boolean>>({});
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isAddSubTaskOpen, setIsAddSubTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  
  // Form state
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    assignee: "",
    progress: 0,
    projectId: project.id
  });
  
  // SubTask form state
  const [subTaskFormData, setSubTaskFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    assignee: "",
    progress: 0,
    projectId: project.id
  });
  
  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    assignee: "",
    priority: ""
  });
  
  const { toast } = useToast();

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubTaskInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubTaskFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubTaskSelectChange = (name: string, value: string) => {
    setSubTaskFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        [name]: date.toISOString().split('T')[0]
      }));
    }
  };

  const handleSubTaskDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setSubTaskFormData(prev => ({
        ...prev,
        [name]: date.toISOString().split('T')[0]
      }));
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      progress: isNaN(value) ? 0 : Math.max(0, Math.min(100, value))
    }));
  };

  const handleSubTaskProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSubTaskFormData(prev => ({
      ...prev,
      progress: isNaN(value) ? 0 : Math.max(0, Math.min(100, value))
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      assignee: "",
      progress: 0,
      projectId: project.id
    });
  };

  const resetSubTaskForm = () => {
    setSubTaskFormData({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      assignee: "",
      progress: 0,
      projectId: project.id
    });
  };

  const openAddTaskDialog = () => {
    resetForm();
    setIsAddTaskOpen(true);
  };

  const openEditTaskDialog = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      ...task
    });
    setIsEditTaskOpen(true);
  };

  const openAddSubTaskDialog = (task: Task) => {
    setSelectedTask(task);
    resetSubTaskForm();
    setIsAddSubTaskOpen(true);
  };

  // Calculate progress for a task based on its subtasks
  const calculateTaskProgress = (taskId: number): number => {
    const taskSubTasks = subTasks[taskId];
    if (!taskSubTasks || taskSubTasks.length === 0) {
      // If no subtasks, return the task's original progress
      const task = tasks.find(t => t.id === taskId);
      return task?.progress || 0;
    }
    
    // Calculate average progress from all subtasks
    const totalProgress = taskSubTasks.reduce((sum, subtask) => sum + subtask.progress, 0);
    return Math.round(totalProgress / taskSubTasks.length);
  };

  // Update a subtask's status
  const updateSubTaskStatus = (taskId: number, subTaskId: number, status: Task['status'], progress: number) => {
    setSubTasks(prev => {
      const updatedSubTasks = {...prev};
      if (updatedSubTasks[taskId]) {
        updatedSubTasks[taskId] = updatedSubTasks[taskId].map(subtask => 
          subtask.id === subTaskId ? {...subtask, status, progress} : subtask
        );
      }
      return updatedSubTasks;
    });

    // Update the parent task's progress based on subtasks
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            progress: calculateTaskProgress(taskId) 
          } 
        : task
    ));
  };

  const handleAddTask = () => {
    if (!formData.title || !formData.assignee || !formData.startDate || !formData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newTask: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: formData.title || "",
      description: formData.description || "",
      status: (formData.status as "Completed" | "In Progress" | "Pending" | "Overdue") || "Pending",
      priority: (formData.priority as "High" | "Medium" | "Low") || "Medium",
      assignee: formData.assignee || "",
      dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
      progress: formData.progress || 0,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      projectId: project.id
    };

    setTasks(prev => [...prev, newTask]);
    setIsAddTaskOpen(false);
    toast({
      title: "Task Added",
      description: "New task has been added successfully"
    });
  };

  const handleAddSubTask = () => {
    if (!selectedTask || !subTaskFormData.title || !subTaskFormData.assignee || !subTaskFormData.startDate || !subTaskFormData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const taskId = selectedTask.id;
    // Generate a unique ID for the subtask
    const existingSubTasks = subTasks[taskId] || [];
    const allSubTaskIds = Object.values(subTasks).flat().map(t => t.id);
    const newSubTaskId = Math.max(0, ...allSubTaskIds, 1000) + 1;

    const newSubTask: Task = {
      id: newSubTaskId,
      title: subTaskFormData.title || "",
      description: subTaskFormData.description || "",
      status: (subTaskFormData.status as "Completed" | "In Progress" | "Pending" | "Overdue") || "Pending",
      priority: (subTaskFormData.priority as "High" | "Medium" | "Low") || "Medium",
      assignee: subTaskFormData.assignee || "",
      dueDate: subTaskFormData.dueDate || new Date().toISOString().split('T')[0],
      progress: subTaskFormData.progress || 0,
      startDate: subTaskFormData.startDate || new Date().toISOString().split('T')[0],
      projectId: project.id
    };

    setSubTasks(prev => ({
      ...prev,
      [taskId]: [...(prev[taskId] || []), newSubTask]
    }));

    // Update the parent task's progress based on all subtasks
    const updatedProgress = calculateTaskProgress(taskId);
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, progress: updatedProgress } : task
    ));

    setIsAddSubTaskOpen(false);
    toast({
      title: "Subtask Added",
      description: "New subtask has been added successfully"
    });
  };

  const handleEditTask = () => {
    if (!selectedTask || !formData.title) return;

    setTasks(prev => prev.map(task => 
      task.id === selectedTask.id ? { ...task, ...formData } : task
    ));
    
    setIsEditTaskOpen(false);
    toast({
      title: "Task Updated",
      description: "Task has been updated successfully"
    });
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    // Also delete any subtasks
    setSubTasks(prev => {
      const updatedSubTasks = {...prev};
      delete updatedSubTasks[taskId];
      return updatedSubTasks;
    });
    toast({
      title: "Task Deleted",
      description: "Task has been removed successfully"
    });
  };

  const deleteSubTask = (taskId: number, subTaskId: number) => {
    setSubTasks(prev => {
      const updatedSubTasks = {...prev};
      if (updatedSubTasks[taskId]) {
        updatedSubTasks[taskId] = updatedSubTasks[taskId].filter(subtask => subtask.id !== subTaskId);
      }
      return updatedSubTasks;
    });

    // Update the parent task progress
    const updatedProgress = calculateTaskProgress(taskId);
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, progress: updatedProgress } : task
    ));

    toast({
      title: "Subtask Deleted",
      description: "Subtask has been removed successfully"
    });
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters to tasks
  const filteredTasks = tasks.filter(task => {
    return (
      (filters.search === "" || 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) || 
        task.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status === "" || task.status === filters.status) &&
      (filters.assignee === "" || task.assignee.toLowerCase().includes(filters.assignee.toLowerCase())) &&
      (filters.priority === "" || task.priority === filters.priority)
    );
  });

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColorClass = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Project Tasks</CardTitle>
          <CardDescription>Manage and track tasks for this project</CardDescription>
        </div>
        <div className="flex space-x-2">
          <div className="flex">
            <Button 
              variant={activeView === "list" ? "default" : "outline"} 
              className="rounded-r-none"
              onClick={() => setActiveView("list")}
            >
              <List className="mr-2 h-4 w-4" />
              List
            </Button>
            <Button 
              variant={activeView === "calendar" ? "default" : "outline"} 
              className="rounded-l-none"
              onClick={() => setActiveView("calendar")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>

          <Button onClick={() => setFilterOpen(!filterOpen)}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          
          <Button onClick={openAddTaskDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardHeader>

      {/* Filters panel */}
      {filterOpen && (
        <div className="px-6 py-2 bg-muted/50 border-t border-b">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                placeholder="Filter by assignee"
                value={filters.assignee}
                onChange={(e) => handleFilterChange("assignee", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={filters.priority}
                onValueChange={(value) => handleFilterChange("priority", value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => setFilters({ search: "", status: "", assignee: "", priority: "" })} className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      <CardContent className="pt-6">
        {activeView === "list" ? (
          filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map(task => (
                <div key={task.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className="p-4 bg-muted/30 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleTaskExpansion(task.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{task.title}</h3>
                        <span className={`ml-4 px-2 py-1 text-xs rounded-full ${getStatusColorClass(task.status)}`}>
                          {task.status}
                        </span>
                        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={(e) => {
                        e.stopPropagation();
                        openAddSubTaskDialog(task);
                      }}>
                        <Plus className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => {
                        e.stopPropagation();
                        openEditTaskDialog(task);
                      }}>
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      <div className="flex flex-col items-end min-w-[200px]">
                        <span className="text-sm">Assigned to: <strong>{task.assignee}</strong></span>
                        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getProgressColorClass(task.progress)}`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs mt-1">{task.progress}% complete</span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedTasks[task.id] && (
                    <div className="p-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium">Start Date</h4>
                          <p className="text-sm">{new Date(task.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Due Date</h4>
                          <p className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                        {task.endDate && (
                          <div>
                            <h4 className="text-sm font-medium">Completed Date</h4>
                            <p className="text-sm">{new Date(task.endDate).toLocaleDateString()}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Subtasks */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Subtasks</h4>
                        {subTasks[task.id] && subTasks[task.id].length > 0 ? (
                          <div className="space-y-2">
                            {subTasks[task.id].map(subtask => (
                              <div key={subtask.id} className="p-3 bg-muted/20 rounded flex justify-between items-center">
                                <div className="flex-1">
                                  <p className="font-medium">{subtask.title}</p>
                                  <p className="text-xs text-muted-foreground">{subtask.description}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColorClass(subtask.status)}`}>
                                      {subtask.status}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
                                      {subtask.assignee}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex-col items-center space-y-1">
                                    <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${getProgressColorClass(subtask.progress)}`}
                                        style={{ width: `${subtask.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{subtask.progress}%</span>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm">Update Status</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem onClick={() => updateSubTaskStatus(task.id, subtask.id, "Pending", 0)}>
                                        Set to Pending (0%)
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => updateSubTaskStatus(task.id, subtask.id, "In Progress", 50)}>
                                        Set to In Progress (50%)
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => updateSubTaskStatus(task.id, subtask.id, "Completed", 100)}>
                                        Set to Completed (100%)
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => updateSubTaskStatus(task.id, subtask.id, "Overdue", subtask.progress)}>
                                        Mark as Overdue
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => deleteSubTask(task.id, subtask.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-muted-foreground py-4">
                            <p>No subtasks added yet.</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                openAddSubTaskDialog(task);
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add Subtask
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No tasks match your filters.</p>
              <p className="mt-2">Try adjusting your filter criteria or add new tasks.</p>
            </div>
          )
        ) : (
          <TaskCalendar tasks={tasks} />
        )}
      </CardContent>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for this project. Fill out the details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title*
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Task title"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Task description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Assignee*
              </Label>
              <Input
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Person assigned to this task"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Start Date*</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={formData.startDate ? new Date(formData.startDate) : undefined}
                  onDateChange={(date) => handleDateChange("startDate", date)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Due Date*</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={formData.dueDate ? new Date(formData.dueDate) : undefined}
                  onDateChange={(date) => handleDateChange("dueDate", date)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="progress" className="text-right">
                Progress (%)
              </Label>
              <div className="col-span-3 flex items-center gap-4">
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleProgressChange}
                />
                <span>{formData.progress}%</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update the details of this task.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-assignee" className="text-right">
                Assignee
              </Label>
              <Input
                id="edit-assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Start Date</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={formData.startDate ? new Date(formData.startDate) : undefined}
                  onDateChange={(date) => handleDateChange("startDate", date)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Due Date</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={formData.dueDate ? new Date(formData.dueDate) : undefined}
                  onDateChange={(date) => handleDateChange("dueDate", date)}
                />
              </div>
            </div>
            
            {formData.status === "Completed" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">End Date</Label>
                <div className="col-span-3">
                  <DatePicker 
                    date={formData.endDate ? new Date(formData.endDate) : undefined}
                    onDateChange={(date) => handleDateChange("endDate", date)}
                  />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-progress" className="text-right">
                Progress (%)
              </Label>
              <div className="col-span-3 flex items-center gap-4">
                <Input
                  id="edit-progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleProgressChange}
                />
                <span>{formData.progress}%</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTask}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add SubTask Dialog */}
      <Dialog open={isAddSubTaskOpen} onOpenChange={setIsAddSubTaskOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Subtask</DialogTitle>
            <DialogDescription>
              Create a new subtask for: {selectedTask?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subtask-title" className="text-right">
                Title*
              </Label>
              <Input
                id="subtask-title"
                name="title"
                value={subTaskFormData.title}
                onChange={handleSubTaskInputChange}
                className="col-span-3"
                placeholder="Subtask title"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subtask-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="subtask-description"
                name="description"
                value={subTaskFormData.description}
                onChange={handleSubTaskInputChange}
                className="col-span-3"
                placeholder="Subtask description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subtask-assignee" className="text-right">
                Assignee*
              </Label>
              <Input
                id="subtask-assignee"
                name="assignee"
                value={subTaskFormData.assignee}
                onChange={handleSubTaskInputChange}
                className="col-span-3"
                placeholder="Person assigned to this subtask"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select
                value={subTaskFormData.status}
                onValueChange={(value) => handleSubTaskSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Priority</Label>
              <Select
                value={subTaskFormData.priority}
                onValueChange={(value) => handleSubTaskSelectChange("priority", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Start Date*</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={subTaskFormData.startDate ? new Date(subTaskFormData.startDate) : undefined}
                  onDateChange={(date) => handleSubTaskDateChange("startDate", date)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Due Date*</Label>
              <div className="col-span-3">
                <DatePicker 
                  date={subTaskFormData.dueDate ? new Date(subTaskFormData.dueDate) : undefined}
                  onDateChange={(date) => handleSubTaskDateChange("dueDate", date)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subtask-progress" className="text-right">
                Progress (%)
              </Label>
              <div className="col-span-3 flex items-center gap-4">
                <Input
                  id="subtask-progress"
                  type="number"
                  min="0"
                  max="100"
                  value={subTaskFormData.progress}
                  onChange={handleSubTaskProgressChange}
                />
                <span>{subTaskFormData.progress}%</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubTask}>
              Add Subtask
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

