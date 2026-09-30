"use client";

import { useState, useEffect } from "react";
import { ImageUploader } from "./ImageUploader";
import { Download, RefreshCw, AlertCircle } from "lucide-react";

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  useEffect(() => {
    return () => {
      // Cleanup object urls
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  const handleUpload = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setResultBlob(null);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
  };

  const reset = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setQuality(0.8);
  };

  const compressImage = () => {
    if (!file || !previewUrl) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        alert("Failed to get canvas context");
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = file.type === "image/png" ? "image/png" : 
                       file.type === "image/webp" ? "image/webp" : "image/jpeg";
      
      // Note: quality parameter only works for jpeg and webp.
      // For PNG, it's ignored by canvas.toBlob, but users typically just accept this or we can warn them.
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setResultBlob(blob);
            setResultUrl(URL.createObjectURL(blob));
          }
          setIsProcessing(false);
        },
        mimeType,
        quality
      );
    };
    img.onerror = () => {
      alert("Failed to load image for processing");
      setIsProcessing(false);
    };
    img.src = previewUrl;
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `compressed_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!file) {
    return <ImageUploader onUpload={handleUpload} maxFiles={1} />;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Controls & Status */}
      <div className="flex flex-col md:flex-row gap-8 bg-card border p-6 rounded-xl shadow-sm">
        <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden h-[300px] border">
          {previewUrl && (
            <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
          )}
        </div>
        
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Compression Settings</h3>
            <p className="text-sm text-muted-foreground mb-1">File: {file.name}</p>
            <p className="text-sm font-medium">Original Size: {formatSize(file.size)}</p>
          </div>

          {file.type === "image/png" && (
            <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-500/10 p-3 rounded-md">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <p>PNG compression via Canvas is often less effective. Consider converting to JPEG or WebP if file size is the priority.</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Quality ({Math.round(quality * 100)}%)</label>
                <span className="text-xs text-muted-foreground">Lower = Smaller size</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.05" 
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-primary"
                disabled={isProcessing}
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={compressImage}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Compress Image"}
              </button>
              <button 
                onClick={reset}
                className="px-4 py-2 border bg-background hover:bg-muted rounded-md text-sm font-medium transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Area */}
      {resultBlob && resultUrl && (
        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-lg font-bold text-green-700 dark:text-green-400 mb-1">Compression Complete!</h4>
            <div className="flex flex-col sm:flex-row sm:gap-6 text-sm">
              <p>New Size: <span className="font-bold">{formatSize(resultBlob.size)}</span></p>
              <p>Saved: <span className="font-bold text-green-600">{Math.round((1 - resultBlob.size / file.size) * 100)}%</span></p>
            </div>
          </div>
          <button 
            onClick={download}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}
