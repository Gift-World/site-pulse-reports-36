
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FileText, FilePlus, Download, Eye, Trash2, Search, FileArchive, FileCode, FileImage, FileSpreadsheet, UploadCloud } from "lucide-react";

// Mock data for files
const fileCategories = [
  {
    id: "drawings",
    name: "Drawings",
    files: [
      { id: 1, name: "Foundation Plan.dwg", type: "dwg", size: "2.4 MB", uploadedBy: "John Smith", date: "May 16, 2025" },
      { id: 2, name: "Structural Details.pdf", type: "pdf", size: "3.8 MB", uploadedBy: "Maria Garcia", date: "May 14, 2025" },
      { id: 3, name: "Electrical Layout.dwg", type: "dwg", size: "1.7 MB", uploadedBy: "Robert Johnson", date: "May 10, 2025" }
    ]
  },
  {
    id: "specifications",
    name: "Specifications",
    files: [
      { id: 1, name: "Material Specifications.pdf", type: "pdf", size: "5.2 MB", uploadedBy: "Sarah Williams", date: "May 13, 2025" },
      { id: 2, name: "Technical Requirements.pdf", type: "pdf", size: "4.1 MB", uploadedBy: "David Brown", date: "May 8, 2025" },
      { id: 3, name: "Quality Standards.docx", type: "docx", size: "1.3 MB", uploadedBy: "John Smith", date: "May 5, 2025" }
    ]
  },
  {
    id: "contracts",
    name: "Contracts",
    files: [
      { id: 1, name: "Client Agreement.pdf", type: "pdf", size: "2.7 MB", uploadedBy: "Maria Garcia", date: "May 15, 2025" },
      { id: 2, name: "Subcontractor Agreement.docx", type: "docx", size: "1.9 MB", uploadedBy: "Robert Johnson", date: "May 12, 2025" },
      { id: 3, name: "Legal Requirements.pdf", type: "pdf", size: "3.5 MB", uploadedBy: "David Brown", date: "May 7, 2025" }
    ]
  },
  {
    id: "permits",
    name: "Permits",
    files: [
      { id: 1, name: "Building Permit.pdf", type: "pdf", size: "1.6 MB", uploadedBy: "Sarah Williams", date: "May 14, 2025" },
      { id: 2, name: "Environmental Approval.pdf", type: "pdf", size: "2.3 MB", uploadedBy: "John Smith", date: "May 9, 2025" },
      { id: 3, name: "Safety Inspection Certificate.pdf", type: "pdf", size: "1.1 MB", uploadedBy: "Maria Garcia", date: "May 6, 2025" }
    ]
  }
];

const getFileIcon = (type: string) => {
  switch(type) {
    case "pdf": return <FileText className="h-5 w-5 text-red-500" />;
    case "dwg": return <FileCode className="h-5 w-5 text-blue-500" />;
    case "docx": return <FileText className="h-5 w-5 text-blue-600" />;
    case "jpg":
    case "png": return <FileImage className="h-5 w-5 text-green-500" />;
    case "xlsx": return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    case "zip": return <FileArchive className="h-5 w-5 text-amber-500" />;
    default: return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

const Files = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Files</h1>
          <p className="text-muted-foreground">
            Upload, view and download project documentation
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-construction-navy hover:bg-construction-darkBlue">
                <FilePlus className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New File</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="file-name">File Name</Label>
                  <Input id="file-name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select category</option>
                    {fileCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <UploadCloud className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">Drag and drop your file here</p>
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

      <Tabs defaultValue="drawings" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {fileCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {fileCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.files.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                      <div className="p-2 rounded-md bg-muted">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {file.type.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                          <span className="text-xs text-muted-foreground">Uploaded on {file.date}</span>
                          <span className="text-xs text-muted-foreground">by {file.uploadedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Files;
