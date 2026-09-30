"use client";

import { useState } from "react";
import { Copy, Trash2, CheckCircle2, XCircle } from "lucide-react";

export function JsonFormatter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);

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

  const validateAndParse = (input: string): unknown | null => {
    if (!input.trim()) {
      setError(null);
      return null;
    }
    
    try {
      const parsed = JSON.parse(input);
      setError(null);
      return parsed;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      return null;
    }
  };

  const handleFormat = () => {
    const parsed = validateAndParse(text);
    if (parsed !== null) {
      setText(JSON.stringify(parsed, null, indent));
    }
  };

  const handleMinify = () => {
    const parsed = validateAndParse(text);
    if (parsed !== null) {
      setText(JSON.stringify(parsed));
    }
  };

  const handleChange = (val: string) => {
    setText(val);
    if (val.trim()) {
      try {
        JSON.parse(val);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid JSON");
      }
    } else {
      setError(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card border rounded-xl shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <button 
            onClick={handleFormat} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Format / Pretty Print
          </button>
          <button 
            onClick={handleMinify} 
            className="px-4 py-2 border bg-background hover:bg-accent text-foreground rounded-md text-sm font-medium transition-colors"
          >
            Minify
          </button>
          
          <div className="h-6 w-px bg-border mx-2 hidden sm:block"></div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Indent:</span>
            <select 
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="border rounded-md px-2 py-1 text-sm bg-background"
            >
              <option value={2}>2 Spaces</option>
              <option value={3}>3 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center">
          {text.trim() === "" ? (
            <span className="text-sm text-muted-foreground">Waiting for input...</span>
          ) : error ? (
            <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
              <XCircle className="h-4 w-4" />
              Invalid JSON
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              Valid JSON
            </div>
          )}
        </div>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Editor Area */}
      <div className="flex flex-col border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-end px-4 py-3 border-b bg-muted/40 gap-2">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-muted transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button 
            onClick={() => { setText(""); setError(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-destructive/10 text-destructive transition-colors"
            title="Clear text"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder='{"key": "value"}'
          className="w-full min-h-[500px] p-6 resize-y outline-none bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm leading-relaxed transition-colors"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
