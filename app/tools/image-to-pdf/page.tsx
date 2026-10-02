import { ImageToPdf } from "@/components/tools/ImageToPdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF Converter",
  description: "Select multiple images and convert them into a single PDF document securely in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/image-to-pdf",
  },
};
export default function ImageToPdfPage() {
  return (
    <>
      <ToolLayout
      title="Image to PDF Converter"
      description="Select multiple images and convert them into a single PDF document securely in your browser."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <ImageToPdf />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Convert Images to PDF</h2>
        <p>Turn your photos, receipts, or scanned documents into a single, organized PDF file. Arrange the order of images before generating the document.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Multiple Images:</strong> Add several images to create a multi-page PDF.</li>
          <li><strong>Reordering:</strong> Easily organize the sequence of your images.</li>
          <li><strong>Privacy First:</strong> Your images are processed directly on your device.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Can I select the page size?</strong> Yes, you can choose how your images are fitted into standard PDF page sizes during the conversion process.</p>
      </div>
      </div>
    </section>
    </>
  );
}
