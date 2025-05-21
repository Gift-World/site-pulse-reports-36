
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequisitionForm } from "@/components/inventory/RequisitionForm";
import { MaterialRequestForm } from "@/components/inventory/MaterialRequestForm";

export const RequisitionTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Weekly Requisitions</CardTitle>
          <CardDescription>Material and labor requests</CardDescription>
        </div>
        <RequisitionForm />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requisition #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>REQ-2025-056</TableCell>
              <TableCell>May 16, 2025</TableCell>
              <TableCell>12 items</TableCell>
              <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Pending</Badge></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>REQ-2025-048</TableCell>
              <TableCell>May 9, 2025</TableCell>
              <TableCell>8 items</TableCell>
              <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>REQ-2025-041</TableCell>
              <TableCell>May 2, 2025</TableCell>
              <TableCell>15 items</TableCell>
              <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Delivered</Badge></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="font-medium text-lg mb-4">Labor Requisition</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requisition #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Labor Type</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>LAB-2025-023</TableCell>
                <TableCell>May 16, 2025</TableCell>
                <TableCell>Masons</TableCell>
                <TableCell>4</TableCell>
                <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Pending</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LAB-2025-022</TableCell>
                <TableCell>May 15, 2025</TableCell>
                <TableCell>Electricians</TableCell>
                <TableCell>2</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="text-center py-4 mt-4">
          <MaterialRequestForm />
        </div>
      </CardContent>
    </Card>
  );
};
