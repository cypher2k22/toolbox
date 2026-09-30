"use client";
import { PDFDocument } from "pdf-lib";

import { useState } from "react";
import { PdfUploader } from "./PdfUploader";
import { Download, RefreshCw, FileText, Settings } from "lucide-react";

export function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const [compressionLevel, setCompressionLevel] = useState<"standard" | "high">("standard");

  const handleUpload = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
        setResultUrl(null);
      }
    }
  };

  const compressPdf = async () => {
    if (!file) return;
    
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      // Basic compression through re-serialization and object streams
      // pdf-lib's useObjectStreams: false actually compresses some things, 
      // but true is usually better for structure.
      
      if (compressionLevel === "high") {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('ToolBox');
        pdfDoc.setCreator('ToolBox');
      }

      // Re-save to strip unused objects
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);

    } catch (err) {
      console.error("Error compressing PDF:", err);
      alert("Failed to compress PDF. The file may be password protected or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${file.name.replace('.pdf', '')}_compressed.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
  };

  if (!file) {
    return <PdfUploader onUpload={handleUpload} maxFiles={1} />;
  }

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* Settings */}
      <div className="flex-1 bg-card border rounded-2xl shadow-sm p-6 md:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-8 bg-muted/30 p-4 rounded-xl border">
          <div className="bg-primary/10 text-primary p-3 rounded-lg shrink-0">
            <FileText className="h-8 w-8" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-lg truncate">{file.name}</h3>
            <p className="text-muted-foreground text-sm">
              Original size: {formatSize(file.size)}
            </p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <label className="block font-bold text-lg mb-2 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Compression Settings
          </label>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setCompressionLevel("standard")}
              className={`p-4 rounded-xl border-2 text-left transition-all ${compressionLevel === "standard" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"}`}
            >
              <h4 className="font-bold mb-1">Standard</h4>
              <p className="text-xs text-muted-foreground">Optimizes internal structure. Preserves metadata.</p>
            </button>
            <button 
              onClick={() => setCompressionLevel("high")}
              className={`p-4 rounded-xl border-2 text-left transition-all ${compressionLevel === "high" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"}`}
            >
              <h4 className="font-bold mb-1">Maximum</h4>
              <p className="text-xs text-muted-foreground">Strips metadata and optimizes structure for smallest size.</p>
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Note: Client-side compression focuses on structural optimization. Results vary depending on the original PDF&apos;s contents.
          </p>
        </div>

        <div className="flex gap-4 mt-auto">
          <button 
            onClick={compressPdf}
            disabled={isProcessing}
            className="flex-1 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isProcessing ? "Compressing..." : "Compress PDF"}
          </button>
          
          <button 
            onClick={reset}
            className="px-6 py-3.5 border bg-background hover:bg-muted rounded-xl font-medium transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Result Area */}
      {resultUrl && (
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center shadow-sm h-full flex flex-col justify-center">
            <h4 className="font-bold text-green-700 dark:text-green-500 mb-6 text-xl">Compression Complete!</h4>
            
            <div className="space-y-3 mb-8 text-left bg-background p-4 rounded-xl border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original:</span>
                <span className="font-medium">{formatSize(file.size)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Compressed:</span>
                <span className="font-bold text-green-600">{formatSize(resultSize)}</span>
              </div>
              <div className="pt-2 mt-2 border-t flex justify-between text-sm font-bold text-primary">
                <span>Saved:</span>
                <span>
                  {resultSize < file.size ? `${Math.round((1 - resultSize / file.size) * 100)}%` : '0%'}
                </span>
              </div>
            </div>

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
