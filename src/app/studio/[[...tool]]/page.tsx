import { NextStudio } from "next-sanity/studio";

import { SetupNotice } from "@/components/SetupNotice";
import { isSanityConfigured } from "@/sanity/env";

import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

// The studio routes itself in the browser, so one exported page covers it.
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  if (!isSanityConfigured) return <SetupNotice />;
  return <NextStudio config={config} />;
}
