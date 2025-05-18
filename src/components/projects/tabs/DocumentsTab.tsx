
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface DocumentsTabProps {
  project: Project;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Documents</CardTitle>
        <CardDescription>Contract, specifications, drawings and other documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                    <span>Technical Specifications</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                    <span>Material Requirements</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                    <span>Quality Standards</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contracts & Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                    <span>Main Contract</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                    <span>Subcontractor Agreements</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-construction-blue" />
                    <span>Insurance Documents</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 text-center">
          <Button>
            Upload New Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
