
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileCheck, AlertCircle } from "lucide-react";

export interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFiles?: number;
  label?: string;
}

export function FileUploader({ 
  onFilesSelected, 
  acceptedFileTypes = '.pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png',
  maxFiles = 5,
  label = 'Upload Files' 
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (maxFiles && acceptedFiles.length + files.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }
    
    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  }, [files, maxFiles, onFilesSelected]);
  
  const removeFile = (fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
    setError(null);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? acceptedFileTypes.split(',').reduce((acc: any, type) => {
      acc[type] = [];
      return acc;
    }, {}) : undefined
  });
  
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-construction-navy bg-construction-navy/5' : 'border-gray-200 hover:border-construction-navy/50 hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Drag & drop files here, or click to select files
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Accepted file types: {acceptedFileTypes}
        </p>
        {maxFiles && (
          <p className="text-xs text-muted-foreground">
            Maximum {maxFiles} files
          </p>
        )}
      </div>
      
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Selected Files:</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between text-sm p-2 border rounded-md">
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 mr-2 text-green-500" />
                  <span className="truncate max-w-[250px]">{file.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
