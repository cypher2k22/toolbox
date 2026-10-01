import { SplitPdf } from "@/components/tools/SplitPdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF",
  description: "Extract pages from your PDF or split it into multiple smaller documents securely.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/split-pdf",
  },
};
export default function SplitPdfPage() {
  return (
    <ToolLayout
      title="Split PDF"
      description="Extract specific pages or ranges from your PDF into a new document. Your files are processed securely in your browser."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <SplitPdf />
    </ToolLayout>
  );
}
