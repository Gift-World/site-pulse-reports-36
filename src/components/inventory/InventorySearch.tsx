
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, FileDown, FileSpreadsheet, File } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { sites, statuses } from "./InventoryData";
import { useNotifications } from "@/hooks/use-notifications";

interface InventorySearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedSite: string;
  setSelectedSite: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export const InventorySearch: React.FC<InventorySearchProps> = ({ 
  searchQuery, 
  setSearchQuery,
  selectedSite,
  setSelectedSite,
  selectedStatus,
  setSelectedStatus
}) => {
  const { addNotification } = useNotifications();

  const handleExport = (format: "excel" | "pdf") => {
    const formatName = format === "excel" ? "Excel" : "PDF";
    addNotification({
      title: `Inventory Exported as ${formatName}`,
      message: `Your inventory data has been exported as a ${formatName} file.`,
      type: "system"
    });
  };

  return (
    <div className="flex flex-wrap gap-3 pt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search inventory..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by Site</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {sites.map(site => (
              <DropdownMenuItem 
                key={site} 
                onClick={() => setSelectedSite(site)}
                className={selectedSite === site ? "bg-accent text-accent-foreground" : ""}
              >
                {site}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {statuses.map(status => (
              <DropdownMenuItem 
                key={status} 
                onClick={() => setSelectedStatus(status)}
                className={selectedStatus === status ? "bg-accent text-accent-foreground" : ""}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Export Format</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExport("excel")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export as Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("pdf")}>
            <File className="mr-2 h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
