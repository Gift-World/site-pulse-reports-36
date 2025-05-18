
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function FileUploader({
  onFilesSelected,
  maxFiles = 10,
  accept,
  className,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const filesToAdd: File[] = [];
    const newPreviews: string[] = [...previews];

    for (let i = 0; i < selectedFiles.length; i++) {
      if (files.length + filesToAdd.length >= maxFiles) break;
      
      const file = selectedFiles[i];
      filesToAdd.push(file);
      
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        newPreviews.push(previewUrl);
      } else {
        newPreviews.push('');
      }
    }
    
    const updatedFiles = [...files, ...filesToAdd];
    setFiles(updatedFiles);
    setPreviews(newPreviews);
    onFilesSelected(updatedFiles);
    
    // Reset the input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    
    // Revoke object URL to prevent memory leaks
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    onFilesSelected(newFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="font-medium">Click to upload files</p>
          <p className="text-sm text-muted-foreground">
            {accept ? `Supports ${accept.replace('*', 'all')} files` : 'Upload any file'}
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum {maxFiles} files
          </p>
        </div>
        <input 
          ref={inputRef}
          type="file" 
          multiple
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith('image/') && previews[index] ? (
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <img 
                    src={previews[index]} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-video rounded-md bg-muted">
                  <span className="text-sm font-medium truncate max-w-[90%] px-2">
                    {file.name}
                  </span>
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
