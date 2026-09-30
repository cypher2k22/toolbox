"use client";

import { useState } from "react";
import { Copy, Trash2, Settings2 } from "lucide-react";

export function RemoveDuplicates() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true);
  
  const originalLines = text === "" ? 0 : text.split('\n').length;
  
  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const removeDuplicates = () => {
    const lines = text.split('\n');
    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      let processLine = line;
      
      if (ignoreWhitespace) {
        processLine = processLine.trim();
      }
      if (ignoreCase) {
        processLine = processLine.toLowerCase();
      }

      if (!seen.has(processLine)) {
        seen.add(processLine);
        result.push(line); // Preserve original line
      }
    }
    
    setText(result.join('\n'));
  };

  const resultLines = text === "" ? 0 : text.split('\n').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card border rounded-xl shadow-sm">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Options:</span>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="rounded border-input text-primary focus:ring-primary"
            />
            Ignore leading/trailing whitespace
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="rounded border-input text-primary focus:ring-primary"
            />
            Ignore case
          </label>
        </div>
        
        <button 
          onClick={removeDuplicates} 
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Remove Duplicates
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex flex-col border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
          <div className="flex gap-4 text-sm text-muted-foreground font-medium">
            <span>Original lines: {originalLines}</span>
            <span>Current lines: {resultLines}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-muted transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button 
              onClick={() => setText("")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-destructive/10 text-destructive transition-colors"
              title="Clear text"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here (one item per line)..."
          className="w-full min-h-[400px] p-6 resize-y outline-none bg-transparent text-lg leading-relaxed focus:bg-accent/5 transition-colors whitespace-pre"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
