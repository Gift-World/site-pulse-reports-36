
import React, { useState } from "react";
import { Task } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle,
  UserPlus,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: Task[];
  onReorder: (tasks: Task[]) => void;
  onAddSubtask: (taskId: number, subtask: any) => void;
  onAssignTask: (taskId: number) => void;
  onDeleteTask?: (taskId: number) => void;
  onEditTask?: (task: Task) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "Pending":
      return <Clock className="h-4 w-4 text-gray-500" />;
    case "Overdue":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge variant="outline" className="bg-green-50 text-green-600">Completed</Badge>;
    case "In Progress":
      return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
    case "Pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "Overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

// Form schema for task editing
const taskEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["Completed", "In Progress", "Pending", "Overdue"]),
  priority: z.enum(["High", "Medium", "Low"]),
  assignee: z.string().min(1, "Assignee is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  startDate: z.date({
    required_error: "Start date is required",
  })
});

// Form schema for subtask
const subtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assignee: z.string().min(1, "Assignee is required"),
  status: z.enum(["Completed", "In Progress", "Pending", "Overdue"]),
  progress: z.number().min(0).max(100).default(0),
});

type TaskEditFormValues = z.infer<typeof taskEditSchema>;
type SubtaskFormValues = z.infer<typeof subtaskSchema>;

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onReorder, 
  onAddSubtask, 
  onAssignTask,
  onDeleteTask,
  onEditTask
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<{[key: number]: boolean}>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [subtaskModalOpen, setSubtaskModalOpen] = useState(false);
  const [taskForSubtask, setTaskForSubtask] = useState<number | null>(null);
  
  const form = useForm<TaskEditFormValues>({
    resolver: zodResolver(taskEditSchema),
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
  
  const subtaskForm = useForm<SubtaskFormValues>({
    resolver: zodResolver(subtaskSchema),
    defaultValues: {
      title: "",
      assignee: "",
      status: "Pending",
      progress: 0,
    },
  });
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggingIndex(index);
    e.dataTransfer.setData("text/plain", index.toString());
    e.currentTarget.style.opacity = "0.4";
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
    setDraggingIndex(null);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"));
    
    if (draggedIndex === index) return;
    
    const newTasks = [...tasks];
    const draggedTask = newTasks[draggedIndex];
    
    // Remove the dragged task from the array
    newTasks.splice(draggedIndex, 1);
    // Insert it at the drop position
    newTasks.splice(index, 0, draggedTask);
    
    // Update task order
    const reorderedTasks = newTasks.map((task, idx) => ({
      ...task,
      order: idx
    }));
    
    onReorder(reorderedTasks);
  };
  
  const toggleExpand = (taskId: number) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleOpenSubtaskModal = (taskId: number) => {
    setTaskForSubtask(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      subtaskForm.reset({
        title: "",
        assignee: task.assignee, // Default to same assignee as parent task
        status: "Pending",
        progress: 0,
      });
    }
    setSubtaskModalOpen(true);
  };
  
  const handleAddSubtask = (data: SubtaskFormValues) => {
    if (taskForSubtask !== null) {
      const newSubtask = {
        id: Date.now(),
        title: data.title,
        assignee: data.assignee,
        status: data.status,
        progress: data.progress
      };
      
      onAddSubtask(taskForSubtask, newSubtask);
      setSubtaskModalOpen(false);
      subtaskForm.reset();
      
      // Ensure the task is expanded to show the new subtask
      setExpandedTasks(prev => ({
        ...prev,
        [taskForSubtask]: true
      }));
    }
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    form.reset({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
      startDate: task.startDate ? new Date(task.startDate) : new Date(),
    });
    setEditModalOpen(true);
  };

  const handleDeleteClick = (taskId: number) => {
    if (onDeleteTask && window.confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(taskId);
    }
  };

  const handleEditSubmit = (data: TaskEditFormValues) => {
    if (taskToEdit && onEditTask) {
      const updatedTask: Task = {
        ...taskToEdit,
        title: data.title,
        description: data.description || "",
        status: data.status,
        priority: data.priority,
        assignee: data.assignee,
        dueDate: format(data.dueDate, "MMM d, yyyy"),
        startDate: format(data.startDate, "MMM d, yyyy"),
        progress: data.status === "Completed" ? 100 : taskToEdit.progress
      };
      
      onEditTask(updatedTask);
      setEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task, index) => (
        <div 
          key={task.id}
          className="border rounded-md overflow-hidden"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            opacity: draggingIndex === index ? 0.4 : 1,
            cursor: "grab"
          }}
        >
          <div className="p-4 bg-background">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 flex">
                <div className="mr-2 cursor-move">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-start gap-2">
                    {getStatusIcon(task.status)}
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      {task.projectName && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Project: {task.projectName}
                        </p>
                      )}
                    </div>
                    
                    {/* Action buttons moved here between title and assignee */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleOpenSubtaskModal(task.id)}
                        title="Add subtask"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClick(task)}
                        title="Edit task"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClick(task.id)}
                        title="Delete task"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getStatusBadge(task.status)}
                    <Badge variant="outline" className={
                      task.priority === "High" 
                        ? "border-red-500 text-red-500" 
                        : task.priority === "Medium"
                          ? "border-orange-500 text-orange-500"
                          : "border-blue-500 text-blue-500"
                    }>
                      {task.priority}
                    </Badge>
                  </div>
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
                    onClick={() => onAssignTask(task.id)}
                  >
                    <UserPlus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground mr-1">Due:</span>
                  <span>{task.dueDate}</span>
                </div>
                <div className="w-full md:w-40">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleExpand(task.id)}
                className="flex items-center gap-1"
              >
                {expandedTasks[task.id] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="text-sm">{(task.subtasks?.length || 0) > 0 ? `Subtasks (${task.subtasks?.length})` : "View subtasks"}</span>
              </Button>
            </div>
            
            {expandedTasks[task.id] && (
              <div className="pl-6 mt-2 border-l-2 border-l-muted ml-4">
                {/* Subtasks list */}
                {task.subtasks && task.subtasks.length > 0 ? (
                  <div className="space-y-2 mb-3">
                    {task.subtasks.map(subtask => (
                      <div key={subtask.id} className="flex items-center gap-2 py-1">
                        {getStatusIcon(subtask.status)}
                        <span className="text-sm">{subtask.title}</span>
                        <div className="ml-auto flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{subtask.assignee}</span>
                          <div className="h-2 w-16 bg-muted relative rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full rounded-full ${
                                subtask.status === "Completed" 
                                  ? "bg-green-500" 
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${subtask.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{subtask.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground my-2">No subtasks yet. Click the + button to add one.</div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Edit Task Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4">
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
                <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Subtask Modal */}
      <Dialog open={subtaskModalOpen} onOpenChange={setSubtaskModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Subtask</DialogTitle>
          </DialogHeader>
          
          <Form {...subtaskForm}>
            <form onSubmit={subtaskForm.handleSubmit(handleAddSubtask)} className="space-y-4">
              <FormField
                control={subtaskForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtask Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subtask title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={subtaskForm.control}
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
                
                <FormField
                  control={subtaskForm.control}
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
                control={subtaskForm.control}
                name="progress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        max="100"
                        placeholder="Enter progress percentage" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setSubtaskModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Subtask</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
