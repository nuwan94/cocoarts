import { PortableText, type PortableTextComponents } from "next-sanity";
import { Image } from "next-sanity/image";

import { urlFor } from "@/sanity/image";
import type { DetailImage, RichTextValue } from "@/sanity/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-lg leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-3xl leading-tight sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-2xl leading-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-thambili pl-5 font-display text-2xl leading-snug text-frond">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed marker:text-thambili">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-relaxed marker:font-display marker:text-frond">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href || "";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="underline decoration-thambili decoration-2 underline-offset-4 hover:text-frond"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: DetailImage }) => (
      <figure className="mt-8">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          width={1200}
          height={800}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="h-auto w-full rounded-3xl"
        />
        {value.caption && (
          <figcaption className="mt-2 text-bark">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

export function RichText({ value }: { value: RichTextValue }) {
  return (
    <div className="max-w-2xl [&>*:first-child]:mt-0">
      <PortableText value={value} components={components} />
    </div>
  );
}
