import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description: "Format, validate, and minify your JSON data securely in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/json-formatter",
  },
};
export default function JsonFormatterPage() {
  return (
    <>
      <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, validate, and minify your JSON data securely in your browser."
      category="Developer Tools"
      categoryUrl="/#developer-tools"
    >
      <JsonFormatter />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Format and Validate JSON</h2>
        <p>Paste your raw, unformatted JSON to automatically prettify it for readability. The tool also acts as a validator, pointing out syntax errors to help you debug.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Formatting & Minification:</strong> Make JSON readable or compress it to save space.</li>
          <li><strong>Error Detection:</strong> Instantly spot syntax issues like missing commas or quotes.</li>
          <li><strong>Local Execution:</strong> Your data schemas and payloads stay on your machine.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Why should I minify JSON?</strong> Minifying removes unnecessary whitespace, reducing the payload size for faster transmission over networks.</p>
      </div>
      </div>
    </section>
    </>
  );
}
