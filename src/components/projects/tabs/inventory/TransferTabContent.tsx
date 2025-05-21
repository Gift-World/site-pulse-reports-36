
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TransferRequestForm } from "@/components/inventory/TransferRequestForm";

export const TransferTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Material Transfers</CardTitle>
          <CardDescription>Transfer requests between yard and site</CardDescription>
        </div>
        <TransferRequestForm />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transfer #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>TRN-2025-034</TableCell>
              <TableCell>May 16, 2025</TableCell>
              <TableCell>Main Yard</TableCell>
              <TableCell>Highrise Site</TableCell>
              <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Pending</Badge></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRN-2025-028</TableCell>
              <TableCell>May 12, 2025</TableCell>
              <TableCell>Office Complex</TableCell>
              <TableCell>Highrise Site</TableCell>
              <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Delivered</Badge></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRN-2025-021</TableCell>
              <TableCell>May 8, 2025</TableCell>
              <TableCell>Main Yard</TableCell>
              <TableCell>Highrise Site</TableCell>
              <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Delivered</Badge></TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="mt-6">
          <h3 className="font-medium text-lg mb-4">Equipment Transfer History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Transfer Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Concrete Mixer</TableCell>
                <TableCell>May 10, 2025</TableCell>
                <TableCell>May 20, 2025</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">On Site</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Excavator (Small)</TableCell>
                <TableCell>May 5, 2025</TableCell>
                <TableCell>May 25, 2025</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">On Site</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
