
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SafetyBulletin {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: "high" | "medium" | "low";
  imageSrc?: string;
}

// Sample safety bulletins
const sampleBulletins: SafetyBulletin[] = [
  {
    id: 1,
    title: "New Hard Hat Policy",
    content: "Effective immediately, all personnel must wear ANSI-approved hard hats in all construction areas. Hard hats must be inspected daily for cracks, dents, or other damage.",
    date: "May 15, 2025",
    priority: "high",
    imageSrc: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    id: 2,
    title: "Fall Protection Requirements",
    content: "Workers operating at heights of 6 feet or more above lower levels must use fall protection equipment. Ensure all harnesses are properly fitted and anchored to appropriate tie-off points.",
    date: "May 10, 2025",
    priority: "high",
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 3,
    title: "Electrical Safety Reminder",
    content: "Always inspect electrical tools and cords before use. Never use damaged equipment. Use GFCI protection for all electrical equipment in wet or damp locations.",
    date: "May 5, 2025",
    priority: "medium",
    imageSrc: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  },
];

export function SafetyBulletinBoard() {
  return (
    <Card className="mt-6">
      <CardHeader className="bg-red-50">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-500" />
          <CardTitle>Safety Bulletin Board</CardTitle>
        </div>
        <CardDescription>
          Important safety announcements and protocols for all project sites
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {sampleBulletins.map((bulletin) => (
              <Card key={bulletin.id} className="border-l-4 border-l-red-400 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {bulletin.priority === "high" && (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        {bulletin.title}
                      </CardTitle>
                      <CardDescription>Posted on {bulletin.date}</CardDescription>
                    </div>
                    <Badge 
                      variant={
                        bulletin.priority === "high" ? "destructive" : 
                        bulletin.priority === "medium" ? "secondary" : "outline"
                      }
                    >
                      {bulletin.priority.charAt(0).toUpperCase() + bulletin.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  {bulletin.imageSrc && (
                    <div className="mb-4 overflow-hidden rounded-md">
                      <img 
                        src={bulletin.imageSrc} 
                        alt={bulletin.title}
                        className="w-full h-auto object-cover rounded-md" 
                      />
                    </div>
                  )}
                  <p className="text-sm">{bulletin.content}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm">View Full Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
