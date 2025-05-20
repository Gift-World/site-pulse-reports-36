
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ReportFormatSelectorProps {
  formatValue: string;
  onFormatChange: (value: string) => void;
  id: string;
}

export const ReportFormatSelector = ({ 
  formatValue, 
  onFormatChange, 
  id 
}: ReportFormatSelectorProps) => {
  return (
    <div className="grid gap-2">
      <Label>Report Format</Label>
      <RadioGroup value={formatValue} onValueChange={onFormatChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pdf" id={`${id}-pdf`} />
          <Label htmlFor={`${id}-pdf`}>PDF</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="word" id={`${id}-word`} />
          <Label htmlFor={`${id}-word`}>Word Document</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
