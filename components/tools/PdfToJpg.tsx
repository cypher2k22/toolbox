"use client";
import * as pdfjsLib from "pdfjs-dist";

import { useState, useEffect } from "react";
import { PdfUploader } from "./PdfUploader";
import { Download, RefreshCw, Layers } from "lucide-react";


interface ConvertedPage {
  pageNumber: number;
  url: string;
}

export function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{current: number, total: number} | null>(null);
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);

  useEffect(() => {
    return () => {
      // Cleanup object URLs on unmount
      convertedPages.forEach(page => URL.revokeObjectURL(page.url));
    };
  }, [convertedPages]);

  const handleUpload = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      convertedPages.forEach(page => URL.revokeObjectURL(page.url));
      setConvertedPages([]);
      setProgress(null);
    }
  };

  const convertToJpg = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setConvertedPages([]);

    try {
      
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      
      setProgress({ current: 0, total: totalPages });
      
      const newPages: ConvertedPage[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Scale up for better quality

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) throw new Error("Failed to get canvas context");
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          canvasFactory: undefined,
          background: 'rgba(0,0,0,0)'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;

        await page.render(renderContext).promise;
        
        // Convert to JPG
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, "image/jpeg", 0.9);
        });

        if (blob) {
          const url = URL.createObjectURL(blob);
          newPages.push({ pageNumber: i, url });
        }
        
        setProgress({ current: i, total: totalPages });
      }

      setConvertedPages(newPages);

    } catch (err) {
      console.error("Error converting PDF to JPG:", err);
      alert("Failed to convert PDF. It may be password protected or unsupported.");
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const downloadImage = (url: string, pageNum: number) => {
    if (!file) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace('.pdf', '')}_page_${pageNum}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null);
    convertedPages.forEach(page => URL.revokeObjectURL(page.url));
    setConvertedPages([]);
    setProgress(null);
  };

  if (!file) {
    return <PdfUploader onUpload={handleUpload} maxFiles={1} />;
  }

  return (
    <div className="flex flex-col gap-8">
      
      {/* Settings Area */}
      <div className="bg-card border rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 justify-between items-center">
        <div className="flex items-center gap-4 flex-1 w-full">
          <div className="bg-primary/10 text-primary p-4 rounded-xl shrink-0">
            <Layers className="h-8 w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg truncate">{file.name}</h3>
            <p className="text-muted-foreground text-sm">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
          {!convertedPages.length && (
            <button 
              onClick={convertToJpg}
              disabled={isProcessing}
              className="px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center min-w-[200px]"
            >
              {isProcessing && progress ? `Converting (${progress.current}/${progress.total})...` : "Convert to JPG"}
            </button>
          )}
          
          <button 
            onClick={reset}
            className="px-6 py-3.5 border bg-background hover:bg-muted rounded-xl font-medium transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-5 w-5 mr-2 sm:mr-0" />
            <span className="sm:hidden">Start Over</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {isProcessing && progress && (
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Processing pages...</span>
            <span className="text-primary">{Math.round((progress.current / progress.total) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results Area */}
      {convertedPages.length > 0 && (
        <div className="bg-card border rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Converted Images</h3>
              <p className="text-sm text-muted-foreground mt-1">Generated {convertedPages.length} high-quality JPGs.</p>
            </div>
            {/* Optional: Add a Zip download button here in the future */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {convertedPages.map((page) => (
              <div key={page.pageNumber} className="group relative bg-muted/20 border rounded-xl overflow-hidden aspect-[3/4] flex flex-col">
                <div className="flex-1 p-2 flex items-center justify-center">
                  <img src={page.url} alt={`Page ${page.pageNumber}`} className="max-w-full max-h-full object-contain shadow-sm" />
                </div>
                <div className="bg-background border-t p-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Page {page.pageNumber}</span>
                  <button 
                    onClick={() => downloadImage(page.url, page.pageNumber)}
                    className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    title="Download this page"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
