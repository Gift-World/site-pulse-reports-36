
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUploader } from "@/components/reports/FileUploader";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { Project } from "@/types/project";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface SafetyInspectionReportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  project: z.string().min(1, { message: "Project is required" }),
  inspectorName: z.string().min(1, { message: "Inspector name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  inspectionType: z.string().min(1, { message: "Inspection type is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  findings: z.string().min(1, { message: "Findings are required" }),
  safetyRating: z.string().min(1, { message: "Safety rating is required" }),
  recommendations: z.string().optional(),
  followUpRequired: z.boolean().default(false),
  followUpDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SafetyInspectionReportForm({ open, onOpenChange }: SafetyInspectionReportFormProps) {
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: "",
      inspectorName: "",
      date: new Date().toISOString().split("T")[0],
      inspectionType: "",
      location: "",
      findings: "",
      safetyRating: "",
      recommendations: "",
      followUpRequired: false,
      followUpDate: "",
    },
  });
  
  // Sample projects data
  const sampleProjects: Project[] = [
    { 
      id: 1, 
      name: "Highrise Apartments", 
      description: "A 20-story residential building", 
      status: "In Progress", 
      progress: 65,
      team: 12,
      dueDate: "2025-12-15"
    },
    { 
      id: 2, 
      name: "Office Complex", 
      description: "Modern office spaces with amenities", 
      status: "Planning", 
      progress: 30,
      team: 8,
      dueDate: "2026-03-30"
    },
    { 
      id: 3, 
      name: "Residential Development", 
      description: "Suburban housing development", 
      status: "In Progress", 
      progress: 45,
      team: 15,
      dueDate: "2025-09-20"
    },
  ];

  const handleProjectSelect = (projectId: number) => {
    const project = sampleProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project.name);
      form.setValue("project", project.name);
    }
    setProjectSelectorOpen(false);
  };
  
  const onSubmit = (values: FormValues) => {
    // Include any photos if needed in the submission
    const reportData = {
      ...values,
      photos: photos,
    };
    
    console.log("Submitted inspection report:", reportData);
    
    toast({
      title: "Inspection Report Submitted",
      description: `Safety inspection report for ${values.project} has been submitted.`,
    });
    
    // Reset form and close dialog
    form.reset();
    setPhotos([]);
    onOpenChange(false);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Submit Safety Inspection Report</DialogTitle>
            <DialogDescription>
              Record findings from a completed safety inspection
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[500px] pr-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project</FormLabel>
                      <div className="flex gap-2 items-center">
                        <FormControl>
                          <Input
                            placeholder="Select a project" 
                            {...field}
                            value={selectedProject || field.value}
                            readOnly
                            className="flex-1"
                          />
                        </FormControl>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => setProjectSelectorOpen(true)}
                        >
                          Select
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="inspectorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inspector Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter inspector name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                  name="inspectionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inspection Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inspection type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="routine">Routine Inspection</SelectItem>
                          <SelectItem value="follow-up">Follow-up Inspection</SelectItem>
                          <SelectItem value="regulatory">Regulatory Compliance</SelectItem>
                          <SelectItem value="incident">Post-Incident Inspection</SelectItem>
                          <SelectItem value="surprise">Surprise Inspection</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inspection Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Specific area inspected" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="findings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Findings</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe safety observations and issues found" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="safetyRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safety Rating</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select safety rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent - No Issues</SelectItem>
                          <SelectItem value="good">Good - Minor Issues</SelectItem>
                          <SelectItem value="satisfactory">Satisfactory - Some Issues</SelectItem>
                          <SelectItem value="poor">Poor - Significant Issues</SelectItem>
                          <SelectItem value="critical">Critical - Immediate Action Required</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="recommendations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recommendations</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Recommended actions and improvements" 
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
                  name="followUpRequired"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Follow-up Required</FormLabel>
                        <FormDescription>
                          Check if a follow-up inspection is needed
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                {form.watch("followUpRequired") && (
                  <FormField
                    control={form.control}
                    name="followUpDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-up Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <div className="space-y-2">
                  <Label>Inspection Photos</Label>
                  <FileUploader
                    onFilesSelected={(files) => setPhotos(files)}
                    maxFiles={5}
                    acceptedFileTypes=".jpg,.jpeg,.png,.gif"
                    label="Upload inspection photos"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload photos of safety hazards, equipment, or conditions observed during inspection (max 5).
                  </p>
                </div>
              </form>
            </Form>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ProjectSelector
        open={projectSelectorOpen}
        onOpenChange={setProjectSelectorOpen}
        title="Select Project for Inspection Report"
        description="Choose a project for this safety inspection report."
        projects={sampleProjects}
        onSelectProject={handleProjectSelect}
        actionText="Select Project"
        cancelText="Cancel"
      />
    </>
  );
}
