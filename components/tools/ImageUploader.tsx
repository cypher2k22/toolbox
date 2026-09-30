"use client";

import { useCallback } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  accept?: DropzoneOptions["accept"];
  maxSizeMB?: number;
}

export function ImageUploader({ 
  onUpload, 
  maxFiles = 1, 
  accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp']
  },
  maxSizeMB = 20
}: ImageUploaderProps) {

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const msgs = fileRejections.map(r => `${r.file.name}: ${r.errors.map(e => e.message).join(", ")}`);
      alert(`Some files were rejected:\n${msgs.join("\n")}`);
    }
    
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-10 md:p-20 text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[300px]
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
    >
      <input {...getInputProps()} />
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
        <UploadCloud className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {isDragActive ? "Drop files here..." : "Drag & drop images here"}
      </h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm">
        or click to browse your files. Files are processed locally in your browser.
      </p>
      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors pointer-events-none">
        Select Files
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Max file size: {maxSizeMB}MB. {maxFiles > 1 ? `Up to ${maxFiles} files.` : ''}
      </p>
    </div>
  );
}
