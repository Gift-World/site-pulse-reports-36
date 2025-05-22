
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/task";
import { FileText, File, Download } from "lucide-react"; // Changed FileWord to File
import { format } from "date-fns";

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
  const generateTaskReport = (formatType: "pdf" | "word") => { // Renamed parameter to avoid confusion
    // In a real implementation, this would generate a PDF or Word document
    // For now, we'll just show a console message
    console.log(`Generating ${formatType} report for ${timeframe} tasks`);
    
    const dateStr = selectedDate 
      ? `${format(selectedDate, 'yyyy-MM-dd')}` 
      : 'all dates';
    
    alert(`Downloading ${timeframe} task report (${formatType.toUpperCase()}) for ${dateStr}\n\nIn a production environment, this would generate and download a ${formatType.toUpperCase()} file with the task details.`);
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
            <File className="h-4 w-4" /> {/* Changed FileWord to File */}
            Word
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskExport;
