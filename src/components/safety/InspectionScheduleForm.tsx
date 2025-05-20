
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const inspectionFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  type: z.string().min(3, { message: "Inspection type is required" }),
  inspector: z.string().min(3, { message: "Inspector name is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  notes: z.string().optional(),
});

type InspectionFormValues = z.infer<typeof inspectionFormSchema>;

interface InspectionScheduleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: InspectionFormValues) => void;
}

export const InspectionScheduleForm: React.FC<InspectionScheduleFormProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const form = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionFormSchema),
    defaultValues: {
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow's date as default
      type: "",
      inspector: "",
      location: "",
      notes: "",
    },
  });

  const handleSubmit = (values: InspectionFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    }
    
    toast({
      title: "Inspection scheduled",
      description: "Safety inspection has been scheduled successfully.",
    });
    
    form.reset();
    onOpenChange(false);
  };

  const inspectionTypes = [
    "Weekly Safety Audit",
    "Equipment Check",
    "Electrical Safety Inspection",
    "Scaffolding Safety Check",
    "Fire Safety Inspection",
    "Personal Protective Equipment (PPE) Check",
    "Hazardous Materials Inspection",
    "Fall Protection Systems Check"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Safety Inspection</DialogTitle>
          <DialogDescription>
            Enter details to schedule a new safety inspection.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspection Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspection Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inspection type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {inspectionTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="inspector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspector</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the inspector" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Where the inspection will take place" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional information or special instructions" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Inspection</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
