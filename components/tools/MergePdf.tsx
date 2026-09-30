"use client";
import { PDFDocument } from "pdf-lib";

import { useState } from "react";
import { PdfUploader } from "./PdfUploader";
import { Download, RefreshCw, Trash2, ArrowUp, ArrowDown, FileText, Plus } from "lucide-react";

interface PdfFile {
  id: string;
  file: File;
}

export function MergePdf() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleUpload = (newFiles: File[]) => {
    const mapped = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
    }));
    setFiles(prev => [...prev, ...mapped]);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
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

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Please upload at least 2 PDF files to merge.");
      return;
    }
    
    setIsProcessing(true);

    try {
      
      const mergedPdf = await PDFDocument.create();

      for (const pdfObj of files) {
        const arrayBuffer = await pdfObj.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([mergedPdfFile as any], { type: "application/pdf" });
      
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));

    } catch (err) {
      console.error("Error merging PDFs:", err);
      alert("Failed to merge PDFs. Ensure they are valid and not password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "merged.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setFiles([]);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
  };

  if (files.length === 0) {
    return <PdfUploader onUpload={handleUpload} maxFiles={50} />;
  }

  return (
    <div className="flex flex-col gap-8">
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Main List Area */}
        <div className="flex-1 bg-card border rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Files to Merge</h3>
              <p className="text-sm text-muted-foreground mt-1">{files.length} {files.length === 1 ? 'file' : 'files'} selected</p>
            </div>
            
            <label className="cursor-pointer text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
              <input 
                type="file" 
                multiple 
                accept="application/pdf" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files) {
                    handleUpload(Array.from(e.target.files));
                  }
                }} 
              />
              <Plus className="h-4 w-4" />
              Add More
            </label>
          </div>

          <div className="space-y-3">
            {files.map((fileObj, index) => (
              <div key={fileObj.id} className="flex items-center gap-4 bg-muted/30 border border-transparent hover:border-border p-3 rounded-xl group transition-all">
                <div className="bg-background border rounded-lg p-3 shrink-0 text-muted-foreground shadow-sm group-hover:text-primary transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{fileObj.file.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{(fileObj.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>

                <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => moveUp(index)} 
                    disabled={index === 0} 
                    className="p-1.5 hover:bg-background rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors shadow-sm"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => moveDown(index)} 
                    disabled={index === files.length - 1} 
                    className="p-1.5 hover:bg-background rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors shadow-sm"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => removeFile(index)} 
                    className="p-1.5 hover:bg-destructive/10 rounded-md text-destructive ml-2 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          <div className="bg-card border rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4">Merge Documents</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Arrange your files in the order you want them to appear in the final document.
            </p>
            
            <button 
              onClick={mergePdfs}
              disabled={isProcessing || files.length < 2}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:shadow-none mb-3"
            >
              {isProcessing ? "Merging..." : "Merge PDFs"}
            </button>
            
            <button 
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border bg-background text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl font-medium transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Start Over
            </button>
          </div>

          {resultUrl && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Download className="h-24 w-24" />
              </div>
              <h4 className="font-bold text-green-700 dark:text-green-500 mb-2 relative z-10 text-lg">Merge Complete!</h4>
              <p className="text-sm text-green-600/80 mb-6 relative z-10">Your merged document is ready.</p>
              <button 
                onClick={downloadPDF}
                className="w-full relative z-10 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
