
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageOpen, PackageCheck } from "lucide-react";

interface SummaryStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  categoryCounts: { name: string; count: number }[];
}

interface InventorySummaryProps {
  summaryStats: SummaryStats;
}

export const InventorySummary: React.FC<InventorySummaryProps> = ({ summaryStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Items</CardTitle>
          <CardDescription>Project inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{summaryStats.totalItems}</p>
              <p className="text-sm text-muted-foreground">unique items</p>
            </div>
            <PackageOpen className="h-8 w-8 text-construction-blue" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Inventory Value</CardTitle>
          <CardDescription>Total value on hand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">${summaryStats.totalValue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">in materials</p>
            </div>
            <PackageCheck className="h-8 w-8 text-construction-green" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Low Stock</CardTitle>
          <CardDescription>Items need reordering</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{summaryStats.lowStockItems}</p>
              <p className="text-sm text-muted-foreground">items low on stock</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-construction-orange/20 flex items-center justify-center">
              <span className="text-construction-orange font-bold">!</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Out of Stock</CardTitle>
          <CardDescription>Items to order urgently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{summaryStats.outOfStockItems}</p>
              <p className="text-sm text-muted-foreground">items out of stock</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-construction-red/20 flex items-center justify-center">
              <span className="text-construction-red font-bold">!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
