
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Upload, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/types/task";

interface TaskImportProps {
  onImport: (tasks: Task[]) => void;
}

const TaskImport: React.FC<TaskImportProps> = ({ onImport }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      // This is a mock implementation - in a real app, we'd parse the actual file
      const mockTasks: Task[] = [
        {
          id: 100,
          title: "Site clearing and preparation",
          description: "Remove debris and prepare the construction site",
          status: "Pending",
          priority: "High",
          assignee: "Unassigned",
          dueDate: "May 25, 2025",
          progress: 0
        },
        {
          id: 101,
          title: "Foundation layout marking",
          description: "Mark the foundation layout according to drawings",
          status: "Pending",
          priority: "High",
          assignee: "Unassigned",
          dueDate: "May 28, 2025",
          progress: 0
        },
        {
          id: 102,
          title: "Excavation for foundations",
          description: "Excavate foundation trenches to required depth",
          status: "Pending",
          priority: "Medium",
          assignee: "Unassigned",
          dueDate: "June 2, 2025",
          progress: 0
        }
      ];
      
      onImport(mockTasks);
      setIsUploading(false);
      
      toast({
        title: "Program of Works Imported",
        description: `Successfully imported ${mockTasks.length} tasks from ${fileName}`,
      });
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Program of Works</CardTitle>
        <CardDescription>
          Upload your project schedule to automatically generate tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!fileName ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-4">
              Upload a MS Project, Excel, or CSV file containing your project schedule
            </p>
            <Input
              type="file"
              accept=".xlsx,.xls,.csv,.mpp"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button className="cursor-pointer" asChild>
                <span>Select File</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-construction-blue" />
              <div>
                <p className="font-medium">{fileName}</p>
                {isUploading ? (
                  <p className="text-sm text-muted-foreground">Processing...</p>
                ) : (
                  <div className="flex items-center text-sm text-construction-green">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Imported
                  </div>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setFileName(null);
              }}
              disabled={isUploading}
            >
              Change
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Supported formats: .xlsx, .csv, .mpp (MS Project)
      </CardFooter>
    </Card>
  );
};

export default TaskImport;
