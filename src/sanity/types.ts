import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  asset: { _ref: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: SanityImage;
};

export type ProductSummary = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  inStock: boolean;
  image?: SanityImage;
  category?: { title: string; slug: string };
};

export type DetailImage = SanityImage & {
  _type: "image";
  _key: string;
  caption?: string;
};

export type Product = ProductSummary & {
  description?: string;
  details?: (PortableTextBlock | DetailImage)[];
  images?: SanityImage[];
  dimensions?: string;
  madeBy?: string;
};
