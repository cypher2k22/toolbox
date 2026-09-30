import { 
  FileText, Type, Code, FileJson, Link, Image as ImageIcon, 
  Files, ImageMinus, ImagePlus, FileImage, TypeOutline, TextSelect,
  LucideIcon
} from "lucide-react";

export type Tool = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: "PDF" | "Image" | "Text" | "Developer";
  isNew?: boolean;
  comingSoon?: boolean;
};

export const tools: Tool[] = [
  // PDF Tools
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
    href: "/tools/merge-pdf",
    icon: Files,
    category: "PDF",
    isNew: true,
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Extract pages from a PDF or split it into multiple files.",
    href: "/tools/split-pdf",
    icon: FileText,
    category: "PDF",
    isNew: true,
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages into high-quality JPG images.",
    href: "/tools/pdf-to-jpg",
    icon: FileImage,
    category: "PDF",
    isNew: true,
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce the file size of your PDF documents.",
    href: "/tools/compress-pdf",
    icon: FileText,
    category: "PDF",
    isNew: true,
  },

  // Image Tools
  {
    id: "compress-image",
    name: "Compress Image",
    description: "Reduce image file size while maintaining quality.",
    href: "/tools/image-compressor",
    icon: ImageMinus,
    category: "Image",
    isNew: true,
  },
  {
    id: "resize-image",
    name: "Resize Image",
    description: "Change dimensions of images easily.",
    href: "/tools/image-resizer",
    icon: ImagePlus,
    category: "Image",
    isNew: true,
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    description: "Convert JPG/JPEG images to PNG format.",
    href: "/tools/jpg-to-png",
    icon: ImageIcon,
    category: "Image",
    isNew: true,
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert images to a single PDF document.",
    href: "/tools/image-to-pdf",
    icon: FileImage,
    category: "Image",
    isNew: true,
  },

  // Text Tools
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs in real-time.",
    href: "/tools/word-counter",
    icon: Type,
    category: "Text",
    isNew: true,
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between UPPERCASE, lowercase, camelCase, etc.",
    href: "/tools/case-converter",
    icon: TypeOutline,
    category: "Text",
    isNew: true,
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "Clean up your lists by removing duplicate entries.",
    href: "/tools/remove-duplicates",
    icon: TextSelect,
    category: "Text",
    isNew: true,
  },

  // Developer Tools
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON data.",
    href: "/tools/json-formatter",
    icon: FileJson,
    category: "Developer",
    isNew: true,
  },
  {
    id: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 back to text.",
    href: "/tools/base64",
    icon: Code,
    category: "Developer",
    isNew: true,
  },
  {
    id: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode strings to be used in URLs.",
    href: "/tools/url-encoder",
    icon: Link,
    category: "Developer",
    isNew: true,
  }
];

export const getPopularTools = () => tools.slice(0, 8); // just returning first 8 for now, can be tailored
