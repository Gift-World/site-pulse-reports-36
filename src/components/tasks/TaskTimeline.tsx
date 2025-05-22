
import React from "react";
import { Task } from "@/types/task";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { parseISO, format, isAfter, isBefore, isEqual } from "date-fns";
import { CheckCircle, Clock, AlertCircle, Circle } from "lucide-react";

interface TaskTimelineProps {
  tasks: Task[];
}

// Task colors by priority for consistent coloring
const taskColors: Record<string, string> = {
  "High": "#EF4444", // red
  "Medium": "#F59E0B", // amber
  "Low": "#3B82F6", // blue
  "default": "#6B7280" // gray
};

const TaskTimeline: React.FC<TaskTimelineProps> = ({ tasks }) => {
  // Sort tasks by start date
  const sortedTasks = [...tasks].sort((a, b) => {
    return parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime();
  });

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Pending":
        return <Circle className="h-4 w-4 text-yellow-500" />;
      case "Overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      
      {/* Tasks */}
      <div className="space-y-8 relative ml-8">
        {sortedTasks.map((task) => {
          const startDate = parseISO(task.startDate);
          const endDate = task.endDate ? parseISO(task.endDate) : parseISO(task.dueDate);
          const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // duration in days
          
          return (
            <Card key={task.id} className="relative">
              {/* Timeline dot */}
              <div 
                className="absolute -left-10 top-6 h-6 w-6 rounded-full border-4 border-background flex items-center justify-center"
                style={{ backgroundColor: taskColors[task.priority] || taskColors.default }}
              >
                {getStatusIcon(task.status)}
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium">{task.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                      <span className="mx-2">•</span>
                      {duration} {duration === 1 ? "day" : "days"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={task.status === "Completed" ? "outline" : "default"}
                      className={
                        task.status === "Completed" ? "bg-green-50 text-green-600" : 
                        task.status === "In Progress" ? "bg-blue-500" :
                        task.status === "Overdue" ? "bg-destructive" : ""
                      }
                    >
                      {task.status}
                    </Badge>
                    <Badge variant="outline" style={{ borderColor: taskColors[task.priority], color: taskColors[task.priority] }}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${task.progress}%`, 
                        backgroundColor: taskColors[task.priority] || taskColors.default 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">Assignee:</span> {task.assignee}
                  </div>
                </div>
                
                {/* Subtasks */}
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="mt-4 border-t pt-3">
                    <h5 className="text-sm font-medium mb-2">Subtasks</h5>
                    <div className="space-y-2">
                      {task.subtasks.map(subtask => (
                        <div key={subtask.id} className="flex justify-between items-center text-sm">
                          <div className="flex items-center">
                            {getStatusIcon(subtask.status)}
                            <span className="ml-2">{subtask.title}</span>
                          </div>
                          <div className="text-muted-foreground">{subtask.assignee}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {sortedTasks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No tasks available to display in the timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTimeline;
