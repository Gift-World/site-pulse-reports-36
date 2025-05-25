import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUploader } from "@/components/reports/FileUploader";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, Plus, Trash2, Map, Building, User } from "lucide-react";
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
  mainContractor: z.string().min(2, "Main contractor name is required"),
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
});

type FormValues = z.infer<typeof formSchema>;

interface NewProjectFormProps {
  onComplete: () => void;
}

export function NewProjectForm({ onComplete }: NewProjectFormProps) {
  const [programFile, setProgramFile] = useState<File | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
      mainContractor: "",
      location: "",
      cost: "",
      currency: "USD",
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
    console.log("Selected location:", selectedLocation);
    
    const selectedCurrency = currencies.find(c => c.code === data.currency);
    
    toast({
      title: "Project Created",
      description: `Project "${data.name}" has been successfully created with budget ${selectedCurrency?.symbol}${Number(data.cost).toLocaleString()}.`,
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

  const handleOpenMap = () => {
    // Open Google Maps for location selection
    const mapUrl = "https://www.google.com/maps/@0,0,2z";
    const newWindow = window.open(mapUrl, '_blank', 'width=800,height=600');
    
    // Simulate location selection (in a real app, this would be handled via Google Maps API)
    toast({
      title: "Map Opened",
      description: "Please select your location on Google Maps. In a real implementation, this would integrate with Google Maps API to return coordinates.",
    });
    
    // Mock location selection after 3 seconds
    setTimeout(() => {
      const mockLocation = {
        lat: 40.7128,
        lng: -74.0060,
        address: "New York, NY, USA"
      };
      setSelectedLocation(mockLocation);
      form.setValue("location", mockLocation.address);
      
      toast({
        title: "Location Selected",
        description: `Selected: ${mockLocation.address}`,
      });
    }, 3000);
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
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter client name" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="mainContractor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Contractor</FormLabel>
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
              {selectedLocation && (
                <FormDescription>
                  Selected coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

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
