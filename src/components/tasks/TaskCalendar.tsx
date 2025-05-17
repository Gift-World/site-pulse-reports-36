
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";

interface TaskCalendarProps {
  tasks: Task[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const today = new Date();
  
  // Find dates with tasks
  const tasksDateMap = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    const dueDate = new Date(task.dueDate);
    const dateKey = dueDate.toISOString().split('T')[0];
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(task);
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={today}
          className="rounded-md border"
          modifiers={{
            hasTask: (date) => {
              const dateKey = date.toISOString().split('T')[0];
              return !!tasksDateMap[dateKey];
            }
          }}
          modifiersClassNames={{
            hasTask: "bg-construction-blue/20 font-bold relative before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:h-1 before:w-1 before:rounded-full before:bg-construction-blue"
          }}
          components={{
            DayContent: ({ date }) => {
              const dateKey = date.toISOString().split('T')[0];
              const hasTasks = !!tasksDateMap[dateKey];
              const taskCount = tasksDateMap[dateKey]?.length || 0;
              
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {date.getDate()}
                  {hasTasks && taskCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-construction-blue text-[10px] text-white">
                      {taskCount}
                    </span>
                  )}
                </div>
              );
            }
          }}
        />
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Legend:</h4>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-construction-blue"></div>
            <span className="text-sm">Tasks due</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCalendar;
