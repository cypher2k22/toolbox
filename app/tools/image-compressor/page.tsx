import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor",
  description: "Reduce image file sizes instantly. Process images locally in your browser for maximum privacy.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/image-compressor",
  },
};
export default function ImageCompressorPage() {
  return (
    <>
      <ToolLayout
      title="Image Compressor"
      description="Reduce image file sizes instantly. Process images locally in your browser for maximum privacy."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <ImageCompressor />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Compress Images</h2>
        <p>Upload your photos to reduce their file size while maintaining visual quality. This tool helps optimize images for web usage and faster loading times.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Smart Compression:</strong> Balance between image quality and file size reduction.</li>
          <li><strong>Secure & Private:</strong> Images are processed directly in your browser.</li>
          <li><strong>Supported Formats:</strong> Works with standard web image formats.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Will I lose image quality?</strong> The tool uses optimized compression algorithms to minimize noticeable quality loss while drastically reducing file size.</p>
      </div>
      </div>
    </section>
    </>
  );
}
