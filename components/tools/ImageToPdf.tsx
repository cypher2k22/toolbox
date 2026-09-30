"use client";
import jsPDF from "jspdf";

import { useState, useEffect } from "react";
import { ImageUploader } from "./ImageUploader";
import { Download, RefreshCw, Trash2, ArrowUp, ArrowDown, Settings, FilePlus2 } from "lucide-react";

interface FilePreview {
  file: File;
  preview: string;
}

export function ImageToPdf() {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageSize, setPageSize] = useState<"a4" | "letter">("a4");
  const [orientation, setOrientation] = useState<"p" | "l">("p");
  const [margin, setMargin] = useState<number>(0);
  
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  useEffect(() => {
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.preview));
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [files, pdfUrl]);

  const handleUpload = (newFiles: File[]) => {
    const mapped = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...mapped]);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = temp;
    setFiles(newFiles);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + 1];
    newFiles[index + 1] = temp;
    setFiles(newFiles);
  };

  const generatePDF = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const doc = new jsPDF({
        orientation,
        unit: "mm",
        format: pageSize,
      });

      // Dimensions in mm
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      const usableWidth = pageWidth - (margin * 2);
      const usableHeight = pageHeight - (margin * 2);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (i > 0) {
          doc.addPage();
        }

        // Get image dimensions asynchronously
        const img = new Image();
        const loadImg = new Promise<{w: number, h: number}>((resolve, reject) => {
          img.onload = () => resolve({w: img.width, h: img.height});
          img.onerror = reject;
          img.src = file.preview;
        });

        const { w, h } = await loadImg;
        
        // Calculate aspect ratio fit
        const imgRatio = w / h;
        const pageRatio = usableWidth / usableHeight;
        
        let finalWidth = usableWidth;
        let finalHeight = usableHeight;
        let x = margin;
        let y = margin;

        if (imgRatio > pageRatio) {
          finalHeight = usableWidth / imgRatio;
          y = margin + (usableHeight - finalHeight) / 2;
        } else {
          finalWidth = usableHeight * imgRatio;
          x = margin + (usableWidth - finalWidth) / 2;
        }

        // Note: assumes image format is supported by jsPDF (JPEG, PNG). We can use alias format strings.
        const format = file.file.type === "image/png" ? "PNG" : "JPEG";
        
        doc.addImage(img, format, x, y, finalWidth, finalHeight);
      }

      const blob = doc.output("blob");
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(URL.createObjectURL(blob));

    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("An error occurred while generating the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "images.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  if (files.length === 0) {
    return <ImageUploader onUpload={handleUpload} maxFiles={20} />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 flex flex-col gap-6 shrink-0">
        <div className="bg-card border rounded-xl shadow-sm p-5 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">PDF Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Page Size</label>
              <select 
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as "a4" | "letter")}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                disabled={isProcessing}
              >
                <option value="a4">A4 (210 × 297 mm)</option>
                <option value="letter">US Letter (8.5 × 11 in)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Orientation</label>
              <select 
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as "p" | "l")}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                disabled={isProcessing}
              >
                <option value="p">Portrait (Vertical)</option>
                <option value="l">Landscape (Horizontal)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Margin (mm)</label>
              <select 
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                disabled={isProcessing}
              >
                <option value={0}>No Margin</option>
                <option value={10}>Small (10mm)</option>
                <option value={20}>Large (20mm)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t space-y-3">
            <button 
              onClick={generatePDF}
              disabled={isProcessing}
              className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isProcessing ? "Generating PDF..." : "Generate PDF"}
            </button>
            
            <button 
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border bg-background text-muted-foreground hover:text-foreground hover:bg-muted rounded-md text-sm font-medium transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Start Over
            </button>
          </div>
        </div>

        {/* Download Block */}
        {pdfUrl && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 text-center shadow-sm">
            <h4 className="font-bold text-green-700 dark:text-green-500 mb-3">Ready to Download</h4>
            <button 
              onClick={downloadPDF}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md font-bold hover:bg-green-700 shadow-md transition-colors"
            >
              <Download className="h-5 w-5" />
              Download PDF
            </button>
          </div>
        )}
      </div>

      {/* Main Area: Files list */}
      <div className="flex-1 bg-card border rounded-xl shadow-sm p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Images ({files.length})</h3>
          
          <label className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors">
            <input 
              type="file" 
              multiple 
              accept="image/jpeg, image/png, image/webp" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files) {
                  handleUpload(Array.from(e.target.files));
                }
              }} 
            />
            <FilePlus2 className="h-4 w-4" />
            Add more
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((fileObj, index) => (
            <div key={fileObj.preview} className="relative group bg-muted/30 border rounded-lg overflow-hidden aspect-[3/4] flex flex-col">
              
              <div className="flex-1 p-2 flex items-center justify-center">
                <img src={fileObj.preview} alt={`Page ${index + 1}`} className="max-w-full max-h-full object-contain shadow-sm" />
              </div>
              
              <div className="bg-background border-t p-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => moveDown(index)} disabled={index === files.length - 1} className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => removeFile(index)} className="p-1 hover:bg-destructive/10 rounded text-destructive ml-1">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
