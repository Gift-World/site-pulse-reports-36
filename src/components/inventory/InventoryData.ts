import { InventoryItem } from "./InventoryTable";
import { YardInventoryItem } from "./YardInventoryTable";

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Portland Cement",
    category: "Construction Materials",
    quantity: 120,
    unit: "Bags",
    status: "In Stock",
    supplier: "BuilderSupply Co.",
    site: "Main Site",
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
    site: "North Site",
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
    site: "East Site",
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
    site: "Main Site",
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
    site: "West Site",
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
    site: "South Site",
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
    site: "Main Site",
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
    site: "East Site",
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
    site: "North Site",
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
    site: "West Site",
    cost: 45000.00,
    lastUpdated: "May 16, 2025"
  },
  {
    id: 11,
    name: "Portland Cement",
    category: "Construction Materials",
    quantity: 85,
    unit: "Bags",
    status: "Low Stock",
    supplier: "BuilderSupply Co.",
    site: "South Site",
    cost: 12.5,
    lastUpdated: "May 14, 2025"
  },
  {
    id: 12,
    name: "Steel Reinforcement (10mm)",
    category: "Construction Materials",
    quantity: 300,
    unit: "Pieces",
    status: "In Stock",
    supplier: "MetalWorks Industries",
    site: "West Site",
    cost: 7.25,
    lastUpdated: "May 13, 2025"
  },
  {
    id: 13,
    name: "Safety Harnesses",
    category: "Safety Equipment",
    quantity: 12,
    unit: "Units",
    status: "Low Stock",
    supplier: "SafetyFirst Co.",
    site: "Main Site",
    cost: 89.99,
    lastUpdated: "May 12, 2025"
  }
];

export const yardInventoryItems: YardInventoryItem[] = [
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

export const summaryStats = {
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

export const sites = ["All Sites", "Main Site", "North Site", "South Site", "East Site", "West Site"];

export const statuses = ["All", "In Stock", "Low Stock", "Out of Stock", "On Order"];
