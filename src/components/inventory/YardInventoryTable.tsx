
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddInventoryForm } from "@/components/inventory/AddInventoryForm";

export interface YardInventoryItem {
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

interface YardInventoryTableProps {
  items: YardInventoryItem[];
}

export const YardInventoryTable: React.FC<YardInventoryTableProps> = ({ items }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Main Yard Inventory</CardTitle>
          <CardDescription>Central storage for all projects</CardDescription>
        </div>
        <AddInventoryForm />
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <p>The yard inventory is managed centrally. Critical items require admin approval for transfer or removal.</p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity} {item.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
