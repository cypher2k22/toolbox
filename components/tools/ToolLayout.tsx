"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  categoryUrl?: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, category, categoryUrl, children }: ToolLayoutProps) {
  return (
    <div className="flex-1 bg-gradient-to-b from-background to-muted/20 pb-20 relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 py-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-muted-foreground mb-10 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5 bg-background border px-3 py-1.5 rounded-full shadow-sm">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50 shrink-0" />
            {categoryUrl ? (
              <Link href={categoryUrl} className="hover:text-primary transition-colors bg-background border px-3 py-1.5 rounded-full shadow-sm">
                {category}
              </Link>
            ) : (
              <span className="bg-background border px-3 py-1.5 rounded-full shadow-sm">{category}</span>
            )}
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50 shrink-0" />
            <span className="text-primary bg-primary/10 px-3 py-1.5 rounded-full shadow-sm">{title}</span>
          </nav>

          {/* Header */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">{title}</h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Tool Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="bg-background border rounded-2xl shadow-xl shadow-black/5 overflow-hidden">
            <div className="p-4 md:p-8">
              {children}
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
