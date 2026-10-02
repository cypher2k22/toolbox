import { MergePdf } from "@/components/tools/MergePdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Online",
  description: "Combine multiple PDF files into a single document entirely in your browser. Fast, secure, and privacy-focused.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/merge-pdf",
  },
};
export default function MergePdfPage() {
  return (
    <>
      <ToolLayout
      title="Merge PDF Online"
      description="Combine multiple PDF files into a single document entirely in your browser. Fast, secure, and privacy-focused."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <MergePdf />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Merge PDFs</h2>
        <p>Select multiple PDF files, reorder them as needed, and click merge to create a single document. All processing is done securely within your browser.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Browser Processing:</strong> Your files never leave your device.</li>
          <li><strong>Drag and Drop:</strong> Easily reorder your documents before merging.</li>
          <li><strong>Instant Download:</strong> Get your merged PDF instantly.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Is it secure?</strong> Yes, because the processing happens locally in your browser, your sensitive PDFs are never uploaded to our servers.</p>
      </div>
      </div>
    </section>
    </>
  );
}
