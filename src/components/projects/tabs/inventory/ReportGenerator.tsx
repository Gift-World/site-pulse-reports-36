
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet, File } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/use-notifications";

interface ReportGeneratorProps {
  projectName: string;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ projectName }) => {
  const { addNotification } = useNotifications();
  
  const generateInventoryReport = (format: "excel" | "pdf") => {
    const formatName = format === "excel" ? "Excel" : "PDF";
    addNotification({
      title: `Inventory Report Generated`,
      message: `Inventory report for ${projectName} has been created as ${formatName}.`,
      type: "system"
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Report Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => generateInventoryReport("excel")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Generate Excel Report
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateInventoryReport("pdf")}>
          <File className="mr-2 h-4 w-4" />
          Generate PDF Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
