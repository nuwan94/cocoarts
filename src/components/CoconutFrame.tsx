import { Image } from "next-sanity/image";

import { LotusPetals } from "@/components/Motifs";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

// A cut coconut seen from above: husk, shell, kernel, and the photo sitting in the hollow.
// Everything but the photo is one SVG so the rings share a coordinate system; the
// filters name their channels and colour space because Safari's defaults shift the rings.
export function CoconutFrame({
  image,
  alt,
}: {
  image?: SanityImage;
  alt: string;
}) {
  return (
    <div className="relative aspect-square w-full animate-ring-in">
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        width="200"
        height="200"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <filter
            id="coco-fibre"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="7"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter
            id="coco-rough"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              seed="3"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="98"
          className="fill-husk"
          filter="url(#coco-fibre)"
        />
        <circle
          cx="100"
          cy="100"
          r="89"
          className="fill-shell"
          filter="url(#coco-rough)"
        />
        <circle
          cx="100"
          cy="100"
          r="81"
          className="fill-kernel"
          filter="url(#coco-rough)"
        />
        <LotusPetals cx={100} cy={100} inner={61} outer={74} count={28} />
      </svg>
      {image && (
        <div className="absolute inset-[20%] overflow-hidden rounded-[52%_48%_50%_50%/49%_52%_48%_51%]">
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
