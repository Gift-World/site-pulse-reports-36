
import React from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Plus, Box } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormValues {
  itemName: string;
  category: string;
  quantity: string;
  unit: string;
  restricted: "yes" | "no";
}

export const AddInventoryForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      itemName: "",
      category: "",
      quantity: "",
      unit: "pieces",
      restricted: "no",
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Inventory Added",
      description: `${data.quantity} ${data.unit} of ${data.itemName} added to yard inventory.`
    });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Yard Inventory</DialogTitle>
          <DialogDescription>
            Add new materials or equipment to the central yard inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Portland Cement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Construction Materials">Construction Materials</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Finishing">Finishing</SelectItem>
                      <SelectItem value="Carpentry">Carpentry</SelectItem>
                      <SelectItem value="Equipment">Plant & Equipment</SelectItem>
                      <SelectItem value="Safety Equipment">Safety Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="bags">Bags</SelectItem>
                        <SelectItem value="rolls">Rolls</SelectItem>
                        <SelectItem value="sets">Sets</SelectItem>
                        <SelectItem value="units">Units</SelectItem>
                        <SelectItem value="gallons">Gallons</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="submit">Add to Inventory</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
