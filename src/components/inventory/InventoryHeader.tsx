
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddInventoryForm } from "@/components/inventory/AddInventoryForm";

interface InventoryHeaderProps {
  title: string;
  description: string;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <AddInventoryForm />
    </div>
  );
};
