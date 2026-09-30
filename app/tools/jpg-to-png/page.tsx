import { JpgToPng } from "@/components/tools/JpgToPng";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PNG Converter",
  description: "Convert JPG or JPEG images to PNG format securely and instantly.",
  alternates: {
    canonical: "https://toolbox-utilities.com/tools/jpg-to-png",
  },
};
export default function JpgToPngPage() {
  return (
    <ToolLayout
      title="JPG to PNG Converter"
      description="Convert your JPEG images to PNG instantly. Files are processed entirely in your browser."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <JpgToPng />
    </ToolLayout>
  );
}
