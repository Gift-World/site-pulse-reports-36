
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
  materialName: z.string().min(2, { message: "Material name is required" }),
  description: z.string().min(10, { message: "Please provide a detailed description" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  estimatedRate: z.string().optional(),
  estimatedCost: z.string().optional(),
  useCase: z.string().min(5, { message: "Please specify what this material will be used for" }),
  requestedBy: z.string().min(2, { message: "Please specify who is requesting this material" }),
  requiredBy: z.string().min(2, { message: "Please specify when this material is needed by" }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface MaterialRequestFormProps {
  buttonText?: string;
}

export const MaterialRequestForm = ({ buttonText = "Request Additional Materials" }: MaterialRequestFormProps) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialName: "",
      description: "",
      quantity: "",
      unit: "",
      estimatedRate: "",
      estimatedCost: "",
      useCase: "",
      requestedBy: "",
      requiredBy: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Material Request Submitted",
      description: `Your request for ${data.quantity} ${data.unit} of ${data.materialName} has been submitted.`,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Additional Materials</DialogTitle>
          <DialogDescription>
            Fill out the form below to request additional materials for your project.
            All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="materialName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Portland Cement" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bags, Pieces, Tons" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="estimatedRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Rate (per unit)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $12.50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="estimatedCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Total Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $1,250.00" {...field} />
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
                      <Input placeholder="e.g. May 30, 2025" {...field} />
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
                      placeholder="Provide detailed description of the material needed" 
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
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To be used for*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe how and where this material will be used" 
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
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any other details that might be relevant for this request" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include any specific brands, quality requirements, or alternative materials that would be acceptable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
