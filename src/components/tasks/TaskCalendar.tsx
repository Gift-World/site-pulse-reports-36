
import React from "react";
import { Task } from "@/types/task";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays, format, isSameDay, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskCalendarProps {
  tasks: Task[];
}

// Task colors by priority for consistent coloring
const taskColors: Record<string, string> = {
  "High": "#EF4444", // red
  "Medium": "#F59E0B", // amber
  "Low": "#3B82F6", // blue
  "default": "#6B7280" // gray
};

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = React.useState<"day" | "week" | "month">("day");

  // Get tasks for the selected date range based on view mode
  const getTasksForRange = () => {
    if (!selectedDate) return [];
    
    let startDate, endDate;
    
    switch (viewMode) {
      case "week":
        startDate = startOfWeek(selectedDate);
        endDate = endOfWeek(selectedDate);
        break;
      case "month":
        startDate = startOfMonth(selectedDate);
        endDate = endOfMonth(selectedDate);
        break;
      case "day":
      default:
        startDate = selectedDate;
        endDate = selectedDate;
    }
    
    return tasks.filter(task => {
      const taskStartDate = parseISO(task.startDate);
      const taskEndDate = task.endDate ? parseISO(task.endDate) : parseISO(task.dueDate);
      
      // Check if any part of the task falls within our date range
      return (
        (taskStartDate <= endDate && 
         (taskEndDate >= startDate))
      );
    });
  };

  // Get tasks specifically for the selected date
  const tasksForSelectedDate = selectedDate 
    ? tasks.filter(task => {
        const startDate = parseISO(task.startDate);
        const endDate = task.endDate ? parseISO(task.endDate) : parseISO(task.dueDate);
        const currentDate = selectedDate;
        
        // Check if the selected date falls within the task's start and due dates
        return (currentDate >= startDate && currentDate <= endDate);
      })
    : [];

  // Helper function to get a shortened status description
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

  // Tasks for the date range based on current view mode
  const tasksInRange = getTasksForRange();

  // Get view mode label for display
  const getViewModeLabel = () => {
    switch (viewMode) {
      case "day": return "Daily";
      case "week": return "Weekly";
      case "month": return "Monthly";
      default: return "Daily";
    }
  };

  // Get formatted date range for display
  const getDateRangeLabel = () => {
    if (!selectedDate) return "";
    
    switch (viewMode) {
      case "week": {
        const start = startOfWeek(selectedDate);
        const end = endOfWeek(selectedDate);
        return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
      }
      case "month": {
        const start = startOfMonth(selectedDate);
        const end = endOfMonth(selectedDate);
        return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
      }
      case "day":
      default:
        return format(selectedDate, 'MMMM d, yyyy');
    }
  };

  // Function to get marker style for tasks based on priority and status
  const getTaskMarkerStyle = (task: Task) => {
    let bgColor;
    switch (task.status) {
      case "Completed": bgColor = "bg-green-500"; break;
      case "In Progress": bgColor = "bg-blue-500"; break;
      case "Pending": bgColor = "bg-yellow-500"; break;
      case "Overdue": bgColor = "bg-red-500"; break;
      default: bgColor = "bg-gray-500";
    }
    
    return bgColor;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Task Calendar</h3>
          <Select 
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "day" | "week" | "month")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border shadow p-3 pointer-events-auto"
          classNames={{
            day_today: "bg-blue-100 text-blue-900 font-bold",
            day_selected: "bg-primary text-primary-foreground font-bold",
            day: "relative",
          }}
          components={{
            DayContent: (props) => {
              // Safely access the day value
              if (!props || !props.date) {
                return <div>-</div>;
              }
              
              const day = props.date; // Fix: Use props.date instead of trying to access day property
              
              // Get tasks for this specific day
              const dayTasks = tasks.filter(task => {
                const taskStartDate = parseISO(task.startDate);
                const taskEndDate = task.endDate ? parseISO(task.endDate) : parseISO(task.dueDate);
                return isSameDay(day, taskStartDate) || isSameDay(day, taskEndDate) || 
                       (day >= taskStartDate && day <= taskEndDate);
              });
              
              return (
                <div className="relative flex justify-center items-center h-9 w-9">
                  <div>{format(day, "d")}</div>
                  {dayTasks.length > 0 && (
                    <div className="absolute bottom-0 flex gap-0.5 justify-center">
                      {dayTasks.slice(0, 3).map((task, i) => (
                        <div
                          key={`${task.id}-${i}`}
                          className={`h-1 w-2 rounded-sm ${getTaskMarkerStyle(task)}`}
                          style={{ backgroundColor: taskColors[task.priority] || taskColors.default }}
                        ></div>
                      ))}
                      {dayTasks.length > 3 && <div className="h-1 w-1 rounded-full bg-gray-400"></div>}
                    </div>
                  )}
                </div>
              );
            }
          }}
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Tasks in progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Completed tasks</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">Pending tasks</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Overdue tasks</span>
          </div>
        </div>
      </div>
      
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              <div>
                {getDateRangeLabel()}
              </div>
              <Badge variant="outline">
                {getViewModeLabel()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksInRange.length > 0 ? (
              <div className="space-y-5">
                {tasksInRange.map(task => (
                  <div key={task.id} className="task-item">
                    <div className="border-l-4 pl-3 py-1 mb-2" 
                        style={{ borderColor: taskColors[task.priority] || taskColors.default }}>
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <div>Dates: {format(parseISO(task.startDate), 'MMM d')} - {task.endDate ? format(parseISO(task.endDate), 'MMM d') : format(parseISO(task.dueDate), 'MMM d')}</div>
                          <div>{getStatusBadge(task.status)}</div>
                        </div>
                        <div>Assignee: {task.assignee}</div>
                        <div>Progress: {task.progress}%</div>
                      </div>
                    </div>
                    
                    {/* Subtasks */}
                    {task.subtasks && task.subtasks.length > 0 && (
                      <div className="ml-4 space-y-2">
                        {task.subtasks.map(subtask => (
                          <div key={subtask.id} className="flex items-center gap-2 text-sm text-muted-foreground border-l-2 pl-2 py-1">
                            <div className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: taskColors[task.priority] || taskColors.default }}></div>
                            <span>{subtask.title}</span>
                            <div className="ml-auto text-xs">
                              {subtask.status === "Completed" ? "Done" : `${subtask.progress}%`}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>No tasks scheduled for this {viewMode}.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskCalendar;
