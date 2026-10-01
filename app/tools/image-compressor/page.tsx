import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor",
  description: "Reduce image file size while maintaining high quality. Completely browser-based for privacy.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/image-compressor",
  },
};
export default function ImageCompressorPage() {
  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file sizes instantly. All processing happens locally in your browser for maximum speed and privacy."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <ImageCompressor />
    </ToolLayout>
  );
}
