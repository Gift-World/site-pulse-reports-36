
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryTable, InventoryItem } from "@/components/inventory/InventoryTable";
import { YardInventoryTable, YardInventoryItem } from "@/components/inventory/YardInventoryTable";
import { Plane, Package, Warehouse } from "lucide-react";

interface InventoryTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  inventoryItems: InventoryItem[];
  yardInventoryItems: YardInventoryItem[];
  searchQuery: string;
  selectedSite: string;
  selectedStatus: string;
}

export const InventoryTabs: React.FC<InventoryTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  inventoryItems, 
  yardInventoryItems,
  searchQuery,
  selectedSite,
  selectedStatus
}) => {
  // Filter the items based on search query, site and status
  const filteredItems = inventoryItems.filter(item =>
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.site?.toLowerCase() || "").includes(searchQuery.toLowerCase())) &&
    (selectedSite === "All Sites" || item.site === selectedSite) &&
    (selectedStatus === "All" || item.status === selectedStatus)
  );

  const filteredYardItems = yardInventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split inventory items by category
  const regularItems = filteredItems.filter(item => item.category !== "Plant & Equipment");
  const plantItems = filteredItems.filter(item => item.category === "Plant & Equipment");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="inventory">
          <Package className="h-4 w-4 mr-2" />
          Inventory
        </TabsTrigger>
        <TabsTrigger value="equipment">
          <Plane className="h-4 w-4 mr-2" />
          Plant
        </TabsTrigger>
        <TabsTrigger value="yard">
          <Warehouse className="h-4 w-4 mr-2" />
          Yard Inventory
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="inventory">
        <InventoryTable items={regularItems} maxHeight="500px" />
      </TabsContent>
      
      <TabsContent value="equipment">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Plant</h3>
          <Plane className="h-5 w-5 text-construction-blue" />
        </div>
        <InventoryTable items={plantItems} isPlant={true} maxHeight="500px" />
      </TabsContent>
      
      <TabsContent value="yard">
        <YardInventoryTable items={filteredYardItems} />
      </TabsContent>
    </Tabs>
  );
};
