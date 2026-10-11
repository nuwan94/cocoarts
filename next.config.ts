import type { NextConfig } from "next";

// GitHub Pages serves plain files, so the deploy workflow builds a static export.
// Local `npm run dev` / `npm run build` keep running as a normal Next.js server.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        // Cache Components can't be exported; this keeps "use cache" compiling.
        experimental: { useCache: true },
      }
    : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
