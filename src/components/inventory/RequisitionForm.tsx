
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// Define form validation schema
const formSchema = z.object({
  requisitionName: z.string().min(2, { message: "Requisition name is required" }),
  description: z.string().min(10, { message: "Please provide a description" }),
  projectName: z.string().min(2, { message: "Project name is required" }),
  requiredBy: z.string().min(2, { message: "Required by date is needed" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  department: z.string().min(2, { message: "Department is required" }),
  requestedBy: z.string().min(2, { message: "Please specify who is requesting this requisition" }),
  items: z.string().min(5, { message: "Please list the items needed" }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const RequisitionForm = () => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requisitionName: "",
      description: "",
      projectName: "",
      requiredBy: "",
      priority: "Medium",
      department: "",
      requestedBy: "",
      items: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Requisition submitted:", data);
    toast({
      title: "Requisition Created",
      description: `Your requisition "${data.requisitionName}" has been submitted.`,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Requisition</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Requisition</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new material or labor requisition.
            All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="requisitionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requisition Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Weekly Materials for Phase 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Highrise Apartments" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requiredBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required By Date*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. May 25, 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. High, Medium, Low" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Construction, Electrical" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requestedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requested By*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name or department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide detailed description of this requisition" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Items Needed*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List all items needed with quantities (one per line)" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each item on a new line with the format: Item name - Quantity - Unit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any other details that might be relevant for this requisition" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include any specific requirements, usage details, or alternative items that would be acceptable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Requisition</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
