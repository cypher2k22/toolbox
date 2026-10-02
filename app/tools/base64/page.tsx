import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder",
  description: "Safely encode string to Base64 or decode Base64 to string with full UTF-8 support.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/base64",
  },
};
export default function Base64EncoderPage() {
  return (
    <>
      <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Safely encode string to Base64 or decode Base64 to string with full UTF-8 support."
      category="Developer Tools"
      categoryUrl="/#developer-tools"
    >
      <Base64Encoder />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Encode and Decode Base64</h2>
        <p>Input text to encode it into a Base64 string, or paste a Base64 string to decode it back into readable text. Essential for developers managing data encoding.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>UTF-8 Support:</strong> Safely encode and decode special characters and emojis.</li>
          <li><strong>Two-way Translation:</strong> Easily swap between encoding and decoding modes.</li>
          <li><strong>Privacy Guarded:</strong> All processing is done locally via JavaScript.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Is Base64 considered encryption?</strong> No, Base64 is an encoding scheme, not encryption. It does not secure or hide data from anyone who knows how to decode it.</p>
      </div>
      </div>
    </section>
    </>
  );
}
