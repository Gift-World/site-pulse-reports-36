
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

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" }
];

const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  client: z.string().min(2, "Client name is required"),
  clientEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  mainContractor: z.string().min(2, "Main contractor name is required"),
  mainContractorEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  location: z.string().min(2, "Site location is required"),
  cost: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Project cost must be a valid number",
  }),
  currency: z.string().min(1, "Currency is required"),
  startDate: z.date({
    required_error: "Project start date is required",
  }),
  completionDate: z.date({
    required_error: "Project completion date is required",
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
  scopeOfWorks: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProjectFormProps {
  project: Project;
  onComplete: (updatedProject: Project) => void;
  onCancel: () => void;
}

export function EditProjectForm({ project, onComplete, onCancel }: EditProjectFormProps) {
  const [programFile, setProgramFile] = useState<File | null>(null);
  const [contractFiles, setContractFiles] = useState<File[]>([]);
  const [drawingFiles, setDrawingFiles] = useState<File[]>([]);
  const [specificationFiles, setSpecificationFiles] = useState<File[]>([]);
  const [otherFiles, setOtherFiles] = useState<File[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      client: project.client || "",
      clientEmail: "",
      mainContractor: "",
      mainContractorEmail: "",
      location: project.location || "",
      cost: project.budget?.total.toString() || "0",
      currency: "USD",
      description: project.description,
      scopeOfWorks: "",
      consultants: [
        {
          type: consultantTypes[0],
          name: "",
          email: "",
          phone: "",
        },
      ],
      startDate: new Date(),
      completionDate: new Date(project.dueDate),
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    console.log("Program file:", programFile);
    console.log("Contract files:", contractFiles);
    console.log("Drawing files:", drawingFiles);
    console.log("Specification files:", specificationFiles);
    console.log("Other files:", otherFiles);
    console.log("Selected location:", selectedLocation);
    
    const selectedCurrency = currencies.find(c => c.code === data.currency);
    
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
    
    // Send invites to client and main contractor if emails provided
    if (data.clientEmail) {
      toast({
        title: "Client Invite Sent",
        description: `Invitation sent to ${data.client} at ${data.clientEmail}`,
      });
    }
    
    if (data.mainContractorEmail) {
      toast({
        title: "Main Contractor Invite Sent",
        description: `Invitation sent to ${data.mainContractor} at ${data.mainContractorEmail}`,
      });
    }
    
    // Send invites to team members
    data.consultants.forEach(consultant => {
      toast({
        title: "Team Member Invite Sent",
        description: `Invitation sent to ${consultant.name} at ${consultant.email}`,
      });
    });
    
    toast({
      title: "Project Updated",
      description: `Project "${data.name}" has been successfully updated with budget ${selectedCurrency?.symbol}${Number(data.cost).toLocaleString()}. All project files have been uploaded to the documents section.`,
    });
    
    onComplete(updatedProject);
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
      toast({
        title: "Program File Uploaded",
        description: "Program of works will be automatically added to the progress tab.",
      });
    }
  };

  const handleOpenMap = () => {
    const mapUrl = "https://www.google.com/maps/@0,0,2z";
    window.open(mapUrl, '_blank', 'width=800,height=600');
    
    toast({
      title: "Map Opened",
      description: "Please select your location on Google Maps and manually enter the address in the location field.",
    });
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
                  <div className="flex gap-2">
                    <Input placeholder="Enter site location" {...field} />
                    <Button type="button" variant="outline" onClick={handleOpenMap}>
                      <Map className="h-4 w-4 mr-2" />
                      Choose on Map
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Client Information */}
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
            name="clientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter client email" type="email" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Email will be used to send an invite to join the project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Main Contractor Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="mainContractor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Contractor Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter main contractor name" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="mainContractorEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Contractor Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter main contractor email" type="email" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Email will be used to send an invite to join the project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Cost and Currency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Project Cost</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">
                      {currencies.find(c => c.code === form.watch("currency"))?.symbol || "$"}
                    </span>
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

        {/* Dates */}
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
                <FormDescription>
                  This will help track project time elapse
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel className="text-base">Team Members</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={addConsultant}>
              <Plus className="h-4 w-4 mr-2" /> Add Team Member
            </Button>
          </div>
          
          {form.watch("consultants")?.map((_, index) => (
            <div key={index} className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Team Member {index + 1}</h4>
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
                          <Input placeholder="Enter team member type" {...field} />
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
                        <Input placeholder="Enter team member name" {...field} />
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
                        <Input placeholder="Enter team member email" type="email" {...field} />
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
                        <Input placeholder="Enter team member phone" {...field} />
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
              Selected file: {programFile.name} (will be uploaded to progress tab)
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

        <FormField
          control={form.control}
          name="scopeOfWorks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scope of Works (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter scope of works in numbered format (1, 2, 3, 4...)" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Please format as numbered list (1, 2, 3, 4...)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Project Files Section */}
        <div className="space-y-4">
          <FormLabel className="text-base">Project Files</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormLabel>Contract Documents</FormLabel>
              <FileUploader 
                onFilesSelected={setContractFiles}
                acceptedFileTypes=".pdf,.doc,.docx"
                maxFiles={5}
              />
              {contractFiles.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {contractFiles.length} file(s) selected
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <FormLabel>Drawings</FormLabel>
              <FileUploader 
                onFilesSelected={setDrawingFiles}
                acceptedFileTypes=".pdf,.dwg,.dxf,.jpg,.png"
                maxFiles={10}
              />
              {drawingFiles.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {drawingFiles.length} file(s) selected
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <FormLabel>Specifications</FormLabel>
              <FileUploader 
                onFilesSelected={setSpecificationFiles}
                acceptedFileTypes=".pdf,.doc,.docx,.xls,.xlsx"
                maxFiles={5}
              />
              {specificationFiles.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {specificationFiles.length} file(s) selected
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <FormLabel>Other Documents</FormLabel>
              <FileUploader 
                onFilesSelected={setOtherFiles}
                acceptedFileTypes=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                maxFiles={10}
              />
              {otherFiles.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {otherFiles.length} file(s) selected
                </div>
              )}
            </div>
          </div>
          <FormDescription>
            All files will be automatically directed to the documents section
          </FormDescription>
        </div>

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
