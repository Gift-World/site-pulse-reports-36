
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface GalleryTabProps {
  project: Project;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Gallery</CardTitle>
        <CardDescription>Photos and visual documentation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="aspect-square bg-secondary rounded-md flex items-center justify-center">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button>
            Upload New Photos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
