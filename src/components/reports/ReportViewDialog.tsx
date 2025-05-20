
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";

interface ReportViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: {
    name: string;
    content?: string;
  };
  onDownload: () => void;
}

export const ReportViewDialog = ({ 
  open, 
  onOpenChange, 
  report, 
  onDownload 
}: ReportViewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{report.name}</DialogTitle>
          <DialogDescription>
            Report details
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] mt-4">
          <div className="whitespace-pre-wrap font-mono text-sm p-4">
            {report.content}
          </div>
        </ScrollArea>
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            onClick={onDownload}
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
