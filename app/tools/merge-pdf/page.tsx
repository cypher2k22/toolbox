import { MergePdf } from "@/components/tools/MergePdf";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF",
  description: "Combine multiple PDF files into a single document entirely in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/merge-pdf",
  },
};
export default function MergePdfPage() {
  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF files into a single document. Reorder pages and process files securely entirely within your browser."
      category="PDF Tools"
      categoryUrl="/#pdf-tools"
    >
      <MergePdf />
    </ToolLayout>
  );
}
