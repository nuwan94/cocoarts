import { Image } from "next-sanity/image";

import { LotusRing } from "@/components/Motifs";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

// A cut coconut seen from above: husk, shell, kernel, and the photo sitting in the hollow.
export function CoconutFrame({
  image,
  alt,
}: {
  image?: SanityImage;
  alt: string;
}) {
  return (
    <div className="relative aspect-square w-full">
      <svg aria-hidden className="absolute h-0 w-0">
        <filter id="coco-fibre" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.35"
            numOctaves="2"
            seed="7"
          />
          <feDisplacementMap in="SourceGraphic" scale="22" />
        </filter>
        <filter id="coco-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" scale="16" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 animate-ring-in rounded-full bg-husk"
        style={{ filter: "url(#coco-fibre)" }}
      />
      <div
        className="absolute inset-[5%] animate-ring-in rounded-full bg-shell [animation-delay:120ms]"
        style={{ filter: "url(#coco-rough)" }}
      />
      <div
        className="absolute inset-[9%] animate-ring-in rounded-full bg-kernel [animation-delay:240ms]"
        style={{ filter: "url(#coco-rough)" }}
      />
      <LotusRing
        inner={75}
        outer={91}
        count={28}
        className="absolute inset-[9%] animate-ring-in [animation-delay:300ms]"
      />
      {image && (
        <div className="absolute inset-[20%] animate-ring-in overflow-hidden rounded-[52%_48%_50%_50%/49%_52%_48%_51%] [animation-delay:360ms]">
          <Image
            src={urlFor(image).width(700).height(700).url()}
            alt={alt}
            width={700}
            height={700}
            sizes="(min-width: 768px) 30vw, 60vw"
            preload
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
