
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InventoryItem } from "@/components/inventory/InventoryTable";
import { ArrowUpDown } from "lucide-react";

interface MaterialsTableProps {
  items: InventoryItem[];
}

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "In Stock":
      return <Badge variant="outline" className="bg-green-50 text-green-700">In Stock</Badge>;
    case "Low Stock":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Low Stock</Badge>;
    case "Out of Stock":
      return <Badge variant="destructive">Out of Stock</Badge>;
    case "On Order":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">On Order</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const MaterialsTable: React.FC<MaterialsTableProps> = ({ items }) => {
  return (
    <ScrollArea className="h-[600px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material</TableHead>
            <TableHead>
              <div className="flex items-center">
                Category
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Site</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Cost per Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{item.site || item.supplier}</TableCell>
              <TableCell>{item.lastUpdated}</TableCell>
              <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
