export const siteName = "CocoArts";
export const siteDescription =
  "Handmade coconut shell art and craft from Sri Lanka: carved elephants, bowls, lamps, jewellery and decor, made by local artisans.";

// Full public address of the site, including any sub-path, without a trailing slash.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

// The GitHub Pages export serves every page from a folder, so its URLs end in "/".
const trailingSlash = process.env.STATIC_EXPORT === "1";

export function absoluteUrl(path = "/") {
  const clean = path === "/" ? "" : path;
  return `${siteUrl}${clean}${trailingSlash || clean === "" ? "/" : ""}`;
}

// Next.js replaces the whole openGraph object per page, so pages spread this in.
export const baseOpenGraph = {
  type: "website",
  siteName,
  locale: "en_LK",
} as const;
