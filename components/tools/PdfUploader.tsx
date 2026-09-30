"use client";

import { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { FileUp } from "lucide-react";

interface PdfUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export function PdfUploader({ 
  onUpload, 
  maxFiles = 1, 
  maxSizeMB = 50
}: PdfUploaderProps) {

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const msgs = fileRejections.map(r => `${r.file.name}: ${r.errors.map((e) => e.message).join(", ")}`);
      alert(`Some files were rejected:\n${msgs.join("\n")}`);
    }
    
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-2xl p-6 md:p-20 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[250px] md:min-h-[300px] shadow-sm
        ${isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50 hover:bg-muted/30'}`}
    >
      <input {...getInputProps()} />
      <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
        <FileUp className="h-10 w-10" />
      </div>
      <h3 className="text-2xl font-bold mb-3 tracking-tight">
        {isDragActive ? "Drop PDF here..." : "Drag & drop PDF files"}
      </h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        or click to browse your files. Files are processed securely and locally in your browser.
      </p>
      <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 hover:shadow-lg transition-all pointer-events-none">
        Select PDF Files
      </button>
      <p className="mt-6 text-xs text-muted-foreground font-medium">
        Max file size: {maxSizeMB}MB. {maxFiles > 1 ? `Up to ${maxFiles} files.` : ''}
      </p>
    </div>
  );
}
