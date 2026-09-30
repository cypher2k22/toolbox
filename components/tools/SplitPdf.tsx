"use client";
import { PDFDocument } from "pdf-lib";

import { useState } from "react";
import { PdfUploader } from "./PdfUploader";
import { Download, RefreshCw, FileText } from "lucide-react";

export function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [ranges, setRanges] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleUpload = async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const f = newFiles[0];
      setFile(f);
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
        setResultUrl(null);
      }
      
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setPageCount(pdf.getPageCount());
      } catch (e) {
        console.error(e);
        alert("Failed to read PDF. Ensure it's valid and not password protected.");
        setFile(null);
      }
    }
  };

  const parseRanges = (rangeStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(",").map(p => p.trim());
    
    for (const part of parts) {
      if (!part) continue;
      
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-");
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= maxPages) pages.add(i - 1); // 0-indexed
          }
        }
      } else {
        const page = parseInt(part);
        if (!isNaN(page) && page >= 1 && page <= maxPages) {
          pages.add(page - 1);
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  const extractPages = async () => {
    if (!file) return;
    
    const pagesToExtract = parseRanges(ranges, pageCount);
    
    if (pagesToExtract.length === 0) {
      alert(`Please enter a valid page range between 1 and ${pageCount}.`);
      return;
    }
    
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newPdfFile = await newPdf.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([newPdfFile as any], { type: "application/pdf" });
      
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));

    } catch (err) {
      console.error("Error splitting PDF:", err);
      alert("Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${file.name.replace('.pdf', '')}_extracted.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setRanges("");
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
  };

  if (!file) {
    return <PdfUploader onUpload={handleUpload} maxFiles={1} />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* Main Settings */}
      <div className="flex-1 bg-card border rounded-2xl shadow-sm p-6 md:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-8 bg-muted/30 p-4 rounded-xl border">
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{file.name}</h3>
            <p className="text-muted-foreground text-sm">
              {(file.size / (1024 * 1024)).toFixed(2)} MB • {pageCount} pages
            </p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block font-bold text-lg mb-2">Pages to Extract</label>
          <p className="text-sm text-muted-foreground mb-4">
            Enter page numbers and/or ranges separated by commas. For example: <code>1-3, 5, 8-10</code>
          </p>
          <input 
            type="text" 
            value={ranges}
            onChange={(e) => setRanges(e.target.value)}
            placeholder={`e.g., 1-${Math.min(3, pageCount)}`}
            className="w-full border-2 border-muted focus:border-primary rounded-xl px-4 py-3 text-lg bg-background outline-none transition-colors"
          />
        </div>

        <div className="flex gap-4">
          <button 
            onClick={extractPages}
            disabled={isProcessing || !ranges.trim()}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isProcessing ? "Processing..." : "Extract Pages"}
          </button>
          
          <button 
            onClick={reset}
            className="px-6 py-3 border bg-background hover:bg-muted rounded-xl font-medium transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Result Area */}
      {resultUrl && (
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center shadow-sm h-full flex flex-col justify-center">
            <div className="w-20 h-20 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="h-10 w-10" />
            </div>
            <h4 className="font-bold text-green-700 dark:text-green-500 mb-2 text-xl">Success!</h4>
            <p className="text-sm text-green-600/80 mb-8">Your extracted PDF is ready.</p>
            <button 
              onClick={downloadPDF}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
            >
              <Download className="h-5 w-5" />
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
