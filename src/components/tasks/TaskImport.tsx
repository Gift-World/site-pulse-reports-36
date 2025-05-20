
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Upload, CheckCircle2, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/types/task";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TaskImportProps {
  onImport: (tasks: Task[]) => void;
}

const TaskImport: React.FC<TaskImportProps> = ({ onImport }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [importedTasks, setImportedTasks] = useState<Task[]>([]);
  
  // Mock tasks that would be parsed from an MS Project file
  const mockMsProjectTasks: Task[] = [
    {
      id: 100,
      title: "Site clearing and preparation",
      description: "Remove debris and prepare the construction site",
      status: "Pending",
      priority: "High",
      assignee: "John Doe",
      dueDate: "May 25, 2025",
      progress: 0,
      startDate: "May 15, 2025"
    },
    {
      id: 101,
      title: "Foundation layout marking",
      description: "Mark the foundation layout according to drawings",
      status: "Pending",
      priority: "High",
      assignee: "John Doe",
      dueDate: "May 28, 2025",
      progress: 0,
      startDate: "May 26, 2025"
    },
    {
      id: 102,
      title: "Excavation for foundations",
      description: "Excavate foundation trenches to required depth",
      status: "Pending",
      priority: "Medium",
      assignee: "Mike Johnson",
      dueDate: "June 2, 2025",
      progress: 0,
      startDate: "May 29, 2025"
    },
    {
      id: 103,
      title: "Foundation reinforcement",
      description: "Place reinforcement bars as per structural design",
      status: "Pending",
      priority: "High",
      assignee: "Mike Johnson",
      dueDate: "June 10, 2025",
      progress: 0,
      startDate: "June 3, 2025"
    },
    {
      id: 104,
      title: "Concrete pouring for foundations",
      description: "Pour concrete for foundation and allow curing",
      status: "Pending",
      priority: "High",
      assignee: "Construction Team A",
      dueDate: "June 20, 2025",
      progress: 0,
      startDate: "June 11, 2025"
    }
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setImportedTasks(mockMsProjectTasks);
      setIsUploading(false);
      
      toast({
        title: "Program of Works Ready to Import",
        description: `Successfully processed ${file.name} with ${mockMsProjectTasks.length} tasks`,
      });
    }, 1500);
  };

  const handleProcessImport = () => {
    if (importedTasks.length === 0) {
      toast({
        title: "No tasks to import",
        description: "Please select a valid MS Project file first",
        variant: "destructive",
      });
      return;
    }
    
    setShowPreviewDialog(true);
  };
  
  const confirmImport = () => {
    onImport(importedTasks);
    setShowPreviewDialog(false);
    
    toast({
      title: "Program of Works Imported",
      description: `Successfully imported ${importedTasks.length} tasks from ${fileName}`,
    });
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
                    Ready to import
                  </div>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setFileName(null);
                setImportedTasks([]);
              }}
              disabled={isUploading}
            >
              Change
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-xs text-muted-foreground w-full">
          Supported formats: .xlsx, .csv, .mpp (MS Project)
        </div>
        
        <div className="flex justify-between w-full">
          <Button variant="outline">Download Template</Button>
          <Button 
            variant="default"
            disabled={!fileName || isUploading || importedTasks.length === 0}
            onClick={handleProcessImport}
          >
            <FileText className="mr-2 h-4 w-4" />
            Process Import
          </Button>
        </div>
      </CardFooter>
      
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Program of Works - {fileName}</DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={task.priority === "High" ? "destructive" : 
                               task.priority === "Medium" ? "default" : "outline"}
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmImport}>
              Import Tasks
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TaskImport;
