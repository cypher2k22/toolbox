"use client";

import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";

export function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Derived state
  const characters = text.length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(w => w.length > 0).length;

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

  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
  };

  const toTitleCase = () => {
    setText(
      text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
    );
  };

  const toCapitalizeEachWord = () => {
    setText(text.replace(/\b\w/g, c => c.toUpperCase()));
  };

  const toToggleCase = () => {
    setText(
      text.split('').map(c => 
        c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
      ).join('')
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setText(text.toUpperCase())} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">UPPERCASE</button>
        <button onClick={() => setText(text.toLowerCase())} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">lowercase</button>
        <button onClick={toTitleCase} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Title Case</button>
        <button onClick={toSentenceCase} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Sentence case</button>
        <button onClick={toCapitalizeEachWord} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Capitalize Each Word</button>
        <button onClick={toToggleCase} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">tOGGLE cASE</button>
      </div>

      {/* Editor Area */}
      <div className="flex flex-col border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
          <div className="flex gap-4 text-sm text-muted-foreground font-medium">
            <span>{characters} Characters</span>
            <span>{words} Words</span>
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
          placeholder="Type or paste your text here..."
          className="w-full min-h-[400px] p-6 resize-y outline-none bg-transparent text-lg leading-relaxed focus:bg-accent/5 transition-colors"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
