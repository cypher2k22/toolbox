import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { JsonLd } from "@/components/layout/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://toolbox-pearl-omega.vercel.app"
  ),

  verification: {
    google: "8Mji-x9IK6h_dkKueaRN6hEQ5nlS34wdSzJ6rgUQTgg",
  },

  title: {
    default: "ToolBox - Free Online Utilities & Developer Tools",
    template: "%s | ToolBox",
  },

  description:
    "A premium collection of free online tools for PDFs, images, text, and developers. Process files securely in your browser without registration.",

  keywords: [
    "online tools",
    "free utilities",
    "pdf tools",
    "image compressor",
    "text tools",
    "developer tools",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    title: "ToolBox - Free Online Utilities",
    description:
      "A premium collection of free online tools. Process files securely in your browser.",
    siteName: "ToolBox",
  },

  twitter: {
    card: "summary_large_image",
    title: "ToolBox - Free Online Utilities",
    description:
      "A premium collection of free online tools. Process files securely in your browser.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <JsonLd />

        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <FloatingButtons />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}