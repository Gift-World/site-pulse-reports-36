
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  FileDown, 
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MaterialItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "On Order";
  supplier: string;
  cost: number;
  lastUpdated: string;
}

// Extended materials data
const materialItems: MaterialItem[] = [
  {
    id: 1,
    name: "Portland Cement",
    category: "Construction Materials",
    quantity: 120,
    unit: "Bags",
    status: "In Stock",
    supplier: "BuilderSupply Co.",
    cost: 12.5,
    lastUpdated: "May 14, 2025"
  },
  {
    id: 2,
    name: "Steel Reinforcement (12mm)",
    category: "Construction Materials",
    quantity: 85,
    unit: "Pieces",
    status: "Low Stock",
    supplier: "MetalWorks Industries",
    cost: 8.75,
    lastUpdated: "May 12, 2025"
  },
  {
    id: 3,
    name: "Bricks (Standard)",
    category: "Construction Materials",
    quantity: 3500,
    unit: "Pieces",
    status: "In Stock",
    supplier: "ClayWorks Ltd.",
    cost: 0.75,
    lastUpdated: "May 15, 2025"
  },
  {
    id: 4,
    name: "PVC Pipes (4-inch)",
    category: "Plumbing",
    quantity: 18,
    unit: "Pieces",
    status: "Low Stock",
    supplier: "PlumbParts Inc.",
    cost: 15.25,
    lastUpdated: "May 13, 2025"
  },
  {
    id: 5,
    name: "Electrical Wiring (2.5mm)",
    category: "Electrical",
    quantity: 0,
    unit: "Rolls",
    status: "Out of Stock",
    supplier: "ElectroSupply Ltd.",
    cost: 85.50,
    lastUpdated: "May 8, 2025"
  },
  {
    id: 6,
    name: "Paint (Interior, White)",
    category: "Finishing",
    quantity: 0,
    unit: "Gallons",
    status: "Out of Stock",
    supplier: "ColorMax Paints",
    cost: 28.99,
    lastUpdated: "May 10, 2025"
  },
  {
    id: 7,
    name: "Window Frames (Standard)",
    category: "Carpentry",
    quantity: 8,
    unit: "Sets",
    status: "On Order",
    supplier: "WoodWorks Co.",
    cost: 120.00,
    lastUpdated: "May 15, 2025"
  },
  {
    id: 8,
    name: "Concrete Mixer",
    category: "Plant & Equipment",
    quantity: 2,
    unit: "Units",
    status: "In Stock",
    supplier: "ConstructionEquip Inc.",
    cost: 1200.00,
    lastUpdated: "May 10, 2025"
  },
  {
    id: 9,
    name: "Scaffold System (Full Set)",
    category: "Plant & Equipment",
    quantity: 3,
    unit: "Sets",
    status: "In Stock",
    supplier: "ScaffoldPro Systems",
    cost: 3500.00,
    lastUpdated: "May 5, 2025"
  },
  {
    id: 10,
    name: "Excavator (Mini)",
    category: "Plant & Equipment",
    quantity: 1,
    unit: "Unit",
    status: "On Order",
    supplier: "HeavyMachinery Ltd.",
    cost: 45000.00,
    lastUpdated: "May 16, 2025"
  },
  {
    id: 11,
    name: "Sand (Fine)",
    category: "Construction Materials",
    quantity: 25,
    unit: "Cubic Meters",
    status: "In Stock",
    supplier: "AggregatesPlus",
    cost: 35.00,
    lastUpdated: "May 11, 2025"
  },
  {
    id: 12,
    name: "Gravel (20mm)",
    category: "Construction Materials",
    quantity: 30,
    unit: "Cubic Meters",
    status: "In Stock",
    supplier: "AggregatesPlus",
    cost: 40.00,
    lastUpdated: "May 11, 2025"
  },
  {
    id: 13,
    name: "Plywood Sheets (12mm)",
    category: "Construction Materials",
    quantity: 45,
    unit: "Sheets",
    status: "In Stock",
    supplier: "TimberMart",
    cost: 22.50,
    lastUpdated: "May 9, 2025"
  },
  {
    id: 14,
    name: "Door Frames",
    category: "Carpentry",
    quantity: 12,
    unit: "Units",
    status: "In Stock",
    supplier: "WoodWorks Co.",
    cost: 85.00,
    lastUpdated: "May 7, 2025"
  },
  {
    id: 15,
    name: "Light Fixtures (LED)",
    category: "Electrical",
    quantity: 25,
    unit: "Units",
    status: "In Stock",
    supplier: "ElectroSupply Ltd.",
    cost: 45.75,
    lastUpdated: "May 12, 2025"
  }
];

const getStatusBadge = (status: string) => {
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

const AllMaterials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const filteredItems = materialItems.filter(item =>
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === null || item.category === categoryFilter)
  );

  // Extract unique categories for filtering
  const categories = Array.from(new Set(materialItems.map(item => item.category)));

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Materials</h1>
          <p className="text-muted-foreground">
            Complete inventory of materials and supplies
          </p>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Project
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Materials Inventory</CardTitle>
          <CardDescription>
            All available construction materials, supplies, equipment, and machinery
          </CardDescription>
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setCategoryFilter(null)}
                className={!categoryFilter ? "bg-muted" : ""}
              >
                All
              </Button>
              {categories.map(category => (
                <Button 
                  key={category} 
                  variant="outline" 
                  onClick={() => setCategoryFilter(category)}
                  className={categoryFilter === category ? "bg-muted" : ""}
                >
                  {category.split(' ')[0]}
                </Button>
              ))}
            </div>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                  <TableHead>Supplier</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Cost per Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllMaterials;
