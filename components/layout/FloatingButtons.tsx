"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // Wait until mounted to show theme button to avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="p-3 bg-background border border-border text-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {currentTheme === "dark" ? (
          <Sun className="h-5 w-5 text-amber-500" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-500" />
        )}
      </button>

      {/* Back to Top Button */}
      <div 
        className={cn(
          "transition-all duration-300 transform origin-bottom",
          showScrollTop ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
      
    </div>
  );
}
