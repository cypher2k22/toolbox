"use client";

import { useState, useEffect } from "react";
import { ImageUploader } from "./ImageUploader";
import { Download, RefreshCw, Link as LinkIcon, Unlink } from "lucide-react";

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  
  const [width, setWidth] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [lockRatio, setLockRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  const handleUpload = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
      setFormat(f.type as "image/jpeg" | "image/png" | "image/webp" || "image/jpeg");
      
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
      };
      img.src = url;
      
      setResultUrl(null);
    }
  };

  const handleWidthChange = (val: string) => {
    const num = parseInt(val);
    setWidth(val);
    if (!isNaN(num) && lockRatio) {
      setHeight(Math.round(num / aspectRatio));
    }
  };

  const handleHeightChange = (val: string) => {
    const num = parseInt(val);
    setHeight(val);
    if (!isNaN(num) && lockRatio) {
      setWidth(Math.round(num * aspectRatio));
    }
  };

  const toggleLock = () => {
    const newLock = !lockRatio;
    setLockRatio(newLock);
    if (newLock && typeof width === 'number') {
      setHeight(Math.round(width / aspectRatio));
    }
  };

  const resizeImage = () => {
    if (!file || !previewUrl || typeof width !== 'number' && !width || typeof height !== 'number' && !height) return;
    
    const w = typeof width === 'string' ? parseInt(width) : width;
    const h = typeof height === 'string' ? parseInt(height) : height;
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert("Invalid dimensions");
      return;
    }

    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        alert("Failed to get canvas context");
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (resultUrl) URL.revokeObjectURL(resultUrl);
            setResultUrl(URL.createObjectURL(blob));
            setResultSize(blob.size);
          }
          setIsProcessing(false);
        },
        format,
        0.9
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
    const ext = format === "image/jpeg" ? "jpg" : format === "image/png" ? "png" : "webp";
    a.download = `resized_${file.name.split('.')[0]}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
  };

  if (!file) {
    return <ImageUploader onUpload={handleUpload} maxFiles={1} />;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Controls Area */}
      <div className="flex flex-col md:flex-row gap-8 bg-card border p-6 rounded-xl shadow-sm">
        <div className="flex-1 flex flex-col items-center justify-center bg-muted/30 rounded-lg overflow-hidden h-[300px] border p-2 relative">
          {previewUrl && (
            <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
          )}
          <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur text-xs px-2 py-1 rounded shadow-sm">
            {originalWidth} x {originalHeight}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Resize Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">Set your desired width and height.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1.5 block">Width (px)</label>
              <input 
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                placeholder="Width"
              />
            </div>
            
            <button 
              onClick={toggleLock}
              className={`mt-6 p-2 rounded-md transition-colors ${lockRatio ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              title={lockRatio ? "Unlock Aspect Ratio" : "Lock Aspect Ratio"}
            >
              {lockRatio ? <LinkIcon className="h-4 w-4" /> : <Unlink className="h-4 w-4" />}
            </button>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-1.5 block">Height (px)</label>
              <input 
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                placeholder="Height"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Output Format</label>
            <select 
              value={format}
              onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png" | "image/webp")}
              className="w-full border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="image/jpeg">JPEG (.jpg)</option>
              <option value="image/png">PNG (.png)</option>
              <option value="image/webp">WebP (.webp)</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={resizeImage}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Resize Image"}
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

      {/* Result Area */}
      {resultUrl && (
        <div className="flex flex-col items-center gap-6 p-6 bg-card border rounded-xl shadow-sm">
          <h4 className="text-lg font-bold">Resized Result</h4>
          <div className="bg-muted/30 p-2 rounded-lg border inline-block max-w-full overflow-hidden">
            <img src={resultUrl} alt="Resized" className="max-h-[400px] object-contain mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <span className="text-sm font-medium text-muted-foreground">
              New Size: {(resultSize / 1024).toFixed(2)} KB
            </span>
            <button 
              onClick={download}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resized Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
