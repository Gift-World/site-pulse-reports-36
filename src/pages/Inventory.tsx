
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventorySummary } from "@/components/inventory/InventorySummary";
import { InventorySearch } from "@/components/inventory/InventorySearch";
import { InventoryTabs } from "@/components/inventory/InventoryTabs";
import { inventoryItems, yardInventoryItems, summaryStats } from "@/components/inventory/InventoryData";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");
  
  return (
    <div className="space-y-6">
      <InventoryHeader 
        title="Inventory" 
        description="Manage your project materials, supplies, and equipment" 
      />
      
      <InventorySummary summaryStats={summaryStats} />
      
      <Card>
        <CardHeader>
          <CardTitle>Materials & Equipment Inventory</CardTitle>
          <CardDescription>
            Manage your construction materials, supplies, equipment, and machinery
          </CardDescription>
          <InventorySearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </CardHeader>
        <CardContent>
          <InventoryTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            inventoryItems={inventoryItems}
            yardInventoryItems={yardInventoryItems}
            searchQuery={searchQuery}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
