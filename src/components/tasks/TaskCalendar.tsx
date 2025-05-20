
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/types/task";
import { format, getMonth, getYear } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TaskCalendarProps {
  tasks: Task[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
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

  // Get tasks for the current month
  const getTasksForCurrentMonth = () => {
    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return getMonth(dueDate) === getMonth(currentMonth) && 
             getYear(dueDate) === getYear(currentMonth);
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="outline" className="bg-green-50 text-construction-green">Completed</Badge>;
      case "In Progress":
        return <Badge variant="default" className="bg-construction-blue">In Progress</Badge>;
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Update currentMonth when selected date changes
  useEffect(() => {
    const newMonth = new Date(selectedDate);
    newMonth.setDate(1);
    setCurrentMonth(newMonth);
  }, [selectedDate]);

  const monthlyTasks = getTasksForCurrentMonth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{format(currentMonth, "MMMM yyyy")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={date => date && setSelectedDate(date)}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md border"
            classNames={{
              day_selected: "bg-construction-blue text-white",
              day_today: "border border-construction-blue text-construction-blue",
              cell: cn(
                "relative p-0 text-center h-9 w-9 focus-within:relative focus-within:z-20"
              ),
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              nav_button: cn(
                "border-0 flex h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
              DayContent: ({ date }) => {
                const dateKey = date.toISOString().split('T')[0];
                const hasTasks = !!tasksDateMap[dateKey];
                const taskCount = tasksDateMap[dateKey]?.length || 0;
                
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {date.getDate()}
                    {hasTasks && taskCount > 0 && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-construction-blue"></span>
                    )}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tasks for {format(currentMonth, "MMMM yyyy")}</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyTasks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No tasks scheduled for {format(currentMonth, "MMMM yyyy")}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="col-span-1 md:col-span-2 mt-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-construction-blue"></div>
          <span className="text-sm">Days with tasks</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
