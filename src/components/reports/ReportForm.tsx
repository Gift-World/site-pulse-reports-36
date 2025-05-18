
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "@/hooks/use-toast";
import { FileUploader } from "@/components/reports/FileUploader";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  reportDate: z.date({
    required_error: "A report date is required.",
  }),
  filledBy: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  weather: z.string().min(2, {
    message: "Weather conditions must be provided.",
  }),
  workDone: z.string().min(10, {
    message: "Work description must be at least 10 characters.",
  }),
  materialsIn: z.string().optional(),
  materialsOut: z.string().optional(),
  laborCount: z.string().min(1, {
    message: "Labor count must be provided.",
  }),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  onSubmit: (data: FormValues & { photos: File[] }) => void;
  defaultValues?: Partial<FormValues>;
}

export function ReportForm({ onSubmit, defaultValues }: ReportFormProps) {
  const [photos, setPhotos] = React.useState<File[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      projectName: "",
      reportDate: new Date(),
      filledBy: "",
      weather: "",
      workDone: "",
      materialsIn: "",
      materialsOut: "",
      laborCount: "",
      comments: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({ ...values, photos });
    toast({
      title: "Report submitted",
      description: "Your daily site report has been successfully submitted.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="projectName"
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
            name="reportDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Report Date</FormLabel>
                <DatePicker
                  date={field.value}
                  onDateChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="filledBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filled By</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weather"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weather Conditions</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Sunny, Rainy, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="workDone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Done</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the work completed today" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="materialsIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materials In</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List materials delivered to site" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="materialsOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materials Out</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List materials removed from site" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="laborCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Labor Count</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Number of workers on site" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Comments</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional notes or comments" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Site Photos</FormLabel>
          <FileUploader
            onFilesSelected={(files) => setPhotos(files)}
            maxFiles={5}
            accept="image/*"
          />
          <FormDescription>
            Upload up to 5 site photos (JPEG, PNG, etc.)
          </FormDescription>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Save Draft</Button>
          <Button type="submit">Submit Report</Button>
        </div>
      </form>
    </Form>
  );
}
