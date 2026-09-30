"use client";

import { useState, useActionState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginUser, loginWithGoogle } from "@/app/actions/login";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  return (
    <div className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500" />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Log in to your ToolBox account.</p>
      </div>

      {registered && (
        <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg text-sm text-center font-medium">
          Account created successfully. Please log in.
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {state?.error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
            {state.error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input 
            id="email"
            name="email" 
            type="email" 
            required
            className="w-full px-4 py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
          </div>
          <div className="relative">
            <input 
              id="password"
              name="password" 
              type={showPassword ? "text" : "password"} 
              required
              className="w-full px-4 py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-12"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value="/dashboard" />

        <button 
          type="submit" 
          disabled={isPending || isGoogleLoading}
          className="w-full py-3.5 mt-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:shadow-none flex items-center justify-center"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Logging in...
            </>
          ) : "Log In"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-2">
        <div className="h-px bg-border flex-1" />
        <span className="text-xs text-muted-foreground uppercase font-medium">Or continue with</span>
        <div className="h-px bg-border flex-1" />
      </div>

      <button 
        onClick={async () => {
          setIsGoogleLoading(true);
          await loginWithGoogle();
        }}
        disabled={isPending || isGoogleLoading}
        className="w-full py-3.5 mt-6 border bg-background text-foreground font-medium rounded-xl hover:bg-muted transition-all disabled:opacity-70 flex items-center justify-center"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </>
        )}
      </button>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Suspense fallback={<div className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8 h-96 animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
