import { WordCounter } from "@/components/tools/WordCounter";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter",
  description: "Count words, characters, sentences, and paragraphs in real-time instantly.",
  alternates: {
    canonical: "https://toolbox-utilities.com/tools/word-counter",
  },
};
export default function WordCounterPage() {
  return (
    <div className="flex-1 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/#text-tools" className="hover:text-foreground transition-colors">
            Text Tools
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">Word Counter</span>
        </nav>

        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Word Counter</h1>
          <p className="text-muted-foreground text-lg">
            Instantly count words, characters, sentences, and paragraphs. Paste your text below to see real-time statistics.
          </p>
        </div>

        {/* Tool */}
        <WordCounter />

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-20 prose dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4">How to use the Word Counter</h2>
          <p>
            Simply start typing or paste your document into the large text area above. 
            The statistics will update automatically in real-time. You don&apos;t need to press any submit buttons.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Why use this tool?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Writers & Authors:</strong> Ensure your chapters or articles meet specific word count requirements.</li>
            <li><strong>Students:</strong> Check if your essay meets the minimum or maximum length restrictions.</li>
            <li><strong>Social Media:</strong> Monitor character counts for platforms like Twitter/X or Instagram captions.</li>
            <li><strong>SEO Professionals:</strong> Check title and meta description lengths for search optimization.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">Privacy first</h3>
          <p>
            Your text is never sent to our servers. All calculations happen entirely within your browser, 
            meaning your documents remain completely private and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
