
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
  Plus, 
  PackageOpen, 
  Search, 
  FileDown, 
  Filter,
  ArrowUpDown,
  PackageCheck,
  HardDrive,
  Warehouse,
  Box,
  Plane,
  Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddInventoryForm } from "@/components/inventory/AddInventoryForm";

interface InventoryItem {
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

const inventoryItems: InventoryItem[] = [
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
    quantity: 450,
    unit: "Pieces",
    status: "In Stock",
    supplier: "MetalWorks Industries",
    cost: 8.75,
    lastUpdated: "May 12, 2025"
  },
  {
    id: 3,
    name: "Bricks (Standard)",
    category: "Construction Materials",
    quantity: 5000,
    unit: "Pieces",
    status: "In Stock",
    supplier: "ClayWorks Ltd.",
    cost: 0.75,
    lastUpdated: "May 10, 2025"
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
    quantity: 32,
    unit: "Gallons",
    status: "In Stock",
    supplier: "ColorMax Paints",
    cost: 28.99,
    lastUpdated: "May 11, 2025"
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
  }
];

const yardInventoryItems = [
  {
    name: "Steel Bars (12mm)",
    category: "Construction Materials",
    quantity: 250,
    unit: "pieces"
  },
  {
    name: "Portland Cement",
    category: "Construction Materials",
    quantity: 500,
    unit: "bags"
  },
  {
    name: "Scaffolding Sets",
    category: "Equipment",
    quantity: 10,
    unit: "sets"
  },
  {
    name: "Safety Helmets",
    category: "Safety Equipment",
    quantity: 50,
    unit: "pieces"
  },
  {
    name: "Bricks (Standard)",
    category: "Construction Materials",
    quantity: 8000,
    unit: "pieces"
  },
  {
    name: "Wooden Planks",
    category: "Carpentry",
    quantity: 150,
    unit: "pieces"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "In Stock":
      return <Badge variant="outline" className="bg-green-50 text-construction-green">In Stock</Badge>;
    case "Low Stock":
      return <Badge variant="outline" className="bg-yellow-50 text-construction-orange">Low Stock</Badge>;
    case "Out of Stock":
      return <Badge variant="destructive">Out of Stock</Badge>;
    case "On Order":
      return <Badge variant="outline" className="bg-blue-50 text-construction-blue">On Order</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const summaryStats = {
  totalItems: 10,
  totalValue: 65672.00,
  lowStockItems: 1,
  outOfStockItems: 1,
  categoryCounts: [
    { name: "Construction Materials", count: 3 },
    { name: "Plumbing", count: 1 },
    { name: "Electrical", count: 1 },
    { name: "Finishing", count: 1 },
    { name: "Carpentry", count: 1 },
    { name: "Plant & Equipment", count: 3 }
  ]
};

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");
  
  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredYardItems = yardInventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Manage your project materials, supplies, and equipment
          </p>
        </div>
        <AddInventoryForm />
      </div>
      
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
      
      <Card>
        <CardHeader>
          <CardTitle>Materials & Equipment Inventory</CardTitle>
          <CardDescription>
            Manage your construction materials, supplies, equipment, and machinery
          </CardDescription>
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Cost per Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.filter(item => item.category !== "Plant & Equipment").map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity} {item.unit}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="equipment">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Plant</h3>
                <Plane className="h-5 w-5 text-construction-blue" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.filter(item => item.category === "Plant & Equipment").map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity} {item.unit}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="yard">
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
                      {filteredYardItems.map((item, index) => (
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
