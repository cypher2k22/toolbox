import Link from "next/link";
import { Blocks } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 text-primary p-1.5 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Blocks className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">ToolBox</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium, fast, and free online utilities. Everything you need, processed safely in your browser.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Tools</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/#pdf-tools" className="hover:text-primary transition-colors">PDF Tools</Link></li>
              <li><Link href="/#image-tools" className="hover:text-primary transition-colors">Image Tools</Link></li>
              <li><Link href="/#text-tools" className="hover:text-primary transition-colors">Text Tools</Link></li>
              <li><Link href="/#developer-tools" className="hover:text-primary transition-colors">Developer Tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About ToolBox</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ToolBox. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
