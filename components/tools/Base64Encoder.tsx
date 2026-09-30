"use client";

import { useState } from "react";
import { Copy, Trash2, ArrowDownUp } from "lucide-react";

export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Modern robust base64 encoding with proper UTF-8 handling
  const encodeBase64 = (str: string): string => {
    try {
      const bytes = new TextEncoder().encode(str);
      const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
      return btoa(binString);
    } catch {
      throw new Error("Failed to encode input");
    }
  };

  const decodeBase64 = (b64: string): string => {
    try {
      const binString = atob(b64);
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
      return new TextDecoder().decode(bytes);
    } catch {
      throw new Error("Invalid Base64 string");
    }
  };

  const processInput = (text: string, currentMode: "encode" | "decode") => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (currentMode === "encode") {
        setOutput(encodeBase64(text));
      } else {
        setOutput(decodeBase64(text));
      }
      setError(null);
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleModeToggle = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    
    // Swap input and output, and reprocess if output exists and is valid
    if (!error && output) {
      processInput(output, newMode);
    } else {
      processInput(input, newMode);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-card border rounded-xl shadow-sm">
        <div className="flex bg-muted p-1 rounded-md">
          <button 
            onClick={() => { setMode("encode"); processInput(input, "encode"); }}
            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-all ${mode === "encode" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Encode to Base64
          </button>
          <button 
            onClick={() => { setMode("decode"); processInput(input, "decode"); }}
            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-all ${mode === "decode" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Decode from Base64
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Area */}
        <div className="flex flex-col border rounded-xl bg-card shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
            <span className="font-medium text-sm text-muted-foreground">
              {mode === "encode" ? "Text Input" : "Base64 Input"}
            </span>
            <button 
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-destructive/10 text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => processInput(e.target.value, mode)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="w-full min-h-[300px] p-4 resize-y outline-none bg-transparent font-mono text-sm leading-relaxed focus:bg-accent/5 transition-colors"
            spellCheck="false"
          />
        </div>

        {/* Output Area */}
        <div className="flex flex-col border rounded-xl bg-card shadow-sm overflow-hidden relative">
          
          {/* Swap Button (mobile hidden, desktop center overlapping) */}
          <button
            onClick={handleModeToggle}
            className="hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 z-10 w-12 h-12 bg-primary text-primary-foreground rounded-full items-center justify-center shadow-lg hover:scale-105 transition-transform"
            title="Swap and toggle mode"
          >
            <ArrowDownUp className="h-5 w-5 rotate-90" />
          </button>

          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
            <span className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              {mode === "encode" ? "Base64 Output" : "Text Output"}
              {error && <span className="text-destructive text-xs bg-destructive/10 px-2 py-0.5 rounded-full">{error}</span>}
            </span>
            <button 
              onClick={handleCopy}
              disabled={!output}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={error ? "" : "Result will appear here..."}
            className={`w-full min-h-[300px] p-4 resize-y outline-none bg-accent/5 font-mono text-sm leading-relaxed ${error ? 'text-destructive' : ''}`}
            spellCheck="false"
          />
        </div>
      </div>
      
      {/* Mobile Swap Button */}
      <div className="flex justify-center md:hidden">
        <button
            onClick={handleModeToggle}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors"
          >
            <ArrowDownUp className="h-4 w-4" />
            Swap Input / Output
        </button>
      </div>

    </div>
  );
}
