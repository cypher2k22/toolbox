import { CaseConverter } from "@/components/tools/CaseConverter";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter",
  description: "Easily convert text between UPPERCASE, lowercase, camelCase, Title Case, and more.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/case-converter",
  },
};
export default function CaseConverterPage() {
  return (
    <ToolLayout
      title="Case Converter"
      description="Convert your text to any case instantly. Simply paste your text below and click the desired format button."
      category="Text Tools"
      categoryUrl="/#text-tools"
    >
      <CaseConverter />
    </ToolLayout>
  );
}
