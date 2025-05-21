
import React, { createContext, useContext, useState } from "react";
import { InventoryItem } from "@/components/inventory/InventoryTable";
import { YardInventoryItem } from "@/components/inventory/YardInventoryTable";
import { inventoryItems as initialInventoryItems, yardInventoryItems as initialYardInventoryItems } from "@/components/inventory/InventoryData";
import { useNotifications } from "@/hooks/use-notifications";

interface InventoryContextType {
  inventoryItems: InventoryItem[];
  yardInventoryItems: YardInventoryItem[];
  addInventoryItem: (item: Partial<InventoryItem>, itemType: "inventory" | "plant" | "yard") => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [yardInventoryItems, setYardInventoryItems] = useState<YardInventoryItem[]>(initialYardInventoryItems);
  const { addNotification } = useNotifications();

  const addInventoryItem = (item: Partial<InventoryItem>, itemType: "inventory" | "plant" | "yard") => {
    if (itemType === "yard") {
      const newYardItem: YardInventoryItem = {
        name: item.name || "New Item",
        category: item.category || "Construction Materials",
        quantity: item.quantity || 0,
        unit: item.unit || "pieces"
      };

      setYardInventoryItems(prev => [newYardItem, ...prev]);
      addNotification({
        title: "Yard Inventory Added",
        message: `${newYardItem.quantity} ${newYardItem.unit} of ${newYardItem.name} added to yard inventory.`,
        type: "system"
      });
    } else {
      const newItem: InventoryItem = {
        id: Math.max(...inventoryItems.map(i => i.id), 0) + 1,
        name: item.name || "New Item",
        category: item.category || (itemType === "plant" ? "Plant & Equipment" : "Construction Materials"),
        quantity: item.quantity || 0,
        unit: item.unit || "pieces",
        status: "In Stock",
        supplier: item.supplier || "Main Supplier",
        site: item.site || "Main Site",
        cost: item.cost || 0,
        lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      };

      setInventoryItems(prev => [newItem, ...prev]);
      addNotification({
        title: `${itemType === "plant" ? "Plant & Equipment" : "Inventory"} Added`,
        message: `${newItem.quantity} ${newItem.unit} of ${newItem.name} added to inventory.`,
        type: "system"
      });
    }
  };

  return (
    <InventoryContext.Provider value={{
      inventoryItems,
      yardInventoryItems,
      addInventoryItem
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
