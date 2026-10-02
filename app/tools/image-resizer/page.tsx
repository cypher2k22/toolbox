import { ImageResizer } from "@/components/tools/ImageResizer";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer",
  description: "Change image dimensions easily. Lock aspect ratio to prevent distortion. Fast and secure.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/image-resizer",
  },
};
export default function ImageResizerPage() {
  return (
    <>
      <ToolLayout
      title="Image Resizer"
      description="Change image dimensions easily. Lock aspect ratio to prevent distortion. Fast and secure."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <ImageResizer />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Resize Images</h2>
        <p>Quickly adjust the width and height of your images. Keep the aspect ratio locked to ensure your photos don&apos;t look stretched or distorted.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Custom Dimensions:</strong> Specify exact pixel sizes for your needs.</li>
          <li><strong>Aspect Ratio Lock:</strong> Automatically calculate dimensions to maintain proportions.</li>
          <li><strong>Local Processing:</strong> Complete privacy as files aren&apos;t uploaded.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Is there a limit to image size?</strong> The limit depends entirely on your device&apos;s memory, as all processing is handled locally.</p>
      </div>
      </div>
    </section>
    </>
  );
}
