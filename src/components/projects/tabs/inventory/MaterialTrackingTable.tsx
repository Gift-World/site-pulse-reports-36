
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Warehouse } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MaterialTrackingTable: React.FC = () => {
  const navigate = useNavigate();
  
  const viewAllMaterials = () => {
    navigate('/materials');
  };
  
  const viewYardInventory = () => {
    navigate('/inventory');
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cement</TableCell>
            <TableCell>120</TableCell>
            <TableCell>Bags</TableCell>
            <TableCell>May 15, 2025</TableCell>
            <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">In Stock</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Steel Bars (12mm)</TableCell>
            <TableCell>85</TableCell>
            <TableCell>Pieces</TableCell>
            <TableCell>May 14, 2025</TableCell>
            <TableCell><Badge variant="outline" className="bg-yellow-50 text-yellow-700">Low Stock</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bricks</TableCell>
            <TableCell>3,500</TableCell>
            <TableCell>Pieces</TableCell>
            <TableCell>May 16, 2025</TableCell>
            <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">In Stock</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paint (White)</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Gallons</TableCell>
            <TableCell>May 10, 2025</TableCell>
            <TableCell><Badge variant="destructive">Out of Stock</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center gap-4">
        <Button onClick={viewAllMaterials}>View All Materials</Button>
        <Button variant="outline" onClick={viewYardInventory}>
          <Warehouse className="mr-2 h-4 w-4" />
          View Yard Inventory
        </Button>
      </div>
    </>
  );
};
