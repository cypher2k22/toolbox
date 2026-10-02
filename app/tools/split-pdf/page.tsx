import { SplitPdf } from "@/components/tools/SplitPdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF Online",
  description: "Extract pages from your PDF or split it into multiple smaller documents securely in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/split-pdf",
  },
};
export default function SplitPdfPage() {
  return (
    <>
      <ToolLayout
      title="Split PDF Online"
      description="Extract pages from your PDF or split it into multiple smaller documents securely in your browser."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <SplitPdf />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Split a PDF</h2>
        <p>Upload your PDF file and select the specific pages or ranges you want to extract into a new document. Your files are processed securely and locally.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Local Processing:</strong> Complete privacy as files are processed on your device.</li>
          <li><strong>Range Selection:</strong> Easily choose the exact pages you need.</li>
          <li><strong>High Quality:</strong> Retains original document quality.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Can I extract multiple non-consecutive pages?</strong> Yes, you can specify custom page ranges to extract exactly what you need.</p>
      </div>
      </div>
    </section>
    </>
  );
}
