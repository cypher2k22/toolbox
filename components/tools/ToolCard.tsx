"use client";

import Link from "next/link";
import { Tool } from "@/lib/tools";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const Icon = tool.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full min-w-0"
    >
      <Link 
        href={tool.href}
        className={cn(
          "group relative flex flex-col items-start p-6 h-full bg-card border rounded-2xl transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 overflow-hidden min-w-0"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/[0.03] group-hover:to-primary/[0.08] transition-colors" />
        
        <div className="flex items-start justify-between w-full mb-6 z-10">
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md transition-all duration-300">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex gap-2">
            {tool.isNew && (
              <span className="text-[10px] font-bold uppercase bg-gradient-to-r from-blue-500 to-primary text-white px-2.5 py-1 rounded-full shadow-sm">
                New
              </span>
            )}
            {tool.comingSoon && (
              <span className="text-[10px] font-bold uppercase bg-muted text-muted-foreground border px-2.5 py-1 rounded-full">
                Soon
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors z-10 flex items-center justify-between w-full min-w-0 gap-2">
          <span className="min-w-0 break-words">{tool.name}</span>
          <ArrowRight className="h-4 w-4 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 z-10 relative">
          {tool.description}
        </p>
      </Link>
    </motion.div>
  );
}
