
import React, { useState } from "react";
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
import { useInventory } from "@/contexts/InventoryContext";
import { sites } from "./InventoryData";

interface FormValues {
  itemName: string;
  category: string;
  quantity: string;
  unit: string;
  site: string;
  restricted: "yes" | "no";
}

interface AddInventoryFormProps {
  inventoryType?: "inventory" | "plant" | "yard";
}

export const AddInventoryForm: React.FC<AddInventoryFormProps> = ({ inventoryType = "yard" }) => {
  const [open, setOpen] = useState(false);
  const { addInventoryItem } = useInventory();
  
  const form = useForm<FormValues>({
    defaultValues: {
      itemName: "",
      category: inventoryType === "plant" ? "Plant & Equipment" : "",
      quantity: "",
      unit: "pieces",
      site: "Main Site",
      restricted: "no",
    }
  });

  const onSubmit = (data: FormValues) => {
    addInventoryItem({
      name: data.itemName,
      category: data.category,
      quantity: parseInt(data.quantity) || 0,
      unit: data.unit,
      site: data.site
    }, inventoryType);
    
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add {inventoryType === "plant" ? "Equipment" : inventoryType === "yard" ? "Yard Inventory" : "Inventory"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New {inventoryType === "plant" ? "Plant & Equipment" : inventoryType === "yard" ? "Yard Inventory" : "Inventory"}</DialogTitle>
          <DialogDescription>
            Add new {inventoryType === "plant" ? "equipment" : "materials"} to the {inventoryType === "yard" ? "central yard" : "project"} inventory.
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
                      {inventoryType === "plant" ? (
                        <SelectItem value="Plant & Equipment">Plant & Equipment</SelectItem>
                      ) : (
                        <>
                          <SelectItem value="Construction Materials">Construction Materials</SelectItem>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Finishing">Finishing</SelectItem>
                          <SelectItem value="Carpentry">Carpentry</SelectItem>
                          {inventoryType !== "yard" && <SelectItem value="Plant & Equipment">Plant & Equipment</SelectItem>}
                          <SelectItem value="Safety Equipment">Safety Equipment</SelectItem>
                        </>
                      )}
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
            
            {inventoryType !== "yard" && (
              <FormField
                control={form.control}
                name="site"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select site" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sites.filter(site => site !== "All Sites").map((site) => (
                          <SelectItem key={site} value={site}>
                            {site}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <DialogFooter className="pt-4">
              <Button type="submit">Add to Inventory</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
