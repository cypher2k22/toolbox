import { ImageToPdf } from "@/components/tools/ImageToPdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF Converter",
  description: "Combine and convert multiple images into a single PDF document locally.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/image-to-pdf",
  },
};
export default function ImageToPdfPage() {
  return (
    <ToolLayout
      title="Image to PDF Converter"
      description="Select multiple images and convert them into a single PDF document. Reorder your images, select page sizes, and download instantly without leaving your browser."
      category="Image Tools"
      categoryUrl="/#image-tools"
    >
      <ImageToPdf />
    </ToolLayout>
  );
}
