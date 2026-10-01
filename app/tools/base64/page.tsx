import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder",
  description: "Encode text to Base64 format or decode Base64 strings back to regular text.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/base64",
  },
};
export default function Base64EncoderPage() {
  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Safely encode string to Base64 or decode Base64 to string with full UTF-8 support."
      category="Developer Tools"
      categoryUrl="/#developer-tools"
    >
      <Base64Encoder />
    </ToolLayout>
  );
}
