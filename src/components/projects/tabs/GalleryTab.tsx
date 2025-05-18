
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Upload, Trash2, Eye, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "@/components/reports/FileUploader";
import { toast } from "@/hooks/use-toast";

interface GalleryTabProps {
  project: Project;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ project }) => {
  const [photos, setPhotos] = useState<any[]>([
    { id: 1, url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Site preparation", date: "May 16, 2025" },
    { id: 2, url: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Foundation work", date: "May 15, 2025" },
    { id: 3, url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Steel framework", date: "May 14, 2025" },
    { id: 4, url: "https://images.unsplash.com/photo-1621156878319-0a62b569f584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Concrete pouring", date: "May 13, 2025" },
    { id: 5, url: "https://images.unsplash.com/photo-1605742795330-8956ec0002b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Electrical installation", date: "May 12, 2025" },
    { id: 6, url: "https://images.unsplash.com/photo-1574621950119-b1b0f35297eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", title: "Plumbing work", date: "May 11, 2025" },
  ]);
  
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  const handleUpload = (files: File[]) => {
    const newPhotos = files.map((file, index) => ({
      id: photos.length + index + 1,
      url: URL.createObjectURL(file),
      title: file.name.split('.')[0],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    }));
    
    setPhotos([...photos, ...newPhotos]);
    setShowUploadDialog(false);
    toast({
      title: "Photos uploaded",
      description: `${files.length} photos have been added to the gallery.`
    });
  };
  
  const viewImage = (image: any) => {
    setSelectedImage(image);
    setShowImageDialog(true);
  };
  
  const deleteImage = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    toast({
      title: "Photo deleted",
      description: "The photo has been removed from the gallery."
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Project Gallery</CardTitle>
            <CardDescription>Photos and visual documentation</CardDescription>
          </div>
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Project Photos</DialogTitle>
                <DialogDescription>
                  Add photos to document the project progress
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <FileUploader
                  onFilesSelected={handleUpload}
                  maxFiles={10}
                  accept="image/*"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square bg-secondary rounded-md overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white hover:bg-opacity-20"
                    onClick={() => viewImage(photo)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-red-500 hover:bg-opacity-20"
                    onClick={() => deleteImage(photo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-medium text-sm truncate">{photo.title}</p>
                <p className="text-xs text-muted-foreground">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Image Preview Dialog */}
        <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedImage?.title}</DialogTitle>
              <DialogDescription>{selectedImage?.date}</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              {selectedImage && (
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="max-h-[70vh] max-w-full object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
