
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface LaborFormProps {
  onAddResource: (resource: LaborResource) => void;
  onUpdateResource?: (resource: LaborResource) => void;
  editingResource?: LaborResource | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface LaborResource {
  id: string;
  name: string;
  type: "Subcontractor" | "Skilled" | "Unskilled";
  role: string;
  rate: number;
  rateType: "Hourly" | "Daily" | "Weekly";
  workingDays: string[];
  status: "Active" | "Inactive";
}

export const LaborForm: React.FC<LaborFormProps> = ({ 
  onAddResource, 
  onUpdateResource, 
  editingResource, 
  isOpen, 
  onOpenChange 
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [resourceType, setResourceType] = useState<"Skilled" | "Unskilled" | "Subcontractor">("Skilled");
  
  const [formData, setFormData] = useState<Partial<LaborResource>>({
    name: "",
    role: "",
    type: "Skilled",
    rate: 0,
    rateType: "Hourly",
    workingDays: [],
    status: "Active"
  });

  // Handle dialog open state from parent component
  useEffect(() => {
    if (isOpen !== undefined) {
      setShowDialog(isOpen);
    }
  }, [isOpen]);

  // Load editing resource data when provided
  useEffect(() => {
    if (editingResource) {
      setFormData(editingResource);
      setResourceType(editingResource.type);
    }
  }, [editingResource]);

  const handleInputChange = (field: keyof LaborResource, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleWorkingDay = (day: string) => {
    setFormData(prev => {
      const currentDays = prev.workingDays || [];
      
      if (currentDays.includes(day)) {
        return { ...prev, workingDays: currentDays.filter(d => d !== day) };
      } else {
        return { ...prev, workingDays: [...currentDays, day] };
      }
    });
  };

  const handleDialogChange = (open: boolean) => {
    setShowDialog(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
    
    if (!open) {
      // Reset form when closing
      if (!editingResource) {
        setFormData({
          name: "",
          role: "",
          type: "Skilled",
          rate: 0,
          rateType: "Hourly",
          workingDays: [],
          status: "Active"
        });
        setResourceType("Skilled");
      }
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.role || formData.rate === 0) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const resourceData: LaborResource = {
      id: formData.id || Date.now().toString(),
      name: formData.name || "",
      type: resourceType,
      role: formData.role || "",
      rate: formData.rate || 0,
      rateType: formData.rateType as "Hourly" | "Daily" | "Weekly",
      workingDays: formData.workingDays || [],
      status: formData.status as "Active" | "Inactive" || "Active"
    };
    
    if (editingResource) {
      if (onUpdateResource) {
        onUpdateResource(resourceData);
        toast.success(`${resourceType} resource updated successfully`);
      }
    } else {
      onAddResource(resourceData);
      toast.success(`${resourceType} resource added successfully`);
    }
    
    // Reset form and close dialog
    setFormData({
      name: "",
      role: "",
      type: "Skilled",
      rate: 0,
      rateType: "Hourly",
      workingDays: [],
      status: "Active"
    });
    
    handleDialogChange(false);
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const dialogTitle = editingResource ? "Edit Labor Resource" : "Add Labor Resource";
  const submitButtonText = editingResource ? `Update ${resourceType}` : `Add ${resourceType}`;
  
  return (
    <>
      {!onOpenChange && (
        <Button onClick={() => handleDialogChange(true)} variant="outline">
          Add Labor Resource
        </Button>
      )}
      
      <Dialog open={showDialog} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-[60%] overflow-y-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {editingResource ? `Edit ${resourceType.toLowerCase()} resource details` : `Add new ${resourceType.toLowerCase()} resource to the project`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge 
                variant={resourceType === "Skilled" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setResourceType("Skilled")}
              >
                Skilled Labor
              </Badge>
              <Badge 
                variant={resourceType === "Unskilled" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setResourceType("Unskilled")}
              >
                Unskilled Labor
              </Badge>
              <Badge 
                variant={resourceType === "Subcontractor" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setResourceType("Subcontractor")}
              >
                Subcontractor
              </Badge>
            </div>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder={resourceType === "Subcontractor" ? "Company Name" : "Full Name"}
                    value={formData.name}
                    onChange={e => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role/Designation</Label>
                  <Input 
                    id="role" 
                    placeholder="Job role or designation" 
                    value={formData.role}
                    onChange={e => handleInputChange("role", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="rate" 
                      type="number" 
                      placeholder="0.00" 
                      className="flex-1"
                      value={formData.rate || ""}
                      onChange={e => handleInputChange("rate", parseFloat(e.target.value))}
                    />
                    <Select 
                      value={formData.rateType}
                      onValueChange={value => handleInputChange("rateType", value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Rate Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status}
                    onValueChange={value => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Working Days</Label>
                <div className="flex flex-wrap gap-3">
                  {days.map(day => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`day-${day}`}
                        checked={(formData.workingDays || []).includes(day)}
                        onCheckedChange={() => toggleWorkingDay(day)}
                      />
                      <Label htmlFor={`day-${day}`} className="text-sm font-normal">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => handleDialogChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {submitButtonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
