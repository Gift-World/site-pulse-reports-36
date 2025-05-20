
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Trash2 } from "lucide-react";

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  date: string;
}

interface GalleryCategory {
  id: string;
  name: string;
  images: GalleryImage[];
}

interface GalleryViewProps {
  galleryData: GalleryCategory[];
  selectedImage: GalleryImage | null;
  onImageClick: (image: GalleryImage) => void;
  setSelectedImage: (image: GalleryImage | null) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ 
  galleryData, 
  selectedImage, 
  onImageClick, 
  setSelectedImage 
}) => {
  const [activeGalleryTab, setActiveGalleryTab] = useState("site-progress");

  return (
    <>
      <Tabs defaultValue="site-progress" value={activeGalleryTab} onValueChange={setActiveGalleryTab}>
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
                    onClick={() => onImageClick(image)}
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
    </>
  );
};
