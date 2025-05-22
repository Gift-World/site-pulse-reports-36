import React, { useState } from "react";
import { Task, Subtask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, Plus, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Form schema for task editing
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

// Form schema for subtask creation
const subtaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["Pending", "In Progress", "Completed", "Overdue"]),
  progress: z.number().min(0).max(100),
  assignee: z.string().min(1, "Assignee is required"),
});

interface TaskListProps {
  tasks: Task[];
  onReorder?: (tasks: Task[]) => void;
  onAddSubtask?: (taskId: number, subtaskData: any) => void;
  onAssignTask?: (taskId: number) => void;
  onDeleteTask?: (taskId: number) => void;
  onEditTask?: (task: Task) => void;
}

const taskStatusColors: Record<string, string> = {
  "Completed": "bg-green-50 text-green-600",
  "In Progress": "bg-blue-500 text-white",
  "Pending": "bg-yellow-50 text-yellow-600",
  "Overdue": "bg-red-50 text-red-600",
};

const priorityColors: Record<string, string> = {
  "High": "bg-red-100 text-red-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Low": "bg-green-100 text-green-700",
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onReorder,
  onAddSubtask,
  onAssignTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [addingSubtaskForId, setAddingSubtaskForId] = useState<number | null>(null);
  const [expandedTaskIds, setExpandedTaskIds] = useState<number[]>([]);

  // Task form
  const form = useForm({
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

  // Subtask form
  const subtaskForm = useForm({
    resolver: zodResolver(subtaskFormSchema),
    defaultValues: {
      title: "",
      status: "Pending",
      progress: 0,
      assignee: "",
    },
  });

  const handleAddSubtask = (taskId: number, data: any) => {
    if (onAddSubtask) {
      onAddSubtask(taskId, data);
      setAddingSubtaskForId(null);
      subtaskForm.reset();
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    // Pre-populate form with task data
    form.setValue("title", task.title);
    form.setValue("description", task.description);
    form.setValue("status", task.status);
    form.setValue("priority", task.priority);
    form.setValue("assignee", task.assignee);
    
    try {
      const dueDate = parseISO(task.dueDate);
      form.setValue("dueDate", dueDate);
    } catch (error) {
      console.error("Error parsing due date:", error);
    }
    
    try {
      const startDate = parseISO(task.startDate);
      form.setValue("startDate", startDate);
    } catch (error) {
      console.error("Error parsing start date:", error);
    }
  };

  const handleDelete = (taskId: number) => {
    if (onDeleteTask) {
      onDeleteTask(taskId);
    }
  };

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTaskIds((prevIds) =>
      prevIds.includes(taskId)
        ? prevIds.filter((id) => id !== taskId)
        : [...prevIds, taskId]
    );
  };

  const handleEditSubmit = (data: any) => {
    if (editingTaskId !== null && onEditTask) {
      const updatedTask: Task = {
        ...tasks.find(t => t.id === editingTaskId)!,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        assignee: data.assignee,
        dueDate: format(data.dueDate, "MMM d, yyyy"),
        startDate: format(data.startDate, "MMM d, yyyy"),
        progress: data.status === "Completed" ? 100 : data.status === "In Progress" ? 50 : 0,
      };
      
      onEditTask(updatedTask);
      setEditingTaskId(null);
      form.reset();
    }
  };

  // Task dragging logic would be implemented here

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Badge
                  className={cn("mr-2", priorityColors[task.priority] || "")}
                >
                  {task.priority}
                </Badge>
                <h3
                  className="text-lg font-medium hover:cursor-pointer"
                  onClick={() => toggleTaskExpansion(task.id)}
                >
                  {task.title}
                </h3>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                {expandedTaskIds.includes(task.id) && (
                  <p>{task.description}</p>
                )}
              </div>
            </div>
            
            {/* Task Actions */}
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2"
                onClick={() => setAddingSubtaskForId(task.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2"
                onClick={() => handleEdit(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Assignee:</span> {task.assignee}
            </div>
            <div>
              <span className="text-gray-500">Due Date:</span> {task.dueDate}
            </div>
            <div>
              <span className="text-gray-500">Status:</span>{" "}
              <Badge
                className={cn("ml-1", taskStatusColors[task.status] || "")}
              >
                {task.status}
              </Badge>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Progress</span>
              <span className="text-sm">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-4">
              <Separator className="my-2" />
              <h4 className="text-sm font-medium mb-2">Subtasks</h4>
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="pl-4 border-l-2 py-1 text-sm flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium">{subtask.title}</span>
                      <div className="text-xs text-gray-500">
                        <span>Assignee: {subtask.assignee}</span>
                        <Badge
                          className={`ml-2 ${
                            taskStatusColors[subtask.status] || ""
                          }`}
                        >
                          {subtask.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Progress
                        value={subtask.progress}
                        className="h-1.5 w-16 mr-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Edit Task Dialog */}
      <Dialog open={editingTaskId !== null} onOpenChange={() => editingTaskId && setEditingTaskId(null)}>
        <DialogContent className="sm:max-w-[550px]">
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
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
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
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
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
                <Button type="button" variant="outline" onClick={() => setEditingTaskId(null)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Subtask Dialog */}
      <Dialog open={addingSubtaskForId !== null} onOpenChange={() => addingSubtaskForId && setAddingSubtaskForId(null)}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add Subtask</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={subtaskForm.handleSubmit((data) => addingSubtaskForId && handleAddSubtask(addingSubtaskForId, data))} className="space-y-4">
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
            
            <FormField
              control={subtaskForm.control}
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
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={subtaskForm.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Progress (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={0} 
                      max={100} 
                      placeholder="Enter progress percentage"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
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
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddingSubtaskForId(null)}>
                Cancel
              </Button>
              <Button type="submit">Add Subtask</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
