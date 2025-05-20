
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { FileUploader } from "@/components/reports/FileUploader";

interface SafetyBulletinFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SafetyBulletinForm({ open, onOpenChange }: SafetyBulletinFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for the safety bulletin.",
        variant: "destructive",
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please provide content for the safety bulletin.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Safety Bulletin Created",
      description: `"${title}" has been published to the safety board.`,
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setPhotos([]);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Create Safety Bulletin</DialogTitle>
          <DialogDescription>
            Create a new safety bulletin to be displayed on the safety board.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Bulletin Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., New Safety Protocol for Scaffolding"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Bulletin Content</Label>
              <Textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Describe safety protocols, procedures, or announcements..."
                className="min-h-[200px]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Safety Images</Label>
              <FileUploader
                onFilesSelected={(files) => setPhotos(files)}
                maxFiles={5}
                acceptedFileTypes=".jpg,.jpeg,.png,.gif"
                label="Upload safety images"
              />
              <p className="text-sm text-muted-foreground">
                Upload images of safety equipment, proper procedures, or safety hazards (max 5).
              </p>
            </div>
          </form>
        </ScrollArea>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Publish Bulletin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
