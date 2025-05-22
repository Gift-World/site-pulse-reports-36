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

interface TaskListProps {
  tasks: Task[];
  onReorder: (tasks: Task[]) => void;
  onAddSubtask: (taskId: number, subtaskTitle: string) => void;
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
});

type TaskEditFormValues = z.infer<typeof taskEditSchema>;

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onReorder, 
  onAddSubtask, 
  onAssignTask,
  onDeleteTask,
  onEditTask
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [newSubtasks, setNewSubtasks] = useState<{[key: number]: string}>({});
  const [expandedTasks, setExpandedTasks] = useState<{[key: number]: boolean}>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  
  const form = useForm<TaskEditFormValues>({
    resolver: zodResolver(taskEditSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
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
  
  const handleSubtaskInputChange = (taskId: number, value: string) => {
    setNewSubtasks(prev => ({
      ...prev,
      [taskId]: value
    }));
  };
  
  const handleAddSubtask = (taskId: number) => {
    if (newSubtasks[taskId]?.trim()) {
      onAddSubtask(taskId, newSubtasks[taskId].trim());
      // Clear the input after adding
      setNewSubtasks(prev => ({
        ...prev,
        [taskId]: ""
      }));
      // Ensure the task is expanded to show the new subtask
      setExpandedTasks(prev => ({
        ...prev,
        [taskId]: true
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
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      {task.projectName && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Project: {task.projectName}
                        </p>
                      )}
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
              
              <div className="flex items-center gap-2">
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
                <span className="text-sm">{(task.subtasks?.length || 0) > 0 ? `Subtasks (${task.subtasks?.length})` : "Add subtasks"}</span>
              </Button>
            </div>
            
            {expandedTasks[task.id] && (
              <div className="pl-6 mt-2 border-l-2 border-l-muted ml-4">
                {/* Subtasks list */}
                {task.subtasks && task.subtasks.length > 0 && (
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
                )}
                
                {/* Add subtask input */}
                <div className="flex items-center gap-2 mb-3">
                  <Input
                    placeholder="Add a subtask"
                    value={newSubtasks[task.id] || ""}
                    onChange={(e) => handleSubtaskInputChange(task.id, e.target.value)}
                    className="text-sm h-8"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSubtask(task.id);
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleAddSubtask(task.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
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
    </div>
  );
};

export default TaskList;
