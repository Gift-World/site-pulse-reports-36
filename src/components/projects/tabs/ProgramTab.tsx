
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProgramTabProps {
  project: Project;
}

export const ProgramTab: React.FC<ProgramTabProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program of Works</CardTitle>
        <CardDescription>Project schedule and work breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3">Project Timeline</h3>
            <div className="space-y-4">
              <div className="relative pl-8 pb-8 border-l-2 border-construction-blue">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-construction-blue"></div>
                <div className="font-medium text-construction-blue">Project Start</div>
                <div className="text-sm text-muted-foreground">Feb 15, 2025</div>
                <div className="text-sm mt-1">Site preparation and mobilization</div>
              </div>
              <div className="relative pl-8 pb-8 border-l-2 border-construction-blue">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-construction-blue"></div>
                <div className="font-medium text-construction-blue">Phase 1: Foundation</div>
                <div className="text-sm text-muted-foreground">Feb 28 - Apr 15, 2025</div>
                <div className="text-sm mt-1">Excavation and foundation work</div>
                <Badge className="mt-2">Completed</Badge>
              </div>
              <div className="relative pl-8 pb-8 border-l-2 border-construction-blue">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-construction-blue"></div>
                <div className="font-medium text-construction-blue">Phase 2: Structural Work</div>
                <div className="text-sm text-muted-foreground">Apr 20 - Aug 15, 2025</div>
                <div className="text-sm mt-1">Steel erection and concrete work</div>
                <Badge variant="default" className="mt-2">In Progress</Badge>
              </div>
              <div className="relative pl-8 border-l-2 border-muted">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                <div className="font-medium">Phase 3: Building Envelope</div>
                <div className="text-sm text-muted-foreground">Aug 20 - Oct 30, 2025</div>
                <div className="text-sm mt-1">Exterior walls, roofing, and windows</div>
                <Badge variant="secondary" className="mt-2">Pending</Badge>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                <div className="font-medium">Project Completion</div>
                <div className="text-sm text-muted-foreground">Dec 15, 2025</div>
                <div className="text-sm mt-1">Final inspections and handover</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button>View Detailed Schedule</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
