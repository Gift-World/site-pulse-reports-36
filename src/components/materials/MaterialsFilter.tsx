
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, FileDown, FileSpreadsheet, File } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { useNotifications } from "@/hooks/use-notifications";

interface MaterialsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  categories: string[];
}

export const MaterialsFilter: React.FC<MaterialsFilterProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  categories
}) => {
  const { addNotification } = useNotifications();

  const handleExport = (format: "excel" | "pdf") => {
    const formatName = format === "excel" ? "Excel" : "PDF";
    addNotification({
      title: `Materials Exported as ${formatName}`,
      message: `Your materials data has been exported as a ${formatName} file.`,
      type: "system"
    });
  };

  return (
    <>
      <CardTitle>Materials Inventory</CardTitle>
      <CardDescription>
        All available construction materials, supplies, equipment, and machinery
      </CardDescription>
      <div className="flex flex-wrap gap-3 pt-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCategoryFilter(null)}
            className={!categoryFilter ? "bg-muted" : ""}
          >
            All
          </Button>
          {categories.map(category => (
            <Button 
              key={category} 
              variant="outline" 
              onClick={() => setCategoryFilter(category)}
              className={categoryFilter === category ? "bg-muted" : ""}
            >
              {category.split(' ')[0]}
            </Button>
          ))}
        </div>
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
    </>
  );
};
