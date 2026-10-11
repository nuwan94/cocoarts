import type { Metadata, Viewport } from "next";
import { Caprasimo, Instrument_Sans } from "next/font/google";
import "./globals.css";

import { baseOpenGraph, siteDescription, siteName, siteUrl } from "@/lib/site";

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const carved = Caprasimo({
  variable: "--font-carved",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Coconut shell art and craft from Sri Lanka`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "coconut shell craft",
    "coconut shell art",
    "Sri Lankan handicrafts",
    "handmade gifts",
    "eco-friendly decor",
  ],
  openGraph: {
    ...baseOpenGraph,
    title: `${siteName} | Coconut shell art and craft from Sri Lanka`,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#173d2c" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${carved.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
