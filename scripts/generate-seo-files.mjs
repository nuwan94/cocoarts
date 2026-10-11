// Writes robots.txt and sitemap.xml into the static export (out/).
// Run after `next build` in the GitHub Pages workflow; Next.js can't emit these
// routes itself in export mode while Cache Components is on for local development.
import { writeFile } from "node:fs/promises";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!siteUrl || !projectId) {
  console.error(
    "NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_SANITY_PROJECT_ID are required.",
  );
  process.exit(1);
}

const query = `{
  "products": *[_type == "product" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "categories": *[_type == "category" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`;
const response = await fetch(
  `https://${projectId}.apicdn.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`,
);
if (!response.ok) {
  console.error(`Sanity query failed: ${response.status}`);
  process.exit(1);
}
const { result } = await response.json();

const pages = [
  { path: "/" },
  { path: "/products/" },
  ...result.categories.map((category) => ({
    path: `/categories/${category.slug}/`,
    lastmod: category._updatedAt,
  })),
  ...result.products.map((product) => ({
    path: `/products/${product.slug}/`,
    lastmod: product._updatedAt,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ path, lastmod }) =>
      `  <url><loc>${siteUrl}${encodeURI(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: ${new URL(siteUrl).pathname.replace(/\/$/, "")}/studio/

Sitemap: ${siteUrl}/sitemap.xml
`;

await writeFile("out/sitemap.xml", sitemap);
await writeFile("out/robots.txt", robots);
console.log(`Wrote sitemap.xml (${pages.length} URLs) and robots.txt`);
