
import React from "react";
import { Button } from "@/components/ui/button";
import { AddInventoryForm } from "@/components/inventory/AddInventoryForm";

interface MaterialsHeaderProps {
  onBack: () => void;
}

export const MaterialsHeader: React.FC<MaterialsHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Materials</h1>
        <p className="text-muted-foreground">
          Complete inventory of materials and supplies
        </p>
      </div>
      <div className="flex gap-2">
        <AddInventoryForm inventoryType="inventory" />
        <Button variant="outline" onClick={onBack}>
          Back to Project
        </Button>
      </div>
    </div>
  );
};
