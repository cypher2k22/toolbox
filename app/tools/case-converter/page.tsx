import { CaseConverter } from "@/components/tools/CaseConverter";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter",
  description: "Convert text between uppercase, lowercase, title case, and more instantly in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/case-converter",
  },
};
export default function CaseConverterPage() {
  return (
    <>
      <ToolLayout
      title="Case Converter"
      description="Convert text between uppercase, lowercase, title case, and more instantly in your browser."
      category="Text Tools"
      categoryUrl="/#text-tools"
    >
      <CaseConverter />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Use the Case Converter</h2>
        <p>Paste your text and instantly change its capitalization. Perfect for standardizing titles, fixing caps lock mistakes, and formatting strings.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Multiple Formats:</strong> Switch to UPPERCASE, lowercase, Title Case, and more.</li>
          <li><strong>Instant Processing:</strong> Watch your text change format as soon as you select an option.</li>
          <li><strong>Secure & Fast:</strong> All formatting happens locally in your web browser.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>What is Title Case?</strong> Title Case capitalizes the first letter of major words while keeping minor words (like &quot;and&quot; or &quot;the&quot;) lowercase, ideal for headlines and titles.</p>
      </div>
      </div>
    </section>
    </>
  );
}
