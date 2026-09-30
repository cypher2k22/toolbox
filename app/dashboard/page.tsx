import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logoutUser } from "@/app/actions/logout";
import { Blocks, LogOut, Clock, Star, Zap } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>
        
        <form action={logoutUser}>
          <button className="flex items-center px-5 py-2.5 bg-muted text-foreground hover:bg-muted/80 rounded-xl font-medium transition-colors border shadow-sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground">Tool History</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">View and download your recently processed files.</p>
          <div className="mt-auto pt-4 border-t">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Coming Soon</span>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground">Favorites</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Quickly access the tools you use most often.</p>
          <div className="mt-auto pt-4 border-t">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Coming Soon</span>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Zap className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">ToolBox Pro</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Higher file limits, batch processing, and priority processing.</p>
            <div className="mt-auto pt-4 border-t">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
        <div className="bg-primary/10 text-primary p-4 rounded-full mb-6">
          <Blocks className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Your Authentication is Set Up!</h2>
        <p className="text-muted-foreground max-w-lg mb-6">
          This is a placeholder dashboard. The authentication infrastructure is ready, and in future phases, this dashboard will be populated with real data, usage tracking, and settings.
        </p>
        <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
          Go to Tools
        </Link>
      </div>
    </div>
  );
}
