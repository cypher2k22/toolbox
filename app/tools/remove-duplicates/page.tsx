import { RemoveDuplicates } from "@/components/tools/RemoveDuplicates";
import { ToolLayout } from "@/components/tools/ToolLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines",
  description: "Clean up your lists by instantly removing duplicate entries and lines.",
  alternates: {
    canonical: "https://toolbox-utilities.com/tools/remove-duplicates",
  },
};
export default function RemoveDuplicatesPage() {
  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Clean up your lists by removing repeated entries. Preserves original order and gives you options for case sensitivity."
      category="Text Tools"
      categoryUrl="/#text-tools"
    >
      <RemoveDuplicates />
    </ToolLayout>
  );
}
