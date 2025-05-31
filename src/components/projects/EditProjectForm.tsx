
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUploader } from "@/components/reports/FileUploader";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, Plus, Trash2, Map, Building, User, Mail, FileText, Upload } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types/project";

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
  completionDate: z.date({
    required_error: "Project completion date is required",
  }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProjectFormProps {
  project: Project;
  onComplete: (updatedProject: Project) => void;
  onCancel: () => void;
}

export function EditProjectForm({ project, onComplete, onCancel }: EditProjectFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      client: project.client || "",
      location: project.location || "",
      cost: project.budget?.total.toString() || "0",
      startDate: new Date(),
      completionDate: new Date(project.dueDate),
      description: project.description,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    const updatedProject: Project = {
      ...project,
      name: data.name,
      client: data.client,
      location: data.location,
      description: data.description,
      dueDate: data.completionDate.toISOString().split('T')[0],
      budget: {
        ...project.budget!,
        total: Number(data.cost),
        remaining: Number(data.cost) - (project.budget?.spent || 0)
      }
    };
    
    toast({
      title: "Project Updated",
      description: `Project "${data.name}" has been successfully updated.`,
    });
    
    onComplete(updatedProject);
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter client name" className="pl-10" {...field} />
                  </div>
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
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input 
                      placeholder="Enter project cost" 
                      type="text" 
                      className="pl-8"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <FormField
            control={form.control}
            name="completionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completion Date</FormLabel>
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
