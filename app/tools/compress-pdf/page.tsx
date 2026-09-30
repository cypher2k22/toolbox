import { CompressPdf } from "@/components/tools/CompressPdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF",
  description: "Reduce the file size of your PDF documents instantly without losing quality.",
  alternates: {
    canonical: "https://toolbox-utilities.com/tools/compress-pdf",
  },
};
export default function CompressPdfPage() {
  return (
    <ToolLayout
      title="Compress PDF"
      description="Optimize and reduce the size of your PDF files locally in your browser."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <CompressPdf />
    </ToolLayout>
  );
}
