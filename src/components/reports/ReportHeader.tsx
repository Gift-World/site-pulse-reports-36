
import React from "react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { ReportTemplateDialog } from "@/components/reports/ReportTemplateDialog";

interface ReportHeaderProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export const ReportHeader = ({ dateRange, onDateRangeChange }: ReportHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Create, view and download project reports
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />
        <ReportTemplateDialog />
      </div>
    </div>
  );
};
