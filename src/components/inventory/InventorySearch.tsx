
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, FileDown } from "lucide-react";

interface InventorySearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const InventorySearch: React.FC<InventorySearchProps> = ({ searchQuery, setSearchQuery }) => {
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
      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
      <Button variant="outline">
        <FileDown className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};
