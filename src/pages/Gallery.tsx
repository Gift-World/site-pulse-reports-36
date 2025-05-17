
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Download, Trash2, Search, UploadCloud } from "lucide-react";

// Mock data for gallery images
const galleryData = [
  {
    id: "site-progress",
    name: "Site Progress",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Foundation Work - May 15", date: "May 15, 2025" },
      { id: 2, url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Steel Frame Installation - May 10", date: "May 10, 2025" },
      { id: 3, url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Concrete Pouring - May 5", date: "May 5, 2025" },
      { id: 4, url: "https://images.unsplash.com/photo-1621280336935-c1f7bf405dac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Wall Construction - May 2", date: "May 2, 2025" }
    ]
  },
  {
    id: "safety-inspections",
    name: "Safety Inspections",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Safety Harness Check - May 12", date: "May 12, 2025" },
      { id: 2, url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Fall Protection Inspection - May 8", date: "May 8, 2025" }
    ]
  },
  {
    id: "aerial-views",
    name: "Aerial Views",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Drone Shot - Full Site - May 16", date: "May 16, 2025" },
      { id: 2, url: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Aerial Progress View - May 9", date: "May 9, 2025" },
      { id: 3, url: "https://images.unsplash.com/photo-1603349136288-93d45f457a04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Site Planning Overview - May 3", date: "May 3, 2025" }
    ]
  },
  {
    id: "material-deliveries",
    name: "Material Deliveries",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Lumber Delivery - May 14", date: "May 14, 2025" },
      { id: 2, url: "https://images.unsplash.com/photo-1618763099358-978178444f7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Concrete Mixer Arrival - May 7", date: "May 7, 2025" }
    ]
  }
];

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Gallery</h1>
          <p className="text-muted-foreground">
            Upload, view and download site photos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search photos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-construction-navy hover:bg-construction-darkBlue">
                <Plus className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Photos</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="photo-title">Photo Title</Label>
                  <Input id="photo-title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select category</option>
                    {galleryData.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">Photo</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <UploadCloud className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">Drag and drop your images here</p>
                    <Input id="file" type="file" className="mx-auto" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Button className="bg-construction-navy hover:bg-construction-darkBlue">Upload</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="site-progress" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {galleryData.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {galleryData.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="h-48 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(image)}
                  />
                  <CardContent className="p-3">
                    <p className="font-medium text-sm truncate">{image.title}</p>
                    <p className="text-xs text-muted-foreground">{image.date}</p>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Image Preview Dialog */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedImage.title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="max-h-[70vh] max-w-full rounded-md"
              />
              <div className="w-full flex justify-between mt-4">
                <p className="text-sm text-muted-foreground">{selectedImage.date}</p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Gallery;
