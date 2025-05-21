
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";
import { MaterialsTable } from "@/components/materials/MaterialsTable";
import { MaterialsHeader } from "@/components/materials/MaterialsHeader";
import { MaterialsFilter } from "@/components/materials/MaterialsFilter";

const AllMaterials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { inventoryItems } = useInventory();
  
  const filteredItems = inventoryItems.filter(item =>
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === null || item.category === categoryFilter)
  );

  // Extract unique categories for filtering
  const categories = Array.from(new Set(inventoryItems.map(item => item.category)));

  return (
    <div className="space-y-6 p-6">
      <MaterialsHeader onBack={() => window.history.back()} />
      
      <Card>
        <CardHeader>
          <MaterialsFilter 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            categoryFilter={categoryFilter} 
            setCategoryFilter={setCategoryFilter}
            categories={categories}
          />
        </CardHeader>
        <CardContent>
          <MaterialsTable items={filteredItems} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AllMaterials;
