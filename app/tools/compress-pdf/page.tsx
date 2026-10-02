import { CompressPdf } from "@/components/tools/CompressPdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF Online",
  description: "Optimize and reduce the size of your PDF files locally in your browser for easier sharing.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/compress-pdf",
  },
};
export default function CompressPdfPage() {
  return (
    <>
      <ToolLayout
      title="Compress PDF Online"
      description="Optimize and reduce the size of your PDF files locally in your browser for easier sharing."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <CompressPdf />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Compress PDFs</h2>
        <p>Upload your large PDF files to optimize their size for email attachments and faster sharing. The compression balances quality and file size reduction.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Efficient Compression:</strong> significantly reduce file sizes.</li>
          <li><strong>Client-Side Processing:</strong> Your files remain on your device for complete privacy.</li>
          <li><strong>Preserve Readability:</strong> text and essential images remain clear.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Is this safe for sensitive documents?</strong> Yes, all compression happens in your browser, so your files are never exposed to external servers.</p>
      </div>
      </div>
    </section>
    </>
  );
}
