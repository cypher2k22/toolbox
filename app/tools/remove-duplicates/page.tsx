import { RemoveDuplicates } from "@/components/tools/RemoveDuplicates";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines",
  description: "Clean up your lists by instantly removing duplicate entries and lines. Fast and local processing.",
  alternates: {
    canonical: "https://toolbox-pearl-omega.vercel.app/tools/remove-duplicates",
  },
};
export default function RemoveDuplicatesPage() {
  return (
    <>
      <ToolLayout
      title="Remove Duplicate Lines"
      description="Clean up your lists by instantly removing duplicate entries and lines. Fast and local processing."
      category="Text Tools"
      categoryUrl="/#text-tools"
    >
      <RemoveDuplicates />
    </ToolLayout>


      <section className="bg-background py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">How to Remove Duplicate Lines</h2>
        <p>Paste a list of items and click to strip out any repeating entries. Essential for cleaning up email lists, datasets, and text documents.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Preserve Order:</strong> The original order of your unique items is maintained.</li>
          <li><strong>Case Sensitivity:</strong> Choose whether to treat &quot;Word&quot; and &quot;word&quot; as duplicates.</li>
          <li><strong>Browser-Based:</strong> Process large lists securely without uploading data.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
        <p><strong>Are empty lines removed?</strong> The tool offers options to strip empty lines or keep them while removing duplicate text entries.</p>
      </div>
      </div>
    </section>
    </>
  );
}
