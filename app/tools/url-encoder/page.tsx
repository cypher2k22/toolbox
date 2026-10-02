import { UrlEncoder } from "@/components/tools/UrlEncoder";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder",
  description: "Safely encode or decode strings to be used in URLs and URIs.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/url-encoder",
  },
};
export default function UrlEncoderPage() {
  return (
    <>
      <ToolLayout
      title="URL Encoder & Decoder"
      description="Safely encode or decode strings to be used in URLs and URIs."
      category="Developer Tools"
      categoryUrl="/#developer-tools"
    >
      <UrlEncoder />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Encode and Decode URLs</h2>
        <p>Transform standard text into a URL-safe format by replacing special characters with percent-encoded equivalents, or decode an already encoded URL back to readable text.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Standard Compliance:</strong> Follows standard URI encoding rules.</li>
          <li><strong>Query String Safe:</strong> Safely prepare data for URL parameters.</li>
          <li><strong>Browser Processing:</strong> Zero server communication required for complete privacy.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Why do URLs need encoding?</strong> URLs can only be sent over the Internet using the ASCII character-set. Encoding converts unsafe characters (like spaces) into valid formats (like %20).</p>
      </div>
      </div>
    </section>
    </>
  );
}
