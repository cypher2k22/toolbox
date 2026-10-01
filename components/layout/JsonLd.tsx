export function JsonLd() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://toolbox-pearl-omega.vercel.app';

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolBox",
    "url": baseUrl,
    "description":
      "A premium collection of free online tools for PDFs, images, text, and developers. Process files securely in your browser.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}