
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUploader } from "@/components/reports/FileUploader";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

const consultantTypes = [
  "Architect",
  "Civil/Structural Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Quantity Surveyor",
  "Project Manager",
  "Main Contractor",
  "Other"
];

const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  client: z.string().min(2, "Client name is required"),
  location: z.string().min(2, "Site location is required"),
  cost: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Project cost must be a valid number",
  }),
  startDate: z.date({
    required_error: "Project start date is required",
  }),
  consultants: z.array(
    z.object({
      type: z.string(),
      name: z.string().min(2, "Name is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().optional(),
      otherType: z.string().optional(),
    })
  ),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface NewProjectFormProps {
  onComplete: () => void;
}

export function NewProjectForm({ onComplete }: NewProjectFormProps) {
  const [programFile, setProgramFile] = useState<File | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
      location: "",
      cost: "",
      description: "",
      consultants: [
        {
          type: consultantTypes[0],
          name: "",
          email: "",
          phone: "",
        },
      ],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    console.log("Program file:", programFile);
    
    toast({
      title: "Project Created",
      description: `Project "${data.name}" has been successfully created.`,
    });
    
    onComplete();
  };

  const addConsultant = () => {
    const currentConsultants = form.getValues("consultants") || [];
    form.setValue("consultants", [
      ...currentConsultants,
      {
        type: consultantTypes[0],
        name: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const removeConsultant = (index: number) => {
    const currentConsultants = form.getValues("consultants") || [];
    form.setValue(
      "consultants",
      currentConsultants.filter((_, i) => i !== index)
    );
  };

  const handleProgramFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setProgramFile(files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter site location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Cost</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project cost" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker 
                  date={field.value} 
                  onDateChange={field.onChange} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel className="text-base">Consultants</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={addConsultant}>
              <Plus className="h-4 w-4 mr-2" /> Add Consultant
            </Button>
          </div>
          
          {form.watch("consultants")?.map((_, index) => (
            <div key={index} className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Consultant {index + 1}</h4>
                {index > 0 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeConsultant(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`consultants.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        {consultantTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch(`consultants.${index}.type`) === "Other" && (
                  <FormField
                    control={form.control}
                    name={`consultants.${index}.otherType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Other Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter consultant type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name={`consultants.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter consultant name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`consultants.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter consultant email" type="email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email will be used to send an invite to join the project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`consultants.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter consultant phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <FormLabel>Program of Works</FormLabel>
          <FileUploader 
            onFilesSelected={handleProgramFileUpload}
            acceptedFileTypes=".pdf,.doc,.docx,.xls,.xlsx,.mpp"
            maxFiles={1}
          />
          {programFile && (
            <div className="text-sm text-muted-foreground">
              Selected file: {programFile.name}
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter additional details about the project" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </form>
    </Form>
  );
}
