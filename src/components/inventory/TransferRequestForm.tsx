
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
import { Truck } from "lucide-react";

// Define form validation schema
const formSchema = z.object({
  transferType: z.string().min(2, { message: "Transfer type is required" }),
  fromLocation: z.string().min(2, { message: "Origin location is required" }),
  toLocation: z.string().min(2, { message: "Destination location is required" }),
  requestDate: z.string().min(2, { message: "Request date is required" }),
  requiredByDate: z.string().min(2, { message: "Required by date is needed" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  requestedBy: z.string().min(2, { message: "Please specify who is requesting this transfer" }),
  items: z.string().min(5, { message: "Please list the items to transfer" }),
  personnel: z.string().optional(),
  transportMethod: z.string().min(2, { message: "Transport method is required" }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const TransferRequestForm = () => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transferType: "Material",
      fromLocation: "",
      toLocation: "",
      requestDate: new Date().toISOString().split('T')[0],
      requiredByDate: "",
      priority: "Medium",
      requestedBy: "",
      items: "",
      personnel: "",
      transportMethod: "Truck",
      additionalInfo: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Transfer request submitted:", data);
    toast({
      title: "Transfer Request Created",
      description: `Your transfer request from ${data.fromLocation} to ${data.toLocation} has been submitted.`,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Truck className="mr-2 h-4 w-4" />
          Request Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Material Transfer</DialogTitle>
          <DialogDescription>
            Use this form to request a transfer of materials, equipment, or personnel between locations.
            All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="transferType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Type*</FormLabel>
                    <FormControl>
                      <Input placeholder="Material, Equipment, Personnel" {...field} />
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
                      <Input placeholder="High, Medium, Low" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fromLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Location*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Main Yard, Site A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="toLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Location*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Highrise Site, Site B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requestDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requiredByDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required By Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
              
              <FormField
                control={form.control}
                name="transportMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Method*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Truck, Van, Courier" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Items to Transfer*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List all items to be transferred with quantities (one per line)" 
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
              name="personnel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personnel (if applicable)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any personnel that need to be transferred" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    If personnel need to be transferred, please list their names and roles
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
                      placeholder="Any other details that might be relevant for this transfer" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include any special handling instructions, access requirements, or other relevant details
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Transfer Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
