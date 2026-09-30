"use client";

import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";

export function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Derived state calculations
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  
  const wordsArray = text.trim().split(/\s+/).filter(w => w.length > 0);
  const words = text.trim() === "" ? 0 : wordsArray.length;
  
  const sentencesArray = text.split(/[.!?]+(?:[\s]+|$)/).filter(s => s.trim().length > 0);
  const sentences = text.trim() === "" ? 0 : sentencesArray.length;
  
  const paragraphsArray = text.split(/\n+/).filter(p => p.trim().length > 0);
  const paragraphs = text.trim() === "" ? 0 : paragraphsArray.length;
  
  const readingTime = Math.ceil(words / 238);

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

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatBox label="Words" value={words} />
        <StatBox label="Characters" value={characters} />
        <StatBox label="Without Spaces" value={charactersNoSpaces} />
        <StatBox label="Sentences" value={sentences} />
        <StatBox label="Paragraphs" value={paragraphs} />
        <StatBox label="Reading Time" value={`${readingTime} min`} />
      </div>

      {/* Editor Area */}
      <div className="flex flex-col border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
          <span className="font-medium text-sm text-muted-foreground">Type or paste your text below</span>
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
              onClick={handleClear}
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
          placeholder="Start typing or paste your text here..."
          className="w-full min-h-[400px] p-6 resize-y outline-none bg-transparent text-lg leading-relaxed focus:bg-accent/5 transition-colors"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-card border rounded-xl">
      <span className="text-3xl font-bold mb-1">{value}</span>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}
