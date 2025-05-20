
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "@/components/reports/FileUploader";

const galleryItems = [
  {
    id: 1,
    type: "photo",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Foundation Work - May 15",
  },
  {
    id: 2,
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Timelapse of foundation pouring",
  },
  {
    id: 3,
    type: "photo",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Steel Frame Installation",
  },
  {
    id: 4,
    type: "photo",
    src: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Safety inspection overview",
  },
  {
    id: 5,
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Crane lifting materials",
  },
  {
    id: 6,
    type: "photo",
    src: "https://images.unsplash.com/photo-1621280336935-c1f7bf405dac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Wall Construction",
  },
  {
    id: 7,
    type: "photo",
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Safety equipment inspection",
  },
  {
    id: 8,
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Drone footage of site",
  },
  {
    id: 9,
    type: "photo",
    src: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Fall Protection Inspection",
  },
  {
    id: 10,
    type: "photo",
    src: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Drone Shot - Full Site",
  },
  {
    id: 11,
    type: "photo",
    src: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Aerial Progress View",
  },
  {
    id: 12,
    type: "photo",
    src: "https://images.unsplash.com/photo-1603349136288-93d45f457a04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Site Planning Overview",
  },
];

export function GalleryTab() {
  const [tab, setTab] = useState("photos");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleUploadFiles = (files: File[]) => {
    // In a real application, you would upload these files to a server
    console.log("Files to upload:", files);
  };

  const photoItems = galleryItems.filter((item) => item.type === "photo");
  const videoItems = galleryItems.filter((item) => item.type === "video");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Project Gallery</h2>
          <p className="text-muted-foreground">
            View and manage project photos and videos
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload Media</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Media Files</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FileUploader 
                onFilesSelected={handleUploadFiles} 
                maxFiles={5}
                acceptedFileTypes=".jpg,.jpeg,.png,.gif,.mp4,.mov"
                label="Upload Photos & Videos"
              />

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Add a description for these media files" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="photos" value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-2 gap-1 md:w-[260px]">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="photos" className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photoItems.map((item) => (
                <div key={item.id} className="relative">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="rounded-md aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videoItems.map((item) => (
                <div key={item.id} className="relative">
                  <iframe
                    src={item.src}
                    title={item.alt}
                    className="rounded-md aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
