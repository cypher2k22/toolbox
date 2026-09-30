"use client";

import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { Search, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools;
    const q = searchQuery.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const pdfTools = filteredTools.filter(t => t.category === "PDF");
  const imageTools = filteredTools.filter(t => t.category === "Image");
  const textTools = filteredTools.filter(t => t.category === "Text");
  const devTools = filteredTools.filter(t => t.category === "Developer");

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32 lg:py-40">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-[500px] overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>Premium utilities for everyone</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/60 leading-tight">
              All the tools you need.<br className="hidden sm:block" /> In one place.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              ToolBox provides simple, fast, and free online utilities for PDFs, images, text, and developers. Everything processes safely in your browser.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto relative mb-12 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-background rounded-full border shadow-lg ring-1 ring-black/5">
              <Search className="absolute left-4 md:left-6 h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to do? (e.g., 'compress pdf', 'word count')" 
                aria-label="Search tools"
                className="w-full h-14 md:h-16 pl-12 md:pl-16 pr-12 md:pr-6 rounded-full bg-transparent text-base md:text-lg focus:outline-none placeholder:text-muted-foreground/70"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 md:right-6 text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Lightning Fast</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-green-500" /> Secure Processing</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-amber-500" /> Always Free</span>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 md:py-32 container mx-auto px-4 md:px-6">
        
        {searchQuery && filteredTools.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">No tools found</h3>
            <p className="text-muted-foreground">Try adjusting your search query.</p>
          </div>
        )}

        {textTools.length > 0 && (
          <div id="text-tools" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-gradient-to-b from-primary to-primary/60 w-1.5 h-8 rounded-full"></span>
              Text Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {textTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )}

        {pdfTools.length > 0 && (
          <div id="pdf-tools" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-gradient-to-b from-blue-500 to-blue-400 w-1.5 h-8 rounded-full"></span>
              PDF Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pdfTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )}

        {imageTools.length > 0 && (
          <div id="image-tools" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-gradient-to-b from-green-500 to-green-400 w-1.5 h-8 rounded-full"></span>
              Image Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imageTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )}

        {devTools.length > 0 && (
          <div id="developer-tools" className="mb-10">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-gradient-to-b from-purple-500 to-purple-400 w-1.5 h-8 rounded-full"></span>
              Developer Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {devTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Trust Banner */}
      <section className="bg-primary/5 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <div className="w-16 h-16 bg-background border rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Your files stay strictly private.</h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            We believe your data is yours. Most of our tools process files locally within your web browser. 
            Your files are never uploaded to our servers unless a tool technically requires server-side processing, 
            which we clearly communicate.
          </p>
        </div>
      </section>
    </div>
  );
}
