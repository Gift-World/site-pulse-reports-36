
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface ProjectSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  projects: Project[];
  onSelectProject: (projectId: number) => void;
  actionText: string;
  cancelText: string;
  variant?: "default" | "destructive";
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  open,
  onOpenChange,
  title,
  description,
  projects,
  onSelectProject,
  actionText,
  cancelText,
  variant = "default"
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const handleAction = () => {
    if (selectedId) {
      onSelectProject(selectedId);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset selected project when dialog closes
      setSelectedId(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[60%] overflow-y-auto max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">No projects available</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow 
                    key={project.id}
                    className={selectedId === project.id ? "bg-muted" : ""}
                    onClick={() => handleSelect(project.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div 
                          className={`h-4 w-4 rounded-full border border-primary ${
                            selectedId === project.id ? "bg-primary" : "bg-background"
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{project.description}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          project.status === "Completed" ? "outline" :
                          project.status === "In Progress" ? "default" : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{project.progress}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <DialogFooter className="flex justify-between gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant} 
            onClick={handleAction}
            disabled={selectedId === null}
          >
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
