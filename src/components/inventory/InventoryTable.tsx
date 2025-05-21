
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/inventory/StatusBadge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "On Order";
  supplier: string;
  site?: string; // Added site field
  cost: number;
  lastUpdated: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
  isPlant?: boolean;
  maxHeight?: string;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ 
  items, 
  isPlant = false, 
  maxHeight = "400px" 
}) => {
  return (
    <ScrollArea className={`w-full`} style={{ maxHeight }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isPlant ? "Equipment" : "Item"}</TableHead>
            {!isPlant && <TableHead>Category</TableHead>}
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Site</TableHead>
            <TableHead className="text-right">{isPlant ? "Value" : "Cost per Unit"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              {!isPlant && <TableCell>{item.category}</TableCell>}
              <TableCell>{item.quantity} {item.unit}</TableCell>
              <TableCell><StatusBadge status={item.status} /></TableCell>
              <TableCell>{item.site || item.supplier}</TableCell>
              <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
