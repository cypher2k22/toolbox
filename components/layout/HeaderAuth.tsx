"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function HeaderAuth({ isMobile, onClick }: { isMobile?: boolean, onClick?: () => void }) {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (status === "loading") {
    return <div className={cn("animate-pulse bg-muted rounded-md", isMobile ? "h-12 w-full mt-4" : "h-9 w-20 hidden md:block")}></div>;
  }

  if (session?.user) {
    if (isMobile) {
      return (
        <div className="border-t pt-3 mt-3">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <Link 
            href="/dashboard" 
            onClick={onClick}
            className="block px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground flex items-center"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
          <button 
            onClick={() => { onClick?.(); signOut({ callbackUrl: "/" }); }}
            className="w-full text-left flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="relative hidden md:block">
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4" />
            )}
          </div>
          <span className="text-sm font-medium">{session.user.name?.split(" ")[0] || "Account"}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-card border rounded-xl shadow-lg py-1 z-50 overflow-hidden">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
            </div>
            <Link 
              href="/dashboard" 
              className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
              onClick={() => setDropdownOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="border-t pt-3 mt-3 space-y-2">
        <Link 
          href="/login" 
          onClick={onClick}
          className="block px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Log In
        </Link>
        <Link 
          href="/register" 
          onClick={onClick}
          className="block px-4 py-3 rounded-lg text-base font-medium bg-primary text-primary-foreground text-center shadow-sm"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-3">
      <Link 
        href="/login" 
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted"
      >
        Log In
      </Link>
      <Link 
        href="/register" 
        className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
      >
        Sign Up
      </Link>
    </div>
  );
}
