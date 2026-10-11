export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

// The site renders a setup notice instead of crashing until .env.local is filled in.
export const isSanityConfigured = projectId.length > 0;
