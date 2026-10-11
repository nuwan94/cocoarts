import type { Metadata } from "next";

import { ProductGrid } from "@/components/ProductGrid";
import { absoluteUrl, baseOpenGraph } from "@/lib/site";
import { getProducts } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Shop all coconut shell crafts",
  description:
    "Browse every handmade coconut shell piece in the CocoArts collection and order directly over WhatsApp.",
  alternates: { canonical: absoluteUrl("/products") },
  openGraph: { ...baseOpenGraph, url: absoluteUrl("/products") },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="wrap pt-14">
      <h1 className="mb-10 font-display text-5xl sm:text-6xl">All products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
