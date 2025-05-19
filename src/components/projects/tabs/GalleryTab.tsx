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
    src: "/examples/card-example.png",
    alt: "Excavation site",
    category: "progress",
  },
  {
    id: 2,
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Timelapse of foundation pouring",
    category: "progress",
  },
  {
    id: 3,
    type: "photo",
    src: "/examples/card-example.png",
    alt: "Steel beam installation",
    category: "safety",
  },
  {
    id: 4,
    type: "photo",
    src: "/examples/card-example.png",
    alt: "Workers in safety gear",
    category: "safety",
  },
  {
    id: 5,
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Crane lifting materials",
    category: "progress",
  },
  {
    id: 6,
    type: "photo",
    src: "/examples/card-example.png",
    alt: "Completed building facade",
    category: "progress",
  },
  {
    id: 7,
    type: "photo",
    src: "/examples/card-example.png",
    alt: "Safety inspection",
    category: "safety",
  },
  {
    id: 8,
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Drone footage of site",
    category: "all",
  },
];

export function GalleryTab() {
  const [tab, setTab] = useState("all");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleUploadFiles = (files: File[]) => {
    // In a real application, you would upload these files to a server
    console.log("Files to upload:", files);
  };

  const filteredItems =
    tab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === tab);

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

      <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-1 md:w-[500px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.type === "photo" ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="rounded-md aspect-square object-cover"
                    />
                  ) : (
                    <iframe
                      src={item.src}
                      title={item.alt}
                      className="rounded-md aspect-square object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.type === "photo" && (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="rounded-md aspect-square object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.type === "video" && (
                    <iframe
                      src={item.src}
                      title={item.alt}
                      className="rounded-md aspect-square object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.category === "progress" && (
                    item.type === "photo" ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="rounded-md aspect-square object-cover"
                      />
                    ) : (
                      <iframe
                        src={item.src}
                        title={item.alt}
                        className="rounded-md aspect-square object-cover"
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.category === "safety" && (
                    item.type === "photo" ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="rounded-md aspect-square object-cover"
                      />
                    ) : (
                      <iframe
                        src={item.src}
                        title={item.alt}
                        className="rounded-md aspect-square object-cover"
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
