import { UrlEncoder } from "@/components/tools/UrlEncoder";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder/Decoder",
  description: "Safely encode or decode strings to be used in URLs and URIs.",
  alternates: {
    canonical: "https://toolbox-utilities.com/tools/url-encoder",
  },
};
export default function UrlEncoderPage() {
  return (
    <ToolLayout
      title="URL Encoder & Decoder"
      description="Encode text to be safely transmitted in URLs, or decode URL-encoded text back into readable strings."
      category="Developer Tools"
      categoryUrl="/#developer-tools"
    >
      <UrlEncoder />
    </ToolLayout>
  );
}
