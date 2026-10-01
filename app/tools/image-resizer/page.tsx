import { ImageResizer } from "@/components/tools/ImageResizer";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer",
  description: "Change dimensions and resize your images instantly in the browser without uploading.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/image-resizer",
  },
};
export default function ImageResizerPage() {
  return (
    <ToolLayout
      title="Image Resizer"
      description="Change image dimensions easily. Lock aspect ratio to prevent distortion. Fast, free, and secure."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <ImageResizer />
    </ToolLayout>
  );
}
