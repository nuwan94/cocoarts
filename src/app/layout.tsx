import type { Metadata } from "next";
import { Caprasimo, Instrument_Sans } from "next/font/google";
import "./globals.css";

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
  title: { default: "CocoArts", template: "%s | CocoArts" },
  description: "Handmade art and craft from coconut shell.",
};

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
