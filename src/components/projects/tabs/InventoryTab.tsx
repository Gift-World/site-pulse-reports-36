
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart4, FileText, ArrowRightLeft } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { ReportGenerator } from "./inventory/ReportGenerator";
import { UsageTabContent } from "./inventory/UsageTabContent";
import { RequisitionTabContent } from "./inventory/RequisitionTabContent";
import { TransferTabContent } from "./inventory/TransferTabContent";
import { materialsUsageData, materialDistributionData } from "./inventory/ProjectInventoryData";

interface InventoryTabProps {
  project: Project;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState("usage");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Project Inventory</CardTitle>
            <CardDescription>Materials and supplies for this project</CardDescription>
          </div>
          <div className="flex flex-wrap gap-3">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            <ReportGenerator projectName={project.name} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-2">
            <TabsTrigger value="usage">
              <BarChart4 className="h-4 w-4 mr-2" />
              Material Usage
            </TabsTrigger>
            <TabsTrigger value="requisition">
              <FileText className="h-4 w-4 mr-2" />
              Requisitions
            </TabsTrigger>
            <TabsTrigger value="transfer">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transfers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-6">
            <UsageTabContent 
              materialsUsage={materialsUsageData}
              materialDistribution={materialDistributionData}
            />
          </TabsContent>
          
          <TabsContent value="requisition" className="space-y-6">
            <RequisitionTabContent />
          </TabsContent>
          
          <TabsContent value="transfer" className="space-y-6">
            <TransferTabContent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
