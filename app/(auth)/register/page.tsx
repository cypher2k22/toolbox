"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (state?.success) {
      router.push("/login?registered=true");
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    formAction(formData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500" />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join ToolBox to save your history and favorites.</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
              {state.error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Name</label>
            <input 
              id="name"
              name="name" 
              type="text" 
              required
              className="w-full px-4 py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="John Doe"
            />
            {state?.details?.name && (
              <p className="text-red-500 text-xs mt-1">{state.details.name[0]}</p>
            )}
          </div>

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
            {state?.details?.email && (
              <p className="text-red-500 text-xs mt-1">{state.details.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <div className="relative">
              <input 
                id="password"
                name="password" 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {state?.details?.password && (
              <p className="text-red-500 text-xs mt-1">{state.details.password[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input 
                id="confirmPassword"
                type={showPassword ? "text" : "password"} 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-12"
                placeholder="••••••••"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-3.5 mt-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:shadow-none flex items-center justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating account...
              </>
            ) : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
