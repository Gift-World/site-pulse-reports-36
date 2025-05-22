
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/task";
import { FileText, File, Download, Calendar as CalendarIcon } from "lucide-react";
import { format, addDays, addWeeks, addMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TaskExportProps {
  tasks: Task[];
  selectedDate?: Date;
  timeframe: "daily" | "weekly" | "monthly";
  onTimeframeChange: (timeframe: "daily" | "weekly" | "monthly") => void;
}

const TaskExport: React.FC<TaskExportProps> = ({
  tasks,
  selectedDate,
  timeframe,
  onTimeframeChange
}) => {
  const [exportDate, setExportDate] = useState<Date | undefined>(selectedDate || new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const generateTaskReport = (formatType: "pdf" | "word") => {
    // In a real implementation, this would generate a PDF or Word document
    // For now, we'll just show a console message
    console.log(`Generating ${formatType} report for ${timeframe} tasks`);
    
    let dateRangeStr = "all dates";
    
    if (exportDate) {
      if (timeframe === "daily") {
        dateRangeStr = `${format(exportDate, 'MMM d, yyyy')}`;
      } else if (timeframe === "weekly") {
        const endDate = addDays(exportDate, 6);
        dateRangeStr = `${format(exportDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
      } else if (timeframe === "monthly") {
        const endDate = addDays(addMonths(exportDate, 1), -1);
        dateRangeStr = `${format(exportDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
      }
    }
    
    alert(`Downloading ${timeframe} task report (${formatType.toUpperCase()}) for ${dateRangeStr}\n\nIn a production environment, this would generate and download a ${formatType.toUpperCase()} file with the task details.`);
  };

  return (
    <div className="bg-muted/30 rounded-md p-4 my-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-1">Export Task Schedule</h3>
          <p className="text-xs text-muted-foreground">
            Download tasks for site planning and coordination
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <Select 
            value={timeframe}
            onValueChange={(value) => onTimeframeChange(value as "daily" | "weekly" | "monthly")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {exportDate ? format(exportDate, 'd MMM yyyy') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={exportDate}
                onSelect={(date) => {
                  setExportDate(date);
                  setShowDatePicker(false);
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => generateTaskReport("pdf")}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => generateTaskReport("word")}
            className="flex items-center gap-1"
          >
            <File className="h-4 w-4" />
            Word
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskExport;
