
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

// Define schemas for different report types
const dailyReportSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  reportDate: z.date({ required_error: "A report date is required." }),
  filledBy: z.string().min(2, { message: "Name must be at least 2 characters." }),
  weather: z.string().min(2, { message: "Weather conditions must be provided." }),
  workDone: z.string().min(10, { message: "Work description must be at least 10 characters." }),
  materialsIn: z.string().optional(),
  materialsOut: z.string().optional(),
  laborCount: z.string().min(1, { message: "Labor count must be provided." }),
  comments: z.string().optional(),
});

const safetyReportSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  reportDate: z.date({ required_error: "A report date is required." }),
  filledBy: z.string().min(2, { message: "Name must be at least 2 characters." }),
  inspectionType: z.string().min(2, { message: "Inspection type must be provided." }),
  hazardsIdentified: z.string().optional(),
  incidentsReported: z.string().optional(),
  correctiveActions: z.string().optional(),
  safetyRating: z.string().min(1, { message: "Safety rating must be provided." }),
  comments: z.string().optional(),
});

const weatherReportSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  reportDate: z.date({ required_error: "A report date is required." }),
  filledBy: z.string().min(2, { message: "Name must be at least 2 characters." }),
  weatherCondition: z.string().min(2, { message: "Weather condition must be provided." }),
  workStoppage: z.string().min(2, { message: "Work stoppage status must be provided." }),
  stoppageHours: z.string().optional(),
  affectedActivities: z.string().optional(),
  comments: z.string().optional(),
});

const siteVisitReportSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  reportDate: z.date({ required_error: "A report date is required." }),
  filledBy: z.string().min(2, { message: "Name must be at least 2 characters." }),
  visitPurpose: z.string().min(2, { message: "Visit purpose must be provided." }),
  observations: z.string().min(10, { message: "Observations must be at least 10 characters." }),
  actionItems: z.string().optional(),
  followUpDate: z.date().optional(),
  comments: z.string().optional(),
});

const meetingMinutesSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  reportDate: z.date({ required_error: "A meeting date is required." }),
  filledBy: z.string().min(2, { message: "Name must be at least 2 characters." }),
  meetingType: z.string().min(2, { message: "Meeting type must be provided." }),
  attendees: z.string().min(2, { message: "Attendees must be listed." }),
  agenda: z.string().min(10, { message: "Agenda must be provided." }),
  discussionPoints: z.string().min(10, { message: "Discussion points must be provided." }),
  actionItems: z.string().optional(),
  nextMeetingDate: z.date().optional(),
});

interface ReportFormProps {
  onSubmit: (data: any & { photos: File[] }) => void;
  defaultValues?: any;
  reportType: string;
}

export function ReportForm({ onSubmit, defaultValues, reportType }: ReportFormProps) {
  const [photos, setPhotos] = React.useState<File[]>([]);
  
  // Select appropriate schema based on report type
  const getFormSchema = () => {
    switch(reportType) {
      case "daily": return dailyReportSchema;
      case "safety": return safetyReportSchema;
      case "weather": return weatherReportSchema;
      case "visit": return siteVisitReportSchema;
      case "meeting": return meetingMinutesSchema;
      default: return dailyReportSchema;
    }
  };
  
  const form = useForm({
    resolver: zodResolver(getFormSchema()),
    defaultValues: defaultValues || {
      projectName: "",
      reportDate: new Date(),
      filledBy: "",
    },
  });

  // Reset form when report type changes
  React.useEffect(() => {
    form.reset({
      projectName: form.getValues().projectName,
      reportDate: form.getValues().reportDate,
      filledBy: form.getValues().filledBy
    });
  }, [reportType, form]);

  const handleSubmit = (values: any) => {
    onSubmit({ ...values, photos });
    toast({
      title: "Report submitted",
      description: "Your report has been successfully submitted.",
    });
  };

  // Render different form fields based on report type
  const renderReportFields = () => {
    switch(reportType) {
      case "daily":
        return renderDailyReportFields();
      case "safety":
        return renderSafetyReportFields();
      case "weather":
        return renderWeatherReportFields();
      case "visit":
        return renderSiteVisitReportFields();
      case "meeting":
        return renderMeetingMinutesFields();
      default:
        return renderDailyReportFields();
    }
  };

  const renderCommonFields = () => (
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
    </div>
  );

  const renderDailyReportFields = () => (
    <>
      {renderCommonFields()}

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
    </>
  );

  const renderSafetyReportFields = () => (
    <>
      {renderCommonFields()}
      
      <FormField
        control={form.control}
        name="inspectionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inspection Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select inspection type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="routine">Routine Inspection</SelectItem>
                <SelectItem value="incident">Incident Investigation</SelectItem>
                <SelectItem value="hazard">Hazard Assessment</SelectItem>
                <SelectItem value="compliance">Compliance Check</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="hazardsIdentified"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hazards Identified</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List any hazards identified during inspection" 
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
        name="incidentsReported"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Incidents Reported</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe any incidents that occurred" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="correctiveActions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Corrective Actions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List actions taken to address hazards/incidents" 
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
            <FormLabel>Safety Rating (1-10)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="1"
                max="10"
                placeholder="Rate overall safety from 1-10" 
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
                placeholder="Any additional safety observations or recommendations" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderWeatherReportFields = () => (
    <>
      {renderCommonFields()}
      
      <FormField
        control={form.control}
        name="weatherCondition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weather Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select weather condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sunny">Sunny</SelectItem>
                <SelectItem value="cloudy">Cloudy</SelectItem>
                <SelectItem value="rainy">Rainy</SelectItem>
                <SelectItem value="stormy">Stormy</SelectItem>
                <SelectItem value="snowy">Snowy</SelectItem>
                <SelectItem value="windy">Windy</SelectItem>
                <SelectItem value="foggy">Foggy</SelectItem>
                <SelectItem value="hail">Hail</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="workStoppage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Stoppage</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Did work stop due to weather?" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="stoppageHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hours of Stoppage</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Number of hours work was stopped" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="affectedActivities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Affected Activities</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List activities affected by weather conditions" 
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
        name="comments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Comments</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Any additional weather-related observations" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderSiteVisitReportFields = () => (
    <>
      {renderCommonFields()}
      
      <FormField
        control={form.control}
        name="visitPurpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Visit Purpose</FormLabel>
            <FormControl>
              <Input placeholder="Purpose of the site visit" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="observations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observations</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What was observed during the site visit" 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="actionItems"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Action Items</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List actions to be taken based on the visit" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="followUpDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Follow-up Date (Optional)</FormLabel>
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
        name="comments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Comments</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Any additional comments about the visit" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderMeetingMinutesFields = () => (
    <>
      {renderCommonFields()}
      
      <FormField
        control={form.control}
        name="meetingType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meeting Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="progress">Progress Meeting</SelectItem>
                <SelectItem value="coordination">Coordination Meeting</SelectItem>
                <SelectItem value="client">Client Meeting</SelectItem>
                <SelectItem value="safety">Safety Meeting</SelectItem>
                <SelectItem value="design">Design Review</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="attendees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Attendees</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List all meeting attendees and their roles" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="agenda"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meeting Agenda</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List the meeting agenda items" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="discussionPoints"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discussion Points</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Key points discussed during the meeting" 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="actionItems"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Action Items</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List tasks, responsible persons, and deadlines" 
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
        name="nextMeetingDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Next Meeting Date (Optional)</FormLabel>
            <DatePicker
              date={field.value}
              onDateChange={field.onChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {renderReportFields()}

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
