"use client";

import { useState, useEffect } from "react";
import { ImageUploader } from "./ImageUploader";
import { Download, RefreshCw, ArrowRight } from "lucide-react";

export function JpgToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);

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
      setPreviewUrl(URL.createObjectURL(f));
      setResultUrl(null);
    }
  };

  const convertImage = () => {
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

      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (resultUrl) URL.revokeObjectURL(resultUrl);
            setResultUrl(URL.createObjectURL(blob));
            setResultSize(blob.size);
          }
          setIsProcessing(false);
        },
        "image/png"
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
    a.download = `${file.name.split('.')[0]}_converted.png`;
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
    return (
      <ImageUploader 
        onUpload={handleUpload} 
        maxFiles={1} 
        accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }} 
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Conversion Area */}
      <div className="flex flex-col items-center p-6 bg-card border rounded-xl shadow-sm gap-8">
        
        <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl justify-center">
          
          {/* Original */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <h3 className="font-semibold text-muted-foreground uppercase text-sm tracking-wider">Original JPG</h3>
            <div className="bg-muted/30 p-2 rounded-lg border flex items-center justify-center w-full h-[250px] relative">
              {previewUrl && (
                <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
              )}
              <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur text-xs px-2 py-1 rounded shadow-sm">
                {(file.size / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>
          
          {/* Action */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            {!resultUrl ? (
              <button 
                onClick={convertImage}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-md hover:bg-primary/90 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isProcessing ? "Converting..." : "Convert"}
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <div className="bg-green-100 text-green-700 p-3 rounded-full shadow-sm">
                <ArrowRight className="h-6 w-6" />
              </div>
            )}
            
            <button 
              onClick={reset}
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Start over
            </button>
          </div>
          
          {/* Result */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <h3 className="font-semibold text-muted-foreground uppercase text-sm tracking-wider">Converted PNG</h3>
            <div className="bg-muted/30 p-2 rounded-lg border border-dashed flex items-center justify-center w-full h-[250px] relative">
              {resultUrl ? (
                <>
                  <img src={resultUrl} alt="Result" className="max-w-full max-h-full object-contain" />
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur text-xs px-2 py-1 rounded shadow-sm">
                    {(resultSize / 1024).toFixed(2)} KB
                  </div>
                </>
              ) : (
                <span className="text-sm text-muted-foreground text-center px-4">
                  Click convert to generate PNG
                </span>
              )}
            </div>
          </div>
          
        </div>

        {/* Download Button */}
        {resultUrl && (
          <div className="pt-6 border-t w-full flex justify-center">
            <button 
              onClick={download}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-md font-bold hover:bg-green-700 shadow-md transition-colors"
            >
              <Download className="h-5 w-5" />
              Download PNG Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
