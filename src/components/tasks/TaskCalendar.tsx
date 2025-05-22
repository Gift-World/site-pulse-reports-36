
import React from "react";
import { Task } from "@/types/task";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays, format, isSameDay, parseISO } from "date-fns";

interface TaskCalendarProps {
  tasks: Task[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // Get tasks for the selected date
  const tasksForSelectedDate = selectedDate 
    ? tasks.filter(task => {
        const startDate = parseISO(task.startDate);
        const dueDate = parseISO(task.dueDate);
        const currentDate = selectedDate;
        
        // Check if the selected date falls within the task's start and due dates
        return (currentDate >= startDate && currentDate <= dueDate);
      })
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border shadow p-3 pointer-events-auto"
          classNames={{
            day_today: "bg-blue-100 text-blue-900 font-bold",
            day_selected: "bg-primary text-primary-foreground font-bold"
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
            <CardTitle className="text-lg">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksForSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {tasksForSelectedDate.map(task => (
                  <div key={task.id} className="border-l-4 pl-3 py-1" 
                       style={{ 
                         borderColor: task.status === "Completed" 
                           ? "#10B981" 
                           : task.status === "In Progress" 
                             ? "#3B82F6" 
                             : task.status === "Pending" 
                               ? "#F59E0B" 
                               : "#EF4444" 
                       }}>
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="text-xs text-muted-foreground">
                      <div>Status: {task.status}</div>
                      <div>Assignee: {task.assignee}</div>
                      <div>Priority: {task.priority}</div>
                      <div>Progress: {task.progress}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>No tasks scheduled for this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskCalendar;
