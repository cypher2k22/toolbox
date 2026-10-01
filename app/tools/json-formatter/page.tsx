import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "Format, validate, and minify your JSON data securely in your browser.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/json-formatter",
  },
};
export default function JsonFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, prettify, or minify your JSON data. Validate syntax and find errors instantly."
      category="Developer Tools"
      categoryUrl="/#developer-tools"
    >
      <JsonFormatter />
    </ToolLayout>
  );
}
