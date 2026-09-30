"use client";

import Link from "next/link";
import { Menu, Blocks, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { HeaderAuth } from "./HeaderAuth";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#pdf-tools", label: "PDF Tools" },
    { href: "/#image-tools", label: "Image Tools" },
    { href: "/#text-tools", label: "Text Tools" },
    { href: "/#developer-tools", label: "Developer Tools" },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm" 
          : "bg-background border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 md:gap-2.5 mr-4 md:mr-8 group shrink-0">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-sm">
            <Blocks className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            ToolBox
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {navLinks.map((link) => {

            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "px-3 py-2 rounded-md transition-colors relative text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <HeaderAuth />
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-3 shadow-lg absolute w-full">
          <HeaderAuth isMobile onClick={() => setMobileMenuOpen(false)} />
          {navLinks.map((link) => {

            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
