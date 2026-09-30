export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolBox",
    "url": "https://toolbox-utilities.com",
    "description": "A premium collection of free online tools for PDFs, images, text, and developers. Process files securely in your browser.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolbox-utilities.com/?q={search_term_string}",
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
