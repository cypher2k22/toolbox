# Toolbox — Online Utility Platform

A searchable collection of browser-based utilities for PDF, image, text, and developer workflows, built with Next.js, React, and TypeScript.

## Features

- Search utilities by name, description, or category
- Responsive interface with reusable tool cards
- PDF utilities: merge, split, PDF-to-JPG, compression
- Image utilities: compression, resizing, JPG-to-PNG, image-to-PDF
- Text utilities: word count, case conversion, duplicate-line removal
- Developer utilities: JSON formatting, Base64, URL encoding

> Individual utilities may have different browser and file-size limitations. Verify each tool's behavior before relying on it for sensitive or production documents.

## Tech stack

- Next.js App Router, React, TypeScript
- Tailwind CSS
- Framer Motion
- PDF processing libraries including pdf-lib and pdfjs-dist

## Requirements

- Node.js version supported by the installed Next.js release
- npm

## Run locally

```bash
git clone https://github.com/cypher2k22/toolbox.git
cd toolbox
npm ci
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run build
```

Run both checks before opening a pull request or deploying.

## Configuration and security

- Keep local environment files and credentials out of Git.
- Never commit database passwords, authentication secrets, or API keys.
- If enabling authentication or database features, configure the required server-side environment variables in the deployment platform.
- Browser-side file processing can reduce uploads to a server, but do not claim that every operation is fully private unless each tool's implementation has been verified.

## Deployment

Deploy the project on a platform that supports Next.js, such as Vercel. Configure required environment variables in the deployment settings and run a production build before promoting changes.

## Author

Bakeerathan Karthigan — Computer Engineering Undergraduate, University of Sri Jayewardenepura.

GitHub: https://github.com/cypher2k22
