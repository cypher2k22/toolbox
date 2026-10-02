import { JpgToPng } from "@/components/tools/JpgToPng";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PNG Converter",
  description: "Convert your JPEG images to PNG instantly. Files are processed entirely in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/jpg-to-png",
  },
};
export default function JpgToPngPage() {
  return (
    <>
      <ToolLayout
      title="JPG to PNG Converter"
      description="Convert your JPEG images to PNG instantly. Files are processed entirely in your browser."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <JpgToPng />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Convert JPG to PNG</h2>
        <p>Easily transform your JPEG photos into PNG format. The conversion is fast, secure, and happens entirely on your device.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Format Conversion:</strong> Seamlessly change image formats for your projects.</li>
          <li><strong>No Server Uploads:</strong> Ensures your private photos remain private.</li>
          <li><strong>Instant Results:</strong> Immediate download of your new PNG files.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Does converting JPG to PNG improve quality?</strong> No, converting an already compressed JPG to PNG will not restore lost data, but it changes the format to one that supports lossless editing moving forward.</p>
      </div>
      </div>
    </section>
    </>
  );
}
