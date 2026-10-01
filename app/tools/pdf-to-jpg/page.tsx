import { PdfToJpg } from "@/components/tools/PdfToJpg";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to JPG Converter",
  description: "Convert PDF document pages into high-quality JPG image files securely.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/pdf-to-jpg",
  },
};
export default function PdfToJpgPage() {
  return (
    <ToolLayout
      title="PDF to JPG Converter"
      description="Convert every page of your PDF into high-quality JPG images. Processing happens securely within your browser."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <PdfToJpg />
    </ToolLayout>
  );
}
