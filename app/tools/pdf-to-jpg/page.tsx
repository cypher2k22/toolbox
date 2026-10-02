import { PdfToJpg } from "@/components/tools/PdfToJpg";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to JPG Converter",
  description: "Convert PDF document pages into high-quality JPG image files securely in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/pdf-to-jpg",
  },
};
export default function PdfToJpgPage() {
  return (
    <>
      <ToolLayout
      title="PDF to JPG Converter"
      description="Convert PDF document pages into high-quality JPG image files securely in your browser."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <PdfToJpg />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Convert PDF to JPG</h2>
        <p>Upload a PDF document to quickly generate high-quality JPG images for every page. Ideal for sharing or embedding document pages as images.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>High Resolution:</strong> Convert pages to crisp, clear images.</li>
          <li><strong>Privacy Focused:</strong> Your documents are never uploaded to the cloud.</li>
          <li><strong>Fast Conversion:</strong> Immediate processing utilizing your device.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Will this affect my original PDF?</strong> No, the tool reads your PDF and generates new JPG files without altering the original.</p>
      </div>
      </div>
    </section>
    </>
  );
}
