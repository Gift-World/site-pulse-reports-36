
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface SafetyBulletin {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: "high" | "medium" | "low";
  imageSrc?: string;
  detailedContent?: string;
}

// Sample safety bulletins
const sampleBulletins: SafetyBulletin[] = [
  {
    id: 1,
    title: "New Hard Hat Policy",
    content: "Effective immediately, all personnel must wear ANSI-approved hard hats in all construction areas. Hard hats must be inspected daily for cracks, dents, or other damage.",
    date: "May 15, 2025",
    priority: "high",
    imageSrc: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    detailedContent: `
      <h3>Hard Hat Safety Requirements</h3>
      <p>Effective immediately, all personnel must wear ANSI-approved hard hats in all construction areas. Hard hats must be inspected daily for cracks, dents, or other damage.</p>
      
      <h4>Inspection Guidelines:</h4>
      <ul>
        <li>Check for cracks, dents, or signs of impact</li>
        <li>Ensure suspension system is intact and properly adjusted</li>
        <li>Verify that the hard hat has not expired (typically 5 years from manufacture date)</li>
        <li>Replace immediately if any damage is found</li>
      </ul>
      
      <h4>Proper Wearing:</h4>
      <ul>
        <li>Face forward - do not wear backwards unless specifically designed for reverse wearing</li>
        <li>Maintain 1-1¼ inch clearance between the shell and head</li>
        <li>Secure chin strap when working at heights or in windy conditions</li>
      </ul>
      
      <p>Contact the safety officer for replacement hard hats or with any questions regarding this policy.</p>
    `
  },
  {
    id: 2,
    title: "Fall Protection Requirements",
    content: "Workers operating at heights of 6 feet or more above lower levels must use fall protection equipment. Ensure all harnesses are properly fitted and anchored to appropriate tie-off points.",
    date: "May 10, 2025",
    priority: "high",
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    detailedContent: `
      <h3>Fall Protection Policy</h3>
      <p>Workers operating at heights of 6 feet or more above lower levels must use fall protection equipment. Ensure all harnesses are properly fitted and anchored to appropriate tie-off points.</p>
      
      <h4>Equipment Requirements:</h4>
      <ul>
        <li>Full-body harness (inspect before each use)</li>
        <li>Lanyards with shock absorbers</li>
        <li>Appropriate anchorage points capable of supporting 5,000 pounds per worker</li>
        <li>Self-retracting lifelines when appropriate</li>
      </ul>
      
      <h4>Training Requirements:</h4>
      <p>All workers using fall protection must complete authorized fall protection training every 3 years and demonstrate proper use of equipment.</p>
      
      <h4>Rescue Plan:</h4>
      <p>A rescue plan must be in place before any work at heights begins. Workers should never be left suspended following a fall event for more than 15 minutes.</p>
    `
  },
  {
    id: 3,
    title: "Electrical Safety Reminder",
    content: "Always inspect electrical tools and cords before use. Never use damaged equipment. Use GFCI protection for all electrical equipment in wet or damp locations.",
    date: "May 5, 2025",
    priority: "medium",
    imageSrc: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    detailedContent: `
      <h3>Electrical Safety Protocol</h3>
      <p>Always inspect electrical tools and cords before use. Never use damaged equipment. Use GFCI protection for all electrical equipment in wet or damp locations.</p>
      
      <h4>Inspection Checklist:</h4>
      <ul>
        <li>Check cords for cuts, frays, or exposed wiring</li>
        <li>Verify that plugs have all prongs intact</li>
        <li>Ensure tool housings are not cracked or damaged</li>
        <li>Test GFCI operation before each use</li>
      </ul>
      
      <h4>Safety Guidelines:</h4>
      <ul>
        <li>Keep electrical cords away from heat, oil, and sharp edges</li>
        <li>Never carry tools by their cords</li>
        <li>Disconnect tools when not in use</li>
        <li>Use double-insulated tools when possible</li>
        <li>Keep work areas dry and use appropriate PPE</li>
      </ul>
      
      <p>Report any damaged equipment to your supervisor immediately.</p>
    `
  },
];

export function SafetyBulletinBoard() {
  const [selectedBulletin, setSelectedBulletin] = useState<SafetyBulletin | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (bulletin: SafetyBulletin) => {
    setSelectedBulletin(bulletin);
    setDetailsOpen(true);
  };

  return (
    <>
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
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(bulletin)}>
                      View Full Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[60%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedBulletin?.priority === "high" && (
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              )}
              {selectedBulletin?.title}
            </DialogTitle>
            <DialogDescription>
              Posted on {selectedBulletin?.date}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div>
              {selectedBulletin?.imageSrc && (
                <div className="mb-6 overflow-hidden rounded-md">
                  <img 
                    src={selectedBulletin.imageSrc} 
                    alt={selectedBulletin.title}
                    className="w-full h-auto max-h-[300px] object-cover rounded-md" 
                  />
                </div>
              )}
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: selectedBulletin?.detailedContent || '' }}
              />
            </div>
          </ScrollArea>
          <DialogFooter>
            <Badge 
              variant={
                selectedBulletin?.priority === "high" ? "destructive" : 
                selectedBulletin?.priority === "medium" ? "secondary" : "outline"
              }
              className="mr-auto"
            >
              {selectedBulletin?.priority.charAt(0).toUpperCase() + selectedBulletin?.priority.slice(1)} Priority
            </Badge>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
