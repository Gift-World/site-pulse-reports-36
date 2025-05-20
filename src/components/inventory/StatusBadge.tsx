
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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
