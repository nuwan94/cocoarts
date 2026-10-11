import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "./env";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImage) {
  return builder.image(source).auto("format");
}
