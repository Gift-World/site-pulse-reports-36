
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventorySummary } from "@/components/inventory/InventorySummary";
import { InventorySearch } from "@/components/inventory/InventorySearch";
import { InventoryTabs } from "@/components/inventory/InventoryTabs";
import { inventoryItems, yardInventoryItems, summaryStats, sites, statuses } from "@/components/inventory/InventoryData";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");
  const [selectedSite, setSelectedSite] = useState("All Sites");
  const [selectedStatus, setSelectedStatus] = useState("All");
  
  return (
    <div className="space-y-6">
      <InventoryHeader 
        title="Inventory" 
        description="Manage your project materials, supplies, and equipment across all sites" 
      />
      
      <InventorySummary summaryStats={summaryStats} />
      
      <Card>
        <CardHeader>
          <CardTitle>Materials & Equipment Inventory</CardTitle>
          <CardDescription>
            View and manage your construction materials, supplies, equipment, and machinery across all sites
          </CardDescription>
          <InventorySearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </CardHeader>
        <CardContent>
          <InventoryTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            inventoryItems={inventoryItems}
            yardInventoryItems={yardInventoryItems}
            searchQuery={searchQuery}
            selectedSite={selectedSite}
            selectedStatus={selectedStatus}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
