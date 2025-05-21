
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaterialUsageChart } from "./MaterialUsageChart";
import { MaterialDistributionChart } from "./MaterialDistributionChart";
import { MaterialTrackingTable } from "./MaterialTrackingTable";

interface UsageTabContentProps {
  materialsUsage: Array<{
    name: string;
    planned: number;
    actual: number;
  }>;
  materialDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const UsageTabContent: React.FC<UsageTabContentProps> = ({ 
  materialsUsage, 
  materialDistribution 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MaterialUsageChart materialsUsage={materialsUsage} />
        <MaterialDistributionChart materialDistribution={materialDistribution} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Material Tracking</CardTitle>
          <CardContent>Current inventory levels</CardContent>
        </CardHeader>
        <CardContent>
          <MaterialTrackingTable />
        </CardContent>
      </Card>
    </>
  );
};
